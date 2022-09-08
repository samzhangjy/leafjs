import { LeafComponent, registerComponent } from '@leaf-web/core';
import Input from './Input.jsx';
import Button from './Button.jsx';

class AddTodo extends LeafComponent {
  constructor(props) {
    super();

    this.props = props;

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
          onChange={this.props.onChange}
        />
        <Button onClick={this.props.onAdd}>Add todo</Button>
      </div>
    );
  }
}

registerComponent('add-todo', AddTodo);

export default AddTodo;
