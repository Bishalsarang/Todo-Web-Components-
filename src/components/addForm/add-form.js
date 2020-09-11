// import { html, render } from '../../../node_modules/lit-html';
import {LitElement, html, css} from '@polymer/lit-element';
/**
 * AddForm.
 */
class AddForm extends LitElement {
  /**
   * 
   */
  constructor() {
    super();
    this.hasError = false;
  }



  

  /**
   * Runs when element is created.
   */
  connectedCallback() {
    super.connectedCallback()
console.log(this.shadowRoot.querySelector('.add-from__input'))

    // this.render();

    this.newTodoElementTitle = this.shadowRoot.querySelector('.add-form__input');

    // this.error = this.root.querySelector('.error');
    // this.error.classList.add('hide');
  }

  firstUpdated(){
    console.log("hi" + this.renderRoot.querySelector('.add-from__input'));
    this.requestUpdate();



    
  }

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
      console.log(this.shadowRoot.querySelector('.add-form__input').value)
      e.preventDefault();

      if (!this.isValidTitle()) {
        // this.error.classList.remove('hide');
        this.hasError = true;

        return;
      }

      console.log("here")
      // this.dispatchEvent(
      //   new CustomEvent('onAddTodo', {
      //     detail: {
      //       body: {
      //         id: 'todo-' + Date.now().toString(),
      //         title: this.newTodoElementTitle.value,
      //         isComplete: false,
      //         priority: 'low',
      //       },
      //     },
      //   }));

      this.onAddTodo({
        id: 'todo-' + Date.now().toString(),
        title: this.newTodoElementTitle.value,
        isComplete: false,
        priority: 'low',
      });
      this.newTodoElementTitle.value = '';
      this.hasError = false;
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
    // render(this.addFormTemplate(), this.root);
    return this.addFormTemplate();
  }

}

window.customElements.define('add-form', AddForm);

export default AddForm;