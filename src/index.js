import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";

//SnackbarProvider facilitates the display of snackbars or toast notifications, while BrowserRouter enables client-side routing, allowing you to navigate between 
//different views in your application.
ReactDOM.render(
  <React.StrictMode>
        <SnackbarProvider
          maxSnack={1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          preventDuplicate
        >
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </SnackbarProvider>
  </React.StrictMode>,
   document.getElementById("root")
);
