import xin from 'xin';

import 'xin/components/repeat';

const DEFAULT_HANDLER = () => ({});

let element;

class IonAlert extends xin.Component {
  static create (options) {
    if (!element) {
      element = document.createElement('ion-alert');
    }

    element.all(Object.assign({
      title: '',
      subtitle: '',
      message: '',
      inputs: [],
      enableBackdropDismiss: true,
      buttons: [],
    }, options));

    return element;
  }

  get props () {
    return {
      title: {
        type: String,
        value: '',
        observer: '_titleChanged',
      },

      subtitle: {
        type: String,
        observer: '_subtitleChanged',
      },

      message: {
        type: String,
        value: '',
        observer: '_messageChanged',
      },

      inputs: {
        type: Array,
        observer: '_inputsChanged',
      },

      buttons: {
        type: Array,
        observer: '_buttonsChanged',
      },

      enableBackdropDismiss: {
        type: Boolean,
      },
    };
  }

  get template () {
    return `
      <ion-backdrop id="backDrop" (click)="_ionBackdropClicked(evt)" role="presentation"></ion-backdrop>
      <div class="alert-wrapper">
        <div class="alert-head">
          <h2 class="alert-title">[[title]]</h2>
          <h3 class="alert-sub-title">[[subtitle]]</h3>
        </div>
        <div class="alert-message">[[message]]</div>
        <div>
          <div class="alert-input-group">
            <template is="xin-repeat" items="[[inputs]]">
              <div class="alert-input-wrapper"><input class="alert-input" placeholder="[[item.placeholder]]" type="[[_computeType(item.type)]]" name="[[item.name]]"></div>
            </template>
          </div>
          <div class="alert-checkbox-group">
            <template is="xin-repeat" items="[[inputs]]" id="checkboxRepeat">
              <button class="alert-tappable alert-checkbox disable-hover alert-checkbox-button alert-checkbox-button-md alert-checkbox-button-default alert-checkbox-button-default-md" ion-button="alert-checkbox-button" role="checkbox" aria-checked$="[[item.checked]]">
                <span class="button-inner">
                  <div class="alert-checkbox-icon">
                    <div class="alert-checkbox-inner"></div>
                  </div>
                  <div class="alert-checkbox-label">[[item.label]]</div>
                </span>
                <div class="button-effect" style="transform: translate3d(-7px, -104px, 0px) scale(1); height: 240px; width: 240px; opacity: 0; transition: transform 383ms, opacity 268ms 115ms;"></div>
              </button>
            </template>
          </div>
          <div class="alert-radio-group">
            <template is="xin-repeat" items="[[inputs]]" id="radioRepeat">
              <button class="alert-tappable alert-radio disable-hover alert-radio-button alert-radio-button-md alert-radio-button-default alert-radio-button-default-md" ion-button="alert-radio-button" role="radio" aria-checked$="[[item.checked]]">
                <span class="button-inner">
                  <div class="alert-radio-icon">
                    <div class="alert-radio-inner"></div>
                  </div>
                  <div class="alert-radio-label">[[item.label]]</div>
                </span>
                <div class="button-effect"></div>
              </button>
            </template>
          </div>
        </div>
        <div class="alert-button-group">
          <template is="xin-repeat" items="[[buttons]]" id="buttonRepeat">
            <button ion-button="alert-button" class="disable-hover alert-button alert-button-md alert-button-default alert-button-default-md">
              <span class="button-inner">[[item.text]]</span>
              <div class="button-effect"></div>
            </button>
          </template>
        </div>
      </div>
    `;
  }

  get listeners () {
    return {
      'click .alert-checkbox': '_checkboxClicked(evt)',
      'click .alert-radio': '_radioClicked(evt)',
      'click .alert-button': '_buttonClicked(evt)',
    };
  }

  _computeType (type) {
    return type || 'text';
  }

  created () {
    this.role = 'dialog';
    this.style.zIndex = '9999';
  }

  present () {
    xin('app').appendChild(this);

    this.async(() => {
      let mode = xin('app').platformMode || 'md';
      this.classList.add(`alert-${mode}`);

      let alertWrapperEl = this.$$('.alert-wrapper');
      this.$.backDrop.style.opacity = 0.6;
      alertWrapperEl.style.opacity = 1;
      alertWrapperEl.style.transform = 'scale(1)';
      alertWrapperEl.style.webkitTransform = 'scale(1)';
    }, 100);
  }

  dismiss () {
    let alertWrapperEl = this.$$('.alert-wrapper');

    this.$.backDrop.style.opacity = '';
    alertWrapperEl.style.opacity = '';
    alertWrapperEl.style.transform = '';
    alertWrapperEl.style.webkitTransform = '';

    this.once('transitionend', this.$.backDrop, () => {
      this.async(() => {
        xin('app').removeChild(this);
      });
    });
  }

  _titleChanged (title) {
    this.async(() => {
      let placeholderEl = this.$$('.alert-title');
      if (!placeholderEl) {
        return;
      }
      if (title) {
        placeholderEl.style.display = '';
      } else {
        placeholderEl.style.display = 'none';
      }
    });
  }

  _subtitleChanged (subtitle) {
    this.async(() => {
      let placeholderEl = this.$$('.alert-sub-title');
      if (!placeholderEl) {
        return;
      }
      if (subtitle) {
        placeholderEl.style.display = '';
      } else {
        placeholderEl.style.display = 'none';
      }
    });
  }

  _messageChanged (message) {
    this.async(() => {
      let placeholderEl = this.$$('.alert-message');
      if (!placeholderEl) {
        return;
      }
      if (message) {
        placeholderEl.style.display = '';
      } else {
        placeholderEl.style.display = 'none';
      }
    });
  }

  _buttonsChanged (buttons) {
    this.async(() => {
      let placeholderEl = this.$$('.alert-button-group');
      if (!placeholderEl) {
        return;
      }
      if (buttons) {
        placeholderEl.style.display = '';
      } else {
        placeholderEl.style.display = 'none';
      }
    });
  }

  _inputsChanged (inputs) {
    this.async(() => {
      this.$$('.alert-input-group').style.display = 'none';
      this.$$('.alert-checkbox-group').style.display = 'none';
      this.$$('.alert-radio-group').style.display = 'none';

      if (inputs && inputs.length) {
        switch (inputs[0].type) {
          case 'checkbox':
            this.$$('.alert-checkbox-group').style.display = '';
            break;
          case 'radio':
            this.$$('.alert-radio-group').style.display = '';
            break;
          default:
            this.$$('.alert-input-group').style.display = '';
            break;
        }
      }
    });
  }

  _checkboxClicked (evt) {
    evt.stopImmediatePropagation();

    let repeat = this.$.checkboxRepeat;
    let model = repeat.modelForElement(evt.target);
    if (model) {
      let item = model.get(repeat.as);
      item.checked = !item.checked;
      model.notify(repeat.as);
    }
  }

  _radioClicked (evt) {
    evt.stopImmediatePropagation();

    let repeat = this.$.radioRepeat;
    let model = repeat.modelForElement(evt.target);
    if (model) {
      this.$.radioRepeat.rows.forEach(row => {
        if (row === model) {
          row.set('item.checked', true);
        } else {
          row.set('item.checked', false);
        }
      });
    }
  }

  _buttonClicked (evt) {
    evt.stopImmediatePropagation();

    let repeat = this.$.buttonRepeat;
    let model = repeat.modelForElement(evt.target);
    if (!model) {
      return;
    }

    let item = model.get(repeat.as);

    let result;
    if (this.inputs) {
      this.inputs.forEach(input => {
        if (input.type === 'checkbox') {
          if (input.checked) {
            result = result || [];
            result.push('value' in input ? input.value : input.label);
          }
        } else if (input.type === 'radio') {
          if (input.checked) {
            result = 'value' in input ? input.value : input.label;
            return false;
          }
        } else {
          if ('name' in input) {
            result = result || {};
            result[input.name] = input.value;
          }
        }
      });
    }

    let handler = item.handler || DEFAULT_HANDLER;
    if (handler(result) !== false) {
      this.dismiss();
    }
  }

  _ionBackdropClicked (evt) {
    if (this.enableBackdropDismiss) {
      this.dismiss();
    }
  }
}

xin.define('ion-alert', IonAlert);

export default IonAlert;
