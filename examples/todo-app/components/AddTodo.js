import { LeafComponent, registerComponent } from 'https://cdn.jsdelivr.net/npm/@leaf-web/core@latest/dist/leaf.min.js';
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
    const todoInput = Input({
      placeholder: this.props.placeholder ?? 'Add todo...',
      value: this.props.value ?? '',
      onChange: (e) => {
        if (this.props.onChange) this.props.onChange(e);
      },
    });

    const addTodo = Button('Add todo');
    addTodo.addEventListener('click', (e) => {
      if (this.props.onAdd) this.props.onAdd(e);
    });
    return [todoInput, addTodo];
  }
}

export default registerComponent('add-todo', AddTodo);
