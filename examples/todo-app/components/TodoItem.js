import { LeafComponent, HTMLElements, registerComponent } from 'https://cdn.jsdelivr.net/npm/@leaf-web/core@latest/dist/leaf.min.js';
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
    const completedButton = Button(`Set as ${this.props.completed ? 'uncompleted' : 'completed'}`, {
      onClick: () => {
        if (this.props.onCompleted) this.props.onCompleted();
      },
    });

    const editButton = Button(this.state.isEditing ? 'Submit' : 'Edit', {
      onClick: () => {
        if (this.state.isEditing && this.props.onEdit) this.props.onEdit(this.state.currentlyEditing);
        this.state.isEditing = !this.state.isEditing;
      },
    });

    const editPanel = Input({
      value: this.state.currentlyEditing,
      onChange: (e) => {
        this.state.currentlyEditing = e.target.value;
      },
    });

    const deleteButton = Button('Delete', {
      onClick: () => {
        if (this.props.onDelete) this.props.onDelete();
      },
    });

    const todoItem = HTMLElements.div([
      HTMLElements.h2(`${this.props.name} ${this.props.completed ? '(completed)' : ''}`),
      HTMLElements.p(`Completed: ${this.props.completed}`),
      completedButton,
      this.state.isEditing && editPanel,
      editButton,
      deleteButton,
    ]);
    return todoItem;
  }
}

export default registerComponent('todo-item', TodoItem);
