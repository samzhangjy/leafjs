import express from 'express';
import expressWs from 'express-ws';
import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';

export const staticServer = (publicPath: string) => {
  publicPath = path.resolve(publicPath);
  const app = express();
  const ws = expressWs(app);

  const injectCandidates = [new RegExp('</body>', 'i'), new RegExp('</svg>'), new RegExp('</head>', 'i')];

  let toInject: string | null = null;
  const injectContent = readFileSync(path.join(__dirname, 'injected.min.js')).toString();

  const injectContentToHTML = (dir: string) => {
    const files = readdirSync(dir);

    for (const file of files) {
      const currentPath = path.join(dir, file);
      if (statSync(currentPath).isDirectory()) {
        injectContentToHTML(currentPath);
      } else {
        if (path.extname(currentPath) !== '.html') continue;

        const htmlContent = readFileSync(currentPath).toString();

        for (const tag of injectCandidates) {
          const match = tag.exec(htmlContent);
          if (match) {
            toInject = match[0];
            break;
          }
        }

        const pathObj = path.parse(path.relative(publicPath, currentPath));
        app.get(path.join('/', pathObj.dir, pathObj.name === 'index' ? '' : pathObj.name), (_req, res) => {
          if (!toInject) {
            res.send(htmlContent);
            return;
          }
          res.send(
            htmlContent.replace(
              new RegExp(toInject, 'i'),
              `
          <!-- code injected by leafjs -->
          <script>
              ${injectContent}
          </script>
      ${toInject}`
            )
          );
        });
      }
    }
  };

  app.use('/', express.static(publicPath, { index: false }));
  injectContentToHTML(publicPath);

  let socket: any | null = null;

  ws.app.ws('/socket', (ws) => {
    socket = ws;
  });

  return {
    start: app.listen,
    update: () => {
      socket?.send(JSON.stringify({ msg: 'reload' }));
    },
    error: (msg: string) => {
      socket?.send(JSON.stringify({ msg: 'error', data: msg }));
    },
    on: ws.app.on,
  };
};
