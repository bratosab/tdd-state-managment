const { createStore } = require("../src/store");
const { countReducer } = require("../src/countReducer");

describe("createStore", () => {
  it("should return a store with getState, dispatch, and subscribe methods", () => {
    const store = createStore(countReducer, 0);
    expect(typeof store.getState).toBe("function");
    expect(typeof store.dispatch).toBe("function");
    expect(typeof store.subscribe).toBe("function");
  });

  it("should handle actions with the reducer when dispatch is called", () => {
    const store = createStore(countReducer, 0);
    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toBe(1);
  });

  it("should call subscribers when dispatch is called", () => {
    const store = createStore(countReducer, 0);
    const listener = jest.fn();
    store.subscribe(listener);
    store.dispatch({ type: "INCREMENT" });
    expect(listener).toHaveBeenCalled();
  });

  it("should return a function from subscribe that removes the listener when called", () => {
    const store = createStore(countReducer, 0);
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.dispatch({ type: "INCREMENT" });
    expect(listener).not.toHaveBeenCalled();
  });
});
