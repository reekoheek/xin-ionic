/* globals Node */

import xin from 'xin';
import IonAlert from './ion-alert';

function clone (orig) {
  try {
    return JSON.parse(JSON.stringify(orig));
  } catch (err) {
    console.error(err.stack);
    throw err;
  }
}

class IonSelect extends xin.Component {
  get template () {
    return `
      <div class="select-text"></div>
      <div class="select-icon">
        <div class="select-icon-inner"></div>
      </div>
      <button aria-haspopup="true" (click)="_selectClicked(evt)" class="item-cover disable-hover item-cover-md item-cover-default item-cover-default-md" ion-button="item-cover">
        <span class="button-inner"></span>
        <div class="button-effect" style="transform: translate3d(197px, -75px, 0px) scale(1); height: 240px; width: 240px; opacity: 0; transition: transform 420ms, opacity 294ms 126ms;"></div>
      </button>
    `;
  }

  get props () {
    return {
      multiple: {
        type: Boolean,
      },

      value: {
        type: Object,
        value: () => {},
        notify: true,
      },
    };
  }

  ready () {
    let labelEl = this.parentElement.querySelector('ion-label');
    this.label = labelEl ? labelEl.textContent : 'Select';

    this.inputs = this.__componentContent.reduce((result, node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.matches('ion-option')) {
        let label = node.textContent;
        result.push({
          type: this.multiple ? 'checkbox' : 'radio',
          value: node.hasAttribute('value') ? node.getAttribute('value') : label,
          label: label,
          checked: node.hasAttribute('checked'),
        });
      }
      return result;
    }, []);
  }

  attached () {
    let mode = (this.__app && this.__app.platformMode) || 'md';

    this.classList.add(`select-${mode}`);

    let parentEl = this.parentElement.parentElement.parentElement.parentElement;
    parentEl.classList.add(`item-select`);
  }

  _selectClicked (evt) {
    evt.stopImmediatePropagation();

    let inputs = clone(this.inputs);

    let alert = IonAlert.create({
      title: this.label,
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          handler: data => {
            if (this.multiple) {
              let checkedInputs = inputs.filter(input => input.checked);
              this.set('value', data);
              this.$$('.select-text').textContent = checkedInputs.map(input => input.label).join(', ');
            } else {
              let checkedInput = inputs.find(input => input.checked);
              this.set('value', data);
              this.$$('.select-text').textContent = checkedInput.label;
            }
            this.set('inputs', inputs);
          },
        },
      ],
    });

    alert.present();
  }
}

xin.define('ion-select', IonSelect);

export default IonSelect;
