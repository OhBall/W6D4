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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection{\n  constructor(HTMLElements){\n    this.HTMLElements = HTMLElements;\n    return this;\n  }\n\n  html(_string){\n    if (_string !== undefined) {\n      for (let i = 0; i < this.HTMLElements.length; i++) {\n        this.HTMLElements[i].innerHTML = _string;\n      }\n    } else {\n      return this.HTMLElements[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html.call(this, \"\");\n  }\n\n  append(arg){\n    for (var i = 0; i < this.HTMLElements.length; i++) {\n      if (arg instanceof DOMNodeCollection) {\n        for (var j = 0; j < arg.HTMLElements.length; j++) {\n          this.HTMLElements[i].innerHTML += arg.HTMLElements[j].outerHTML;\n        }\n      } else if (arg instanceof String){\n        this.HTMLElements[i].innerHTML += arg;\n      } else {\n        this.HTMLElements[i].innerHTML += arg.outerHTML;\n      }\n    }\n  }\n\n  attr(attrName, _value) {\n    if (_value === undefined) {\n      return this.HTMLElements[0].getAttribute(attrName);\n    } else {\n      for (var i = 0; i < this.HTMLElements.length; i++) {\n        this.HTMLElements[i].setAttribute(attrName, _value);\n      }\n    }\n  }\n\n  addClass(className){\n    for (var i = 0; i < this.HTMLElements.length; i++) {\n      const oldClasses = this.HTMLElements[i].getAttribute(\"class\");\n      let newClasses;\n      if (oldClasses === null) {\n        newClasses = className;\n      } else {\n        newClasses = oldClasses + \" \" + className;\n      }\n      this.HTMLElements[i].setAttribute(\"class\", newClasses);\n    }\n  }\n\n  removeClass(_className) {\n    for (var i = 0; i < this.HTMLElements.length; i++) {\n      if (_className === undefined) {\n        this.HTMLElements[i].removeAttribute('class');\n      } else {\n        let classString = this.HTMLElements[i].getAttribute('class');\n        let oldClasses = classString.split(' ');\n        let removeClasses = _className.split(' ');\n        let newClasses = [];\n\n        for (var j = 0; j < oldClasses.length; j++) {\n\n          if (!removeClasses.includes(oldClasses[j])) {\n            newClasses.push(oldClasses[j]);\n          }\n        }\n        this.HTMLElements[i].setAttribute('class', newClasses.join(' '));\n      }\n    }\n  }\n\n  children(_selector) {\n    let child = [];\n    for (var i = 0; i < this.HTMLElements.length; i++) {\n      if (_selector === undefined ) {\n        child = child.concat(Array.from(this.HTMLElements[i].children));\n      } else {\n        let immediateChildren =  Array.from(this.HTMLElements[i].children);\n        for (var j = 0; j < immediateChildren.length; j++) {\n          if (immediateChildren[j].matches(_selector)) {\n            child.push(immediateChildren[j]);\n          }\n        }\n\n      }\n    }\n    return new DOMNodeCollection(child);\n  }\n\n  parent(_selector) {\n    let parents = [];\n    for (var i = 0; i < this.HTMLElements.length; i++) {\n      let htmlEl = this.HTMLElements[i];\n      // debugger\n      if (!parents.includes(htmlEl.parentNode)) {\n        if (_selector === undefined || htmlEl.parentNode.matches(_selector)){\n          parents.push(htmlEl.parentNode);\n        }\n      }\n    }\n    return new DOMNodeCollection(parents);\n  }\n\n  find(selector) {\n    let found =[];\n\n    for (var i = 0; i < this.HTMLElements.length; i++) {\n      let htmlEl = this.HTMLElements[i];\n      found = found.concat(Array.from(htmlEl.querySelectorAll(selector)));\n\n    }\n    return new DOMNodeCollection(found);\n  }\n\n  remove(_selector) {\n    let i = 0;\n    while (i < this.HTMLElements.length ) {\n      let htmlEl = this.HTMLElements[i];\n      if (_selector === undefined || htmlEl.matches(_selector)) {\n        htmlEl.remove();\n        this.HTMLElements.splice(i,1);\n        i--;\n      }\n      i++;\n    }\n  }\n\n  on(eventType, callback) {\n    for (var i = 0; i < this.HTMLElements.length; i++) {\n      let htmlEl = this.HTMLElements[i];\n      htmlEl.addEventListener(eventType, callback);\n      // const prevCallbacks = htmlEl.getAttribute('data-callbacks');\n      // htmlEl.setAttribute('data-callbacks', `~~${callback}~~`);\n      if (htmlEl.callbacks) {\n        htmlEl.callbacks.push(callback);\n      } else {\n        htmlEl.callbacks = [callback];\n      }\n    }\n  }\n\n  off(eventType, callback) {\n    for (var i = 0; i < this.HTMLElements.length; i++) {\n      let htmlEl = this.HTMLElements[i];\n      if (callback) {\n        const cbIdx = htmlEl.callbacks.indexOf(callback);\n        htmlEl.removeEventListener(eventType, htmlEl.callbacks[cbIdx]);\n      } else {\n        for (var j = 0; j < htmlEl.callbacks.length; j++) {\n          htmlEl.removeEventListener(eventType, htmlEl.callbacks[j]);\n          htmlEl.callbacks = [];\n        }\n      }\n    }\n  }\n\n}\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nwindow.$l = function(arg){\n  let elementArray;\n\n  if (typeof arg === 'function') {\n    if (!window.fnArr) {\n      window.fnArr = [arg];\n    } else {\n      window.fnArr.push(arg);\n    }\n    if (document.readyState === \"interactive\" ||\n    document.readyState === 'complete') {\n      arg();\n    } else {\n      document.addEventListener(\"DOMContentLoaded\", arg);\n    }\n  } else if (typeof arg === 'string') {\n    const nodeList = document.querySelectorAll(arg);\n    elementArray = Array.from(nodeList);\n    return new DOMNodeCollection(elementArray);\n\n  } else if (arg.instanceof(HTMLElement)) {\n    elementArray = Array.from(arg);\n    return new DOMNodeCollection(elementArray);\n  }\n\n\n};\n\nwindow.$l.extend = function (...objects) {\n  let firstObject = objects[0];\n  for (var i = 1; i < objects.length; i++) {\n    const keys = Object.keys(objects[i]);\n    for (var j = 0; j < keys.length; j++) {\n      firstObject[keys[j]] = objects[i][keys[j]];\n    }\n  }\n  return firstObject;\n};\n\nwindow.$l.ajax = function (options) {\n\n  const defaults = {\n    success: () => {},\n    error: () => {},\n    url: window.location.href,\n    method: 'GET',\n    data: {},\n    contentType: \"application/x-www-form-urlencoded; charset=UTF-8\"\n    };\n\n  window.$l.extend(defaults, options);\n\n  const xhr = new XMLHttpRequest();\n  xhr.open(defaults.method, defaults.url);\n  xhr.onload = function () {\n\n\n  };\n  xhr.send(defaults.data);\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });