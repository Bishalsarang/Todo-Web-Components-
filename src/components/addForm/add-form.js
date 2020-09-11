import { html, render } from '../../../node_modules/lit-html';

/**
 * AddForm.
 */
class AddForm extends HTMLElement {
  /**
   * 
   */
  constructor() {
    super();

    this.root = this.attachShadow({
      mode: 'open',
    });
  }

  /**
   * Runs when element is created.
   */
  connectedCallback() {

    this.render();

    this.newTodoElementTitle = this.root.querySelector('.add-form__input');

    this.error = this.root.querySelector('.error');
    this.error.classList.add('hide');
  }

  /**
   * Handle when submit button is clicked.
   */
  handleSubmit() {
    return (e) => {
      e.preventDefault();

      if (!this.isValidTitle()) {
        this.error.classList.remove('hide');

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
        }));

      this.newTodoElementTitle.value = '';
      this.error.classList.add('hide');
    };
  }

  /**
   * 
   * @returns True if title is valid.
   */
  isValidTitle() {
    return this.newTodoElementTitle.value.length >= 3;
  }

  /**
   * lit-html template for add-form
   */
  addFormTemplate(){

    return html`
      <link rel="stylesheet" href="./components/addForm/style.css" />

      <div class="error hide">Error: Title should be at least 3 characters</div>

      <form class="add-form" @submit=${this.handleSubmit()}>
        <input type="text" placeholder="Add Todo" class="add-form__input neumo-element" />
        <input class="neumo-element hide" type="submit" value="submit" />
      </form>
    `;
  }

  /**
   * Renders lit-html template.
   */
  render(){
    render(this.addFormTemplate(), this.root);
  }

}

window.customElements.define('add-form', AddForm);

export default AddForm;