webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _xin = __webpack_require__(1);

	var _xin2 = _interopRequireDefault(_xin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IonButton = function (_xin$Component) {
	  _inherits(IonButton, _xin$Component);

	  function IonButton() {
	    _classCallCheck(this, IonButton);

	    return _possibleConstructorReturn(this, (IonButton.__proto__ || Object.getPrototypeOf(IonButton)).apply(this, arguments));
	  }

	  _createClass(IonButton, [{
	    key: 'attached',
	    value: function attached() {
	      var platform = this.__app && this.__app.platform;
	      var mode = platform === 'android' ? 'md' : 'ios';

	      var classList = ['button'];

	      // outline
	      classList.push(this.outline ? 'button-outline' : 'button-default');

	      // platform
	      classList.push('button-' + mode);
	      classList.push('button-' + (this.outline ? 'outline' : 'default') + '-' + mode);

	      // color
	      if (this.color) {
	        classList.push('button-' + mode + '-' + this.color);
	      }

	      // shape
	      if (this.full) {
	        classList.push('button-full', 'button-full-' + mode);
	      }
	      if (this.block) {
	        classList.push('button-block', 'button-block-' + mode);
	      }
	      if (this.round) {
	        classList.push('button-round', 'button-round-' + mode);
	      }
	      if (this.fab) {
	        classList.push('button-fab', 'button-fab-' + mode);
	      }

	      // size
	      if (this.small) {
	        classList.push('button-small', 'button-small-' + mode);
	      }
	      if (this.large) {
	        classList.push('button-large', 'button-large-' + mode);
	      }

	      this.classList.add.apply(this.classList, classList);
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
	        }
	      };
	    }
	  }]);

	  return IonButton;
	}(_xin2.default.Component);

	_xin2.default.define('ion-button', IonButton, { extends: 'button' });

	exports.default = IonButton;

/***/ }
]);
//# sourceMappingURL=ion-button.js.map
