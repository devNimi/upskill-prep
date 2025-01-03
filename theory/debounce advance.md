### Advanced Features:

1. **Immediate Execution (`leading` flag)**:

   - Executes the function **immediately** on the first call and then debounces subsequent calls.
   - A `trailing` option (default: true) ensures the function is executed one last time after the delay if needed.

2. **Cancel Debounced Call**:
   - Adds a `cancel` method to the returned debounced function to cancel any pending execution.

---

### Implementation:

```javascript
function debounce(
  callback,
  timeToWait,
  options = { leading: false, trailing: true }
) {
  let timeoutId;
  let lastCallTime;
  let result;

  const debounced = function (...args) {
    // const now = Date.now();

    const shouldCallImmediately = options.leading && !timeoutId;

    // Clear the existing timeout
    clearTimeout(timeoutId);

    if (shouldCallImmediately) {
      // Execute immediately if `leading` is true
      result = callback.apply(this, args);
    } else if (options.trailing) {
      // Set a new timeout to call the function after the delay
      timeoutId = setTimeout(() => {
        callback.apply(this, args);
        timeoutId = null; // Reset timeoutId after execution
      }, timeToWait);
    }

    return result;
  };

  // Cancel any pending debounced calls
  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
}
```

---

### Explanation of Features:

1. **Leading Execution**:

   - If `leading` is `true`, the callback will execute **immediately** on the first call.
   - Ensures that subsequent calls within the delay are debounced.

2. **Trailing Execution**:

   - Controlled by `options.trailing` (default: `true`).
   - Ensures the callback executes one final time **after the delay** when no further calls are made.

3. **Cancel Method**:
   - Allows you to cancel any pending execution by calling `debounced.cancel()`.

---

### Usage Examples:

#### 1. Basic Debounce with Immediate Execution:

```javascript
function logMessage(message) {
  console.log(`${Date.now()}: ${message}`);
}

const debouncedLog = debounce(logMessage, 2000, { leading: true });

debouncedLog("Hello"); // Logs immediately: "Hello"
debouncedLog("World"); // Ignored because of debounce
setTimeout(() => debouncedLog("Again"), 3000); // Logs "Again" after 3 seconds
```

---

#### 2. Cancelling a Debounced Call:

```javascript
function logMessage(message) {
  console.log(message);
}

const debouncedLog = debounce(logMessage, 2000);

debouncedLog("Message 1"); // Scheduled to log in 2 seconds
debouncedLog.cancel(); // Cancels the scheduled call, nothing will log
```

---

#### 3. Combining `leading` and `trailing`:

```javascript
function logScrollPosition() {
  console.log(`Scroll position logged at ${window.scrollY}`);
}

// Leading: Log immediately on scroll start
// Trailing: Log again after scrolling stops
const debouncedScroll = debounce(logScrollPosition, 1000, {
  leading: true,
  trailing: true,
});

window.addEventListener("scroll", debouncedScroll);

// You can cancel the listener if needed
setTimeout(() => {
  debouncedScroll.cancel();
  console.log("Debounced scroll listener canceled");
}, 5000);
```

---

### Testing:

```javascript
// Test leading, trailing, and cancellation
const testFunction = debounce((msg) => console.log(msg), 1000, {
  leading: true,
});

testFunction("Call 1"); // Executes immediately
testFunction("Call 2"); // Debounced
testFunction("Call 3"); // Debounced

// Cancel any pending call
testFunction.cancel();
setTimeout(() => testFunction("Final Call"), 1500); // Executes after 1.5 seconds
```

---

### Notes:

- **Performance**: Ensure you test for scenarios like rapid high-frequency events (e.g., `scroll` or `resize`) to verify its efficiency.
- **Customizable Behavior**: The `options` object allows you to configure the behavior as needed.

Let me know if you want further refinements or additional explanations! 😊
