import React, { useState } from "react";
import DropDownToDo from "./DropDownToDo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowDownShortWide, faXmark} from '@fortawesome/free-solid-svg-icons'

const Todo = (props) => {
  const [dropDownVisibleIdList, setDropDownVisibleIdList] = useState([]);

  const addDropDownToDo = (dropDownId) => {
    setDropDownVisibleIdList([...dropDownVisibleIdList, dropDownId])
  };

  const changeVisibility = (todoId) => {
    setDropDownVisibleIdList(dropDownVisibleIdList.filter(element => element !== todoId));
  };

  return (
    <div className = "todos">
      {
        props.todos.map((value) => 
          (
            <div className = "todo" key = {value.id}>
              <div className = "todo__wrapper">
                <span className = "todoText">{value.text}</span>
                <div className = "todo__buttons">
                  <button className = "todo__buttons--button" onClick = {() => {addDropDownToDo(value.id)}}><FontAwesomeIcon icon = {faArrowDownShortWide} /></button>        
                  <button className = "todo__buttons--button" 
                  onClick = {() => {
                    props.complete(value.id);
                    props.removeTodo(value.id);
                  }}><FontAwesomeIcon icon = {faCheck} /></button>
                  <button className = "todo__buttons--button" onClick = {() => {props.removeTodo(value.id)}}><FontAwesomeIcon icon = {faXmark} /></button>
                </div>
              </div>        

              <DropDownToDo dropDownVisible = {dropDownVisibleIdList.includes(value.id)} removeDropDownTodo = {changeVisibility} todoId = {value.id}  />    
            </div>
          )        
        )  
      }
    </div>
  ) 
}

export default Todo