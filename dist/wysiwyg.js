(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wysiwyg"] = factory();
	else
		root["wysiwyg"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = open;
function open(url, data, iframe) {
	return new Promise(function (resolve, reject) {
		var ident = btoa(Math.random()).replace(/\=/ig, "");
		var href = url + "?init=" + ident;
		var wnd = void 0;
		if (iframe) {
			iframe.src = href;
			wnd = iframe.contentWindow;
		} else {
			wnd = window.open(href, ident);
		}

		window.addEventListener("message", function (event) {
			if (event.data) {
				var evdata = JSON.parse(event.data);
				var type = evdata.type,
				    id = evdata.id;


				if (id === ident) {
					switch (type) {
						case "init":
							{
								event.source.postMessage(JSON.stringify({
									type: "init",
									id: id,
									data: Object.assign({}, data, { callbackId: id })
								}), "*");
								break;
							}
						case "save":
							{
								resolve(evdata.content);
								if (evdata.close) {
									event.source.close();
								}
								break;
							}
						case "cancel":
							{
								reject("cancel");
								break;
							}
					}
				}
			}
		});

		return {
			save: function save() {
				wnd.postMessage(JSON.stringify({
					type: "save",
					id: ident
				}), "*");
			},
			cancel: function cancel() {
				wnd.postMessage(JSON.stringify({
					type: "cancel",
					id: ident
				}), "*");
			},
			changemode: function changemode(mode) {
				wnd.postMessage(JSON.stringify({
					type: "changemode",
					id: ident,
					mode: mode
				}), "*");
			}
		};
	});
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=wysiwyg.js.map