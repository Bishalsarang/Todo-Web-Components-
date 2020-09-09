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
      {
        id: 'todo-1',
        title: 'hello',
        priority: 'low',
        isComplete: true,
      },
      {
        id: 'todo-2',
        title: 'Assignment',
        priority: 'high',
        isComplete: false,
      },
      {
        id: 'todo-3',
        title: 'Assignmentq',
        priority: 'med',
        isComplete: false,
      },
    ];
  }

  connectedCallback() {
    this.root.appendChild(template.content.cloneNode(true));
    this.listElement = this.root.querySelector('.todo-list');

    const addForm = this.root.querySelector('add-form');
    addForm.addEventListener('onAddTodo', this.addTodo.bind(this));

    this.render();
  }

  addTodo(e) {
    const { body: newToDo } = e.detail;

    this.todos = [...this.todos, newToDo];
    this.render();
  }

  /**
   * Receive id in custom event object and return new todo list after removing the id
   * @param {Object} e Event Object
   */
  deleteTodo(e) {
    const id = e.detail.id;

    this.todos = this.todos.filter((item) => item.id !== id);

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
  }
  /**
   * Set Attributes fot todo-item web component element
   * @param {Object} todoItem  HTML element
   * @param {Object} item Todo Item with key id, title, isComplete and priority
   */
  setItemAttributes(todoItem, item) {
    console.log(typeof todoItem);

    todoItem.setAttribute('id', item.id);
    todoItem.setAttribute('title', item.title);
    todoItem.setAttribute('priority', item.priority);
    todoItem.setAttribute('isComplete', item.isComplete);
  }

  render() {
    if (!this.listElement) return;
    this.listElement.innerHTML = '';

    this.todos.forEach((item) => {
      const todoItem = document.createElement('todo-item');

      this.setItemAttributes(todoItem, item);

      // Register custom onDeleteTodo event listener which we are going to dispatch from todo item
      todoItem.addEventListener('onDeleteTodo', this.deleteTodo.bind(this));

      // Register custom onToggleTodo event listener which we are going to dispatch from todo item
      todoItem.addEventListener('onToggleTodo', this.toggleTodo.bind(this));

      // Register custom onToggleTodoPriority event listener which we are going to dispatch from todo item
      todoItem.addEventListener('onToggleTodoPriority', this.togglePriority.bind(this));

      this.listElement.appendChild(todoItem);
    });
  }
}

window.customElements.define('todo-list', TodoList);
