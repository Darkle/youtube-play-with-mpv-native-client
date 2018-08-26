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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/appMain.lsc");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/appMain.lsc":
/*!*************************!*\
  !*** ./app/appMain.lsc ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

var _nodeMpv = __webpack_require__(/*! node-mpv */ "node-mpv");

var _nodeMpv2 = _interopRequireDefault(_nodeMpv);

var _chromeNativeMessaging = __webpack_require__(/*! chrome-native-messaging */ "chrome-native-messaging");

var _chromeNativeMessaging2 = _interopRequireDefault(_chromeNativeMessaging);

var _pFinally = __webpack_require__(/*! p-finally */ "p-finally");

var _pFinally2 = _interopRequireDefault(_pFinally);

var _youtubeRegex = __webpack_require__(/*! youtube-regex */ "./node_modules/youtube-regex/index.js");

var _youtubeRegex2 = _interopRequireDefault(_youtubeRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*****
* Based on https://github.com/winneon/watch-with-mpv/blob/master/native/native.js
*/

const input = new _chromeNativeMessaging2.default.Input();
const transform = new _chromeNativeMessaging2.default.Transform(messageHandler);
const output = new _chromeNativeMessaging2.default.Output();

process.stdin.pipe(input).pipe(transform).pipe(output).pipe(process.stdout);

function messageHandler({ url, cookies, mpvOptions }, push, done) {
  if (!isValidYoutubeUrl(url)) return;

  const cookiesFilePath = createCookiesFile(cookies);
  const mpv = createNewMpvInstance(mpvOptions, cookiesFilePath);

  mpv.setMultipleProperties({
    'volume': mpvOptions.volume
  });

  (0, _pFinally2.default)(mpv.start().then(function () {
    return mpv.load(url);
  }).then(function () {
    if (mpvOptions.startingPosition) {
      return mpv.goToPosition(mpvOptions.startingPosition);
    }
  }), done).catch(function (error) {
    return console.log(error);
  });
}function createNewMpvInstance(mpvOptions, cookiesFilePath) {
  return new _nodeMpv2.default({ 'debug': false }, ['--cookies', `--cookies-file="${cookiesFilePath}"`, `--ytdl-raw-options=cookies="${cookiesFilePath}"`]);
}function createCookiesFile(cookies) {
  const cookiesFilePath = _path2.default.join(process.env.TEMP, 'cookies.txt');
  _fs2.default.writeFileSync(cookiesFilePath, cookies.join('\n'));
  return cookiesFilePath;
}function isValidYoutubeUrl(url) {
  return url.length < 1000 && (0, _youtubeRegex2.default)().test(url);
}

/***/ }),

/***/ "./node_modules/youtube-regex/index.js":
/*!*********************************************!*\
  !*** ./node_modules/youtube-regex/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * youtube-regex <https://github.com/tunnckoCore/youtube-regex>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */



module.exports = function youtubeRegex() {
  var regex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g;

  return regex;
};


/***/ }),

/***/ "chrome-native-messaging":
/*!******************************************!*\
  !*** external "chrome-native-messaging" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chrome-native-messaging");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "node-mpv":
/*!***************************!*\
  !*** external "node-mpv" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-mpv");

/***/ }),

/***/ "p-finally":
/*!****************************!*\
  !*** external "p-finally" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("p-finally");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=appMain-compiled.js.map