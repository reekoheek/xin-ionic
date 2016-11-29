import xin from 'xin';

class IonSlides extends xin.Component {
  get props () {
    return Object.assign({}, super.props, {
      options: {
        type: Object,
      },
    });
  }

  get template () {
    return '' +
      `<div class="swiper-container swiper-container-horizontal">
        <div class="swiper-wrapper">
          <slot></slot>
        </div>
      </div>`;
  }

  ready () {
    super.ready();

    [].forEach.call(this.querySelectorAll('ion-slide'), el => el.classList.add('swiper-slide'));
  }

  attached () {
    super.attached();

    this.async(() => {
      System.import('swiper').then(Swiper => {
        this.swiper = new Swiper(this.$$('.swiper-container'), this.options);
      });
    }, 1);
  }
}

xin.define('ion-slides', IonSlides);

export default IonSlides;
