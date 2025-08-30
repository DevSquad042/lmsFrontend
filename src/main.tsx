
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import './Styles/index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Wrap your App component with BrowserRouter for routing */}
    <BrowserRouter>
    <GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID=1046556497634-2qd94236td1kn6t0g5dtcplurq8gul0a.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

