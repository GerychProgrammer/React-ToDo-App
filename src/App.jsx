import React, { useState } from "react";
import Form from "./components/Form.jsx";
import Todo from "./components/Todo.jsx";
import "./styles/reset.scss"
import "./styles/App.scss"

function App() {
  // const [todo, setTodo] = useState();

  const [todos, setTodos] = useState([]);

  const getInputValue = (value) => {
    setTodos([...todos, value]);
  }

  const removeTodo = (todoId) => {
    setTodos(todos.filter(element => element.id === todoId))
  }

  return <div className="App">
    <Form getInputValue={getInputValue} />

    <div className="dividingLine"></div>

    <div className="todos">
      <Todo todos={todos} removeTodo={removeTodo}/>
    </div>
  </div>;

  
}

export default App;