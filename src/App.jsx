import React, { useState } from "react";
import Form from "./components/Form.jsx";
import Todo from "./components/Todo.jsx";
import "./styles/reset.scss"
import "./styles/App.scss"

function App() {
  const [todo, setTodo] = useState();

  const [todos, setTodos] = useState([]);

  const getInputValue = (value) => {
    setTodo(value);

    setTodos([...todos, value]);
  }

  return <div className="App">
    <Form getInputValue={getInputValue} />

    <div className="dividingLine"></div>

    <div className="todos">
      <Todo todos={todos}/>
    </div>
  </div>;

  
}

export default App;