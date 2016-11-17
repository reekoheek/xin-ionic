webpackJsonp([1],{

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xin = __webpack_require__(0);

var _xin2 = _interopRequireDefault(_xin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals location */


var IonButton = function (_xin$Component) {
  _inherits(IonButton, _xin$Component);

  function IonButton() {
    _classCallCheck(this, IonButton);

    return _possibleConstructorReturn(this, (IonButton.__proto__ || Object.getPrototypeOf(IonButton)).apply(this, arguments));
  }

  _createClass(IonButton, [{
    key: '_handleClicked',
    value: function _handleClicked(evt) {
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
  }, {
    key: 'attached',
    value: function attached() {
      var _this2 = this;

      if (this.href || this.menutoggle || this.backbutton) {
        this.on('click', this._handleClicked);
      }

      var isToolbarChild = false;
      var parentEl = this.parentElement;
      while (parentEl && !isToolbarChild) {
        if (parentEl.matches('.toolbar')) {
          isToolbarChild = true;
        }
        parentEl = parentEl.parentElement;
      }

      var prefix = isToolbarChild ? 'bar-' : '';

      var mode = this.__app && this.__app.platformMode || 'md';

      var classList = ['disable-hover'];

      if (this.pickerOpt) {
        classList.push('picker-opt', 'picker-opt-$mode', 'picker-opt-default', 'picker-opt-default-' + mode);
      } else {
        // default
        classList.push('button');

        // outline
        classList.push(this.outline ? prefix + 'button-outline' : prefix + 'button-default');

        // platform
        classList.push(prefix + 'button-' + mode);
        classList.push(prefix + 'button-' + (this.outline ? 'outline' : 'default') + '-' + mode);

        // color
        if (this.color) {
          classList.push(prefix + 'button-' + mode + '-' + this.color);
        }

        // shape
        if (this.full) {
          classList.push(prefix + 'button-full', prefix + 'button-full-' + mode);
        }
        if (this.block) {
          classList.push(prefix + 'button-block', prefix + 'button-block-' + mode);
        }
        if (this.round) {
          classList.push(prefix + 'button-round', prefix + 'button-round-' + mode);
        }
        if (this.fab) {
          classList.push(prefix + 'button-fab', prefix + 'button-fab-' + mode);
        }

        // size
        if (this.small) {
          classList.push(prefix + 'button-small', prefix + 'button-small-' + mode);
        }
        if (this.large) {
          classList.push(prefix + 'button-large', prefix + 'button-large-' + mode);
        }

        // clear
        if (this.clear) {
          classList.push('button-clear', 'button-clear-' + mode);
        }

        // menutoggle
        if (this.menutoggle) {
          classList.push(prefix + 'button-menutoggle', prefix + 'button-menutoggle-' + mode);
        }

        // backbutton
        if (this.backbutton) {
          classList.push('back-button', 'back-button-' + mode, 'show-back-button');
        }
      }

      classList.forEach(function (className) {
        _this2.classList.add(className);
      });
    }
  }, {
    key: 'template',
    get: function get() {
      return '\n      <span class="button-inner"><slot>Button</slot></span>\n      <div class="button-effect"></div>\n    ';
    }
  }, {
    key: 'props',
    get: function get() {
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
  }]);

  return IonButton;
}(_xin2.default.Component);

_xin2.default.define('ion-button', IonButton, { extends: 'button' });

exports.default = IonButton;

/***/ }

},[29]);
//# sourceMappingURL=ion-button.js.map