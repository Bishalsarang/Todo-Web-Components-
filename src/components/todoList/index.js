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
                title: 'hello',
                priority: 'low',
                isComplete: false,
            },
            {
                title: 'Assignment',
                priority: 'high',
                isComplete: false,

            },
            {
                title: 'Assignment',
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

    render() {
        this.todos.innerHTML = '';
        this.todos.forEach((item, index) => {
            const todoItem = document.createElement('todo-item');

            todoItem.setAttribute('title', item.title);
            todoItem.setAttribute('priority', item.priority);

            this.listElement.appendChild(todoItem);
        });

    }

}

window.customElements.define('todo-list', TodoList);