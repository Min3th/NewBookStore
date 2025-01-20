import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
  signInRedirectURL: "https://df86d8bc-1f13-4d8e-81ba-4cde2fbabc8f.e1-us-east-azure.choreoapps.dev/BookStore",
  signOutRedirectURL:"https://df86d8bc-1f13-4d8e-81ba-4cde2fbabc8f.e1-us-east-azure.choreoapps.dev",
  clientID: "8RBXh7Ipwl00F_jKW68UaTAImNca",
  baseUrl: "https://api.asgardeo.io/t/min3thindustries",
  scope: ["openid", "profile"],
};


const MyApp = () => {
  return (
    <AuthProvider config={config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<MyApp />);
