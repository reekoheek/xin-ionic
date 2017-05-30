import xin from 'xin';

class IonIcon extends xin.Component {
  get props () {
    return {
      name: {
        type: String,
      },
    };
  }

  attached () {
    let mode = (this.__app && this.__app.platformMode) || 'md';

    this.classList.add(`ion-${mode}-${this.name}`);
  }
}

xin.define('ion-icon', IonIcon);

export default IonIcon;
