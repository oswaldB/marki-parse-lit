class MarkiPebbleGray extends window.LitElement {
  static styles = window.css`
    .pebble {
      width: 400px;
      height: 300px;
      background-color: #a6a6a6;
      border-radius: 48% 52% 58% 42% / 58% 48% 42% 52%;
      position: fixed;
      bottom: -40px;
      left: 60px;
      transform: rotate(5deg) translateZ(0);
      z-index: -15;
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

customElements.define('marki-pebble-gray', MarkiPebbleGray);