import { LeafComponent, registerComponent } from '@leaf-web/core';

class Input extends LeafComponent {
  static watchedProps = ['placeholder', 'value'];
  constructor() {
    super();
  }

  render() {
    return (
      <input
        onChange={(e) => this.fireEvent('change', { value: e.target.value })}
        value={this.props.value}
        type="text"
      />
    );
  }

  css() {
    return `
      input {
        border: 1px solid #999;
        padding: 10px;
        border-radius: 10px;
        margin-right: 10px;
        outline: none;
      }

      input:focus {
        border: 1px solid blue;
      }
    `;
  }
}

registerComponent('todo-input-base', Input);

export default Input;
