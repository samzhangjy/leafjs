# Leafjs

A lightweight, fast web-components based frontend framework for the future.

## Introduction

Leafjs is a lightweight frontend framework built using web components and browser ES Modules.

Using web components allows you to create components natively - supported by most modern browsers. Unlike React and Vue, Leafjs's component system is totally built on top of the web component system.

And just like React, Leafjs implements a simple reactivity system that allows two-way binding, just like most frameworks do.

## Getting started

Because Leafjs targets browser ES Moudles, so no transpilation is needed to use Leafjs: just plain JavaScript!

Here's an example of Leafjs:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <my-app></my-app>

    <script type="module">
      import {
        LeafComponent,
        registerComponent,
        HTMLElements,
      } from 'https://cdn.jsdelivr.net/gh/samzhangjy/leafjs@main/packages/leaf/dist/leaf.min.js';

      class MyApp extends LeafComponent {
        constructor() {
          super();
        }

        render() {
          return new HTMLElements.h1('Hello Leafjs!');
        }
      }

      registerComponent('my-app', MyApp);
    </script>
  </body>
</html>
```

Or you can also try it directly at CodeSandbox:

[![Edit leafjs-starter](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/leafjs-starter-nwg946?fontsize=14&hidenavigation=1&theme=dark)

## Documentation

Please refer to <https://leafjs.samzhangjy.com/>.

## Licensing

Leafjs is licensed under the MIT License. See `LICENSE` for details.
