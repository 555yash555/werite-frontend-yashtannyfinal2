import React, { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import socket from "./socket.js";

// import './bootstrap.min.css'

socket.emit("joinRoom");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
