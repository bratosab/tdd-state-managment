import { createStore } from "./src/store";
import { countReducer } from "./src/countReducer";

export function setupCounter(element) {
  const store = createStore(countReducer, 0);

  const setCounter = (count) => {
    element.innerHTML = `count is ${count}`;
  };

  element.addEventListener("click", () =>
    store.dispatch({ type: "INCREMENT" })
  );
  
  store.subscribe(() => setCounter(store.getState()));
  setCounter(store.getState());
}
