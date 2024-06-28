import { LitElement, html, css } from 'lit';

class BasicWebComponent extends LitElement {
  static styles = css`
    /* CSS styles specific to this component */
    :host {
      display: block;
      padding: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
    }
  `;

  render() {
    return html`
      <h2>Welcome to my Basic Web Component!</h2>
      <p>This is a simple example of a web component created with Lit.</p>
      <button @click=${this.handleClick}>Click me!</button>
    `;
  }

  handleClick() {
    alert('Button clicked!');
  }
}

customElements.define('basic-web-component', BasicWebComponent);
