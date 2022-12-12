import { configureStore, combineReducers } from "@reduxjs/toolkit";
import slice from "./reducerSlice";

const rootReducer = combineReducers({
  toolkit: slice,
});

export const store = configureStore(
  {
    reducer: rootReducer,
    devTools: true,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
