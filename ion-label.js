import xin from 'xin';

class IonLabel extends xin.Component {
  get props () {
    return {
      color: {
        type: String,
        value: 'primary',
      },

      floating: {
        type: Boolean,
      },

      stacked: {
        type: Boolean,
      },

      fixed: {
        type: Boolean,
      },
    };
  }

  attached () {
    let mode = (this.__app && this.__app.platformMode) || 'md';

    this.classList.add(`label-${mode}`);

    if (this.color) {
      this.classList.add(`label-${mode}-${this.color}`);
    }

    let parentEl = this;
    do {
      parentEl = parentEl.parentElement;
    } while (parentEl && parentEl.nodeName !== 'ION-ITEM');

    if (parentEl) {
      if (this.floating) {
        parentEl.classList.add(`item-label-floating`);
      } else if (this.stacked) {
        parentEl.classList.add(`item-label-stacked`);
      } else if (this.fixed) {
        parentEl.classList.add(`item-label-fixed`);
      }
    }
  }
}

xin.define('ion-label', IonLabel);

export default IonLabel;
