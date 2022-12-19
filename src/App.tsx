import { useState } from "react";

function App() {
  const [count, setCount] = useState(0)
  const name = "John Smith"
  if (count === 5) {
    throw new Error("Some exception here")
  }
  debugger
  return (
    <div>
      Example app to render components in.
      <p>Name: {name}</p>
      <p>Count: <span id="count">{count}</span></p>
      <button onClick={() => {
        setCount((previous) => previous + 1)
      }}>Increment</button>
    </div>
  );
}

export default App;
