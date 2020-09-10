const template = document.createElement('template');
template.innerHTML = `
<add-form></add-form>
<ul class='todo-list'></ul>
`;

const PRIORITIES = ['low', 'med', 'high'];

class TodoList extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({
      mode: 'open',
    });

    // To Keep track of what id are already drawn
    this.drawnKeyId = new Set();

    this.todos = [

    ];
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));
    this.listElement = this.root.querySelector('.todo-list');

    const addForm = this.root.querySelector('add-form');
    addForm.addEventListener('onAddTodo', this.addTodo.bind(this));

    // LOad state frm local storage
    this.getLocalStorage();
    this.render();
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
    const item = this.todos.filter(it => it.id == id)[0];
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
    if (!this.listElement) return;

    this.todos.forEach((item) => {
      this.createTodoElement(item);
    });
  }
}

window.customElements.define('todo-list', TodoList);