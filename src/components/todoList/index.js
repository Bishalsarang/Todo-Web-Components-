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
      ${todoList.map(({id, title, priority, isComplete}) => html`<todo-item id=${id} title=${title} isComplete=${isComplete} priority=${priority} @onToggleTodo=${this.toggleTodo.bind(this)}></todo-item>`)}
    </ul>
    `)
    };
    // LOad state frm local storage
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

    this.renderAdd(newToDo.id);
  }

  /**
   * Receive id in custom event object and return new todo list after removing the id
   * @param {Object} e Event Object
   */
  deleteTodo(e) {
    const id = e.detail.id;

    this.todos = this.todos.filter((item) => item.id !== id);
    this.updateLocalStorage();
    this.renderDelete(id);
  }

  /**
   * Receive id in custom event object and return new todo list after toggling the complete status of id
   * @param {Object} e Event Object
   */
  toggleTodo(e) {
    const id = e.detail.id;
    
    console.log(this.todos);
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

    console.log(this.todos);
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

  /**
   * Set Attributes fot todo-item web component element
   * @param {Object} todoItem  HTML element
   * @param {Object} item Todo Item with key id, title, isComplete and priority
   */
  setItemAttributes(todoItem, item) {
    todoItem.setAttribute('id', item.id);
    todoItem.setAttribute('title', item.title);
    todoItem.setAttribute('priority', item.priority);
    todoItem.setAttribute('isComplete', item.isComplete);
  }

  renderAdd(id) {
    const item = this.todos.filter((it) => it.id === id)[0];

    this.createTodoElement(item);
  }

  renderDelete(id) {
    const elem = this.root.querySelector('todo-item' + '#' + id);

    elem.parentNode.removeChild(elem);
  }

  createTodoElement(item) {
    const todoItem = document.createElement('todo-item');

    this.setItemAttributes(todoItem, item);
    // Register custom onDeleteTodo event listener which we are going to dispatch from todo item
    todoItem.addEventListener('onDeleteTodo', this.deleteTodo.bind(this));

    // Register custom onToggleTodo event listener which we are going to dispatch from todo item
    todoItem.addEventListener('onToggleTodo', this.toggleTodo.bind(this));

    // Register custom onToggleTodoPriority event listener which we are going to dispatch from todo item
    todoItem.addEventListener('onToggleTodoPriority', this.togglePriority.bind(this));

    this.listElement.appendChild(todoItem);
  }

  render() {
    // if (!this.listElement) return;
    render(this.listTemplate(this.todos),this.root);
    // this.todos.forEach((item) => {
    //   this.createTodoElement(item);
    // });
  }
}

window.customElements.define('todo-list', TodoList);