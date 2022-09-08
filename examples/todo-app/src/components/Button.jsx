import { LeafComponent, HTMLElements, registerComponent } from '@leaf-web/core';

class Button extends LeafComponent {
  constructor(props) {
    super();

    this.props = props;
  }

  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
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
