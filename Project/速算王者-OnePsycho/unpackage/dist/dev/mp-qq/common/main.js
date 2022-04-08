(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],[
/* 0 */
/*!************************************!*\
  !*** E:/Psycho/Arithmetic/main.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ 4);var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 5));

var _home = _interopRequireDefault(__webpack_require__(/*! ./pages/main/home.vue */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
_vue.default.component('BaseMain', _home.default);var cuCustom = function cuCustom() {__webpack_require__.e(/*! require.ensure | colorui/components/cu-custom */ "colorui/components/cu-custom").then((function () {return resolve(__webpack_require__(/*! ./colorui/components/cu-custom.vue */ 31));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};


_vue.default.component('cu-custom', cuCustom);

_vue.default.config.productionTip = false;

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["createApp"]))

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/*!************************************!*\
  !*** E:/Psycho/Arithmetic/App.vue ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 6);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 8);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 6 */
/*!*************************************************************!*\
  !*** E:/Psycho/Arithmetic/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 7);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 7 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Psycho/Arithmetic/App.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  onLaunch: function onLaunch() {
    uni.getSystemInfo({
      success: function success(e) {










        _vue.default.prototype.StatusBar = e.statusBarHeight;
        var capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          _vue.default.prototype.Custom = capsule;
          // Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
          _vue.default.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          _vue.default.prototype.CustomBar = e.statusBarHeight + 50;
        }







      } });


    _vue.default.prototype.ColorList = [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42' },

    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d' },

    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08' },

    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f' },

    {
      title: '森绿',
      name: 'green',
      color: '#39b54a' },

    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4' },

    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff' },

    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6' },

    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0' },

    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997' },

    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f' },

    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3' },

    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa' },

    {
      title: '墨黑',
      name: 'black',
      color: '#333333' },

    {
      title: '雅白',
      name: 'white',
      color: '#ffffff' }];



  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["default"]))

/***/ }),
/* 8 */
/*!*********************************************************************!*\
  !*** E:/Psycho/Arithmetic/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 9);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 9 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Psycho/Arithmetic/App.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 10 */,
/* 11 */
/*!************************************************!*\
  !*** E:/Psycho/Arithmetic/pages/main/home.vue ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.vue?vue&type=template&id=367c7ccc&name=components& */ 12);
/* harmony import */ var _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.vue?vue&type=script&lang=js& */ 14);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _home_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.vue?vue&type=style&index=0&lang=less& */ 20);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__["render"],
  _home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/main/home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 12 */
/*!***********************************************************************************************!*\
  !*** E:/Psycho/Arithmetic/pages/main/home.vue?vue&type=template&id=367c7ccc&name=components& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=template&id=367c7ccc&name=components& */ 13);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_template_id_367c7ccc_name_components___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 13 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Psycho/Arithmetic/pages/main/home.vue?vue&type=template&id=367c7ccc&name=components& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 14 */
/*!*************************************************************************!*\
  !*** E:/Psycho/Arithmetic/pages/main/home.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=script&lang=js& */ 15);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 15 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Psycho/Arithmetic/pages/main/home.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




























































var _listTwoReduce = _interopRequireDefault(__webpack_require__(/*! ../../utils/list-two-reduce.js */ 16));
var _listTwoAdd = _interopRequireDefault(__webpack_require__(/*! ../../utils/list-two-add.js */ 17));
var _listTwoRide = _interopRequireDefault(__webpack_require__(/*! ../../utils/list-two-ride.js */ 18));
var _listThreeAdd = _interopRequireDefault(__webpack_require__(/*! ../../utils/list-three-add.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { data: function data() {return { numsList: [0, 1, 2, 3, 4, 5, 6, 7, 8], curAnswer: '', curIndex: 0, curProgress: 0, numA: null, numB: null, count: 10, nums: null, type: null, min: 0, minStr: '', second: 0, secStr: '', ms: 0, msStr: '', timer: null, isShowModal: false, questionList: [] };}, onLoad: function onLoad(options) {if (options) {this.type = options.type;this.count = options.count;this.init();}}, created: function created(options) {if (options) {this.type = options.type;this.count = options.count;this.init();}}, onShareAppMessage: function onShareAppMessage(res) {if (res.from === 'button') {var typeStr = this.type === 'twoAdd' ? '两位数加法' : this.type === 'twoReduce' ? '两位数减法' : this.type === 'twoRide' ? '两位数乘法' : '三位数加法';return { title: this.count + '道' + typeStr + '速算我只用了 ' + this.minStr + ':' + this.secStr + ':' + this.msStr + ' 就完成了，你呢？', imageUrl: 'https://onepsycho.bj.bcebos.com/bg-share.png', path: '/pages/welcome/home' };} else if (res.from === 'menu') {return { title: '速算王者-你速算有我厉害吗?', imageUrl: 'https://onepsycho.bj.bcebos.com/bg-share.png', path: '/pages/welcome/home' };}}, onShareTimeline: function onShareTimeline() {}, methods: { init: function init() {
      var list = this.type === 'twoAdd' ? _listTwoAdd.default : this.type === 'twoReduce' ? _listTwoReduce.default : this.type === 'twoRide' ? _listTwoRide.default : _listThreeAdd.default;
      this.questionList = this.getRandomArrayElements(list.default, this.count);
      this.numA = this.questionList[0].a;
      this.numB = this.questionList[0].b;
      clearInterval(this.timer);
      this.timer = setInterval(this.show, 10);
    },

    hideModal: function hideModal() {
      this.isShowModal = false;
    },

    onConfirm: function onConfirm() {
      uni.reLaunch({
        url: '/pages/welcome/home' });

    },

    show: function show() {
      var min = this.min;
      var sec = this.second;
      var ms = this.ms;

      ms++;
      if (sec == 60) {
        min++;sec = 0;
      }
      if (ms == 100) {
        sec++;ms = 0;
      }
      var msStr = ms;
      if (ms < 10) {
        msStr = "0" + ms;
      }
      var secStr = sec;
      if (sec < 10) {
        secStr = "0" + sec;
      }
      var minStr = min;
      if (min < 10) {
        minStr = "0" + min;
      }
      this.minStr = minStr;
      this.secStr = secStr;
      this.msStr = msStr;

      this.min = min;
      this.second = sec;
      this.ms = ms;
    },

    onItemClick: function onItemClick(val) {
      if (val === 'cancel') {
        this.curAnswer = '';
      } else if (val === 'OK') {
        if (this.curIndex < this.count - 1) {
          if (+this.curAnswer === this.questionList[this.curIndex].c) {
            this.curProgress = (this.curIndex + 1) / this.count * 100;
            this.curIndex += 1;
            this.numA = this.questionList[this.curIndex].a;
            this.numB = this.questionList[this.curIndex].b;
            this.curAnswer = '';
          } else {
            this.curAnswer = '';
          }

        } else {
          clearInterval(this.timer);
          this.isShowModal = true;
        }

      } else {
        this.curAnswer = this.curAnswer + val;
      }
    },

    getRandomArrayElements: function getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0),i = arr.length,min = i - count,temp,index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    } },

  destroyed: function destroyed() {
    clearInterval(this.timer);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-qq/dist/index.js */ 1)["default"]))

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/*!**********************************************************************************!*\
  !*** E:/Psycho/Arithmetic/pages/main/home.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=style&index=0&lang=less& */ 21);
/* harmony import */ var _F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_F_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_F_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_F_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_F_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_home_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 21 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Psycho/Arithmetic/pages/main/home.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vbWFpbi5qcyIsbnVsbCwid2VicGFjazovLy9FOi9Qc3ljaG8vQXJpdGhtZXRpYy9BcHAudnVlP2QzZTIiLCJ1bmktYXBwOi8vL0FwcC52dWUiLCJ3ZWJwYWNrOi8vL0U6L1BzeWNoby9Bcml0aG1ldGljL0FwcC52dWU/NDZiMiIsIndlYnBhY2s6Ly8vRTovUHN5Y2hvL0FyaXRobWV0aWMvQXBwLnZ1ZT9mMGQ0Iiwid2VicGFjazovLy9FOi9Qc3ljaG8vQXJpdGhtZXRpYy9wYWdlcy9tYWluL2hvbWUudnVlPzIzOWIiLCJ3ZWJwYWNrOi8vL0U6L1BzeWNoby9Bcml0aG1ldGljL3BhZ2VzL21haW4vaG9tZS52dWU/Zjk3MCIsIndlYnBhY2s6Ly8vRTovUHN5Y2hvL0FyaXRobWV0aWMvcGFnZXMvbWFpbi9ob21lLnZ1ZT82YTJkIiwid2VicGFjazovLy9FOi9Qc3ljaG8vQXJpdGhtZXRpYy9wYWdlcy9tYWluL2hvbWUudnVlPzg3ZjQiLCJ1bmktYXBwOi8vL3BhZ2VzL21haW4vaG9tZS52dWUiLCJ3ZWJwYWNrOi8vL0U6L1BzeWNoby9Bcml0aG1ldGljL3BhZ2VzL21haW4vaG9tZS52dWU/ZjYzYyIsIndlYnBhY2s6Ly8vRTovUHN5Y2hvL0FyaXRobWV0aWMvcGFnZXMvbWFpbi9ob21lLnZ1ZT82YmJiIl0sIm5hbWVzIjpbIlZ1ZSIsImNvbXBvbmVudCIsIm1haW4iLCJjdUN1c3RvbSIsImNvbmZpZyIsInByb2R1Y3Rpb25UaXAiLCJBcHAiLCJtcFR5cGUiLCJhcHAiLCIkbW91bnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztpREFBQSx3Q0FBbUI7QUFDbkI7O0FBRUEseUY7QUFDQUEsYUFBSUMsU0FBSixDQUFjLFVBQWQsRUFBeUJDLGFBQXpCLEU7OztBQUdBRixhQUFJQyxTQUFKLENBQWMsV0FBZCxFQUEwQkUsUUFBMUI7O0FBRUFILGFBQUlJLE1BQUosQ0FBV0MsYUFBWCxHQUEyQixLQUEzQjs7QUFFQUMsYUFBSUMsTUFBSixHQUFhLEtBQWI7O0FBRUEsSUFBTUMsR0FBRyxHQUFHLElBQUlSLFlBQUo7QUFDTE0sWUFESyxFQUFaOztBQUdBLFVBQUFFLEdBQUcsRUFBQ0MsTUFBSixHOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ3VEO0FBQ0w7QUFDYTs7O0FBRy9EO0FBQ3FLO0FBQ3JLLGdCQUFnQiwrS0FBVTtBQUMxQixFQUFFLHlFQUFNO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDZSxnRjs7Ozs7Ozs7Ozs7QUN2QmY7QUFBQTtBQUFBO0FBQUE7QUFBNmxCLENBQWdCLHVuQkFBRyxFQUFDLEM7Ozs7Ozs7Ozs7OztBQ0NqbkIscUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUpBLE1BSUE7QUFDQTtBQUNBOzs7Ozs7OztBQVFBLE9BNUJBOzs7QUErQkE7QUFDQSxpQkFEQTtBQUVBLGlCQUZBO0FBR0Esc0JBSEE7O0FBS0E7QUFDQSxpQkFEQTtBQUVBLG9CQUZBO0FBR0Esc0JBSEEsRUFMQTs7QUFVQTtBQUNBLGlCQURBO0FBRUEsb0JBRkE7QUFHQSxzQkFIQSxFQVZBOztBQWVBO0FBQ0EsaUJBREE7QUFFQSxtQkFGQTtBQUdBLHNCQUhBLEVBZkE7O0FBb0JBO0FBQ0EsaUJBREE7QUFFQSxtQkFGQTtBQUdBLHNCQUhBLEVBcEJBOztBQXlCQTtBQUNBLGlCQURBO0FBRUEsa0JBRkE7QUFHQSxzQkFIQSxFQXpCQTs7QUE4QkE7QUFDQSxpQkFEQTtBQUVBLGtCQUZBO0FBR0Esc0JBSEEsRUE5QkE7O0FBbUNBO0FBQ0EsaUJBREE7QUFFQSxvQkFGQTtBQUdBLHNCQUhBLEVBbkNBOztBQXdDQTtBQUNBLGlCQURBO0FBRUEsbUJBRkE7QUFHQSxzQkFIQSxFQXhDQTs7QUE2Q0E7QUFDQSxpQkFEQTtBQUVBLGtCQUZBO0FBR0Esc0JBSEEsRUE3Q0E7O0FBa0RBO0FBQ0EsaUJBREE7QUFFQSxtQkFGQTtBQUdBLHNCQUhBLEVBbERBOztBQXVEQTtBQUNBLGlCQURBO0FBRUEsa0JBRkE7QUFHQSxzQkFIQSxFQXZEQTs7QUE0REE7QUFDQSxpQkFEQTtBQUVBLGtCQUZBO0FBR0Esc0JBSEEsRUE1REE7O0FBaUVBO0FBQ0EsaUJBREE7QUFFQSxtQkFGQTtBQUdBLHNCQUhBLEVBakVBOztBQXNFQTtBQUNBLGlCQURBO0FBRUEsbUJBRkE7QUFHQSxzQkFIQSxFQXRFQTs7OztBQTZFQSxHQTlHQSxFOzs7Ozs7Ozs7Ozs7QUNGQTtBQUFBO0FBQUE7QUFBQTtBQUErMkIsQ0FBZ0IsZzNCQUFHLEVBQUMsQzs7Ozs7Ozs7OztBQ0FuNEI7QUFDQSxPQUFPLEtBQVUsRUFBRSxrQkFLZDs7Ozs7Ozs7Ozs7OztBQ05MO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFpSTtBQUNqSTtBQUN3RDtBQUNMO0FBQ2M7OztBQUdqRTtBQUNxSztBQUNySyxnQkFBZ0IsK0tBQVU7QUFDMUIsRUFBRSwwRUFBTTtBQUNSLEVBQUUsK0ZBQU07QUFDUixFQUFFLHdHQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG1HQUFVO0FBQ1o7QUFDQTs7QUFFQTtBQUNlLGdGOzs7Ozs7Ozs7OztBQ3ZCZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQThsQixDQUFnQix3bkJBQUcsRUFBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM2RGxuQjtBQUNBO0FBQ0E7QUFDQSx5Rzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQ0EsRUFFQSxJQUZBLGtCQUVBLENBQ0EsU0FDQSxxQ0FEQSxFQUVBLGFBRkEsRUFHQSxXQUhBLEVBSUEsY0FKQSxFQUtBLFVBTEEsRUFNQSxVQU5BLEVBT0EsU0FQQSxFQVFBLFVBUkEsRUFTQSxVQVRBLEVBVUEsTUFWQSxFQVdBLFVBWEEsRUFZQSxTQVpBLEVBYUEsVUFiQSxFQWNBLEtBZEEsRUFlQSxTQWZBLEVBZ0JBLFdBaEJBLEVBaUJBLGtCQWpCQSxFQWtCQSxnQkFsQkEsR0FvQkEsQ0F2QkEsRUF3QkEsTUF4QkEsa0JBd0JBLE9BeEJBLEVBd0JBLENBQ0EsY0FDQSx5QkFDQSwyQkFDQSxZQUNBLENBQ0EsQ0E5QkEsRUErQkEsT0EvQkEsbUJBK0JBLE9BL0JBLEVBK0JBLENBQ0EsY0FDQSx5QkFDQSwyQkFDQSxZQUNBLENBQ0EsQ0FyQ0EsRUFzQ0EsaUJBdENBLDZCQXNDQSxHQXRDQSxFQXNDQSxDQUNBLDRCQUNBLG1JQUNBLFNBQ0EsZ0hBREEsRUFFQSx3REFGQSxFQUdBLDJCQUhBLEdBS0EsQ0FQQSxNQU9BLDBCQUNBLFNBQ0EsdUJBREEsRUFFQSx3REFGQSxFQUdBLDJCQUhBLEdBS0EsQ0FFQSxDQXREQSxFQXVEQSxlQXZEQSw2QkF1REEsQ0FFQSxDQXpEQSxFQTBEQSxXQUNBLElBREEsa0JBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQVJBOztBQVVBLGFBVkEsdUJBVUE7QUFDQTtBQUNBLEtBWkE7O0FBY0EsYUFkQSx1QkFjQTtBQUNBO0FBQ0Esa0NBREE7O0FBR0EsS0FsQkE7O0FBb0JBLFFBcEJBLGtCQW9CQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQW5EQTs7QUFxREEsZUFyREEsdUJBcURBLEdBckRBLEVBcURBO0FBQ0E7QUFDQTtBQUNBLE9BRkEsTUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FOQSxNQU1BO0FBQ0E7QUFDQTs7QUFFQSxTQVhBLE1BV0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FqQkEsTUFpQkE7QUFDQTtBQUNBO0FBQ0EsS0E1RUE7O0FBOEVBLDBCQTlFQSxrQ0E4RUEsR0E5RUEsRUE4RUEsS0E5RUEsRUE4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0F2RkEsRUExREE7O0FBbUpBLFdBbkpBLHVCQW1KQTtBQUNBO0FBQ0EsR0FySkEsRTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQTtBQUFBO0FBQUE7QUFBQTtBQUFzbUMsQ0FBZ0IsZ2xDQUFHLEVBQUMsQzs7Ozs7Ozs7OztBQ0ExbkM7QUFDQSxPQUFPLEtBQVUsRUFBRSxrQkFLZCIsImZpbGUiOiJjb21tb24vbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndW5pLXBhZ2VzJztpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCdcclxuXHJcbmltcG9ydCBtYWluIGZyb20gJy4vcGFnZXMvbWFpbi9ob21lLnZ1ZSdcclxuVnVlLmNvbXBvbmVudCgnQmFzZU1haW4nLG1haW4pXHJcblxyXG5pbXBvcnQgY3VDdXN0b20gZnJvbSAnLi9jb2xvcnVpL2NvbXBvbmVudHMvY3UtY3VzdG9tLnZ1ZSdcclxuVnVlLmNvbXBvbmVudCgnY3UtY3VzdG9tJyxjdUN1c3RvbSlcclxuXHJcblZ1ZS5jb25maWcucHJvZHVjdGlvblRpcCA9IGZhbHNlXHJcblxyXG5BcHAubXBUeXBlID0gJ2FwcCdcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBWdWUoe1xyXG4gICAgLi4uQXBwXHJcbn0pXHJcbmFwcC4kbW91bnQoKSIsInZhciByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50c1xudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXHJ1bnRpbWVcXFxcY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGwsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIkFwcC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGJhYmVsLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTEyLTEhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHdlYnBhY2stdW5pLW1wLWxvYWRlclxcXFxsaWJcXFxcc2NyaXB0LmpzIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tMTItMSFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzY3JpcHQuanMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx3ZWJwYWNrLXVuaS1tcC1sb2FkZXJcXFxcbGliXFxcXHN0eWxlLmpzIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsIjxzY3JpcHQ+XHJcblx0aW1wb3J0IFZ1ZSBmcm9tICd2dWUnXHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0b25MYXVuY2g6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR1bmkuZ2V0U3lzdGVtSW5mbyh7XHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0Ly8gI2lmbmRlZiBNUFxyXG5cdFx0XHRcdFx0VnVlLnByb3RvdHlwZS5TdGF0dXNCYXIgPSBlLnN0YXR1c0JhckhlaWdodDtcclxuXHRcdFx0XHRcdGlmIChlLnBsYXRmb3JtID09ICdhbmRyb2lkJykge1xyXG5cdFx0XHRcdFx0XHRWdWUucHJvdG90eXBlLkN1c3RvbUJhciA9IGUuc3RhdHVzQmFySGVpZ2h0ICsgNTA7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRWdWUucHJvdG90eXBlLkN1c3RvbUJhciA9IGUuc3RhdHVzQmFySGVpZ2h0ICsgNDU7XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0Ly8gI2VuZGlmXHJcblxyXG5cdFx0XHRcdFx0Ly8gI2lmZGVmIE1QLVdFSVhJTiB8fCBNUC1RUVxyXG5cdFx0XHRcdFx0VnVlLnByb3RvdHlwZS5TdGF0dXNCYXIgPSBlLnN0YXR1c0JhckhlaWdodDtcclxuXHRcdFx0XHRcdGxldCBjYXBzdWxlID0gd3guZ2V0TWVudUJ1dHRvbkJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRcdFx0aWYgKGNhcHN1bGUpIHtcclxuXHRcdFx0XHRcdFx0VnVlLnByb3RvdHlwZS5DdXN0b20gPSBjYXBzdWxlO1xyXG5cdFx0XHRcdFx0XHQvLyBWdWUucHJvdG90eXBlLmNhcHN1bGVTYWZlID0gdW5pLnVweDJweCg3NTApIC0gY2Fwc3VsZS5sZWZ0ICsgdW5pLnVweDJweCg3NTApIC0gY2Fwc3VsZS5yaWdodDtcclxuXHRcdFx0XHRcdFx0VnVlLnByb3RvdHlwZS5DdXN0b21CYXIgPSBjYXBzdWxlLmJvdHRvbSArIGNhcHN1bGUudG9wIC0gZS5zdGF0dXNCYXJIZWlnaHQ7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRWdWUucHJvdG90eXBlLkN1c3RvbUJhciA9IGUuc3RhdHVzQmFySGVpZ2h0ICsgNTA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyAjZW5kaWZcdFx0XHJcblxyXG5cclxuXHRcdFx0XHRcdC8vICNpZmRlZiBNUC1BTElQQVlcclxuXHRcdFx0XHRcdFZ1ZS5wcm90b3R5cGUuU3RhdHVzQmFyID0gZS5zdGF0dXNCYXJIZWlnaHQ7XHJcblx0XHRcdFx0XHRWdWUucHJvdG90eXBlLkN1c3RvbUJhciA9IGUuc3RhdHVzQmFySGVpZ2h0ICsgZS50aXRsZUJhckhlaWdodDtcclxuXHRcdFx0XHRcdC8vICNlbmRpZlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdFZ1ZS5wcm90b3R5cGUuQ29sb3JMaXN0ID0gW3tcclxuXHRcdFx0XHRcdHRpdGxlOiAn5auj57qiJyxcclxuXHRcdFx0XHRcdG5hbWU6ICdyZWQnLFxyXG5cdFx0XHRcdFx0Y29sb3I6ICcjZTU0ZDQyJ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICfmoZTmqZknLFxyXG5cdFx0XHRcdFx0bmFtZTogJ29yYW5nZScsXHJcblx0XHRcdFx0XHRjb2xvcjogJyNmMzdiMWQnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ+aYjum7hCcsXHJcblx0XHRcdFx0XHRuYW1lOiAneWVsbG93JyxcclxuXHRcdFx0XHRcdGNvbG9yOiAnI2ZiYmQwOCdcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAn5qmE5qaEJyxcclxuXHRcdFx0XHRcdG5hbWU6ICdvbGl2ZScsXHJcblx0XHRcdFx0XHRjb2xvcjogJyM4ZGM2M2YnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ+ajrue7vycsXHJcblx0XHRcdFx0XHRuYW1lOiAnZ3JlZW4nLFxyXG5cdFx0XHRcdFx0Y29sb3I6ICcjMzliNTRhJ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICflpKnpnZInLFxyXG5cdFx0XHRcdFx0bmFtZTogJ2N5YW4nLFxyXG5cdFx0XHRcdFx0Y29sb3I6ICcjMWNiYmI0J1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICfmtbfok50nLFxyXG5cdFx0XHRcdFx0bmFtZTogJ2JsdWUnLFxyXG5cdFx0XHRcdFx0Y29sb3I6ICcjMDA4MWZmJ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICflp7nntKsnLFxyXG5cdFx0XHRcdFx0bmFtZTogJ3B1cnBsZScsXHJcblx0XHRcdFx0XHRjb2xvcjogJyM2NzM5YjYnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ+acqOanvycsXHJcblx0XHRcdFx0XHRuYW1lOiAnbWF1dmUnLFxyXG5cdFx0XHRcdFx0Y29sb3I6ICcjOWMyNmIwJ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICfmoYPnsoknLFxyXG5cdFx0XHRcdFx0bmFtZTogJ3BpbmsnLFxyXG5cdFx0XHRcdFx0Y29sb3I6ICcjZTAzOTk3J1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGl0bGU6ICfmo5XopJAnLFxyXG5cdFx0XHRcdFx0bmFtZTogJ2Jyb3duJyxcclxuXHRcdFx0XHRcdGNvbG9yOiAnI2E1NjczZidcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAn546E54GwJyxcclxuXHRcdFx0XHRcdG5hbWU6ICdncmV5JyxcclxuXHRcdFx0XHRcdGNvbG9yOiAnIzg3OTlhMydcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAn6I2J54GwJyxcclxuXHRcdFx0XHRcdG5hbWU6ICdncmF5JyxcclxuXHRcdFx0XHRcdGNvbG9yOiAnI2FhYWFhYSdcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRpdGxlOiAn5aKo6buRJyxcclxuXHRcdFx0XHRcdG5hbWU6ICdibGFjaycsXHJcblx0XHRcdFx0XHRjb2xvcjogJyMzMzMzMzMnXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aXRsZTogJ+mbheeZvScsXHJcblx0XHRcdFx0XHRuYW1lOiAnd2hpdGUnLFxyXG5cdFx0XHRcdFx0Y29sb3I6ICcjZmZmZmZmJ1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdF1cclxuXHJcblx0XHR9LFxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcblx0QGltcG9ydCBcImNvbG9ydWkvbWFpbi5jc3NcIjtcclxuXHRAaW1wb3J0IFwiY29sb3J1aS9pY29uLmNzc1wiO1xyXG5cdEBpbXBvcnQgXCJzdGF0aWMvY3NzL215Rm9udC5jc3NcIjtcclxuXHJcblx0Lm5hdi1saXN0IHtcclxuXHRcdGRpc3BsYXk6IGZsZXg7XHJcblx0XHRmbGV4LXdyYXA6IHdyYXA7XHJcblx0XHRwYWRkaW5nOiAwcHggNDB1cHggMHB4O1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cdH1cclxuXHJcblx0Lm5hdi1saSB7XHJcblx0XHRwYWRkaW5nOiAzMHVweDtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDEydXB4O1xyXG5cdFx0d2lkdGg6IDQ1JTtcclxuXHRcdG1hcmdpbjogMCAyLjUlIDQwdXB4O1xyXG5cdFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHBzOi8vY2RuLm5sYXJrLmNvbS95dXF1ZS8wLzIwMTkvcG5nLzI4MDM3NC8xNTUyOTk2MzU4MzUyLWFzc2V0cy93ZWItdXBsb2FkL2NjM2IxODA3LWM2ODQtNGI4My04ZjgwLTgwZTViOGE2Yjk3NS5wbmcpO1xyXG5cdFx0YmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuXHRcdGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdHotaW5kZXg6IDE7XHJcblx0fVxyXG5cclxuXHQubmF2LWxpOjphZnRlciB7XHJcblx0XHRjb250ZW50OiBcIlwiO1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0ei1pbmRleDogLTE7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xyXG5cdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRoZWlnaHQ6IDEwMCU7XHJcblx0XHRsZWZ0OiAwO1xyXG5cdFx0Ym90dG9tOiAtMTAlO1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMTB1cHg7XHJcblx0XHRvcGFjaXR5OiAwLjI7XHJcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDAuOSwgMC45KTtcclxuXHR9XHJcblxyXG5cdC5uYXYtbGkuY3VyIHtcclxuXHRcdGNvbG9yOiAjZmZmO1xyXG5cdFx0YmFja2dyb3VuZDogcmdiKDk0LCAxODUsIDk0KTtcclxuXHRcdGJveC1zaGFkb3c6IDR1cHggNHVweCA2dXB4IHJnYmEoOTQsIDE4NSwgOTQsIDAuNCk7XHJcblx0fVxyXG5cclxuXHQubmF2LXRpdGxlIHtcclxuXHRcdGZvbnQtc2l6ZTogMzJ1cHg7XHJcblx0XHRmb250LXdlaWdodDogMzAwO1xyXG5cdH1cclxuXHJcblx0Lm5hdi10aXRsZTo6Zmlyc3QtbGV0dGVyIHtcclxuXHRcdGZvbnQtc2l6ZTogNDB1cHg7XHJcblx0XHRtYXJnaW4tcmlnaHQ6IDR1cHg7XHJcblx0fVxyXG5cclxuXHQubmF2LW5hbWUge1xyXG5cdFx0Zm9udC1zaXplOiAyOHVweDtcclxuXHRcdHRleHQtdHJhbnNmb3JtOiBDYXBpdGFsaXplO1xyXG5cdFx0bWFyZ2luLXRvcDogMjB1cHg7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0fVxyXG5cclxuXHQubmF2LW5hbWU6OmJlZm9yZSB7XHJcblx0XHRjb250ZW50OiBcIlwiO1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0ZGlzcGxheTogYmxvY2s7XHJcblx0XHR3aWR0aDogNDB1cHg7XHJcblx0XHRoZWlnaHQ6IDZ1cHg7XHJcblx0XHRiYWNrZ3JvdW5kOiAjZmZmO1xyXG5cdFx0Ym90dG9tOiAwO1xyXG5cdFx0cmlnaHQ6IDA7XHJcblx0XHRvcGFjaXR5OiAwLjU7XHJcblx0fVxyXG5cclxuXHQubmF2LW5hbWU6OmFmdGVyIHtcclxuXHRcdGNvbnRlbnQ6IFwiXCI7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRkaXNwbGF5OiBibG9jaztcclxuXHRcdHdpZHRoOiAxMDB1cHg7XHJcblx0XHRoZWlnaHQ6IDFweDtcclxuXHRcdGJhY2tncm91bmQ6ICNmZmY7XHJcblx0XHRib3R0b206IDA7XHJcblx0XHRyaWdodDogNDB1cHg7XHJcblx0XHRvcGFjaXR5OiAwLjM7XHJcblx0fVxyXG5cclxuXHQubmF2LW5hbWU6OmZpcnN0LWxldHRlciB7XHJcblx0XHRmb250LXdlaWdodDogYm9sZDtcclxuXHRcdGZvbnQtc2l6ZTogMzZ1cHg7XHJcblx0XHRtYXJnaW4tcmlnaHQ6IDFweDtcclxuXHR9XHJcblxyXG5cdC5uYXYtbGkgdGV4dCB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRyaWdodDogMzB1cHg7XHJcblx0XHR0b3A6IDMwdXB4O1xyXG5cdFx0Zm9udC1zaXplOiA1MnVweDtcclxuXHRcdHdpZHRoOiA2MHVweDtcclxuXHRcdGhlaWdodDogNjB1cHg7XHJcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRsaW5lLWhlaWdodDogNjB1cHg7XHJcblx0fVxyXG5cclxuXHQudGV4dC1saWdodCB7XHJcblx0XHRmb250LXdlaWdodDogMzAwO1xyXG5cdH1cclxuXHJcblx0QGtleWZyYW1lcyBzaG93IHtcclxuXHRcdDAlIHtcclxuXHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MHB4KTtcclxuXHRcdH1cclxuXHJcblx0XHQ2MCUge1xyXG5cdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNDB1cHgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdDEwMCUge1xyXG5cdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdEAtd2Via2l0LWtleWZyYW1lcyBzaG93IHtcclxuXHRcdDAlIHtcclxuXHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MHB4KTtcclxuXHRcdH1cclxuXHJcblx0XHQ2MCUge1xyXG5cdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNDB1cHgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdDEwMCUge1xyXG5cdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuXHRcdH1cclxuXHR9XHJcbjwvc3R5bGU+XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXFxcXGRpc3RcXFxcbG9hZGVyLmpzPz9yZWYtLTYtb25lT2YtMS0wIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGNzcy1sb2FkZXJcXFxcZGlzdFxcXFxjanMuanM/P3JlZi0tNi1vbmVPZi0xLTEhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxsb2FkZXJzXFxcXHN0eWxlUG9zdExvYWRlci5qcyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTIhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxccG9zdGNzcy1sb2FkZXJcXFxcc3JjXFxcXGluZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0zIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxcXFxkaXN0XFxcXGxvYWRlci5qcz8/cmVmLS02LW9uZU9mLTEtMCFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxjc3MtbG9hZGVyXFxcXGRpc3RcXFxcY2pzLmpzPz9yZWYtLTYtb25lT2YtMS0xIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcbG9hZGVyc1xcXFxzdHlsZVBvc3RMb2FkZXIuanMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0yIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXHBvc3Rjc3MtbG9hZGVyXFxcXHNyY1xcXFxpbmRleC5qcz8/cmVmLS02LW9uZU9mLTEtMyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHdlYnBhY2stdW5pLW1wLWxvYWRlclxcXFxsaWJcXFxcc3R5bGUuanMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCIiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTk0MzcwOTkyMTE0XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIkY6L0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiaG1yXCI6dHJ1ZSxcInB1YmxpY1BhdGhcIjpcIi4uLy4uL1wiLFwibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9ob21lLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zNjdjN2NjYyZuYW1lPWNvbXBvbmVudHMmXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9ob21lLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vaG9tZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vaG9tZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWxlc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxccnVudGltZVxcXFxjb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgZmFsc2UsXG4gIGNvbXBvbmVudHMsXG4gIHJlbmRlcmpzXG4pXG5cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicGFnZXMvbWFpbi9ob21lLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydCAqIGZyb20gXCItIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcbG9hZGVyc1xcXFx0ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlclxcXFxpbmRleC5qcz8/cmVmLS0xNi0wIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx3ZWJwYWNrLXVuaS1tcC1sb2FkZXJcXFxcbGliXFxcXHRlbXBsYXRlLmpzIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcd2VicGFjay11bmktYXBwLWxvYWRlclxcXFxwYWdlLW1ldGEuanMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx3ZWJwYWNrLXVuaS1tcC1sb2FkZXJcXFxcbGliXFxcXHN0eWxlLmpzIS4vaG9tZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzY3YzdjY2MmbmFtZT1jb21wb25lbnRzJlwiIiwidmFyIGNvbXBvbmVudHNcbnZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxufVxudmFyIHJlY3ljbGFibGVSZW5kZXIgPSBmYWxzZVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSIsImltcG9ydCBtb2QgZnJvbSBcIi0hRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tMTItMSFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzY3JpcHQuanMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx3ZWJwYWNrLXVuaS1tcC1sb2FkZXJcXFxcbGliXFxcXHN0eWxlLmpzIS4vaG9tZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tMTItMSFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzY3JpcHQuanMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx3ZWJwYWNrLXVuaS1tcC1sb2FkZXJcXFxcbGliXFxcXHN0eWxlLmpzIS4vaG9tZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCI8dGVtcGxhdGUgbmFtZT1cImNvbXBvbmVudHNcIj5cclxuXHQ8dmlldyBjbGFzcz1cInBhZ2VcIj5cclxuXHRcdDwhLS0g5aS06YOoIC0tPlxyXG5cdFx0PHZpZXcgY2xhc3M9XCJjYWxjLWhlYWRlclwiPlxyXG5cdFx0XHQ8bmF2aWdhdG9yIHVybD1cIi4uL3dlbGNvbWUvaG9tZVwiIG9wZW4tdHlwZT1cIm5hdmlnYXRlQmFja1wiPlxyXG5cdFx0XHRcdDxpbWFnZSBzcmM9XCIuLi8uLi9zdGF0aWMvY2xvc2UucG5nXCIgbW9kZT1cIndpZHRoRml4XCI+PC9pbWFnZT5cclxuXHRcdFx0PC9uYXZpZ2F0b3I+XHJcblx0XHRcdDx2aWV3IGNsYXNzPVwiY2FsYy1oZWFkZXItcmlnaHRcIj5cclxuXHRcdFx0XHQ8c3Bhbj57e21pblN0cn19PC9zcGFuPlxyXG5cdFx0XHRcdDxzcGFuPjo8L3NwYW4+XHJcblx0XHRcdFx0PHNwYW4+e3tzZWNTdHJ9fTwvc3Bhbj5cclxuXHRcdFx0XHQ8c3Bhbj46PC9zcGFuPlxyXG5cdFx0XHRcdDxzcGFuPnt7bXNTdHJ9fTwvc3Bhbj5cclxuXHRcdFx0PC92aWV3PlxyXG5cdFx0XHQ8dmlldyBjbGFzcz1cInByb2dyZXNzXCIgOnN0eWxlPVwiJ3dpZHRoOicgKyBjdXJQcm9ncmVzcyArICclJ1wiPjwvdmlldz5cclxuXHRcdDwvdmlldz5cclxuXHRcdDwhLS0g5YaF5a656YOo5YiGIC0tPlxyXG5cdFx0PHZpZXcgY2xhc3M9XCJjYWxjLWNvbnRlbnRcIj5cclxuXHRcdFx0PHZpZXcgY2xhc3M9XCJjYWxjLWNvbnRlbnQtcXVlc3Rpb25cIj5cclxuXHRcdFx0XHQ8c3Bhbj57eyBudW1BIH19PC9zcGFuPlxyXG5cdFx0XHRcdDxzcGFuPiB7eyB0eXBlID09PSAndHdvQWRkJyB8fCB0eXBlID09PSAndGhyZWVBZGQnID8gJysnIDogdHlwZSA9PT0gJ3R3b1JlZHVjZScgPyAnLScgOiAneCcgfX0gPC9zcGFuPlxyXG5cdFx0XHRcdDxzcGFuPnt7IG51bUIgfX08L3NwYW4+XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdFx0PHZpZXcgY2xhc3M9XCJjYWxjLWNvbnRlbnQtYW5zd2VyXCI+XHJcblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgOnZhbHVlPVwiY3VyQW5zd2VyXCIgIGRpc2FibGVkLz5cclxuXHRcdFx0PC92aWV3PlxyXG5cdFx0PC92aWV3PlxyXG5cdFx0PCEtLSDorqHnrpfpg6jliIYgLS0+XHJcblx0XHQ8dmlldyBjbGFzcz1cImNhbGMtYm94XCI+XHJcblx0XHRcdDx2aWV3IGNsYXNzPVwiY2FsYy1ib3gtaXRlbVwiIHYtZm9yPVwiKGl0ZW0saW5kZXgpIGluIG51bXNMaXN0XCIgOmtleT1cImluZGV4XCIgQGNsaWNrPVwib25JdGVtQ2xpY2soaXRlbSArIDEpXCI+XHJcblx0XHRcdFx0e3sgaW5kZXggKyAxIH19XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdFx0PHZpZXcgY2xhc3M9XCJjYWxjLWJveC1pdGVtXCIgQGNsaWNrPVwib25JdGVtQ2xpY2soJ2NhbmNlbCcpXCI+Qzwvdmlldz5cclxuXHRcdFx0PHZpZXcgY2xhc3M9XCJjYWxjLWJveC1pdGVtXCIgQGNsaWNrPVwib25JdGVtQ2xpY2soMClcIj4wPC92aWV3PlxyXG5cdFx0XHQ8dmlldyBjbGFzcz1cImNhbGMtYm94LWl0ZW1cIiBAY2xpY2s9XCJvbkl0ZW1DbGljaygnT0snKVwiPk9LPC92aWV3PlxyXG5cdFx0PC92aWV3PlxyXG5cdFx0XHJcblx0XHQ8dmlldyBjbGFzcz1cImN1LW1vZGFsXCIgOmNsYXNzPVwiaXNTaG93TW9kYWwgPydzaG93JzonJ1wiPlxyXG5cdFx0XHQ8dmlldyBjbGFzcz1cImN1LWRpYWxvZ1wiPlxyXG5cdFx0XHRcdDx2aWV3IGNsYXNzPVwiY3UtYmFyIGJnLXdoaXRlIGp1c3RpZnktZW5kXCI+XHJcblx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cImNvbnRlbnRcIj7nrZTpopjlrozmiJA8L3ZpZXc+XHJcblx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cImFjdGlvblwiIEB0YXA9XCJoaWRlTW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0PHRleHQgY2xhc3M9XCJjdUljb24tY2xvc2UgdGV4dC1yZWRcIj48L3RleHQ+XHJcblx0XHRcdFx0XHQ8L3ZpZXc+XHJcblx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHRcdDx2aWV3IGNsYXNzPVwicGFkZGluZy14bFwiPlxyXG5cdFx0XHRcdFx0e3sgJ+etlOmimOWujOaIkO+8geacgOe7iOeUqOaXtjogJyArIG1pblN0ciArICc6JyArIHNlY1N0ciArICc6JyArIG1zU3RyICB9fVxyXG5cdFx0XHRcdDwvdmlldz5cclxuXHRcdFx0XHQ8dmlldyBjbGFzcz1cImN1LWJhciBiZy13aGl0ZVwiPlxyXG5cdFx0XHRcdFx0PHZpZXcgY2xhc3M9XCJhY3Rpb24gbWFyZ2luLTAgZmxleC1zdWIgdGV4dC1ncmVlbiBzb2xpZC1sZWZ0XCIgQHRhcD1cImhpZGVNb2RhbFwiPuWPlua2iDwvdmlldz5cclxuXHRcdFx0XHRcdDx2aWV3IGNsYXNzPVwiYWN0aW9uIG1hcmdpbi0wIGZsZXgtc3ViICBzb2xpZC1sZWZ0XCIgQHRhcD1cIm9uQ29uZmlybVwiPumHjeaWsOaMkeaImDwvdmlldz5cclxuXHRcdFx0XHRcdDx2aWV3IGNsYXNzPVwiYWN0aW9uIG1hcmdpbi0wIGZsZXgtc3ViICBzb2xpZC1sZWZ0XCI+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gb3Blbi10eXBlPVwic2hhcmVcIj7liIbkuqvnu5nlpb3lj4s8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvdmlldz5cclxuXHRcdFx0XHQ8L3ZpZXc+XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdDwvdmlldz5cclxuXHQ8L3ZpZXc+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5cdGltcG9ydCBsaXN0VHdvUmVkdWNlIGZyb20gJy4uLy4uL3V0aWxzL2xpc3QtdHdvLXJlZHVjZS5qcydcclxuXHRpbXBvcnQgbGlzdFR3b0FkZCBmcm9tICcuLi8uLi91dGlscy9saXN0LXR3by1hZGQuanMnXHJcblx0aW1wb3J0IGxpc3RUd29SaWRlIGZyb20gJy4uLy4uL3V0aWxzL2xpc3QtdHdvLXJpZGUuanMnXHJcblx0aW1wb3J0IGxpc3RUaHJlZUFkZCBmcm9tICcuLi8uLi91dGlscy9saXN0LXRocmVlLWFkZC5qcydcclxuXHRleHBvcnQgZGVmYXVsdCB7XHJcblxyXG5cdFx0ZGF0YSgpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRudW1zTGlzdDpbMCwxLDIsMyw0LDUsNiw3LDhdLFxyXG5cdFx0XHRcdGN1ckFuc3dlcjonJyxcclxuXHRcdFx0XHRjdXJJbmRleDowLFxyXG5cdFx0XHRcdGN1clByb2dyZXNzOjAsXHJcblx0XHRcdFx0bnVtQTpudWxsLFxyXG5cdFx0XHRcdG51bUI6bnVsbCxcclxuXHRcdFx0XHRjb3VudDoxMCxcclxuXHRcdFx0XHRudW1zOm51bGwsXHJcblx0XHRcdFx0dHlwZTpudWxsLFxyXG5cdFx0XHRcdG1pbjowLFxyXG5cdFx0XHRcdG1pblN0cjonJyxcclxuXHRcdFx0XHRzZWNvbmQ6MCxcclxuXHRcdFx0XHRzZWNTdHI6JycsXHJcblx0XHRcdFx0bXM6MCxcclxuXHRcdFx0XHRtc1N0cjonJyxcclxuXHRcdFx0XHR0aW1lcjpudWxsLFxyXG5cdFx0XHRcdGlzU2hvd01vZGFsOmZhbHNlLFxyXG5cdFx0XHRcdHF1ZXN0aW9uTGlzdDpbXVxyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdG9uTG9hZChvcHRpb25zKSB7XHJcblx0XHRcdGlmKG9wdGlvbnMpIHtcclxuXHRcdFx0XHR0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGVcclxuXHRcdFx0XHR0aGlzLmNvdW50ID0gb3B0aW9ucy5jb3VudFxyXG5cdFx0XHRcdHRoaXMuaW5pdCgpXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRjcmVhdGVkKG9wdGlvbnMpIHtcclxuXHRcdFx0aWYob3B0aW9ucykge1xyXG5cdFx0XHRcdHRoaXMudHlwZSA9IG9wdGlvbnMudHlwZVxyXG5cdFx0XHRcdHRoaXMuY291bnQgPSBvcHRpb25zLmNvdW50XHJcblx0XHRcdFx0dGhpcy5pbml0KClcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdG9uU2hhcmVBcHBNZXNzYWdlKHJlcykge1xyXG5cdFx0XHRpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XHJcblx0XHRcdCAgICBsZXQgdHlwZVN0ciA9IHRoaXMudHlwZSA9PT0gJ3R3b0FkZCcgPyAn5Lik5L2N5pWw5Yqg5rOVJyA6IHRoaXMudHlwZSA9PT0gJ3R3b1JlZHVjZScgPyAn5Lik5L2N5pWw5YeP5rOVJyA6IHRoaXMudHlwZSA9PT0gJ3R3b1JpZGUnID8gJ+S4pOS9jeaVsOS5mOazlScgOiAn5LiJ5L2N5pWw5Yqg5rOVJ1xyXG5cdFx0XHQgICAgICByZXR1cm4ge1xyXG5cdFx0XHQgICAgICAgIHRpdGxlOiB0aGlzLmNvdW50ICsgJ+mBkycgKyB0eXBlU3RyICArICfpgJ/nrpfmiJHlj6rnlKjkuoYgJyArIHRoaXMubWluU3RyICsgJzonICsgdGhpcy5zZWNTdHIgKyAnOicgKyB0aGlzLm1zU3RyICsgJyDlsLHlrozmiJDkuobvvIzkvaDlkaLvvJ8nLFxyXG5cdFx0XHQgICAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9vbmVwc3ljaG8uYmouYmNlYm9zLmNvbS9iZy1zaGFyZS5wbmcnLFxyXG5cdFx0XHQgICAgICAgIHBhdGg6ICcvcGFnZXMvd2VsY29tZS9ob21lJ1xyXG5cdFx0XHQgICAgICB9XHJcblx0XHRcdCAgfSBlbHNlIGlmIChyZXMuZnJvbSA9PT0gJ21lbnUnKXtcclxuXHRcdFx0XHQgICByZXR1cm4ge1xyXG5cdFx0XHRcdFx0IHRpdGxlOiAn6YCf566X546L6ICFLeS9oOmAn+eul+acieaIkeWOieWus+WQlz8nLFxyXG5cdFx0XHRcdFx0IGltYWdlVXJsOiAnaHR0cHM6Ly9vbmVwc3ljaG8uYmouYmNlYm9zLmNvbS9iZy1zaGFyZS5wbmcnLFxyXG5cdFx0XHRcdFx0IHBhdGg6ICcvcGFnZXMvd2VsY29tZS9ob21lJ1xyXG5cdFx0XHRcdCAgIH1cclxuXHRcdFx0ICB9XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdG9uU2hhcmVUaW1lbGluZSgpe1xyXG5cdFx0XHRcclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdGluaXQoKXtcclxuXHRcdFx0XHRsZXQgbGlzdCA9IHRoaXMudHlwZSA9PT0gJ3R3b0FkZCcgPyBsaXN0VHdvQWRkIDogdGhpcy50eXBlID09PSAndHdvUmVkdWNlJyA/IGxpc3RUd29SZWR1Y2UgOiB0aGlzLnR5cGUgPT09ICd0d29SaWRlJyA/IGxpc3RUd29SaWRlIDogbGlzdFRocmVlQWRkXHJcblx0XHRcdFx0dGhpcy5xdWVzdGlvbkxpc3QgPSB0aGlzLmdldFJhbmRvbUFycmF5RWxlbWVudHMobGlzdC5kZWZhdWx0LHRoaXMuY291bnQpXHJcblx0XHRcdFx0dGhpcy5udW1BID0gdGhpcy5xdWVzdGlvbkxpc3RbMF0uYVxyXG5cdFx0XHRcdHRoaXMubnVtQiA9IHRoaXMucXVlc3Rpb25MaXN0WzBdLmJcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHRoaXMudGltZXIpXHJcblx0XHRcdFx0dGhpcy50aW1lciA9IHNldEludGVydmFsKHRoaXMuc2hvdywxMClcclxuXHRcdFx0fSxcclxuXHRcdFx0XHJcblx0XHRcdGhpZGVNb2RhbCgpe1xyXG5cdFx0XHRcdHRoaXMuaXNTaG93TW9kYWwgPSBmYWxzZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRcclxuXHRcdFx0b25Db25maXJtKCl7XHJcblx0XHRcdFx0dW5pLnJlTGF1bmNoKHtcclxuXHRcdFx0XHQgICAgdXJsOiAnL3BhZ2VzL3dlbGNvbWUvaG9tZSdcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0XHJcblx0XHRcdHNob3coKXtcclxuXHRcdFx0XHR2YXIgbWluPSB0aGlzLm1pbjtcclxuXHRcdFx0XHR2YXIgc2VjPSB0aGlzLnNlY29uZDtcclxuXHRcdFx0XHR2YXIgbXM9IHRoaXMubXM7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bXMrKztcclxuXHRcdFx0XHRpZihzZWM9PTYwKXtcclxuXHRcdFx0XHRcdG1pbisrO3NlYz0wO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZihtcz09MTAwKXtcclxuXHRcdFx0XHRcdHNlYysrO21zPTA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBtc1N0cj1tcztcclxuXHRcdFx0XHRpZihtczwxMCl7XHJcblx0XHRcdFx0XHRtc1N0cj1cIjBcIittcztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIHNlY1N0cj1zZWM7XHJcblx0XHRcdFx0aWYoc2VjPDEwKXtcclxuXHRcdFx0XHRcdHNlY1N0cj1cIjBcIitzZWM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBtaW5TdHI9bWluO1xyXG5cdFx0XHRcdGlmKG1pbjwxMCl7XHJcblx0XHRcdFx0XHRtaW5TdHI9XCIwXCIrbWluO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLm1pblN0ciA9IG1pblN0clxyXG5cdFx0XHRcdHRoaXMuc2VjU3RyID0gc2VjU3RyXHJcblx0XHRcdFx0dGhpcy5tc1N0ciA9IG1zU3RyXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5taW4gPSBtaW5cclxuXHRcdFx0XHR0aGlzLnNlY29uZCA9IHNlY1xyXG5cdFx0XHRcdHRoaXMubXMgPSBtc1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRcclxuXHRcdFx0b25JdGVtQ2xpY2sodmFsKXtcclxuXHRcdFx0XHRpZih2YWwgPT09ICdjYW5jZWwnKXtcclxuXHRcdFx0XHRcdHRoaXMuY3VyQW5zd2VyID0gJydcclxuXHRcdFx0XHR9ZWxzZSBpZih2YWwgPT09ICdPSycpe1xyXG5cdFx0XHRcdFx0aWYodGhpcy5jdXJJbmRleCA8IHRoaXMuY291bnQgLSAxKXtcclxuXHRcdFx0XHRcdFx0aWYoK3RoaXMuY3VyQW5zd2VyID09PSB0aGlzLnF1ZXN0aW9uTGlzdFt0aGlzLmN1ckluZGV4XS5jKXtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmN1clByb2dyZXNzID0gKHRoaXMuY3VySW5kZXggKyAxKSAvIHRoaXMuY291bnQgKiAxMDBcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmN1ckluZGV4ICs9IDFcclxuXHRcdFx0XHRcdFx0XHR0aGlzLm51bUEgPSB0aGlzLnF1ZXN0aW9uTGlzdFt0aGlzLmN1ckluZGV4XS5hXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5udW1CID0gdGhpcy5xdWVzdGlvbkxpc3RbdGhpcy5jdXJJbmRleF0uYlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuY3VyQW5zd2VyID0gJydcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5jdXJBbnN3ZXIgPSAnJ1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcclxuXHRcdFx0XHRcdFx0dGhpcy5pc1Nob3dNb2RhbCA9IHRydWVcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJBbnN3ZXIgPSB0aGlzLmN1ckFuc3dlciArIHZhbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0XHJcblx0XHRcdGdldFJhbmRvbUFycmF5RWxlbWVudHMoYXJyLCBjb3VudCkge1xyXG5cdFx0XHQgICAgdmFyIHNodWZmbGVkID0gYXJyLnNsaWNlKDApLCBpID0gYXJyLmxlbmd0aCwgbWluID0gaSAtIGNvdW50LCB0ZW1wLCBpbmRleDtcclxuXHRcdFx0ICAgIHdoaWxlIChpLS0gPiBtaW4pIHtcclxuXHRcdFx0ICAgICAgICBpbmRleCA9IE1hdGguZmxvb3IoKGkgKyAxKSAqIE1hdGgucmFuZG9tKCkpO1xyXG5cdFx0XHQgICAgICAgIHRlbXAgPSBzaHVmZmxlZFtpbmRleF07XHJcblx0XHRcdCAgICAgICAgc2h1ZmZsZWRbaW5kZXhdID0gc2h1ZmZsZWRbaV07XHJcblx0XHRcdCAgICAgICAgc2h1ZmZsZWRbaV0gPSB0ZW1wO1xyXG5cdFx0XHQgICAgfVxyXG5cdFx0XHQgICAgcmV0dXJuIHNodWZmbGVkLnNsaWNlKG1pbik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRkZXN0cm95ZWQoKSB7XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cImxlc3NcIj5cclxuXHQucGFnZSB7XHJcblx0XHRoZWlnaHQ6IDEwMHZoO1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0cGFkZGluZy1ib3R0b206IDE1MHJweDtcclxuXHRcdGZvbnQtZmFtaWx5OiAnbXlGb250JztcclxuXHRcdGZvbnQtd2VpZ2h0OiAyMDA7XHJcblxyXG5cdFx0LmNhbGMtaGVhZGVye1xyXG5cdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRcdHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRoZWlnaHQ6IDYwcHg7XHJcblx0XHRcdHBhZGRpbmc6IDE4cHg7XHJcblx0XHRcdGRpc3BsYXk6IGZsZXg7XHJcblx0XHRcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XHJcblx0XHRcdFxyXG5cdFx0XHQmLXJpZ2h0e1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogMjhweDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0LnByb2dyZXNze1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdGJvdHRvbTogLTNweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDNweDtcclxuXHRcdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAjMzMzMzMzO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpbWFnZXtcclxuXHRcdFx0XHR3aWR0aDogMjBweDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQuY2FsYy1jb250ZW50e1xyXG5cdFx0XHRkaXNwbGF5OiBmbGV4O1xyXG5cdFx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0bWFyZ2luLXRvcDogMTAwcnB4O1xyXG5cdFx0XHRjb2xvcjojNTg1ODU4O1xyXG5cdFx0XHRcclxuXHRcdFx0Ji1xdWVzdGlvbntcclxuXHRcdFx0XHRmb250LXNpemU6IDQwcHg7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0c3BhbntcclxuXHRcdFx0XHRcdG1hcmdpbjogMCAyMHJweDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdCYtYW5zd2Vye1xyXG5cdFx0XHRcdG1hcmdpbi10b3A6IDYwcnB4O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlucHV0e1xyXG5cdFx0XHRcdFx0YmFja2dyb3VuZDogI2U2ZTZlNjtcclxuXHRcdFx0XHRcdHdpZHRoOiA2MCU7XHJcblx0XHRcdFx0XHRtYXJnaW4tbGVmdDogMjAlO1xyXG5cdFx0XHRcdFx0aGVpZ2h0OiAxNDBycHg7XHJcblx0XHRcdFx0XHRsaW5lLWhlaWdodDogMTAwcnB4O1xyXG5cdFx0XHRcdFx0Zm9udC1zaXplOiA0MnB4O1xyXG5cdFx0XHRcdFx0cGFkZGluZzogMTBycHg7XHJcblx0XHRcdFx0XHRjb2xvcjojMDAwO1xyXG5cdFx0XHRcdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0XHRcdFx0bGV0dGVyLXNwYWNpbmc6IDFweDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LmNhbGMtYm94e1xyXG5cdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdHdpZHRoOjEwMCU7XHJcblx0XHRcdGJvdHRvbTogMDtcclxuXHRcdFx0bGVmdDogMDtcclxuXHRcdFx0ZGlzcGxheTogZmxleDtcclxuXHRcdFx0ZmxleC13cmFwOiB3cmFwO1xyXG5cdFx0XHRcclxuXHRcdFx0Ji1pdGVte1xyXG5cdFx0XHRcdGZsZXg6IDEgMSAzMy4zMyU7XHJcblx0XHRcdFx0aGVpZ2h0OiAxODBycHg7XHJcblx0XHRcdFx0ZGlzcGxheTogZmxleDtcclxuXHRcdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogMzBweDtcclxuXHRcdFx0XHRjb2xvcjojNTg1ODU4O1xyXG5cdFx0XHRcdGJvcmRlcjogLjVweCBzb2xpZCAjZTBlMGUwO1xyXG5cdFx0XHRcdG1hcmdpbjogLS41cHg7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LmN1LWJhcntcclxuXHRcdFx0YnV0dG9ue1xyXG5cdFx0XHRcdHBhZGRpbmc6IDA7XHJcblx0XHRcdFx0Ym9yZGVyOiBub25lO1xyXG5cdFx0XHRcdGJvcmRlci1yYWRpdXM6IDA7XHJcblx0XHRcdFx0aGVpZ2h0OiAxOXB4O1xyXG5cdFx0XHRcdGZvbnQtc2l6ZTogMTRweDtcclxuXHRcdFx0XHRjb2xvcjojNjY2O1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6IG5vbmU7XHJcblx0XHRcdFx0Zm9udC1mYW1pbHk6ICdteUZvbnQnO1xyXG5cdFx0XHRcdGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Jjo6YWZ0ZXJ7XHJcblx0XHRcdFx0XHRib3JkZXI6IG5vbmU7XHJcblx0XHRcdFx0XHRib3JkZXItY29sb3I6ICNkMWQxZDE7XHJcblx0XHRcdFx0XHRib3JkZXItcmFkaXVzOiAwO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT5cclxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxcXFxkaXN0XFxcXGxvYWRlci5qcz8/cmVmLS0xMC1vbmVPZi0xLTAhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcY3NzLWxvYWRlclxcXFxkaXN0XFxcXGNqcy5qcz8/cmVmLS0xMC1vbmVPZi0xLTEhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxsb2FkZXJzXFxcXHN0eWxlUG9zdExvYWRlci5qcyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tMTAtb25lT2YtMS0yIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXHBvc3Rjc3MtbG9hZGVyXFxcXHNyY1xcXFxpbmRleC5qcz8/cmVmLS0xMC1vbmVPZi0xLTMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcbGVzcy1sb2FkZXJcXFxcZGlzdFxcXFxjanMuanM/P3JlZi0tMTAtb25lT2YtMS00IUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlclxcXFxpbmRleC5qcz8/cmVmLS0xMC1vbmVPZi0xLTUhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx3ZWJwYWNrLXVuaS1tcC1sb2FkZXJcXFxcbGliXFxcXHN0eWxlLmpzIS4vaG9tZS52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWxlc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cXFxcZGlzdFxcXFxsb2FkZXIuanM/P3JlZi0tMTAtb25lT2YtMS0wIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGNzcy1sb2FkZXJcXFxcZGlzdFxcXFxjanMuanM/P3JlZi0tMTAtb25lT2YtMS0xIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcbG9hZGVyc1xcXFxzdHlsZVBvc3RMb2FkZXIuanMhRjpcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTEwLW9uZU9mLTEtMiFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxwb3N0Y3NzLWxvYWRlclxcXFxzcmNcXFxcaW5kZXguanM/P3JlZi0tMTAtb25lT2YtMS0zIUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXGxlc3MtbG9hZGVyXFxcXGRpc3RcXFxcY2pzLmpzPz9yZWYtLTEwLW9uZU9mLTEtNCFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHdlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXJcXFxcaW5kZXguanM/P3JlZi0tMTAtb25lT2YtMS01IUY6XFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyFGOlxcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL2hvbWUudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1sZXNzJlwiIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU5NDM3MDk5MTcxM1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCJGOi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImhtclwiOnRydWUsXCJwdWJsaWNQYXRoXCI6XCIuLi8uLi9cIixcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0=