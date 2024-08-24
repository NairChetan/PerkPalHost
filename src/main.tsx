import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/Theme/theme"; // Import your custom theme
import "./index.css";
import { useAuthProvider } from "./auth/hooks/auth-provider";


const {AuthProvider} = useAuthProvider();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <AuthProvider>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
   </AuthProvider>
    
  </React.StrictMode>
);
