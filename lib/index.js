"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
function debounce(func) {
  var wait = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];
  var immediate = arguments[2];

  var timeout = void 0;

  function debounced() {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };

  debounced.clear = function () {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return debounced;
};
module.exports = exports['default'];