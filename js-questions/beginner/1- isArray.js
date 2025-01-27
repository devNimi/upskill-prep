function customIsArray(value) {
  // write your code below
  return Object.prototype.toString.call(value) === "[object Array]";
}

// all following calls return true
customIsArray([]);
customIsArray([1]);
customIsArray(new Array());
customIsArray(new Array("a", "b", "c", "d"));
customIsArray(new Array(3));
customIsArray(Array.prototype);

// all following calls return false
customIsArray();
customIsArray({});
customIsArray(null);
customIsArray(undefined);
customIsArray(17);
customIsArray("Array");
customIsArray(true);
customIsArray(false);
customIsArray(new Uint8Array(32));
