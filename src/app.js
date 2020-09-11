
import {LitElement, html} from '@polymer/lit-element';

import { PRIORITIES } from './constants/index.js';

/**
 * Class TodoApp.
 * Custom web component ToDoList.
 */
class TodoApp extends LitElement {
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
console.log(id)
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
   * 
   */
  todoAppTemplate(){
    return html`
      <add-form .onAddTodo=${this.addTodo.bind(this)}></add-form>
      <todo-list
        .todos=${this.todos}
        .onDeleteTodo=${this.deleteTodo.bind(this)}
        .onToggleTodo=${this.toggleTodo.bind(this)}
        .onToggleTodoPriority=${this.togglePriority.bind(this)}
      ></todo-list>
    `;
  }

  /**
   * Render lit-html template.
   */
  render() {
    
    return this.todoAppTemplate();
  }
}

window.customElements.define('todo-app', TodoApp);

export default TodoApp;