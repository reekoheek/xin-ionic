import xin from 'xin';

import './css/ion-content.css';

class IonContent extends xin.Component {
  get props () {
    return {
      scrollX: {
        type: Boolean,
        value: false,
      },

      scrollY: {
        type: Boolean,
        value: false,
      },
    };
  }

  ready () {
    if (this.scrollX) {
      this.classList.add('scroll-x');
    } else {
      this.classList.remove('scroll-x');
    }

    if (this.scrollY) {
      this.classList.add('scroll-y');
    } else {
      this.classList.remove('scroll-y');
    }
  }

  attached () {
    if (this.scrollX || this.scrollY) {
      this.__templateModel.addEventListener('blur', () => {
        this.scrollTop = 0;
        this.scrollLeft = 0;
      });
    }
  }
}

xin.define('ion-content', IonContent);

export default IonContent;
