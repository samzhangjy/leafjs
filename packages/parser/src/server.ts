import express from 'express';
import expressWs from 'express-ws';
import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { injectToHTML } from './common';

export const staticServer = (publicPath: string) => {
  publicPath = path.resolve(publicPath);
  const app = express();
  const ws = expressWs(app);
  const injectContent = readFileSync(path.join(__dirname, 'injected.min.js')).toString();

  const injectWatchScriptToHTML = (dir: string) => {
    const files = readdirSync(dir);

    for (const file of files) {
      const currentPath = path.join(dir, file);
      if (statSync(currentPath).isDirectory()) {
        injectWatchScriptToHTML(currentPath);
      } else {
        if (path.extname(currentPath) !== '.html') continue;

        const htmlContent = readFileSync(currentPath).toString();

        const pathObj = path.parse(path.relative(publicPath, currentPath));
        app.get(path.join('/', pathObj.dir, pathObj.name === 'index' ? '' : pathObj.name), (_req, res) => {
          res.send(
            injectToHTML(
              htmlContent,
              `
          <!-- code injected by leafjs -->
          <script>
              ${injectContent}
          </script>`
            )
          );
        });
      }
    }
  };

  app.use('/', express.static(publicPath, { index: false }));
  injectWatchScriptToHTML(publicPath);

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
