import { LeafComponent, registerComponent } from '@leaf-web/core';
import Button from './Button.jsx';

class Counter extends LeafComponent {
  static watchedProps = ['count'];

  constructor() {
    super();

    this.state = {
      counter: null,
    };
  }

  onMounted() {
    if (this.state.counter === null) {
      this.state.counter = this.props.count;
    }
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.state.counter++}>+</Button>
        <span className="counter">{this.state.counter}</span>
        <Button onClick={() => this.state.counter--}>-</Button>
      </div>
    );
  }

  css() {
    return `
      .counter {
        margin: 0 10px;
      }
    `;
  }
}

registerComponent('leaf-counter', Counter);

export default Counter;
