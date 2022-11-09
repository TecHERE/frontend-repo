import { useState } from "react";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const testAPI = async () => {
    const response = await axios.get<Test>(
      "https://test-3b643-default-rtdb.firebaseio.com/.json"
    );
    setCount(response.data.test[1]);
  };
  return (
    <div className="App">
      <button onClick={testAPI}>click</button>
      <h1>{count}</h1>
    </div>
  );
}

export default App;

interface Test {
  test: number[];
}
