// import { html, render } from '../../../node_modules/lit-html';
import { repeat } from '../../../node_modules/lit-html/directives/repeat.js';

import {LitElement, html, css} from '@polymer/lit-element';

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

    // this.root = this.attachShadow({
    //   mode: 'open',
    // });

    this.todos = [];
    this.getLocalStorage();
  }

  static get properties() {
    return {
      todos: { type: Array },
    };
  }
  /**
   * Runs when component is added.
   */
  connectedCallback() {
    // Load state from local storage
    // this.getLocalStorage();
    // this.render();
    super.connectedCallback();
    // this.listElement = this.root.querySelector('.todo-list');
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
   * @returns lit-html template
   */
  todoListTemplate() {
    return html`
      <add-form  @onAddTodo=${this.addTodo.bind(this)}
              ></add-form>

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

    console.log("here add")
    this.updateLocalStorage();
   
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
    console.log("rerender")
    // render(this.todoListTemplate(), this.root);
    return this.todoListTemplate();
    return html`<h1>Hello</h1>`
  }
}

window.customElements.define('todo-list', TodoList);

export default TodoList;