import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/registration.scss";
import accounts from "../data/accounts.json";
import { AuthContext } from "../context/context";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate("");
  
  const addNewUser = (e) => {
    e.preventDefault();
    
    let isValidate = false;
    const newUser = {};

    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    newUser.permission = "user"

    isValidate = accounts.some((element) => element.email === newUser.email);     

    if (isValidate) {
      console.log(true);
    } else {
      accounts.push(newUser);
      localStorage.setItem("users", JSON.stringify(accounts));
      navigate("/home");
    }

    setAuth(true)
  }

  return (
    <div className="registration">
      <div className="registration__wrapper">
        <h1>Registration</h1>
        <form className="registration__form">
          <div>
            <label>Your name</label>
            <input value = {name} onChange = {(e) => {setName(e.target.value)}} className = "registration__email" type = "text" placeholder = "Type here..."/>
          </div>
          <div>
            <label>Email</label>
            <input value = {email} onChange = {(e) => {setEmail(e.target.value)}} className = "registration__name" type = "text" placeholder = "Type here..."/>
          </div>
          <div>
            <label>Password</label>
            <input value = {password} onChange = {(e) => {setPassword(e.target.value)}} className = "registration__password" type = "text" placeholder = "Type here..."/>
          </div>
          <button className="registration__submit" onClick={(e) => {addNewUser(e)}}>Register</button>
        </form>
        <span className="registration__text">Already have an account? <Link to="/login" className="registration__logInLink">Log In!</Link></span>        
        </div>
    </div>
  )
}

export default Registration;