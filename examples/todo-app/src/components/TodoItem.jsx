import { LeafComponent, HTMLElements, registerComponent } from '@leaf-web/core';
import Input from './Input.jsx';
import Button from './Button.jsx';

class TodoItem extends LeafComponent {
  constructor(props) {
    super();

    this.props = props;

    this.state = {
      isEditing: false,
      currentlyEditing: this.props.name,
    };
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.name} {this.props.completed ? '(completed)' : ''}
        </h2>
        <p>Completed: {this.props.completed ? 'true' : 'false'}</p>
        <Button onClick={this.props.onCompleted}>Set as {this.props.completed ? 'uncompleted' : 'completed'}</Button>
        {this.state.isEditing && (
          <Input
            value={''}
            onChange={(e) => {
              e.preventDefault();
              this.state.currentlyEditing = e.target.value;
              console.log(this.state.currentlyEditing);
            }}
          />
        )}
        <Button onClick={this.props.onDelete}>Delete</Button>
      </div>
    );
  }
}

registerComponent('todo-item', TodoItem);

export default TodoItem;
