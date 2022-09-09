import { LeafComponent, HTMLElements, registerComponent } from '@leaf-web/core';

class Button extends LeafComponent {
  constructor() {
    super();
  }

  render() {
    return <button onClick={() => this.fireEvent('click')}>{this.props.children}</button>;
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

registerComponent('todo-button', Button);

export default Button;
