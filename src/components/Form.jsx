import React, { useState } from "react";

const Form = (props) => {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  
  const searchLastTodo = () => {
    if (localStorageTodos.length === 0) return 1
    
    let maxId = localStorageTodos[0].id;    

    for (let i = 0; i < localStorageTodos.length; i++) {
      if (localStorageTodos[i].id > maxId) {
        maxId = localStorageTodos[i].id;
      }
    }
    return maxId + 1
  }

  const [inputValue, setInputValue] = useState("");
  const [todoId, setTodoId] = useState(searchLastTodo());


  const addNewTodo= (e) => {
    const todo = {};

    e.preventDefault();
    
    if (inputValue !== "") {
      todo.text = inputValue;
      todo.id = todoId;
      todo.time = `${new Date().toLocaleDateString("en-GB")} ${new Date().toLocaleTimeString("en-GB")}`;
      localStorageTodos = [...localStorageTodos, todo];
      localStorage.setItem("todos", JSON.stringify(localStorageTodos));
      props.getInputValue();
      setInputValue("");
      setTodoId(searchLastTodo());
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