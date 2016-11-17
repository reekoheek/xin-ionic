import xin from 'xin';

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
      <div class="select-text">[[_computeText(value)]]</div>
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
        value: () => ({}),
        notify: true,
      },
    };
  }

  created () {
    this.inputs = [];
    [].forEach.call(this.children, node => {
      if (node.nodeType === window.Node.ELEMENT_NODE && node.matches('ion-option')) {
        let label = node.textContent;
        this.inputs.push({
          type: this.multiple ? 'checkbox' : 'radio',
          value: node.hasAttribute('value') ? node.getAttribute('value') : label,
          label: label,
          checked: node.hasAttribute('checked'),
        });
      }
    });
  }

  ready () {
    let labelEl = this.parentElement.querySelector('ion-label');
    this.label = labelEl ? labelEl.textContent : 'Select';
  }

  attached () {
    let mode = (this.__app && this.__app.platformMode) || 'md';

    this.classList.add(`select-${mode}`);

    let parentEl = this;
    do {
      parentEl = parentEl.parentElement;
    } while (parentEl && parentEl.nodeName !== 'ION-ITEM');

    if (parentEl) {
      parentEl.classList.add(`item-select`);
    }
  }

  _computeText (value) {
    if (!this.inputs) {
      return;
    }

    if (Array.isArray(value)) {
      return value.map(value => {
        let input = this.inputs.find(inp => inp.value === value);
        return input ? input.label : '';
      }).join(', ');
    }

    let input = this.inputs.find(inp => inp.value === value);
    return input ? input.label : '';
  }

  async _selectClicked (evt) {
    evt.stopImmediatePropagation();

    let inputs = clone(this.inputs).map(input => {
      if (this.multiple) {
        input.checked = this.value ? (this.value.indexOf(input.value) !== -1) : false;
      } else {
        input.checked = this.value === input.value;
      }
      return input;
    });

    return System.import('./ion-alert').then(IonAlert => {
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
              this.set('value', data);
              this.set('inputs', inputs);
            },
          },
        ],
      });

      alert.present();
    });
  }
}

xin.define('ion-select', IonSelect);

export default IonSelect;
