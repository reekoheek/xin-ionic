import xin from 'xin';
import App from 'xin/components/app';

class IonApp extends App {
  get props () {
    return xin.mix(super.props, {
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
    return xin.mix(super.listeners, {
      'backbutton': '_backButtonTapped',
    });
  }

  ready () {
    this.classList.add(this.platformMode);
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
