import xin from 'xin';

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
      },
    };
  }

  attached () {
    if (this.href) {
      this.addEventListener('click', evt => {
        this.__app.menu.close();
        window.location.href = this.href;
      });
    }
    let mode = this.__app && this.__app.platformMode || 'md';
    this.classList.add(`item-block`);
    this.classList.add(`item`);
    this.classList.add(`item-${mode}`);
  }
}

xin.define('ion-item', IonItem);

export default IonItem;
