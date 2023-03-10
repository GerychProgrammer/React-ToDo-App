import React, { useState } from "react";

const Form = (props) => {
  const [inputValue, setInputValue] = useState("");

  const addNewTodo= (e) => {
    const todo = {};

    e.preventDefault();
    
    if (inputValue !== "") {
      const date = new Date();
      todo.text = inputValue;
      todo.id = date.getMilliseconds();
      props.getInputValue(todo);
      setInputValue("");
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