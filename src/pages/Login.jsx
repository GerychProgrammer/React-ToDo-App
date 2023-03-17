import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.scss";
import accounts from "../data/accounts.json"

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  if (JSON.parse(localStorage.getItem("users")) === null) {
    localStorage.setItem("users", JSON.stringify(accounts))
  }
  const localAccounts = JSON.parse(localStorage.getItem("users"));

  const authorization = (e) => {
    e.preventDefault();

    let isValidate = false;

    isValidate = localAccounts.some((element) => element.email === email && element.password === password);
    
    localAccounts.forEach(element => {
      if (element.email === email) {
        localStorage.setItem("userName", JSON.stringify(element.name))
      }
    });

    if (isValidate) {
      props.setAuth(true);
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