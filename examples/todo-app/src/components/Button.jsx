import { LeafComponent, HTMLElements, registerComponent } from '@leaf-web/core';

class Button extends LeafComponent {
  // static watchedProps = ['onClick'];

  constructor() {
    super();
  }

  render() {
    return (
      <button onClick={(e) => this.fireEvent(e)}>
        <slot></slot>
      </button>
    );
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
