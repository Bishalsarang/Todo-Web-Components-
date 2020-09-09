const todoItemTemplate = document.createElement('template');

todoItemTemplate.innerHTML = `
<link rel="stylesheet" href="./components/todoItem/style.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous">

<div class="task neumo-element ">
    <div class="info">
        <div class="check">
            <div class="check__icon hide">
            <i class="fas fa-check"></i>
             </div>
        </div>
        <p class="task__title"></p>
    </div>
    <div class="task__controls">
        <div class="task__priority neumo-element">
            low
        </div>
        <button class="btn-delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>
</div>
`
class TodoItem extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'open'
        });

    }

    getTodoAttributes() {
        this.id = this.getAttribute('id');
        this.title = this.getAttribute('title');
        this.priority = this.getAttribute('priority');

        this.isComplete = this.getAttribute('isComplete') === 'true';
        console.log((this.isComplete));
    }

    connectedCallback() {

        this.getTodoAttributes();
        this.root.appendChild(todoItemTemplate.content.cloneNode(true));

        this.deleteButton = this.root.querySelector('.btn-delete');

        this.deleteButton.addEventListener('click', (e) => {
            e.preventDefault();

            this.dispatchEvent(new CustomEvent('onDeleteTodo', {
                detail: {
                    id: this.id
                }
            }));
        });

        this.toggleButton = this.root.querySelector('.check');
        this.toggleButton.addEventListener('click', (e) => {
            e.preventDefault();

            this.dispatchEvent(new CustomEvent('onToggleTodo', {
                detail: {
                    id: this.id
                }
            }))
        })

        this.render();
    }

    disconnectedCallback() {
        // Remove event Listeners
    }


    render() {
        // Title
        const todoItemElementTitle = this.root.querySelector('.task__title');
        todoItemElementTitle.textContent = this.title;

        // Priority
        const todoItemElementPriority = this.root.querySelector('.task__priority');
        todoItemElementPriority.textContent = this.priority;
        todoItemElementPriority.classList.add(this.priority);

        // isComplete
        const todoItemElementCheck = this.root.querySelector('.check__icon');
        !!this.isComplete ?
            todoItemElementCheck.classList.remove('hide') :
            todoItemElementCheck.classList.add('hide');
    }

}

window.customElements.define('todo-item', TodoItem);