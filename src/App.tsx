import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';



const Home = lazy(()=> import('./Pages/Home'));
const BookLayer= lazy(()=> import('./Pages/BookLayer'));

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
