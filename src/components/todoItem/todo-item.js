/* eslint-disable require-jsdoc */
import { html, render } from '../../../node_modules/lit-html';

import { PRIORITIES } from '../../constants/index';

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({
      mode: 'open',
    });
  }

  getTodoAttributes() {
    this.id = this.getAttribute('id');
    this.title = this.getAttribute('title');
    this.priority = this.getAttribute('priority');

    this.isComplete = this.getAttribute('isComplete') === 'true';
  }

  connectedCallback() {
    this.getTodoAttributes();

   
    this.render();
  }

  handleTogglePriority() {
    return (e) => {
      e.preventDefault();

      this.priority = PRIORITIES[(PRIORITIES.indexOf(this.priority) + 1) % PRIORITIES.length];

      this.dispatchEvent(
        new CustomEvent('onToggleTodoPriority', {
          detail: {
            id: this.id,
          },
        }),
      );

      this.render();
    };
  }

  handleDelete() {
    return (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('onDeleteTodo', {
          detail: {
            id: this.id,
          },
        }),
      );

      this.render();
    };
  }

  handleToggleComplete() {
    return (e) => {
      e.preventDefault();
      this.isComplete = !this.isComplete;

      this.dispatchEvent(
        new CustomEvent('onToggleTodo', {
          detail: {
            id: this.id,
          },
        }),
      );

      this.render();
    };
  }

  disconnectedCallback() {}

  todoItemTemplate(){

    return html`
      <link rel="stylesheet" href="./components/todoItem/style.css" />

      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
        integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
        crossorigin="anonymous"
      />

      <div class=${'task neumo-element ' + (this.isComplete ? 'task--complete' : '')}>
      
        <div class="info">
          <div class="check" @click=${this.handleToggleComplete()}>
            <div class=${'check__icon ' + (this.isComplete ? '' : 'hide')}>
              <i class="fas fa-check"></i>
            </div>
          </div>

          <p className=${'task__title ' + (this.isComplete ? 'task--complete' : '')}>${this.title}</p>
        </div>

        <div className="task__controls">
          <div class=${'task__priority neumo-element ' + this.priority} @click=${this.handleTogglePriority()}>
            ${this.priority}
          </div>

          <button class="btn-delete" @click=${this.handleDelete()}>
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  render() {
    render(this.todoItemTemplate(), this.root);
  }
}

window.customElements.define('todo-item', TodoItem);

export default TodoItem;