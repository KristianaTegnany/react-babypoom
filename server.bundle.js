/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 126);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(132);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(145), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(133);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(131);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(79);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(79);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTetherAttachments = getTetherAttachments;
exports.getScrollbarWidth = getScrollbarWidth;
exports.setScrollbarWidth = setScrollbarWidth;
exports.isBodyOverflowing = isBodyOverflowing;
exports.getOriginalBodyPadding = getOriginalBodyPadding;
exports.conditionallyUpdateScrollbar = conditionallyUpdateScrollbar;
exports.mapToCssModules = mapToCssModules;
function getTetherAttachments(placement) {
  var attachments = {};
  switch (placement) {
    case 'top':
    case 'top center':
      attachments = {
        attachment: 'bottom center',
        targetAttachment: 'top center'
      };
      break;
    case 'bottom':
    case 'bottom center':
      attachments = {
        attachment: 'top center',
        targetAttachment: 'bottom center'
      };
      break;
    case 'left':
    case 'left center':
      attachments = {
        attachment: 'middle right',
        targetAttachment: 'middle left'
      };
      break;
    case 'right':
    case 'right center':
      attachments = {
        attachment: 'middle left',
        targetAttachment: 'middle right'
      };
      break;
    case 'top left':
      attachments = {
        attachment: 'bottom left',
        targetAttachment: 'top left'
      };
      break;
    case 'top right':
      attachments = {
        attachment: 'bottom right',
        targetAttachment: 'top right'
      };
      break;
    case 'bottom left':
      attachments = {
        attachment: 'top left',
        targetAttachment: 'bottom left'
      };
      break;
    case 'bottom right':
      attachments = {
        attachment: 'top right',
        targetAttachment: 'bottom right'
      };
      break;
    case 'right top':
      attachments = {
        attachment: 'top left',
        targetAttachment: 'top right'
      };
      break;
    case 'right bottom':
      attachments = {
        attachment: 'bottom left',
        targetAttachment: 'bottom right'
      };
      break;
    case 'left top':
      attachments = {
        attachment: 'top right',
        targetAttachment: 'top left'
      };
      break;
    case 'left bottom':
      attachments = {
        attachment: 'bottom right',
        targetAttachment: 'bottom left'
      };
      break;
    default:
      attachments = {
        attachment: 'top center',
        targetAttachment: 'bottom center'
      };
  }

  return attachments;
}

var tetherAttachements = exports.tetherAttachements = ['top', 'bottom', 'left', 'right', 'top left', 'top center', 'top right', 'right top', 'right middle', 'right bottom', 'bottom right', 'bottom center', 'bottom left', 'left top', 'left middle', 'left bottom'];

// https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal.js#L436-L443
function getScrollbarWidth() {
  var scrollDiv = document.createElement('div');
  // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

function setScrollbarWidth(padding) {
  document.body.style.paddingRight = padding > 0 ? padding + 'px' : null;
}

function isBodyOverflowing() {
  return document.body.clientWidth < window.innerWidth;
}

function getOriginalBodyPadding() {
  return parseInt(window.getComputedStyle(document.body, null).getPropertyValue('padding-right') || 0, 10);
}

function conditionallyUpdateScrollbar() {
  var scrollbarWidth = getScrollbarWidth();
  // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/js/src/modal.js#L420
  var fixedContent = document.querySelectorAll('.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed')[0];
  var bodyPadding = fixedContent ? parseInt(fixedContent.style.paddingRight || 0, 10) : 0;

  if (isBodyOverflowing()) {
    setScrollbarWidth(bodyPadding + scrollbarWidth);
  }
}

function mapToCssModules(className, cssModule) {
  if (!cssModule) return className;
  return className.split(' ').map(function (c) {
    return cssModule[c] || c;
  }).join(' ');
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-css-modules");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(62)('wks')
  , uid        = __webpack_require__(49)
  , Symbol     = __webpack_require__(13).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_intl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_intl__);



/* harmony default export */ __webpack_exports__["a"] = (function (msg, func) {
  if (func) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_intl__["FormattedMessage"],
      msg,
      function (message) {
        return func(message);
      }
    );
  }
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_intl__["FormattedMessage"], msg);
});

// t(msg, (lbl) => <option>{lbl}</option>)

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NAMES_TO_PATHS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PATHS_TO_NAMES; });
/* harmony export (immutable) */ __webpack_exports__["f"] = rootPath;
/* harmony export (immutable) */ __webpack_exports__["c"] = curStep;
/* harmony export (immutable) */ __webpack_exports__["b"] = nextStep;
/* harmony export (immutable) */ __webpack_exports__["e"] = prevStep;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__);


var nameToPaths = [["welcome", "/:uuid"], ["game", "/:uuid/game"], ["arrival", "/:uuid/my-info"], ["trip", "/:uuid/my-trip"], ["visitorbook", "/:uuid/guest-book"], ["gift", "/:uuid/gifts"], ["souvenir", "/:uuid/memories"]];

var NAMES_TO_PATHS = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default.a(nameToPaths);
var PATHS_TO_NAMES = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default.a(nameToPaths.map(function (pair) {
  return pair.slice().reverse();
}));

function rootPath(_ref) {
  var availableSteps = _ref.availableSteps,
      bpoom = _ref.bpoom;

  return (NAMES_TO_PATHS.get(availableSteps[0]) || '').replace(':uuid', bpoom.uuid);
}

function curStep(_ref2) {
  var currentStep = _ref2.currentStep,
      availableSteps = _ref2.availableSteps,
      bpoom = _ref2.bpoom;

  return _nextPrevStep(currentStep, availableSteps, bpoom, 0);
}

function nextStep(_ref3) {
  var currentStep = _ref3.currentStep,
      availableSteps = _ref3.availableSteps,
      bpoom = _ref3.bpoom;

  return _nextPrevStep(currentStep, availableSteps, bpoom, +1);
}

function prevStep(_ref4) {
  var currentStep = _ref4.currentStep,
      availableSteps = _ref4.availableSteps,
      bpoom = _ref4.bpoom;

  return _nextPrevStep(currentStep, availableSteps, bpoom, -1);
}

// private
function _nextPrevStep(currentStep, availableSteps, bpoom, dir) {
  var index = availableSteps.indexOf(currentStep) + dir;
  var found = index >= 0 && index < availableSteps.length;
  var name = found ? availableSteps[index] : '';
  var transition = "to_" + (found ? name : 'finish');
  var path = (NAMES_TO_PATHS.get(name) || '').replace(':uuid', bpoom.uuid);
  return { found: found, index: index, name: name, transition: transition, path: path };
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(13)
  , core      = __webpack_require__(7)
  , ctx       = __webpack_require__(22)
  , hide      = __webpack_require__(23)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(21)
  , IE8_DOM_DEFINE = __webpack_require__(81)
  , toPrimitive    = __webpack_require__(64)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(19) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(26)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_intl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_intl__);


/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_intl__["defineMessages"])({
  step_with_number: {
    "id": "step.step_with_number",
    "defaultMessage": "{index, number}. {name}"
  },
  welcome: {
    "id": "step.welcome",
    "defaultMessage": "Bonjour !"
  },
  game: {
    "id": "step.game",
    "defaultMessage": "Mon pr\xE9nom"
  },
  arrival: {
    "id": "step.arrival",
    "defaultMessage": "Mes infos"
  },
  trip: {
    "id": "step.trip",
    "defaultMessage": "Mon voyage"
  },
  visitorbook: {
    "id": "step.visitorbook",
    "defaultMessage": "Mon livre d'or"
  },
  gift: {
    "id": "step.gift",
    "defaultMessage": "Les cadeaux"
  },
  souvenir: {
    "id": "step.souvenir",
    "defaultMessage": "Les souvenirs"
  },
  to_game: {
    "id": "step.to_game",
    "defaultMessage": "Je vous montre ma photo\xA0? Pour \xE7a il va falloir deviner mon joli pr\xE9nom."
  },
  to_arrival: {
    "id": "step.to_arrival",
    "defaultMessage": "Je te propose maintenant de voir les d\xE9tails de mon arriv\xE9e..."
  },
  to_trip: {
    "id": "step.to_trip",
    "defaultMessage": "Tu peux maintenant d\xE9couvrir en images mon long voyage vers ton monde."
  },
  to_visitorbook: {
    "id": "step.to_visitorbook",
    "defaultMessage": "Si tu souhaites me laisser un petit message sur mon livre d'or..."
  },
  to_gift: {
    "id": "step.to_gift",
    "defaultMessage": "D\xE9sormais tu peux acc\xE9der \xE0 l'\xE9tape suivante pour voir toutes les possibilit\xE9s de cadeaux Babypoom."
  },
  to_souvenir: {
    "id": "step.to_souvenir",
    "defaultMessage": "Avant de nous quitter je voudrais t'offrir un petit souvenir de ma naissance..."
  },
  to_finish: {
    "id": "step.to_finish",
    "defaultMessage": "TODO"
  }
}));

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(52);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(18)
  , createDesc = __webpack_require__(37);
module.exports = __webpack_require__(19) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(56)
  , defined = __webpack_require__(43);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_scss__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__styles_scss__);






var _dec, _class;



// CSS



var _default = (_dec = __WEBPACK_IMPORTED_MODULE_6_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_7__styles_scss___default.a, { allowMultiple: true }), _dec(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, _default);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(_default)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var classNames = ['bubble'];
      classNames.push(props.speechDir || '');
      classNames.push(props.scrollable ? 'scrollable' : '');
      classNames.push(props.bend ? 'bend-' + props.bend : '');

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { styleName: classNames.join(' ') },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { styleName: 'content' },
          props.children
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"])) || _class);



/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(90)
  , enumBugKeys = __webpack_require__(55);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(43);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(171)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(57)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  active: _propTypes2.default.bool,
  block: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  outline: _propTypes2.default.bool,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  getRef: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  onClick: _propTypes2.default.func,
  size: _propTypes2.default.string,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  color: 'secondary',
  tag: 'button'
};

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(Button, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          block = _props.block,
          className = _props.className,
          cssModule = _props.cssModule,
          color = _props.color,
          outline = _props.outline,
          size = _props.size,
          Tag = _props.tag,
          getRef = _props.getRef,
          attributes = _objectWithoutProperties(_props, ['active', 'block', 'className', 'cssModule', 'color', 'outline', 'size', 'tag', 'getRef']);

      var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'btn', 'btn' + (outline ? '-outline' : '') + '-' + color, size ? 'btn-' + size : false, block ? 'btn-block' : false, { active: active, disabled: this.props.disabled }), cssModule);

      if (attributes.href && Tag === 'button') {
        Tag = 'a';
      }

      return _react2.default.createElement(Tag, _extends({
        type: Tag === 'button' && attributes.onClick ? 'button' : undefined
      }, attributes, {
        className: classes,
        ref: getRef,
        onClick: this.onClick
      }));
    }
  }]);

  return Button;
}(_react2.default.Component);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

exports.default = Button;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 36 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(18).f
  , has = __webpack_require__(27)
  , TAG = __webpack_require__(11)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(176);
var global        = __webpack_require__(13)
  , hide          = __webpack_require__(23)
  , Iterators     = __webpack_require__(30)
  , TO_STRING_TAG = __webpack_require__(11)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bubble_Component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__styles_scss__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__styles_scss__);







var _dec, _class;





// CSS



var _default = (_dec = __WEBPACK_IMPORTED_MODULE_8_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_9__styles_scss___default.a, { allowMultiple: true }), _dec(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, _default);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_default)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var styles = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props.style || {}, { backgroundImage: 'url(' + props.imgSrc + ')' });

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { styleName: props.side || 'left' },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { styleName: 'img', style: styles }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7__bubble_Component__["a" /* default */],
          null,
          props.children
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"])) || _class);



/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(36)
  , TAG = __webpack_require__(11)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(22)
  , call        = __webpack_require__(84)
  , isArrayIter = __webpack_require__(82)
  , anObject    = __webpack_require__(21)
  , toLength    = __webpack_require__(48)
  , getIterFn   = __webpack_require__(67)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(21)
  , dPs         = __webpack_require__(167)
  , enumBugKeys = __webpack_require__(55)
  , IE_PROTO    = __webpack_require__(61)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(54)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(80).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(63)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__styles_scss__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__styles_scss__);







var _dec, _class;



// CSS



var _default = (_dec = __WEBPACK_IMPORTED_MODULE_7_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_8__styles_scss___default.a), _dec(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, _default);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_default)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'render',
    value: function render() {
      var styles = this.props.imgSrc ? __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props.style || {}, { backgroundImage: 'url(' + this.props.imgSrc + ')' }) : {};
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { onClick: this.props.onClick, styleName: 'img-container' },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          { styleName: 'img-border' },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { styleName: 'img', style: styles }),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'span',
            { styleName: 'img-text' },
            this.props.imgText
          )
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"])) || _class);



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__bubble_Component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__styles_scss__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__styles_scss__);







var _dec, _class;





// CSS



var _default = (_dec = __WEBPACK_IMPORTED_MODULE_8_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_9__styles_scss___default.a, { allowMultiple: true }), _dec(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, _default);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_default)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var styles = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props.style || {}, { backgroundImage: 'url(' + props.imgSrc + ')' });

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { styleName: 'bubble-say-container' },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { styleName: 'img', style: styles }),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7__bubble_Component__["a" /* default */],
          { speechDir: 'top' },
          props.children
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"])) || _class);



/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24)
  , document = __webpack_require__(13).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(36);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(45)
  , $export        = __webpack_require__(17)
  , redefine       = __webpack_require__(92)
  , hide           = __webpack_require__(23)
  , has            = __webpack_require__(27)
  , Iterators      = __webpack_require__(30)
  , $iterCreate    = __webpack_require__(163)
  , setToStringTag = __webpack_require__(38)
  , getPrototypeOf = __webpack_require__(89)
  , ITERATOR       = __webpack_require__(11)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(49)('meta')
  , isObject = __webpack_require__(24)
  , has      = __webpack_require__(27)
  , setDesc  = __webpack_require__(18).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(26)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(23);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(62)('keys')
  , uid    = __webpack_require__(49);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(13)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(24);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(13)
  , core           = __webpack_require__(7)
  , LIBRARY        = __webpack_require__(45)
  , wksExt         = __webpack_require__(66)
  , defineProperty = __webpack_require__(18).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(11);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(42)
  , ITERATOR  = __webpack_require__(11)('iterator')
  , Iterators = __webpack_require__(30);
module.exports = __webpack_require__(7).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 68 */
/***/ (function(module, exports) {



/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = flash;
/* unused harmony export deleteFlash */


function flash(color, message) {
  return function (dispatch) {
    return dispatch({
      type: 'FLASH',
      color: color,
      message: message
    });
  };
}

function deleteFlash() {
  return flash(null);
}

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = loadBpoom;
/* harmony export (immutable) */ __webpack_exports__["a"] = saveMsg;
/* harmony export (immutable) */ __webpack_exports__["c"] = updateStep;
/* harmony export (immutable) */ __webpack_exports__["d"] = updateStepIndex;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_intl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_call__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_flash_Actions__ = __webpack_require__(70);







function loadBpoom(_ref, callback) {
  var uuid = _ref.uuid;

  return function (dispatch) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_call__["a" /* default */])(dispatch, '/bpooms/' + uuid, { method: 'GET' }).then(function (json) {
      dispatch({ type: __WEBPACK_IMPORTED_MODULE_2__types__["a" /* AVAILABLE_STEPS */], availableSteps: json.available_steps });
      delete json.available_steps;
      dispatch({ type: __WEBPACK_IMPORTED_MODULE_2__types__["b" /* BPOOM */], bpoom: json });
      callback && callback(dispatch);
    }).catch(function (data) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__components_flash_Actions__["a" /* flash */])('danger', MSG.error)(dispatch);
    });
  };
}

function saveMsg(_ref2, params) {
  var uuid = _ref2.uuid;

  return function (dispatch) {
    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_call__["a" /* default */])(dispatch, '/bp_visitorbook_msgs/' + uuid, {
        method: 'POST',
        data: params
      }).then(function (json) {
        dispatch({ type: __WEBPACK_IMPORTED_MODULE_2__types__["c" /* SAVE_VISITORBOOK_MSG */], visitorbook_msg: json });
        resolve(dispatch, json);
      }).catch(function (data) {
        reject(dispatch, data);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__components_flash_Actions__["a" /* flash */])('danger', MSG.error)(dispatch);
      });
    });
  };
}

function updateStep(_ref3, callback) {
  var step = _ref3.step;

  return function (dispatch) {
    dispatch({ type: __WEBPACK_IMPORTED_MODULE_2__types__["d" /* CURRENT_STEP */], currentStep: step });
    callback && callback(dispatch);
  };
}

function updateStepIndex(_ref4, callback) {
  var stepIndex = _ref4.stepIndex;

  return function (dispatch) {
    dispatch({ type: __WEBPACK_IMPORTED_MODULE_2__types__["e" /* STEP_INDEX */], stepIndex: stepIndex });
    callback && callback(dispatch);
  };
}

var MSG = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_intl__["defineMessages"])({
  error: {
    'id': 'app.request.error',
    'defaultMessage': 'Une erreur est survenue. \nVeuillez r\xE9essayer plus tard.'
  }
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lighten", function() { return lighten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgba", function() { return rgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darken", function() { return darken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDark", function() { return isDark; });



function lighten(cssValue, amt) {
  var color = rgbaToHsla(cssValueToRgba(cssValue));
  color[2] += amt;
  color[2] = color[2] < 0 ? 0 : color[2] > 100 ? 100 : color[2];
  return toCssValue(hslaToRgba(color));
}

function rgba(cssValue, amt) {
  var color = cssValueToRgba(cssValue);
  return toCssValue([color[0], color[1], color[2], amt]);
}

function darken(cssValue, amt) {
  return lighten(cssValue, -amt);
}

function isDark(cssValue) {
  var color = rgbaToHsla(cssValueToRgba(cssValue));
  var s = color[1],
      l = color[2];
  var v = l + s * (l < .5 ? l : 1 - l);
  return v <= 65;
}

function toCssValue(c) {
  return c[3] < 1 ? 'rgba(' + c.join(',') + ')' : '#' + toHex(c[0]) + toHex(c[1]) + toHex(c[2]);
}

function toHex(n) {
  return ('0' + n.toString(16)).slice(-2);
}

function parseRgbOrHsl(str) {
  return str.slice(str.indexOf('(') + 1, str.indexOf(')')).split(',');
}

function cssValueToRgba(value) {
  value = value.trim();
  if (!value.indexOf('rgb')) {
    var arr = parseRgbOrHsl(value);
    return [+arr[0], +arr[1], +arr[2], +(arr[3] || 1)];
  }
  if (!value.indexOf('hsl')) {
    var _arr = parseRgbOrHsl(value);
    return hslaToRgba([_arr[0], parseInt(_arr[1]), parseInt(_arr[2]), +(_arr[3] || 1)]);
  }
  return hexToRgba(value);
}

function hexToRgba(hex) {
  if (hex.length < 5) {
    hex = '0x' + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2) + hex.charAt(3) + hex.charAt(3);
  } else {
    hex = '0x' + hex.slice(1);
  }
  return [hex >> 16 & 255, hex >> 8 & 255, hex & 255, 1];
}

function rgbaToHsla(color) {
  var r = color[0] / 255;
  var g = color[1] / 255;
  var b = color[2] / 255;

  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h = void 0,
      s = void 0,
      l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100), color[3]];
}

function hslaToRgba(color) {
  var h = color[0],
      s = color[1] / 100,
      l = color[2] / 100,
      a = color[3];
  var chroma = (1 - Math.abs(2 * l - 1)) * s;
  var huePrime = h / 60;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  var la = l - chroma / 2;
  var v0 = Math.round((la + chroma) * 255);
  var v1 = Math.round((la + secondComponent) * 255);
  var v2 = Math.round(la * 255);
  switch (huePrime | 0) {
    case 0:
      return [v0, v1, v2, a];
    case 1:
      return [v1, v0, v2, a];
    case 2:
      return [v2, v0, v1, a];
    case 3:
      return [v2, v1, v0, a];
    case 4:
      return [v1, v2, v0, a];
    case 5:
      return [v0, v2, v1, a];
  }
}

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CACHE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PSWP_OPTIONS; });
/* harmony export (immutable) */ __webpack_exports__["c"] = gettingData;


var CACHE = {};

var PSWP_OPTIONS = {
  history: false,
  shareButtons: [{ id: 'facebook', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}' }, { id: 'twitter', label: 'Tweet', url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}' }, { id: 'pinterest', label: 'Pin it', url: 'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}' }, { id: 'download', label: 'Download image', url: '{{raw_image_url}}', download: true }]
};

function gettingData(gallery, index, item) {
  if (!item.w || !item.h) {
    // unknown size
    if (CACHE[item.src]) return;
    CACHE[item.src] = {};

    var img = new Image();
    img.onload = function () {
      CACHE[item.src] = { width: this.width, height: this.height };
      item.w = this.width; // set image width
      item.h = this.height; // set image height
      gallery.invalidateCurrItems(); // reinit Items
      gallery.updateSize(true); // reinit Items
    };
    img.src = item.src; // let's download image
  }
}

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = process;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties__);

var init = false;
var CANVAS = void 0;
var CTX = void 0;
var IMG = void 0;
var lock = false;
var queue = [];

function process(options, callback) {
  if (lock) {
    return queue.push([options, callback]);
  }
  lock = true;

  var src = options.src,
      opts = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_objectWithoutProperties___default()(options, ['src']);

  if (!src) {
    return processNext();
  }
  initialize();

  if (IMG.src !== src) {
    IMG.onload = function () {
      callback && pixelate(opts, callback);
      processNext();
    };
    IMG.src = src;
  } else {
    callback && pixelate(opts, callback);
    processNext();
  }
}

function initialize() {
  if (!init) {
    init = true;
    CANVAS = document.createElement('canvas');
    CTX = CANVAS.getContext('2d');
    IMG = new Image();
    IMG.crossOrigin = 'anonymous';
  }
}

function processNext() {
  lock = false;
  var nextArgs = queue.shift();
  nextArgs && process.apply(null, nextArgs);
}

function pixelate(opts, callback) {
  var w = IMG.width || IMG.clientWidth || IMG.offsetWidth;
  var h = IMG.height || IMG.clientHeight || IMG.offsetHeight;
  CANVAS.width = w;
  CANVAS.height = h;

  var res = null == opts.resolution ? 16 : opts.resolution;
  res = Math.floor(Math.min(w, h) * res / 260) * 2;

  var alpha = opts.alpha || 1;
  if (!res) {
    CTX.globalAlpha = alpha;
    CTX.drawImage(IMG, 0, 0);
    var dataURL = CANVAS.toDataURL();
    CTX.clearRect(0, 0, w, h);
    return callback(dataURL);
  }

  CTX.globalAlpha = 1;
  CTX.drawImage(IMG, 0, 0);
  var data = CTX.getImageData(0, 0, w, h).data;
  CTX.clearRect(0, 0, w, h);

  var cols = w / res + 1;
  var rows = h / res + 1;
  var halfSize = res / 2;

  var row = void 0,
      y = void 0,
      pixelY = void 0,
      col = void 0,
      x = void 0,
      pixelX = void 0,
      pixelIndex = void 0,
      red = void 0,
      green = void 0,
      blue = void 0,
      pixelAlpha = void 0;

  for (row = 0; row < rows; ++row) {
    y = (row - 0.5) * res;
    pixelY = Math.max(Math.min(y, h - 1), 0);
    for (col = 0; col < cols; ++col) {
      x = (col - 0.5) * res;
      pixelX = Math.max(Math.min(x, w - 1), 0);
      pixelIndex = (pixelX + pixelY * w) * 4;
      red = data[pixelIndex];
      green = data[pixelIndex + 1];
      blue = data[pixelIndex + 2];
      pixelAlpha = alpha * (data[pixelIndex + 3] / 255);

      CTX.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + pixelAlpha + ')';
      CTX.fillRect(x - halfSize, y - halfSize, res, res);
    }
  }
  callback(CANVAS.toDataURL());
}

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ID = 0;

/* harmony default export */ __webpack_exports__["a"] = (function () {
  return ID++;
});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(129);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(128);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(135);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(134);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13).document && document.documentElement;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(19) && !__webpack_require__(26)(function(){
  return Object.defineProperty(__webpack_require__(54)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(30)
  , ITERATOR   = __webpack_require__(11)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(36);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(21);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(11)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(47)
  , createDesc     = __webpack_require__(37)
  , toIObject      = __webpack_require__(28)
  , toPrimitive    = __webpack_require__(64)
  , has            = __webpack_require__(27)
  , IE8_DOM_DEFINE = __webpack_require__(81)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(19) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(90)
  , hiddenKeys = __webpack_require__(55).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(27)
  , toObject    = __webpack_require__(32)
  , IE_PROTO    = __webpack_require__(61)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(27)
  , toIObject    = __webpack_require__(28)
  , arrayIndexOf = __webpack_require__(153)(false)
  , IE_PROTO     = __webpack_require__(61)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(17)
  , core    = __webpack_require__(7)
  , fails   = __webpack_require__(26);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(13)
  , core        = __webpack_require__(7)
  , dP          = __webpack_require__(18)
  , DESCRIPTORS = __webpack_require__(19)
  , SPECIES     = __webpack_require__(11)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(22)
  , invoke             = __webpack_require__(162)
  , html               = __webpack_require__(80)
  , cel                = __webpack_require__(54)
  , global             = __webpack_require__(13)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(36)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.nameShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var nameShape = exports.nameShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  leaveActive: _propTypes2.default.string,
  appear: _propTypes2.default.string,
  appearActive: _propTypes2.default.string
})]);

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("lodash.omit");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = require("react-photoswipe");

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_app_Component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_welcome_Component__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_game_Component__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_arrival_Component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_trip_Component__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_visitorbook_Component__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_gift_Component__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_souvenir_Component__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_app_steps__ = __webpack_require__(16);














/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  __WEBPACK_IMPORTED_MODULE_1_react_router__["Route"],
  { path: __WEBPACK_IMPORTED_MODULE_10__views_app_steps__["a" /* NAMES_TO_PATHS */].get('welcome'), component: __WEBPACK_IMPORTED_MODULE_2__views_app_Component__["a" /* default */] },
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["IndexRoute"], { component: __WEBPACK_IMPORTED_MODULE_3__views_welcome_Component__["a" /* default */] }),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: __WEBPACK_IMPORTED_MODULE_10__views_app_steps__["a" /* NAMES_TO_PATHS */].get('game'), component: __WEBPACK_IMPORTED_MODULE_4__views_game_Component__["a" /* default */] }),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: __WEBPACK_IMPORTED_MODULE_10__views_app_steps__["a" /* NAMES_TO_PATHS */].get('arrival'), component: __WEBPACK_IMPORTED_MODULE_5__views_arrival_Component__["a" /* default */] }),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: __WEBPACK_IMPORTED_MODULE_10__views_app_steps__["a" /* NAMES_TO_PATHS */].get('trip'), component: __WEBPACK_IMPORTED_MODULE_6__views_trip_Component__["a" /* default */] }),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: __WEBPACK_IMPORTED_MODULE_10__views_app_steps__["a" /* NAMES_TO_PATHS */].get('visitorbook'), component: __WEBPACK_IMPORTED_MODULE_7__views_visitorbook_Component__["a" /* default */] }),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: __WEBPACK_IMPORTED_MODULE_10__views_app_steps__["a" /* NAMES_TO_PATHS */].get('gift'), component: __WEBPACK_IMPORTED_MODULE_8__views_gift_Component__["a" /* default */] }),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["Route"], { path: __WEBPACK_IMPORTED_MODULE_10__views_app_steps__["a" /* NAMES_TO_PATHS */].get('souvenir'), component: __WEBPACK_IMPORTED_MODULE_9__views_souvenir_Component__["a" /* default */] })
));

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__);




var API_URL =  true ? '//my.babypoom.com/api/v2' : '//localhost:3001/api/v2';

var defaultOptions = {
  headers: {}
};

/* harmony default export */ __webpack_exports__["a"] = (function (dispatch, url) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  options = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, defaultOptions, options); // clone

  if (options.data) {
    if (!options.method || 'get' === options.method.toLowerCase()) {
      url += (url.indexOf('?') >= 0 ? '&' : '?') + queryParams(options.data);
    } else {
      options.body = queryParams(options.data);
    }
    delete options.data;
  }
  if (options.json !== false) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    delete options.json;
  }
  if (options.cors !== false) {
    options.mode = 'cors';
    delete options.cors;
  }

  return new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    fetch(API_URL + url, options).then(function (response) {
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a.all([response, response.json()]);
    }).then(function (_ref) {
      var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_ref, 2),
          response = _ref2[0],
          json = _ref2[1];

      if (response.status < 200 || response.status >= 300) {
        return reject(json); // TODO: error
      }
      resolve(json, response.headers);
    }).catch(function (error) {
      reject(error); // TODO: error
    });
  });
});

function queryParams(params) {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(params).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');
}

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Klass; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reactstrap_lib_Button__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reactstrap_lib_Button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_reactstrap_lib_Button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Progress__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_upload_manager__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__styles_scss__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__styles_scss__);






var _dec, _class, _class2, _temp;




// Components



// Lib


// CSS



function FN() {}

var Klass = (_dec = __WEBPACK_IMPORTED_MODULE_10_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_11__styles_scss___default.a, { allowMultiple: true }), _dec(_class = (_temp = _class2 = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Klass, _Component);

  function Klass(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Klass);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Klass.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Klass)).call(this, props));

    _this.state = {};
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Klass, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.inputFile) {
        var props = this.props;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_9__lib_upload_manager__["a" /* default */]({
          uploadUrl: 'https://api.cloudinary.com/v1_1/' + props.cloudName + '/' + props.resourceType + '/upload',
          input: this.inputFile,
          maxSimultaneousUploads: 1,
          data: { upload_preset: props.uploadPreset },
          onFileAdded: function onFileAdded(upload) {
            _this2.setState({ error: false });

            upload.on('start', function () {
              props.onUploadStart();
              _this2.setState({ progress: 0 });
            }).on('progress', function (progress, fileSize, uploadedBytes) {
              _this2.setState({ progress: Math.floor(progress) });
            }).on('end', function (data) {
              _this2.setState({ progress: null });
              props.onUploadEnd(data);
            }).on('error', function (error) {
              _this2.setState({ error: true });
              props.onUploadError();
            });
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var state = this.state;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { className: 'uploader' },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { styleName: 'upload-input' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_7_reactstrap_lib_Button___default.a,
            { color: this.props.btnColor || 'secondary' },
            this.props.btnText
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { ref: function ref(input) {
              return _this3.inputFile = input;
            }, type: 'file' })
        ),
        null != state.progress ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Progress___default.a,
          { value: state.progress },
          state.progress,
          '%'
        ) : '',
        state.error ? this.props.errorMsg : ''
      );
    }
  }]);

  return Klass;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]), _class2.defaultProps = {
  resourceType: 'auto',
  onUploadStart: FN,
  onUploadEnd: FN,
  onUploadError: FN
}, _temp)) || _class);


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_color__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_css_var_polyfill__ = __webpack_require__(124);












var SPECIAL_FUNC_REG = /(?:darken|lighten|rgba)-\d+$/;

var _default = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default(props) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, _default);

    var _this = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_get_prototype_of___default()(_default)).call(this, props));

    _this.root = document.documentElement;
    _this.specialCssVariables = getComputedStyle(_this.root).getPropertyValue('content').slice(1, -1).split(' ');
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateCSSVariables(this.props.variables);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.variables !== prevProps.variables) {
        this.updateCSSVariables(this.props.variables);
      }
    }
  }, {
    key: 'updateCSSVariables',
    value: function updateCSSVariables(variables) {
      variables = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, variables);
      var style = this.root.style;
      this.computeSpecialCssVariables(variables);
      __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(variables).forEach(function (name) {
        style.setProperty(name, variables[name]);
      });
      __WEBPACK_IMPORTED_MODULE_10__lib_css_var_polyfill__["a" /* default */].init(variables);
    }
  }, {
    key: 'computeSpecialCssVariables',
    value: function computeSpecialCssVariables(variables) {
      this.specialCssVariables.forEach(function (varName) {
        var match = varName.match(SPECIAL_FUNC_REG);
        if (match) {
          var suffix = match[0];

          var _suffix$split = suffix.split('-'),
              _suffix$split2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_suffix$split, 2),
              funcName = _suffix$split2[0],
              value = _suffix$split2[1];

          var parentVar = varName.slice(0, varName.length - suffix.length - 1);
          if (variables[parentVar]) {
            variables[varName] = __WEBPACK_IMPORTED_MODULE_9__lib_color__[funcName](variables[parentVar], 'rgba' === funcName ? value / 100 : +value);
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
        'div',
        this.props,
        this.props.children
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_8_react__["Component"]);



/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_router__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Button__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__styles_scss__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__styles_scss__);






var _dec, _dec2, _class;





// Components




// i18n



// CSS



// TODO: button disabled until bpoom loaded
var _default = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps, {}), _dec2 = __WEBPACK_IMPORTED_MODULE_12_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_13__styles_scss___default.a), _dec(_class = _dec2(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, _default);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(_default)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'prevNextText',
    value: function prevNextText(pn) {
      return pn.found ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_11__i18n_messages_steps__["a" /* default */][pn.name]) : '';
    }
  }, {
    key: 'render',
    value: function render() {
      var prev = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__views_app_steps__["e" /* prevStep */])(this.props);
      var next = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__views_app_steps__["b" /* nextStep */])(this.props);

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'footer',
        { styleName: 'footer' },
        prev.found ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Button___default.a,
          { tag: __WEBPACK_IMPORTED_MODULE_7_react_router__["Link"], to: prev.path, block: true, size: 'lg', color: 'secondary' },
          '< ',
          this.prevNextText(prev)
        ) : '',
        next.found ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_8_reactstrap_lib_Button___default.a,
          { tag: __WEBPACK_IMPORTED_MODULE_7_react_router__["Link"], to: next.path, block: true, size: 'lg', color: 'primary' },
          this.prevNextText(next),
          ' >'
        ) : ''
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"])) || _class) || _class);




function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps };
}

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reactstrap_lib_Alert__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_reactstrap_lib_Alert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_reactstrap_lib_Alert__);









var _default = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, _default);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_default)).call(this, props));

    _this.state = {
      visible: true
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'onDismiss',
    value: function onDismiss() {
      this.setState({ visible: false });
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7_reactstrap_lib_Alert___default.a,
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ isOpen: this.state.visible, toggle: this.onDismiss.bind(this) }, this.props),
        this.props.children
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);



/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_router__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reactstrap_lib_Nav__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_reactstrap_lib_Nav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_reactstrap_lib_Nav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap_lib_Navbar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_reactstrap_lib_Navbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_reactstrap_lib_Navbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap_lib_Button__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_reactstrap_lib_Button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_reactstrap_lib_Button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_reactstrap_lib_NavbarBrand__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_reactstrap_lib_NavbarBrand___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_reactstrap_lib_NavbarBrand__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_NavLink__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_NavLink___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_NavLink__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Collapse__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Collapse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Collapse__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_ButtonDropdown__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_ButtonDropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_ButtonDropdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_DropdownToggle__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_DropdownToggle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_DropdownToggle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__styles_scss__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__styles_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__images_logo_png__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__images_logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23__images_logo_png__);







var _dec, _dec2, _class;





// Components












// i18n



// CSS





var _default = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(mapStateToProps, {}), _dec2 = __WEBPACK_IMPORTED_MODULE_21_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_22__styles_scss___default.a), _dec(_class = _dec2(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, _default);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_default)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.toggleMenu = _this.toggleMenu.bind(_this);

    _this.state = {
      isOpen: false,
      isMenuOpen: false
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
        isMenuOpen: false
      });
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu() {
      this.setState({
        isMenuOpen: !this.state.isMenuOpen,
        isOpen: false
      });
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu(stepIndex) {
      var _this2 = this;

      var bpoom = this.props.bpoom;
      return this.props.availableSteps.map(function (name, index) {
        var text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_20__i18n_messages_steps__["a" /* default */].step_with_number, { values: { index: index + 1, name: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_20__i18n_messages_steps__["a" /* default */][name]) } }));
        var to = __WEBPACK_IMPORTED_MODULE_18__views_app_steps__["a" /* NAMES_TO_PATHS */].get(name).replace(':uuid', bpoom.uuid);

        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem___default.a,
          { key: '' + index },
          index <= _this2.props.maxStepIndex ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_NavLink___default.a,
            { styleName: index == stepIndex ? 'current' : '', tag: __WEBPACK_IMPORTED_MODULE_8_react_router__["Link"], to: to },
            text
          ) : __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'span',
            { styleName: 'disabled-link', className: 'nav-link disabled' },
            text
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__views_app_steps__["c" /* curStep */])(this.props);
      var stepText = step.found ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_20__i18n_messages_steps__["a" /* default */].step_with_number, { values: { index: step.index + 1, name: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_20__i18n_messages_steps__["a" /* default */][step.name]) } })) : '';
      var root = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__views_app_steps__["f" /* rootPath */])(this.props);

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'header',
        null,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_10_reactstrap_lib_Navbar___default.a,
          { light: true, toggleable: true },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_11_reactstrap_lib_Button___default.a,
            { color: 'primary', styleName: 'toggler', className: 'navbar-toggler navbar-toggler-right', onClick: this.toggleMenu },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('span', { styleName: 'icon' })
          ),
          this.props.availableSteps.length ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9_reactstrap_lib_Nav___default.a,
            { styleName: 'mobile-nav', className: 'navbar-toggler', navbar: true },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem___default.a,
              null,
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_ButtonDropdown___default.a,
                { styleName: 'nav-button', isOpen: this.state.isOpen, toggle: this.toggle },
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_DropdownToggle___default.a,
                  { outline: true, color: 'primary', caret: true },
                  stepText
                )
              )
            )
          ) : '',
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'span',
            null,
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_12_reactstrap_lib_NavbarBrand___default.a,
              { styleName: 'nav-brand', tag: __WEBPACK_IMPORTED_MODULE_8_react_router__["Link"], to: root },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_23__images_logo_png___default.a })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { styleName: 'mobile-menu' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Collapse___default.a,
              { isOpen: this.state.isOpen, navbar: true },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_9_reactstrap_lib_Nav___default.a,
                { navbar: true },
                this.renderMenu(step.index)
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { styleName: 'mobile-menu' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Collapse___default.a,
              { isOpen: this.state.isMenuOpen, navbar: true },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_9_reactstrap_lib_Nav___default.a,
                { className: 'ml-auto', navbar: true },
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem___default.a,
                  null,
                  __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_NavLink___default.a,
                    { tag: __WEBPACK_IMPORTED_MODULE_8_react_router__["Link"], to: '/', className: 'nav-link' },
                    'Fran\xE7ais'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem___default.a,
                  null,
                  __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_NavLink___default.a,
                    { tag: __WEBPACK_IMPORTED_MODULE_8_react_router__["Link"], to: '/', className: 'nav-link' },
                    'Babypoom, c\'est quoi ?'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem___default.a,
                  null,
                  __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_NavLink___default.a,
                    { tag: __WEBPACK_IMPORTED_MODULE_8_react_router__["Link"], to: '/', className: 'nav-link' },
                    'Informations l\xE9gales'
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_NavItem___default.a,
                  null,
                  __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_NavLink___default.a,
                    { tag: __WEBPACK_IMPORTED_MODULE_8_react_router__["Link"], to: '/', className: 'nav-link' },
                    'Partager votre avis'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"])) || _class) || _class);




function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps,
      maxStepIndex = _state$app.maxStepIndex;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps, maxStepIndex: maxStepIndex };
}

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bpoom_img_Component__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__styles_scss__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__styles_scss__);






var _dec, _class;





// CSS



var _default = (_dec = __WEBPACK_IMPORTED_MODULE_7_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_8__styles_scss___default.a, { allowMultiple: true }), _dec(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, _default);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(_default)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'render',
    value: function render() {
      var props = this.props;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { styleName: 'message-container' },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { styleName: 'content' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__bpoom_img_Component__["a" /* default */], { imgSrc: props.imgSrc, onClick: props.onClick }),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { styleName: 'title' },
              props.date
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { styleName: 'title' },
              props.name
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { styleName: 'message' },
              props.message
            )
          )
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"])) || _class);



/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_form_Alert__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_header_Component__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_footer_Component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Actions__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lib_pixelate__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__lib_color__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_css_var_Component__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__styles_scss__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__styles_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__i18n_i18n__ = __webpack_require__(15);






var _dec, _dec2, _class, _class2, _temp;













// Lib



// CSS






var UNIQ = 0;

var _default = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(mapStateToProps, { loadBpoom: __WEBPACK_IMPORTED_MODULE_12__Actions__["b" /* loadBpoom */], updateStep: __WEBPACK_IMPORTED_MODULE_12__Actions__["c" /* updateStep */], updateStepIndex: __WEBPACK_IMPORTED_MODULE_12__Actions__["d" /* updateStepIndex */] }), _dec2 = __WEBPACK_IMPORTED_MODULE_16_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_17__styles_scss___default.a), _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(_default, _Component);

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.init(props);
    }
  }]);

  function _default(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, _default);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(_default)).call(this, props));

    _this.init(props);

    // const theme = {};
    // theme['--brand-primary']   = '#84C5C4';
    // theme['--brand-secondary'] = '#bb6967';
    // theme['--app-body-bg']     = '#FCAAA8';
    // theme['--app-bg']          = '#FFF5F5';

    var theme = {
      '--brand-primary': '#1b827f', // 1E
      '--brand-secondary': '#dc706e' // 2D
    };
    theme['--brand-primary-A'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--brand-primary'], 15); // color 1 - 1F
    theme['--brand-primary-B'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--brand-primary'], 10); // color 1A - 1D
    theme['--brand-primary-C'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--brand-primary'], 20); // color 1C
    theme['--brand-primary-D'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["darken"])(theme['--brand-primary'], 5); // color 1B

    theme['--brand-secondary-A'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--brand-secondary'], 15); // color 2 - 2C
    theme['--brand-secondary-B'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--brand-secondary'], 30); // color 2A - 2E
    theme['--brand-secondary-C'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--brand-secondary'], 10); // color 2B

    theme['--neutral-primary'] = '#414141';
    theme['--neutral-primary-A'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-primary'], 15); // color 0A
    theme['--neutral-primary-B'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-primary'], 30); // color 0B
    theme['--neutral-primary-C'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-primary'], 50); // color 0C
    theme['--neutral-primary-D'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-primary'], 65); // color 0D
    theme['--neutral-primary-E'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-primary'], 70); // color 0E
    theme['--neutral-primary-F'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-primary'], 75); // color 0F

    theme['--neutral-secondary'] = '#414141';
    theme['--neutral-secondary-A'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-secondary'], 15); // color 0A
    theme['--neutral-secondary-B'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-secondary'], 30); // color 0B
    theme['--neutral-secondary-C'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-secondary'], 50); // color 0C
    theme['--neutral-secondary-D'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-secondary'], 65); // color 0D
    theme['--neutral-secondary-E'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-secondary'], 70); // color 0E
    theme['--neutral-secondary-F'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__lib_color__["lighten"])(theme['--neutral-secondary'], 75); // color 0F

    _this.state = { theme: theme };
    return _this;
  }

  // TODO: when receiving availableSteps, check if currentStep is included. if not, redirect to first available step


  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // TODO check if bpoomId is numeric
      this.props.loadBpoom({ uuid: this.props.params.uuid });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var props = this.props;
      var availableSteps = props.availableSteps;

      if (availableSteps.length) {
        var step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__views_app_steps__["c" /* curStep */])(props);
        if (!step.found) {
          return this.context.router.push({ pathname: __WEBPACK_IMPORTED_MODULE_11__views_app_steps__["a" /* NAMES_TO_PATHS */].get(availableSteps[0]) });
        }
        this.props.updateStepIndex({ stepIndex: step.index });
      }
    }
  }, {
    key: 'init',
    value: function init(props) {
      // Set current step
      var bpoom = props.bpoom;
      var step = __WEBPACK_IMPORTED_MODULE_11__views_app_steps__["d" /* PATHS_TO_NAMES */].get(props.location.pathname.replace('/' + (bpoom.uuid || props.params.uuid), '/:uuid'));
      props.updateStep({ step: step }, function () {
        if (props.availableSteps.length) {
          var stepIndex = props.availableSteps.indexOf(step);
          props.updateStepIndex({ stepIndex: stepIndex });
        }

        // Preload images
        if (bpoom.photo) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__lib_pixelate__["a" /* default */])({ src: bpoom.photo });
        }
      });
    }
  }, {
    key: 'renderFlash',
    value: function renderFlash() {
      var props = this.props;
      var flash = props.flash;
      if (!flash || !flash.message) {
        flash = (props.location.state || {}).flash;
      }
      if (!flash || !flash.message) {
        return '';
        //flash = null;//{ message: { id: 'Error' } };
      }
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_8__components_form_Alert__["a" /* default */],
        { key: ++UNIQ, toggle: null, color: flash.color },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(flash.message)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      // TODO: UNIQ to force the reloading => scroll will be on top
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_15__components_css_var_Component__["a" /* default */],
        { variables: this.state.theme },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_header_Component__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { styleName: 'flash' },
          this.renderFlash()
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'main',
          null,
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            null,
            this.props.children
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__components_footer_Component__["a" /* default */], null)
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]), _class2.childContextTypes = {
  location: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object
}, _class2.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object.isRequired
}, _temp)) || _class) || _class);




function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps,
      flash = state.flash;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps, flash: flash };
}

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BPOOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CURRENT_STEP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return STEP_INDEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AVAILABLE_STEPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SAVE_VISITORBOOK_MSG; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_types__ = __webpack_require__(75);


var BPOOM = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_types__["a" /* default */])(),
    CURRENT_STEP = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_types__["a" /* default */])(),
    STEP_INDEX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_types__["a" /* default */])(),
    AVAILABLE_STEPS = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_types__["a" /* default */])(),
    SAVE_VISITORBOOK_MSG = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_types__["a" /* default */])();

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_intl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_bubble_pic_Component__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__styles_scss__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__styles_scss__);







var _dec, _dec2, _class;









// i18n



// CSS



var _default = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(mapStateToProps), _dec2 = __WEBPACK_IMPORTED_MODULE_13_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_14__styles_scss___default.a, { allowMultiple: true }), _dec(_class = _dec2(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, _default);

    return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_default)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'birthday',
    value: function birthday(date) {
      if (!date) return '';
      var attrs = { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
      if (date.indexOf('T') >= 0) {
        attrs.hour = "numeric";
      }
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_react_intl__["FormattedDate"], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ value: new Date(date) }, attrs));
    }
  }, {
    key: 'getText',
    value: function getText(info, attrName) {
      var attr = info[attrName];
      if (!attr) return '';
      var msg = MSG[attrName + '_' + attr];
      return msg ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__i18n_i18n__["a" /* default */])(msg) : attr;
    }
  }, {
    key: 'render',
    value: function render() {
      var bpoom = this.props.bpoom;
      var arrival = bpoom.bp_arrival || {};
      var transition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_12__i18n_messages_steps__["a" /* default */][__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__views_app_steps__["b" /* nextStep */])(this.props).transition]);

      var info = [['gender', this.getText(bpoom, 'gender')], ['orthernames', bpoom.othernames], ['lastname', bpoom.lastname], ['birthday', this.birthday(bpoom.birthday), { gender: bpoom.gender || 'M' }], ['location_hospital', bpoom.location_hospital], ['location_country', bpoom.country], ['location_state', bpoom.state], ['weight', bpoom.weight && bpoom.weight_unit ? bpoom.weight + ' ' + bpoom.weight_unit : ''], ['size', bpoom.size && bpoom.size_unit ? bpoom.size + ' ' + bpoom.size_unit : ''], ['zodiac', this.getText(bpoom, 'zodiac')], ['hair_color', this.getText(bpoom, 'hair_color')], ['eyes_colors', this.getText(bpoom, 'eyes_colors')]].filter(function (pair) {
        return pair[1];
      });

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { styleName: 'arrival-container' },
        this.renderBubbleMsg(bpoom.photo, arrival.message, 'left'),
        info.length ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          { styleName: 'info' },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'table',
            null,
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'tbody',
              null,
              info.map(function (pair) {
                return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  'tr',
                  { key: pair[0] },
                  __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    'th',
                    null,
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, MSG['title_' + pair[0]], { values: pair[2] || {} }))
                  ),
                  __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                    'td',
                    null,
                    pair[1]
                  )
                );
              })
            )
          )
        ) : '',
        this.renderBubbleMsg(bpoom.photo_mum, bpoom.reaction_mum, 'left'),
        this.renderBubbleMsg(bpoom.photo_dad, bpoom.reaction_dad, 'right'),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_9__components_bubble_pic_Component__["a" /* default */],
          { imgSrc: bpoom.photo },
          transition
        )
      );
    }
  }, {
    key: 'renderBubbleMsg',
    value: function renderBubbleMsg(pic, msg, side) {
      return msg ? __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_9__components_bubble_pic_Component__["a" /* default */],
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ side: side }, { imgSrc: pic }),
        msg
      ) : '';
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"])) || _class) || _class);




function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps };
}

var MSG = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_intl__["defineMessages"])({
  title_gender: {
    'id': 'arrival.title_gender',
    'defaultMessage': 'Je suis'
  },
  title_orthernames: {
    'id': 'arrival.title_orthernames',
    'defaultMessage': 'Mes pr\xE9noms'
  },
  title_lastname: {
    'id': 'arrival.title_lastname',
    'defaultMessage': 'Mon nom'
  },
  title_birthday: {
    'id': 'arrival.title_birthday',
    'defaultMessage': 'Je suis {gender, select, M {n\xE9} F {n\xE9e}} le'
  },
  title_location_hospital: {
    'id': 'arrival.title_location_hospital',
    'defaultMessage': 'Clinique'
  },
  title_location_country: {
    'id': 'arrival.title_location_country',
    'defaultMessage': 'Pays'
  },
  title_location_state: {
    'id': 'arrival.title_location_state',
    'defaultMessage': '\xC9tat'
  },
  title_weight: {
    'id': 'arrival.title_weight',
    'defaultMessage': 'Je p\xE8se'
  },
  title_size: {
    'id': 'arrival.title_size',
    'defaultMessage': 'Je mesure'
  },
  title_zodiac: {
    'id': 'arrival.title_zodiac',
    'defaultMessage': 'Mon signe'
  },
  title_hair_color: {
    'id': 'arrival.title_hair_color',
    'defaultMessage': 'Mes cheveux'
  },
  title_eyes_colors: {
    'id': 'arrival.title_eyes_colors',
    'defaultMessage': 'Mes yeux'
  },
  gender_F: {
    'id': 'gender.F',
    'defaultMessage': 'Une petite fille'
  },
  gender_M: {
    'id': 'gender.M',
    'defaultMessage': 'Un petit gar\xE7on'
  },
  zodiac_aries: {
    'id': 'zodiac.aries',
    'defaultMessage': 'B\xE9lier'
  },
  zodiac_taurus: {
    'id': 'zodiac.taurus',
    'defaultMessage': 'Taureau'
  },
  zodiac_gemini: {
    'id': 'zodiac.gemini',
    'defaultMessage': 'G\xE9meaux'
  },
  zodiac_cancer: {
    'id': 'zodiac.cancer',
    'defaultMessage': 'Cancer'
  },
  zodiac_leo: {
    'id': 'zodiac.leo',
    'defaultMessage': 'Lion'
  },
  zodiac_virgo: {
    'id': 'zodiac.virgo',
    'defaultMessage': 'Vierge'
  },
  zodiac_libra: {
    'id': 'zodiac.libra',
    'defaultMessage': 'Balance'
  },
  zodiac_scorpio: {
    'id': 'zodiac.scorpio',
    'defaultMessage': 'Scorpion'
  },
  zodiac_sagittarius: {
    'id': 'zodiac.sagittarius',
    'defaultMessage': 'Sagittaire'
  },
  zodiac_capricorn: {
    'id': 'zodiac.capricorn',
    'defaultMessage': 'Capricorne'
  },
  zodiac_aquarius: {
    'id': 'zodiac.aquarius',
    'defaultMessage': 'Verseau'
  },
  eye_blue: {
    'id': 'eye_blue',
    'defaultMessage': 'Bleu'
  },
  eye_brown: {
    'id': 'eye_brown',
    'defaultMessage': 'Marron'
  },
  eye_grey: {
    'id': 'eye_grey',
    'defaultMessage': 'Gris'
  },
  eye_green: {
    'id': 'eye_green',
    'defaultMessage': 'Vert'
  },
  eye_hazel: {
    'id': 'eye_hazel',
    'defaultMessage': 'Noisette'
  },
  eye_black: {
    'id': 'eye_black',
    'defaultMessage': 'Noir'
  },
  hair_black: {
    'id': 'hair_black',
    'defaultMessage': 'Noir'
  },
  hair_dark_brown: {
    'id': 'hair_dark_brown',
    'defaultMessage': 'Brun'
  },
  hair_blond: {
    'id': 'hair_blond',
    'defaultMessage': 'Blond'
  }
});

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = updateGuessed;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types__ = __webpack_require__(116);



function updateGuessed(vars, callback) {
  return function (dispatch) {
    dispatch(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, vars, { type: __WEBPACK_IMPORTED_MODULE_1__types__["a" /* GUESSED */] }));
    callback && callback();
  };
}

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_intl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Actions__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_bubble_say_Component__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_bubble_pic_Component__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lib_ascii__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__lib_pixelate__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__styles_scss__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__styles_scss__);








var _dec, _dec2, _class;












// i18n



// Lib



// CSS



var SPACE_REPLACEMENT = { ' ': '_' }; // insecable space

var _default = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_redux__["connect"])(mapStateToProps, { updateGuessed: __WEBPACK_IMPORTED_MODULE_10__Actions__["a" /* updateGuessed */] }), _dec2 = __WEBPACK_IMPORTED_MODULE_18_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_19__styles_scss___default.a, { allowMultiple: true }), _dec(_class = _dec2(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default(props) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, _default);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(_default)).call(this, props));

    _this.state = { lastChar: null };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.pixelatePicture(this.props);
      this.startTime = null;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.pixelatePicture(props);
    }
  }, {
    key: 'pixelatePicture',
    value: function pixelatePicture(props) {
      var _this2 = this;

      var _stats = this.stats(props),
          uniqueChars = _stats.uniqueChars,
          okCount = _stats.okCount;

      var resolution = 24 - (uniqueChars ? Math.round(okCount * 24 / uniqueChars) : 0);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_17__lib_pixelate__["a" /* default */])({ src: props.bpoom.photo, resolution: resolution * 2, width: 100, height: 100 }, function (picture) {
        _this2.setState(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, _this2.state, { picture: picture }));
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(char, present) {
      var _this3 = this;

      if ([true, false].indexOf(this.props.guessed[char]) >= 0 || this.win()) {
        // TODO: send time + guessedKoCount
        return;
      }
      if (null === this.startTime) {
        this.startTime = new Date();
      }
      this.setState(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.state, { lastChar: char }), function () {
        _this3.props.updateGuessed({ char: char, present: present });
      });
    }
  }, {
    key: 'win',
    value: function win() {
      var _stats2 = this.stats(this.props),
          uniqueChars = _stats2.uniqueChars,
          okCount = _stats2.okCount;

      return uniqueChars && uniqueChars === okCount;
    }
  }, {
    key: 'stats',
    value: function stats(props) {
      var uniqueChars = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.babyName().split('').reduce(function (h, c) {
        h[c] = 1;return h;
      }, {})).length;
      var okCount = props.guessedOkCount;
      return { uniqueChars: uniqueChars, okCount: okCount };
    }
  }, {
    key: 'babyName',
    value: function babyName() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__lib_ascii__["a" /* default */])(this.props.bpoom.babyname || '').toUpperCase().replace(/\s+/g, ' ').replace(/_+/g, '-');
    }
  }, {
    key: 'render',
    value: function render() {
      return this.win() ? this.renderWin() : this.renderGame();
    }
  }, {
    key: 'renderWin',
    value: function renderWin() {
      var transition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_15__i18n_messages_steps__["a" /* default */][__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__views_app_steps__["b" /* nextStep */])(this.props).transition]);

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        { styleName: 'game-container' },
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_11__components_bubble_say_Component__["a" /* default */],
          { imgSrc: this.props.bpoom.photo },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__i18n_i18n__["a" /* default */])(MSG.win),
          transition
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'div',
          { styleName: 'babyname-container' },
          __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'div',
              { styleName: 'name' },
              this.babyName().split('').map(function (c, i) {
                return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  'div',
                  { key: i, styleName: 'char' },
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                    'span',
                    null,
                    c
                  )
                );
              })
            )
          )
        )
      );
    }
  }, {
    key: 'renderGame',
    value: function renderGame() {
      var _this4 = this;

      var guessed = this.props.guessed;
      var bpoom = this.props.bpoom;
      var bp_game = bpoom.bp_game || {};
      var charset = (bp_game.charset || []).map(function (c) {
        return c.toUpperCase();
      });
      var name = this.babyName();
      var nameChars = name.split('');
      if (charset.length) {
        nameChars.forEach(function (c) {
          if (charset.indexOf(c) < 0) charset.push(c);
        });
      }
      var lastChar = this.state.lastChar;

      return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
        'div',
        { styleName: 'game-container' },
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_12__components_bubble_pic_Component__["a" /* default */],
          { imgSrc: this.state.picture },
          lastChar ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, MSG['guessed_' + (name.indexOf(lastChar) < 0 ? 'ko' : 'ok')], { values: { char: lastChar } })) : bp_game.message
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'div',
          { styleName: 'name' },
          nameChars.map(function (c, index) {
            return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'div',
              { key: index, styleName: ['char', guessed[c] ? '' : 'ko'].join(' ') },
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'span',
                null,
                c
              )
            );
          })
        ),
        __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
          'div',
          { styleName: 'charset' },
          charset.map(function (c) {
            var klass = ['char'];
            if (true === guessed[c]) {
              klass.push('ok');
            }
            if (false === guessed[c]) {
              klass.push('ko');
            }
            var present = name.indexOf(c) >= 0;
            return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
              'div',
              { key: c, onClick: _this4.handleClick.bind(_this4, c, present), styleName: klass.join(' ') },
              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                'div',
                { styleName: 'content' },
                SPACE_REPLACEMENT[c] || c
              )
            );
          })
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_7_react__["Component"])) || _class) || _class);




function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps,
      _state$game = state.game,
      guessed = _state$game.guessed,
      guessedOkCount = _state$game.guessedOkCount,
      guessedKoCount = _state$game.guessedKoCount;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps, guessed: guessed, guessedOkCount: guessedOkCount, guessedKoCount: guessedKoCount };
}

var MSG = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_intl__["defineMessages"])({
  guessed_ok: {
    'id': 'game.guessed.ok',
    'defaultMessage': 'Bravo, mon pr\xE9nom contient bien la lettre "{char}"\xA0!'
  },
  guessed_ko: {
    'id': 'game.guessed.ko',
    'defaultMessage': 'H\xE9 non, mon pr\xE9nom ne contient pas la lettre "{char}"\xA0!'
  },
  win: {
    'id': 'game.win',
    'defaultMessage': 'Bravo ! Tu connais maintenant mon pr\xE9nom.'
  }
});

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GUESSED; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_types__ = __webpack_require__(75);


var GUESSED = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_types__["a" /* default */])();

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_bubble_Component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__styles_scss__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__styles_scss__);






var _dec, _class;








// i18n



// CSS



var Klass = (_dec = __WEBPACK_IMPORTED_MODULE_11_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_12__styles_scss___default.a, { allowMultiple: true }), _dec(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Klass, _Component);

  function Klass() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Klass);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Klass.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Klass)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Klass, [{
    key: 'render',
    value: function render() {
      var bpoom = this.props.bpoom;
      var trip = bpoom.bp_trip || {};
      var transition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_10__i18n_messages_steps__["a" /* default */][__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__views_app_steps__["b" /* nextStep */])(this.props).transition]);

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7__components_bubble_Component__["a" /* default */],
        { top: true, imgSrc: bpoom.photo },
        trip.message
      );
    }
  }]);

  return Klass;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"])) || _class);


function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps)(Klass));

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_bubble_Component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__styles_scss__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__styles_scss__);






var _dec, _class;








// i18n



// CSS



var Klass = (_dec = __WEBPACK_IMPORTED_MODULE_11_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_12__styles_scss___default.a, { allowMultiple: true }), _dec(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Klass, _Component);

  function Klass() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Klass);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Klass.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Klass)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Klass, [{
    key: 'render',
    value: function render() {
      var bpoom = this.props.bpoom;
      var trip = bpoom.bp_trip || {};
      var transition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_10__i18n_messages_steps__["a" /* default */][__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__views_app_steps__["b" /* nextStep */])(this.props).transition]);

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7__components_bubble_Component__["a" /* default */],
        { top: true, imgSrc: bpoom.photo },
        trip.message
      );
    }
  }]);

  return Klass;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"])) || _class);


function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps)(Klass));

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_photoswipe__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_photoswipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_photoswipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_photoswipe_helper__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_bubble_Component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_bubble_pic_Component__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_bubble_say_Component__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_bpoom_img_Component__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__styles_scss__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__styles_scss__);







var _dec, _dec2, _class;














// i18n



// CSS



var _default = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(mapStateToProps), _dec2 = __WEBPACK_IMPORTED_MODULE_17_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_18__styles_scss___default.a, { allowMultiple: true }), _dec(_class = _dec2(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, _default);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(_default)).call(this, props));

    _this.state = {
      photoSwipeOpen: false,
      imgIndex: 0
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'handleClick',
    value: function handleClick(index) {
      this.setState({
        photoSwipeOpen: true,
        imgIndex: index
      });
    }
  }, {
    key: 'gettingData',
    value: function gettingData(gallery, index, item) {
      if (!item.w || !item.h) {
        // unknown size
        if (__WEBPACK_IMPORTED_MODULE_9__lib_photoswipe_helper__["a" /* CACHE */][item.src]) return;
        __WEBPACK_IMPORTED_MODULE_9__lib_photoswipe_helper__["a" /* CACHE */][item.src] = {};

        var img = new Image();
        img.onload = function () {
          __WEBPACK_IMPORTED_MODULE_9__lib_photoswipe_helper__["a" /* CACHE */][item.src] = { width: this.width, height: this.height };
          item.w = this.width; // set image width
          item.h = this.height; // set image height
          gallery.invalidateCurrItems(); // reinit Items
          gallery.updateSize(true); // reinit Items
        };
        img.src = item.src; // let's download image
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.state;

      var bpoom = this.props.bpoom;
      var trip = bpoom.bp_trip || {};
      var transition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_16__i18n_messages_steps__["a" /* default */][__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__views_app_steps__["b" /* nextStep */])(this.props).transition]);

      var items = (trip.bp_trip_events || []).map(function (event) {
        var info = __WEBPACK_IMPORTED_MODULE_9__lib_photoswipe_helper__["a" /* CACHE */][event.photo] || {};
        return {
          src: event.photo,
          title: event.message || '',
          period: event.period || '',
          w: info.width || 0,
          h: info.height || 0
        };
      });

      // TODO: i18n + addCaptionHTMLFn: http://photoswipe.com/documentation/options.html
      var options = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_9__lib_photoswipe_helper__["b" /* PSWP_OPTIONS */], {
        addCaptionHTMLFn: function addCaptionHTMLFn(item, captionEl, isFake) {
          var caption = item.period ? '<strong>' + item.period + '</strong>' : '';
          captionEl.children[0].innerHTML = caption + (caption && item.title ? '<br />' + item.title : item.title);
          return true;
        }
      });

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { styleName: 'trip-container' },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          { styleName: 'trip-view' },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_12__components_bubble_say_Component__["a" /* default */],
            { imgSrc: bpoom.photo },
            trip.message
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { styleName: 'trip-events' },
            (trip.bp_trip_events || []).map(function (event, i) {
              return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'div',
                { key: i },
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__components_bpoom_img_Component__["a" /* default */], { imgSrc: event.photo, imgText: event.period, onClick: _this2.handleClick.bind(_this2, i) }),
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_10__components_bubble_Component__["a" /* default */],
                  null,
                  event.message
                )
              );
            })
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_11__components_bubble_pic_Component__["a" /* default */],
            { imgSrc: bpoom.photo },
            transition
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_react_photoswipe__["PhotoSwipe"], { gettingData: __WEBPACK_IMPORTED_MODULE_9__lib_photoswipe_helper__["c" /* gettingData */], isOpen: state.photoSwipeOpen, options: options, items: items })
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"])) || _class) || _class);




function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps };
}

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_intl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_cloudinary_uploader_Component__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_bpoom_img_Component__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_Actions__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_flash_Actions__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_reactstrap_lib_Form__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_reactstrap_lib_Form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_reactstrap_lib_Form__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_FormGroup__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_FormGroup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_FormGroup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_Label__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_Label___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_Label__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Input__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_Button__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_Button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_Button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_FormFeedback__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_FormFeedback___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_FormFeedback__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__styles_scss__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__styles_scss__);






var _dec, _dec2, _class;












// Components







// i18n


// CSS



var REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

// TODO: deleteFlash when going back to view (cancel or message saved)

var _default = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps, { saveMsg: __WEBPACK_IMPORTED_MODULE_10__app_Actions__["a" /* saveMsg */], flash: __WEBPACK_IMPORTED_MODULE_11__components_flash_Actions__["a" /* flash */] }), _dec2 = __WEBPACK_IMPORTED_MODULE_19_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_20__styles_scss___default.a, { allowMultiple: true }), _dec(_class = _dec2(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, _default);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(_default)).call(this, props));

    _this.inputs = {};
    _this.state = {
      imgSrc: '',
      photo: '',
      nameInvalid: false,
      emailInvalid: false,
      messageInvalid: false,
      formDisabled: false,
      formTouched: false
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.inputs.name.focus();
    }
  }, {
    key: 'onUploadStart',
    value: function onUploadStart() {
      this.setState({ formDisabled: true });
    }
  }, {
    key: 'onUploadEnd',
    value: function onUploadEnd(data) {
      var url = data.secure_url;
      this.setState({
        formDisabled: false,
        imgSrc: url.replace('/upload', '/upload/a_auto,w_263,h_300,c_fill,g_faces'),
        photo: url.replace(/^.*?\/upload\/(.*?$)/, "$1")
      });
    }
  }, {
    key: 'onUploadError',
    value: function onUploadError() {
      this.setState({ formDisabled: false });
      this.props.flash('danger', MSG.form_upload_error);
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.props.onCancel && this.props.onCancel();
    }
  }, {
    key: 'checkName',
    value: function checkName() {
      var invalid = this.state.formTouched && !this.inputs.name.value.trim();
      this.setState({ nameInvalid: invalid });
      return invalid;
    }
  }, {
    key: 'checkEmail',
    value: function checkEmail() {
      var value = this.inputs.email.value.trim();
      var invalid = this.state.formTouched && value && !value.match(REG_EMAIL);
      this.setState({ emailInvalid: invalid });
      return invalid;
    }
  }, {
    key: 'checkMessage',
    value: function checkMessage() {
      var invalid = this.state.formTouched && !this.inputs.message.value.trim();
      this.setState({ messageInvalid: invalid });
      return invalid;
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      this.setState({
        formDisabled: true,
        formTouched: true
      }, function () {
        // Need to execute each of these functions and then check if one was returning true
        if ([_this2.checkName(), _this2.checkEmail(), _this2.checkMessage()].includes(true)) {
          return _this2.setState({ formDisabled: false });
        }

        var formData = {};
        var inputs = _this2.inputs;
        for (var key in inputs) {
          var field = inputs[key];
          formData[field.name] = field.value;
        }
        _this2.props.saveMsg(_this2.props.bpoom, formData).then(function (dispatch) {
          _this2.props.onSave && _this2.props.onSave();
          _this2.props.flash('info', MSG.form_thanks);
        }).catch(function (dispatch) {
          _this2.setState({ formDisabled: false });
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state;
      var inputs = this.inputs;
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { styleName: 'visitorbook-form' },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_12_reactstrap_lib_Form___default.a,
          { onSubmit: this.onSubmit.bind(this) },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_FormGroup___default.a,
            { color: state.nameInvalid ? 'danger' : '' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_Label___default.a,
              { 'for': 'msg_name' },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_name),
              ' *'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Input___default.a, { getRef: function getRef(input) {
                return inputs.name = input;
              },
              onChange: this.checkName.bind(this), type: 'text', name: 'bp_visitorbook_msg[name]', id: 'msg_name' }),
            state.nameInvalid ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_FormFeedback___default.a,
              null,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_name_required)
            ) : ''
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_FormGroup___default.a,
            { color: state.emailInvalid ? 'danger' : '' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_Label___default.a,
              { 'for': 'msg_email' },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_email),
              ' ',
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'small',
                null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_email_desc)
              )
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Input___default.a, { getRef: function getRef(input) {
                return inputs.email = input;
              },
              onChange: this.checkEmail.bind(this), type: 'text', name: 'bp_visitorbook_msg[email]', id: 'msg_email' }),
            state.emailInvalid ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_FormFeedback___default.a,
              null,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_email_invalid)
            ) : ''
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_13_reactstrap_lib_FormGroup___default.a,
            { color: state.messageInvalid ? 'danger' : '' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_14_reactstrap_lib_Label___default.a,
              { 'for': 'msg_message' },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_message),
              ' *'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_reactstrap_lib_Input___default.a, { getRef: function getRef(input) {
                return inputs.message = input;
              },
              onChange: this.checkMessage.bind(this), type: 'textarea', name: 'bp_visitorbook_msg[message]', id: 'msg_message' }),
            state.messageInvalid ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_FormFeedback___default.a,
              null,
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_message_required)
            ) : ''
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { styleName: 'upload-img' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_bpoom_img_Component__["a" /* default */], { imgSrc: state.imgSrc }),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { styleName: 'upload-desc' },
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'div',
                null,
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_import),
                __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('br', null),
                __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                  'small',
                  null,
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_import_formats)
                )
              ),
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_cloudinary_uploader_Component__["a" /* default */], { cloudName: 'babypoom', uploadPreset: 'tdjjz08e',
                onUploadStart: this.onUploadStart.bind(this), onUploadEnd: this.onUploadEnd.bind(this), onUploadError: this.onUploadError.bind(this),
                btnColor: 'neutral-app', btnText: 'Importer une image' }),
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', { ref: function ref(input) {
                  return inputs.photo = input;
                }, type: 'hidden', name: 'bp_visitorbook_msg[photo]', value: state.photo })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { styleName: 'actions' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_Button___default.a,
              { color: 'neutral-app', onClick: this.onCancel.bind(this) },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_cancel)
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_16_reactstrap_lib_Button___default.a,
              { disabled: state.formDisabled,
                color: 'app', type: 'submit' },
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.form_submit)
            )
          )
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"])) || _class) || _class);




function mapStateToProps(state) {
  var bpoom = state.app.bpoom;

  return { bpoom: bpoom };
}

var MSG = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_intl__["defineMessages"])({
  form_name_required: {
    'id': 'visitorbook.form.name_required',
    'defaultMessage': 'C\'est quoi ton petit nom ?'
  },
  form_email_invalid: {
    'id': 'visitorbook.form.email_invalid',
    'defaultMessage': 'Ton email me parait bizarre...'
  },
  form_message_required: {
    'id': 'visitorbook.form.message_required',
    'defaultMessage': 'Tu n\'as rien \xE0 me dire ?'
  },
  form_name: {
    'id': 'visitorbook.form.name',
    'defaultMessage': 'Nom'
  },
  form_email: {
    'id': 'visitorbook.form.email',
    'defaultMessage': 'Email'
  },
  form_email_desc: {
    'id': 'visitorbook.form.email_desc',
    'defaultMessage': '(pour te r\xE9pondre)'
  },
  form_message: {
    'id': 'visitorbook.form.message',
    'defaultMessage': 'Message'
  },
  form_import: {
    'id': 'visitorbook.form.import',
    'defaultMessage': 'Importe ta photo'
  },
  form_import_formats: {
    'id': 'visitorbook.form.import_formats',
    'defaultMessage': '(Formats : JPG, PNG)'
  },
  form_cancel: {
    'id': 'visitorbook.form.cancel',
    'defaultMessage': 'Annuler'
  },
  form_submit: {
    'id': 'visitorbook.form.submit',
    'defaultMessage': 'Valider'
  },
  form_upload_error: {
    'id': 'visitorbook.form.upload_error',
    'defaultMessage': 'Erreur : l\'import a echou\xE9. \nVeuillez re\xE9ssayer plus tard.'
  },
  form_thanks: {
    'id': 'visitorbook.form.thanks',
    'defaultMessage': 'Merci pour ton petit message =)'
  }
});

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_intl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_photoswipe__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_photoswipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_photoswipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lib_photoswipe_helper__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__visitorbook_form_Component__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_bubble_pic_Component__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_bubble_say_Component__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_message_Component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_Button__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_Button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_Button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__styles_scss__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__styles_scss__);







var _dec, _dec2, _class, _class2, _temp;
















// Components


// i18n



// CSS



var Klass = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_redux__["connect"])(mapStateToProps), _dec2 = __WEBPACK_IMPORTED_MODULE_20_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_21__styles_scss___default.a, { allowMultiple: true }), _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Klass, _Component);

  function Klass(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Klass);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Klass.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Klass)).call(this, props));

    _this.state = {
      photoSwipeOpen: false,
      imgIndex: 0,
      formVisible: false // TODO
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Klass, [{
    key: 'handleClick',
    value: function handleClick(index) {
      this.setState({
        photoSwipeOpen: true,
        imgIndex: index
      });
    }
  }, {
    key: 'displayForm',
    value: function displayForm() {
      this.setState({ formVisible: true });
    }
  }, {
    key: 'onSaveMsg',
    value: function onSaveMsg() {
      this.setState({ formVisible: false });
    }
  }, {
    key: 'onCancelMsg',
    value: function onCancelMsg() {
      this.setState({ formVisible: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.state;
      if (state.formVisible) {
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__visitorbook_form_Component__["a" /* default */], { onSave: this.onSaveMsg.bind(this), onCancel: this.onCancelMsg.bind(this) });
      }

      var props = this.props;
      var bpoom = props.bpoom;
      var visitorbook = bpoom.bp_visitorbook || {};
      var transition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_19__i18n_messages_steps__["a" /* default */][__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__views_app_steps__["b" /* nextStep */])(props).transition]);

      var items = (visitorbook.bp_visitorbook_msgs || []).map(function (event) {
        var info = __WEBPACK_IMPORTED_MODULE_11__lib_photoswipe_helper__["a" /* CACHE */][event.photo] || {};
        return {
          src: event.photo,
          title: event.message || '',
          name: event.name || '',
          created_at: event.created_at || '',
          w: info.width || 0,
          h: info.height || 0
        };
      });

      // TODO: i18n + addCaptionHTMLFn: http://photoswipe.com/documentation/options.html
      var options = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_11__lib_photoswipe_helper__["b" /* PSWP_OPTIONS */], {
        addCaptionHTMLFn: function addCaptionHTMLFn(item, captionEl, isFake) {
          var caption = '<strong>' + formatDate(props, item.created_at) + ' - ' + item.name + '</strong>';
          captionEl.children[0].innerHTML = caption + (caption && item.title ? '<br />' + item.title : item.title);
          return true;
        }
      });

      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { styleName: 'visitorbook-container' },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          { styleName: 'visitorbook-view' },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_14__components_bubble_say_Component__["a" /* default */],
            { imgSrc: bpoom.photo },
            visitorbook.message
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_Button___default.a,
            { block: true, color: 'app', onClick: this.displayForm.bind(this) },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.leave_message)
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { styleName: 'visitorbook-msgs' },
            (visitorbook.bp_visitorbook_msgs || []).map(function (event, i) {
              return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'div',
                { key: i },
                __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15__components_message_Component__["a" /* default */], { imgSrc: event.photo, message: event.message, date: formatDate(props, event.created_at), name: event.name,
                  onClick: _this2.handleClick.bind(_this2, i) })
              );
            })
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_17_reactstrap_lib_Button___default.a,
            { block: true, color: 'app', onClick: this.displayForm.bind(this) },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__i18n_i18n__["a" /* default */])(MSG.leave_message)
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_13__components_bubble_pic_Component__["a" /* default */],
            { imgSrc: bpoom.photo },
            transition
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10_react_photoswipe__["PhotoSwipe"], { gettingData: __WEBPACK_IMPORTED_MODULE_11__lib_photoswipe_helper__["c" /* gettingData */], isOpen: state.photoSwipeOpen, options: options, items: items })
      );
    }
  }]);

  return Klass;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]), _class2.childContextTypes = {
  intl: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object.isRequired
}, _temp)) || _class) || _class);


/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_intl__["injectIntl"])(Klass));

function formatDate(props, date) {
  return props.intl.formatDate(new Date(date), {
    year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"
  });
}

function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps };
}

var MSG = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_react_intl__["defineMessages"])({
  leave_message: {
    'id': 'visitorbook.leave_message',
    'defaultMessage': 'Laisser un message'
  }
});

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_intl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_bubble_Component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_app_steps__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__i18n_i18n__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__i18n_messages_steps__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_css_modules__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_css_modules___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react_css_modules__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__styles_scss__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__styles_scss__);






var _dec, _dec2, _class;









// i18n



// CSS



var _default = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(mapStateToProps), _dec2 = __WEBPACK_IMPORTED_MODULE_12_react_css_modules___default()(__WEBPACK_IMPORTED_MODULE_13__styles_scss___default.a, { allowMultiple: true }), _dec(_class = _dec2(_class = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(_default, _Component);

  function _default() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, _default);

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_default.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(_default)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(_default, [{
    key: 'render',
    value: function render() {
      var bpoom = this.props.bpoom;
      var transition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__i18n_i18n__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_11__i18n_messages_steps__["a" /* default */][__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__views_app_steps__["b" /* nextStep */])(this.props).transition]);

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { styleName: 'welcome-container' },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_8__components_bubble_Component__["a" /* default */],
          { speechDir: 'bottom', scrollable: true },
          bpoom.bp_welcome ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'span',
            null,
            bpoom.bp_welcome.message,
            '\n\n',
            transition
          ) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__i18n_i18n__["a" /* default */])(MSG.welcome)
        )
      );
    }
  }]);

  return _default;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"])) || _class) || _class);




function mapStateToProps(state) {
  var _state$app = state.app,
      bpoom = _state$app.bpoom,
      currentStep = _state$app.currentStep,
      availableSteps = _state$app.availableSteps;

  return { bpoom: bpoom, currentStep: currentStep, availableSteps: availableSteps };
}

var MSG = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_intl__["defineMessages"])({
  welcome: {
    'id': 'welcome',
    'defaultMessage': 'Coucou toi !\n\nPatiente quelques instants, j\'ai une grande nouvelle \xE0 t\'annoncer...'
  }
});

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);

var ASCII_TO_ACCENT = {
  a: "áàâäãåāąă",
  ae: "æ",
  c: "çćčĉċ",
  d: "ðďđ",
  e: "éèêëēęěĕė",
  f: "ƒſ",
  g: "ĝğġģ",
  h: "ĥħ",
  i: "íìîïīĩĭįı",
  ij: "ĳ",
  j: "ĵ",
  J: "Ĵ",
  k: "ķĸ",
  l: "łľĺļŀ",
  n: "ñńňņŉŋ",
  o: "óòôöõøōőŏ",
  oe: "œ",
  p: "þ",
  r: "ŕřŗ",
  s: "śšşŝș",
  ss: "ß",
  t: "ťţŧț",
  u: "úùûüūůűŭũų",
  w: "ŵ",
  y: "ýŷÿ",
  z: "žżź",
  // No, that's not a good idea to produce uppercase from lowercase... ;-)
  A: "ÁÀÂÄÃÅĀĄĂ",
  AE: "Æ",
  C: "ÇĆČĈĊ",
  D: "ÐĎĐ",
  E: "ÉÈÊËĒĘĚĔĖ",
  F: "Ƒ",
  G: "ĜĞĠĢ",
  H: "ĤĦ",
  I: "ÍÌÎÏĪĨĬĮİ",
  IJ: "Ĳ",
  K: "Ķ",
  L: "ŁĽĹĻĿ",
  N: "ÑŃŇŅŊ",
  O: "ÓÒÔÖÕØŌŐŎ",
  OE: "Œ",
  P: "Þ",
  R: "ŔŘŖ",
  S: "ŚŠŞŜȘ",
  T: "ŤŢŦȚ",
  U: "ÚÙÛÜŪŮŰŬŨŲ",
  W: "Ŵ",
  Y: "ÝŶŸ",
  Z: "ŽŻŹ"
};

var ACCENT_TO_ASCII = {};
var REG_CONVERT = '';
__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(ASCII_TO_ACCENT).forEach(function (k) {
  var value = ASCII_TO_ACCENT[k];
  REG_CONVERT += value;
  for (var i = 0, len = value.length; i < len; ++i) {
    ACCENT_TO_ASCII[value.charAt(i)] = k;
  }
});
REG_CONVERT = new RegExp('[' + REG_CONVERT + ']', 'g');

/* harmony default export */ __webpack_exports__["a"] = (function (text) {
  return text.replace(REG_CONVERT, _replace);
});

function _replace(char) {
  return ACCENT_TO_ASCII[char];
}

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var cssVarPoly = {
  init: function init(variables) {
    // first lets see if the browser supports CSS variables
    // No version of IE supports window.CSS.supports, so if that isn't supported in the first place we know CSS variables is not supported
    // Edge supports supports, so check for actual variable support
    if (window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)')) {
      // this browser does support variables, abort
      return;
    } else {
      document.querySelector('body').classList.add('cssvars-polyfilled');
    }

    cssVarPoly.oldCSS = {};

    // start things off
    cssVarPoly.findCSS(variables);
    cssVarPoly.updateCSS(variables);
  },


  // find all the css blocks, save off the content, and look for variables
  findCSS: function findCSS(variables) {
    var styleBlocks = document.querySelectorAll('style:not(.inserted),link[rel="stylesheet"]');

    // we need to track the order of the style/link elements when we save off the CSS, set a counter
    var counter = 1;

    // loop through all CSS blocks looking for CSS variables being set
    [].forEach.call(styleBlocks, function (block) {
      // console.log(block.nodeName);
      var theCSS = void 0;
      if (block.nodeName === 'STYLE') {
        // console.log("style");
        theCSS = block.innerHTML;
      } else if (block.nodeName === 'LINK') {
        // console.log("link");
        cssVarPoly.getLink(block.getAttribute('href'), counter, function (counter, request) {
          cssVarPoly.oldCSS[counter] = request.responseText;
          cssVarPoly.updateCSS(variables);
        });
        theCSS = '';
      }
      // save off the CSS to parse through again later. the value may be empty for links that are waiting for their ajax return, but this will maintain the order
      cssVarPoly.oldCSS[counter] = theCSS;
      counter++;
    });
  },


  // run through all the CSS blocks to update the variables and then inject on the page
  updateCSS: function updateCSS(variables) {
    // loop through the css blocks (styles and links)
    for (var curCSSID in cssVarPoly.oldCSS) {
      // console.log("curCSS:",oldCSS[curCSSID]);
      var newCSS = cssVarPoly.replaceGetters(cssVarPoly.oldCSS[curCSSID], variables);
      // put it back into the page
      // first check to see if this block exists already
      if (document.querySelector('#inserted' + curCSSID)) {
        // console.log("updating")
        document.querySelector('#inserted' + curCSSID).innerHTML = newCSS;
      } else {
        // console.log("adding");
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = newCSS;
        style.classList.add('inserted');
        style.id = 'inserted' + curCSSID;
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    }
  },


  // parse a provided block of CSS looking for a provided list of variables and replace the --var-name with the correct value
  replaceGetters: function replaceGetters(curCSS, varList) {
    // console.log(varList);
    for (var theVar in varList) {
      // console.log(theVar);
      // match the variable with the actual variable name
      var getterRegex = new RegExp('var\\(\\s*' + theVar + '\\s*\\)', 'g');
      // console.log(getterRegex);
      // console.log(curCSS);
      curCSS = curCSS.replace(getterRegex, varList[theVar]);

      // now check for any getters that are left that have fallbacks
      var getterRegex2 = new RegExp('var\\(\\s*.+\\s*,\\s*(.+)\\)', 'g');
      // console.log(getterRegex);
      // console.log(curCSS);
      var matches = curCSS.match(getterRegex2);
      if (matches) {
        // console.log("matches",matches);
        matches.forEach(function (match) {
          // console.log(match.match(/var\(.+,\s*(.+)\)/))
          // find the fallback within the getter
          curCSS = curCSS.replace(match, match.match(/var\(.+,\s*(.+)\)/)[1]);
        });
      }

      // curCSS = curCSS.replace(getterRegex2,varList[theVar]);
    };
    // console.log(curCSS);
    return curCSS;
  },


  // get the CSS file (same domain for now)
  getLink: function getLink(url, counter, success) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.overrideMimeType('text/css;');
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        // console.log(request.responseText);
        if (typeof success === 'function') {
          success(counter, request);
        }
      } else {
        // We reached our target server, but it returned an error
        console.warn('an error was returned from:', url);
      }
    };

    request.onerror = function () {
      // There was a connection error of some sort
      console.warn('we could not get anything from:', url);
    };

    request.send();
  }
};

/* harmony default export */ __webpack_exports__["a"] = (cssVarPoly);

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__);







var FN = function FN() {};

var UploadManager = function () {
  function UploadManager(options) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, UploadManager);

    // dropContainer
    // input
    // data
    // key
    // maxSimultaneousUploads
    // onFileAdded
    // uploadUrl
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign___default()(this, {
      maxSimultaneousUploads: -1,
      onFileAdded: FN
    }, options);
    this.uploadsQueue = [];
    this.activeUploads = 0;
    this.initialize();
  }

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(UploadManager, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      var dropContainer = this.dropContainer;
      var input = this.input;

      var cancelEvent = function cancelEvent(e) {
        e.preventDefault();
        e.stopPropagation();
      };

      var dragOverOnClass = function dragOverOnClass(e) {
        cancelEvent(e);
        dropContainer.classList.add('drag-over');
      };

      var dragOverOffClass = function dragOverOffClass(e) {
        cancelEvent(e);
        dropContainer.classList.remove('drag-over');
      };

      if (dropContainer) {
        dropContainer.addEventListener('dragenter', dragOverOnClass, false);
        dropContainer.addEventListener('dragover', dragOverOnClass, false);
        dropContainer.addEventListener('dragleave', dragOverOffClass, false);

        dropContainer.addEventListener('drop', function (e) {
          cancelEvent(e);
          dragOverOffClass(e);
          _this.processFiles(e.dataTransfer.files);
        }, false);
      }

      if (input) {
        input.addEventListener('change', function (e) {
          return _this.processFiles(e.target.files);
        }, false);
      }
    }
  }, {
    key: 'processFiles',
    value: function processFiles(files) {
      var _this2 = this;

      [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(files)).forEach(function (file) {
        if (!file.size) {
          // TODO
          return alert('Files with files size zero cannot be uploaded or multiple file uploads are not supported by your browser');
        }
        _this2.processFile(new FileUpload(file));
      });
    }
  }, {
    key: 'processFile',
    value: function processFile(upload) {
      var _this3 = this;

      this.onFileAdded(upload);

      if (this.getSignature) {
        this.getSignature(function (data) {
          _this3.ajaxUpload(upload, data);
        });
      } else {
        this.ajaxUpload(upload);
      }
    }
  }, {
    key: 'ajaxUpload',
    value: function ajaxUpload(upload) {
      var _this4 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Queue upload if maximum simultaneous uploads reached:
      if (this.activeUploads === this.maxSimultaneousUploads) {
        return this.uploadsQueue.push(upload);
      }

      var file = upload.file;
      data = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, this.data, data);

      ++this.activeUploads;

      var xhr = new window.XMLHttpRequest();
      var formData = new window.FormData();
      var fileName = file.name;

      xhr.open('POST', this.uploadUrl);
      xhr.setRequestHeader('Accept', 'application/json, text/javascript', '*/*');
      var headers = this.headers || {};
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(headers).forEach(function (name) {
        var value = headers[name];
        if ('function' === typeof value) {
          value = value();
        }
        xhr.setRequestHeader(name, value);
      });

      var xhrUpload = xhr.upload;
      // Triggered when upload starts:
      xhrUpload.onloadstart = function () {
        // File size is not reported during start!
        upload.onStart();
      };

      // Triggered many times during upload:
      xhrUpload.onprogress = function (event) {
        if (!event.lengthComputable) {
          return;
        }
        // Update file size because it might be bigger than reported by the fileSize:
        upload.onProgress(event.total, event.loaded);
      };

      xhr.onloadend = function (event) {
        --_this4.activeUploads;

        if (404 === xhr.status) {
          upload.onError('Upload failed: ', upload.fileName);
        } else {
          var json = void 0;
          try {
            json = JSON.parse(xhr.responseText);
          } catch (e) {
            json = {};
          }
          upload.onEnd(json);
        }
        _this4.onUploadComplete();
      };

      // Triggered when upload fails:
      xhrUpload.onerror = function () {
        upload.onError('Upload failed: ', upload.fileName);
      };

      // Append additional data if provided:
      if (data) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(data).forEach(function (prop) {
          formData.append(prop, data[prop]);
        });
      }

      // Append file data:
      formData.append(this.key || 'file', file);

      // Initiate upload:
      xhr.send(formData);
    }
  }, {
    key: 'onUploadComplete',
    value: function onUploadComplete() {
      // Check if there are any uploads left in a queue:
      if (this.uploadsQueue.length) {
        this.ajaxUpload(this.uploadsQueue.shift());
      }
    }
  }]);

  return UploadManager;
}();



var FileUpload = function () {
  function FileUpload(file) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, FileUpload);

    this.file = file;
    this.fileName = file.name;
    this.fileSize = file.size;
    this.uploadedBytes = 0;
    this.eventHandlers = {};
  }

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(FileUpload, [{
    key: 'on',
    value: function on(eventName, handler) {
      this.eventHandlers[eventName] = handler;
      return this;
    }
  }, {
    key: 'onStart',
    value: function onStart() {
      (this.eventHandlers.start || FN)();
    }
  }, {
    key: 'onProgress',
    value: function onProgress(fileSize, uploadedBytes) {
      var progress = uploadedBytes / fileSize * 100;
      (this.eventHandlers.progress || FN)(progress, fileSize, uploadedBytes);
    }
  }, {
    key: 'onError',
    value: function onError(error) {
      (this.eventHandlers.error || FN)(error);
    }
  }, {
    key: 'onEnd',
    value: function onEnd(data) {
      this.file = null;
      (this.eventHandlers.end || FN)(data);
    }
  }]);

  return FileUpload;
}();

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_routes__ = __webpack_require__(99);
var express = __webpack_require__(101);
var path = __webpack_require__(103);
var compression = __webpack_require__(100);
var fs = __webpack_require__(102);

// import React from 'react'
// import { renderToString } from 'react-dom/server'

// import { Provider } from 'react-redux';

// import HotIntlProvider from './app/i18n/hot-intl-provider/HotIntlProvider';
// import configureStore from './app/store/configureStore';


// import { messages, setup } from './app/i18n/messages';

// var stats = JSON.parse(fs.readFileSync("./public/webpack.stats.json"));

var app = express();
app.use(compression()); // must be first!

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {

  // let store = configureStore();
  // setup('fr')(store.dispatch);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_router__["match"])({ routes: __WEBPACK_IMPORTED_MODULE_1__app_routes__["a" /* default */], location: req.url }, function (err, redirect, props) {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message);
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // if we got props then we matched a route and can render


      // const appHtml = renderToString(
      //   <Provider store={store}>
      //     <HotIntlProvider allMessages={{ ...messages }}>
      //       <RouterContext {...props}/>
      //     </HotIntlProvider>
      //   </Provider>
      // )
      // res.send(renderPage(appHtml))
      res.send(renderPage(''));
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found');
    }
  });
});

var pageCache;
function renderPage(appHtml) {
  if (!pageCache) {
    var cache = fs.readFileSync(path.join(__dirname, 'public', 'index.html')).toString();
    pageCache = cache.split('<div id="root"></div>');
    pageCache[0] += '<div id="root">';
    pageCache[1] = '</div>' + pageCache[1];
  }
  return pageCache[0] + appHtml + pageCache[1];
}

var PORT = process.env.PORT || 8080;
app.listen(PORT, 'localhost', function () {
  console.log('Production Express server running at localhost:' + PORT);
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, ""))

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(147), __esModule: true };

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(150), __esModule: true };

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(127);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(175);
module.exports = __webpack_require__(7).Array.from;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(33);
module.exports = __webpack_require__(173);

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
__webpack_require__(33);
module.exports = __webpack_require__(174);

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
__webpack_require__(33);
__webpack_require__(39);
__webpack_require__(177);
__webpack_require__(186);
module.exports = __webpack_require__(7).Map;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(178);
module.exports = __webpack_require__(7).Object.assign;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(179);
var $Object = __webpack_require__(7).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(180);
var $Object = __webpack_require__(7).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(181);
module.exports = __webpack_require__(7).Object.getPrototypeOf;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(182);
module.exports = __webpack_require__(7).Object.keys;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(183);
module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
__webpack_require__(33);
__webpack_require__(39);
__webpack_require__(184);
module.exports = __webpack_require__(7).Promise;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(185);
__webpack_require__(68);
__webpack_require__(187);
__webpack_require__(188);
module.exports = __webpack_require__(7).Symbol;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(39);
module.exports = __webpack_require__(66).f('iterator');

/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(44);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(28)
  , toLength  = __webpack_require__(48)
  , toIndex   = __webpack_require__(172);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(22)
  , IObject  = __webpack_require__(56)
  , toObject = __webpack_require__(32)
  , toLength = __webpack_require__(48)
  , asc      = __webpack_require__(156);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(24)
  , isArray  = __webpack_require__(83)
  , SPECIES  = __webpack_require__(11)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(155);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(18).f
  , create      = __webpack_require__(46)
  , redefineAll = __webpack_require__(60)
  , ctx         = __webpack_require__(22)
  , anInstance  = __webpack_require__(53)
  , defined     = __webpack_require__(43)
  , forOf       = __webpack_require__(44)
  , $iterDefine = __webpack_require__(57)
  , step        = __webpack_require__(86)
  , setSpecies  = __webpack_require__(93)
  , DESCRIPTORS = __webpack_require__(19)
  , fastKey     = __webpack_require__(58).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(42)
  , from    = __webpack_require__(152);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(13)
  , $export        = __webpack_require__(17)
  , meta           = __webpack_require__(58)
  , fails          = __webpack_require__(26)
  , hide           = __webpack_require__(23)
  , redefineAll    = __webpack_require__(60)
  , forOf          = __webpack_require__(44)
  , anInstance     = __webpack_require__(53)
  , isObject       = __webpack_require__(24)
  , setToStringTag = __webpack_require__(38)
  , dP             = __webpack_require__(18).f
  , each           = __webpack_require__(154)(0)
  , DESCRIPTORS    = __webpack_require__(19);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        anInstance(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(18)
  , createDesc      = __webpack_require__(37);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(31)
  , gOPS    = __webpack_require__(59)
  , pIE     = __webpack_require__(47);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 162 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(46)
  , descriptor     = __webpack_require__(37)
  , setToStringTag = __webpack_require__(38)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(23)(IteratorPrototype, __webpack_require__(11)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(31)
  , toIObject = __webpack_require__(28);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(13)
  , macrotask = __webpack_require__(94).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(36)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(31)
  , gOPS     = __webpack_require__(59)
  , pIE      = __webpack_require__(47)
  , toObject = __webpack_require__(32)
  , IObject  = __webpack_require__(56)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(26)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(18)
  , anObject = __webpack_require__(21)
  , getKeys  = __webpack_require__(31);

module.exports = __webpack_require__(19) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(28)
  , gOPN      = __webpack_require__(88).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(24)
  , anObject = __webpack_require__(21);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(22)(Function.call, __webpack_require__(87).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(21)
  , aFunction = __webpack_require__(52)
  , SPECIES   = __webpack_require__(11)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(63)
  , defined   = __webpack_require__(43);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(63)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(21)
  , get      = __webpack_require__(67);
module.exports = __webpack_require__(7).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(42)
  , ITERATOR  = __webpack_require__(11)('iterator')
  , Iterators = __webpack_require__(30);
module.exports = __webpack_require__(7).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(22)
  , $export        = __webpack_require__(17)
  , toObject       = __webpack_require__(32)
  , call           = __webpack_require__(84)
  , isArrayIter    = __webpack_require__(82)
  , toLength       = __webpack_require__(48)
  , createProperty = __webpack_require__(160)
  , getIterFn      = __webpack_require__(67);

$export($export.S + $export.F * !__webpack_require__(85)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(151)
  , step             = __webpack_require__(86)
  , Iterators        = __webpack_require__(30)
  , toIObject        = __webpack_require__(28);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(57)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(157);

// 23.1 Map Objects
module.exports = __webpack_require__(159)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(17);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(166)});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(17)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(46)});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(17);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(19), 'Object', {defineProperty: __webpack_require__(18).f});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(32)
  , $getPrototypeOf = __webpack_require__(89);

__webpack_require__(91)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(32)
  , $keys    = __webpack_require__(31);

__webpack_require__(91)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(17);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(169).set});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(45)
  , global             = __webpack_require__(13)
  , ctx                = __webpack_require__(22)
  , classof            = __webpack_require__(42)
  , $export            = __webpack_require__(17)
  , isObject           = __webpack_require__(24)
  , aFunction          = __webpack_require__(52)
  , anInstance         = __webpack_require__(53)
  , forOf              = __webpack_require__(44)
  , speciesConstructor = __webpack_require__(170)
  , task               = __webpack_require__(94).set
  , microtask          = __webpack_require__(165)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(11)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(60)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(38)($Promise, PROMISE);
__webpack_require__(93)(PROMISE);
Wrapper = __webpack_require__(7)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(85)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(13)
  , has            = __webpack_require__(27)
  , DESCRIPTORS    = __webpack_require__(19)
  , $export        = __webpack_require__(17)
  , redefine       = __webpack_require__(92)
  , META           = __webpack_require__(58).KEY
  , $fails         = __webpack_require__(26)
  , shared         = __webpack_require__(62)
  , setToStringTag = __webpack_require__(38)
  , uid            = __webpack_require__(49)
  , wks            = __webpack_require__(11)
  , wksExt         = __webpack_require__(66)
  , wksDefine      = __webpack_require__(65)
  , keyOf          = __webpack_require__(164)
  , enumKeys       = __webpack_require__(161)
  , isArray        = __webpack_require__(83)
  , anObject       = __webpack_require__(21)
  , toIObject      = __webpack_require__(28)
  , toPrimitive    = __webpack_require__(64)
  , createDesc     = __webpack_require__(37)
  , _create        = __webpack_require__(46)
  , gOPNExt        = __webpack_require__(168)
  , $GOPD          = __webpack_require__(87)
  , $DP            = __webpack_require__(18)
  , $keys          = __webpack_require__(31)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(88).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(47).f  = $propertyIsEnumerable;
  __webpack_require__(59).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(45)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(23)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(17);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(158)('Map')});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65)('asyncIterator');

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65)('observable');

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClass;

var _hasClass = __webpack_require__(190);

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass2.default)(element)) element.className = element.className + ' ' + className;
}
module.exports = exports['default'];

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasClass;
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + element.className + " ").indexOf(" " + className + " ") !== -1;
}
module.exports = exports["default"];

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
};

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

var _inDOM = __webpack_require__(95);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = 'transform';
var prefix = void 0,
    transitionEnd = void 0,
    animationEnd = void 0;
var transitionProperty = void 0,
    transitionDuration = void 0,
    transitionTiming = void 0,
    transitionDelay = void 0;
var animationName = void 0,
    animationDuration = void 0,
    animationTiming = void 0,
    animationDelay = void 0;

if (_inDOM2.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;


  exports.transform = transform = prefix + '-' + transform;
  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';

  exports.animationName = animationName = prefix + '-animation-name';
  exports.animationDuration = animationDuration = prefix + '-animation-duration';
  exports.animationTiming = animationTiming = prefix + '-animation-delay';
  exports.animationDelay = animationDelay = prefix + '-animation-timing-function';
}

exports.transform = transform;
exports.transitionProperty = transitionProperty;
exports.transitionTiming = transitionTiming;
exports.transitionDelay = transitionDelay;
exports.transitionDuration = transitionDuration;
exports.transitionEnd = transitionEnd;
exports.animationName = animationName;
exports.animationDuration = animationDuration;
exports.animationTiming = animationTiming;
exports.animationDelay = animationDelay;
exports.animationEnd = animationEnd;
exports.default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};


function getTransitionProperties() {
  var style = document.createElement('div').style;

  var vendorMap = {
    O: function O(e) {
      return 'o' + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return 'webkit' + e;
    },
    ms: function ms(e) {
      return 'MS' + e;
    }
  };

  var vendors = Object.keys(vendorMap);

  var transitionEnd = void 0,
      animationEnd = void 0;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + 'TransitionProperty' in style) {
      prefix = '-' + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';

  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';

  style = null;

  return { animationEnd: animationEnd, transitionEnd: transitionEnd, prefix: prefix };
}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(95);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vendors = ['', 'webkit', 'moz', 'o', 'ms'];
var cancel = 'clearTimeout';
var raf = fallback;
var compatRaf = void 0;

var getKey = function getKey(vendor, k) {
  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
};

if (_inDOM2.default) {
  vendors.some(function (vendor) {
    var rafKey = getKey(vendor, 'request');

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel');
      return raf = function raf(cb) {
        return window[rafKey](cb);
      };
    }
  });
}

/* https://github.com/component/raf */
var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime(),
      ms = Math.max(0, 16 - (curr - prev)),
      req = setTimeout(fn, ms);

  prev = curr;
  return req;
}

compatRaf = function compatRaf(cb) {
  return raf(cb);
};
compatRaf.cancel = function (id) {
  window[cancel] && typeof window[cancel] === 'function' && window[cancel](id);
};
exports.default = compatRaf;
module.exports = exports['default'];

/***/ }),
/* 194 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-components-bpoom-img-___styles__btn-app___2aALD","focus":"app-components-bpoom-img-___styles__focus___Q-km6","disabled":"app-components-bpoom-img-___styles__disabled___8rBA_","active":"app-components-bpoom-img-___styles__active___1phfm","show":"app-components-bpoom-img-___styles__show___oFArr","dropdown-toggle":"app-components-bpoom-img-___styles__dropdown-toggle___3Jz6B","btn-neutral-app":"app-components-bpoom-img-___styles__btn-neutral-app___2MZVQ","img":"app-components-bpoom-img-___styles__img___3uiwZ","img-container":"app-components-bpoom-img-___styles__img-container___2FnN2","img-border":"app-components-bpoom-img-___styles__img-border____nzDI","img-text":"app-components-bpoom-img-___styles__img-text___2u_Mt"};

/***/ }),
/* 195 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-components-bubble-pic-___styles__btn-app___RumzY","focus":"app-components-bubble-pic-___styles__focus___338OO","disabled":"app-components-bubble-pic-___styles__disabled___jSL2I","active":"app-components-bubble-pic-___styles__active___osSXo","show":"app-components-bubble-pic-___styles__show___4ja-3","dropdown-toggle":"app-components-bubble-pic-___styles__dropdown-toggle_____uCm","btn-neutral-app":"app-components-bubble-pic-___styles__btn-neutral-app___OvLTT","left":"app-components-bubble-pic-___styles__left___3q5I-","right":"app-components-bubble-pic-___styles__right___U5wsp","img":"app-components-bubble-pic-___styles__img___2--RG"};

/***/ }),
/* 196 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-components-bubble-say-___styles__btn-app___d_wGu","focus":"app-components-bubble-say-___styles__focus___2ZZjO","disabled":"app-components-bubble-say-___styles__disabled___2jdVY","active":"app-components-bubble-say-___styles__active___2ZBCV","show":"app-components-bubble-say-___styles__show___1LKol","dropdown-toggle":"app-components-bubble-say-___styles__dropdown-toggle___3rHmW","btn-neutral-app":"app-components-bubble-say-___styles__btn-neutral-app___3A-Mi","bubble-say-container":"app-components-bubble-say-___styles__bubble-say-container___3cSG-","img":"app-components-bubble-say-___styles__img___38M-2"};

/***/ }),
/* 197 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-components-bubble-___styles__btn-app___1gsFg","focus":"app-components-bubble-___styles__focus___CQ6Ac","disabled":"app-components-bubble-___styles__disabled___3k4Ee","active":"app-components-bubble-___styles__active___3Agjt","show":"app-components-bubble-___styles__show___1-K-6","dropdown-toggle":"app-components-bubble-___styles__dropdown-toggle___AozhJ","btn-neutral-app":"app-components-bubble-___styles__btn-neutral-app___1XtYs","bubble":"app-components-bubble-___styles__bubble___bB0JX","content":"app-components-bubble-___styles__content___2zRjU","scrollable":"app-components-bubble-___styles__scrollable___188rl","top":"app-components-bubble-___styles__top___xbkmR","left":"app-components-bubble-___styles__left___3Ot7v","right":"app-components-bubble-___styles__right___3E3nR","bottom":"app-components-bubble-___styles__bottom___1xZaq","bend-left":"app-components-bubble-___styles__bend-left___237ry","bend-bottom":"app-components-bubble-___styles__bend-bottom___1W1gc"};

/***/ }),
/* 198 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-components-cloudinary-uploader-___styles__btn-app___3nmhW","focus":"app-components-cloudinary-uploader-___styles__focus___bT_al","disabled":"app-components-cloudinary-uploader-___styles__disabled___1EQr5","active":"app-components-cloudinary-uploader-___styles__active___2qm5D","show":"app-components-cloudinary-uploader-___styles__show___3SOWh","dropdown-toggle":"app-components-cloudinary-uploader-___styles__dropdown-toggle___zVSuR","btn-neutral-app":"app-components-cloudinary-uploader-___styles__btn-neutral-app___e-_5M","upload-input":"app-components-cloudinary-uploader-___styles__upload-input___3a-yS"};

/***/ }),
/* 199 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-components-footer-___styles__btn-app___1gDB0","focus":"app-components-footer-___styles__focus___3TaP0","disabled":"app-components-footer-___styles__disabled___3rO2s","active":"app-components-footer-___styles__active___Zdr5I","show":"app-components-footer-___styles__show___13m6X","dropdown-toggle":"app-components-footer-___styles__dropdown-toggle___3MB6L","btn-neutral-app":"app-components-footer-___styles__btn-neutral-app___dhmrA","footer":"app-components-footer-___styles__footer___32An7"};

/***/ }),
/* 200 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-components-header-___styles__btn-app___2idJD","focus":"app-components-header-___styles__focus___1liUn","disabled":"app-components-header-___styles__disabled___TEYTD","active":"app-components-header-___styles__active___JAR0J","show":"app-components-header-___styles__show___2Angy","dropdown-toggle":"app-components-header-___styles__dropdown-toggle___X5eEv","btn-neutral-app":"app-components-header-___styles__btn-neutral-app___2LUYZ","nav-brand":"app-components-header-___styles__nav-brand___17hoP","mobile-nav":"app-components-header-___styles__mobile-nav___3Jf5Y","mobile-menu":"app-components-header-___styles__mobile-menu___Vggnf","disabled-link":"app-components-header-___styles__disabled-link___3ETTn","current":"app-components-header-___styles__current___1nXNJ","nav-button":"app-components-header-___styles__nav-button___3bOoo","toggler":"app-components-header-___styles__toggler___2f4ic","icon":"app-components-header-___styles__icon___qmasC"};

/***/ }),
/* 201 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-components-message-___styles__btn-app___2162B","focus":"app-components-message-___styles__focus___22ewn","disabled":"app-components-message-___styles__disabled___TokQT","active":"app-components-message-___styles__active___SG4xe","show":"app-components-message-___styles__show___xzNKr","dropdown-toggle":"app-components-message-___styles__dropdown-toggle___2jUMJ","btn-neutral-app":"app-components-message-___styles__btn-neutral-app___J75OT","message-container":"app-components-message-___styles__message-container___FYAGK","content":"app-components-message-___styles__content___wA_Rm","actions":"app-components-message-___styles__actions___zA1Mo","edit":"app-components-message-___styles__edit___2lHzP","title":"app-components-message-___styles__title___2J4Il","message":"app-components-message-___styles__message___jZHL9"};

/***/ }),
/* 202 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-app-___styles__btn-app___2J_Ct","focus":"app-views-app-___styles__focus___1S5w6","disabled":"app-views-app-___styles__disabled___2zq6h","active":"app-views-app-___styles__active___-a8JI","show":"app-views-app-___styles__show___3Wkum","dropdown-toggle":"app-views-app-___styles__dropdown-toggle___5FdIP","btn-neutral-app":"app-views-app-___styles__btn-neutral-app___3f1bw","flash":"app-views-app-___styles__flash___2GyXk"};

/***/ }),
/* 203 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-arrival-___styles__btn-app___1glHI","focus":"app-views-arrival-___styles__focus___nK3xU","disabled":"app-views-arrival-___styles__disabled___2X8Cp","active":"app-views-arrival-___styles__active___UleWA","show":"app-views-arrival-___styles__show___4STkz","dropdown-toggle":"app-views-arrival-___styles__dropdown-toggle___5UR8-","btn-neutral-app":"app-views-arrival-___styles__btn-neutral-app___1jRrn","arrival-container":"app-views-arrival-___styles__arrival-container___5__lh","info":"app-views-arrival-___styles__info___3zWMZ"};

/***/ }),
/* 204 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-game-___styles__btn-app___yz5Ky","focus":"app-views-game-___styles__focus___3ExA7","disabled":"app-views-game-___styles__disabled___iHUcL","active":"app-views-game-___styles__active___2WdWy","show":"app-views-game-___styles__show___qMRRJ","dropdown-toggle":"app-views-game-___styles__dropdown-toggle___2ytMt","btn-neutral-app":"app-views-game-___styles__btn-neutral-app___3GvR-","game-container":"app-views-game-___styles__game-container___385bv","babyname-container":"app-views-game-___styles__babyname-container___13-L0","name":"app-views-game-___styles__name___30Dmj","char":"app-views-game-___styles__char___1qZfP","ko":"app-views-game-___styles__ko___2nNMV","charset":"app-views-game-___styles__charset___30Tyi","ok":"app-views-game-___styles__ok___1M6V_","content":"app-views-game-___styles__content___3Zv_D"};

/***/ }),
/* 205 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-gift-___styles__btn-app___2HNJ2","focus":"app-views-gift-___styles__focus___3mAcL","disabled":"app-views-gift-___styles__disabled___3bovR","active":"app-views-gift-___styles__active___2irHJ","show":"app-views-gift-___styles__show___287sa","dropdown-toggle":"app-views-gift-___styles__dropdown-toggle___L_Dy0","btn-neutral-app":"app-views-gift-___styles__btn-neutral-app___2ifb_"};

/***/ }),
/* 206 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-souvenir-___styles__btn-app___3-z28","focus":"app-views-souvenir-___styles__focus___1JLyu","disabled":"app-views-souvenir-___styles__disabled___Y94FF","active":"app-views-souvenir-___styles__active___2QF_j","show":"app-views-souvenir-___styles__show___CN4Qd","dropdown-toggle":"app-views-souvenir-___styles__dropdown-toggle___2bqEU","btn-neutral-app":"app-views-souvenir-___styles__btn-neutral-app___JJ0Or"};

/***/ }),
/* 207 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-trip-___styles__btn-app___2JlG0","focus":"app-views-trip-___styles__focus___16w9Q","disabled":"app-views-trip-___styles__disabled___2-2rP","active":"app-views-trip-___styles__active___3PufI","show":"app-views-trip-___styles__show___30A0k","dropdown-toggle":"app-views-trip-___styles__dropdown-toggle___5fNgK","btn-neutral-app":"app-views-trip-___styles__btn-neutral-app___yvrSo","trip-container":"app-views-trip-___styles__trip-container___3D_br","trip-view":"app-views-trip-___styles__trip-view___3NQzz","trip-events":"app-views-trip-___styles__trip-events___1A7Em","clockwise":"app-views-trip-___styles__clockwise___iH__3","donut-rotate":"app-views-trip-___styles__donut-rotate___6GL7u"};

/***/ }),
/* 208 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-visitorbook-form-___styles__btn-app___JBL49","focus":"app-views-visitorbook-form-___styles__focus___-9OY4","disabled":"app-views-visitorbook-form-___styles__disabled___3k8z_","active":"app-views-visitorbook-form-___styles__active___2Ce04","show":"app-views-visitorbook-form-___styles__show___1F5Go","dropdown-toggle":"app-views-visitorbook-form-___styles__dropdown-toggle___jrON0","btn-neutral-app":"app-views-visitorbook-form-___styles__btn-neutral-app___K29Sr","visitorbook-form":"app-views-visitorbook-form-___styles__visitorbook-form___K-MLR","upload-img":"app-views-visitorbook-form-___styles__upload-img___2iEhz","upload-desc":"app-views-visitorbook-form-___styles__upload-desc___39LNW","actions":"app-views-visitorbook-form-___styles__actions___2xzXj"};

/***/ }),
/* 209 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-visitorbook-___styles__btn-app___21Ppf","focus":"app-views-visitorbook-___styles__focus___XdgE0","disabled":"app-views-visitorbook-___styles__disabled___2lPvr","active":"app-views-visitorbook-___styles__active___2aFW1","show":"app-views-visitorbook-___styles__show___2_VVE","dropdown-toggle":"app-views-visitorbook-___styles__dropdown-toggle___3PFuL","btn-neutral-app":"app-views-visitorbook-___styles__btn-neutral-app___3u75J","visitorbook-container":"app-views-visitorbook-___styles__visitorbook-container___28s1y","visitorbook-view":"app-views-visitorbook-___styles__visitorbook-view___3kAUl","visitorbook-msgs":"app-views-visitorbook-___styles__visitorbook-msgs___2xayO"};

/***/ }),
/* 210 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"btn-app":"app-views-welcome-___styles__btn-app___1deCT","focus":"app-views-welcome-___styles__focus___1Dn5H","disabled":"app-views-welcome-___styles__disabled___2QyCW","active":"app-views-welcome-___styles__active___83Iin","show":"app-views-welcome-___styles__show___24RLk","dropdown-toggle":"app-views-welcome-___styles__dropdown-toggle___3qCcK","btn-neutral-app":"app-views-welcome-___styles__btn-neutral-app___1zrGK","welcome-container":"app-views-welcome-___styles__welcome-container___3AUkM"};

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = __webpack_require__(213);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _CSSTransitionGroupChild = __webpack_require__(212);

var _CSSTransitionGroupChild2 = _interopRequireDefault(_CSSTransitionGroupChild);

var _PropTypes = __webpack_require__(96);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  transitionName: _PropTypes.nameShape.isRequired,

  transitionAppear: _propTypes2.default.bool,
  transitionEnter: _propTypes2.default.bool,
  transitionLeave: _propTypes2.default.bool,
  transitionAppearTimeout: (0, _PropTypes.transitionTimeout)('Appear'),
  transitionEnterTimeout: (0, _PropTypes.transitionTimeout)('Enter'),
  transitionLeaveTimeout: (0, _PropTypes.transitionTimeout)('Leave')
};

var defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true
};

var CSSTransitionGroup = function (_React$Component) {
  _inherits(CSSTransitionGroup, _React$Component);

  function CSSTransitionGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function (child) {
      return _react2.default.createElement(_CSSTransitionGroupChild2.default, {
        name: _this.props.transitionName,
        appear: _this.props.transitionAppear,
        enter: _this.props.transitionEnter,
        leave: _this.props.transitionLeave,
        appearTimeout: _this.props.transitionAppearTimeout,
        enterTimeout: _this.props.transitionEnterTimeout,
        leaveTimeout: _this.props.transitionLeaveTimeout
      }, child);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // We need to provide this childFactory so that
  // ReactCSSTransitionGroupChild can receive updates to name, enter, and
  // leave while it is leaving.


  CSSTransitionGroup.prototype.render = function render() {
    return _react2.default.createElement(_TransitionGroup2.default, _extends({}, this.props, { childFactory: this._wrapChild }));
  };

  return CSSTransitionGroup;
}(_react2.default.Component);

CSSTransitionGroup.displayName = 'CSSTransitionGroup';


CSSTransitionGroup.propTypes = propTypes;
CSSTransitionGroup.defaultProps = defaultProps;

exports.default = CSSTransitionGroup;
module.exports = exports['default'];

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _addClass = __webpack_require__(189);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(191);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _requestAnimationFrame = __webpack_require__(193);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _properties = __webpack_require__(192);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(69);

var _PropTypes = __webpack_require__(96);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var events = [];
if (_properties.transitionEnd) events.push(_properties.transitionEnd);
if (_properties.animationEnd) events.push(_properties.animationEnd);

function addEndListener(node, listener) {
  if (events.length) {
    events.forEach(function (e) {
      return node.addEventListener(e, listener, false);
    });
  } else {
    setTimeout(listener, 0);
  }

  return function () {
    if (!events.length) return;
    events.forEach(function (e) {
      return node.removeEventListener(e, listener, false);
    });
  };
}

var propTypes = {
  children: _propTypes2.default.node,
  name: _PropTypes.nameShape.isRequired,

  // Once we require timeouts to be specified, we can remove the
  // boolean flags (appear etc.) and just accept a number
  // or a bool for the timeout flags (appearTimeout etc.)
  appear: _propTypes2.default.bool,
  enter: _propTypes2.default.bool,
  leave: _propTypes2.default.bool,
  appearTimeout: _propTypes2.default.number,
  enterTimeout: _propTypes2.default.number,
  leaveTimeout: _propTypes2.default.number
};

var CSSTransitionGroupChild = function (_React$Component) {
  _inherits(CSSTransitionGroupChild, _React$Component);

  function CSSTransitionGroupChild() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroupChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillAppear = function (done) {
      if (_this.props.appear) {
        _this.transition('appear', done, _this.props.appearTimeout);
      } else {
        done();
      }
    }, _this.componentWillEnter = function (done) {
      if (_this.props.enter) {
        _this.transition('enter', done, _this.props.enterTimeout);
      } else {
        done();
      }
    }, _this.componentWillLeave = function (done) {
      if (_this.props.leave) {
        _this.transition('leave', done, _this.props.leaveTimeout);
      } else {
        done();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
  };

  CSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function (timeout) {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  };

  CSSTransitionGroupChild.prototype.transition = function transition(animationType, finishCallback, timeout) {
    var node = (0, _reactDom.findDOMNode)(this);

    if (!node) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timer = null;
    var removeListeners = void 0;

    (0, _addClass2.default)(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClassAndNode(activeClassName, node);

    // Clean-up the animation after the specified delay
    var finish = function finish(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timer);
      if (removeListeners) removeListeners();

      (0, _removeClass2.default)(node, className);
      (0, _removeClass2.default)(node, activeClassName);

      if (removeListeners) removeListeners();

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (timeout) {
      timer = setTimeout(finish, timeout);
      this.transitionTimeouts.push(timer);
    } else if (_properties.transitionEnd) {
      removeListeners = addEndListener(node, finish);
    }
  };

  CSSTransitionGroupChild.prototype.queueClassAndNode = function queueClassAndNode(className, node) {
    var _this2 = this;

    this.classNameAndNodeQueue.push({
      className: className,
      node: node
    });

    if (!this.rafHandle) {
      this.rafHandle = (0, _requestAnimationFrame2.default)(function () {
        return _this2.flushClassNameAndNodeQueue();
      });
    }
  };

  CSSTransitionGroupChild.prototype.flushClassNameAndNodeQueue = function flushClassNameAndNodeQueue() {
    if (!this.unmounted) {
      this.classNameAndNodeQueue.forEach(function (obj) {
        // This is for to force a repaint,
        // which is necessary in order to transition styles when adding a class name.
        /* eslint-disable no-unused-expressions */
        obj.node.scrollTop;
        /* eslint-enable no-unused-expressions */
        (0, _addClass2.default)(obj.node, obj.className);
      });
    }
    this.classNameAndNodeQueue.length = 0;
    this.rafHandle = null;
  };

  CSSTransitionGroupChild.prototype.render = function render() {
    var props = _extends({}, this.props);
    delete props.name;
    delete props.appear;
    delete props.enter;
    delete props.leave;
    delete props.appearTimeout;
    delete props.enterTimeout;
    delete props.leaveTimeout;
    delete props.children;
    return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), props);
  };

  return CSSTransitionGroupChild;
}(_react2.default.Component);

CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';


CSSTransitionGroupChild.propTypes = propTypes;

exports.default = CSSTransitionGroupChild;
module.exports = exports['default'];

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chainFunction = __webpack_require__(234);

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(238);

var _warning2 = _interopRequireDefault(_warning);

var _ChildMapping = __webpack_require__(214);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key) {
      _this.currentlyTransitioningKeys[key] = true;

      var component = _this.childRefs[key];

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key));
      } else {
        _this._handleDoneAppearing(key);
      }
    };

    _this._handleDoneAppearing = function (key) {
      var component = _this.childRefs[key];
      if (component && component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key);
      }
    };

    _this.performEnter = function (key) {
      _this.currentlyTransitioningKeys[key] = true;

      var component = _this.childRefs[key];

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key));
      } else {
        _this._handleDoneEntering(key);
      }
    };

    _this._handleDoneEntering = function (key) {
      var component = _this.childRefs[key];
      if (component && component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key);
      }
    };

    _this.performLeave = function (key) {
      _this.currentlyTransitioningKeys[key] = true;

      var component = _this.childRefs[key];
      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key);
      }
    };

    _this._handleDoneLeaving = function (key) {
      var component = _this.childRefs[key];

      if (component && component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.performEnter(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(this.performEnter);

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);
  };

  TransitionGroup.prototype.render = function render() {
    var _this2 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this2.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this2.props.childFactory(child);
        var ref = function ref(r) {
          _this2.childRefs[key] = r;
        };

         false ? (0, _warning2.default)(isCallbackRef, 'string refs are not supported on children of TransitionGroup and will be ignored. ' + 'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute') : void 0;

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes = propTypes;
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(0);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSTransitionGroup = __webpack_require__(211);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FirstChild = function FirstChild(_ref) {
  var children = _ref.children;
  return _react2.default.Children.toArray(children)[0] || null;
};

var propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object,
  color: _propTypes2.default.string,
  isOpen: _propTypes2.default.bool,
  toggle: _propTypes2.default.func,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  transitionAppearTimeout: _propTypes2.default.number,
  transitionEnterTimeout: _propTypes2.default.number,
  transitionLeaveTimeout: _propTypes2.default.number
};

var defaultProps = {
  color: 'success',
  isOpen: true,
  tag: 'div',
  transitionAppearTimeout: 150,
  transitionEnterTimeout: 150,
  transitionLeaveTimeout: 150
};

var Alert = function Alert(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      color = props.color,
      isOpen = props.isOpen,
      toggle = props.toggle,
      children = props.children,
      transitionAppearTimeout = props.transitionAppearTimeout,
      transitionEnterTimeout = props.transitionEnterTimeout,
      transitionLeaveTimeout = props.transitionLeaveTimeout,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'tag', 'color', 'isOpen', 'toggle', 'children', 'transitionAppearTimeout', 'transitionEnterTimeout', 'transitionLeaveTimeout']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'alert', 'alert-' + color, { 'alert-dismissible': toggle }), cssModule);

  var alert = _react2.default.createElement(
    Tag,
    _extends({}, attributes, { className: classes, role: 'alert' }),
    toggle ? _react2.default.createElement(
      'button',
      { type: 'button', className: 'close', 'aria-label': 'Close', onClick: toggle },
      _react2.default.createElement(
        'span',
        { 'aria-hidden': 'true' },
        '\xD7'
      )
    ) : null,
    children
  );

  return _react2.default.createElement(
    _CSSTransitionGroup2.default,
    {
      component: FirstChild,
      transitionName: {
        appear: 'fade',
        appearActive: 'show',
        enter: 'fade',
        enterActive: 'show',
        leave: 'fade',
        leaveActive: 'out'
      },
      transitionAppear: transitionAppearTimeout > 0,
      transitionAppearTimeout: transitionAppearTimeout,
      transitionEnter: transitionEnterTimeout > 0,
      transitionEnterTimeout: transitionEnterTimeout,
      transitionLeave: transitionLeaveTimeout > 0,
      transitionLeaveTimeout: transitionLeaveTimeout
    },
    isOpen ? alert : null
  );
};

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

exports.default = Alert;

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dropdown = __webpack_require__(218);

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  children: _propTypes2.default.node
};

var ButtonDropdown = function ButtonDropdown(props) {
  return _react2.default.createElement(_Dropdown2.default, _extends({ group: true }, props));
};

ButtonDropdown.propTypes = propTypes;

exports.default = ButtonDropdown;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = __webpack_require__(97);

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SHOW = 'SHOW';
var SHOWN = 'SHOWN';
var HIDE = 'HIDE';
var HIDDEN = 'HIDDEN';

var propTypes = {
  isOpen: _propTypes2.default.bool,
  className: _propTypes2.default.node,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  cssModule: _propTypes2.default.object,
  navbar: _propTypes2.default.bool,
  delay: _propTypes2.default.oneOfType([_propTypes2.default.shape({ show: _propTypes2.default.number, hide: _propTypes2.default.number }), _propTypes2.default.number]),
  onOpened: _propTypes2.default.func,
  onClosed: _propTypes2.default.func
};

var DEFAULT_DELAYS = {
  show: 350,
  hide: 350
};

var defaultProps = {
  isOpen: false,
  tag: 'div',
  delay: DEFAULT_DELAYS,
  onOpened: function onOpened() {},
  onClosed: function onClosed() {}
};

var Collapse = function (_Component) {
  _inherits(Collapse, _Component);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    _this.state = {
      collapse: props.isOpen ? SHOWN : HIDDEN,
      height: null
    };
    _this.element = null;
    return _this;
  }

  _createClass(Collapse, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var willOpen = nextProps.isOpen;
      var collapse = this.state.collapse;

      if (willOpen && collapse === HIDDEN) {
        // will open
        this.setState({ collapse: SHOW }, function () {
          // the height transition will work after class "collapsing" applied
          _this2.setState({ height: _this2.getHeight() });
          _this2.transitionTag = setTimeout(function () {
            _this2.setState({
              collapse: SHOWN,
              height: null
            });
          }, _this2.getDelay('show'));
        });
      } else if (!willOpen && collapse === SHOWN) {
        // will hide
        this.setState({ height: this.getHeight() }, function () {
          _this2.setState({
            collapse: HIDE,
            height: _this2.getHeight()
          }, function () {
            _this2.setState({ height: 0 });
          });
        });

        this.transitionTag = setTimeout(function () {
          _this2.setState({
            collapse: HIDDEN,
            height: null
          });
        }, this.getDelay('hide'));
      }
      // else: do nothing.
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.collapse === SHOWN && prevState && prevState.collapse !== SHOWN) {
        this.props.onOpened();
      }

      if (this.state.collapse === HIDDEN && prevState && prevState.collapse !== HIDDEN) {
        this.props.onClosed();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.transitionTag);
    }
  }, {
    key: 'getDelay',
    value: function getDelay(key) {
      var delay = this.props.delay;

      if ((typeof delay === 'undefined' ? 'undefined' : _typeof(delay)) === 'object') {
        return isNaN(delay[key]) ? DEFAULT_DELAYS[key] : delay[key];
      }
      return delay;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.element.scrollHeight;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _omit = (0, _lodash2.default)(this.props, ['isOpen', 'delay', 'onOpened', 'onClosed']),
          navbar = _omit.navbar,
          className = _omit.className,
          cssModule = _omit.cssModule,
          Tag = _omit.tag,
          attributes = _objectWithoutProperties(_omit, ['navbar', 'className', 'cssModule', 'tag']);

      var _state = this.state,
          collapse = _state.collapse,
          height = _state.height;

      var collapseClass = void 0;
      switch (collapse) {
        case SHOW:
          collapseClass = 'collapsing';
          break;
        case SHOWN:
          collapseClass = 'collapse show';
          break;
        case HIDE:
          collapseClass = 'collapsing';
          break;
        case HIDDEN:
          collapseClass = 'collapse';
          break;
        default:
          // HIDDEN
          collapseClass = 'collapse';
      }

      var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, collapseClass, navbar && 'navbar-collapse'), cssModule);
      var style = height === null ? null : { height: height };
      return _react2.default.createElement(Tag, _extends({}, attributes, {
        style: _extends({}, attributes.style, style),
        className: classes,
        ref: function ref(c) {
          _this3.element = c;
        }
      }));
    }
  }]);

  return Collapse;
}(_react.Component);

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;
exports.default = Collapse;

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(69);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = __webpack_require__(97);

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = __webpack_require__(8);

var _TetherContent = __webpack_require__(232);

var _TetherContent2 = _interopRequireDefault(_TetherContent);

var _DropdownMenu = __webpack_require__(219);

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-find-dom-node: 0 */
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md

var propTypes = {
  disabled: _propTypes2.default.bool,
  dropup: _propTypes2.default.bool,
  group: _propTypes2.default.bool,
  isOpen: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  tag: _propTypes2.default.string,
  tether: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
  toggle: _propTypes2.default.func,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  isOpen: false,
  tag: 'div'
};

var childContextTypes = {
  toggle: _propTypes2.default.func.isRequired,
  isOpen: _propTypes2.default.bool.isRequired
};

var defaultTetherConfig = {
  classPrefix: 'bs-tether',
  classes: { element: 'dropdown', enabled: 'show' },
  constraints: [{ to: 'scrollParent', attachment: 'together none' }, { to: 'window', attachment: 'together none' }]
};

var Dropdown = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.addEvents = _this.addEvents.bind(_this);
    _this.getTetherConfig = _this.getTetherConfig.bind(_this);
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.removeEvents = _this.removeEvents.bind(_this);
    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        toggle: this.props.toggle,
        isOpen: this.props.isOpen
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleProps();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.handleProps();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeEvents();
    }
  }, {
    key: 'getTetherTarget',
    value: function getTetherTarget() {
      var container = _reactDom2.default.findDOMNode(this);

      return container.querySelector('[data-toggle="dropdown"]');
    }
  }, {
    key: 'getTetherConfig',
    value: function getTetherConfig(childProps) {
      var _this2 = this;

      var target = function target() {
        return _this2.getTetherTarget();
      };
      var vElementAttach = 'top';
      var hElementAttach = 'left';
      var vTargetAttach = 'bottom';
      var hTargetAttach = 'left';

      if (childProps.right) {
        hElementAttach = 'right';
        hTargetAttach = 'right';
      }

      if (this.props.dropup) {
        vElementAttach = 'bottom';
        vTargetAttach = 'top';
      }

      return _extends({}, defaultTetherConfig, {
        attachment: vElementAttach + ' ' + hElementAttach,
        targetAttachment: vTargetAttach + ' ' + hTargetAttach,
        target: target
      }, this.props.tether);
    }
  }, {
    key: 'addEvents',
    value: function addEvents() {
      document.addEventListener('click', this.handleDocumentClick, true);
    }
  }, {
    key: 'removeEvents',
    value: function removeEvents() {
      document.removeEventListener('click', this.handleDocumentClick, true);
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(e) {
      var container = _reactDom2.default.findDOMNode(this);

      if (container.contains(e.target) && container !== e.target) {
        return;
      }

      this.toggle();
    }
  }, {
    key: 'handleProps',
    value: function handleProps() {
      if (this.props.tether) {
        return;
      }

      if (this.props.isOpen) {
        this.addEvents();
      } else {
        this.removeEvents();
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle();
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this3 = this;

      var _props = this.props,
          tether = _props.tether,
          children = _props.children,
          attrs = _objectWithoutProperties(_props, ['tether', 'children']);

      attrs.toggle = this.toggle;

      return _react2.default.Children.map(_react2.default.Children.toArray(children), function (child) {
        if (tether && child.type === _DropdownMenu2.default) {
          var tetherConfig = _this3.getTetherConfig(child.props);
          return _react2.default.createElement(
            _TetherContent2.default,
            _extends({}, attrs, { tether: tetherConfig }),
            child
          );
        }

        return child;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _omit = (0, _lodash2.default)(this.props, ['toggle', 'tether']),
          className = _omit.className,
          cssModule = _omit.cssModule,
          dropup = _omit.dropup,
          group = _omit.group,
          size = _omit.size,
          Tag = _omit.tag,
          isOpen = _omit.isOpen,
          attributes = _objectWithoutProperties(_omit, ['className', 'cssModule', 'dropup', 'group', 'size', 'tag', 'isOpen']);

      var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, (_classNames = {
        'btn-group': group
      }, _defineProperty(_classNames, 'btn-group-' + size, !!size), _defineProperty(_classNames, 'dropdown', !group), _defineProperty(_classNames, 'show', isOpen), _defineProperty(_classNames, 'dropup', dropup), _classNames)), cssModule);

      return _react2.default.createElement(
        Tag,
        _extends({}, attributes, {
          className: classes
        }),
        this.renderChildren()
      );
    }
  }]);

  return Dropdown;
}(_react2.default.Component);

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
Dropdown.childContextTypes = childContextTypes;

exports.default = Dropdown;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  children: _propTypes2.default.node.isRequired,
  right: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'div'
};

var contextTypes = {
  isOpen: _propTypes2.default.bool.isRequired
};

var DropdownMenu = function DropdownMenu(props, context) {
  var className = props.className,
      cssModule = props.cssModule,
      right = props.right,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'right', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'dropdown-menu', { 'dropdown-menu-right': right }), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { tabIndex: '-1', 'aria-hidden': !context.isOpen, role: 'menu', className: classes }));
};

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;
DropdownMenu.contextTypes = contextTypes;

exports.default = DropdownMenu;

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

var _Button = __webpack_require__(34);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  caret: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  'data-toggle': _propTypes2.default.string,
  'aria-haspopup': _propTypes2.default.bool,
  split: _propTypes2.default.bool,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  nav: _propTypes2.default.bool
};

var defaultProps = {
  'data-toggle': 'dropdown',
  'aria-haspopup': true,
  color: 'secondary'
};

var contextTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  toggle: _propTypes2.default.func.isRequired
};

var DropdownToggle = function (_React$Component) {
  _inherits(DropdownToggle, _React$Component);

  function DropdownToggle(props) {
    _classCallCheck(this, DropdownToggle);

    var _this = _possibleConstructorReturn(this, (DropdownToggle.__proto__ || Object.getPrototypeOf(DropdownToggle)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(DropdownToggle, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.nav && !this.props.tag) {
        e.preventDefault();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }

      this.context.toggle();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          cssModule = _props.cssModule,
          caret = _props.caret,
          split = _props.split,
          nav = _props.nav,
          tag = _props.tag,
          props = _objectWithoutProperties(_props, ['className', 'cssModule', 'caret', 'split', 'nav', 'tag']);

      var ariaLabel = props['aria-label'] || 'Toggle Dropdown';
      var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, {
        'dropdown-toggle': caret || split,
        'dropdown-toggle-split': split,
        active: this.context.isOpen,
        'nav-link': nav
      }), cssModule);
      var children = props.children || _react2.default.createElement(
        'span',
        { className: 'sr-only' },
        ariaLabel
      );

      var Tag = void 0;

      if (nav && !tag) {
        Tag = 'a';
        props.href = '#';
      } else if (!tag) {
        Tag = _Button2.default;
      } else {
        Tag = tag;
      }

      return _react2.default.createElement(Tag, _extends({}, props, {
        className: classes,
        onClick: this.onClick,
        'aria-haspopup': 'true',
        'aria-expanded': this.context.isOpen,
        children: children
      }));
    }
  }]);

  return DropdownToggle;
}(_react2.default.Component);

DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;
DropdownToggle.contextTypes = contextTypes;

exports.default = DropdownToggle;

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  children: _propTypes2.default.node,
  inline: _propTypes2.default.bool,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  getRef: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'form'
};

var Form = function Form(props) {
  var className = props.className,
      cssModule = props.cssModule,
      inline = props.inline,
      Tag = props.tag,
      getRef = props.getRef,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'inline', 'tag', 'getRef']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, inline ? 'form-inline' : false), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { ref: getRef, className: classes }));
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

exports.default = Form;

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  children: _propTypes2.default.node,
  tag: _propTypes2.default.string,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'div'
};

var FormFeedback = function FormFeedback(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'form-control-feedback'), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

FormFeedback.propTypes = propTypes;
FormFeedback.defaultProps = defaultProps;

exports.default = FormFeedback;

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  children: _propTypes2.default.node,
  row: _propTypes2.default.bool,
  check: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  tag: _propTypes2.default.string,
  color: _propTypes2.default.string,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'div'
};

var FormGroup = function FormGroup(props) {
  var className = props.className,
      cssModule = props.cssModule,
      row = props.row,
      disabled = props.disabled,
      color = props.color,
      check = props.check,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'row', 'disabled', 'color', 'check', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, color ? 'has-' + color : false, row ? 'row' : false, check ? 'form-check' : 'form-group', check && disabled ? 'disabled' : false), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;

exports.default = FormGroup;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prefer-stateless-function: 0 */

var propTypes = {
  children: _propTypes2.default.node,
  type: _propTypes2.default.string,
  size: _propTypes2.default.string,
  state: _propTypes2.default.string,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  getRef: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  static: _propTypes2.default.bool,
  addon: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'p',
  type: 'text'
};

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          cssModule = _props.cssModule,
          type = _props.type,
          size = _props.size,
          state = _props.state,
          tag = _props.tag,
          addon = _props.addon,
          staticInput = _props.static,
          getRef = _props.getRef,
          attributes = _objectWithoutProperties(_props, ['className', 'cssModule', 'type', 'size', 'state', 'tag', 'addon', 'static', 'getRef']);

      var checkInput = ['radio', 'checkbox'].indexOf(type) > -1;

      var fileInput = type === 'file';
      var textareaInput = type === 'textarea';
      var selectInput = type === 'select';
      var Tag = selectInput || textareaInput ? type : 'input';

      var formControlClass = 'form-control';

      if (staticInput) {
        formControlClass = formControlClass + '-static';
        Tag = tag;
      } else if (fileInput) {
        formControlClass = formControlClass + '-file';
      } else if (checkInput) {
        if (addon) {
          formControlClass = null;
        } else {
          formControlClass = 'form-check-input';
        }
      }

      var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, state ? 'form-control-' + state : false, size ? 'form-control-' + size : false, formControlClass), cssModule);

      if (Tag === 'input') {
        attributes.type = type;
      }

      return _react2.default.createElement(Tag, _extends({}, attributes, { ref: getRef, className: classes }));
    }
  }]);

  return Input;
}(_react2.default.Component);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

exports.default = Input;

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

var stringOrNumberProp = _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]);

var columnProps = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.shape({
  size: stringOrNumberProp,
  push: stringOrNumberProp,
  pull: stringOrNumberProp,
  offset: stringOrNumberProp
})]);

var propTypes = {
  children: _propTypes2.default.node,
  hidden: _propTypes2.default.bool,
  check: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  for: _propTypes2.default.string,
  tag: _propTypes2.default.string,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object,
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps
};

var defaultProps = {
  tag: 'label'
};

var Label = function Label(props) {
  var className = props.className,
      cssModule = props.cssModule,
      hidden = props.hidden,
      Tag = props.tag,
      check = props.check,
      inline = props.inline,
      disabled = props.disabled,
      size = props.size,
      htmlFor = props.for,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'hidden', 'tag', 'check', 'inline', 'disabled', 'size', 'for']);

  var colClasses = [];

  colSizes.forEach(function (colSize) {
    var columnProp = props[colSize];
    delete attributes[colSize];

    if (columnProp && columnProp.size) {
      var _classNames;

      colClasses.push((0, _utils.mapToCssModules)((0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, 'col-' + colSize + '-' + columnProp.size, columnProp.size), _defineProperty(_classNames, 'push-' + colSize + '-' + columnProp.push, columnProp.push), _defineProperty(_classNames, 'pull-' + colSize + '-' + columnProp.pull, columnProp.pull), _defineProperty(_classNames, 'offset-' + colSize + '-' + columnProp.offset, columnProp.offset), _classNames))), cssModule);
    } else if (columnProp) {
      colClasses.push('col-' + colSize + '-' + columnProp);
    }
  });

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, hidden ? 'sr-only' : false, check ? 'form-check-' + (inline ? 'inline' : 'label') : false, check && inline && disabled ? 'disabled' : false, size ? 'col-form-label-' + size : false, colClasses, colClasses.length ? 'col-form-label' : false), cssModule);

  return _react2.default.createElement(Tag, _extends({ htmlFor: htmlFor }, attributes, { className: classes }));
};

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

exports.default = Label;

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  tabs: _propTypes2.default.bool,
  pills: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool,
  navbar: _propTypes2.default.bool,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'ul'
};

var Nav = function Nav(props) {
  var className = props.className,
      cssModule = props.cssModule,
      tabs = props.tabs,
      pills = props.pills,
      vertical = props.vertical,
      navbar = props.navbar,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'tabs', 'pills', 'vertical', 'navbar', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, navbar ? 'navbar-nav' : 'nav', {
    'nav-tabs': tabs,
    'nav-pills': pills,
    'flex-column': vertical
  }), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

exports.default = Nav;

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'li'
};

var NavItem = function NavItem(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'nav-item'), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

exports.default = NavItem;

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  getRef: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  disabled: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object,
  onClick: _propTypes2.default.func,
  href: _propTypes2.default.any
};

var defaultProps = {
  tag: 'a'
};

var NavLink = function (_React$Component) {
  _inherits(NavLink, _React$Component);

  function NavLink(props) {
    _classCallCheck(this, NavLink);

    var _this = _possibleConstructorReturn(this, (NavLink.__proto__ || Object.getPrototypeOf(NavLink)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(NavLink, [{
    key: 'onClick',
    value: function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.href === '#') {
        e.preventDefault();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          cssModule = _props.cssModule,
          active = _props.active,
          Tag = _props.tag,
          getRef = _props.getRef,
          attributes = _objectWithoutProperties(_props, ['className', 'cssModule', 'active', 'tag', 'getRef']);

      var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'nav-link', {
        disabled: attributes.disabled,
        active: active
      }), cssModule);

      return _react2.default.createElement(Tag, _extends({}, attributes, { ref: getRef, onClick: this.onClick, className: classes }));
    }
  }]);

  return NavLink;
}(_react2.default.Component);

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

exports.default = NavLink;

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  light: _propTypes2.default.bool,
  inverse: _propTypes2.default.bool,
  full: _propTypes2.default.bool,
  fixed: _propTypes2.default.string,
  sticky: _propTypes2.default.string,
  color: _propTypes2.default.string,
  role: _propTypes2.default.string,
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object,
  toggleable: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string])
};

var defaultProps = {
  tag: 'nav',
  role: 'navigation',
  toggleable: false
};

var getToggleableClass = function getToggleableClass(toggleable) {
  if (toggleable === false) {
    return false;
  } else if (toggleable === true || toggleable === 'xs') {
    return 'navbar-toggleable';
  }

  return 'navbar-toggleable-' + toggleable;
};

var Navbar = function Navbar(props) {
  var _classNames;

  var toggleable = props.toggleable,
      className = props.className,
      cssModule = props.cssModule,
      light = props.light,
      inverse = props.inverse,
      full = props.full,
      fixed = props.fixed,
      sticky = props.sticky,
      color = props.color,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['toggleable', 'className', 'cssModule', 'light', 'inverse', 'full', 'fixed', 'sticky', 'color', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'navbar', getToggleableClass(toggleable), (_classNames = {
    'navbar-light': light,
    'navbar-inverse': inverse
  }, _defineProperty(_classNames, 'bg-' + color, color), _defineProperty(_classNames, 'navbar-full', full), _defineProperty(_classNames, 'fixed-' + fixed, fixed), _defineProperty(_classNames, 'sticky-' + sticky, sticky), _classNames)), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

exports.default = Navbar;

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'a'
};

var NavbarBrand = function NavbarBrand(props) {
  var className = props.className,
      cssModule = props.cssModule,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['className', 'cssModule', 'tag']);

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'navbar-brand'), cssModule);

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: classes }));
};

NavbarBrand.propTypes = propTypes;
NavbarBrand.defaultProps = defaultProps;

exports.default = NavbarBrand;

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = __webpack_require__(236);

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  children: _propTypes2.default.node,
  bar: _propTypes2.default.bool,
  multi: _propTypes2.default.bool,
  tag: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  max: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  animated: _propTypes2.default.bool,
  striped: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  className: _propTypes2.default.string,
  barClassName: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  tag: 'div',
  value: 0,
  max: 100
};

var Progress = function Progress(props) {
  var children = props.children,
      className = props.className,
      barClassName = props.barClassName,
      cssModule = props.cssModule,
      value = props.value,
      max = props.max,
      animated = props.animated,
      striped = props.striped,
      color = props.color,
      bar = props.bar,
      multi = props.multi,
      Tag = props.tag,
      attributes = _objectWithoutProperties(props, ['children', 'className', 'barClassName', 'cssModule', 'value', 'max', 'animated', 'striped', 'color', 'bar', 'multi', 'tag']);

  var percent = (0, _lodash2.default)(value) / (0, _lodash2.default)(max) * 100;

  var progressClasses = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'progress'), cssModule);

  var progressBarClasses = (0, _utils.mapToCssModules)((0, _classnames2.default)('progress-bar', bar ? className || barClassName : barClassName, animated ? 'progress-bar-animated' : null, color ? 'bg-' + color : null, striped || animated ? 'progress-bar-striped' : null), cssModule);

  var ProgressBar = multi ? children : _react2.default.createElement('div', {
    className: progressBarClasses,
    style: { width: percent + '%' },
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': '0',
    'aria-valuemax': max,
    children: children
  });

  if (bar) {
    return ProgressBar;
  }

  return _react2.default.createElement(Tag, _extends({}, attributes, { className: progressClasses, children: ProgressBar }));
};

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

exports.default = Progress;

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(69);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = __webpack_require__(235);

var _lodash2 = _interopRequireDefault(_lodash);

var _reactstrapTether = __webpack_require__(237);

var _reactstrapTether2 = _interopRequireDefault(_reactstrapTether);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  arrow: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  isOpen: _propTypes2.default.bool.isRequired,
  toggle: _propTypes2.default.func.isRequired,
  tether: _propTypes2.default.object.isRequired,
  tetherRef: _propTypes2.default.func,
  style: _propTypes2.default.node,
  cssModule: _propTypes2.default.object
};

var defaultProps = {
  isOpen: false,
  tetherRef: function tetherRef() {}
};

var TetherContent = function (_React$Component) {
  _inherits(TetherContent, _React$Component);

  function TetherContent(props) {
    _classCallCheck(this, TetherContent);

    var _this = _possibleConstructorReturn(this, (TetherContent.__proto__ || Object.getPrototypeOf(TetherContent)).call(this, props));

    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  _createClass(TetherContent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleProps();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.handleProps();
      } else if (this._element) {
        // rerender
        this.renderIntoSubtree();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.hide();
    }
  }, {
    key: 'getTarget',
    value: function getTarget() {
      var target = this.props.tether.target;

      if ((0, _lodash2.default)(target)) {
        return target();
      }

      return target;
    }
  }, {
    key: 'getTetherConfig',
    value: function getTetherConfig() {
      var config = _extends({}, this.props.tether);

      config.element = this._element;
      config.target = this.getTarget();
      return config;
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(e) {
      var container = this._element;
      if (e.target === container || !container.contains(e.target)) {
        this.toggle();
      }
    }
  }, {
    key: 'handleProps',
    value: function handleProps() {
      if (this.props.isOpen) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      document.removeEventListener('click', this.handleDocumentClick, true);

      if (this._element) {
        document.body.removeChild(this._element);
        _reactDom2.default.unmountComponentAtNode(this._element);
        this._element = null;
      }

      if (this._tether) {
        this._tether.destroy();
        this._tether = null;
        this.props.tetherRef(this._tether);
      }
    }
  }, {
    key: 'show',
    value: function show() {
      document.addEventListener('click', this.handleDocumentClick, true);

      this._element = document.createElement('div');
      this._element.className = this.props.className;
      document.body.appendChild(this._element);
      this.renderIntoSubtree();
      this._tether = new _reactstrapTether2.default(this.getTetherConfig());
      this.props.tetherRef(this._tether);
      this._tether.position();
      this._element.childNodes[0].focus();
    }
  }, {
    key: 'toggle',
    value: function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle();
    }
  }, {
    key: 'renderIntoSubtree',
    value: function renderIntoSubtree() {
      _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.renderChildren(), this._element);
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _props = this.props,
          children = _props.children,
          style = _props.style;

      return _react2.default.cloneElement(children, { style: style });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return TetherContent;
}(_react2.default.Component);

TetherContent.propTypes = propTypes;
TetherContent.defaultProps = defaultProps;

exports.default = TetherContent;

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "58853a471180fe35f6b90660d2e6e8cd.png";

/***/ }),
/* 234 */
/***/ (function(module, exports) {

module.exports = require("chain-function");

/***/ }),
/* 235 */
/***/ (function(module, exports) {

module.exports = require("lodash.isfunction");

/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports = require("lodash.tonumber");

/***/ }),
/* 237 */
/***/ (function(module, exports) {

module.exports = require("reactstrap-tether");

/***/ }),
/* 238 */
/***/ (function(module, exports) {

module.exports = require("warning");

/***/ })
/******/ ]);