
import xin from 'xin';

class IonInput extends xin.Component {
  get template () {
    return `
      <input id="input" class="text-input" autocomplete="off" autocorrect="off" type="[[type]]" placeholder="" (input)="_inputChanged(evt)" (focus)="_gotFocus(evt)" (blur)="_lostFocus(evt)">
      <button class="text-input-clear-icon disable-hover button button-md button-clear button-clear-md" clear="" ion-button="" type="button" hidden="">
        <span class="button-inner"></span>
        <div class="button-effect"></div>
      </button>
    `;
  }

  get props () {
    return {
      value: {
        type: String,
        value: '',
        notify: true,
      },

      type: {
        type: String,
        value: 'text',
      },

      placeholder: {
        type: String,
        value: '',
      },
    };
  }

  attached () {
    let mode = (this.__app && this.__app.platformMode) || 'md';

    this.classList.add(`text-input-${mode}`);

    let itemEl = this.parentElement;
    while (itemEl && !itemEl.matches('ion-item')) {
      itemEl = itemEl.parentElement;
    }
    this._itemElement = itemEl;
    this._itemElement.classList.add('item-input');
  }

  _inputChanged () {
    if (this.$.input.value) {
      this._itemElement.classList.add('input-has-value');
    } else {
      this._itemElement.classList.remove('input-has-value');
    }
  }

  _gotFocus (evt) {
    evt.stopImmediatePropagation();
    this._itemElement.classList.add('input-has-focus');
    this.fire('focus');
  }

  _lostFocus (evt) {
    evt.stopImmediatePropagation();
    this._itemElement.classList.remove('input-has-focus');
    this.fire('blur');
  }
}

xin.define('ion-input', IonInput);

export default IonInput;
