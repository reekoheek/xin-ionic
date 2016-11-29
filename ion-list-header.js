import xin from 'xin';

class IonListHeader extends xin.Component {
  get template () {
    return '' +
    `
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

  attached () {
    let mode = this.__app && this.__app.platformMode || 'md';
    this.classList.add(`item`);
    this.classList.add(`list-header-${mode}`);
  }
}

xin.define('ion-list-header', IonListHeader);

export default IonListHeader;
