import xin from 'xin';

import './css/ion-content.css';

xin.event(document).on('focusing', (evt) => {
  let target = evt.target;
  let content = target.querySelector('ion-content');
  if (content && !content._resized) {
    target.style.visibility = 'hidden';
    target.style.display = 'block';

    content._resize();

    target.style.display = '';
    target.style.visibility = '';
  }
});

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
    super.ready();

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
    super.attached();

    this._resized = false;

    if (this.scrollX || this.scrollY) {
      this.__templateModel.on('blur', evt => {
        this.scrollTop = 0;
        this.scrollLeft = 0;
      });
    }
  }

  _resize () {
    let paddingTop = 0;
    let paddingBottom = 0;

    let el = this;
    while ((el = el.previousElementSibling)) {
      paddingTop += el.clientHeight;
    }

    el = this;
    while ((el = el.nextElementSibling)) {
      paddingBottom += el.clientHeight;
    }

    this.style.paddingTop = paddingTop + 'px';
    this.style.paddingBottom = paddingBottom + 'px';

    this._resized = true;
  }
}

xin.define('ion-content', IonContent);

export default IonContent;
