import { css, LeafComponent, registerComponent } from '@leaf-web/core';
import { palette } from './colors.js';
import Counter from './components/Counter.jsx';
import Resources from './components/Resources.jsx';
import './styles/global.css';

class MyApp extends LeafComponent {
  constructor() {
    super();

    this.links = [
      { title: 'Documentation', description: 'Leafjs official documentation.', link: 'https://leafjs.samzhangjy.com' },
      {
        title: 'GitHub',
        description: 'Found a bug? Report an issue to us!',
        link: 'https://github.com/samzhangjy/leafjs',
      },
    ];
  }

  render() {
    return (
      <div className="container">
        <div className="flex-item welcome">
          <h1>Leaf App</h1>
          <h4>Good job!</h4>
          <p>
            You successfully created a Leafjs app. Edit <code>index.jsx</code> to get started!
          </p>
          <h2>Counter</h2>
          {/* Try changing `count` to 1 */}
          <Counter count={0} />
        </div>
        <div className="flex-item">
          <h2>Resources</h2>
          <Resources links={this.links} />
        </div>
      </div>
    );
  }

  css() {
    return css`
      .container {
        margin: 0 20vw;
        gap: 100px;
        line-height: 2rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .flex-item {
        flex: 1;
      }

      h1 {
        color: ${palette.secondary};
      }

      h4 {
        color: ${palette.muted};
      }

      code {
        background-color: #eee;
        padding: 4px;
        border-radius: 5px;
        font-family: monospace;
      }

      @media screen and (min-width: 1024px) {
        .container {
          display: flex;
        }
      }
    `;
  }
}

registerComponent('my-app', MyApp);
