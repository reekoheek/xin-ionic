import xin from 'xin';
import App from 'xin/components/app';

class IonApp extends App {
  get props () {
    let props = super.props;

    props.platform = {
      type: String,
      value: 'ios',
    };

    props.design = {
      type: String,
      computed: '_computeDesign(platform)',
    };

    return props;
  }

  ready () {
    this.classList.add(this.design);
  }

  _computeDesign (platform) {
    return platform === 'android' ? 'md' : platform;
  }
}

xin.define('ion-app', IonApp);

export default IonApp;
