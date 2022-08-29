import { LeafComponent, HTMLElements, registerComponent } from 'https://cdn.jsdelivr.net/npm/@leaf-web/core@latest/dist/leaf.min.js';

class Button extends LeafComponent {
  constructor(content, props) {
    super();

    this.content = content;
    this.props = props;
  }

  render() {
    const button = HTMLElements.button(this.content, this.props);
    button.addEventListener('click', (e) => {
      if (this.props?.onClick) this.props.onClick(e);
    });
    return button;
  }

  css() {
    return `
      button {
        border: none;
        border-radius: 10px;
        padding: 10px 15px;
        margin-right: 10px;
        transition: all 0.2s;
      }

      button:hover {
        cursor: pointer;
      }
    `;
  }
}

export default registerComponent('todo-button', Button);
