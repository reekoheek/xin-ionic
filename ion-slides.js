import xin from 'xin';

class IonSlides extends xin.Component {
  get props () {
    return Object.assign({}, super.props, {
      options: {
        type: Object,
        value: () => ({}),
      },

      showDefaultPagination: {
        type: Boolean,
      },
    });
  }

  get template () {
    return String(`
      <div class="swiper-container swiper-container-horizontal">
        <div class="swiper-wrapper">
          <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    `);
  }

  attached () {
    super.attached();

    System.import('swiper').then(Swiper => {
      const { options } = this;

      if (this.showDefaultPagination) {
        options.pagination = '.swiper-pagination';
      }

      this.async(() => {
        this.swiper = new Swiper(this.$$('.swiper-container'), options);
      }, 300);
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
