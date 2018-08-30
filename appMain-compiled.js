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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(2);

var _fs2 = _interopRequireDefault(_fs);

var _crypto = __webpack_require__(3);

var _crypto2 = _interopRequireDefault(_crypto);

var _nodeMpv = __webpack_require__(4);

var _nodeMpv2 = _interopRequireDefault(_nodeMpv);

var _chromeNativeMessaging = __webpack_require__(5);

var _chromeNativeMessaging2 = _interopRequireDefault(_chromeNativeMessaging);

var _pFinally = __webpack_require__(6);

var _pFinally2 = _interopRequireDefault(_pFinally);

var _parsertest = __webpack_require__(7);

var _logging = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { videoNoTimeStamp, videoWithTimeStamp, videoNeedToSignIn } from './debugMockData.lsc' //TODO: REMOVE THIS and switch to orig if my PR is accepted

// import { YouTubeURLParser } from '@iktakahiro/youtube-url-parser'
const mpvPath = _path2.default.join(process.cwd(), 'mpv.exe'); //TODO:remove this and its file when done

const cookiesFilePath = _path2.default.join(process.cwd(), 'cookies.txt');

const input = new _chromeNativeMessaging2.default.Input();
const transform = new _chromeNativeMessaging2.default.Transform(messageHandler);
const output = new _chromeNativeMessaging2.default.Output();

//TODO: remove this
// messageHandler(videoWithTimeStamp, null, () -> return)
// messageHandler(videoNoTimeStamp, null, () -> return)
// messageHandler(videoNeedToSignIn, null, () -> return)
/*****
* Based on https://github.com/winneon/watch-with-mpv/blob/master/native/native.js
*/
function messageHandler({ url, cookies, mpvOptions }, push, done) {
  _logging.logger.debug('messageHandler ');
  _logging.logger.debug(url);
  _logging.logger.debug(cookies);
  _logging.logger.debug(mpvOptions);

  const ytParser = new _parsertest.YouTubeURLParser(url);

  if (!ytParser.isValid(url)) return;

  createCookiesFile(cookies);
  const mpvPlayer = createNewMpvInstance(mpvOptions);

  (0, _pFinally2.default)(mpvPlayer.start().then(function () {
    return mpvPlayer.volume(mpvOptions.volume);
  }).then(function () {
    return mpvPlayer.load(cleanYoutubeUrl(url));
  }).then(function () {
    const videoStartPosition = ytParser.getStartAtSecond();
    // If it's 10 seconds or less then it's not worth skipping ahead
    if (videoStartPosition > 10) {
      return mpvPlayer.goToPosition(videoStartPosition);
    }
  }).then(function () {
    if (mpvOptions.startMPVpaused) return mpvPlayer.pause();
  }), done).catch(_logging.logger.error);

  mpvPlayer.on('crashed', function () {
    _logging.logger.error('mpv crashed');
    done();
    return setTimeout(function () {
      return process.exit(1);
    }, 3000);
  });
}function createNewMpvInstance(mpvOptions) {
  return new _nodeMpv2.default({
    binary: mpvPath,
    'ipc_command': '--input-ipc-server',
    socket: `\\\\.\\pipe\\mpvserver${generateRandomString()}`
  }, ['--cookies', `--cookies-file="${cookiesFilePath}"`, `--ytdl-raw-options=cookies="${cookiesFilePath}"`, generateScriptOpts(mpvOptions.oscStyle), mpvOptions.alwaysOnTop ? `--ontop` : ``, generateYTvideoQualityOpts(mpvOptions.videoQuality), generateMPVwindowSizeOpts(mpvOptions.defaultMpvWindowSize)]);
}function generateRandomString() {
  return _crypto2.default.randomBytes(8).toString('hex');
}function generateMPVwindowSizeOpts(defaultMpvWindowSize) {
  return defaultMpvWindowSize === 'off' ? `` : `--autofit=${defaultMpvWindowSize}`;
}function generateYTvideoQualityOpts(videoQuality) {
  return videoQuality === 'original' ? `` : `--ytdl-format=${videoQuality}`;
}function generateScriptOpts(osc) {
  if (osc === 'box') return `--script-opts=osc-layout=box,osc-scalewindowed=1.2`;
  return `--script-opts=osc-scalewindowed=1.2`;
}function createCookiesFile(cookies) {
  return _fs2.default.writeFileSync(cookiesFilePath, cookies);
} /*****
  * I had some issues with mpv where if the youtube url had stuff at the end of it -
  * e.g. https://www.youtube.com/watch?v=WUC863mOtTc&feature=youtu.be&t=2398, then
  * mpv would seem to ignore any command line flags after the url, so gonna clean it.
  */
function cleanYoutubeUrl(url) {
  const parser = new _parsertest.YouTubeURLParser(url);
  return `https://www.youtube.com/watch?v=${parser.getId()}`;
}process.stdin.pipe(input).pipe(transform).pipe(output).pipe(process.stdout);
process.on('unhandledRejection', _logging.logger.error);
process.on('uncaughtException', _logging.logger.error);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("node-mpv");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("chrome-native-messaging");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("p-finally");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YouTubeURLParser = undefined;

var _qs = __webpack_require__(8);

const validHost = /^(www.youtube.com|youtu.be)$/;
const validPathname = /^.*\/([a-zA-Z0-9_-]{11})$/;
const validId = /^([a-zA-Z0-9_-]{11})$/;
const validStartAt = /^((\d{1,2})h)?((\d{1,2})m)?((\d{1,2})s)?$/;
const URL = process ? __webpack_require__(9).URL : URL;

let YouTubeURLParser = exports.YouTubeURLParser = class YouTubeURLParser {
    constructor(url) {

        const parser = new URL(url);
        parser.href = url;
        this.parsedURL = parser;

        const query = (0, _qs.parse)(this.parsedURL.search, { ignoreQueryPrefix: true });
        this.id = (validPathname.exec(this.parsedURL.pathname) || [])[1] || null;
        if (this.id === null) {
            this.id = (validId.exec(query["v"]) || [])[1] || null;
        }
        delete query["watch"];
        this.search = (0, _qs.stringify)(query, { addQueryPrefix: false });

        const startAt = validStartAt.exec(query["t"]) || [] || null;
        if (startAt) {
            this._startAt = {
                hour: Number(startAt[2]) || 0,
                minute: Number(startAt[4]) || 0,
                second: Number(startAt[6]) || 0
            };
        }
    }

    /**
     * Checks whether URL is valid or invalid.
     */
    isValid() {
        if (!validHost.test(this.parsedURL.hostname)) {
            return false;
        }
        if (this.id === null) {
            return false;
        }
        return true;
    }

    /**
     * Returns the id of a YouTube video.
     * @return {string | null} id
     */
    getId() {
        if (!this.isValid()) {
            return null;
        }
        return this.id;
    }

    /**
     * Return the canonical URL of a YouTube video.
     * @return {string | null} URL
     */
    getCanonicalURL() {
        if (!this.isValid()) {
            return null;
        }
        return `https://www.youtube.com/watch?v=${this.id}&${this.search}`;
    }

    /**
     * Return the embedding URL of a YouTube video.
     * @return {string | null} URL
     */
    getEmbeddingURL() {
        if (!this.isValid()) {
            return null;
        }
        return `https://www.youtube.com/embed/${this.id}?${this.search}`;
    }

    /**
     * Return the short URL of a YouTube video.
     * @return {string | null} URL
     */
    getShortURL() {
        if (!this.isValid()) {
            return null;
        }
        return `https://youtu.be/${this.id}?${this.search}`;
    }

    /**
     * Return the start time (second) of a YouTube video.
     * @return {number} second
     */
    getStartAtSecond() {
        if (!this.isValid()) {
            return null;
        }
        return this._startAt.hour * 60 * 60 + this._startAt.minute * 60 + this._startAt.second;
    }

    /**
     * Return the thumbnail URL of a YouTube video.
     * @return {string | null} ULR
     */
    getThumbnailURL() {
        if (!this.isValid()) {
            return null;
        }
        return `https://img.youtube.com/vi/${this.id}/0.jpg`;
    }

    /**
     * Return the HTML string for embedding.
     * @return {string | null} HTML string
     */
    getIframe(options) {
        if (!this.isValid()) {
            return null;
        }

        // set default values
        const options2 = {
            allowFullScreen: options["allowFullScreen"] === undefined ? true : options.allowFullScreen,
            frameBorder: options["frameBorder"] === undefined ? 0 : options.frameBorder,
            responsive: options["responsive"] === undefined ? true : options.responsive,
            noCookie: options["noCookie"] === undefined ? false : options.noCookie
        };

        const domain = options2.noCookie ? "www.youtube-nocookie.com" : "www.youtube.com";
        return `<div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" type="text/html"
        src="https://${domain}/embed/${this.id}?rel=0&amp;start=${this.getStartAtSecond() || 0}"
        frameborder="${options2.frameBorder}" ${options2.allowFullScreen ? "allowfullscreen" : ""}></iframe>
        </div>`;
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _winston = __webpack_require__(11);

var _winston2 = _interopRequireDefault(_winston);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileTransport = new _winston2.default.transports.DailyRotateFile({
  filename: 'yt-open-in-mpv-native-client-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: '3d'
});

const transports = [fileTransport];

if (false) {}

const logger = _winston2.default.createLogger({
  level: 'debug',
  format:  false ? undefined : _winston2.default.format.json(),
  transports
});

exports.logger = logger;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("winston-daily-rotate-file");

/***/ })
/******/ ]);