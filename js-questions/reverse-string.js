// Create a function to reverse a string

/*
    reverse('Hello, world!'); // !dlrow ,olleH
*/

/** 
Suggestions for Improvement: in function below
Avoid Creating Extra Arrays: You can reverse the array in place or use built-in methods to avoid creating a new array (reverseArr), which improves memory efficiency.
Use const or let: Always declare variables using let or const to avoid polluting the global scope. The i in your loop is missing a declaration.
Leverage Built-in Methods: JavaScript's built-in .reverse() can make the function much shorter and easier to read.
Edge Case Handling: Consider adding checks for empty strings, null, or undefined inputs.
 */
function reverse(str) {
  const arr = str.split("");
  const reverseArr = [];
  for (i = arr.length - 1; i >= 0; i--) {
    reverseArr.push(arr[i]);
  }
  return reverseArr.join("");
}

// Optimized Solution:
/**
 Explanation:
   split("") converts the string into an array of characters.
   reverse() reverses the array in place.
   join("") converts the reversed array back into a string.
 */
function reverse(str) {
  return str.split("").reverse().join("");
}

// For Loops Alternative (Optimized Manual Reversal):
function reverse(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}
