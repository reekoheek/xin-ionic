import xin from 'xin';
import html from './ion-alert.html';

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
      content: '',
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

      content: {
        type: String,
        value: '',
        observer: '_contentChanged',
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
    return html;
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

    return new Promise(resolve => {
      this.async(() => {
        this.onBackButton = async (e) => {
          await this.dismiss();
        };
        document.addEventListener('backbutton', this.onBackButton, false);

        let mode = xin('app').platformMode || 'md';
        this.classList.add(`alert-${mode}`);

        let alertWrapperEl = this.$$('.alert-wrapper');
        this.$.backDrop.style.opacity = 0.6;
        alertWrapperEl.style.opacity = 1;
        alertWrapperEl.style.transform = 'scale(1)';
        alertWrapperEl.style.webkitTransform = 'scale(1)';

        resolve();
      }, 100);
    });
  }

  dismiss () {
    document.removeEventListener('backbutton', this.onBackButton, false);

    let alertWrapperEl = this.$$('.alert-wrapper');

    this.$.backDrop.style.opacity = '';
    alertWrapperEl.style.opacity = '';
    alertWrapperEl.style.transform = '';
    alertWrapperEl.style.webkitTransform = '';

    return new Promise(resolve => {
      this.once('transitionend', this.$.backDrop, () => {
        this.async(() => {
          xin('app').removeChild(this);

          resolve();
        });
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

  _contentChanged (content) {
    this.async(() => {
      let placeholderEl = this.$$('.alert-message');
      if (!placeholderEl) {
        return;
      }
      if (content) {
        placeholderEl.style.display = '';
        placeholderEl.innerHTML = content;
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
