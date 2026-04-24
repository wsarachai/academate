import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "../features/students/studentApi";

export function renderWithProviders(ui, { preloadedState = {} } = {}) {
  const store = configureStore({
    reducer: {
      [studentApi.reducerPath]: studentApi.reducer,
    },
    middleware: (gDM) => gDM().concat(studentApi.middleware),
    preloadedState,
  });
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
