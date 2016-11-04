import xin from 'xin';

import './css/ion-content.css';

xin.event(document).on('focusing', (evt) => {
  let target = evt.target;
  let content = target.querySelector('ion-content');
  if (content) {
    target.style.visibility = 'hidden';
    target.style.display = 'block';

    content.resize();

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

    if (this.scrollX || this.scrollY) {
      this.__templateModel.on('blur', evt => {
        this.scrollTop = 0;
        this.scrollLeft = 0;
      });
    }
  }

  resize () {
    let el = this;
    let topPadding = 0;
    let bottomPadding = 0;
    while ((el = el.previousElementSibling)) {
      topPadding += el.clientHeight;
    }
    el = this;
    while ((el = el.nextElementSibling)) {
      bottomPadding += el.clientHeight;
    }

    this.style.paddingTop = topPadding + 'px';
    this.style.paddingBottom = bottomPadding + 'px';
  }
}

xin.define('ion-content', IonContent);

export default IonContent;
