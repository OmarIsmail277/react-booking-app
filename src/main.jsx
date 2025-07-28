import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./store.jsx";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
// import "./styles/global.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
