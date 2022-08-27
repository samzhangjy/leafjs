# Todo App

A basic todo application built with Leafjs.

## Usage

Because of the usage of JS Modules, it is required that the app is served on `http/https` protocal. This mean simply opening `index.html` with `file:///` protocal won't work: you will need a server to run it.

The easiest way to get started is to install `live-server`:

```bash
$ npm i -g live-server
```

And in the project diretory, run:

```bash
$ live-server
```

`live-server` will automatically open up a new browser tab with your app in it afterwards.

## Project structure

```
todo-app
├── components ...... core components base
│   ├── AddTodo.js .. todo input and the add-todo button
│   ├── Button.js ... button component, used across the project
│   ├── Input.js .... input component, used across the project
│   └── TodoItem.js . todo item with features like edit, remove and set as completed
├── index.html ...... main entry file
├── main.js ......... main component that puts everything together
└── README.md ....... README file
 ```
