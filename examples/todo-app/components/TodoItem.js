import {
  LeafComponent,
  HTMLElements,
  registerComponent
} from 'https://cdn.jsdelivr.net/gh/samzhangjy/leafjs@main/packages/leaf/dist/leaf.min.js';
import Input from './Input.js';
import Button from './Button.js';

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
    const completedButton = new Button(`Set as ${this.props.completed ? 'uncompleted' : 'completed'}`, {
      onClick: () => {
        if (this.props.onCompleted) this.props.onCompleted();
      },
    });

    const editButton = new Button(this.state.isEditing ? 'Submit' : 'Edit', {
      onClick: () => {
        if (this.state.isEditing && this.props.onEdit) this.props.onEdit(this.state.currentlyEditing);
        this.state.isEditing = !this.state.isEditing;
      },
    });

    const editPanel = new Input({
      value: this.state.currentlyEditing,
      onChange: (e) => {
        this.state.currentlyEditing = e.target.value;
      },
    });

    const deleteButton = new Button('Delete', {
      onClick: () => {
        if (this.props.onDelete) this.props.onDelete();
      },
    });

    const todoItem = new HTMLElements.div([
      new HTMLElements.h2(`${this.props.name} ${this.props.completed ? '(completed)' : ''}`),
      new HTMLElements.p(`Completed: ${this.props.completed}`),
      completedButton,
      this.state.isEditing && editPanel,
      editButton,
      deleteButton,
    ]);
    return todoItem;
  }
}

registerComponent('todo-item', TodoItem);

export default TodoItem;
