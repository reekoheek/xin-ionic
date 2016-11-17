import xin from 'xin';

import './css/ion-menu.css';

class IonMenu extends xin.Component {
  get props () {
    return {
      type: {
        type: String,
        value: 'overlay',
        observer: '_typeChanged',
      },
    };
  }

  get template () {
    return `
      <div class="menu-inner"><slot></slot></div>
      <ion-backdrop (click)="close" role="presentation" class="show-backdrop"></ion-backdrop>
    `;
  }

  attached () {
    super.attached();

    this._attached = true;
    this.fire('-menu-attached');
  }

  open () {
    this.isOpened = true;
    this.classList.add('show-menu');
    this.async(() => {
      this.$$('.menu-inner').style.transform = 'translateX(0)';
      this.$$('ion-backdrop').style.opacity = '0.6';
    }, 1);
  }

  close () {
    return new Promise((resolve, reject) => {
      if (!this.isOpened) {
        return resolve();
      }

      this.isOpened = false;

      this.once('transitionend', '.menu-inner', () => {
        this.async(() => {
          this.classList.remove('show-menu');
          resolve();
        });
      });

      this.$$('.menu-inner').style.transform = '';
      this.$$('ion-backdrop').style.opacity = '0.0';
    });
  }

  toggle () {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  _typeChanged (type) {
    this.setAttribute('type', type);
  }
}

xin.define('ion-menu', IonMenu);

export default IonMenu;
