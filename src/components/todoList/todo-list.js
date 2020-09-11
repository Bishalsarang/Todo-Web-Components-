import { html, render } from '../../../node_modules/lit-html';
import { repeat } from '../../../node_modules/lit-html/directives/repeat.js';

import { PRIORITIES } from '../../constants/index.js';

/**
 * Class todoList.
 * Custom web component ToDoList.
 */
class TodoList extends HTMLElement {
  /**
   * Constructor.
   */
  constructor() {
    super();

    this.root = this.attachShadow({
      mode: 'open',
    });

    this.todos = [];
  }

  /**
   * Runs when component is added.
   */
  connectedCallback() {
    // Load state from local storage
    this.getLocalStorage();
    this.render();

    this.listElement = this.root.querySelector('.todo-list');

    const addForm = this.root.querySelector('add-form');

    addForm.addEventListener('onAddTodo', this.addTodo.bind(this));
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
   * 
   */
  todoListTemplate() {
    return html`
      <add-form></add-form>

      <ul class="todo-list">
        ${repeat(
          this.todos,
          (todo) => todo.id, // key
          ({ id, title, isComplete, priority }) =>
            html`<todo-item
              .id=${id}
              .title=${title}
              .priority=${priority}
              .isComplete=${isComplete}
              @onDeleteTodo=${this.deleteTodo.bind(this)}
              @onToggleTodo=${this.toggleTodo.bind(this)}
              @onToggleTodoPriority=${this.togglePriority.bind(this)}
            ></todo-item>`,
        )}
      </ul>
    `;
  }

  /**
   * Add new todo.
   * 
   * @param {Object} e  Event Object.
   */
  addTodo(e) {
    const { body: newToDo } = e.detail;

    this.todos = [...this.todos, newToDo];

    this.updateLocalStorage();
    this.render();
  }

  /**
   * Receive id in custom event object and return new todo list after removing the id.
   *
   * @param {Object} e Event Object.
   */
  deleteTodo(e) {
    const id = e.detail.id;

    this.todos = this.todos.filter((item) => item.id !== id);

    this.updateLocalStorage();
    this.render();
  }

  /**
   * Receive id in custom event object and return new todo list after toggling the complete status of id.
   * 
   * @param {Object} e Event Object.
   */
  toggleTodo(e) {
    const id = e.detail.id;

    this.todos = this.todos.map((item) => {
      // Toggle Complete state
      if (item.id === id) {
        return {
          ...item,
          isComplete: !item.isComplete,
        };
      }

      return item;
    });

    this.updateLocalStorage();
    this.render();
  }

  /**
   * Toggle Priority for todo item.
   * 
   * @param {Object} e EVent Object.
   */
  togglePriority(e) {
    const id = e.detail.id;

    this.todos = this.todos.map((item) => {
      // Toggle Priority state
      if (item.id === id) {
        return {
          ...item,
          priority: PRIORITIES[(PRIORITIES.indexOf(item.priority) + 1) % PRIORITIES.length],
        };
      }

      return item;
    });
    this.updateLocalStorage();
  }

  /**
   * Render lit-html template.
   */
  render() {
    render(this.todoListTemplate(), this.root);
  }
}

window.customElements.define('todo-list', TodoList);

export default TodoList;