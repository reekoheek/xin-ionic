import xin from 'xin';

class IonLabel extends xin.Component {
  get props () {
    return {
      color: {
        type: String,
      },

      floating: {
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

    let parentEl = this.parentElement.parentElement.parentElement.parentElement;
    if (this.floating) {
      parentEl.classList.add(`item-label-floating`);
    }
  }
}

xin.define('ion-label', IonLabel);

export default IonLabel;
