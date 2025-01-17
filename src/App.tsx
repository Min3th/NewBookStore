import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { AuthProvider } from "@asgardeo/auth-react";
import BookLayer from './Components/BookLayer';


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='BookStore' element={<BookLayer/>}/>
      </Routes>
    </div>
  );
}

export default App;
