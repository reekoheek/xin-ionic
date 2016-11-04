import xin from 'xin';
import App from 'xin/components/app';
import _ from 'lodash';

class IonApp extends App {
  get props () {
    return _.defaults({
      platform: {
        type: String,
        value: 'android',
      },
      platformMode: {
        type: String,
        computed: '_computePlatformMode(platform)',
      },
    }, super.props);
  }

  get listeners () {
    return _.defaults({
      'backbutton': '_backButtonTapped',
    }, super.listeners);
  }

  created () {
    super.created();

    this.style.height = `${window.innerHeight}px`;
  }

  ready () {
    super.ready();

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
