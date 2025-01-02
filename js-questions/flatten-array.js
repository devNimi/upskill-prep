// Without using .flat(), create a function to flatten an array

// const exampleArray = [1,2,[3,4, [5,6,7], 8], 9, 10];
// flatten(exampleArray); // [1,2,3,4,5,6,7,8,9,10]

// first solution
// const flattenArray = [];
function flatten(arr) {
  arr.map((item) => {
    if (Array.isArray(item)) {
      flatten(item);
    } else {
      flattenArray.push(item);
    }
  });
  return flattenArray;
}

/**
 * Better solution -
 * The flattenArray is defined outside the flatten function, making it a global variable.
 * This means subsequent calls to flatten with different arrays would modify the same flattenArray, leading to incorrect results.
 * map() is intended for transforming arrays and returning a new array, but you're not using its return value.
 * In this case, forEach() or a for loop would be more appropriate.
 */
function flatten(arr) {
  const result = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...flatten(item)); // Recursively flatten and spread the result
    } else {
      result.push(item);
    }
  });

  return result;
}

/**
 * using reduce
 */

function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

// one more using reduce
function flatten(arr) {
  return arr.reduce(function (prev, curr) {
    if (Array.isArray(curr)) {
      prev = prev.concat(flatten(curr));
    } else {
      prev.push(curr);
    }
    return prev;
  }, []);
}

const exampleArray = [1, 2, [3, 4, [5, 6, 7], 8], 9, 10];
console.log(flatten(exampleArray)); // [1,2,3,4,5,6,7,8,9,10]
