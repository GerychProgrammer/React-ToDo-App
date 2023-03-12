import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownShortWide, faXmark} from '@fortawesome/free-solid-svg-icons'

const DropDownToDo = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [dropDownTodos, setDropDownTodos] = useState([]);

  const getDropDownInputValue = (value) => {
    setDropDownTodos([...dropDownTodos, value]);
  };

  const addNewTodo= (e) => {
    const todo = {};

    e.preventDefault();
    
    if (inputValue !== "") {
      const date = new Date();
      todo.text = inputValue;
      todo.id = date.getMilliseconds();
      getDropDownInputValue(todo);
      setInputValue("");
    } else {
      console.error("Введите текст");
    }
  };

  const deleteDropDownToDo = (dropDownTodoId) => {
    setDropDownTodos(dropDownTodos.filter(element => element.id !== dropDownTodoId));
    if (dropDownTodos.length === 1) {
      props.removeDropDownTodo(props.todoId)
    }
  };
  
  return (    
        <div className = {props.dropDownVisible ? "todo__dropDown todo__dropDown--visible " : "todo__dropDown"}>
          <form className = "todo__dropDown_form">
            <input placeholder = "another to-do" type = "text" className = "todo__dropDown_input" value = {inputValue} onChange = {(e) => {setInputValue(e.target.value)}} />
            <button className = "form__button" onClick={(e) => {addNewTodo(e)}}>Add</button>
          </form>  
          
          <div className = "todo__dropDown_dividingLine"></div>

          {dropDownTodos.map((value) => {
            return (
              <div key={value.id} className = "todo__dropDown_wrapper">
                <span className = "todo__dropDown_wrapper_text">{value.text}</span>
                <div className = "todo__dropDown_wrapper_buttons">
                  <button className = "todo__dropDown_wrapper--button"><FontAwesomeIcon icon = {faArrowDownShortWide} /></button>        
                  <button className = "todo__dropDown_wrapper--button" onClick = {() => {deleteDropDownToDo(value.id)}}><FontAwesomeIcon icon = {faXmark} /></button>
                </div>
              </div> 
            )                     
          })}
        </div>
          
  )      
};

export default DropDownToDo