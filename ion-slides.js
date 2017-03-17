import xin from 'xin';

class IonSlides extends xin.Component {
  get props () {
    return Object.assign({}, super.props, {
      options: {
        type: Object,
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

    const options = this.options;

    if (this.showDefaultPagination) {
      options.pagination = '.swiper-pagination';
    }
    console.log(options);
    if (this.showNavigationButton) {
      options.nextButton = '.swiper-button-next';
      options.prevButton = '.swiper-button-prev';
    }

    System.import('swiper').then(Swiper => {
      this.swiper = new Swiper(this.$$('.swiper-container'), options);
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
