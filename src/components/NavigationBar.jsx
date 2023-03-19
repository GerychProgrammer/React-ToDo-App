import React, { useContext } from 'react'
import { AuthContext } from '../context/context';

const NavigationBar = (props) => {
  const {setAuth} = useContext(AuthContext);

  const logout = () => {
    setAuth(false);
    localStorage.removeItem("auth")
  }

  return (
    <nav>
      <h2>Hello, {props.userName}</h2>
      <div className="nav__wrapper">
        <button onClick={() => {logout()}} className = "nav__wrapper--button">Logout</button>
      </div>
    </nav>
  )
}

export default NavigationBar;