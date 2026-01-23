import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class GaletComponent extends LitElement {
  static styles = css`
    .galet {
      position: fixed;
      opacity: 0.1;
      z-index: -1;
    }
  `;

  static properties = {
    width: { type: String },
    height: { type: String },
    color: { type: String },
    top: { type: String },
    left: { type: String },
    borderRadius: { type: String },
  };

  constructor() {
    super();
    this.width = '256px';
    this.height = '128px';
    this.color = '#509EE3';
    this.top = '15%';
    this.left = '10%';
    this.borderRadius = '30% 70% 70% 30% / 30% 30% 70% 70%';
  }

  render() {
    return html`
      <div
        class="galet"
        style="
          width: ${this.width};
          height: ${this.height};
          background-color: ${this.color};
          top: ${this.top};
          left: ${this.left};
          border-radius: ${this.borderRadius};
        "
      ></div>
    `;
  }
}

customElements.define('galet-component', GaletComponent);