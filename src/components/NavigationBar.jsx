import React from 'react'
import { Link } from "react-router-dom";

const NavigationBar = (props) => {
  return (
    <nav>
      <h2>Hello, {props.userName}</h2>
      <div className="nav__wrapper">
        <Link className = "nav__wrapper--link">Logout</Link>
      </div>
    </nav>
  )
}

export default NavigationBar;