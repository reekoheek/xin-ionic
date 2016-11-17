import xin from 'xin';
import './css/ion-item.css';

class IonItem extends xin.Component {
  get template () {
    return `
      <slot name="left"></slot>
      <div class="item-inner">
        <div class="input-wrapper">
          <slot></slot>
        </div>
        <ion-reorder>
          <ion-icon name="reorder" role="img" class="icon-md ion-md-reorder" aria-label="reorder"></ion-icon>
        </ion-reorder>
      </div>
      <slot name="right"></slot>
      <div class="button-effect"></div>
    `;
  }

  get props () {
    return {
      href: {
        type: String,
        observer: '_computeHref(href)',
      },
    };
  }

  attached () {
    let mode = this.__app && this.__app.platformMode || 'md';
    this.classList.add(`item-block`);
    this.classList.add(`item`);
    this.classList.add(`item-${mode}`);
  }

  _computeHref (href) {
    if (href) {
      this.on('click', this._clicked);
    } else {
      this.off('click', this._clicked);
    }
  }

  async _clicked (evt) {
    evt.stopImmediatePropagation();

    if (this.__app.hasMenu && this.__app.hasMenu()) {
      await this.__app.closeMenu();
    }

    window.location.href = this.href;
  }
}

xin.define('ion-item', IonItem);

export default IonItem;
