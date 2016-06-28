export default function debounce(func, wait = 100, immediate) {
  let timeout;

  function debounced() {
    const context = this;
    const args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };

  debounced.clear = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  return debounced;
};