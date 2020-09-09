const template = document.createElement('template');
template.innerHTML = `
<ul  class='todo-list'></ul>
`
class TodoList extends HTMLElement {

    constructor() {
        super();

        this.root = this.attachShadow({
            mode: 'open'
        });

        this.todos = [{
                id: 1,
                title: 'hello',
                priority: 'low',
                isComplete: true,
            },
            {
                id: 2,
                title: 'Assignment',
                priority: 'high',
                isComplete: false,

            },
            {
                id: 3,
                title: 'Assignmentq',
                priority: 'med',
                isComplete: false,
            },

        ]
    }

    connectedCallback() {
        this.root.appendChild(template.content.cloneNode(true));
        this.listElement = this.root.querySelector('.todo-list');

        this.render();
    }

    addTodo() {
        this.todos.push({
            title: 'Assignment',
            isComplete: false
        });
        this.render();
    }

    /**
     * Receive id in custom event object and return new todo list after removing the id
     * @param {Event Object} e 
     */
    deleteTodo(e) {
        const id = e.detail.id;
        this.todos = this.todos.filter(item => item.id !== parseInt(id));

        this.render();
    }

    /**
     * Set Attributes fot todo-item web component element
     * @param {Object} todoItem  HTML element
     * @param {Object} item Todo Item with key id, title, isComplete and priority
     */
    setItemAttributes(todoItem, item) {
        console.log(typeof todoItem)

        todoItem.setAttribute('id', item.id);
        todoItem.setAttribute('title', item.title);
        todoItem.setAttribute('priority', item.priority);
        todoItem.setAttribute('isComplete', item.isComplete);
    }

    render() {
        if (!this.listElement) return;
        this.listElement.innerHTML = '';
        this.todos.forEach((item, index) => {
            const todoItem = document.createElement('todo-item');

            this.setItemAttributes(todoItem, item);

            todoItem.addEventListener('onDeleteTodo', this.deleteTodo.bind(this));
            this.listElement.appendChild(todoItem);
        });

    }

}

window.customElements.define('todo-list', TodoList);