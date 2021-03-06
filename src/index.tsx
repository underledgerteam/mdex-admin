import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AdminContextProvider } from "./context/AdminContext";
import { ActionProvider } from "./context/action.context";
import { NotifierContextProvider } from 'react-headless-notifier';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotifierContextProvider
      config={{
        max: null,
        duration: 5000,
        position: 'topRight'
      }}
    >
      <AdminContextProvider>
        <ActionProvider>
          <App />
        </ActionProvider>
      </AdminContextProvider>
    </NotifierContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
