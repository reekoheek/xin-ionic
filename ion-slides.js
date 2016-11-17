import xin from 'xin';
import Swiper from 'swiper';

class IonSlides extends xin.Component {
  get template () {
    return `
    <div class="swiper-container swiper-container-horizontal">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
    </div>
    `;
  }

  ready () {
    super.ready();

    [].forEach.call(this.querySelectorAll('ion-slide'), el => el.classList.add('swiper-slide'));
  }

  attached () {
    this.async(() => (this.swiper = new Swiper(this.$$('.swiper-container'))), 1);
  }
}

xin.define('ion-slides', IonSlides);

export default IonSlides;
