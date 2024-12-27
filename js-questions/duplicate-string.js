// Create a function that takes a string and returns a
// new string with duplicates removed

/*
 const str = 'This is is a test test string';
 removeDuplicates(str); // 'This is a test string'
 */

// Solution 1
/**
 * Inefficient: The nested forEach loop results in a time complexity of O(n²) (quadratic), which can become slow for large strings.
 * Verbose: The itemFound variable adds unnecessary complexity.
 */
function removeDuplicates(str) {
  const arr = str.split(" ");
  const newArr = [];

  arr.forEach((str, strIndex) => {
    let itemFound = false;
    newArr.forEach((item) => {
      if (item === arr[strIndex]) {
        itemFound = true;
      }
    });
    if (!itemFound) newArr.push(str);
  });
  return newArr.join(" ");
}

// solution 2
/**
 * Still Inefficient: The includes method runs in O(n) for each word, making the overall complexity O(n²).
 */
function removeDuplicates(str) {
  const arr = str.split(" ");
  const newArr = [];

  arr.forEach((str, strIndex) => {
    if (!newArr.includes(str)) {
      newArr.push(str);
    }
  });
  return newArr.join(" ");
}

// Solution 3
/**
 * The Set data structure ensures unique elements with O(1) insertion and lookup.
 * The overall time complexity is O(n).
 * The code is shorter, cleaner, and easier to understand.
 */
function removeDuplicates(str) {
  const arr = str.split(" ");
  const set = new Set(arr);
  //   const newString = Array.from(set).join(" ");
  const newString = [...set].join(" ");
  return newString;
}
console.log(removeDuplicates("this this is is a test string"));
