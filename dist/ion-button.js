webpackJsonp([1],{

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xin__ = __webpack_require__(0);
/* globals location */


class IonButton extends __WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].Component {
  get template() {
    return `
      <span class="button-inner"><slot>Button</slot></span>
      <div class="button-effect"></div>
    `;
  }

  get props() {
    return {
      outline: {
        type: Boolean,
        value: false
      },

      color: {
        type: String,
        value: ''
      },

      full: {
        type: Boolean,
        value: false
      },

      block: {
        type: Boolean,
        value: false
      },

      round: {
        type: Boolean,
        value: false
      },

      fab: {
        type: Boolean,
        value: false
      },

      small: {
        type: Boolean,
        value: false
      },

      large: {
        type: Boolean,
        value: false
      },

      menutoggle: {
        type: Boolean,
        value: false
      },

      backbutton: {
        type: Boolean,
        value: false
      },

      href: {
        type: String
      },

      clear: {
        type: Boolean,
        value: false
      },

      pickerOpt: {
        type: Boolean,
        value: false
      }
    };
  }

  _handleClicked(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();

    if (this.href) {
      location.href = this.href;
      return;
    }

    if (this.menutoggle) {
      if (!this.__app.hasMenu || !this.__app.hasMenu()) {
        console.warn('App is not ion-app or does not have menu.');
        return;
      }

      this.__app.openMenu();
      return;
    }

    if (this.backbutton) {
      this.__app.fire('backbutton');
    }
  }

  attached() {
    if (this.href || this.menutoggle || this.backbutton) {
      this.on('click', this._handleClicked);
    }

    let isToolbarChild = false;
    let parentEl = this.parentElement;
    while (parentEl && !isToolbarChild) {
      if (parentEl.matches('.toolbar')) {
        isToolbarChild = true;
      }
      parentEl = parentEl.parentElement;
    }

    let prefix = isToolbarChild ? 'bar-' : '';

    let mode = this.__app && this.__app.platformMode || 'md';

    let classList = ['disable-hover'];

    if (this.pickerOpt) {
      classList.push('picker-opt', `picker-opt-$mode`, 'picker-opt-default', `picker-opt-default-${ mode }`);
    } else {
      // default
      classList.push(`button`);

      // outline
      classList.push(this.outline ? `${ prefix }button-outline` : `${ prefix }button-default`);

      // platform
      classList.push(`${ prefix }button-${ mode }`);
      classList.push(`${ prefix }button-${ this.outline ? 'outline' : 'default' }-${ mode }`);

      // color
      if (this.color) {
        classList.push(`${ prefix }button-${ mode }-${ this.color }`);
      }

      // shape
      if (this.full) {
        classList.push(`${ prefix }button-full`, `${ prefix }button-full-${ mode }`);
      }
      if (this.block) {
        classList.push(`${ prefix }button-block`, `${ prefix }button-block-${ mode }`);
      }
      if (this.round) {
        classList.push(`${ prefix }button-round`, `${ prefix }button-round-${ mode }`);
      }
      if (this.fab) {
        classList.push(`${ prefix }button-fab`, `${ prefix }button-fab-${ mode }`);
      }

      // size
      if (this.small) {
        classList.push(`${ prefix }button-small`, `${ prefix }button-small-${ mode }`);
      }
      if (this.large) {
        classList.push(`${ prefix }button-large`, `${ prefix }button-large-${ mode }`);
      }

      // clear
      if (this.clear) {
        classList.push(`button-clear`, `button-clear-${ mode }`);
      }

      // menutoggle
      if (this.menutoggle) {
        classList.push(`${ prefix }button-menutoggle`, `${ prefix }button-menutoggle-${ mode }`);
      }

      // backbutton
      if (this.backbutton) {
        classList.push(`back-button`, `back-button-${ mode }`, `show-back-button`);
      }
    }

    classList.forEach(className => {
      this.classList.add(className);
    });
  }
}

__WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].define('ion-button', IonButton, { extends: 'button' });

/* harmony default export */ exports["default"] = IonButton;

/***/ }

},[35]);
//# sourceMappingURL=ion-button.js.map