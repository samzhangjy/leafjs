import { LeafComponent, registerComponent } from '@leaf-web/core';
import { palette } from '../colors';

class Resources extends LeafComponent {
  constructor(props) {
    super();

    this.props = props;
  }

  render() {
    return (
      <div>
        {this.props.links.map((link) => (
          <div className="link" onClick={() => window.open(link.link)}>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
          </div>
        ))}
      </div>
    );
  }

  css() {
    return `
      .link {
        padding: 10px 30px;
        border: 1px solid #eee;
        border-radius: 10px;
        transition: all 0.2s;
        margin-bottom: 20px;
      }

      .link:hover {
        cursor: pointer;
        border-color: ${palette.primary};
      }
    `;
  }
}

registerComponent('leaf-resources', Resources);

export default Resources;
