// Implement Function.prototype.bind()

// refer to theory section as well

/*
    const foo = function() {
        console.log(this.bar);
    }

    let baz = foo.bind({bar: 'hello'})

    baz(); // Hello
*/

// quick solution
Function.prototype.bind = function (context) {
  const _this = this;
  return function () {
    _this.apply(context);
  };
};

// better solution
Function.prototype.myBind = function (newThis, ...boundArgs) {
  // Save reference to the original function
  const originalFunction = this;

  // Return a new function
  return function (...args) {
    // Call the original function with the correct `this` and arguments
    return originalFunction.apply(newThis, [...boundArgs, ...args]);
  };
};
