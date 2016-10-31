import xin from 'xin';

class IonCheckbox extends xin.Component {
  get props () {
    return {
      value: {
        type: Boolean,
        notify: true,
        observer: '_valueChanged',
      },
    };
  }

  get template () {
    return `
      <div id="icon" class="checkbox-icon">
        <div class="checkbox-inner"></div>
      </div>
      <button class="item-cover disable-hover" ion-button="item-cover" role="checkbox" type="button" (tap)="_tapped">
        <span class="button-inner"></span>
        <div class="button-effect"></div>
      </button>
    `;
  }

  attached () {
    let mode = this.__app && this.__app.platformMode || 'md';

    this.classList.add(`checkbox-${mode}`);
    this.classList.add(`checkbox-${mode}-vibrant`);
  }

  _valueChanged (value) {
    if (!this.$.icon) {
      return;
    }

    if (value) {
      this.$.icon.classList.add('checkbox-checked');
    } else {
      this.$.icon.classList.remove('checkbox-checked');
    }
  }

  _tapped () {
    this.set('value', !this.value);
  }
}

xin.define('ion-checkbox', IonCheckbox);

export default IonCheckbox;
