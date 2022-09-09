import { LeafComponent, registerComponent, HTMLElements } from '@leaf-web/core';
import AddTodo from './components/AddTodo.jsx';
import TodoItem from './components/TodoItem.jsx';

class TodoApp extends LeafComponent {
  constructor() {
    super();

    this.state = {
      todoItems: [],
      currentlyEditing: '',
      test: '',
    };
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <AddTodo
          placeholder="Add a todo..."
          value={this.state.currentlyEditing}
          onChange={(e) => {
            this.state.currentlyEditing = e.detail.value;
          }}
          onAdd={() => {
            if (!this.state.currentlyEditing) return;
            const newTodo = {
              name: this.state.currentlyEditing,
              completed: false,
            };
            this.state.todoItems.push(newTodo);
            this.state.currentlyEditing = '';
          }}
        />
        {this.state.todoItems.map((todo, index) => (
          <TodoItem
            name={todo.name}
            completed={todo.completed}
            onCompleted={() => {
              todo.completed = !todo.completed;
            }}
            onEdit={(e) => (todo.name = e.detail.value)}
            onDelete={() => this.state.todoItems.splice(index, 1)}
            key={`todo-item-${index}`}
          />
        ))}
      </div>
    );
  }
}

registerComponent('todo-app', TodoApp);

export default TodoApp;
