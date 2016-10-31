import xin from 'xin';

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
      <style>
      ion-menu ion-backdrop {
        transition: opacity .3s;
        will-change: opacity;
      }

      ion-menu .menu-inner {
        transition: transform .3s;
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
        will-change: transform, -webkit-transform;
      }
      </style>
      <div class="menu-inner"><slot></slot></div>
      <ion-backdrop (click)="close" role="presentation" class="show-backdrop"></ion-backdrop>
    `;
  }

  _typeChanged (type) {
    this.setAttribute('type', type);
  }

  attached () {
    this.__app.menu = this;
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
    this.isOpened = false;

    let onTransitionEnd = () => {
      this.$$('.menu-inner').removeEventListener('transitionend', onTransitionEnd);
      this.async(() => this.classList.remove('show-menu'));
    };
    this.$$('.menu-inner').addEventListener('transitionend', onTransitionEnd);
    this.$$('.menu-inner').style.transform = '';
    this.$$('ion-backdrop').style.opacity = '0';
  }

  toggle () {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }
}

xin.define('ion-menu', IonMenu);

export default IonMenu;
