import React, { useState } from "react";
import Form from "../components/Form.jsx";
import Todo from "../components/Todo.jsx";
import CompletedTodos from "../components/CompletedTodos.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import "../styles/reset.scss"
import "../styles/App.scss"

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedTodosVisible, setIsCompletedTodosVisible] = useState(false);
  
  const getInputValue = (value) => {
    setTodos([...todos, value]);
  };
  
  const copleteTodo = (todoId) => {
    setCompletedTodos([...completedTodos, todos.filter(element => element.id === todoId)[0]]);
    setIsCompletedTodosVisible(true);
  };

  const removeTodo = (todoId) => {
    setTodos(todos.filter(element => element.id !== todoId));
  };

  const removeCompleteTodo = (todoId) => {
    setCompletedTodos(completedTodos.filter(element => element.id !== todoId));

    if (completedTodos.length === 1) {
      setIsCompletedTodosVisible(false);
    } 
  };

  return (
    <div className="home">
      <NavigationBar userName = {JSON.parse(localStorage.getItem("userName"))}/>

      <div className="home__wrapper">
        <Form getInputValue = {getInputValue} />    
    
        <Todo todos = {todos} removeTodo = {removeTodo} complete = {copleteTodo} />
    
       <CompletedTodos completedTodos = {completedTodos} removeCompleteTodo = {removeCompleteTodo} isCompletedTodosVisible = {isCompletedTodosVisible} />
      </div>      
    </div>    
  )
}

export default Home