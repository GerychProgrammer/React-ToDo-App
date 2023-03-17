import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {publicRoutes, privateRoutes} from "./routes/routes.js";
import { AuthContext } from "./context/context.js";

function App() {
  const [isAuth, setAuth] = useState(false);

  if (JSON.parse(localStorage.getItem("todos")) === null) {
    localStorage.setItem("todos", [JSON.stringify([])]);
  }
  return (
    <AuthContext.Provider value={{
      isAuth,
      setAuth
    }}>
      <BrowserRouter>
          {
            isAuth ?
              <Routes>
                {
                  publicRoutes.map(element => (
                    <Route 
                      key = {element.id} 
                      exact = {element.exact} 
                      path = {element.path} 
                      element = {element.component}
                    />
                  ))
                }
                <Route exact path='/' element={<Navigate to="/login" replace={true} />}/> 
              </Routes>
              :
              <Routes>          
                {
                  privateRoutes.map(element => (
                    <Route 
                      key = {element.id} 
                      exact = {element.exact} 
                      path = {element.path} 
                      element = {element.component}
                    />
                  ))
                } 
                <Route exact path='/' element={<Navigate to="/login" replace={true} />}/>              
              </Routes>
            
          }
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;