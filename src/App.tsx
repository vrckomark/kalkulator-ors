import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Dodaj</button>
      <p>{count}</p>
    </div>
  );
}

export default App;
