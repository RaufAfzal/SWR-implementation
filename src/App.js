import TodoList from "./features/TodoList";
import { preload } from "swr";
import { getTodos, todosApiEndPoint as cacheKey } from "./api/todoapi";


preload(cacheKey, getTodos)
function App() {
  return (
    <div className="App">
      <TodoList/>
    </div>
  );
}

export default App;
