
import {LitElement, html} from '@polymer/lit-element';

/**
 * AddForm.
 */
class AddForm extends LitElement {
  /**
   * Constructor.
   */
  constructor() {
    super();
    this.hasError = false;
  }  

  /**
   * 
   */
  static get properties() {
    return {
      hasError: { type: Boolean },
    };
  }

  /**
   * Handle when submit button is clicked.
   */
  handleSubmit() {
    
    return (e) => {
      this.newTodoElementTitle = this.shadowRoot.querySelector('.add-form__input');

      e.preventDefault();

      if (!this.isValidTitle()) {
        this.hasError = true;

        return;
      }

      this.onAddTodo({
        id: 'todo-' + Date.now().toString(),
        title: this.newTodoElementTitle.value,
        isComplete: false,
        priority: 'low',
      });

      this.hasError = false;
      this.newTodoElementTitle.value = '';
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
   * Lit-html template for add-form.
   */
  addFormTemplate(){

    return html`
      <link rel="stylesheet" href="./src/components/addForm/style.css" />

      <div class=${"error " +  (this.hasError ? '': 'hide')}>Error: Title should be at least 3 characters</div>

      <form class="add-form" @submit=${this.handleSubmit()}>
        <input type="text" placeholder="Add Todo" class="add-form__input neumo-element" id="add-form__input"/>
        <input class="neumo-element hide" type="submit" value="submit" />
      </form>
    `;
  }

  /**
   * Renders lit-html template.
   */
  render(){

    return this.addFormTemplate();
  }

}

window.customElements.define('add-form', AddForm);

export default AddForm;