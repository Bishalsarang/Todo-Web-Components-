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
    </div>
</div>
`
class TodoItem extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'open'
        });

        // this.title = this.root.getAttribute('title');
    }

    connectedCallback() {
        this.title = this.getAttribute('title');
        this.isComplete = this.getAttribute('isComplete');
        this.priority = this.getAttribute('priority');

        this.root.appendChild(todoItemTemplate.content.cloneNode(true));

        this.render();
    }


    render() {
        const todoItemElementTitle = this.root.querySelector('.task__title');
        todoItemElementTitle.textContent = this.title;

        const todoItemElementPriority = this.root.querySelector('.task__priority');
        todoItemElementPriority.textContent = this.priority;
        todoItemElementPriority.classList.add(this.priority)


    }

}

window.customElements.define('todo-item', TodoItem);