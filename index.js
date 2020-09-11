import {LitElement, html, css} from '@polymer/lit-element';

class ProjectCard extends LitElement{



    render(){
        return html`
            <div class="card">
                <img src="${this.img}" width=300px>

                <div class="container">
                    <h3> <b> ${this.name} </b> </h3>
                    <p> <a href="${this.url}"> Project Link </a></p>
                </div>
            </div>
        `;
    }

    constructor(){
        super();
        this.name = "Project Name";
        this.url = "https://google.com";
        this.img = "https://img.icons8.com/cotton/2x/folder-invoices.png"
    }

    static get properties(){
        return{
            name: { type: String },
            url: { type: String},
            img: { type: String}
        };
    }

}

window.customElements.define('project-card', ProjectCard);