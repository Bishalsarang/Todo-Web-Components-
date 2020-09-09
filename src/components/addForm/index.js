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

    handleSubmit(e) {
        e.preventDefault();
        console.log(this);
        this.dispatchEvent(new CustomEvent('onDeleteTodo', {
            detail: {
                id: '1'
            }
        }))


    }


    connectedCallback() {
        this.root.appendChild(addFormTemplate.content.cloneNode(true));

        this.addFormElement = this.root.querySelector('.add-form');


        this.addFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("here")
            this.dispatchEvent(new CustomEvent('onAddTodo', {
                detail: {
                    body: {
                        id: 4,
                        title: 'Naya',
                        isComplete: false,
                        priority: 'low'
                    }
                }
            }));
        });
        this.render();
    }


    render() {

    }

}

window.customElements.define('add-form', AddForm);