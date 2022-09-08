import { LeafComponent, registerComponent } from '@leaf-web/core';

class Input extends LeafComponent {
  constructor(props) {
    super();

    this.props = props;
    console.log(this.props);
  }

  render() {
    return <input onChange={this.props.onChange} value={this.props.value} type="text" autoComplete='off' />;
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
