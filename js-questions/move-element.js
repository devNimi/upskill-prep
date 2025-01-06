// Create a function to move an element. The function arguments are,
// distance, duration, and the element to move.

/*
    function moveElement(duration, distance, element) {}
*/

function moveElement(duration, distance, element) {
  const start = performance.now();

  function move(currentTime) {
    const elapsedTime = currentTime - start;
    const progress = elapsedTime / duration;

    const amountToMove = progress * distance;
    element.style.transform = `translateX(${amountToMove}px)`;

    if (progress < 1) {
      requestAnimationFrame(move);
    }
  }

  move(performance.now());
}

// other solutions
function moveElement(duration, distance, element) {
  const startTime = Date.now();
  let animationId;

  // Store initial position if exists
  const initialTransform = element.style.transform || "translate(0px)";

  function move() {
    const timeElapsed = Date.now() - startTime;

    if (timeElapsed >= duration) {
      // Set to final position
      element.style.transform = `translate(${distance}px)`;
      cancelAnimationFrame(animationId);
      return;
    }

    // Calculate current position
    const progress = timeElapsed / duration;
    const currentDistance = distance * progress;

    // Apply transform
    element.style.transform = `translate(${currentDistance}px)`;

    // Continue animation
    animationId = requestAnimationFrame(move);
  }

  animationId = requestAnimationFrame(move);

  // Optionally return a way to cancel the animation
  return {
    cancel: () => cancelAnimationFrame(animationId),
  };
}

// Additional Enhancements You Could Add:
// Easing functions: Implement easing functions to make the animation more visually appealing.

function moveElement(duration, distance, element, easing = "linear") {
  const easings = {
    linear: (t) => t,
    easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  };

  const move = () => {
    // ... existing code ...
    const progress = easings[easing](timeElapsed / duration);
    // ... rest of code ...
  };
}

// 2. Direction Support:
function moveElement(duration, distance, element, direction = "x") {
  const move = () => {
    // ... existing code ...
    const transform =
      direction === "x"
        ? `translateX(${currentDistance}px)`
        : `translateY(${currentDistance}px)`;
    // ... rest of code ...
  };
}

// 3. Promise Support:
function moveElement(duration, distance, element) {
  return new Promise((resolve, reject) => {
    // ... existing code ...

    if (timeElapsed >= duration) {
      resolve();
      return;
    }
    // ... rest of code ...
  });
}

// Usage:
await moveElement(1000, 100, myElement);
console.log("Animation completed!");
