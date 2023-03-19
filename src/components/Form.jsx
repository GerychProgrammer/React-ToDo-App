import React, { useState } from "react";

const Form = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [todoId, setTodoId] = useState(1);

  const addNewTodo= (e) => {
    const todo = {};

    e.preventDefault();
    
    if (inputValue !== "") {
      todo.text = inputValue;
      todo.id = todoId;
      // todo.time = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      todo.time = new Date();
      props.getInputValue(todo);
      setInputValue("");
      setTodoId(todoId + 1);
    } else {
      console.error("Введите текст");
    }
  }

  return <form className="enterTodoForm">
      <input type="text" className="formInput" value={inputValue} placeholder="TO-DO" onChange={e => {setInputValue(e.target.value)}} />
      <button className="form__button" onClick={e => addNewTodo(e)}>Add</button>
      <div className = "dividingLine"></div>
    </form>  
}

export default Form