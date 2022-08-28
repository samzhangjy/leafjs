import {
  LeafComponent,
  registerComponent,
  HTMLElements,
} from 'https://cdn.jsdelivr.net/gh/samzhangjy/leafjs@main/packages/leaf/dist/leaf.min.js';
import AddTodo from './components/AddTodo.js';
import TodoItem from './components/TodoItem.js';

class TodoApp extends LeafComponent {
  constructor() {
    super();

    this.state = {
      todoItems: [],
      currentlyEditing: '',
    };
  }

  render() {
    const addTodo = new AddTodo({
      placeholder: 'Add a todo...',
      value: this.state.currentlyEditing,
      onChange: (e) => (this.state.currentlyEditing = e.target.value),
      onAdd: () => {
        if (!this.state.currentlyEditing) return;
        const newTodo = {
          name: this.state.currentlyEditing,
          completed: false,
        };
        this.state.todoItems.push(newTodo);
        this.state.currentlyEditing = '';
      },
    });
    const todos = [];
    for (const todo of this.state.todoItems) {
      const todoItem = new TodoItem({
        name: todo.name,
        completed: todo.completed,
        onCompleted: () => {
          todo.completed = !todo.completed;
        },
        onEdit: (target) => {
          todo.name = target;
        },
        onDelete: () => {
          this.state.todoItems.splice(this.state.todoItems.indexOf(todo), 1);
        },
      });
      todos.push(todoItem);
    }
    const todoContainer = new HTMLElements.div(todos);

    return [new HTMLElements.h1('Todo List'), addTodo, todoContainer];
  }
}

registerComponent('todo-app', TodoApp);
