import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {publicRoutes, privateRoutes} from "./routes/routes.js";
import { AuthContext, ModifiedTodos, CurrentModifiedTodo } from "./context/context.js";

function App() {
  const [isAuth, setAuth] = useState(false);
  const [modifiedTodos, setModifiedTodos] = useState([]);
  const [currentModifiedTodo, setCurrentModifiedTodo] = useState({});
  
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setAuth
    }}>
      <ModifiedTodos.Provider value={{
      modifiedTodos,
      setModifiedTodos    
    }}>
      <CurrentModifiedTodo.Provider value = {{
        currentModifiedTodo,
        setCurrentModifiedTodo
      }}>
          <BrowserRouter>
              {
                isAuth ?
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
                    <Route exact path='/' element={<Navigate to="/home" replace={true} />}/>              
                  </Routes>
                  :
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
                  </Routes>            
              }
          </BrowserRouter>
        </CurrentModifiedTodo.Provider>
      </ModifiedTodos.Provider>
    </AuthContext.Provider>
  )
}

export default App;