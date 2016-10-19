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
      <div class="menu-inner"><slot></slot></div>
      <ion-backdrop role="presentation" class="show-backdrop"></ion-backdrop>
    `;
  }

  get listeners () {
    return {
      'click ion-backdrop': 'close',
      // 'touchstart .menu-inner': '_touchStarted',
    };
  }

  // FIXME implement drag to open or close
  // _touchStarted (evt) {
  //   let menuInnerEl = this.$$('.menu-inner');
  //   let originalX = evt.touches[0].pageX;
  //   let onMove = evt => {
  //     let posX = evt.touches[0].pageX - originalX;
  //     if (posX > 0) {
  //       posX = 0;
  //     }
  //     menuInnerEl.style.transform = `translateX(${posX}px)`;
  //   };
  //
  //   let onEnd = evt => {
  //     this.removeEventListener('touchmove', onMove);
  //     this.removeEventListener('touchend', onEnd);
  //     this.removeEventListener('touchcancel', onEnd);
  //   };
  //
  //   this.addEventListener('touchmove', onMove);
  //   this.addEventListener('touchend', onEnd);
  //   this.addEventListener('touchcancel', onEnd);
  // }

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
