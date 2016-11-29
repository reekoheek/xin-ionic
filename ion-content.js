import xin from 'xin';
import { Async } from 'xin/fn';
import event from 'xin/event';

event(document).on('focusing', (evt) => {
  let target = evt.target;
  let content = target.querySelector('ion-content');
  if (content && !content._resized) {
    content._resize(() => {
      target.classList.add('content-resizing');
    }, () => {
      target.classList.remove('content-resizing');
    });
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
        Async.nextFrame(() => {
          this.scrollTop = 0;
          this.scrollLeft = 0;
        });
      });
    }
  }

  _resize (preCallback, postCallback) {
    let el = this;
    let prevSiblings = [];
    let nextSiblings = [];

    while ((el = el.previousElementSibling)) {
      prevSiblings.push(el);
    }

    el = this;
    while ((el = el.nextElementSibling)) {
      nextSiblings.push(el);
    }

    this._resized = true;

    Async.nextFrame(() => {
      if (preCallback) preCallback();

      Async.nextFrame(() => {
        let paddingTop = prevSiblings.reduce((paddingTop, el) => paddingTop + el.clientHeight, 0);
        let paddingBottom = nextSiblings.reduce((paddingBottom, el) => paddingBottom + el.clientHeight, 0);

        Async.nextFrame(() => {
          this.style.paddingTop = paddingTop + 'px';
          this.style.paddingBottom = paddingBottom + 'px';

          if (postCallback) postCallback();
        });
      });
    });
  }
}

xin.define('ion-content', IonContent);

export default IonContent;
