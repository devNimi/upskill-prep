/**
 * In this question, the candidate needs to implement a function customReverse that mimics the behaviour of Array.prototype.reverse method.

More about Array.prototype.reverse

The reverse() method reverses an array in place and returns the reference to the same array, 
the first array element now becoming the last, and the last array element becoming the first.
 In other words, elements order in the array will be turned towards the direction opposite to 
 that previously stated.
 */

// EXAMPLES
// =================================================================
const array = ["one", "two", "three"];
console.log("array:", array);
// expected output: "array:" Array ["one", "two", "three"]

const reversed = array.reverse();
console.log("reversed:", reversed);
// expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log("array:", array);
// expected output: "array:" Array ["three", "two", "one"]
// =================================================================

function customReverse() {
  // DO NOT REMOVE
  "use strict";

  let left = 0; // O(1)
  let right = this.length - 1; // O(1)

  while (left < right) {
    // O(n/2)
    const temp = this[left];
    this[left] = this[right];
    this[right] = temp;
    left++;
    right--;
  }
  return this;

  // bad solution
  //   if(!Array.isArray(this)) {
  //     throw new TypeError("Expected array found something else")
  //   }

  //   const revArray = []
  //   for(let i = this.length-1; i>=0; i--) {
  //     revArray.push(this[i])
  //   }

  // // override the original array
  //   for(let i = 0; i < this.length; i++) {
  //     this[i] = revArray[i]
  //   }
  //   return this
}

Array.prototype.customReverse = customReverse;
