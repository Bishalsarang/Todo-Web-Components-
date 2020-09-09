const addFormTemplate = document.createElement('template');

addFormTemplate.innerHTML = `
                            <link rel="stylesheet" href="./components/addForm/style.css">
                            <form class="add-form">
                                <input
                                    type="text"
                                    placeholder="Add Todo"
                                    class="add-form__input neumo-element"
                                />
                                <input class="neumo-element hide" type="submit" value="submit" />
                            </form>`


class AddForm extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'open'
        });

    }

    connectedCallback() {
        this.root.appendChild(addFormTemplate.content.cloneNode(true));

        this.addFormElement = this.root.querySelector('.add-form');


        this.addFormElement.addEventListener('submit', (e) => {
            e.preventDefault();

            this.dispatchEvent(new CustomEvent('onAddTodo', {
                detail: {
                    body: {
                        id: Date.now(),
                        title: this.newTodoElementTitle.value,
                        isComplete: false,
                        priority: 'low'
                    }
                }
            }));
        });
        this.render();
    }


    render() {
        this.newTodoElementTitle = this.root.querySelector('.add-form__input');

    }

}

window.customElements.define('add-form', AddForm);