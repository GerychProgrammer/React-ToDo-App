import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/registration' element={<Registration/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/home' element={<Home />}/>  
        <Route exact path='/' element={<Navigate to="/registration" replace={true} />}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;