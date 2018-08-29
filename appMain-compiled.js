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

var _parsertest = __webpack_require__(/*! ./parsertest.lsc */ "./app/parsertest.lsc");

var _logging = __webpack_require__(/*! ./logging.lsc */ "./app/logging.lsc");

var _debugMockData = __webpack_require__(/*! ./debugMockData.lsc */ "./app/debugMockData.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// input = new nativeMessage.Input()
// transform = new nativeMessage.Transform(messageHandler)
// output = new nativeMessage.Output()

// process.stdin
//   .pipe(input)
//   .pipe(transform)
//   .pipe(output)
//   .pipe(process.stdout)

//TODO: remove this
// messageHandler(videoWithTimeStamp, null, () -> return)
//TODO: REMOVE THIS AS IT CONTAINS MY YOUTUBE COOKIE

//TODO:remove this and its file when done

messageHandler(_debugMockData.videoNoTimeStamp, null, function () {
  return;
});
// import { YouTubeURLParser } from '@iktakahiro/youtube-url-parser'


function messageHandler({ url, cookies, mpvOptions }, push, done) {
  _logging.logger.debug('messageHandler ');
  _logging.logger.debug(url);
  _logging.logger.debug(cookies);
  _logging.logger.debug(mpvOptions);
  const ytParser = new _parsertest.YouTubeURLParser(url);
  _logging.logger.debug(ytParser.getStartAtSecond());

  if (!isValidYoutubeUrl(url)) return;

  const cookiesFilePath = createCookiesFile(cookies);
  const mpv = createNewMpvInstance(mpvOptions, cookiesFilePath);

  mpv.on('crashed', function () {
    _logging.logger.error('mpv crashed');
    return done();
  });

  (0, _pFinally2.default)(mpv.start().then(function () {
    return mpv.volume(mpvOptions.volume);
  }).then(function () {
    return mpv.load(cleanYoutubeUrl(url));
  }).then(function () {
    const videoStartPosition = ytParser.getStartAtSecond();
    // If it's 10 seconds or less then it's not worth skipping ahead
    if (videoStartPosition > 10) {
      return mpv.goToPosition(videoStartPosition);
    }
  }).then(function () {
    if (mpvOptions.startMPVpaused) {
      return mpv.pause();
    }
  }), done).catch(_logging.logger.error);
}function createNewMpvInstance(mpvOptions, cookiesFilePath) {
  return new _nodeMpv2.default({
    "binary": _path2.default.join(process.cwd(), 'mpv.exe')
  }, ['--cookies', `--cookies-file="${cookiesFilePath}"`, `--ytdl-raw-options=cookies="${cookiesFilePath}"`, generateScriptOpts(mpvOptions.oscStyle), mpvOptions.alwaysOnTop ? `--ontop` : ``, generateYTvideoQualityOpts(mpvOptions.videoQuality), generateMPVwindowSizeOpts(mpvOptions.defaultMpvWindowSize)]);
}function generateMPVwindowSizeOpts(defaultMpvWindowSize) {
  if (defaultMpvWindowSize === 'off') return ``;
  return `--autofit=${defaultMpvWindowSize}`;
}function generateYTvideoQualityOpts(videoQuality) {
  if (videoQuality === 'original') return ``;
  return `--ytdl-format=${videoQuality}`;
}function generateScriptOpts(osc) {
  if (osc === 'box') return `--script-opts=osc-layout=box,osc-scalewindowed=1.2`;else return `--script-opts=osc-scalewindowed=1.2`;
}function createCookiesFile(cookies) {
  const cookiesFilePath = _path2.default.join(process.cwd(), 'cookies.txt');
  // console.clear()
  // console.log(cookies)
  _fs2.default.writeFileSync(cookiesFilePath, cookies);
  return cookiesFilePath;
}function isValidYoutubeUrl(url) {
  const parser = new _parsertest.YouTubeURLParser(url);
  return url.length < 1000 && parser.isValid();
} /*****
  * I had some issues with mpv where if the youtube url had stuff at the end of it -
  * e.g. https://www.youtube.com/watch?v=WUC863mOtTc&feature=youtu.be&t=2398, then
  * mpv would seem to ignore any command line flags after the url, so gonna clean it.
  */
function cleanYoutubeUrl(url) {
  const parser = new _parsertest.YouTubeURLParser(url);
  return `https://www.youtube.com/watch?v=${parser.getId()}`;
}process.on('unhandledRejection', _logging.logger.error);
process.on('uncaughtException', _logging.logger.error);

/***/ }),

/***/ "./app/debugMockData.lsc":
/*!*******************************!*\
  !*** ./app/debugMockData.lsc ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
__webpack_require__(/*! dotenv */ "dotenv").config();

/*****
* dotenv seems to add extra backslashes to the \t's, so I base64
* encoded the string in the .env file
*/
const cookies = Buffer.from(process.env.DEBUGCOOKIES, 'base64').toString('utf8');

const videoNoTimeStamp = {
  cookies,
  mpvOptions: {
    alwaysOnTop: true,
    defaultMpvWindowSize: '640x360',
    dontLetYTpageVideoAutoLoad: false,
    oscStyle: "bottombar",
    startMPVpaused: false,
    videoQuality: "original",
    volume: 70
  },
  url: "https://www.youtube.com/watch?v=E42D2XF2oAs"
};
const videoWithTimeStamp = {
  cookies,
  mpvOptions: {
    alwaysOnTop: false,
    defaultMpvWindowSize: 'off',
    dontLetYTpageVideoAutoLoad: false,
    oscStyle: "box",
    startMPVpaused: true,
    videoQuality: "original",
    volume: 70
  },
  url: "https://www.youtube.com/watch?v=VFIq94h91sM&t=1h26m15s"
};
const videoNeedToSignIn = {
  cookies,
  mpvOptions: {
    alwaysOnTop: false,
    defaultMpvWindowSize: 'off',
    dontLetYTpageVideoAutoLoad: false,
    oscStyle: "box",
    startMPVpaused: true,
    videoQuality: "original",
    volume: 70
  },
  url: "https://www.youtube.com/watch?v=6LZM3_wp2ps"
};

exports.videoNoTimeStamp = videoNoTimeStamp;
exports.videoWithTimeStamp = videoWithTimeStamp;
exports.videoNeedToSignIn = videoNeedToSignIn;

/***/ }),

/***/ "./app/logging.lsc":
/*!*************************!*\
  !*** ./app/logging.lsc ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = undefined;

var _winston = __webpack_require__(/*! winston */ "winston");

var _winston2 = _interopRequireDefault(_winston);

__webpack_require__(/*! winston-daily-rotate-file */ "winston-daily-rotate-file");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileTransport = new _winston2.default.transports.DailyRotateFile({
  filename: 'yt-open-in-mpv-native-client-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: '7d'
});

const logger = _winston2.default.createLogger({
  level:  true ? 'debug' : undefined,
  format:  true ? _winston2.default.format.prettyPrint() : undefined,
  transports: [fileTransport,  true ? new _winston2.default.transports.Console() : undefined]
});

exports.logger = logger;

/***/ }),

/***/ "./app/parsertest.lsc":
/*!****************************!*\
  !*** ./app/parsertest.lsc ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YouTubeURLParser = undefined;

var _qs = __webpack_require__(/*! qs */ "qs");

const validHost = /^(www.youtube.com|youtu.be)$/;
const validPathname = /^.*\/([a-zA-Z0-9_-]{11})$/;
const validId = /^([a-zA-Z0-9_-]{11})$/;
const validStartAt = /^((\d{1,2})h)?((\d{1,2})m)?((\d{1,2})s)?$/;
const URL = process ? __webpack_require__(/*! url */ "url").URL : URL;

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

/***/ "chrome-native-messaging":
/*!******************************************!*\
  !*** external "chrome-native-messaging" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chrome-native-messaging");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

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

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),

/***/ "winston-daily-rotate-file":
/*!********************************************!*\
  !*** external "winston-daily-rotate-file" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston-daily-rotate-file");

/***/ })

/******/ });
//# sourceMappingURL=appMain-compiled.js.map