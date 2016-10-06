import xin from 'xin';

class IonButton extends xin.Component {
  get template () {
    return `
      <span class="button-inner"><slot>Button</slot></span>
      <div class="button-effect"></div>
    `;
  }

  get props () {
    return {
      outline: {
        type: Boolean,
        value: false,
      },

      color: {
        type: String,
        value: '',
      },

      full: {
        type: Boolean,
        value: false,
      },

      block: {
        type: Boolean,
        value: false,
      },

      round: {
        type: Boolean,
        value: false,
      },

      fab: {
        type: Boolean,
        value: false,
      },

      small: {
        type: Boolean,
        value: false,
      },

      large: {
        type: Boolean,
        value: false,
      },
    };
  }

  attached () {
    let platform = this.__app && this.__app.platform;
    let design = platform === 'android' ? 'md' : 'ios';

    let classList = ['button'];

    // outline
    classList.push(this.outline ? 'button-outline' : 'button-default');

    // platform
    classList.push(`button-${design}`);
    classList.push(`button-${this.outline ? 'outline' : 'default'}-${design}`);

    // color
    if (this.color) {
      classList.push(`button-${design}-${this.color}`);
    }

    // shape
    if (this.full) {
      classList.push(`button-full`, `button-full-${design}`);
    }
    if (this.block) {
      classList.push(`button-block`, `button-block-${design}`);
    }
    if (this.round) {
      classList.push(`button-round`, `button-round-${design}`);
    }
    if (this.fab) {
      classList.push(`button-fab`, `button-fab-${design}`);
    }

    // size
    if (this.small) {
      classList.push(`button-small`, `button-small-${design}`);
    }
    if (this.large) {
      classList.push(`button-large`, `button-large-${design}`);
    }

    this.classList.add.apply(this.classList, classList);
  }
}

xin.define('ion-button', IonButton, { extends: 'button' });

export default IonButton;
