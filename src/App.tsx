import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { AuthProvider } from "@asgardeo/auth-react";


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
