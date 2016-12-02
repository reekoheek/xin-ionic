import xin from 'xin';

class IonToolbar extends xin.Component {
  get template () {
    return '' +
    `
      <div class="toolbar-background toolbar-background-md"></div>
      <slot name="left"></slot>
      <slot name="title"></slot>
      <slot name="right"></slot>
    `;
  }

  attached () {
    let mode = (this.__app && this.__app.platformMode) || 'md';

    this.classList.add('toolbar');
    this.classList.add(`toolbar-${mode}`);

    // XXX this is quick fix to non-component style
    this.parentElement.classList.add(`header-${mode}`);
    let titleEl = this.$$('ion-title');
    if (titleEl) {
      titleEl.classList.add(`toolbar-title`);
      titleEl.classList.add(`toolbar-title-${mode}`);
      titleEl.classList.add(`toolbar-content`);
      titleEl.classList.add(`toolbar-content-${mode}`);
    }
  }
}

xin.define('ion-toolbar', IonToolbar);

export default IonToolbar;
