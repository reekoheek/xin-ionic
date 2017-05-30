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

      showNavigationButton: {
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
        <div class="swiper-button-prev"><ion-icon name="arrow-back-outline" role="img" class="icon-ios ion-ios-arrow-back-outline item-icon" aria-label="arrow-back-outline"></ion-icon></div>
        <div class="swiper-button-next"><ion-icon name="arrow-forward-outline" role="img" class="icon-ios ion-ios-arrow-forward-outline item-icon" aria-label="arrow-forward-outline"></ion-icon></div>
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
      
      if (this.showNavigationButton) {
        options.nextButton = '.swiper-button-next';
        options.prevButton = '.swiper-button-prev';
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
