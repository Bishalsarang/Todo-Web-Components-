
import {LitElement, html} from '@polymer/lit-element';
import { repeat } from '../../../node_modules/lit-html/directives/repeat.js';

import { PRIORITIES } from '../../constants/index.js';

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

    this.todos = [];
    this.getLocalStorage();
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
   * Trigger when properties changes.
   * 
   */
  updated() {
    this.updateLocalStorage();
  }

  /**
   * Get saved state from localStorage.
   */
  getLocalStorage() {
    const savedState = JSON.parse(localStorage.getItem('todos'));

    if (savedState) {
      this.todos = savedState;
    }
  }

  /**
   * Update content of localStorage.
   */
  updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }


  /**
   * Add new todo.
   * 
   * @param {Object} data  TodoItem Data.
   */
  addTodo(data) {

    this.todos = [...this.todos, data];
  }

  /**
   * Receive id  and return new todo list after removing the id.
   *
   * @param {String} id TodoItem id.
   */
  deleteTodo(id) {

    this.todos = this.todos.filter((item) => item.id !== id);
  }

  /**
   * Receive id in custom event object and return new todo list after toggling the complete status of id.
   * 
   * @param {Object} id TodoItem id.
   */
  toggleTodo(id) {

    this.todos = this.todos.map((item) => {

      if (item.id === id) {
        return {
          ...item,
          isComplete: !item.isComplete,
        };
      }

      return item;
    });
  }

  /**
   * Toggle Priority for todo item.
   * 
   * @param {Object} id TodoItem id.
   */
  togglePriority(id) {

    this.todos = this.todos.map((item) => {

      if (item.id === id) {
        return {
          ...item,
          priority: PRIORITIES[(PRIORITIES.indexOf(item.priority) + 1) % PRIORITIES.length],
        };
      }

      return item;
    });
  }

    /**
   * @returns Lit-html template.
   */
  todoListTemplate() {
    return html`
      <add-form .onAddTodo=${this.addTodo.bind(this)}></add-form>

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
                .onDeleteTodo=${this.deleteTodo.bind(this)}
                .onToggleTodo=${this.toggleTodo.bind(this)}
                .onToggleTodoPriority=${this.togglePriority.bind(this)}
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