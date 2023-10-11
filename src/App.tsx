import { useQuery } from "@tanstack/react-query";
import * as api from "./api";

function App() {
  const { data, status } = useQuery(["curzon"], api.curzon);
  return (
    <>
      <h1>Today</h1>
      <pre>
        {status}
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  );
}

export default App;
