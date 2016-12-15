import xin from 'xin';

class IonLoading extends xin.Component {
  static create (options = {}) {
    if (!IonLoading.instance) {
      IonLoading.instance = document.createElement('ion-loading');
    }

    IonLoading.instance.all(Object.assign({
      showBackdrop: true,
      content: '',
      duration: -1,
    }, options));

    return IonLoading.instance;
  }

  get template () {
    return String(`
      <ion-backdrop id="backDrop" disable-activated="" role="presentation" tappable=""></ion-backdrop>
      <div class="loading-wrapper">
      <div class="loading-spinner">
        <ion-spinner class="spinner-ios spinner-bubbles">
          <svg viewBox="0 0 64 64" style="top: 0px; left: 9px; animation-delay: -1000ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>

          <svg viewBox="0 0 64 64" style="top: 5.78509px; left: 6.8944px; animation-delay: -888.889ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>

          <svg viewBox="0 0 64 64" style="top: 8.86327px; left: 1.56283px; animation-delay: -777.778ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>
          <svg viewBox="0 0 64 64" style="top: 7.79423px; left: -4.5px; animation-delay: -666.667ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>
          <svg viewBox="0 0 64 64" style="top: 3.07818px; left: -8.45723px; animation-delay: -555.556ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>
          <svg viewBox="0 0 64 64" style="top: -3.07818px; left: -8.45723px; animation-delay: -444.444ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>
          <svg viewBox="0 0 64 64" style="top: -7.79423px; left: -4.5px; animation-delay: -333.333ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>
          <svg viewBox="0 0 64 64" style="top: -8.86327px; left: 1.56283px; animation-delay: -222.222ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>
          <svg viewBox="0 0 64 64" style="top: -5.78509px; left: 6.8944px; animation-delay: -111.111ms; animation-duration: 1000ms;">
            <circle transform="translate(32,32)" r="5"></circle>
          </svg>
        </div>
        <div class="loading-content" class.hide="[[content | not]]">[[content]]</div>
      </div>
    `);
  }

  get props () {
    return Object.assign({}, super.props, {
      showBackdrop: {
        type: Boolean,
      },

      content: {
        type: String,
        value: '',
      },

      duration: {
        type: Number,
        value: -1,
      },
    });
  }

  created () {
    super.created();

    this.setAttribute('role', 'dialog');
    this.style.zIndex = '9999';
  }

  present () {
    xin('app').appendChild(this);

    return new Promise(resolve => {
      this.async(() => {
        let mode = xin('app').platformMode || 'md';
        this.classList.add(`loading-${mode}`);

        let loadingWrapperEl = this.$$('.loading-wrapper');
        loadingWrapperEl.style.opacity = 1;
        loadingWrapperEl.style.transform = 'scale(1)';
        loadingWrapperEl.style.webkitTransform = 'scale(1)';

        if (!this.showBackdrop) {
          return resolve();
        }

        this.$.backDrop.style.opacity = 0.6;
        this.once('transitionend', this.$.backDrop, () => {
          this.async(() => {
            resolve();
          });
        });
      }, 100);
    });
  }

  dismiss () {
    let loadingWrapperEl = this.$$('.loading-wrapper');

    this.$.backDrop.style.opacity = '';
    loadingWrapperEl.style.opacity = '';
    loadingWrapperEl.style.transform = '';
    loadingWrapperEl.style.webkitTransform = '';

    return new Promise(resolve => {
      if (!this.showBackdrop) {
        return resolve();
      }

      this.once('transitionend', this.$.backDrop, () => {
        this.async(() => {
          xin('app').removeChild(this);
          resolve();
        });
      });
    });
  }

  _computeOpacity (showBackdrop) {
    return showBackdrop ? '0.6' : '0';
  }
}

xin.define('ion-loading', IonLoading);

export default IonLoading;
