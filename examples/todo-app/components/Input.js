import {
  LeafComponent,
  HTMLElements,
  registerComponent
} from 'https://cdn.jsdelivr.net/gh/samzhangjy/leafjs@main/packages/leaf/dist/leaf.min.js';

class Input extends LeafComponent {
  constructor(props) {
    super();

    this.props = props;
  }

  render() {
    const input = new HTMLElements.input(this.props);
    input.addEventListener('change', (e) => {
      if (this.props.onChange) this.props.onChange(e);
    });
    return input;
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
