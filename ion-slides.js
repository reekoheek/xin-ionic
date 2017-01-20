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
    return String(`
      <div class="swiper-container swiper-container-horizontal">
        <div class="swiper-wrapper">
          <slot></slot>
        </div>
      </div>
    `);
  }

  attached () {
    super.attached();

    System.import('swiper').then(Swiper => {
      this.swiper = new Swiper(this.$$('.swiper-container'), this.options);
    });
  }
}

xin.define('ion-slides', IonSlides);

class IonSlide extends xin.Component {
  created () {
    super.created();

    this.classList.add('swiper-slide');
  }
}

xin.define('ion-slide', IonSlide);

export default IonSlides;
