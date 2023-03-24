import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = (props) => {
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate("");

  const logout = () => {
    setAuth(false);
    localStorage.removeItem("auth")
  }

  return (
    <nav>
      <h2>Hello, {props.userName}</h2>
      <div className="nav__wrapper">
        <button onClick={() => {navigate("/home")}} className = "nav__wrapper--button">Home</button>
        <button onClick={() => {navigate("/history")}} className = "nav__wrapper--button">History</button>
        <button onClick={() => {logout()}} className = "nav__wrapper--button">Logout</button>
      </div>
    </nav>
  )
}

export default NavigationBar;