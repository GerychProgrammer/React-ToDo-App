import React, { useState } from "react";
import Form from "./components/Form.jsx";
import Todo from "./components/Todo.jsx";
import CompletedTodos from "./components/CompletedTodos.jsx";
import "./styles/reset.scss"
import "./styles/App.scss"

function App() {
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

  return <div className = "App">
    <Form getInputValue = {getInputValue} />

    <div className = "dividingLine"></div>

    <div className = "todos">
      <Todo todos = {todos} removeTodo = {removeTodo} complete = {copleteTodo} />
    </div>

    <div className = {isCompletedTodosVisible ? "completedTodos--visible completedTodos" : "completedTodos"}>
      <div className = "completedTodos__dividingLine"></div>
      <span className="completedTodos__text">DONE</span>
      <CompletedTodos completedTodos = {completedTodos} removeCompleteTodo = {removeCompleteTodo} />
    </div>
  </div>;  
}

export default App;