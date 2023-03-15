import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const accounts = JSON.parse(localStorage.getItem("users"));

  const authorization = (e) => {
    e.preventDefault();

    let isValidate = false;

    isValidate = accounts.some((element) => element.email === email && element.password === password);
    
    accounts.forEach(element => {
      if (element.email === email) {
        localStorage.setItem("userName", JSON.stringify(element.name))
      }
    });

    if (isValidate) {
      return navigate("/home");
    } else {
      console.log(false);
    }
  }

  return (
    <div className="login">
      <div className="login__wrapper">
        <h1>Login</h1>
        <form className="login__form">
          <div>
            <label>Email</label>
            <input value = {email} onChange = {e => {setEmail(e.target.value)}} className = "login__name" type = "text" placeholder = "Type here..."/>
          </div>
          <div>
            <label>Password</label>
            <input value = {password} onChange = {e => {setPassword(e.target.value)}} className = "login__password" type = "text" placeholder = "Type here..."/>
          </div>
          <button className = "login__submit" onClick = {e => {authorization(e)}}>Login</button>
        </form>
        <span className = "login__text">Don't have an account? <Link to = "/registration" className = "login__logInLink">Register!</Link></span>
      </div>      
    </div>
  )
}

export default Login;