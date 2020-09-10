/* eslint-disable require-jsdoc */
import {
  html,
  render
} from '../../../node_modules/lit-html';

import {
  PRIORITIES
} from '../../constants/index.js';

class TodoList extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({
      mode: 'open',
    });

    this.todos = [];
  }

  connectedCallback() {
  
    this.listTemplate = (todoList) => {
      return (
        html `
    <add-form></add-form>
    
    <ul class='todo-list'>
      ${todoList.map(({id, title, priority, isComplete}) => html`<todo-item id=${id} title=${title} isComplete=${isComplete} priority=${priority}  @onDeleteTodo=${this.deleteTodo.bind(this)}  @onToggleTodo=${this.toggleTodo.bind(this)} @onToggleTodoPriority=${this.togglePriority.bind(this)}></todo-item>`)}
    </ul>
    `)
    };

    // Load state from local storage
    this.getLocalStorage();
    this.render();

    this.listElement = this.root.querySelector('.todo-list');

    const addForm = this.root.querySelector('add-form');

    addForm.addEventListener('onAddTodo', this.addTodo.bind(this));
  }

  getLocalStorage() {
    const savedState = JSON.parse(localStorage.getItem('todos'));

    if (savedState) {
      this.todos = savedState;
    }
  }

  updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(e) {
    const {
      body: newToDo
    } = e.detail;

    this.todos = [...this.todos, newToDo];
    this.updateLocalStorage();
    this.render();
   
  }

  /**
   * Receive id in custom event object and return new todo list after removing the id
   * @param {Object} e Event Object
   */
  deleteTodo(e) {
    const id = e.detail.id;

    this.todos = this.todos.filter((item) => item.id !== id);
    this.updateLocalStorage();
    
    this.render();
  }

  /**
   * Receive id in custom event object and return new todo list after toggling the complete status of id
   * @param {Object} e Event Object
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
  }

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

  render() {
    render(this.listTemplate(this.todos),this.root);
 
  }
}

window.customElements.define('todo-list', TodoList);