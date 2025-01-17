import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
  signInRedirectURL: "https://localhost:3000/BookStore",
  signOutRedirectURL: "https://localhost:3000",
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
