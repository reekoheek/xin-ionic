import xin from 'xin';

// import 'xin/components/repeat';

// const DEFAULT_HANDLER = () => ({});

let element;

class IonPopover extends xin.Component {
  static create (options) {
    if (!element) {
      element = document.createElement('ion-popover');
    }

    element.all(Object.assign({
      title: '',
      subtitle: '',
      inputs: [],
      enableBackdropDismiss: true,
      buttons: [],
    }, options));

    return element;
  }

  get props () {
    return {
      // title: {
      //   type: String,
      //   value: '',
      //   observer: '_titleChanged',
      // },
      //
      // subtitle: {
      //   type: String,
      //   observer: '_subtitleChanged',
      // },
      //
      // message: {
      //   type: String,
      //   observer: '_messageChanged',
      // },
      //
      // inputs: {
      //   type: Array,
      //   observer: '_inputsChanged',
      // },
      //
      // buttons: {
      //   type: Array,
      //   observer: '_buttonsChanged',
      // },

      // enableBackdropDismiss: {
      //   type: Boolean,
      // },
    };
  }

  // <div nav-viewport=""></div>
  // <ion-list>
  // <ion-item class="item item-block item-ios><ion-label class="label-ios">View Map</ion-label></ion-item>
  // <ion-item class="item item-block item-ios><ion-label class="label-ios">Detail</ion-label></ion-item>
  // </ion-list>
  get template () {
    return '' +
    `
    <ion-backdrop (click)="_ionBackdropClicked()" id="backDrop" disable-activated="" role="presentation" tappable=""></ion-backdrop>
    <div class="popover-wrapper" >
      <div class="popover-arrow"></div>
      <div class="popover-content">
        <div class="popover-viewport"></div>
      </div>
    </div>
    `;
  }

  // get listeners () {
  //   return {
  //     'click .popover-checkbox': '_checkboxClicked(evt)',
  //     'click .popover-radio': '_radioClicked(evt)',
  //     'click .popover-button': '_buttonClicked(evt)',
  //   };
  // }

  // _computeType (type) {
  //   return type || 'text';
  // }

  // created () {
  //   this.role = 'dialog';
  //   this.style.zIndex = '9999';
  // }

  present (options) {
    xin('app').appendChild(this);

    this.async(() => {
      let mode = xin('app').platformMode || 'md';
      this.classList.add(`popover-${mode}`);

      let popoverWrapperEl = this.$$('.popover-wrapper');
      popoverWrapperEl.style.display = 'none';
      if (typeof options.content === 'string') {
        this.$$('.popover-viewport').innerHTML = options.content;
      } else {
        this.$$('.popover-viewport').innerHTML = '';
        this.$$('.popover-viewport').appendChild(options.content);
      }
      popoverWrapperEl.style.top = options.top + 'px';
      this.async(() => {
        this.$.backDrop.style.opacity = 0.6;
        popoverWrapperEl.style.display = '';
      });
      // popoverWrapperEl.style.transform = 'scale(1)';
      // popoverWrapperEl.style.webkitTransform = 'scale(1)';
    }, 100);
  }

  dismiss () {
    let popoverWrapperEl = this.$$('.popover-wrapper');

    this.$.backDrop.style.opacity = '';
    popoverWrapperEl.style.opacity = '';
    popoverWrapperEl.style.transform = '';
    popoverWrapperEl.style.webkitTransform = '';

    xin.event(this.$.backDrop).on('transitionend', () => {
      xin.event(this.$.backDrop).off('transitionend');
      this.async(() => {
        xin('app').removeChild(this);
      });
    });
  }

  // _titleChanged (title) {
  //   this.async(() => {
  //     let placeholderEl = this.$$('.popover-title');
  //     if (!placeholderEl) {
  //       return;
  //     }
  //     if (title) {
  //       placeholderEl.style.display = '';
  //     } else {
  //       placeholderEl.style.display = 'none';
  //     }
  //   });
  // }

  // _subtitleChanged (subtitle) {
  //   this.async(() => {
  //     let placeholderEl = this.$$('.popover-sub-title');
  //     if (!placeholderEl) {
  //       return;
  //     }
  //     if (subtitle) {
  //       placeholderEl.style.display = '';
  //     } else {
  //       placeholderEl.style.display = 'none';
  //     }
  //   });
  // }

  // _messageChanged (message) {
  //   this.async(() => {
  //     let placeholderEl = this.$$('.popover-message');
  //     if (!placeholderEl) {
  //       return;
  //     }
  //     if (message) {
  //       placeholderEl.style.display = '';
  //     } else {
  //       placeholderEl.style.display = 'none';
  //     }
  //   });
  // }

  // _buttonsChanged (buttons) {
  //   this.async(() => {
  //     let placeholderEl = this.$$('.popover-button-group');
  //     if (!placeholderEl) {
  //       return;
  //     }
  //     if (buttons) {
  //       placeholderEl.style.display = '';
  //     } else {
  //       placeholderEl.style.display = 'none';
  //     }
  //   });
  // }

  // _inputsChanged (inputs) {
  //   this.async(() => {
  //     this.$$('.popover-input-group').style.display = 'none';
  //     this.$$('.popover-checkbox-group').style.display = 'none';
  //     this.$$('.popover-radio-group').style.display = 'none';
  //
  //     if (inputs && inputs.length) {
  //       switch (inputs[0].type) {
  //         case 'checkbox':
  //           this.$$('.popover-checkbox-group').style.display = '';
  //           break;
  //         case 'radio':
  //           this.$$('.popover-radio-group').style.display = '';
  //           break;
  //         default:
  //           this.$$('.popover-input-group').style.display = '';
  //           break;
  //       }
  //     }
  //   });
  // }
  //
  // _checkboxClicked (evt) {
  //   evt.stopImmediatePropagation();
  //
  //   let repeat = this.$.checkboxRepeat;
  //   let model = repeat.modelForElement(evt.target);
  //   if (model) {
  //     let item = model.get(repeat.as);
  //     item.checked = !item.checked;
  //     model.notify(repeat.as);
  //   }
  // }
  //
  // _radioClicked (evt) {
  //   evt.stopImmediatePropagation();
  //
  //   let repeat = this.$.radioRepeat;
  //   let model = repeat.modelForElement(evt.target);
  //   if (model) {
  //     this.$.radioRepeat.rows.forEach(row => {
  //       if (row === model) {
  //         row.set('item.checked', true);
  //       } else {
  //         row.set('item.checked', false);
  //       }
  //     });
  //   }
  // }
  //
  // _buttonClicked (evt) {
  //   evt.stopImmediatePropagation();
  //
  //   let repeat = this.$.buttonRepeat;
  //   let model = repeat.modelForElement(evt.target);
  //   if (!model) {
  //     return;
  //   }
  //
  //   let item = model.get(repeat.as);
  //
  //   let result;
  //   if (this.inputs) {
  //     this.inputs.forEach(input => {
  //       if (input.type === 'checkbox') {
  //         if (input.checked) {
  //           result = result || [];
  //           result.push('value' in input ? input.value : input.label);
  //         }
  //       } else if (input.type === 'radio') {
  //         if (input.checked) {
  //           result = 'value' in input ? input.value : input.label;
  //           return false;
  //         }
  //       } else {
  //         if ('name' in input) {
  //           result = result || {};
  //           result[input.name] = input.value;
  //         }
  //       }
  //     });
  //   }
  //
  //   let handler = item.handler || DEFAULT_HANDLER;
  //   if (handler(result) !== false) {
  //     this.dismiss();
  //   }
  // }

  _ionBackdropClicked (evt) {
    // if (this.enableBackdropDismiss) {
    this.dismiss();
    // }
  }
}

xin.define('ion-popover', IonPopover);

export default IonPopover;
