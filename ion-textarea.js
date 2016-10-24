
import xin from 'xin';

class IonTextArea extends xin.Component {
  get template () {
    return `
      <textarea id="input" class="text-input" autocomplete="off" autocorrect="off" placeholder="" (input)="_inputChanged" (focus)="_gotFocus(evt)" (blur)="_lostFocus(evt)"></textarea>
    `;
  }

  get props () {
    return {
      value: {
        type: String,
        value: '',
        notify: true,
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

xin.define('ion-textarea', IonTextArea);

export default IonTextArea;
