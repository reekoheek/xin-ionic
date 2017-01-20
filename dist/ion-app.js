webpackJsonp([0],{

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Route {
  static routeRegExp(str) {
    let chunks = str.split('[');

    if (chunks.length > 2) {
      throw new Error('Invalid use of optional params');
    }

    let tokens = [];
    let re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {
      tokens.push(token);
      return '([^/]+)';
    }).replace(/\//g, '\\/');

    let optRe = '';

    if (chunks[1]) {
      optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {
        tokens.push(token);
        return '([^/]+)';
      }).replace(/\//g, '\\/') + ')?';
    }
    return [new RegExp('^' + re + optRe + '$'), tokens];
  }

  static isStatic(pattern) {
    return !pattern.match(/[[{]/);
  }

  constructor(route, callback) {
    this.route = route;
    this.callback = callback;

    if (Route.isStatic(route)) {
      this.type = 's';
      this.pattern = null;
      this.args = [];
    } else {
      let result = Route.routeRegExp(route);
      this.type = 'v';
      this.pattern = result[0];
      this.args = result[1];
    }
  }

  getExecutorFor(fragment) {
    if (this.type === 's') {
      if (fragment === this.route) {
        return { handler: this, args: {} };
      }
    } else if (this.type === 'v') {
      let result = fragment.match(this.pattern);
      if (result) {
        return {
          handler: this,
          args: this.args.reduce((args, name, index) => {
            args[name] = result[index + 1];
            return args;
          }, {})
        };
      }
    }
  }
}

/* harmony default export */ exports["a"] = Route;

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_event_helper__["a"]; });


/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)();
// imports


// module
exports.push([module.i, "ion-menu ion-backdrop {\n  transition: opacity .3s;\n  will-change: opacity;\n}\n\nion-menu .menu-inner {\n  transition: transform .3s;\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  will-change: transform, -webkit-transform;\n}\n", ""]);

// exports


/***/ },

/***/ 22:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },

/***/ 32:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(32)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./ion-menu.css", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./ion-menu.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xin__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xin_components_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ion_menu__ = __webpack_require__(8);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class IonApp extends __WEBPACK_IMPORTED_MODULE_1_xin_components_app__["a" /* default */] {
  get props() {
    return Object.assign({}, super.props, {
      platform: {
        type: String,
        value: 'android'
      },
      platformMode: {
        type: String,
        computed: '_computePlatformMode(platform)'
      }
    });
  }

  get listeners() {
    return Object.assign({}, super.listeners, {
      'backbutton': '_backButtonTapped'
    });
  }

  // created () {
  //   super.created();
  //
  //   this.style.height = `${window.innerHeight}px`;
  // }

  ready() {
    super.ready();

    this.classList.add(this.platformMode);
  }

  hasMenu() {
    if ('_menu$' in this === false) {
      this._menu$ = this.getElementsByTagName('ion-menu')[0];
    }

    return this._menu$;
  }

  openMenu() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.hasMenu()) {
        return;
      }

      _this._menu$.open();
    })();
  }

  closeMenu() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.hasMenu()) {
        return;
      }

      _this2._menu$.close();
    })();
  }

  _computePlatformMode(platform) {
    return platform === 'android' ? 'md' : platform;
  }

  _backButtonTapped() {
    window.history.back();
  }
}

__WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].define('ion-app', IonApp);

/* harmony default export */ exports["default"] = IonApp;

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xin__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_ion_menu_css__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_ion_menu_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_ion_menu_css__);




class IonMenu extends __WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].Component {
  get props() {
    return {
      type: {
        type: String,
        value: 'overlay',
        observer: '_typeChanged'
      }
    };
  }

  get template() {
    return `
      <div class="menu-inner"><slot></slot></div>
      <ion-backdrop (click)="close" role="presentation" class="show-backdrop"></ion-backdrop>
    `;
  }

  attached() {
    super.attached();

    this._attached = true;
    this.fire('-menu-attached');
  }

  open() {
    this.isOpened = true;
    this.classList.add('show-menu');
    this.async(() => {
      this.$$('.menu-inner').style.transform = 'translateX(0)';
      this.$$('ion-backdrop').style.opacity = '0.6';
    }, 1);
  }

  close() {
    return new Promise((resolve, reject) => {
      if (!this.isOpened) {
        return resolve();
      }

      this.isOpened = false;

      this.once('transitionend', '.menu-inner', () => {
        this.async(() => {
          this.classList.remove('show-menu');
          resolve();
        }, 1);
      });

      this.$$('.menu-inner').style.transform = '';
      this.$$('ion-backdrop').style.opacity = '0.0';
    });
  }

  toggle() {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  _typeChanged(type) {
    this.setAttribute('type', type);
  }
}

__WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].define('ion-menu', IonMenu);

/* unused harmony default export */ var _unused_webpack_default_export = IonMenu;
=======

    let tokens = [];
    let re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {
      tokens.push(token);
      return '([^/]+)';
    }).replace(/\//g, '\\/');

    let optRe = '';

    if (chunks[1]) {
      optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {
        tokens.push(token);
        return '([^/]+)';
      }).replace(/\//g, '\\/') + ')?';
    }
    return [new RegExp('^' + re + optRe + '$'), tokens];
  }

  static isStatic(pattern) {
    return !pattern.match(/[[{]/);
  }

  constructor(route, callback) {
    this.route = route;
    this.callback = callback;

    if (Route.isStatic(route)) {
      this.type = 's';
      this.pattern = null;
      this.args = [];
    } else {
      let result = Route.routeRegExp(route);
      this.type = 'v';
      this.pattern = result[0];
      this.args = result[1];
    }
  }

  getExecutorFor(fragment) {
    if (this.type === 's') {
      if (fragment === this.route) {
        return { handler: this, args: {} };
      }
    } else if (this.type === 'v') {
      let result = fragment.match(this.pattern);
      if (result) {
        return {
          handler: this,
          args: this.args.reduce((args, name, index) => {
            args[name] = result[index + 1];
            return args;
          }, {})
        };
      }
    }
  }
}

/* harmony default export */ exports["a"] = Route;

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_event_helper__["a"]; });


/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)();
// imports


// module
exports.push([module.i, "ion-menu ion-backdrop {\n  transition: opacity .3s;\n  will-change: opacity;\n}\n\nion-menu .menu-inner {\n  transition: transform .3s;\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  will-change: transform, -webkit-transform;\n}\n", ""]);

// exports


/***/ },

/***/ 22:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },

/***/ 32:
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(32)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./ion-menu.css", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./ion-menu.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xin__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xin_components_app__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ion_menu__ = __webpack_require__(8);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class IonApp extends __WEBPACK_IMPORTED_MODULE_1_xin_components_app__["a" /* default */] {
  get props() {
    return Object.assign({}, super.props, {
      platform: {
        type: String,
        value: 'android'
      },
      platformMode: {
        type: String,
        computed: '_computePlatformMode(platform)'
      }
    });
  }

  get listeners() {
    return Object.assign({}, super.listeners, {
      'backbutton': '_backButtonTapped'
    });
  }

  // created () {
  //   super.created();
  //
  //   this.style.height = `${window.innerHeight}px`;
  // }

  ready() {
    super.ready();

    this.classList.add(this.platformMode);
  }

  hasMenu() {
    if ('_menu$' in this === false) {
      this._menu$ = this.getElementsByTagName('ion-menu')[0];
    }

    return this._menu$;
  }

  openMenu() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.hasMenu()) {
        return;
      }

      _this._menu$.open();
    })();
  }

  closeMenu() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.hasMenu()) {
        return;
      }

      _this2._menu$.close();
    })();
  }

  _computePlatformMode(platform) {
    return platform === 'android' ? 'md' : platform;
  }

  _backButtonTapped() {
    window.history.back();
  }
}

__WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].define('ion-app', IonApp);

/* harmony default export */ exports["default"] = IonApp;

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xin__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_ion_menu_css__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_ion_menu_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_ion_menu_css__);




class IonMenu extends __WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].Component {
  get props() {
    return {
      type: {
        type: String,
        value: 'overlay',
        observer: '_typeChanged'
      }
    };
  }

  get template() {
    return `
      <div class="menu-inner"><slot></slot></div>
      <ion-backdrop (click)="close" role="presentation" class="show-backdrop"></ion-backdrop>
    `;
  }

  attached() {
    super.attached();

    this._attached = true;
    this.fire('-menu-attached');
  }

  open() {
    this.isOpened = true;
    this.classList.add('show-menu');
    this.async(() => {
      this.$$('.menu-inner').style.transform = 'translateX(0)';
      this.$$('ion-backdrop').style.opacity = '0.6';
    }, 1);
  }

  close() {
    return new Promise((resolve, reject) => {
      if (!this.isOpened) {
        return resolve();
      }

      this.isOpened = false;

      this.once('transitionend', '.menu-inner', () => {
        this.async(() => {
          this.classList.remove('show-menu');
          resolve();
        }, 1);
      });
>>>>>>> merge-wahyu

      this.$$('.menu-inner').style.transform = '';
      this.$$('ion-backdrop').style.opacity = '0.0';
    });
  }

<<<<<<< HEAD
/***/ 9:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_route__ = __webpack_require__(18);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class App extends __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].Component {
  get props() {
    return {
      docTitle: {
        type: String,
        value: 'Application',
        observer: '_titleChanged'
      },

      manual: {
        type: Boolean
      },

      mode: {
        type: String,
        value: 'hash'
      },

      rootUri: {
        type: String,
        value: '/'
      },

      hash: {
        type: String,
        value: '#!'
      }
    };
  }

=======
  toggle() {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  _typeChanged(type) {
    this.setAttribute('type', type);
  }
}

__WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].define('ion-menu', IonMenu);

/* unused harmony default export */ var _unused_webpack_default_export = IonMenu;

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_route__ = __webpack_require__(18);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class App extends __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].Component {
  get props() {
    return {
      docTitle: {
        type: String,
        value: 'Application',
        observer: '_titleChanged'
      },

      manual: {
        type: Boolean
      },

      mode: {
        type: String,
        value: 'hash'
      },

      rootUri: {
        type: String,
        value: '/'
      },

      hash: {
        type: String,
        value: '#!'
      }
    };
  }

>>>>>>> merge-wahyu
  get hashRegexp() {
    if (!this._hashRegexp || this._hash !== this.hash) {
      this._hashRegexp = new RegExp(`${ this.hash }(.*)$`);
      this._hash = this.hash;
    }

    return this._hashRegexp;
  }

  notFound(fragment) {
    console.warn(`Route not found: ${ fragment }`);
  }

  _titleChanged(title) {
    document.title = title;
  }

  created() {
    __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].put('app', this);

    this.__appSignature = true;
    this.location = window.location;
    this.history = window.history;

    // default values
    this.handlers = [];
    this.middlewares = [];

    this.__started = false;
    this.__starting = false;
  }

  attached() {
    if (!this.manual) {
      this.async(() => {
        this.start();
      });
    }
  }

  route(route, callback) {
    this.handlers.push(new __WEBPACK_IMPORTED_MODULE_2__lib_route__["a" /* default */](route, callback));
  }

  start() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.__started || _this.__starting) {
        return;
      }

      _this.__middlewareChainRun = compose(_this.middlewares);

      _this.__listenNavigation();

      console.info(`Starting ${ _this.is }:${ _this.__id } ...`);

      _this.__starting = true;
      let executed = yield _this.__execute();
      _this.__starting = false;

      if (executed) {
        console.info(`Started ${ _this.is }:${ _this.__id }`);

        _this.__started = true;

        _this.fire('started');
      }
    })();
  }

  __listenNavigation() {
    let callback = () => {
      this.__execute();
    };

    if (this.mode === 'history') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__event__["a" /* default */])(window).on('popstate', callback);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__event__["a" /* default */])(document).on('click', evt => {
        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
          evt.preventDefault();

          let state = { url: evt.target.getAttribute('href') };
          this.history.pushState(state, evt.target.innerHTML, evt.target.href);

          callback();
        }
      });
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__event__["a" /* default */])(window).on('hashchange', callback);
    }
  }

  get started() {
    return this.__started || false;
  }

  getFragmentExecutors(fragment) {
    return this.handlers.reduce((executors, handler) => {
      let executor = handler.getExecutorFor(fragment);
      if (executor) executors.push(executor);
      return executors;
    }, []);
  }

  __execute() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let fragment = _this2.getFragment();
      let context = { app: _this2, uri: fragment };

      // run middleware chain then execute all executors
      let willContinue = yield _this2.__middlewareChainRun(context, function () {
        let executors = _this2.getFragmentExecutors(context.uri);
        if (executors.length === 0) {
          _this2.notFound(fragment);
          _this2.fire('route-not-found', fragment);
          return;
        }

        executors.forEach(function (executor) {
          executor.handler.callback(executor.args, context);
        });
      });

      if (willContinue === false) {
        return false;
      }

      _this2.fire('navigated', context);
      return true;
    })();
  }

  navigate(path, options) {
    path = path || '/';
    options = options || {};

    if (this.mode === 'history') {
      let url = this.rootUri + path.toString().replace(/\/$/, '').replace(/^\//, '');
      if (this.location.href.replace(this.location.origin, '') !== url) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
        this.__execute();
      }
    } else {
      this.location.hash = this.hash + path;
    }
    return this;
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  getFragment() {
    try {
      let fragment;
      if (this.mode === 'history') {
        fragment = decodeURI(this.location.pathname + this.location.search);
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');
      } else {
        let match = this.location.href.match(this.hashRegexp);
        fragment = match ? match[1] : '';
      }

      return '/' + fragment.toString().replace(/\/$/, '').replace(/^\//, '');
    } catch (err) {
      console.error('Fragment is not match any pattern, fallback to /');
      return '/';
    }
  }

  // $back (evt) {
  //   evt.preventDefault();
  //   this.history.back();
  // }
}

__WEBPACK_IMPORTED_MODULE_0____["a" /* default */].define('xin-app', App);

function compose(middlewares) {
  for (let fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  }

  return (() => {
    var _ref = _asyncToGenerator(function* (context, next) {
      let dispatch = (() => {
        var _ref2 = _asyncToGenerator(function* (i) {
          if (i <= index) {
            throw new Error('next() called multiple times');
          }

          index = i;
          let fn = middlewares[i];
          if (i === middlewares.length) {
            fn = next;
          }
          if (!fn) {
            return;
          }

          return yield fn(context, function () {
            return dispatch(i + 1);
          });
        });

        return function dispatch(_x3) {
          return _ref2.apply(this, arguments);
        };
      })();

      // last called middlewares #
      let index = -1;

      return dispatch(0);
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();
}

/* harmony default export */ exports["a"] = App;

/***/ }

},[34]);
<<<<<<< HEAD
//# sourceMappingURL=ion-app.js.map
=======
//# sourceMappingURL=ion-app.js.map
>>>>>>> merge-wahyu
