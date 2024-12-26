import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';
import Detail from './Detail';
//import
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/Detail" element={<Detail />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
