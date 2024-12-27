/*
  Hi there! Thanks for taking on this code test. The requirements are listed below:
  
  1. Create a "Foods" class or constructor that will take two arguements: a root element and a data object (foodData).
  2. Render all of the items in the data object into the DOM with the root element as the parent
  3. If the user clicks a food item, it should be removed from the list
  
  Rules:
  - Only vanilla JS
  - Feel free to use Google, Bing, DuckDuckGo to look things up
  - Time limit: 30 minutes
*/

/* DO NOT MODIFY */
const rootElement = document.querySelector(".foods");

const foodData = [
  {
    id: 1,
    image: "🌮",
    name: "taco",
  },
  {
    id: 2,
    image: "🍔",
    name: "burger",
  },
  {
    id: 3,
    image: "🍆",
    name: "eggplant",
  },
  {
    id: 4,
    image: "🍎",
    name: "apple",
  },
  {
    id: 5,
    image: "🥞",
    name: "pancakes",
  },
];
/* DO NOT MODIFY */

/** YOUR CODE BELOW **/
class Foods {
  constructor(rootElement, foodData) {
    this.rootElement = rootElement;
    this.foodData = foodData;
  }

  parseData() {
    const fragment = document.createDocumentFragment();

    this.foodData.forEach((food) => {
      const div = document.createElement("div");
      div.classList.add("food-item");
      div.setAttribute("data-id", food.id); // Optional for unique identification
      div.innerHTML = `${food.image} ${food.name}`;
      fragment.appendChild(div);
    });

    return fragment;
  }

  renderHTML() {
    if (!this.rootElement || !this.foodData?.length) return; // Handle empty data or invalid root

    this.rootElement.appendChild(this.parseData());

    this.rootElement.addEventListener("click", (e) => {
      const foodItem = e.target.closest(".food-item");
      if (foodItem) foodItem.remove();
    });
  }
}

const food = new Foods(rootElement, foodData);
food.renderHTML();

//NOTES
/**
 * e.target.closest() - The closest() method is a DOM traversal function that finds the nearest ancestor (or the element itself) that matches a given selector. It is extremely useful when dealing with nested or complex DOM structures.
 * The map method is meant to transform arrays, but you're not using the result of the transformation. A forEach loop would be more appropriate here.
 */
