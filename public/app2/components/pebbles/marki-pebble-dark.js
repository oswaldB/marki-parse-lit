class MarkiPebbleDark extends window.LitElement {
  static styles = window.css`
    .pebble {
      width: 500px;
      height: 450px;
      background-color: #042d62;
      border-radius: 45% 55% 65% 35% / 45% 65% 35% 55%;
      position: fixed;
      left: -30px;
      transform: rotate(10deg) translateZ(0);
      z-index: -20;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
  `;

  render() {
    return window.html`
      <div class="pebble"></div>
    `;
  }
}

customElements.define('marki-pebble-dark', MarkiPebbleDark);