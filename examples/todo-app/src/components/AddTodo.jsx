import { LeafComponent, registerComponent } from '@leaf-web/core';
import Input from './Input.jsx';
import Button from './Button.jsx';

class AddTodo extends LeafComponent {
  static watchedProps = ['placeholder', 'value'];

  constructor() {
    super();

    this.state = {
      currentlyEditing: '',
    };
  }

  render() {
    return (
      <div>
        <Input
          placeholder={this.props.placeholder ?? 'Add todo...'}
          value={this.props.value}
          onChange={(e) => this.fireEvent('change', { value: e.detail.value })}
        />
        <Button onClick={() => this.fireEvent('add')}>Add todo</Button>
      </div>
    );
  }
}

registerComponent('add-todo', AddTodo);

export default AddTodo;
