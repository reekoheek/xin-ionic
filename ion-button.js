/* globals location */
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

      menutoggle: {
        type: Boolean,
        value: false,
      },

      backbutton: {
        type: Boolean,
        value: false,
      },

      href: {
        type: String,
      },
    };
  }

  ready () {
    if (this.href) {
      this.addEventListener('click', evt => (location.href = this.href));
    }

    if (this.menutoggle) {
      this.addEventListener('click', evt => {
        evt.preventDefault();

        this.__app.menu.open();
      });
    }

    if (this.backbutton) {
      this.addEventListener('click', evt => {
        evt.preventDefault();

        this.__app.fire('backbutton');
      });
    }
  }

  attached () {
    let isToolbarChild = false;
    let parentEl = this.parentElement;
    while (parentEl && !isToolbarChild) {
      if (parentEl.matches('.toolbar')) {
        isToolbarChild = true;
      }
      parentEl = parentEl.parentElement;
    }

    let prefix = isToolbarChild ? 'bar-' : '';

    let mode = (this.__app && this.__app.platformMode) || 'md';

    let classList = ['button'];

    // default
    classList.push(`disable-hover`);

    // outline
    classList.push(this.outline ? `${prefix}button-outline` : `${prefix}button-default`);

    // platform
    classList.push(`${prefix}button-${mode}`);
    classList.push(`${prefix}button-${this.outline ? 'outline' : 'default'}-${mode}`);

    // color
    if (this.color) {
      classList.push(`${prefix}button-${mode}-${this.color}`);
    }

    // shape
    if (this.full) {
      classList.push(`${prefix}button-full`, `${prefix}button-full-${mode}`);
    }
    if (this.block) {
      classList.push(`${prefix}button-block`, `${prefix}button-block-${mode}`);
    }
    if (this.round) {
      classList.push(`${prefix}button-round`, `${prefix}button-round-${mode}`);
    }
    if (this.fab) {
      classList.push(`${prefix}button-fab`, `${prefix}button-fab-${mode}`);
    }

    // size
    if (this.small) {
      classList.push(`${prefix}button-small`, `${prefix}button-small-${mode}`);
    }
    if (this.large) {
      classList.push(`${prefix}button-large`, `${prefix}button-large-${mode}`);
    }

    // menutoggle
    if (this.menutoggle) {
      classList.push(`${prefix}button-menutoggle`, `${prefix}button-menutoggle-${mode}`);
    }

    // backbutton
    if (this.backbutton) {
      classList.push(`back-button`, `back-button-${mode}`, `show-back-button`);
    }

    classList.forEach(className => {
      this.classList.add(className);
    });
  }
}

xin.define('ion-button', IonButton, { extends: 'button' });

export default IonButton;
