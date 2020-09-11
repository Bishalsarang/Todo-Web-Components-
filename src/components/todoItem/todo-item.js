import {LitElement, html} from '@polymer/lit-element';

import { PRIORITIES } from '../../constants/index';

/**
 * TodoItem.
 * 
 */
class TodoItem extends LitElement {
  /**
   * Constructor .
   */
  constructor() {
    super();
  }

  /**
   * Re-renders when these property changes.
   */
  static get properties() {

    return {
      id: { type: String },
      title: {type: String},
      priority: {type: String},
      isComplete: {type: String}
    };
  }

  /**
   * Handle priority toggle.
   */
  handleTogglePriority() {
    return (e) => {
      e.preventDefault();

      this.priority = PRIORITIES[(PRIORITIES.indexOf(this.priority) + 1) % PRIORITIES.length];
      this.onToggleTodoPriority(this.id);
    };
  }

  /**
   * Handle delete.
   */
  handleDelete() {
    return (e) => {
      e.preventDefault();
      
      this.onDeleteTodo(this.id);
    };
  }

  /**
   * Handle toggle complete.
   */
  handleToggleComplete() {
    return (e) => {
      e.preventDefault();

      this.onToggleTodo(this.id);
    };
  }

  /**
   * 
   * @returns Lit-html template.
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

    return this.todoItemTemplate();
  }
}

window.customElements.define('todo-item', TodoItem);

export default TodoItem;