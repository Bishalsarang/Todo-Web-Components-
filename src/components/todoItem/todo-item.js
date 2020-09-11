import { html, render } from '../../../node_modules/lit-html';

import { PRIORITIES } from '../../constants/index';

/**
 * TodoItem.
 * 
 */
class TodoItem extends HTMLElement {
  /**
   * 
   */
  constructor() {

    super();
    this.root = this.attachShadow({
      mode: 'open',
    });
    
  }

  /**
   * 
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Handle priority toggle.
   */
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

  /**
   * Handle delete.
   */
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

  /**
   * Handle toggle complete.
   */
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

  /**
   * 
   * @returns lit-html template.
   */
  todoItemTemplate(){

    return html`
      <link rel="stylesheet" href="./src/components/todoItem/style.css" />

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

  /**
   * Render lit-html template.
   */
  render() {
    render(this.todoItemTemplate(), this.root);
  }
}

window.customElements.define('todo-item', TodoItem);

export default TodoItem;