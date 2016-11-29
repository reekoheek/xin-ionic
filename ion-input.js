
import xin from 'xin';

class IonInput extends xin.Component {
  get template () {
    return '' +
    `
      <input id="input" class="text-input" autocomplete="off" autocorrect="off" type$="[[type]]" placeholder="[[placeholder]]" (focus)="_gotFocus(evt)" (blur)="_lostFocus(evt)" value="{{value}}">
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
        observer: '_valueChanged(value)',
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

  get itemElement () {
    if (!this._itemElement) {
      let itemEl = this.parentElement;
      while (itemEl && !itemEl.matches('ion-item')) {
        itemEl = itemEl.parentElement;
      }
      this._itemElement = itemEl;
    }

    return this._itemElement;
  }

  attached () {
    let mode = (this.__app && this.__app.platformMode) || 'md';

    this.classList.add(`text-input-${mode}`);

    this.itemElement.classList.add('item-input');
  }

  _valueChanged (value) {
    if (value) {
      this.itemElement.classList.add('input-has-value');
    } else {
      this.itemElement.classList.remove('input-has-value');
    }
  }

  _gotFocus (evt) {
    evt.stopImmediatePropagation();
    this.itemElement.classList.add('input-has-focus');
    this.fire('focus');
  }

  _lostFocus (evt) {
    evt.stopImmediatePropagation();
    this.itemElement.classList.remove('input-has-focus');
    this.fire('blur');
  }
}

xin.define('ion-input', IonInput);

export default IonInput;
