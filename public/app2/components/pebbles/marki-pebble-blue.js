class MarkiPebbleBlue extends window.LitElement {
  static styles = window.css`
    .pebble {
      width: 300px;
      height: 200px;
      background-color: #007ace;
      border-radius: 55% 45% 35% 65% / 55% 45% 65% 35%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: -10px;
      right: -30px;
      transform: rotate(-15deg) translateZ(0);
      z-index: -10;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    
    .pebble-content {
      color: white;
      font-size: 48px;
      font-weight: bold;
    }
  `;

  render() {
    return window.html`
      <div class="pebble">
        <div class="pebble-content">
        </div>
      </div>
    `;
  }
}

customElements.define('marki-pebble-blue', MarkiPebbleBlue);
