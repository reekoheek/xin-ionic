import xin from 'xin';

class IonItem extends xin.Component {
  get props () {
    return {
      href: {
        type: String,
      },
    };
  }

  attached () {
    if (this.href) {
      this.addEventListener('click', evt => {
        this.__app.menu.close();
        window.location.href = this.href;
      });
    }
    let mode = this.__app && this.__app.platformMode || 'md';
    this.classList.add(`item-block`);
    this.classList.add(`item`);
    this.classList.add(`item-${mode}`);
  }
}

xin.define('ion-item', IonItem);

export default IonItem;
