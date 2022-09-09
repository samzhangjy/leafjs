import { LeafComponent, HTMLElements, registerComponent } from '@leaf-web/core';
import Input from './Input.jsx';
import Button from './Button.jsx';

class TodoItem extends LeafComponent {
  static watchedProps = ['name', 'completed'];

  constructor() {
    super();

    this.state = {
      isEditing: false,
      currentlyEditing: '',
    };
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.name} {this.props.completed ? '(completed)' : ''}
        </h2>
        <p>Completed: {this.props.completed ? 'true' : 'false'}</p>
        <Button onClick={() => this.fireEvent('completed')}>
          Set as {this.props.completed ? 'uncompleted' : 'completed'}
        </Button>
        {this.state.isEditing && (
          <Input
            value={this.props.name}
            onChange={(e) => {
              this.state.currentlyEditing = e.detail.value;
            }}
          />
        )}
        <Button
          onClick={() => {
            if (this.state.isEditing) this.fireEvent('edit', { value: this.state.currentlyEditing });
            this.state.isEditing = !this.state.isEditing;
          }}
        >
          {this.state.isEditing ? 'Done' : 'Edit'}
        </Button>
        <Button onClick={() => this.fireEvent('delete')}>Delete</Button>
      </div>
    );
  }
}

registerComponent('todo-item', TodoItem);

export default TodoItem;
