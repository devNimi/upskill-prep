// Implement debounce

function debounce(callback, timeToWait) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      callback.apply(this, args); // Maintain `this` and pass arguments
    }, timeToWait);
  };
}

// Implement throttle
function debounce(callback, timeToWait) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(this, args); // Maintain `this` and pass arguments
    }, timeToWait);
  };
}
