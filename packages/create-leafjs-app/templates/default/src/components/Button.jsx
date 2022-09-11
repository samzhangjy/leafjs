import { css, LeafComponent, registerComponent } from '@leaf-web/core';
import { palette } from '../colors';

class Button extends LeafComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <button onClick={(e) => this.fireEvent(e)}>
        <slot></slot>
      </button>
    );
  }

  css() {
    return css`
      button {
        padding: 5px 10px;
        background-color: transparent;
        border: 1px solid ${palette.primary};
        border-radius: 5px;
        transition: all 0.1s;
      }

      button:hover {
        background-color: ${palette.primary};
        color: white;
        cursor: pointer;
      }

      button:focus {
        box-shadow: 0px 0px 0px 2px ${palette.secondary};
        border-color: ${palette.secondary};
      }
    `;
  }
}

registerComponent('leaf-button', Button);

export default Button;
