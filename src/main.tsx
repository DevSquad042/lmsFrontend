
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import './Styles/index.css'
import App from './App.tsx'

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Wrap your App component with BrowserRouter for routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
=======
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={Store}>
    <GoogleOAuthProvider clientId="1046556497634-2qd94236td1kn6t0g5dtcplurq8gul0a.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
>>>>>>> 30ce23699a537e1bee6b55313df107fc70d5b074
);

