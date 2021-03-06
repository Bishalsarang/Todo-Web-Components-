const addFormTemplate = document.createElement('template');

addFormTemplate.innerHTML = `
                            <link rel="stylesheet" href="./components/addForm/style.css">
                            <div class="error hide">Error: Title should be at least 3 characters</div>
                            <form class="add-form">
                                <input
                                    type="text"
                                    placeholder="Add Todo"
                                    class="add-form__input neumo-element"
                                />
                                <input class="neumo-element hide" type="submit" value="submit" />
                            </form>`;

class AddForm extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({
      mode: 'open',
    });
  }

  connectedCallback() {
    const that = this;
    this.root.appendChild(addFormTemplate.content.cloneNode(true));

    this.addFormElement = this.root.querySelector('.add-form');

    this.newTodoElementTitle = this.root.querySelector('.add-form__input');
    this.error = this.root.querySelector('.error');
    that.error.classList.add('hide');

    this.addFormElement.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!that.isValidTitle()) {
        that.error.classList.remove('hide');
        return;
      }

      this.dispatchEvent(
        new CustomEvent('onAddTodo', {
          detail: {
            body: {
              id: 'todo-' + Date.now().toString(),
              title: this.newTodoElementTitle.value,
              isComplete: false,
              priority: 'low',
            },
          },
        }),
      );
      this.newTodoElementTitle.value = '';
      that.error.classList.add('hide');
    });
  }

  isValidTitle() {
    return this.newTodoElementTitle.value.length >= 3;
  }
}

window.customElements.define('add-form', AddForm);
