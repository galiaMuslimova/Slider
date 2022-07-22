/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./. sync recursive \\.js$":
/*!***********************!*\
  !*** ././ sync \.js$ ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./demo.js": "./demo.js",
	"./main/init.js": "./main/init.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./. sync recursive \\.js$";

/***/ }),

/***/ "./. sync recursive \\.scss$":
/*!*************************!*\
  !*** ././ sync \.scss$ ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./input/input.scss": "./input/input.scss",
	"./main/main.scss": "./main/main.scss",
	"./panel/panel.scss": "./panel/panel.scss",
	"./slider/slider.scss": "./slider/slider.scss"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./. sync recursive \\.scss$";

/***/ }),

/***/ "./input/Input.ts":
/*!************************!*\
  !*** ./input/Input.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_observer_Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/observer/Observer */ "../src/observer/Observer.ts");
/* harmony import */ var _input_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.scss */ "./input/input.scss");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Input = /*#__PURE__*/function () {
  function Input($root, key, value) {
    _classCallCheck(this, Input);

    this.$root = $root;
    this.value = value;
    this.name = key;
    this.type = typeof value === 'number' ? 'number' : 'checkbox';
    this.observer = new _src_observer_Observer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.setValue(this.value);
    this.bindEventListeners();
  }

  _createClass(Input, [{
    key: "setValue",
    value: function setValue(value) {
      this.value = value;

      if (typeof value === 'number') {
        this.$root.val(value);
      } else {
        this.$root.prop('checked', value);
      }
    }
  }, {
    key: "setProp",
    value: function setProp(name, value) {
      this.$root.prop(name, value);
    }
  }, {
    key: "setDisable",
    value: function setDisable(value) {
      this.$root.prop('disabled', !value);
    }
  }, {
    key: "bindEventListeners",
    value: function bindEventListeners() {
      this.$root.on('change keyup', this.handleInputValueChange.bind(this));
    }
  }, {
    key: "handleInputValueChange",
    value: function handleInputValueChange(event) {
      switch (this.type) {
        case 'number':
          this.value = event.target.value;
          break;

        case 'checkbox':
          this.value = event.target.checked;
          break;

        default:
          break;
      }

      var setting = _defineProperty({}, this.name, this.value);

      var isStepLowerZero = this.name === 'step' && this.value <= 0;

      if (this.value !== '' && !isStepLowerZero) {
        this.observer.notify('setting', setting);
      }
    }
  }]);

  return Input;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);

/***/ }),

/***/ "./main/Main.ts":
/*!**********************!*\
  !*** ./main/Main.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _slider_Slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slider/Slider */ "./slider/Slider.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Main = /*#__PURE__*/function () {
  function Main($element) {
    _classCallCheck(this, Main);

    this.$element = $element;
    this.sliders = [];
    this.init();
  }

  _createClass(Main, [{
    key: "init",
    value: function init() {
      var _this = this;

      var $sliders = this.$element.find('.js-main__slider__item');
      $sliders.each(function (index, item) {
        var slider = new _slider_Slider__WEBPACK_IMPORTED_MODULE_0__["default"]($(item));

        _this.sliders.push(slider);
      });
      this.sliders[0].displayValues(true);
    }
  }]);

  return Main;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);

/***/ }),

/***/ "./panel/Panel.ts":
/*!************************!*\
  !*** ./panel/Panel.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_observer_Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/observer/Observer */ "../src/observer/Observer.ts");
/* harmony import */ var _input_Input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../input/Input */ "./input/Input.ts");
/* harmony import */ var _panel_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panel.scss */ "./panel/panel.scss");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var Panel = /*#__PURE__*/function () {
  function Panel($root, options) {
    _classCallCheck(this, Panel);

    this.$root = $root;
    this.options = options;
    this.observer = new _src_observer_Observer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.$panel = $('<div>');
    this.inputs = {};
    this.initPanel(this.options);
    this.bindEventListeners();
  }

  _createClass(Panel, [{
    key: "setValue",
    value: function setValue(options) {
      var _this = this;

      Object.entries(options).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var input = _this.inputs[key];
        input.setValue(value);

        if (key === 'withRange') {
          _this.inputs.to.setDisable(value);
        }
      });
    }
  }, {
    key: "initPanel",
    value: function initPanel(options) {
      var _this2 = this;

      this.$panel = this.$root.find('.js-panel');
      var element = this;
      Object.entries(options).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        var searcher = "".concat(key);

        var $inputElement = _this2.$panel.find("[name=".concat(searcher, "]"));

        var input = new _input_Input__WEBPACK_IMPORTED_MODULE_1__["default"]($inputElement, key, value);
        input.observer.subscribe({
          key: 'setting',
          observer: element.changeOptions.bind(element)
        });
        _this2.inputs[key] = input;
      });
      this.setValue(options);
    }
  }, {
    key: "bindEventListeners",
    value: function bindEventListeners() {
      this.$panel.on('submit', Panel.handlePanelFormSubmit);
    }
  }, {
    key: "changeOptions",
    value: function changeOptions(options) {
      this.observer.notify('setting', options);
    }
  }], [{
    key: "handlePanelFormSubmit",
    value: function handlePanelFormSubmit() {
      return false;
    }
  }]);

  return Panel;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Panel);

/***/ }),

/***/ "./slider/Slider.ts":
/*!**************************!*\
  !*** ./slider/Slider.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/index */ "../src/index.ts");
/* harmony import */ var _panel_Panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../panel/Panel */ "./panel/Panel.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Slider = /*#__PURE__*/function () {
  function Slider($root) {
    _classCallCheck(this, Slider);

    this.$root = $root;
    this.$element = $('<div>');
    this.$sliderRootElement = $('<div>');
    this.slider = $('<div>');
    this.panel = null;
    this.isDisplayValues = false;
    this.init();
    this.initPanel();
  }

  _createClass(Slider, [{
    key: "displayValues",
    value: function displayValues(isDisplay) {
      this.isDisplayValues = isDisplay;
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.$element = this.$root.find('.js-slider');
      this.$sliderRootElement = this.$element.find('.js-slider__root');
      this.slider = this.$sliderRootElement.MetaSlider().MetaSlider('setOptions', {
        onChange: function onChange(options) {
          _this.showValues(options);
        }
      });
    }
  }, {
    key: "showValues",
    value: function showValues(options) {
      var _this$panel;

      var $sliderValues = this.$element.find('.js-slider__values');
      (_this$panel = this.panel) === null || _this$panel === void 0 ? void 0 : _this$panel.setValue(options);

      if (this.isDisplayValues) {
        $sliderValues.text("from: ".concat(options.from, "; to: ").concat(options.to));
      }
    }
  }, {
    key: "initPanel",
    value: function initPanel() {
      var $sliderPanelElement = this.$root.find('.js-slider__panel');
      var options = this.slider.MetaSlider('getOptions');
      this.panel = new _panel_Panel__WEBPACK_IMPORTED_MODULE_1__["default"]($sliderPanelElement, options);
      this.panel.observer.subscribe({
        key: 'setting',
        observer: this.changeSettings.bind(this)
      });
    }
  }, {
    key: "changeSettings",
    value: function changeSettings(setting) {
      var _this$panel2;

      this.slider = this.slider.MetaSlider('setOptions', setting);
      (_this$panel2 = this.panel) === null || _this$panel2 === void 0 ? void 0 : _this$panel2.setValue(this.slider.MetaSlider('getOptions'));
    }
  }]);

  return Slider;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ }),

/***/ "../src/MetaSlider.ts":
/*!****************************!*\
  !*** ../src/MetaSlider.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _presenter_Presenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presenter/Presenter */ "../src/presenter/Presenter.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var MetaSlider = /*#__PURE__*/function () {
  function MetaSlider(element, options) {
    _classCallCheck(this, MetaSlider);

    this.presenter = new _presenter_Presenter__WEBPACK_IMPORTED_MODULE_0__["default"](element, options);
  }

  _createClass(MetaSlider, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.presenter.setOptions(options);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.presenter.getOptions();
    }
  }]);

  return MetaSlider;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MetaSlider);

/***/ }),

/***/ "../src/defaults.ts":
/*!**************************!*\
  !*** ../src/defaults.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaults": () => (/* binding */ defaults),
/* harmony export */   "testConfig": () => (/* binding */ testConfig),
/* harmony export */   "testOptions": () => (/* binding */ testOptions),
/* harmony export */   "testPositions": () => (/* binding */ testPositions)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaults = {
  min: 10,
  max: 40,
  step: 4,
  from: 8,
  to: 24,
  isVertical: false,
  hasTip: true,
  withRange: true
};
var testOptions = {
  min: 0,
  max: 10,
  step: 1,
  from: 2,
  to: 8,
  isVertical: false,
  hasTip: true,
  withRange: true
};

var testConfig = _objectSpread(_objectSpread({}, testOptions), {}, {
  fromPosition: 100,
  toPosition: 400
});

var testPositions = [{
  value: 0,
  position: 0
}, {
  value: 1,
  position: 50
}, {
  value: 2,
  position: 100
}, {
  value: 3,
  position: 150
}, {
  value: 4,
  position: 200
}, {
  value: 5,
  position: 250
}, {
  value: 6,
  position: 300
}, {
  value: 7,
  position: 350
}, {
  value: 8,
  position: 400
}, {
  value: 9,
  position: 450
}, {
  value: 10,
  position: 500
}];


/***/ }),

/***/ "../src/index.ts":
/*!***********************!*\
  !*** ../src/index.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MetaSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MetaSlider */ "../src/MetaSlider.ts");
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults */ "../src/defaults.ts");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




(function ($) {
  var methods = {
    init: function init(options) {
      var _this = this;

      var config = $.extend({}, _defaults__WEBPACK_IMPORTED_MODULE_1__.defaults, options);
      var slider = new _MetaSlider__WEBPACK_IMPORTED_MODULE_0__["default"](this, config);
      $.each(config, function (key, value) {
        _this.attr("data-".concat(String(key)), "".concat(value));
      });
      this.data('slider', slider);
    },
    setOptions: function setOptions(options) {
      var _this2 = this;

      this.data('slider').setOptions(options);
      var config = this.data('slider').getOptions();
      $.each(config, function (key, value) {
        _this2.attr("data-".concat(String(key)), "".concat(value));
      });
    },
    getOptions: function getOptions() {
      return this.data('slider').getOptions();
    }
  };

  function makeSlider(method, options) {
    var $this = $(this);

    if (!method || method === 'init') {
      var dataOptions = _objectSpread({}, $this.data()) || {};
      methods.init.apply($this, [options || dataOptions]);
      return this;
    }

    if (method === 'getOptions') {
      return methods[method].apply($this);
    }

    if (method === 'setOptions' && options) {
      methods[method].apply($this, [options]);
      return this;
    }

    $.error("Method ".concat(method, " does not exist on jQuery.tooltip"));
    return this;
  }

  $.fn.MetaSlider = makeSlider;
})(jQuery);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_MetaSlider__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "../src/model/Model.ts":
/*!*****************************!*\
  !*** ../src/model/Model.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../defaults */ "../src/defaults.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
var _excluded = ["fromPosition", "toPosition"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Model = /*#__PURE__*/function () {
  function Model(options) {
    _classCallCheck(this, Model);

    this.options = options;
    this.config = this.createConfig(this.options);
    this.positions = [];
  }

  _createClass(Model, [{
    key: "init",
    value: function init(positions) {
      this.positions = positions;
      this.correctConfigByPositions();
    }
  }, {
    key: "correctParameters",
    value: function correctParameters() {
      var isFromHigher = this.config.from > this.config.to;

      if (this.config.withRange && isFromHigher) {
        var _this$options$onChang;

        var _this$config = _objectSpread({}, this.config),
            from = _this$config.from,
            fromPosition = _this$config.fromPosition;

        this.config.from = this.config.to;
        this.config.fromPosition = this.config.toPosition;
        this.config.to = from;
        this.config.toPosition = fromPosition;
        (_this$options$onChang = this.options.onChange) === null || _this$options$onChang === void 0 ? void 0 : _this$options$onChang.call(this, this.getOptions());
      }
    }
  }, {
    key: "changeParameter",
    value: function changeParameter(setting) {
      var _this$options$onChang2;

      var newParameter = this.takeClosestParameter(setting);
      var type = setting.key || this.createType(setting);
      this.config[type] = newParameter.value;
      this.config["".concat(type, "Position")] = newParameter.position;
      (_this$options$onChang2 = this.options.onChange) === null || _this$options$onChang2 === void 0 ? void 0 : _this$options$onChang2.call(this, this.getOptions());
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var newOptions = $.extend(this.options, this.config, options);
      this.options = $.extend(this.options, options);
      this.config = this.createConfig(newOptions);
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return this.config;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var _this$config2 = this.config,
          fromPosition = _this$config2.fromPosition,
          toPosition = _this$config2.toPosition,
          options = _objectWithoutProperties(_this$config2, _excluded);

      return options;
    }
  }, {
    key: "createConfig",
    value: function createConfig(options) {
      var newOptions = this.correctTypes(options);
      newOptions = this.correctValues(newOptions);
      return newOptions;
    }
  }, {
    key: "correctTypes",
    value: function correctTypes() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options;
      var newOptions = $.extend({}, _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults, {
        fromPosition: 0,
        toPosition: 0
      });
      newOptions.max = Number.isFinite(Number(options.max)) ? Number(options.max) : _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults.max;
      newOptions.min = Number.isFinite(Number(options.min)) ? Number(options.min) : _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults.min;
      newOptions.step = Number.isFinite(Number(options.step)) ? Number(options.step) : _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults.step;
      newOptions.from = Number.isFinite(Number(options.from)) ? Number(options.from) : _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults.from;
      newOptions.to = Number.isFinite(Number(options.to)) ? Number(options.to) : _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults.to;
      newOptions.isVertical = typeof options.isVertical === 'boolean' ? options.isVertical : _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults.isVertical;
      newOptions.hasTip = typeof options.hasTip === 'boolean' ? options.hasTip : _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults.hasTip;
      newOptions.withRange = typeof options.withRange === 'boolean' ? options.withRange : _defaults__WEBPACK_IMPORTED_MODULE_0__.defaults.withRange;
      return newOptions;
    }
  }, {
    key: "correctValues",
    value: function correctValues() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config;

      var correctConfig = _objectSpread({}, config);

      correctConfig.max = config.max > config.min ? config.max : config.min;
      correctConfig.min = config.max > config.min ? config.min : config.max;
      correctConfig.max = config.max === config.min ? config.min + 10 : correctConfig.max;
      var range = correctConfig.max - correctConfig.min;
      correctConfig.step = correctConfig.step > range ? range : correctConfig.step;
      correctConfig.from = config.from < config.min ? config.min : config.from;
      correctConfig.to = config.to && config.to > config.max ? config.max : config.to;
      return correctConfig;
    }
  }, {
    key: "correctConfigByPositions",
    value: function correctConfigByPositions() {
      var _this = this;

      ['from', 'to'].forEach(function (item) {
        var correctItem = item;

        var valuesArr = _this.positions.map(function (el) {
          return el.value;
        });

        var index = Model.takeClosestIndex(_this.config[correctItem], valuesArr);
        _this.config[correctItem] = _this.positions[index].value;
        _this.config["".concat(correctItem, "Position")] = _this.positions[index].position;
      });
    }
  }, {
    key: "createType",
    value: function createType(parameter) {
      if (!this.config.withRange) {
        return 'from';
      }

      var value = parameter.value,
          position = parameter.position;
      var index;

      if (value && !position) {
        var values = [this.config.from, this.config.to];
        index = Model.takeClosestIndex(value, values);
      }

      if (position && !value) {
        var positions = [this.config.fromPosition, this.config.toPosition];
        index = Model.takeClosestIndex(position, positions);
      }

      return index === 0 ? 'from' : 'to';
    }
  }, {
    key: "takeClosestParameter",
    value: function takeClosestParameter(parameter) {
      if (parameter.position) {
        var index = Model.takeClosestIndex(parameter.position, this.positions.map(function (item) {
          return item.position;
        }));
        return this.positions[index];
      }

      if (parameter.value) {
        var _index = Model.takeClosestIndex(parameter.value, this.positions.map(function (item) {
          return item.value;
        }));

        return this.positions[_index];
      }

      throw new Error('wrong parameters');
    }
  }], [{
    key: "takeClosestIndex",
    value: function takeClosestIndex(num, array) {
      var closest = array.reduce(function (a, b) {
        return Math.abs(b - num) < Math.abs(a - num) ? b : a;
      });
      return array.indexOf(closest);
    }
  }]);

  return Model;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Model);

/***/ }),

/***/ "../src/observer/Observer.ts":
/*!***********************************!*\
  !*** ../src/observer/Observer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Observer = /*#__PURE__*/function () {
  function Observer() {
    _classCallCheck(this, Observer);

    this.observers = [];
  } // use type any, cause any can subscribe


  _createClass(Observer, [{
    key: "subscribe",
    value: function subscribe(fn) {
      this.observers.push(fn);
    }
  }, {
    key: "notify",
    value: function notify(key, data) {
      this.observers.forEach(function (item) {
        if (item.key === key) {
          item.observer(data);
        }
      });
    }
  }]);

  return Observer;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observer);

/***/ }),

/***/ "../src/presenter/Presenter.ts":
/*!*************************************!*\
  !*** ../src/presenter/Presenter.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _view_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/View */ "../src/view/View.ts");
/* harmony import */ var _model_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/Model */ "../src/model/Model.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Presenter = /*#__PURE__*/function () {
  function Presenter(root, options) {
    _classCallCheck(this, Presenter);

    this.$root = root;
    this.options = options;
    this.model = new _model_Model__WEBPACK_IMPORTED_MODULE_1__["default"](this.options);
    this.view = new _view_View__WEBPACK_IMPORTED_MODULE_0__["default"](this.$root, this.model.getConfig());
    this.init();
  }

  _createClass(Presenter, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.model.setOptions(options);
      this.view.changeConfig(this.model.getConfig());
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.model.getOptions();
    }
  }, {
    key: "init",
    value: function init() {
      this.view.observer.subscribe({
        key: 'init',
        observer: this.initParameters.bind(this)
      });
      this.view.observer.subscribe({
        key: 'moveHandle',
        observer: this.changeParameters.bind(this)
      });
      this.view.observer.subscribe({
        key: 'moveEnd',
        observer: this.correctParameters.bind(this)
      });
    }
  }, {
    key: "initParameters",
    value: function initParameters() {
      this.model.init(this.view.getPositions());
      this.view.setParameters(this.model.getConfig());
    }
  }, {
    key: "changeParameters",
    value: function changeParameters(setting) {
      this.model.changeParameter(setting);
      this.view.setParameters(this.model.getConfig());
    }
  }, {
    key: "correctParameters",
    value: function correctParameters() {
      this.model.correctParameters();
      this.view.setParameters(this.model.getConfig());
    }
  }]);

  return Presenter;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Presenter);

/***/ }),

/***/ "../src/view/View.ts":
/*!***************************!*\
  !*** ../src/view/View.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _observer_Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observer/Observer */ "../src/observer/Observer.ts");
/* harmony import */ var _slider_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider.scss */ "../src/view/slider.scss");
/* harmony import */ var _elements_track_Track__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./elements/track/Track */ "../src/view/elements/track/Track.ts");
/* harmony import */ var _elements_scale_Scale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements/scale/Scale */ "../src/view/elements/scale/Scale.ts");
/* harmony import */ var _elements_handle_Handle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elements/handle/Handle */ "../src/view/elements/handle/Handle.ts");
/* harmony import */ var _elements_interval_Interval__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements/interval/Interval */ "../src/view/elements/interval/Interval.ts");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }








var View = /*#__PURE__*/function () {
  function View($root, config) {
    _classCallCheck(this, View);

    this.$root = $root;
    this.config = config;
    this.observer = new _observer_Observer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.$slider = jQuery('<div>');
    this.track = new _elements_track_Track__WEBPACK_IMPORTED_MODULE_2__["default"](this.$slider, this.config);
    this.scale = new _elements_scale_Scale__WEBPACK_IMPORTED_MODULE_3__["default"](this.$slider, this.config);
    this.firstHandle = new _elements_handle_Handle__WEBPACK_IMPORTED_MODULE_4__["default"](this.track.getElement(), this.config);
    this.secondHandle = null;
    this.interval = new _elements_interval_Interval__WEBPACK_IMPORTED_MODULE_5__["default"](this.track.getElement(), this.config);
    this.init();
  }

  _createClass(View, [{
    key: "changeConfig",
    value: function changeConfig(config) {
      var _this = this;

      this.config = config;
      this.scale.setConfig(config);
      this.toggleDirection();
      this.toggleRange();
      this.toggleTip();
      this.track.getElement().ready(function () {
        _this.initTrackParameters();
      });
    }
  }, {
    key: "getPositions",
    value: function getPositions() {
      return this.scale.getPositions();
    }
  }, {
    key: "setParameters",
    value: function setParameters(config) {
      this.firstHandle.moveHandle(config.from, config.fromPosition);

      if (config.withRange) {
        var _this$secondHandle;

        (_this$secondHandle = this.secondHandle) === null || _this$secondHandle === void 0 ? void 0 : _this$secondHandle.moveHandle(config.to, config.toPosition);
      }

      this.interval.moveInterval(config.fromPosition, config.toPosition);
    }
  }, {
    key: "initTrackParameters",
    value: function initTrackParameters() {
      var _this$secondHandle2;

      var trackParameters = this.track.getTrackParameters();
      this.scale.initPositions(trackParameters);
      this.firstHandle.setTrackParameters(trackParameters);
      (_this$secondHandle2 = this.secondHandle) === null || _this$secondHandle2 === void 0 ? void 0 : _this$secondHandle2.setTrackParameters(trackParameters);
      this.observer.notify('init', null);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.$slider.addClass('meta-slider js-meta-slider meta-slider_horizontal');
      this.$slider.prependTo(this.$root);
      this.track.observer.subscribe({
        key: 'trackClick',
        observer: this.trackClick.bind(this)
      });
      this.scale.observer.subscribe({
        key: 'scaleClick',
        observer: this.scaleClick.bind(this)
      });
      this.firstHandle.observer.subscribe({
        key: 'mouseMove',
        observer: this.mouseMove.bind(this, 'from')
      });
      this.firstHandle.observer.subscribe({
        key: 'moveEnd',
        observer: this.mouseMoveEnd.bind(this)
      });
      this.track.getElement().ready(function () {
        _this2.initTrackParameters();
      });
    }
  }, {
    key: "toggleDirection",
    value: function toggleDirection() {
      var _this$secondHandle3;

      var isVertical = this.config.isVertical;
      this.$slider.removeClass(isVertical ? 'meta-slider_horizontal' : 'meta-slider_vertical').addClass(isVertical ? 'meta-slider_vertical' : 'meta-slider_horizontal');
      this.track.setVertical(isVertical);
      this.firstHandle.setVertical(isVertical);
      (_this$secondHandle3 = this.secondHandle) === null || _this$secondHandle3 === void 0 ? void 0 : _this$secondHandle3.setVertical(isVertical);
      this.interval.setVertical(isVertical);
    }
  }, {
    key: "toggleRange",
    value: function toggleRange() {
      var _this$config = this.config,
          withRange = _this$config.withRange,
          isVertical = _this$config.isVertical;
      this.interval.setRange(withRange);

      if (withRange && !this.secondHandle) {
        this.secondHandle = new _elements_handle_Handle__WEBPACK_IMPORTED_MODULE_4__["default"](this.track.getElement(), this.config);
        this.secondHandle.setVertical(isVertical);
        this.secondHandle.observer.subscribe({
          key: 'mouseMove',
          observer: this.mouseMove.bind(this, 'to')
        });
        this.secondHandle.observer.subscribe({
          key: 'moveEnd',
          observer: this.mouseMoveEnd.bind(this)
        });
      } else if (!withRange && this.secondHandle) {
        this.secondHandle.getElement().remove();
        this.secondHandle = null;
      }
    }
  }, {
    key: "toggleTip",
    value: function toggleTip() {
      var _this$secondHandle4;

      var hasTip = this.config.hasTip;
      this.firstHandle.toggleTip(hasTip);
      (_this$secondHandle4 = this.secondHandle) === null || _this$secondHandle4 === void 0 ? void 0 : _this$secondHandle4.toggleTip(hasTip);
    }
  }, {
    key: "trackClick",
    value: function trackClick(position) {
      var options = {
        position: position
      };
      this.observer.notify('moveHandle', options);
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(key, mousePosition) {
      var options = {
        key: key,
        position: mousePosition
      };
      this.observer.notify('moveHandle', options);
    }
  }, {
    key: "mouseMoveEnd",
    value: function mouseMoveEnd() {
      this.observer.notify('moveEnd', null);
    }
  }, {
    key: "scaleClick",
    value: function scaleClick(value) {
      var options = {
        value: value
      };
      this.observer.notify('moveHandle', options);
    }
  }]);

  return View;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View);

/***/ }),

/***/ "../src/view/elements/handle/Handle.ts":
/*!*********************************************!*\
  !*** ../src/view/elements/handle/Handle.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _observer_Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../observer/Observer */ "../src/observer/Observer.ts");
/* harmony import */ var _tip_Tip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tip/Tip */ "../src/view/elements/tip/Tip.ts");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Handle = /*#__PURE__*/function () {
  function Handle($track, config) {
    _classCallCheck(this, Handle);

    this.$track = $track;
    this.observer = new _observer_Observer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.isVertical = config.isVertical;
    this.$handle = jQuery('<div>');
    this.tip = new _tip_Tip__WEBPACK_IMPORTED_MODULE_1__["default"](this.$handle);
    this.trackStart = null;
    this.trackWidth = null;
    this.bindEventListeners();
    this.init();
  }

  _createClass(Handle, [{
    key: "setVertical",
    value: function setVertical(isVertical) {
      this.isVertical = isVertical;
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.$handle;
    }
  }, {
    key: "setTrackParameters",
    value: function setTrackParameters(trackParameters) {
      var trackStart = trackParameters.trackStart,
          trackWidth = trackParameters.trackWidth;
      this.trackStart = trackStart;
      this.trackWidth = trackWidth;
    }
  }, {
    key: "moveHandle",
    value: function moveHandle(item, itemPosition) {
      var _this$tip;

      this.$handle.css(this.isVertical ? 'top' : 'left', "".concat(itemPosition - 20 / 2, "px"));
      this.$handle.css(this.isVertical ? 'left' : 'top', '-5px');
      (_this$tip = this.tip) === null || _this$tip === void 0 ? void 0 : _this$tip.changeTip(item);
    }
  }, {
    key: "toggleTip",
    value: function toggleTip(hasTip) {
      if (hasTip && !this.tip) {
        this.tip = new _tip_Tip__WEBPACK_IMPORTED_MODULE_1__["default"](this.$handle);
      } else if (!hasTip && this.tip) {
        var tipElement = this.tip.getElement();
        tipElement.remove();
        this.tip = null;
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.$handle.addClass('meta-slider__handle js-meta-slider__handle');
      this.$handle.appendTo(this.$track);
    }
  }, {
    key: "bindEventListeners",
    value: function bindEventListeners() {
      this.$handle.on('mousedown touchstart', this.handleHandleMouseDown.bind(this));
    }
  }, {
    key: "handleHandleMouseDown",
    value: function handleHandleMouseDown(event) {
      event.preventDefault();
      $(document).on('mousemove', this.handleMouseMove.bind(this));
      $(document).on('touchmove', this.handleTouchMove.bind(this));
      $(document).on('mouseup touchend', this.handleMoveEnd.bind(this));
      $(document).on('dragstart', Handle.handleDragStart);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      var mousePosition = this.isVertical ? event.pageY : event.pageX;

      var _this$getCorrectPosit = this.getCorrectPosition(mousePosition),
          correctedPosition = _this$getCorrectPosit.correctedPosition,
          isInScale = _this$getCorrectPosit.isInScale;

      if (isInScale) {
        this.observer.notify('mouseMove', correctedPosition);
      }
    }
  }, {
    key: "getCorrectPosition",
    value: function getCorrectPosition(eventPosition) {
      if (this.trackWidth && this.trackStart !== null) {
        var correctedPosition = Math.round(eventPosition - this.trackStart);
        var isInScale = correctedPosition >= 0 && correctedPosition <= this.trackWidth;
        return {
          correctedPosition: correctedPosition,
          isInScale: isInScale
        };
      }

      throw new Error('wrong track positions');
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(event) {
      var touches = event === null || event === void 0 ? void 0 : event.touches;
      var touch = touches[0];
      var touchPosition = this.isVertical ? touch.pageY : touch.pageX;

      var _this$getCorrectPosit2 = this.getCorrectPosition(touchPosition),
          correctedPosition = _this$getCorrectPosit2.correctedPosition,
          isInScale = _this$getCorrectPosit2.isInScale;

      if (touches !== undefined && isInScale) {
        this.observer.notify('mouseMove', correctedPosition);
      }
    }
  }, {
    key: "handleMoveEnd",
    value: function handleMoveEnd() {
      $(document).off('mousemove mouseup touchmove touchend');
      this.observer.notify('moveEnd', 0);
    }
  }], [{
    key: "handleDragStart",
    value: function handleDragStart() {
      return false;
    }
  }]);

  return Handle;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Handle);

/***/ }),

/***/ "../src/view/elements/interval/Interval.ts":
/*!*************************************************!*\
  !*** ../src/view/elements/interval/Interval.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Interval = /*#__PURE__*/function () {
  function Interval($track, config) {
    _classCallCheck(this, Interval);

    this.$track = $track;
    this.$interval = jQuery('<div>');
    this.isVertical = config.isVertical;
    this.withRange = config.withRange;
    this.init();
  }

  _createClass(Interval, [{
    key: "setVertical",
    value: function setVertical(isVertical) {
      this.isVertical = isVertical;
    }
  }, {
    key: "setRange",
    value: function setRange(withRange) {
      this.withRange = withRange;
    }
  }, {
    key: "moveInterval",
    value: function moveInterval(fromPosition, toPosition) {
      var min;
      var width;
      var handleWidth = 20;
      var gap = 2; // to make a gap between interval and handle

      if (this.withRange) {
        min = Math.min(fromPosition, toPosition) + handleWidth / 2;
        width = Math.abs(toPosition - fromPosition) - handleWidth - gap;
      } else {
        min = 0;
        width = fromPosition - handleWidth / 2 - gap;
      }

      width = width > 0 ? width : 0;
      this.$interval.css(this.isVertical ? 'height' : 'width', "".concat(width, "px"));
      this.$interval.css(this.isVertical ? 'width' : 'height', '10px');
      this.$interval.css(this.isVertical ? 'top' : 'left', "".concat(min, "px"));
      this.$interval.css(this.isVertical ? 'left' : 'top', '0px');
    }
  }, {
    key: "init",
    value: function init() {
      this.$interval.addClass('meta-slider__interval js-meta-slider__interval');
      this.$interval.appendTo(this.$track);
    }
  }]);

  return Interval;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Interval);

/***/ }),

/***/ "../src/view/elements/scale/Scale.ts":
/*!*******************************************!*\
  !*** ../src/view/elements/scale/Scale.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _observer_Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../observer/Observer */ "../src/observer/Observer.ts");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Scale = /*#__PURE__*/function () {
  function Scale($slider, config) {
    _classCallCheck(this, Scale);

    this.$slider = $slider;
    this.config = config;
    this.observer = new _observer_Observer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.$scale = jQuery('<div>');
    this.positions = [];
    this.itemWidth = 20;
    this.scaleSize = null;
    this.init();
  }

  _createClass(Scale, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.config = config;
    }
  }, {
    key: "initPositions",
    value: function initPositions(trackParameters) {
      this.scaleSize = trackParameters.trackWidth;
      var _this$config = this.config,
          min = _this$config.min,
          max = _this$config.max,
          step = _this$config.step;
      var range = max - min;
      var stepArray = step.toString().split('.');
      var fractionalLength = stepArray.length === 2 ? Math.pow(10, stepArray[1].length) : 1;
      var stepLength = this.scaleSize / range * step;
      var arrStep = stepLength < 1 ? Math.floor(1 / stepLength) : 1;
      var stepsCount = Math.floor(range / step / arrStep);
      var emptyArr = Array(stepsCount + 1);
      var multiplyStep = step * 10 * arrStep;
      var positionLength = stepLength * arrStep;
      var positions = [];
      var valuesArr = Array.from(emptyArr, function (_, i) {
        return min + Math.round(multiplyStep * i * fractionalLength) / (10 * fractionalLength);
      });
      positions = valuesArr.map(function (el, i) {
        var value = Math.round(el * fractionalLength) / fractionalLength;
        var position = Math.round(positionLength * i);
        return {
          value: value,
          position: position
        };
      });

      if (valuesArr[valuesArr.length - 1] !== max) {
        positions.push({
          value: max,
          position: this.scaleSize
        });
      }

      this.positions = positions;
      this.initScale();
    }
  }, {
    key: "getPositions",
    value: function getPositions() {
      return this.positions;
    }
  }, {
    key: "init",
    value: function init() {
      this.$scale.addClass('meta-slider__scale js-meta-slider__scale');
      this.$scale.appendTo(this.$slider);
      this.bindEventListeners();
    }
  }, {
    key: "initScale",
    value: function initScale() {
      this.$scale.empty();
      this.itemWidth = this.takeWidth();
      this.addValues();
    }
  }, {
    key: "takeWidth",
    value: function takeWidth() {
      var _this = this;

      var widthArr = [];
      var size = this.config.isVertical ? 'height' : 'width';
      this.positions.forEach(function (item) {
        var $scaleItem = jQuery('<div>', {
          text: item.value
        }).appendTo(_this.$scale);
        $scaleItem.css(size, 'min-content');
        var itemWidth = _this.config.isVertical ? $scaleItem.height() : $scaleItem.width();
        widthArr.push(itemWidth || 0);
        $scaleItem.remove();
      });
      return Math.max.apply(null, widthArr) + 10;
    }
  }, {
    key: "addValues",
    value: function addValues() {
      var _this2 = this;

      var scaleArr = this.correctScaleArr();
      var $scaleRow = jQuery('<div>', {
        "class": 'meta-slider__scale-row js-meta-slider__scale-row'
      });
      scaleArr.forEach(function (item) {
        var position = item.position - _this2.itemWidth / 2;

        var $scaleItem = _this2.createItem(item, position);

        $scaleRow.append($scaleItem);
      });
      this.$scale.append($scaleRow);
    }
  }, {
    key: "correctScaleArr",
    value: function correctScaleArr() {
      if (this.scaleSize) {
        var maxStepsCount = Math.floor(this.scaleSize / this.itemWidth);
        var scaleArr = Scale.reduceArray(this.positions, maxStepsCount);
        var correctedScaleArr = Scale.correctLastItems(scaleArr, this.itemWidth);
        return correctedScaleArr;
      }

      throw new Error('wrong size of scale');
    }
  }, {
    key: "createItem",
    value: function createItem(item, position) {
      var $scaleItem = jQuery('<div>', {
        "class": 'meta-slider__scale-item js-meta-slider__scale-item',
        style: this.config.isVertical ? "top: ".concat(position, "px; line-height: ").concat(this.itemWidth, "px") : "left: ".concat(position, "px")
      });
      var $line = jQuery('<div>', {
        "class": 'meta-slider__line',
        text: this.config.isVertical ? "\u2014" : '|'
      });
      $line.appendTo($scaleItem);
      var $value = jQuery('<div>', {
        "class": 'meta-slider__value js-meta-slider__value',
        'data-value': item.value,
        text: item.value,
        style: this.config.isVertical ? "height: ".concat(this.itemWidth, "px") : "width: ".concat(this.itemWidth, "px")
      });
      $value.appendTo($scaleItem);
      return $scaleItem;
    }
  }, {
    key: "bindEventListeners",
    value: function bindEventListeners() {
      $(this.$scale).on('click touchstart', this.handleScaleClick.bind(this));
    }
  }, {
    key: "handleScaleClick",
    value: function handleScaleClick(event) {
      var observer = this.observer;

      if (event.target.dataset.value) {
        var currentValue = Number(event.target.dataset.value);
        observer.notify('scaleClick', currentValue);
      }
    }
  }], [{
    key: "reduceArray",
    value: function reduceArray(array, size) {
      var ispositionsSmall = array.length < size;

      if (ispositionsSmall) {
        return array;
      }

      var arrayStep = Math.round(array.length / size);
      var correctedArray = array.filter(function (item, i) {
        var isItemEquivalentStep = i % arrayStep === 0;
        var isLastItem = i === array.length - 1;

        if (isItemEquivalentStep || isLastItem) {
          return item;
        }

        return false;
      });
      return correctedArray;
    }
  }, {
    key: "correctLastItems",
    value: function correctLastItems(array, width) {
      var correctedArray = _toConsumableArray(array);

      var lastItemPosition = Number(array[array.length - 1].position);
      var prevLastItemPosition = Number(array[array.length - 2].position);
      var isSmallPlaceInEnd = Math.abs(prevLastItemPosition - lastItemPosition) < width;

      if (isSmallPlaceInEnd) {
        correctedArray.splice(array.length - 2, 1);
      }

      return correctedArray;
    }
  }]);

  return Scale;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scale);

/***/ }),

/***/ "../src/view/elements/tip/Tip.ts":
/*!***************************************!*\
  !*** ../src/view/elements/tip/Tip.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Tip = /*#__PURE__*/function () {
  function Tip($handle) {
    _classCallCheck(this, Tip);

    this.$handle = $handle;
    this.$tip = jQuery('<div>');
    this.init();
  }

  _createClass(Tip, [{
    key: "changeTip",
    value: function changeTip(item) {
      this.$tip.html("".concat(item));
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.$tip;
    }
  }, {
    key: "init",
    value: function init() {
      this.$tip.addClass('meta-slider__tip js-meta-slider__tip');
      this.$tip.appendTo(this.$handle);
    }
  }]);

  return Tip;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tip);

/***/ }),

/***/ "../src/view/elements/track/Track.ts":
/*!*******************************************!*\
  !*** ../src/view/elements/track/Track.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _observer_Observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../observer/Observer */ "../src/observer/Observer.ts");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Track = /*#__PURE__*/function () {
  function Track($slider, config) {
    _classCallCheck(this, Track);

    this.$slider = $slider;
    this.observer = new _observer_Observer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.$track = jQuery('<div>');
    this.isVertical = config.isVertical;
    this.trackStart = null;
    this.trackWidth = null;
    this.init();
  }

  _createClass(Track, [{
    key: "setVertical",
    value: function setVertical(isVertical) {
      this.isVertical = isVertical;
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this.$track;
    }
  }, {
    key: "getTrackParameters",
    value: function getTrackParameters() {
      var position = this.$track.position();
      this.trackStart = this.isVertical ? Number(position.top) : Number(position.left);
      var trackWidth = this.isVertical ? this.$track.css('height') : this.$track.css('width');
      this.trackWidth = parseFloat(trackWidth);
      return {
        trackStart: this.trackStart,
        trackWidth: this.trackWidth
      };
    }
  }, {
    key: "init",
    value: function init() {
      this.$track.addClass('meta-slider__track js-meta-slider__track');
      this.$track.appendTo(this.$slider);
      this.bindEventListeners();
    }
  }, {
    key: "bindEventListeners",
    value: function bindEventListeners() {
      this.$track.on('click', this.handleTrackClick.bind(this));
    }
  }, {
    key: "handleTrackClick",
    value: function handleTrackClick(event) {
      var mousePosition = this.isVertical ? event.pageY : event.pageX;

      if (this.trackStart !== null) {
        var position = Math.round(mousePosition - this.trackStart);
        this.observer.notify('trackClick', position);
      } else {
        throw new Error('wrong track start');
      }
    }
  }]);

  return Track;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Track);

/***/ }),

/***/ "./demo.js":
/*!*****************!*\
  !*** ./demo.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(__webpack_require__("./. sync recursive \\.scss$"));
requireAll(__webpack_require__("./. sync recursive \\.js$"));

/***/ }),

/***/ "./main/init.js":
/*!**********************!*\
  !*** ./main/init.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Main_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Main.ts */ "./main/Main.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");

var $mainElement = $('.js-main');
var main = new _Main_ts__WEBPACK_IMPORTED_MODULE_0__["default"]($mainElement);

/***/ }),

/***/ "./input/input.scss":
/*!**************************!*\
  !*** ./input/input.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./main/main.scss":
/*!************************!*\
  !*** ./main/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./panel/panel.scss":
/*!**************************!*\
  !*** ./panel/panel.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./slider/slider.scss":
/*!****************************!*\
  !*** ./slider/slider.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../src/view/slider.scss":
/*!*******************************!*\
  !*** ../src/view/slider.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_jquery_dist_jquery_js"], () => (__webpack_require__("./demo.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Olsid2VicGFjazovLy8uLy4vIHN5bmMgXFwuanMkIiwid2VicGFjazovLy8uLy4vIHN5bmMgXFwuc2NzcyQiLCJ3ZWJwYWNrOi8vLy4vaW5wdXQvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi9NYWluLnRzIiwid2VicGFjazovLy8uL3BhbmVsL1BhbmVsLnRzIiwid2VicGFjazovLy8uL3NsaWRlci9TbGlkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9NZXRhU2xpZGVyLnRzIiwid2VicGFjazovLy8uLi9zcmMvZGVmYXVsdHMudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL21vZGVsL01vZGVsLnRzIiwid2VicGFjazovLy8uLi9zcmMvb2JzZXJ2ZXIvT2JzZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9wcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uLi9zcmMvdmlldy9WaWV3LnRzIiwid2VicGFjazovLy8uLi9zcmMvdmlldy9lbGVtZW50cy9oYW5kbGUvSGFuZGxlLnRzIiwid2VicGFjazovLy8uLi9zcmMvdmlldy9lbGVtZW50cy9pbnRlcnZhbC9JbnRlcnZhbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL3ZpZXcvZWxlbWVudHMvc2NhbGUvU2NhbGUudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy92aWV3L2VsZW1lbnRzL3RpcC9UaXAudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy92aWV3L2VsZW1lbnRzL3RyYWNrL1RyYWNrLnRzIiwid2VicGFjazovLy8uL2RlbW8uanMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi9pbml0LmpzIiwid2VicGFjazovLy8uL2lucHV0L2lucHV0LnNjc3M/OTMxNCIsIndlYnBhY2s6Ly8vLi9tYWluL21haW4uc2Nzcz83NGU4Iiwid2VicGFjazovLy8uL3BhbmVsL3BhbmVsLnNjc3M/ZThhYiIsIndlYnBhY2s6Ly8vLi9zbGlkZXIvc2xpZGVyLnNjc3M/OTdiYyIsIndlYnBhY2s6Ly8vLi4vc3JjL3ZpZXcvc2xpZGVyLnNjc3M/Nzc4NSIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBtYXAgPSB7XG5cdFwiLi9kZW1vLmpzXCI6IFwiLi9kZW1vLmpzXCIsXG5cdFwiLi9tYWluL2luaXQuanNcIjogXCIuL21haW4vaW5pdC5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLy4gc3luYyByZWN1cnNpdmUgXFxcXC5qcyRcIjsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vaW5wdXQvaW5wdXQuc2Nzc1wiOiBcIi4vaW5wdXQvaW5wdXQuc2Nzc1wiLFxuXHRcIi4vbWFpbi9tYWluLnNjc3NcIjogXCIuL21haW4vbWFpbi5zY3NzXCIsXG5cdFwiLi9wYW5lbC9wYW5lbC5zY3NzXCI6IFwiLi9wYW5lbC9wYW5lbC5zY3NzXCIsXG5cdFwiLi9zbGlkZXIvc2xpZGVyLnNjc3NcIjogXCIuL3NsaWRlci9zbGlkZXIuc2Nzc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLy4gc3luYyByZWN1cnNpdmUgXFxcXC5zY3NzJFwiOyIsImltcG9ydCB7IElPcHRpb25zIH0gZnJvbSAnLi4vLi4vc3JjL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi8uLi9zcmMvb2JzZXJ2ZXIvT2JzZXJ2ZXInO1xyXG5pbXBvcnQgSU9ic2VydmVyIGZyb20gJy4uLy4uL3NyYy9vYnNlcnZlci9pbnRlcmZhY2UnO1xyXG5pbXBvcnQgSUlucHV0IGZyb20gJy4vaW50ZXJmYWNlJztcclxuaW1wb3J0ICcuL2lucHV0LnNjc3MnO1xyXG5cclxuY2xhc3MgSW5wdXQgaW1wbGVtZW50cyBJSW5wdXQge1xyXG4gIHB1YmxpYyBvYnNlcnZlcjogSU9ic2VydmVyO1xyXG5cclxuICByZWFkb25seSAkcm9vdDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgcHJpdmF0ZSBuYW1lOiBrZXlvZiBJT3B0aW9ucztcclxuXHJcbiAgcHJpdmF0ZSB0eXBlOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgdmFsdWU6IG51bWJlciB8IGJvb2xlYW4gfCBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgJHJvb3Q6IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICBrZXk6IGtleW9mIElPcHRpb25zLFxyXG4gICAgdmFsdWU6IG51bWJlciB8IGJvb2xlYW4sXHJcbiAgKSB7XHJcbiAgICB0aGlzLiRyb290ID0gJHJvb3Q7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLm5hbWUgPSBrZXk7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gJ251bWJlcicgOiAnY2hlY2tib3gnO1xyXG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBPYnNlcnZlcigpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VmFsdWUodmFsdWU6IG51bWJlciB8IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRoaXMuJHJvb3QudmFsKHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuJHJvb3QucHJvcCgnY2hlY2tlZCcsIHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRQcm9wKG5hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlciB8IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuJHJvb3QucHJvcChuYW1lLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RGlzYWJsZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy4kcm9vdC5wcm9wKCdkaXNhYmxlZCcsICF2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGJpbmRFdmVudExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgIHRoaXMuJHJvb3Qub24oJ2NoYW5nZSBrZXl1cCcsIHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLnZhbHVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjaGVja2JveCc6XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLmNoZWNrZWQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzZXR0aW5nOiBJT3B0aW9ucyA9IHsgW3RoaXMubmFtZV06IHRoaXMudmFsdWUgfTtcclxuICAgIGNvbnN0IGlzU3RlcExvd2VyWmVybyA9IHRoaXMubmFtZSA9PT0gJ3N0ZXAnICYmIHRoaXMudmFsdWUgPD0gMDtcclxuICAgIGlmICh0aGlzLnZhbHVlICE9PSAnJyAmJiAhaXNTdGVwTG93ZXJaZXJvKSB7XHJcbiAgICAgIHRoaXMub2JzZXJ2ZXIubm90aWZ5KCdzZXR0aW5nJywgc2V0dGluZyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dDtcclxuIiwiaW1wb3J0IElTbGlkZXIgZnJvbSAnLi4vc2xpZGVyL2ludGVyZmFjZSc7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi4vc2xpZGVyL1NsaWRlcic7XHJcbmltcG9ydCBJTWFpbiBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5jbGFzcyBNYWluIGltcGxlbWVudHMgSU1haW4ge1xyXG4gIHB1YmxpYyBzbGlkZXJzOiBJU2xpZGVyW107XHJcblxyXG4gIHByaXZhdGUgJGVsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRlbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XHJcbiAgICB0aGlzLnNsaWRlcnMgPSBbXTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgJHNsaWRlcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1tYWluX19zbGlkZXJfX2l0ZW0nKTtcclxuICAgICRzbGlkZXJzLmVhY2goKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNsaWRlciA9IG5ldyBTbGlkZXIoJChpdGVtKSk7XHJcbiAgICAgIHRoaXMuc2xpZGVycy5wdXNoKHNsaWRlcik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2xpZGVyc1swXS5kaXNwbGF5VmFsdWVzKHRydWUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFpbjtcclxuIiwiaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tICcuLi8uLi9zcmMvaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uLy4uL3NyYy9vYnNlcnZlci9PYnNlcnZlcic7XHJcbmltcG9ydCBJT2JzZXJ2ZXIgZnJvbSAnLi4vLi4vc3JjL29ic2VydmVyL2ludGVyZmFjZSc7XHJcbmltcG9ydCBJbnB1dCBmcm9tICcuLi9pbnB1dC9JbnB1dCc7XHJcbmltcG9ydCBJUGFuZWwgZnJvbSAnLi9pbnRlcmZhY2UnO1xyXG5cclxuaW1wb3J0ICcuL3BhbmVsLnNjc3MnO1xyXG5cclxuY2xhc3MgUGFuZWwgaW1wbGVtZW50cyBJUGFuZWwge1xyXG4gIHB1YmxpYyBpbnB1dHM6IHsgW2tleTogc3RyaW5nXTogSW5wdXQgfTtcclxuXHJcbiAgcHVibGljIG9ic2VydmVyOiBJT2JzZXJ2ZXI7XHJcblxyXG4gIHJlYWRvbmx5ICRyb290OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBwcml2YXRlIG9wdGlvbnM6IElPcHRpb25zO1xyXG5cclxuICBwcml2YXRlICRwYW5lbDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgY29uc3RydWN0b3IoJHJvb3Q6IEpRdWVyeTxIVE1MRWxlbWVudD4sIG9wdGlvbnM6IElPcHRpb25zKSB7XHJcbiAgICB0aGlzLiRyb290ID0gJHJvb3Q7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5vYnNlcnZlciA9IG5ldyBPYnNlcnZlcigpO1xyXG4gICAgdGhpcy4kcGFuZWwgPSAkKCc8ZGl2PicpO1xyXG4gICAgdGhpcy5pbnB1dHMgPSB7fTtcclxuICAgIHRoaXMuaW5pdFBhbmVsKHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZhbHVlKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICBPYmplY3QuZW50cmllcyhvcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0c1trZXldO1xyXG4gICAgICBpbnB1dC5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgIGlmIChrZXkgPT09ICd3aXRoUmFuZ2UnKSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dHMudG8uc2V0RGlzYWJsZSh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGhhbmRsZVBhbmVsRm9ybVN1Ym1pdCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFBhbmVsKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICB0aGlzLiRwYW5lbCA9IHRoaXMuJHJvb3QuZmluZCgnLmpzLXBhbmVsJyk7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcztcclxuICAgIE9iamVjdC5lbnRyaWVzKG9wdGlvbnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICBjb25zdCBzZWFyY2hlciA9IGAke2tleX1gO1xyXG4gICAgICBjb25zdCAkaW5wdXRFbGVtZW50ID0gdGhpcy4kcGFuZWwuZmluZChgW25hbWU9JHtzZWFyY2hlcn1dYCk7XHJcbiAgICAgIGNvbnN0IGlucHV0ID0gbmV3IElucHV0KCRpbnB1dEVsZW1lbnQsIGtleSBhcyBrZXlvZiBJT3B0aW9ucywgdmFsdWUpO1xyXG4gICAgICBpbnB1dC5vYnNlcnZlci5zdWJzY3JpYmUoe1xyXG4gICAgICAgIGtleTogJ3NldHRpbmcnLFxyXG4gICAgICAgIG9ic2VydmVyOiBlbGVtZW50LmNoYW5nZU9wdGlvbnMuYmluZChlbGVtZW50KSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaW5wdXRzW2tleV0gPSBpbnB1dDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXRWYWx1ZShvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYmluZEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kcGFuZWwub24oJ3N1Ym1pdCcsIFBhbmVsLmhhbmRsZVBhbmVsRm9ybVN1Ym1pdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoYW5nZU9wdGlvbnMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgIHRoaXMub2JzZXJ2ZXIubm90aWZ5KCdzZXR0aW5nJywgb3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYW5lbDtcclxuIiwiaW1wb3J0ICcuLi8uLi9zcmMvaW5kZXgnO1xyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NyYy9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgSVBhbmVsIGZyb20gJy4uL3BhbmVsL2ludGVyZmFjZSc7XHJcbmltcG9ydCBQYW5lbCBmcm9tICcuLi9wYW5lbC9QYW5lbCc7XHJcbmltcG9ydCBJU2xpZGVyIGZyb20gJy4vaW50ZXJmYWNlJztcclxuXHJcbmNsYXNzIFNsaWRlciBpbXBsZW1lbnRzIElTbGlkZXIge1xyXG4gIHByaXZhdGUgJHJvb3Q6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gIHByaXZhdGUgJGVsZW1lbnQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gIHByaXZhdGUgJHNsaWRlclJvb3RFbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBwcml2YXRlIHNsaWRlcjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgcHJpdmF0ZSBwYW5lbDogSVBhbmVsIHwgbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBpc0Rpc3BsYXlWYWx1ZXM6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRyb290OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICB0aGlzLiRyb290ID0gJHJvb3Q7XHJcbiAgICB0aGlzLiRlbGVtZW50ID0gJCgnPGRpdj4nKTtcclxuICAgIHRoaXMuJHNsaWRlclJvb3RFbGVtZW50ID0gJCgnPGRpdj4nKTtcclxuICAgIHRoaXMuc2xpZGVyID0gJCgnPGRpdj4nKTtcclxuICAgIHRoaXMucGFuZWwgPSBudWxsO1xyXG4gICAgdGhpcy5pc0Rpc3BsYXlWYWx1ZXMgPSBmYWxzZTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgdGhpcy5pbml0UGFuZWwoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwbGF5VmFsdWVzKGlzRGlzcGxheTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0Rpc3BsYXlWYWx1ZXMgPSBpc0Rpc3BsYXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLiRlbGVtZW50ID0gdGhpcy4kcm9vdC5maW5kKCcuanMtc2xpZGVyJyk7XHJcbiAgICB0aGlzLiRzbGlkZXJSb290RWxlbWVudCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLXNsaWRlcl9fcm9vdCcpO1xyXG4gICAgdGhpcy5zbGlkZXIgPSB0aGlzLiRzbGlkZXJSb290RWxlbWVudFxyXG4gICAgICAuTWV0YVNsaWRlcigpXHJcbiAgICAgIC5NZXRhU2xpZGVyKCdzZXRPcHRpb25zJywge1xyXG4gICAgICAgIG9uQ2hhbmdlOiAob3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93VmFsdWVzKG9wdGlvbnMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93VmFsdWVzKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICBjb25zdCAkc2xpZGVyVmFsdWVzID0gdGhpcy4kZWxlbWVudC5maW5kKCcuanMtc2xpZGVyX192YWx1ZXMnKTtcclxuICAgIHRoaXMucGFuZWw/LnNldFZhbHVlKG9wdGlvbnMpO1xyXG4gICAgaWYgKHRoaXMuaXNEaXNwbGF5VmFsdWVzKSB7XHJcbiAgICAgICRzbGlkZXJWYWx1ZXMudGV4dChgZnJvbTogJHtvcHRpb25zLmZyb219OyB0bzogJHtvcHRpb25zLnRvfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0UGFuZWwoKTogdm9pZCB7XHJcbiAgICBjb25zdCAkc2xpZGVyUGFuZWxFbGVtZW50ID0gdGhpcy4kcm9vdC5maW5kKCcuanMtc2xpZGVyX19wYW5lbCcpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuc2xpZGVyLk1ldGFTbGlkZXIoJ2dldE9wdGlvbnMnKTtcclxuICAgIHRoaXMucGFuZWwgPSBuZXcgUGFuZWwoJHNsaWRlclBhbmVsRWxlbWVudCwgb3B0aW9ucyk7XHJcbiAgICB0aGlzLnBhbmVsLm9ic2VydmVyLnN1YnNjcmliZSh7XHJcbiAgICAgIGtleTogJ3NldHRpbmcnLFxyXG4gICAgICBvYnNlcnZlcjogdGhpcy5jaGFuZ2VTZXR0aW5ncy5iaW5kKHRoaXMpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNoYW5nZVNldHRpbmdzKHNldHRpbmc6IElPcHRpb25zKSB7XHJcbiAgICB0aGlzLnNsaWRlciA9IHRoaXMuc2xpZGVyLk1ldGFTbGlkZXIoJ3NldE9wdGlvbnMnLCBzZXR0aW5nKTtcclxuICAgIHRoaXMucGFuZWw/LnNldFZhbHVlKHRoaXMuc2xpZGVyLk1ldGFTbGlkZXIoJ2dldE9wdGlvbnMnKSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTbGlkZXI7XHJcbiIsImltcG9ydCBQcmVzZW50ZXIgZnJvbSAnLi9wcmVzZW50ZXIvUHJlc2VudGVyJztcclxuaW1wb3J0IHsgSU9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBJTWV0YVNsaWRlciBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5jbGFzcyBNZXRhU2xpZGVyIGltcGxlbWVudHMgSU1ldGFTbGlkZXIge1xyXG4gIHJlYWRvbmx5IHByZXNlbnRlcjogUHJlc2VudGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBvcHRpb25zOiBJT3B0aW9ucykge1xyXG4gICAgdGhpcy5wcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKGVsZW1lbnQsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE9wdGlvbnMob3B0aW9uczogSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgIHRoaXMucHJlc2VudGVyLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBJT3B0aW9ucyB7XHJcbiAgICByZXR1cm4gdGhpcy5wcmVzZW50ZXIuZ2V0T3B0aW9ucygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWV0YVNsaWRlcjtcclxuIiwiaW1wb3J0IHsgSUNvbmZpZywgSURlZmF1bHRzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuY29uc3QgZGVmYXVsdHM6IElEZWZhdWx0cyA9IHtcclxuICBtaW46IDEwLFxyXG4gIG1heDogNDAsXHJcbiAgc3RlcDogNCxcclxuICBmcm9tOiA4LFxyXG4gIHRvOiAyNCxcclxuICBpc1ZlcnRpY2FsOiBmYWxzZSxcclxuICBoYXNUaXA6IHRydWUsXHJcbiAgd2l0aFJhbmdlOiB0cnVlLFxyXG59O1xyXG5cclxuY29uc3QgdGVzdE9wdGlvbnM6IElEZWZhdWx0cyA9IHtcclxuICBtaW46IDAsXHJcbiAgbWF4OiAxMCxcclxuICBzdGVwOiAxLFxyXG4gIGZyb206IDIsXHJcbiAgdG86IDgsXHJcbiAgaXNWZXJ0aWNhbDogZmFsc2UsXHJcbiAgaGFzVGlwOiB0cnVlLFxyXG4gIHdpdGhSYW5nZTogdHJ1ZSxcclxufTtcclxuXHJcbmNvbnN0IHRlc3RDb25maWc6IElDb25maWcgPSB7XHJcbiAgLi4udGVzdE9wdGlvbnMsXHJcbiAgZnJvbVBvc2l0aW9uOiAxMDAsXHJcbiAgdG9Qb3NpdGlvbjogNDAwLFxyXG59O1xyXG5cclxuY29uc3QgdGVzdFBvc2l0aW9ucyA9IFtcclxuICB7IHZhbHVlOiAwLCBwb3NpdGlvbjogMCB9LFxyXG4gIHsgdmFsdWU6IDEsIHBvc2l0aW9uOiA1MCB9LFxyXG4gIHsgdmFsdWU6IDIsIHBvc2l0aW9uOiAxMDAgfSxcclxuICB7IHZhbHVlOiAzLCBwb3NpdGlvbjogMTUwIH0sXHJcbiAgeyB2YWx1ZTogNCwgcG9zaXRpb246IDIwMCB9LFxyXG4gIHsgdmFsdWU6IDUsIHBvc2l0aW9uOiAyNTAgfSxcclxuICB7IHZhbHVlOiA2LCBwb3NpdGlvbjogMzAwIH0sXHJcbiAgeyB2YWx1ZTogNywgcG9zaXRpb246IDM1MCB9LFxyXG4gIHsgdmFsdWU6IDgsIHBvc2l0aW9uOiA0MDAgfSxcclxuICB7IHZhbHVlOiA5LCBwb3NpdGlvbjogNDUwIH0sXHJcbiAgeyB2YWx1ZTogMTAsIHBvc2l0aW9uOiA1MDAgfSxcclxuXTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgZGVmYXVsdHMsIHRlc3RPcHRpb25zLCB0ZXN0Q29uZmlnLCB0ZXN0UG9zaXRpb25zLFxyXG59O1xyXG4iLCJpbXBvcnQgTWV0YVNsaWRlciBmcm9tICcuL01ldGFTbGlkZXInO1xyXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgZGVmYXVsdHMgfSBmcm9tICcuL2RlZmF1bHRzJztcclxuXHJcbmludGVyZmFjZSBJU2xpZGVyIHtcclxuICAobWV0aG9kPzogJ2luaXQnKTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAobWV0aG9kOiAnZ2V0T3B0aW9ucycpOiBJT3B0aW9ucztcclxuICAobWV0aG9kOiAnc2V0T3B0aW9ucycsIG9wdGlvbnM6IElPcHRpb25zKTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxufVxyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gIGludGVyZmFjZSBKUXVlcnkge1xyXG4gICAgTWV0YVNsaWRlcjogSVNsaWRlcjtcclxuICB9XHJcbn1cclxuaW50ZXJmYWNlIElNZXRob2RzIHtcclxuICBpbml0OiAob3B0aW9uczogSU9wdGlvbnMpID0+IHZvaWQ7XHJcbiAgc2V0T3B0aW9uczogKG9wdGlvbnM6IElPcHRpb25zKSA9PiB2b2lkO1xyXG4gIGdldE9wdGlvbnM6ICgpID0+IElPcHRpb25zO1xyXG59XHJcblxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICBjb25zdCBtZXRob2RzOiBJTWV0aG9kcyA9IHtcclxuICAgIGluaXQodGhpczogSlF1ZXJ5PEhUTUxFbGVtZW50Piwgb3B0aW9uczogSU9wdGlvbnMpIHtcclxuICAgICAgY29uc3QgY29uZmlnID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgY29uc3Qgc2xpZGVyID0gbmV3IE1ldGFTbGlkZXIodGhpcywgY29uZmlnKTtcclxuICAgICAgJC5lYWNoKGNvbmZpZywgKGtleSwgdmFsdWUpID0+IHtcclxuICAgICAgICB0aGlzLmF0dHIoYGRhdGEtJHtTdHJpbmcoa2V5KX1gLCBgJHt2YWx1ZX1gKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuZGF0YSgnc2xpZGVyJywgc2xpZGVyKTtcclxuICAgIH0sXHJcbiAgICBzZXRPcHRpb25zKHRoaXM6IEpRdWVyeTxIVE1MRWxlbWVudD4sIG9wdGlvbnM6IElPcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuZGF0YSgnc2xpZGVyJykuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5kYXRhKCdzbGlkZXInKS5nZXRPcHRpb25zKCk7XHJcbiAgICAgICQuZWFjaChjb25maWcsIChrZXksIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdHRyKGBkYXRhLSR7U3RyaW5nKGtleSl9YCwgYCR7dmFsdWV9YCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGdldE9wdGlvbnModGhpczogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICByZXR1cm4gdGhpcy5kYXRhKCdzbGlkZXInKS5nZXRPcHRpb25zKCk7XHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIG1ha2VTbGlkZXIobWV0aG9kPzogJ2luaXQnKTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICBmdW5jdGlvbiBtYWtlU2xpZGVyKG1ldGhvZDogJ2dldE9wdGlvbnMnKTogSU9wdGlvbnM7XHJcbiAgZnVuY3Rpb24gbWFrZVNsaWRlcihcclxuICAgIG1ldGhvZDoga2V5b2YgSU1ldGhvZHMsXHJcbiAgICBvcHRpb25zPzogSU9wdGlvbnNcclxuICApOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gIGZ1bmN0aW9uIG1ha2VTbGlkZXIoXHJcbiAgICB0aGlzOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LFxyXG4gICAgbWV0aG9kPzoga2V5b2YgSU1ldGhvZHMsXHJcbiAgICBvcHRpb25zPzogSU9wdGlvbnMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICBpZiAoIW1ldGhvZCB8fCBtZXRob2QgPT09ICdpbml0Jykge1xyXG4gICAgICBjb25zdCBkYXRhT3B0aW9ucyA9IHsgLi4uJHRoaXMuZGF0YSgpIH0gfHwge307XHJcbiAgICAgIG1ldGhvZHMuaW5pdC5hcHBseSgkdGhpcywgW29wdGlvbnMgfHwgZGF0YU9wdGlvbnNdKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBpZiAobWV0aG9kID09PSAnZ2V0T3B0aW9ucycpIHtcclxuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSgkdGhpcyk7XHJcbiAgICB9XHJcbiAgICBpZiAobWV0aG9kID09PSAnc2V0T3B0aW9ucycgJiYgb3B0aW9ucykge1xyXG4gICAgICBtZXRob2RzW21ldGhvZF0uYXBwbHkoJHRoaXMsIFtvcHRpb25zXSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgICQuZXJyb3IoYE1ldGhvZCAke21ldGhvZH0gZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnRvb2x0aXBgKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgJC5mbi5NZXRhU2xpZGVyID0gbWFrZVNsaWRlcjtcclxufShqUXVlcnkpKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1ldGFTbGlkZXI7XHJcbiIsImltcG9ydCB7XHJcbiAgSU9wdGlvbnMsXHJcbiAgSUNvbmZpZyxcclxuICBJQ29vcmRpbmF0ZXMsXHJcbiAgSVBvc2l0aW9ucyxcclxufSBmcm9tICcuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgSU1vZGVsIGZyb20gJy4vaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgZGVmYXVsdHMgfSBmcm9tICcuLi9kZWZhdWx0cyc7XHJcblxyXG5jbGFzcyBNb2RlbCBpbXBsZW1lbnRzIElNb2RlbCB7XHJcbiAgcHJpdmF0ZSBvcHRpb25zOiBJT3B0aW9ucztcclxuXHJcbiAgcHJpdmF0ZSBjb25maWc6IElDb25maWc7XHJcblxyXG4gIHByaXZhdGUgcG9zaXRpb25zOiBJUG9zaXRpb25zW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElPcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNyZWF0ZUNvbmZpZyh0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KHBvc2l0aW9uczogSVBvc2l0aW9uc1tdKTogdm9pZCB7XHJcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9ucztcclxuICAgIHRoaXMuY29ycmVjdENvbmZpZ0J5UG9zaXRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29ycmVjdFBhcmFtZXRlcnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpc0Zyb21IaWdoZXIgPSB0aGlzLmNvbmZpZy5mcm9tID4gdGhpcy5jb25maWcudG87XHJcbiAgICBpZiAodGhpcy5jb25maWcud2l0aFJhbmdlICYmIGlzRnJvbUhpZ2hlcikge1xyXG4gICAgICBjb25zdCB7IGZyb20sIGZyb21Qb3NpdGlvbiB9ID0geyAuLi50aGlzLmNvbmZpZyB9O1xyXG4gICAgICB0aGlzLmNvbmZpZy5mcm9tID0gdGhpcy5jb25maWcudG87XHJcbiAgICAgIHRoaXMuY29uZmlnLmZyb21Qb3NpdGlvbiA9IHRoaXMuY29uZmlnLnRvUG9zaXRpb247XHJcbiAgICAgIHRoaXMuY29uZmlnLnRvID0gZnJvbTtcclxuICAgICAgdGhpcy5jb25maWcudG9Qb3NpdGlvbiA9IGZyb21Qb3NpdGlvbjtcclxuICAgICAgdGhpcy5vcHRpb25zLm9uQ2hhbmdlPy5jYWxsKHRoaXMsIHRoaXMuZ2V0T3B0aW9ucygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGFuZ2VQYXJhbWV0ZXIoc2V0dGluZzogSUNvb3JkaW5hdGVzKTogdm9pZCB7XHJcbiAgICBjb25zdCBuZXdQYXJhbWV0ZXIgPSB0aGlzLnRha2VDbG9zZXN0UGFyYW1ldGVyKHNldHRpbmcpO1xyXG4gICAgY29uc3QgdHlwZSA9IHNldHRpbmcua2V5IHx8IHRoaXMuY3JlYXRlVHlwZShzZXR0aW5nKTtcclxuICAgIHRoaXMuY29uZmlnW3R5cGVdID0gbmV3UGFyYW1ldGVyLnZhbHVlO1xyXG4gICAgdGhpcy5jb25maWdbYCR7dHlwZX1Qb3NpdGlvbmBdID0gbmV3UGFyYW1ldGVyLnBvc2l0aW9uO1xyXG4gICAgdGhpcy5vcHRpb25zLm9uQ2hhbmdlPy5jYWxsKHRoaXMsIHRoaXMuZ2V0T3B0aW9ucygpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRPcHRpb25zKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gJC5leHRlbmQodGhpcy5vcHRpb25zLCB0aGlzLmNvbmZpZywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLmNyZWF0ZUNvbmZpZyhuZXdPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDb25maWcoKTogSUNvbmZpZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBJT3B0aW9ucyB7XHJcbiAgICBjb25zdCB7IGZyb21Qb3NpdGlvbiwgdG9Qb3NpdGlvbiwgLi4ub3B0aW9ucyB9ID0gdGhpcy5jb25maWc7XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIHN0YXRpYyB0YWtlQ2xvc2VzdEluZGV4KG51bTogbnVtYmVyLCBhcnJheTogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgY29uc3QgY2xvc2VzdCA9IGFycmF5LnJlZHVjZSgoYSwgYikgPT4gKE1hdGguYWJzKGIgLSBudW0pIDwgTWF0aC5hYnMoYSAtIG51bSkgPyBiIDogYSkpO1xyXG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YoY2xvc2VzdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNvbmZpZyhvcHRpb25zOiBJT3B0aW9ucyk6IElDb25maWcge1xyXG4gICAgbGV0IG5ld09wdGlvbnMgPSB0aGlzLmNvcnJlY3RUeXBlcyhvcHRpb25zKTtcclxuICAgIG5ld09wdGlvbnMgPSB0aGlzLmNvcnJlY3RWYWx1ZXMobmV3T3B0aW9ucyk7XHJcbiAgICByZXR1cm4gbmV3T3B0aW9ucztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29ycmVjdFR5cGVzKG9wdGlvbnM6IElPcHRpb25zID0gdGhpcy5vcHRpb25zKTogSUNvbmZpZyB7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zOiBJQ29uZmlnID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCB7XHJcbiAgICAgIGZyb21Qb3NpdGlvbjogMCxcclxuICAgICAgdG9Qb3NpdGlvbjogMCxcclxuICAgIH0pO1xyXG4gICAgbmV3T3B0aW9ucy5tYXggPSBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKG9wdGlvbnMubWF4KSlcclxuICAgICAgPyBOdW1iZXIob3B0aW9ucy5tYXgpXHJcbiAgICAgIDogZGVmYXVsdHMubWF4O1xyXG4gICAgbmV3T3B0aW9ucy5taW4gPSBOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKG9wdGlvbnMubWluKSlcclxuICAgICAgPyBOdW1iZXIob3B0aW9ucy5taW4pXHJcbiAgICAgIDogZGVmYXVsdHMubWluO1xyXG4gICAgbmV3T3B0aW9ucy5zdGVwID0gTnVtYmVyLmlzRmluaXRlKE51bWJlcihvcHRpb25zLnN0ZXApKVxyXG4gICAgICA/IE51bWJlcihvcHRpb25zLnN0ZXApXHJcbiAgICAgIDogZGVmYXVsdHMuc3RlcDtcclxuICAgIG5ld09wdGlvbnMuZnJvbSA9IE51bWJlci5pc0Zpbml0ZShOdW1iZXIob3B0aW9ucy5mcm9tKSlcclxuICAgICAgPyBOdW1iZXIob3B0aW9ucy5mcm9tKVxyXG4gICAgICA6IGRlZmF1bHRzLmZyb207XHJcbiAgICBuZXdPcHRpb25zLnRvID0gTnVtYmVyLmlzRmluaXRlKE51bWJlcihvcHRpb25zLnRvKSlcclxuICAgICAgPyBOdW1iZXIob3B0aW9ucy50bylcclxuICAgICAgOiBkZWZhdWx0cy50bztcclxuICAgIG5ld09wdGlvbnMuaXNWZXJ0aWNhbCA9IHR5cGVvZiBvcHRpb25zLmlzVmVydGljYWwgPT09ICdib29sZWFuJ1xyXG4gICAgICA/IG9wdGlvbnMuaXNWZXJ0aWNhbFxyXG4gICAgICA6IGRlZmF1bHRzLmlzVmVydGljYWw7XHJcbiAgICBuZXdPcHRpb25zLmhhc1RpcCA9IHR5cGVvZiBvcHRpb25zLmhhc1RpcCA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5oYXNUaXAgOiBkZWZhdWx0cy5oYXNUaXA7XHJcbiAgICBuZXdPcHRpb25zLndpdGhSYW5nZSA9IHR5cGVvZiBvcHRpb25zLndpdGhSYW5nZSA9PT0gJ2Jvb2xlYW4nXHJcbiAgICAgID8gb3B0aW9ucy53aXRoUmFuZ2VcclxuICAgICAgOiBkZWZhdWx0cy53aXRoUmFuZ2U7XHJcbiAgICByZXR1cm4gbmV3T3B0aW9ucztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29ycmVjdFZhbHVlcyhjb25maWc6IElDb25maWcgPSB0aGlzLmNvbmZpZyk6IElDb25maWcge1xyXG4gICAgY29uc3QgY29ycmVjdENvbmZpZyA9IHsgLi4uY29uZmlnIH07XHJcbiAgICBjb3JyZWN0Q29uZmlnLm1heCA9IGNvbmZpZy5tYXggPiBjb25maWcubWluID8gY29uZmlnLm1heCA6IGNvbmZpZy5taW47XHJcbiAgICBjb3JyZWN0Q29uZmlnLm1pbiA9IGNvbmZpZy5tYXggPiBjb25maWcubWluID8gY29uZmlnLm1pbiA6IGNvbmZpZy5tYXg7XHJcbiAgICBjb3JyZWN0Q29uZmlnLm1heCA9IGNvbmZpZy5tYXggPT09IGNvbmZpZy5taW4gPyBjb25maWcubWluICsgMTAgOiBjb3JyZWN0Q29uZmlnLm1heDtcclxuICAgIGNvbnN0IHJhbmdlID0gY29ycmVjdENvbmZpZy5tYXggLSBjb3JyZWN0Q29uZmlnLm1pbjtcclxuICAgIGNvcnJlY3RDb25maWcuc3RlcCA9IGNvcnJlY3RDb25maWcuc3RlcCA+IHJhbmdlID8gcmFuZ2UgOiBjb3JyZWN0Q29uZmlnLnN0ZXA7XHJcbiAgICBjb3JyZWN0Q29uZmlnLmZyb20gPSBjb25maWcuZnJvbSA8IGNvbmZpZy5taW4gPyBjb25maWcubWluIDogY29uZmlnLmZyb207XHJcbiAgICBjb3JyZWN0Q29uZmlnLnRvID0gY29uZmlnLnRvICYmIGNvbmZpZy50byA+IGNvbmZpZy5tYXggPyBjb25maWcubWF4IDogY29uZmlnLnRvO1xyXG4gICAgcmV0dXJuIGNvcnJlY3RDb25maWc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvcnJlY3RDb25maWdCeVBvc2l0aW9ucygpOiB2b2lkIHtcclxuICAgIFsnZnJvbScsICd0byddLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgY29ycmVjdEl0ZW0gPSBpdGVtIGFzICdmcm9tJyB8ICd0byc7XHJcbiAgICAgIGNvbnN0IHZhbHVlc0FyciA9IHRoaXMucG9zaXRpb25zLm1hcCgoZWwpID0+IGVsLnZhbHVlKTtcclxuICAgICAgY29uc3QgaW5kZXggPSBNb2RlbC50YWtlQ2xvc2VzdEluZGV4KHRoaXMuY29uZmlnW2NvcnJlY3RJdGVtXSwgdmFsdWVzQXJyKTtcclxuICAgICAgdGhpcy5jb25maWdbY29ycmVjdEl0ZW1dID0gdGhpcy5wb3NpdGlvbnNbaW5kZXhdLnZhbHVlO1xyXG4gICAgICB0aGlzLmNvbmZpZ1tgJHtjb3JyZWN0SXRlbX1Qb3NpdGlvbmBdID0gdGhpcy5wb3NpdGlvbnNbaW5kZXhdLnBvc2l0aW9uO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVR5cGUocGFyYW1ldGVyOiBJQ29vcmRpbmF0ZXMpOiAnZnJvbScgfCAndG8nIHtcclxuICAgIGlmICghdGhpcy5jb25maWcud2l0aFJhbmdlKSB7XHJcbiAgICAgIHJldHVybiAnZnJvbSc7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IHZhbHVlLCBwb3NpdGlvbiB9ID0gcGFyYW1ldGVyO1xyXG4gICAgbGV0IGluZGV4O1xyXG4gICAgaWYgKHZhbHVlICYmICFwb3NpdGlvbikge1xyXG4gICAgICBjb25zdCB2YWx1ZXMgPSBbdGhpcy5jb25maWcuZnJvbSwgdGhpcy5jb25maWcudG9dO1xyXG4gICAgICBpbmRleCA9IE1vZGVsLnRha2VDbG9zZXN0SW5kZXgodmFsdWUsIHZhbHVlcyk7XHJcbiAgICB9XHJcbiAgICBpZiAocG9zaXRpb24gJiYgIXZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFt0aGlzLmNvbmZpZy5mcm9tUG9zaXRpb24sIHRoaXMuY29uZmlnLnRvUG9zaXRpb25dO1xyXG4gICAgICBpbmRleCA9IE1vZGVsLnRha2VDbG9zZXN0SW5kZXgocG9zaXRpb24sIHBvc2l0aW9ucyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5kZXggPT09IDAgPyAnZnJvbScgOiAndG8nO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0YWtlQ2xvc2VzdFBhcmFtZXRlcihwYXJhbWV0ZXI6IElDb29yZGluYXRlcyk6IElQb3NpdGlvbnMge1xyXG4gICAgaWYgKHBhcmFtZXRlci5wb3NpdGlvbikge1xyXG4gICAgICBjb25zdCBpbmRleCA9IE1vZGVsLnRha2VDbG9zZXN0SW5kZXgoXHJcbiAgICAgICAgcGFyYW1ldGVyLnBvc2l0aW9uLFxyXG4gICAgICAgIHRoaXMucG9zaXRpb25zLm1hcCgoaXRlbSkgPT4gaXRlbS5wb3NpdGlvbiksXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhcmFtZXRlci52YWx1ZSkge1xyXG4gICAgICBjb25zdCBpbmRleCA9IE1vZGVsLnRha2VDbG9zZXN0SW5kZXgoXHJcbiAgICAgICAgcGFyYW1ldGVyLnZhbHVlLFxyXG4gICAgICAgIHRoaXMucG9zaXRpb25zLm1hcCgoaXRlbSkgPT4gaXRlbS52YWx1ZSksXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd3cm9uZyBwYXJhbWV0ZXJzJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuIiwiaW1wb3J0IElPYnNlcnZlciBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5jbGFzcyBPYnNlcnZlciBpbXBsZW1lbnRzIElPYnNlcnZlciB7XHJcbiAgcHVibGljIG9ic2VydmVyczogeyBrZXk6IHN0cmluZywgb2JzZXJ2ZXI6IChkYXRhOiBhbnkpID0+IHZvaWQgfVtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMub2JzZXJ2ZXJzID0gW107XHJcbiAgfVxyXG5cclxuICAvLyB1c2UgdHlwZSBhbnksIGNhdXNlIGFueSBjYW4gc3Vic2NyaWJlXHJcbiAgcHVibGljIHN1YnNjcmliZShmbjogeyBrZXk6IHN0cmluZywgb2JzZXJ2ZXI6IChkYXRhOiBhbnkpID0+IHZvaWQgfSk6IHZvaWQge1xyXG4gICAgdGhpcy5vYnNlcnZlcnMucHVzaChmbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbm90aWZ5KGtleTogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub2JzZXJ2ZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ua2V5ID09PSBrZXkpIHtcclxuICAgICAgICBpdGVtLm9ic2VydmVyKGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9ic2VydmVyO1xyXG4iLCJpbXBvcnQgeyBJT3B0aW9ucywgSUNvb3JkaW5hdGVzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IFZpZXcgZnJvbSAnLi4vdmlldy9WaWV3JztcclxuaW1wb3J0IElWaWV3IGZyb20gJy4uL3ZpZXcvaW50ZXJmYWNlJztcclxuaW1wb3J0IE1vZGVsIGZyb20gJy4uL21vZGVsL01vZGVsJztcclxuaW1wb3J0IElNb2RlbCBmcm9tICcuLi9tb2RlbC9pbnRlcmZhY2UnO1xyXG5pbXBvcnQgSVByZXNlbnRlciBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5jbGFzcyBQcmVzZW50ZXIgaW1wbGVtZW50cyBJUHJlc2VudGVyIHtcclxuICBwdWJsaWMgbW9kZWw6IElNb2RlbDtcclxuXHJcbiAgcHVibGljIHZpZXc6IElWaWV3O1xyXG5cclxuICBwcml2YXRlICRyb290OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBwcml2YXRlIG9wdGlvbnM6IElPcHRpb25zO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihyb290OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBvcHRpb25zOiBJT3B0aW9ucykge1xyXG4gICAgdGhpcy4kcm9vdCA9IHJvb3Q7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbCh0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IFZpZXcodGhpcy4kcm9vdCwgdGhpcy5tb2RlbC5nZXRDb25maWcoKSk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRPcHRpb25zKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGVsLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICB0aGlzLnZpZXcuY2hhbmdlQ29uZmlnKHRoaXMubW9kZWwuZ2V0Q29uZmlnKCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE9wdGlvbnMoKTogSU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwuZ2V0T3B0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy52aWV3Lm9ic2VydmVyLnN1YnNjcmliZSh7XHJcbiAgICAgIGtleTogJ2luaXQnLFxyXG4gICAgICBvYnNlcnZlcjogdGhpcy5pbml0UGFyYW1ldGVycy5iaW5kKHRoaXMpLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnZpZXcub2JzZXJ2ZXIuc3Vic2NyaWJlKHtcclxuICAgICAga2V5OiAnbW92ZUhhbmRsZScsXHJcbiAgICAgIG9ic2VydmVyOiB0aGlzLmNoYW5nZVBhcmFtZXRlcnMuYmluZCh0aGlzKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy52aWV3Lm9ic2VydmVyLnN1YnNjcmliZSh7XHJcbiAgICAgIGtleTogJ21vdmVFbmQnLFxyXG4gICAgICBvYnNlcnZlcjogdGhpcy5jb3JyZWN0UGFyYW1ldGVycy5iaW5kKHRoaXMpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRQYXJhbWV0ZXJzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RlbC5pbml0KHRoaXMudmlldy5nZXRQb3NpdGlvbnMoKSk7XHJcbiAgICB0aGlzLnZpZXcuc2V0UGFyYW1ldGVycyh0aGlzLm1vZGVsLmdldENvbmZpZygpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hhbmdlUGFyYW1ldGVycyhzZXR0aW5nOiBJQ29vcmRpbmF0ZXMpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kZWwuY2hhbmdlUGFyYW1ldGVyKHNldHRpbmcpO1xyXG4gICAgdGhpcy52aWV3LnNldFBhcmFtZXRlcnModGhpcy5tb2RlbC5nZXRDb25maWcoKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvcnJlY3RQYXJhbWV0ZXJzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RlbC5jb3JyZWN0UGFyYW1ldGVycygpO1xyXG4gICAgdGhpcy52aWV3LnNldFBhcmFtZXRlcnModGhpcy5tb2RlbC5nZXRDb25maWcoKSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcmVzZW50ZXI7XHJcbiIsImltcG9ydCB7IElDb25maWcsIElDb29yZGluYXRlcywgSVBvc2l0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi9vYnNlcnZlci9PYnNlcnZlcic7XHJcblxyXG5pbXBvcnQgJy4vc2xpZGVyLnNjc3MnO1xyXG5pbXBvcnQgSVZpZXcgZnJvbSAnLi9pbnRlcmZhY2UnO1xyXG5cclxuaW1wb3J0IFRyYWNrIGZyb20gJy4vZWxlbWVudHMvdHJhY2svVHJhY2snO1xyXG5pbXBvcnQgU2NhbGUgZnJvbSAnLi9lbGVtZW50cy9zY2FsZS9TY2FsZSc7XHJcbmltcG9ydCBIYW5kbGUgZnJvbSAnLi9lbGVtZW50cy9oYW5kbGUvSGFuZGxlJztcclxuaW1wb3J0IEludGVydmFsIGZyb20gJy4vZWxlbWVudHMvaW50ZXJ2YWwvSW50ZXJ2YWwnO1xyXG5pbXBvcnQgSVRyYWNrIGZyb20gJy4vZWxlbWVudHMvdHJhY2svaW50ZXJmYWNlJztcclxuaW1wb3J0IElTY2FsZSBmcm9tICcuL2VsZW1lbnRzL3NjYWxlL2ludGVyZmFjZSc7XHJcbmltcG9ydCBJSGFuZGxlIGZyb20gJy4vZWxlbWVudHMvaGFuZGxlL2ludGVyZmFjZSc7XHJcbmltcG9ydCBJSW50ZXJ2YWwgZnJvbSAnLi9lbGVtZW50cy9pbnRlcnZhbC9pbnRlcmZhY2UnO1xyXG5cclxuY2xhc3MgVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcclxuICBwdWJsaWMgb2JzZXJ2ZXI6IE9ic2VydmVyO1xyXG5cclxuICBwdWJsaWMgJHNsaWRlcjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgcHJpdmF0ZSAkcm9vdDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgcHJpdmF0ZSBjb25maWc6IElDb25maWc7XHJcblxyXG4gIHByaXZhdGUgdHJhY2s6IElUcmFjaztcclxuXHJcbiAgcHJpdmF0ZSBzY2FsZTogSVNjYWxlO1xyXG5cclxuICBwcml2YXRlIGZpcnN0SGFuZGxlOiBJSGFuZGxlO1xyXG5cclxuICBwcml2YXRlIHNlY29uZEhhbmRsZTogSUhhbmRsZSB8IG51bGw7XHJcblxyXG4gIHByaXZhdGUgaW50ZXJ2YWw6IElJbnRlcnZhbDtcclxuXHJcbiAgY29uc3RydWN0b3IoJHJvb3Q6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNvbmZpZzogSUNvbmZpZykge1xyXG4gICAgdGhpcy4kcm9vdCA9ICRyb290O1xyXG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IE9ic2VydmVyKCk7XHJcbiAgICB0aGlzLiRzbGlkZXIgPSBqUXVlcnkoJzxkaXY+Jyk7XHJcbiAgICB0aGlzLnRyYWNrID0gbmV3IFRyYWNrKHRoaXMuJHNsaWRlciwgdGhpcy5jb25maWcpO1xyXG4gICAgdGhpcy5zY2FsZSA9IG5ldyBTY2FsZSh0aGlzLiRzbGlkZXIsIHRoaXMuY29uZmlnKTtcclxuICAgIHRoaXMuZmlyc3RIYW5kbGUgPSBuZXcgSGFuZGxlKHRoaXMudHJhY2suZ2V0RWxlbWVudCgpLCB0aGlzLmNvbmZpZyk7XHJcbiAgICB0aGlzLnNlY29uZEhhbmRsZSA9IG51bGw7XHJcbiAgICB0aGlzLmludGVydmFsID0gbmV3IEludGVydmFsKHRoaXMudHJhY2suZ2V0RWxlbWVudCgpLCB0aGlzLmNvbmZpZyk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGFuZ2VDb25maWcoY29uZmlnOiBJQ29uZmlnKSB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIHRoaXMuc2NhbGUuc2V0Q29uZmlnKGNvbmZpZyk7XHJcbiAgICB0aGlzLnRvZ2dsZURpcmVjdGlvbigpO1xyXG4gICAgdGhpcy50b2dnbGVSYW5nZSgpO1xyXG4gICAgdGhpcy50b2dnbGVUaXAoKTtcclxuICAgIHRoaXMudHJhY2suZ2V0RWxlbWVudCgpLnJlYWR5KCgpID0+IHtcclxuICAgICAgdGhpcy5pbml0VHJhY2tQYXJhbWV0ZXJzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQb3NpdGlvbnMoKTogSVBvc2l0aW9uc1tdIHtcclxuICAgIHJldHVybiB0aGlzLnNjYWxlLmdldFBvc2l0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFBhcmFtZXRlcnMoY29uZmlnOiBJQ29uZmlnKTogdm9pZCB7XHJcbiAgICB0aGlzLmZpcnN0SGFuZGxlLm1vdmVIYW5kbGUoY29uZmlnLmZyb20sIGNvbmZpZy5mcm9tUG9zaXRpb24pO1xyXG4gICAgaWYgKGNvbmZpZy53aXRoUmFuZ2UpIHtcclxuICAgICAgdGhpcy5zZWNvbmRIYW5kbGU/Lm1vdmVIYW5kbGUoY29uZmlnLnRvLCBjb25maWcudG9Qb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbnRlcnZhbC5tb3ZlSW50ZXJ2YWwoY29uZmlnLmZyb21Qb3NpdGlvbiwgY29uZmlnLnRvUG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRUcmFja1BhcmFtZXRlcnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0cmFja1BhcmFtZXRlcnMgPSB0aGlzLnRyYWNrLmdldFRyYWNrUGFyYW1ldGVycygpO1xyXG4gICAgdGhpcy5zY2FsZS5pbml0UG9zaXRpb25zKHRyYWNrUGFyYW1ldGVycyk7XHJcbiAgICB0aGlzLmZpcnN0SGFuZGxlLnNldFRyYWNrUGFyYW1ldGVycyh0cmFja1BhcmFtZXRlcnMpO1xyXG4gICAgdGhpcy5zZWNvbmRIYW5kbGU/LnNldFRyYWNrUGFyYW1ldGVycyh0cmFja1BhcmFtZXRlcnMpO1xyXG4gICAgdGhpcy5vYnNlcnZlci5ub3RpZnkoJ2luaXQnLCBudWxsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuJHNsaWRlci5hZGRDbGFzcygnbWV0YS1zbGlkZXIganMtbWV0YS1zbGlkZXIgbWV0YS1zbGlkZXJfaG9yaXpvbnRhbCcpO1xyXG4gICAgdGhpcy4kc2xpZGVyLnByZXBlbmRUbyh0aGlzLiRyb290KTtcclxuICAgIHRoaXMudHJhY2sub2JzZXJ2ZXIuc3Vic2NyaWJlKHtcclxuICAgICAga2V5OiAndHJhY2tDbGljaycsXHJcbiAgICAgIG9ic2VydmVyOiB0aGlzLnRyYWNrQ2xpY2suYmluZCh0aGlzKSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zY2FsZS5vYnNlcnZlci5zdWJzY3JpYmUoe1xyXG4gICAgICBrZXk6ICdzY2FsZUNsaWNrJyxcclxuICAgICAgb2JzZXJ2ZXI6IHRoaXMuc2NhbGVDbGljay5iaW5kKHRoaXMpLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmZpcnN0SGFuZGxlLm9ic2VydmVyLnN1YnNjcmliZSh7XHJcbiAgICAgIGtleTogJ21vdXNlTW92ZScsXHJcbiAgICAgIG9ic2VydmVyOiB0aGlzLm1vdXNlTW92ZS5iaW5kKHRoaXMsICdmcm9tJyksXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZmlyc3RIYW5kbGUub2JzZXJ2ZXIuc3Vic2NyaWJlKHtcclxuICAgICAga2V5OiAnbW92ZUVuZCcsXHJcbiAgICAgIG9ic2VydmVyOiB0aGlzLm1vdXNlTW92ZUVuZC5iaW5kKHRoaXMpLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRyYWNrLmdldEVsZW1lbnQoKS5yZWFkeSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuaW5pdFRyYWNrUGFyYW1ldGVycygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZURpcmVjdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IHsgaXNWZXJ0aWNhbCB9ID0gdGhpcy5jb25maWc7XHJcbiAgICB0aGlzLiRzbGlkZXJcclxuICAgICAgLnJlbW92ZUNsYXNzKFxyXG4gICAgICAgIGlzVmVydGljYWwgPyAnbWV0YS1zbGlkZXJfaG9yaXpvbnRhbCcgOiAnbWV0YS1zbGlkZXJfdmVydGljYWwnLFxyXG4gICAgICApXHJcbiAgICAgIC5hZGRDbGFzcyhpc1ZlcnRpY2FsID8gJ21ldGEtc2xpZGVyX3ZlcnRpY2FsJyA6ICdtZXRhLXNsaWRlcl9ob3Jpem9udGFsJyk7XHJcbiAgICB0aGlzLnRyYWNrLnNldFZlcnRpY2FsKGlzVmVydGljYWwpO1xyXG4gICAgdGhpcy5maXJzdEhhbmRsZS5zZXRWZXJ0aWNhbChpc1ZlcnRpY2FsKTtcclxuICAgIHRoaXMuc2Vjb25kSGFuZGxlPy5zZXRWZXJ0aWNhbChpc1ZlcnRpY2FsKTtcclxuICAgIHRoaXMuaW50ZXJ2YWwuc2V0VmVydGljYWwoaXNWZXJ0aWNhbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZVJhbmdlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgeyB3aXRoUmFuZ2UsIGlzVmVydGljYWwgfSA9IHRoaXMuY29uZmlnO1xyXG4gICAgdGhpcy5pbnRlcnZhbC5zZXRSYW5nZSh3aXRoUmFuZ2UpO1xyXG4gICAgaWYgKHdpdGhSYW5nZSAmJiAhdGhpcy5zZWNvbmRIYW5kbGUpIHtcclxuICAgICAgdGhpcy5zZWNvbmRIYW5kbGUgPSBuZXcgSGFuZGxlKHRoaXMudHJhY2suZ2V0RWxlbWVudCgpLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgIHRoaXMuc2Vjb25kSGFuZGxlLnNldFZlcnRpY2FsKGlzVmVydGljYWwpO1xyXG4gICAgICB0aGlzLnNlY29uZEhhbmRsZS5vYnNlcnZlci5zdWJzY3JpYmUoe1xyXG4gICAgICAgIGtleTogJ21vdXNlTW92ZScsXHJcbiAgICAgICAgb2JzZXJ2ZXI6IHRoaXMubW91c2VNb3ZlLmJpbmQodGhpcywgJ3RvJyksXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNlY29uZEhhbmRsZS5vYnNlcnZlci5zdWJzY3JpYmUoe1xyXG4gICAgICAgIGtleTogJ21vdmVFbmQnLFxyXG4gICAgICAgIG9ic2VydmVyOiB0aGlzLm1vdXNlTW92ZUVuZC5iaW5kKHRoaXMpLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoIXdpdGhSYW5nZSAmJiB0aGlzLnNlY29uZEhhbmRsZSkge1xyXG4gICAgICB0aGlzLnNlY29uZEhhbmRsZS5nZXRFbGVtZW50KCkucmVtb3ZlKCk7XHJcbiAgICAgIHRoaXMuc2Vjb25kSGFuZGxlID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlVGlwKCk6IHZvaWQge1xyXG4gICAgY29uc3QgeyBoYXNUaXAgfSA9IHRoaXMuY29uZmlnO1xyXG4gICAgdGhpcy5maXJzdEhhbmRsZS50b2dnbGVUaXAoaGFzVGlwKTtcclxuICAgIHRoaXMuc2Vjb25kSGFuZGxlPy50b2dnbGVUaXAoaGFzVGlwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhY2tDbGljayhwb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBJQ29vcmRpbmF0ZXMgPSB7XHJcbiAgICAgIHBvc2l0aW9uLFxyXG4gICAgfTtcclxuICAgIHRoaXMub2JzZXJ2ZXIubm90aWZ5KCdtb3ZlSGFuZGxlJywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1vdXNlTW92ZShrZXk6ICdmcm9tJyB8ICd0bycsIG1vdXNlUG9zaXRpb246IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0aW9uczogSUNvb3JkaW5hdGVzID0ge1xyXG4gICAgICBrZXksXHJcbiAgICAgIHBvc2l0aW9uOiBtb3VzZVBvc2l0aW9uLFxyXG4gICAgfTtcclxuICAgIHRoaXMub2JzZXJ2ZXIubm90aWZ5KCdtb3ZlSGFuZGxlJywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1vdXNlTW92ZUVuZCgpOiB2b2lkIHtcclxuICAgIHRoaXMub2JzZXJ2ZXIubm90aWZ5KCdtb3ZlRW5kJywgbnVsbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNjYWxlQ2xpY2sodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0aW9uczogSUNvb3JkaW5hdGVzID0ge1xyXG4gICAgICB2YWx1ZSxcclxuICAgIH07XHJcbiAgICB0aGlzLm9ic2VydmVyLm5vdGlmeSgnbW92ZUhhbmRsZScsIG9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIiwiaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uLy4uLy4uL29ic2VydmVyL09ic2VydmVyJztcclxuaW1wb3J0IElPYnNlcnZlciBmcm9tICcuLi8uLi8uLi9vYnNlcnZlci9pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBJQ29uZmlnLCBJVHJhY2tQb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBJVGlwIGZyb20gJy4uL3RpcC9pbnRlcmZhY2UnO1xyXG5pbXBvcnQgVGlwIGZyb20gJy4uL3RpcC9UaXAnO1xyXG5pbXBvcnQgSUhhbmRsZSBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5jbGFzcyBIYW5kbGUgaW1wbGVtZW50cyBJSGFuZGxlIHtcclxuICBwdWJsaWMgb2JzZXJ2ZXI6IElPYnNlcnZlcjtcclxuXHJcbiAgcHJpdmF0ZSAkdHJhY2s6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gIHByaXZhdGUgJGhhbmRsZTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgcHJpdmF0ZSBpc1ZlcnRpY2FsOiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIHRpcDogSVRpcCB8IG51bGw7XHJcblxyXG4gIHByaXZhdGUgdHJhY2tTdGFydDogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSB0cmFja1dpZHRoOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcigkdHJhY2s6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNvbmZpZzogSUNvbmZpZykge1xyXG4gICAgdGhpcy4kdHJhY2sgPSAkdHJhY2s7XHJcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IE9ic2VydmVyKCk7XHJcbiAgICB0aGlzLmlzVmVydGljYWwgPSBjb25maWcuaXNWZXJ0aWNhbDtcclxuICAgIHRoaXMuJGhhbmRsZSA9IGpRdWVyeSgnPGRpdj4nKTtcclxuICAgIHRoaXMudGlwID0gbmV3IFRpcCh0aGlzLiRoYW5kbGUpO1xyXG4gICAgdGhpcy50cmFja1N0YXJ0ID0gbnVsbDtcclxuICAgIHRoaXMudHJhY2tXaWR0aCA9IG51bGw7XHJcbiAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VmVydGljYWwoaXNWZXJ0aWNhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRFbGVtZW50KCk6IEpRdWVyeTxIVE1MRWxlbWVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuJGhhbmRsZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRUcmFja1BhcmFtZXRlcnModHJhY2tQYXJhbWV0ZXJzOiBJVHJhY2tQb3NpdGlvbik6IHZvaWQge1xyXG4gICAgY29uc3QgeyB0cmFja1N0YXJ0LCB0cmFja1dpZHRoIH0gPSB0cmFja1BhcmFtZXRlcnM7XHJcbiAgICB0aGlzLnRyYWNrU3RhcnQgPSB0cmFja1N0YXJ0O1xyXG4gICAgdGhpcy50cmFja1dpZHRoID0gdHJhY2tXaWR0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBtb3ZlSGFuZGxlKGl0ZW06IG51bWJlciwgaXRlbVBvc2l0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuJGhhbmRsZS5jc3MoXHJcbiAgICAgIHRoaXMuaXNWZXJ0aWNhbCA/ICd0b3AnIDogJ2xlZnQnLFxyXG4gICAgICBgJHtpdGVtUG9zaXRpb24gLSAyMCAvIDJ9cHhgLFxyXG4gICAgKTtcclxuICAgIHRoaXMuJGhhbmRsZS5jc3ModGhpcy5pc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCcsICctNXB4Jyk7XHJcbiAgICB0aGlzLnRpcD8uY2hhbmdlVGlwKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZVRpcChoYXNUaXA6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmIChoYXNUaXAgJiYgIXRoaXMudGlwKSB7XHJcbiAgICAgIHRoaXMudGlwID0gbmV3IFRpcCh0aGlzLiRoYW5kbGUpO1xyXG4gICAgfSBlbHNlIGlmICghaGFzVGlwICYmIHRoaXMudGlwKSB7XHJcbiAgICAgIGNvbnN0IHRpcEVsZW1lbnQgPSB0aGlzLnRpcC5nZXRFbGVtZW50KCk7XHJcbiAgICAgIHRpcEVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgIHRoaXMudGlwID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBoYW5kbGVEcmFnU3RhcnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLiRoYW5kbGUuYWRkQ2xhc3MoJ21ldGEtc2xpZGVyX19oYW5kbGUganMtbWV0YS1zbGlkZXJfX2hhbmRsZScpO1xyXG4gICAgdGhpcy4kaGFuZGxlLmFwcGVuZFRvKHRoaXMuJHRyYWNrKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYmluZEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kaGFuZGxlLm9uKFxyXG4gICAgICAnbW91c2Vkb3duIHRvdWNoc3RhcnQnLFxyXG4gICAgICB0aGlzLmhhbmRsZUhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlSGFuZGxlTW91c2VEb3duKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZVRvdWNoTW92ZS5iaW5kKHRoaXMpKTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwIHRvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3ZlRW5kLmJpbmQodGhpcykpO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2RyYWdzdGFydCcsIEhhbmRsZS5oYW5kbGVEcmFnU3RhcnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVNb3VzZU1vdmUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBtb3VzZVBvc2l0aW9uID0gdGhpcy5pc1ZlcnRpY2FsXHJcbiAgICAgID8gKDxNb3VzZUV2ZW50PmV2ZW50KS5wYWdlWVxyXG4gICAgICA6ICg8TW91c2VFdmVudD5ldmVudCkucGFnZVg7XHJcbiAgICBjb25zdCB7IGNvcnJlY3RlZFBvc2l0aW9uLCBpc0luU2NhbGUgfSA9IHRoaXMuZ2V0Q29ycmVjdFBvc2l0aW9uKG1vdXNlUG9zaXRpb24pO1xyXG4gICAgaWYgKGlzSW5TY2FsZSkge1xyXG4gICAgICB0aGlzLm9ic2VydmVyLm5vdGlmeSgnbW91c2VNb3ZlJywgY29ycmVjdGVkUG9zaXRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRDb3JyZWN0UG9zaXRpb24oZXZlbnRQb3NpdGlvbjogbnVtYmVyKToge1xyXG4gICAgY29ycmVjdGVkUG9zaXRpb246IG51bWJlcjtcclxuICAgIGlzSW5TY2FsZTogYm9vbGVhbjtcclxuICB9IHtcclxuICAgIGlmICh0aGlzLnRyYWNrV2lkdGggJiYgdGhpcy50cmFja1N0YXJ0ICE9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGNvcnJlY3RlZFBvc2l0aW9uID0gTWF0aC5yb3VuZChldmVudFBvc2l0aW9uIC0gdGhpcy50cmFja1N0YXJ0KTtcclxuICAgICAgY29uc3QgaXNJblNjYWxlID0gY29ycmVjdGVkUG9zaXRpb24gPj0gMCAmJiBjb3JyZWN0ZWRQb3NpdGlvbiA8PSB0aGlzLnRyYWNrV2lkdGg7XHJcbiAgICAgIHJldHVybiB7IGNvcnJlY3RlZFBvc2l0aW9uLCBpc0luU2NhbGUgfTtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignd3JvbmcgdHJhY2sgcG9zaXRpb25zJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVRvdWNoTW92ZShldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRvdWNoZXMgPSAoPFRvdWNoRXZlbnQ+ZXZlbnQpPy50b3VjaGVzO1xyXG4gICAgY29uc3QgdG91Y2ggPSB0b3VjaGVzWzBdO1xyXG4gICAgY29uc3QgdG91Y2hQb3NpdGlvbiA9IHRoaXMuaXNWZXJ0aWNhbCA/IHRvdWNoLnBhZ2VZIDogdG91Y2gucGFnZVg7XHJcbiAgICBjb25zdCB7IGNvcnJlY3RlZFBvc2l0aW9uLCBpc0luU2NhbGUgfSA9IHRoaXMuZ2V0Q29ycmVjdFBvc2l0aW9uKHRvdWNoUG9zaXRpb24pO1xyXG4gICAgaWYgKHRvdWNoZXMgIT09IHVuZGVmaW5lZCAmJiBpc0luU2NhbGUpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlci5ub3RpZnkoJ21vdXNlTW92ZScsIGNvcnJlY3RlZFBvc2l0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTW92ZUVuZCgpOiB2b2lkIHtcclxuICAgICQoZG9jdW1lbnQpLm9mZignbW91c2Vtb3ZlIG1vdXNldXAgdG91Y2htb3ZlIHRvdWNoZW5kJyk7XHJcbiAgICB0aGlzLm9ic2VydmVyLm5vdGlmeSgnbW92ZUVuZCcsIDApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGFuZGxlO1xyXG4iLCJpbXBvcnQgeyBJQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IElJbnRlcnZhbCBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5jbGFzcyBJbnRlcnZhbCBpbXBsZW1lbnRzIElJbnRlcnZhbCB7XHJcbiAgcHJpdmF0ZSAkdHJhY2s6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gIHByaXZhdGUgJGludGVydmFsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBwcml2YXRlIGlzVmVydGljYWw6IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgd2l0aFJhbmdlOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcigkdHJhY2s6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNvbmZpZzogSUNvbmZpZykge1xyXG4gICAgdGhpcy4kdHJhY2sgPSAkdHJhY2s7XHJcbiAgICB0aGlzLiRpbnRlcnZhbCA9IGpRdWVyeSgnPGRpdj4nKTtcclxuICAgIHRoaXMuaXNWZXJ0aWNhbCA9IGNvbmZpZy5pc1ZlcnRpY2FsO1xyXG4gICAgdGhpcy53aXRoUmFuZ2UgPSBjb25maWcud2l0aFJhbmdlO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0VmVydGljYWwoaXNWZXJ0aWNhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRSYW5nZSh3aXRoUmFuZ2U6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMud2l0aFJhbmdlID0gd2l0aFJhbmdlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVJbnRlcnZhbChmcm9tUG9zaXRpb246IG51bWJlciwgdG9Qb3NpdGlvbjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBsZXQgbWluOiBudW1iZXI7XHJcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcclxuICAgIGNvbnN0IGhhbmRsZVdpZHRoID0gMjA7XHJcbiAgICBjb25zdCBnYXAgPSAyOyAvLyB0byBtYWtlIGEgZ2FwIGJldHdlZW4gaW50ZXJ2YWwgYW5kIGhhbmRsZVxyXG4gICAgaWYgKHRoaXMud2l0aFJhbmdlKSB7XHJcbiAgICAgIG1pbiA9IE1hdGgubWluKGZyb21Qb3NpdGlvbiwgdG9Qb3NpdGlvbikgKyBoYW5kbGVXaWR0aCAvIDI7XHJcbiAgICAgIHdpZHRoID0gTWF0aC5hYnModG9Qb3NpdGlvbiAtIGZyb21Qb3NpdGlvbikgLSBoYW5kbGVXaWR0aCAtIGdhcDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1pbiA9IDA7XHJcbiAgICAgIHdpZHRoID0gZnJvbVBvc2l0aW9uIC0gaGFuZGxlV2lkdGggLyAyIC0gZ2FwO1xyXG4gICAgfVxyXG4gICAgd2lkdGggPSB3aWR0aCA+IDAgPyB3aWR0aCA6IDA7XHJcbiAgICB0aGlzLiRpbnRlcnZhbC5jc3ModGhpcy5pc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xyXG4gICAgdGhpcy4kaW50ZXJ2YWwuY3NzKHRoaXMuaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JywgJzEwcHgnKTtcclxuICAgIHRoaXMuJGludGVydmFsLmNzcyh0aGlzLmlzVmVydGljYWwgPyAndG9wJyA6ICdsZWZ0JywgYCR7bWlufXB4YCk7XHJcbiAgICB0aGlzLiRpbnRlcnZhbC5jc3ModGhpcy5pc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCcsICcwcHgnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuJGludGVydmFsLmFkZENsYXNzKCdtZXRhLXNsaWRlcl9faW50ZXJ2YWwganMtbWV0YS1zbGlkZXJfX2ludGVydmFsJyk7XHJcbiAgICB0aGlzLiRpbnRlcnZhbC5hcHBlbmRUbyh0aGlzLiR0cmFjayk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnRlcnZhbDtcclxuIiwiaW1wb3J0IHtcclxuICBJQ29uZmlnLFxyXG4gIElQb3NpdGlvbnMsXHJcbiAgSVRyYWNrUG9zaXRpb24sXHJcbn0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuaW1wb3J0IE9ic2VydmVyIGZyb20gJy4uLy4uLy4uL29ic2VydmVyL09ic2VydmVyJztcclxuaW1wb3J0IElPYnNlcnZlciBmcm9tICcuLi8uLi8uLi9vYnNlcnZlci9pbnRlcmZhY2UnO1xyXG5pbXBvcnQgSVNjYWxlIGZyb20gJy4vaW50ZXJmYWNlJztcclxuXHJcbmNsYXNzIFNjYWxlIGltcGxlbWVudHMgSVNjYWxlIHtcclxuICBwdWJsaWMgb2JzZXJ2ZXI6IElPYnNlcnZlcjtcclxuXHJcbiAgcHJpdmF0ZSAkc2xpZGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBwcml2YXRlIGNvbmZpZzogSUNvbmZpZztcclxuXHJcbiAgcHJpdmF0ZSAkc2NhbGU6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gIHByaXZhdGUgcG9zaXRpb25zOiBJUG9zaXRpb25zW107XHJcblxyXG4gIHByaXZhdGUgaXRlbVdpZHRoOiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgc2NhbGVTaXplOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3Rvcigkc2xpZGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBjb25maWc6IElDb25maWcpIHtcclxuICAgIHRoaXMuJHNsaWRlciA9ICRzbGlkZXI7XHJcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIoKTtcclxuICAgIHRoaXMuJHNjYWxlID0galF1ZXJ5KCc8ZGl2PicpO1xyXG4gICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcclxuICAgIHRoaXMuaXRlbVdpZHRoID0gMjA7XHJcbiAgICB0aGlzLnNjYWxlU2l6ZSA9IG51bGw7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRDb25maWcoY29uZmlnOiBJQ29uZmlnKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0UG9zaXRpb25zKHRyYWNrUGFyYW1ldGVyczogSVRyYWNrUG9zaXRpb24pOiB2b2lkIHtcclxuICAgIHRoaXMuc2NhbGVTaXplID0gdHJhY2tQYXJhbWV0ZXJzLnRyYWNrV2lkdGg7XHJcbiAgICBjb25zdCB7IG1pbiwgbWF4LCBzdGVwIH0gPSB0aGlzLmNvbmZpZztcclxuICAgIGNvbnN0IHJhbmdlID0gbWF4IC0gbWluO1xyXG4gICAgY29uc3Qgc3RlcEFycmF5ID0gc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJyk7XHJcbiAgICBjb25zdCBmcmFjdGlvbmFsTGVuZ3RoID0gc3RlcEFycmF5Lmxlbmd0aCA9PT0gMiA/IDEwICoqIHN0ZXBBcnJheVsxXS5sZW5ndGggOiAxO1xyXG4gICAgY29uc3Qgc3RlcExlbmd0aCA9ICh0aGlzLnNjYWxlU2l6ZSAvIHJhbmdlKSAqIHN0ZXA7XHJcbiAgICBjb25zdCBhcnJTdGVwID0gc3RlcExlbmd0aCA8IDEgPyBNYXRoLmZsb29yKDEgLyBzdGVwTGVuZ3RoKSA6IDE7XHJcbiAgICBjb25zdCBzdGVwc0NvdW50ID0gTWF0aC5mbG9vcihyYW5nZSAvIHN0ZXAgLyBhcnJTdGVwKTtcclxuICAgIGNvbnN0IGVtcHR5QXJyID0gQXJyYXkoc3RlcHNDb3VudCArIDEpO1xyXG4gICAgY29uc3QgbXVsdGlwbHlTdGVwID0gc3RlcCAqIDEwICogYXJyU3RlcDtcclxuICAgIGNvbnN0IHBvc2l0aW9uTGVuZ3RoID0gc3RlcExlbmd0aCAqIGFyclN0ZXA7XHJcbiAgICBsZXQgcG9zaXRpb25zOiBJUG9zaXRpb25zW10gPSBbXTtcclxuICAgIGNvbnN0IHZhbHVlc0FyciA9IEFycmF5LmZyb20oXHJcbiAgICAgIGVtcHR5QXJyLFxyXG4gICAgICAoXywgaSkgPT4gbWluXHJcbiAgICAgICAgKyBNYXRoLnJvdW5kKG11bHRpcGx5U3RlcCAqIGkgKiBmcmFjdGlvbmFsTGVuZ3RoKVxyXG4gICAgICAgICAgLyAoMTAgKiBmcmFjdGlvbmFsTGVuZ3RoKSxcclxuICAgICk7XHJcbiAgICBwb3NpdGlvbnMgPSB2YWx1ZXNBcnIubWFwKChlbCwgaSkgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gTWF0aC5yb3VuZChlbCAqIGZyYWN0aW9uYWxMZW5ndGgpIC8gZnJhY3Rpb25hbExlbmd0aDtcclxuICAgICAgY29uc3QgcG9zaXRpb24gPSBNYXRoLnJvdW5kKHBvc2l0aW9uTGVuZ3RoICogaSk7XHJcbiAgICAgIHJldHVybiB7IHZhbHVlLCBwb3NpdGlvbiB9O1xyXG4gICAgfSk7XHJcbiAgICBpZiAodmFsdWVzQXJyW3ZhbHVlc0Fyci5sZW5ndGggLSAxXSAhPT0gbWF4KSB7XHJcbiAgICAgIHBvc2l0aW9ucy5wdXNoKHsgdmFsdWU6IG1heCwgcG9zaXRpb246IHRoaXMuc2NhbGVTaXplIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XHJcbiAgICB0aGlzLmluaXRTY2FsZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBvc2l0aW9ucygpOiBJUG9zaXRpb25zW10ge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25zO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHJlZHVjZUFycmF5KGFycmF5OiBJUG9zaXRpb25zW10sIHNpemU6IG51bWJlcik6IElQb3NpdGlvbnNbXSB7XHJcbiAgICBjb25zdCBpc3Bvc2l0aW9uc1NtYWxsID0gYXJyYXkubGVuZ3RoIDwgc2l6ZTtcclxuICAgIGlmIChpc3Bvc2l0aW9uc1NtYWxsKSB7XHJcbiAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuICAgIGNvbnN0IGFycmF5U3RlcCA9IE1hdGgucm91bmQoYXJyYXkubGVuZ3RoIC8gc2l6ZSk7XHJcbiAgICBjb25zdCBjb3JyZWN0ZWRBcnJheSA9IGFycmF5LmZpbHRlcigoaXRlbSwgaSkgPT4ge1xyXG4gICAgICBjb25zdCBpc0l0ZW1FcXVpdmFsZW50U3RlcCA9IGkgJSBhcnJheVN0ZXAgPT09IDA7XHJcbiAgICAgIGNvbnN0IGlzTGFzdEl0ZW0gPSBpID09PSBhcnJheS5sZW5ndGggLSAxO1xyXG4gICAgICBpZiAoaXNJdGVtRXF1aXZhbGVudFN0ZXAgfHwgaXNMYXN0SXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvcnJlY3RlZEFycmF5O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvcnJlY3RMYXN0SXRlbXMoYXJyYXk6IElQb3NpdGlvbnNbXSwgd2lkdGg6IG51bWJlcik6IElQb3NpdGlvbnNbXSB7XHJcbiAgICBjb25zdCBjb3JyZWN0ZWRBcnJheSA9IFsuLi5hcnJheV07XHJcbiAgICBjb25zdCBsYXN0SXRlbVBvc2l0aW9uID0gTnVtYmVyKGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdLnBvc2l0aW9uKTtcclxuICAgIGNvbnN0IHByZXZMYXN0SXRlbVBvc2l0aW9uID0gTnVtYmVyKGFycmF5W2FycmF5Lmxlbmd0aCAtIDJdLnBvc2l0aW9uKTtcclxuICAgIGNvbnN0IGlzU21hbGxQbGFjZUluRW5kID0gTWF0aC5hYnMocHJldkxhc3RJdGVtUG9zaXRpb24gLSBsYXN0SXRlbVBvc2l0aW9uKSA8IHdpZHRoO1xyXG4gICAgaWYgKGlzU21hbGxQbGFjZUluRW5kKSB7XHJcbiAgICAgIGNvcnJlY3RlZEFycmF5LnNwbGljZShhcnJheS5sZW5ndGggLSAyLCAxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb3JyZWN0ZWRBcnJheTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuJHNjYWxlLmFkZENsYXNzKCdtZXRhLXNsaWRlcl9fc2NhbGUganMtbWV0YS1zbGlkZXJfX3NjYWxlJyk7XHJcbiAgICB0aGlzLiRzY2FsZS5hcHBlbmRUbyh0aGlzLiRzbGlkZXIpO1xyXG4gICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFNjYWxlKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kc2NhbGUuZW1wdHkoKTtcclxuICAgIHRoaXMuaXRlbVdpZHRoID0gdGhpcy50YWtlV2lkdGgoKTtcclxuICAgIHRoaXMuYWRkVmFsdWVzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRha2VXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgY29uc3Qgd2lkdGhBcnI6IG51bWJlcltdID0gW107XHJcbiAgICBjb25zdCBzaXplID0gdGhpcy5jb25maWcuaXNWZXJ0aWNhbCA/ICdoZWlnaHQnIDogJ3dpZHRoJztcclxuICAgIHRoaXMucG9zaXRpb25zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgJHNjYWxlSXRlbSA9IGpRdWVyeSgnPGRpdj4nLCB7IHRleHQ6IGl0ZW0udmFsdWUgfSkuYXBwZW5kVG8oXHJcbiAgICAgICAgdGhpcy4kc2NhbGUsXHJcbiAgICAgICk7XHJcbiAgICAgICRzY2FsZUl0ZW0uY3NzKHNpemUsICdtaW4tY29udGVudCcpO1xyXG4gICAgICBjb25zdCBpdGVtV2lkdGggPSB0aGlzLmNvbmZpZy5pc1ZlcnRpY2FsXHJcbiAgICAgICAgPyAkc2NhbGVJdGVtLmhlaWdodCgpXHJcbiAgICAgICAgOiAkc2NhbGVJdGVtLndpZHRoKCk7XHJcbiAgICAgIHdpZHRoQXJyLnB1c2goaXRlbVdpZHRoIHx8IDApO1xyXG4gICAgICAkc2NhbGVJdGVtLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgd2lkdGhBcnIpICsgMTA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZFZhbHVlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNjYWxlQXJyID0gdGhpcy5jb3JyZWN0U2NhbGVBcnIoKTtcclxuICAgIGNvbnN0ICRzY2FsZVJvdyA9IGpRdWVyeSgnPGRpdj4nLCB7XHJcbiAgICAgIGNsYXNzOiAnbWV0YS1zbGlkZXJfX3NjYWxlLXJvdyBqcy1tZXRhLXNsaWRlcl9fc2NhbGUtcm93JyxcclxuICAgIH0pO1xyXG4gICAgc2NhbGVBcnIuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGl0ZW0ucG9zaXRpb24gLSB0aGlzLml0ZW1XaWR0aCAvIDI7XHJcbiAgICAgIGNvbnN0ICRzY2FsZUl0ZW0gPSB0aGlzLmNyZWF0ZUl0ZW0oaXRlbSwgcG9zaXRpb24pO1xyXG4gICAgICAkc2NhbGVSb3cuYXBwZW5kKCRzY2FsZUl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLiRzY2FsZS5hcHBlbmQoJHNjYWxlUm93KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29ycmVjdFNjYWxlQXJyKCk6IElQb3NpdGlvbnNbXSB7XHJcbiAgICBpZiAodGhpcy5zY2FsZVNpemUpIHtcclxuICAgICAgY29uc3QgbWF4U3RlcHNDb3VudCA9IE1hdGguZmxvb3IodGhpcy5zY2FsZVNpemUgLyB0aGlzLml0ZW1XaWR0aCk7XHJcbiAgICAgIGNvbnN0IHNjYWxlQXJyOiBJUG9zaXRpb25zW10gPSBTY2FsZS5yZWR1Y2VBcnJheShcclxuICAgICAgICB0aGlzLnBvc2l0aW9ucyxcclxuICAgICAgICBtYXhTdGVwc0NvdW50LFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBjb3JyZWN0ZWRTY2FsZUFyciA9IFNjYWxlLmNvcnJlY3RMYXN0SXRlbXMoXHJcbiAgICAgICAgc2NhbGVBcnIsXHJcbiAgICAgICAgdGhpcy5pdGVtV2lkdGgsXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiBjb3JyZWN0ZWRTY2FsZUFycjtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcignd3Jvbmcgc2l6ZSBvZiBzY2FsZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVJdGVtKGl0ZW06IElQb3NpdGlvbnMsIHBvc2l0aW9uOiBudW1iZXIpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgIGNvbnN0ICRzY2FsZUl0ZW0gPSBqUXVlcnkoJzxkaXY+Jywge1xyXG4gICAgICBjbGFzczogJ21ldGEtc2xpZGVyX19zY2FsZS1pdGVtIGpzLW1ldGEtc2xpZGVyX19zY2FsZS1pdGVtJyxcclxuICAgICAgc3R5bGU6IHRoaXMuY29uZmlnLmlzVmVydGljYWxcclxuICAgICAgICA/IGB0b3A6ICR7cG9zaXRpb259cHg7IGxpbmUtaGVpZ2h0OiAke3RoaXMuaXRlbVdpZHRofXB4YFxyXG4gICAgICAgIDogYGxlZnQ6ICR7cG9zaXRpb259cHhgLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCAkbGluZSA9IGpRdWVyeSgnPGRpdj4nLCB7XHJcbiAgICAgIGNsYXNzOiAnbWV0YS1zbGlkZXJfX2xpbmUnLFxyXG4gICAgICB0ZXh0OiB0aGlzLmNvbmZpZy5pc1ZlcnRpY2FsID8gJ1xcdTIwMTQnIDogJ3wnLFxyXG4gICAgfSk7XHJcbiAgICAkbGluZS5hcHBlbmRUbygkc2NhbGVJdGVtKTtcclxuICAgIGNvbnN0ICR2YWx1ZSA9IGpRdWVyeSgnPGRpdj4nLCB7XHJcbiAgICAgIGNsYXNzOiAnbWV0YS1zbGlkZXJfX3ZhbHVlIGpzLW1ldGEtc2xpZGVyX192YWx1ZScsXHJcbiAgICAgICdkYXRhLXZhbHVlJzogaXRlbS52YWx1ZSxcclxuICAgICAgdGV4dDogaXRlbS52YWx1ZSxcclxuICAgICAgc3R5bGU6IHRoaXMuY29uZmlnLmlzVmVydGljYWxcclxuICAgICAgICA/IGBoZWlnaHQ6ICR7dGhpcy5pdGVtV2lkdGh9cHhgXHJcbiAgICAgICAgOiBgd2lkdGg6ICR7dGhpcy5pdGVtV2lkdGh9cHhgLFxyXG4gICAgfSk7XHJcbiAgICAkdmFsdWUuYXBwZW5kVG8oJHNjYWxlSXRlbSk7XHJcbiAgICByZXR1cm4gJHNjYWxlSXRlbTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYmluZEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgJCh0aGlzLiRzY2FsZSkub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVNjYWxlQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVNjYWxlQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCB7IG9ic2VydmVyIH0gPSB0aGlzO1xyXG4gICAgaWYgKCg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLmRhdGFzZXQudmFsdWUpIHtcclxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gTnVtYmVyKFxyXG4gICAgICAgICg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLmRhdGFzZXQudmFsdWUsXHJcbiAgICAgICk7XHJcbiAgICAgIG9ic2VydmVyLm5vdGlmeSgnc2NhbGVDbGljaycsIGN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2FsZTtcclxuIiwiaW1wb3J0IElUaXAgZnJvbSAnLi9pbnRlcmZhY2UnO1xyXG5cclxuY2xhc3MgVGlwIGltcGxlbWVudHMgSVRpcCB7XHJcbiAgcHJpdmF0ZSAkaGFuZGxlOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBwcml2YXRlICR0aXA6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRoYW5kbGU6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgIHRoaXMuJGhhbmRsZSA9ICRoYW5kbGU7XHJcbiAgICB0aGlzLiR0aXAgPSBqUXVlcnkoJzxkaXY+Jyk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGFuZ2VUaXAoaXRlbTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLiR0aXAuaHRtbChgJHtpdGVtfWApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEVsZW1lbnQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB7XHJcbiAgICByZXR1cm4gdGhpcy4kdGlwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy4kdGlwLmFkZENsYXNzKCdtZXRhLXNsaWRlcl9fdGlwIGpzLW1ldGEtc2xpZGVyX190aXAnKTtcclxuICAgIHRoaXMuJHRpcC5hcHBlbmRUbyh0aGlzLiRoYW5kbGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlwO1xyXG4iLCJpbXBvcnQgeyBJQ29uZmlnLCBJVHJhY2tQb3NpdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBPYnNlcnZlciBmcm9tICcuLi8uLi8uLi9vYnNlcnZlci9PYnNlcnZlcic7XHJcbmltcG9ydCBJT2JzZXJ2ZXIgZnJvbSAnLi4vLi4vLi4vb2JzZXJ2ZXIvaW50ZXJmYWNlJztcclxuaW1wb3J0IElUcmFjayBmcm9tICcuL2ludGVyZmFjZSc7XHJcblxyXG5jbGFzcyBUcmFjayBpbXBsZW1lbnRzIElUcmFjayB7XHJcbiAgcHVibGljIG9ic2VydmVyOiBJT2JzZXJ2ZXI7XHJcblxyXG4gIHByaXZhdGUgJHNsaWRlcjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgcHJpdmF0ZSAkdHJhY2s6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gIHByaXZhdGUgaXNWZXJ0aWNhbDogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSB0cmFja1N0YXJ0OiBudW1iZXIgfCBudWxsO1xyXG5cclxuICBwcml2YXRlIHRyYWNrV2lkdGg6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRzbGlkZXI6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNvbmZpZzogSUNvbmZpZykge1xyXG4gICAgdGhpcy4kc2xpZGVyID0gJHNsaWRlcjtcclxuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIoKTtcclxuICAgIHRoaXMuJHRyYWNrID0galF1ZXJ5KCc8ZGl2PicpO1xyXG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gY29uZmlnLmlzVmVydGljYWw7XHJcbiAgICB0aGlzLnRyYWNrU3RhcnQgPSBudWxsO1xyXG4gICAgdGhpcy50cmFja1dpZHRoID0gbnVsbDtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFZlcnRpY2FsKGlzVmVydGljYWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuaXNWZXJ0aWNhbCA9IGlzVmVydGljYWw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RWxlbWVudCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgIHJldHVybiB0aGlzLiR0cmFjaztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRUcmFja1BhcmFtZXRlcnMoKTogSVRyYWNrUG9zaXRpb24ge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLiR0cmFjay5wb3NpdGlvbigpO1xyXG4gICAgdGhpcy50cmFja1N0YXJ0ID0gdGhpcy5pc1ZlcnRpY2FsXHJcbiAgICAgID8gTnVtYmVyKHBvc2l0aW9uLnRvcClcclxuICAgICAgOiBOdW1iZXIocG9zaXRpb24ubGVmdCk7XHJcbiAgICBjb25zdCB0cmFja1dpZHRoID0gdGhpcy5pc1ZlcnRpY2FsXHJcbiAgICAgID8gdGhpcy4kdHJhY2suY3NzKCdoZWlnaHQnKVxyXG4gICAgICA6IHRoaXMuJHRyYWNrLmNzcygnd2lkdGgnKTtcclxuICAgIHRoaXMudHJhY2tXaWR0aCA9IHBhcnNlRmxvYXQodHJhY2tXaWR0aCk7XHJcbiAgICByZXR1cm4geyB0cmFja1N0YXJ0OiB0aGlzLnRyYWNrU3RhcnQsIHRyYWNrV2lkdGg6IHRoaXMudHJhY2tXaWR0aCB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy4kdHJhY2suYWRkQ2xhc3MoJ21ldGEtc2xpZGVyX190cmFjayBqcy1tZXRhLXNsaWRlcl9fdHJhY2snKTtcclxuICAgIHRoaXMuJHRyYWNrLmFwcGVuZFRvKHRoaXMuJHNsaWRlcik7XHJcbiAgICB0aGlzLmJpbmRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBiaW5kRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLiR0cmFjay5vbignY2xpY2snLCB0aGlzLmhhbmRsZVRyYWNrQ2xpY2suYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVRyYWNrQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBtb3VzZVBvc2l0aW9uID0gdGhpcy5pc1ZlcnRpY2FsXHJcbiAgICAgID8gKDxNb3VzZUV2ZW50PmV2ZW50KS5wYWdlWVxyXG4gICAgICA6ICg8TW91c2VFdmVudD5ldmVudCkucGFnZVg7XHJcbiAgICBpZiAodGhpcy50cmFja1N0YXJ0ICE9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gTWF0aC5yb3VuZChtb3VzZVBvc2l0aW9uIC0gdGhpcy50cmFja1N0YXJ0KTtcclxuICAgICAgdGhpcy5vYnNlcnZlci5ub3RpZnkoJ3RyYWNrQ2xpY2snLCBwb3NpdGlvbik7XHJcbiAgICB9IGVsc2UgeyB0aHJvdyBuZXcgRXJyb3IoJ3dyb25nIHRyYWNrIHN0YXJ0Jyk7IH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRyYWNrO1xyXG4iLCJmdW5jdGlvbiByZXF1aXJlQWxsKHJlcXVpcmVDb250ZXh0KSB7XHJcbiAgcmV0dXJuIHJlcXVpcmVDb250ZXh0LmtleXMoKS5tYXAocmVxdWlyZUNvbnRleHQpO1xyXG59XHJcblxyXG5yZXF1aXJlQWxsKHJlcXVpcmUuY29udGV4dCgnQGQnLCB0cnVlLCAvXFwuc2NzcyQvKSk7XHJcbnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KCdAZCcsIHRydWUsIC9cXC5qcyQvKSk7IiwiaW1wb3J0IE1haW4gZnJvbSAnLi9NYWluLnRzJztcclxuXHJcbmNvbnN0ICRtYWluRWxlbWVudCA9ICQoJy5qcy1tYWluJyk7XHJcbmNvbnN0IG1haW4gPSBuZXcgTWFpbigkbWFpbkVsZW1lbnQpO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2pxdWVyeV9kaXN0X2pxdWVyeV9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL2RlbW8uanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyJPYnNlcnZlciIsIklucHV0IiwiJHJvb3QiLCJrZXkiLCJ2YWx1ZSIsIm5hbWUiLCJ0eXBlIiwib2JzZXJ2ZXIiLCJzZXRWYWx1ZSIsImJpbmRFdmVudExpc3RlbmVycyIsInZhbCIsInByb3AiLCJvbiIsImhhbmRsZUlucHV0VmFsdWVDaGFuZ2UiLCJiaW5kIiwiZXZlbnQiLCJ0YXJnZXQiLCJjaGVja2VkIiwic2V0dGluZyIsImlzU3RlcExvd2VyWmVybyIsIm5vdGlmeSIsIlNsaWRlciIsIk1haW4iLCIkZWxlbWVudCIsInNsaWRlcnMiLCJpbml0IiwiJHNsaWRlcnMiLCJmaW5kIiwiZWFjaCIsImluZGV4IiwiaXRlbSIsInNsaWRlciIsIiQiLCJwdXNoIiwiZGlzcGxheVZhbHVlcyIsIlBhbmVsIiwib3B0aW9ucyIsIiRwYW5lbCIsImlucHV0cyIsImluaXRQYW5lbCIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwiaW5wdXQiLCJ0byIsInNldERpc2FibGUiLCJlbGVtZW50Iiwic2VhcmNoZXIiLCIkaW5wdXRFbGVtZW50Iiwic3Vic2NyaWJlIiwiY2hhbmdlT3B0aW9ucyIsImhhbmRsZVBhbmVsRm9ybVN1Ym1pdCIsIiRzbGlkZXJSb290RWxlbWVudCIsInBhbmVsIiwiaXNEaXNwbGF5VmFsdWVzIiwiaXNEaXNwbGF5IiwiTWV0YVNsaWRlciIsIm9uQ2hhbmdlIiwic2hvd1ZhbHVlcyIsIiRzbGlkZXJWYWx1ZXMiLCJ0ZXh0IiwiZnJvbSIsIiRzbGlkZXJQYW5lbEVsZW1lbnQiLCJjaGFuZ2VTZXR0aW5ncyIsIlByZXNlbnRlciIsInByZXNlbnRlciIsInNldE9wdGlvbnMiLCJnZXRPcHRpb25zIiwiZGVmYXVsdHMiLCJtaW4iLCJtYXgiLCJzdGVwIiwiaXNWZXJ0aWNhbCIsImhhc1RpcCIsIndpdGhSYW5nZSIsInRlc3RPcHRpb25zIiwidGVzdENvbmZpZyIsImZyb21Qb3NpdGlvbiIsInRvUG9zaXRpb24iLCJ0ZXN0UG9zaXRpb25zIiwicG9zaXRpb24iLCJtZXRob2RzIiwiY29uZmlnIiwiZXh0ZW5kIiwiYXR0ciIsIlN0cmluZyIsImRhdGEiLCJtYWtlU2xpZGVyIiwibWV0aG9kIiwiJHRoaXMiLCJkYXRhT3B0aW9ucyIsImFwcGx5IiwiZXJyb3IiLCJmbiIsImpRdWVyeSIsIk1vZGVsIiwiY3JlYXRlQ29uZmlnIiwicG9zaXRpb25zIiwiY29ycmVjdENvbmZpZ0J5UG9zaXRpb25zIiwiaXNGcm9tSGlnaGVyIiwiY2FsbCIsIm5ld1BhcmFtZXRlciIsInRha2VDbG9zZXN0UGFyYW1ldGVyIiwiY3JlYXRlVHlwZSIsIm5ld09wdGlvbnMiLCJjb3JyZWN0VHlwZXMiLCJjb3JyZWN0VmFsdWVzIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJjb3JyZWN0Q29uZmlnIiwicmFuZ2UiLCJjb3JyZWN0SXRlbSIsInZhbHVlc0FyciIsIm1hcCIsImVsIiwidGFrZUNsb3Nlc3RJbmRleCIsInBhcmFtZXRlciIsInZhbHVlcyIsIkVycm9yIiwibnVtIiwiYXJyYXkiLCJjbG9zZXN0IiwicmVkdWNlIiwiYSIsImIiLCJNYXRoIiwiYWJzIiwiaW5kZXhPZiIsIm9ic2VydmVycyIsIlZpZXciLCJyb290IiwibW9kZWwiLCJ2aWV3IiwiZ2V0Q29uZmlnIiwiY2hhbmdlQ29uZmlnIiwiaW5pdFBhcmFtZXRlcnMiLCJjaGFuZ2VQYXJhbWV0ZXJzIiwiY29ycmVjdFBhcmFtZXRlcnMiLCJnZXRQb3NpdGlvbnMiLCJzZXRQYXJhbWV0ZXJzIiwiY2hhbmdlUGFyYW1ldGVyIiwiVHJhY2siLCJTY2FsZSIsIkhhbmRsZSIsIkludGVydmFsIiwiJHNsaWRlciIsInRyYWNrIiwic2NhbGUiLCJmaXJzdEhhbmRsZSIsImdldEVsZW1lbnQiLCJzZWNvbmRIYW5kbGUiLCJpbnRlcnZhbCIsInNldENvbmZpZyIsInRvZ2dsZURpcmVjdGlvbiIsInRvZ2dsZVJhbmdlIiwidG9nZ2xlVGlwIiwicmVhZHkiLCJpbml0VHJhY2tQYXJhbWV0ZXJzIiwibW92ZUhhbmRsZSIsIm1vdmVJbnRlcnZhbCIsInRyYWNrUGFyYW1ldGVycyIsImdldFRyYWNrUGFyYW1ldGVycyIsImluaXRQb3NpdGlvbnMiLCJzZXRUcmFja1BhcmFtZXRlcnMiLCJhZGRDbGFzcyIsInByZXBlbmRUbyIsInRyYWNrQ2xpY2siLCJzY2FsZUNsaWNrIiwibW91c2VNb3ZlIiwibW91c2VNb3ZlRW5kIiwicmVtb3ZlQ2xhc3MiLCJzZXRWZXJ0aWNhbCIsInNldFJhbmdlIiwicmVtb3ZlIiwibW91c2VQb3NpdGlvbiIsIlRpcCIsIiR0cmFjayIsIiRoYW5kbGUiLCJ0aXAiLCJ0cmFja1N0YXJ0IiwidHJhY2tXaWR0aCIsIml0ZW1Qb3NpdGlvbiIsImNzcyIsImNoYW5nZVRpcCIsInRpcEVsZW1lbnQiLCJhcHBlbmRUbyIsImhhbmRsZUhhbmRsZU1vdXNlRG93biIsInByZXZlbnREZWZhdWx0IiwiZG9jdW1lbnQiLCJoYW5kbGVNb3VzZU1vdmUiLCJoYW5kbGVUb3VjaE1vdmUiLCJoYW5kbGVNb3ZlRW5kIiwiaGFuZGxlRHJhZ1N0YXJ0IiwicGFnZVkiLCJwYWdlWCIsImdldENvcnJlY3RQb3NpdGlvbiIsImNvcnJlY3RlZFBvc2l0aW9uIiwiaXNJblNjYWxlIiwiZXZlbnRQb3NpdGlvbiIsInJvdW5kIiwidG91Y2hlcyIsInRvdWNoIiwidG91Y2hQb3NpdGlvbiIsInVuZGVmaW5lZCIsIm9mZiIsIiRpbnRlcnZhbCIsIndpZHRoIiwiaGFuZGxlV2lkdGgiLCJnYXAiLCIkc2NhbGUiLCJpdGVtV2lkdGgiLCJzY2FsZVNpemUiLCJzdGVwQXJyYXkiLCJ0b1N0cmluZyIsInNwbGl0IiwiZnJhY3Rpb25hbExlbmd0aCIsImxlbmd0aCIsInN0ZXBMZW5ndGgiLCJhcnJTdGVwIiwiZmxvb3IiLCJzdGVwc0NvdW50IiwiZW1wdHlBcnIiLCJBcnJheSIsIm11bHRpcGx5U3RlcCIsInBvc2l0aW9uTGVuZ3RoIiwiXyIsImkiLCJpbml0U2NhbGUiLCJlbXB0eSIsInRha2VXaWR0aCIsImFkZFZhbHVlcyIsIndpZHRoQXJyIiwic2l6ZSIsIiRzY2FsZUl0ZW0iLCJoZWlnaHQiLCJzY2FsZUFyciIsImNvcnJlY3RTY2FsZUFyciIsIiRzY2FsZVJvdyIsImNyZWF0ZUl0ZW0iLCJhcHBlbmQiLCJtYXhTdGVwc0NvdW50IiwicmVkdWNlQXJyYXkiLCJjb3JyZWN0ZWRTY2FsZUFyciIsImNvcnJlY3RMYXN0SXRlbXMiLCJzdHlsZSIsIiRsaW5lIiwiJHZhbHVlIiwiaGFuZGxlU2NhbGVDbGljayIsImRhdGFzZXQiLCJjdXJyZW50VmFsdWUiLCJpc3Bvc2l0aW9uc1NtYWxsIiwiYXJyYXlTdGVwIiwiY29ycmVjdGVkQXJyYXkiLCJmaWx0ZXIiLCJpc0l0ZW1FcXVpdmFsZW50U3RlcCIsImlzTGFzdEl0ZW0iLCJsYXN0SXRlbVBvc2l0aW9uIiwicHJldkxhc3RJdGVtUG9zaXRpb24iLCJpc1NtYWxsUGxhY2VJbkVuZCIsInNwbGljZSIsIiR0aXAiLCJodG1sIiwidG9wIiwibGVmdCIsInBhcnNlRmxvYXQiLCJoYW5kbGVUcmFja0NsaWNrIiwicmVxdWlyZUFsbCIsInJlcXVpcmVDb250ZXh0Iiwia2V5cyIsInJlcXVpcmUiLCJjb250ZXh0IiwiJG1haW5FbGVtZW50IiwibWFpbiJdLCJzb3VyY2VSb290IjoiIn0=