import xin from 'xin';
import App from 'xin/components/app';

import './ion-menu';

class IonApp extends App {
  get props () {
    return Object.assign({}, super.props, {
      platform: {
        type: String,
        value: 'android',
      },
      platformMode: {
        type: String,
        computed: '_computePlatformMode(platform)',
      },
    });
  }

  get listeners () {
    return Object.assign({}, super.listeners, {
      'backbutton': '_backButtonTapped',
    });
  }

  // created () {
  //   super.created();
  //
  //   this.style.height = `${window.innerHeight}px`;
  // }

  ready () {
    super.ready();

    this.classList.add(this.platformMode);
  }

  hasMenu () {
    if ('_menu$' in this === false) {
      this._menu$ = this.getElementsByTagName('ion-menu')[0];
    }

    return this._menu$;
  }

  async openMenu () {
    if (!this.hasMenu()) {
      return;
    }

    this._menu$.open();
  }

  async closeMenu () {
    if (!this.hasMenu()) {
      return;
    }

    this._menu$.close();
  }

  _computePlatformMode (platform) {
    return platform === 'android' ? 'md' : platform;
  }

  _backButtonTapped () {
    window.history.back();
  }
}

xin.define('ion-app', IonApp);

export default IonApp;
