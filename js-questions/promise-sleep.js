// Question 1 - convert to a promise
function returnApple(callback) {
  setTimeout(() => {
    callback("APPLE");
  }, 500);
}

function returnApplePromisify() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("APPLE");
    }, 500);
  });
}

returnApplePromisify.then((value) => {
  console.log(value);
});

// Question 2
// Create a sleep function that takes one parameter (time) and
// will wait "time" ms

/*
    async function run() {
        await sleep(500);
        console.log('hello');
        await sleep(500);
        console.log('world');
    }
*/

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// ----------------------
// Question 3
// Implement cancellable promise
function cancellablePromise(executor) {
  let cancel;

  const promise = new Promise((resolve, reject) => {
    cancel = () => reject(new Error("Cancelled"));
    return executor(resolve, reject);
  });

  return {
    promise,
    cancel,
  };
}

// Usage
const { promise, cancel } = cancellablePromise((resolve) => {
  const timer = setTimeout(resolve, 1000);
  return () => clearTimeout(timer);
});

// Later...
cancel(); // Cancels the promise
