import xin from 'xin';

let element;

class IonPopover extends xin.Component {
  static create (options) {
    if (!element) {
      element = document.createElement('ion-popover');
    }

    element.all(Object.assign({
      title: '',
      subtitle: '',
      inputs: [],
      enableBackdropDismiss: true,
      buttons: [],
    }, options));

    return element;
  }

  get template () {
    return String(`
      <ion-backdrop (click)="_ionBackdropClicked()" id="backDrop" disable-activated="" role="presentation" tappable=""></ion-backdrop>
      <div class="popover-wrapper" >
        <div class="popover-arrow"></div>
        <div class="popover-content">
          <div class="popover-viewport"></div>
        </div>
      </div>
    `);
  }

  present (options) {
    xin('app').appendChild(this);

    this.async(() => {
      let mode = xin('app').platformMode || 'md';
      this.classList.add(`popover-${mode}`);

      let popoverWrapperEl = this.$$('.popover-wrapper');
      popoverWrapperEl.style.display = 'none';
      if (typeof options.content === 'string') {
        this.$$('.popover-viewport').innerHTML = options.content;
      } else {
        this.$$('.popover-viewport').innerHTML = '';
        this.$$('.popover-viewport').appendChild(options.content);
      }
      popoverWrapperEl.style.top = options.top + 'px';
      this.async(() => {
        this.$.backDrop.style.opacity = 0.6;
        popoverWrapperEl.style.display = '';
      });
    }, 100);
  }

  dismiss () {
    let popoverWrapperEl = this.$$('.popover-wrapper');

    this.$.backDrop.style.opacity = '';
    popoverWrapperEl.style.opacity = '';
    popoverWrapperEl.style.transform = '';
    popoverWrapperEl.style.webkitTransform = '';

    xin.event(this.$.backDrop).on('transitionend', () => {
      xin.event(this.$.backDrop).off('transitionend');
      this.async(() => {
        xin('app').removeChild(this);
      });
    });
  }

  _ionBackdropClicked (evt) {
    this.dismiss();
  }
}

xin.define('ion-popover', IonPopover);

export default IonPopover;
