import xin from 'xin';
import App from 'xin/components/app';

class IonApp extends App {
  get props () {
    let props = super.props;

    props.platform = {
      type: String,
      value: 'android',
    };

    props.platformMode = {
      type: String,
      computed: '_computePlatformMode(platform)',
    };

    return props;
  }

  get listeners () {
    return {
      'backbutton': '_backButtonTapped',
    };
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
