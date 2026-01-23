import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class GaletComponentDark extends LitElement {
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
    right: { type: String },
    borderRadius: { type: String },
  };

  constructor() {
    super();
    this.width = '192px';
    this.height = '192px';
    this.color = '#236CB9';
    this.top = '60%';
    this.right = '15%';
    this.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
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
          right: ${this.right};
          border-radius: ${this.borderRadius};
        "
      ></div>
    `;
  }
}

customElements.define('galet-component-dark', GaletComponentDark);