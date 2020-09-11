import {LitElement, html} from '@polymer/lit-element';
import { repeat } from '../../../node_modules/lit-html/directives/repeat.js';

/**
 * Class todoList.
 * Custom web component ToDoList.
 */
class TodoList extends LitElement {
  /**
   * Constructor.
   */
  constructor() {
    super();
  }

  /**
   * Re-renders when todos property change.
   */
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

    /**
   * @returns Lit-html template.
   */
  todoListTemplate() {
    return html`
      <ul class="todo-list">
        ${repeat(
          this.todos,
          (todo) => todo.id, // key
          ({ id, title, isComplete, priority }) =>
            html`
              <todo-item
                .id=${id}
                .title=${title}
                .priority=${priority}
                .isComplete=${isComplete}
                .onDeleteTodo=${this.onDeleteTodo}
                .onToggleTodo=${this.onToggleTodo}
                .onToggleTodoPriority=${this.onToggleTodoPriority}
              >
              </todo-item>
            `,
        )}
      </ul>
    `;
  }


  /**
   * Render lit-html template.
   */
  render() {
    
    return this.todoListTemplate();
  }
}

window.customElements.define('todo-list', TodoList);

export default TodoList;