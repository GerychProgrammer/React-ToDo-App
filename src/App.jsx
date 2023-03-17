import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const [isAuth, setAuth] = useState(false);

  if (JSON.parse(localStorage.getItem("todos")) === null) {
    localStorage.setItem("todos", [JSON.stringify([])]);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/registration' element={<Registration/>}/>
        <Route exact path='/login' element={<Login setAuth = {setAuth}/>} />
        {isAuth ? <Route exact path='/home' element={<Home />}/> : <Route exact path='/login' element={<Login />}/>}  
        <Route exact path='/' element={<Navigate to="/login" replace={true} />}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;