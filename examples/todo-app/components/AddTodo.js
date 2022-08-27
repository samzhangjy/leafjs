import { LeafComponent, registerComponent } from 'https://cdn.jsdelivr.net/gh/samzhangjy/leafjs@master/packages/leaf/dist/leaf.min.js';
import Input from './Input.js';
import Button from './Button.js';

class AddTodo extends LeafComponent {
  constructor(props) {
    super();

    this.props = props ?? {};

    this.state = {
      currentlyEditing: '',
    };
  }

  render() {
    const todoInput = new Input({
      placeholder: this.props.placeholder ?? 'Add todo...',
      value: this.props.value ?? '',
      onChange: (e) => {
        if (this.props.onChange) this.props.onChange(e);
      },
    });

    const addTodo = new Button('Add todo');
    addTodo.addEventListener('click', (e) => {
      if (this.props.onAdd) this.props.onAdd(e);
    });
    return [todoInput, addTodo];
  }
}

registerComponent('add-todo', AddTodo);

export default AddTodo;
