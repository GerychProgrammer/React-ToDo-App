import React, { useState } from "react";
import DropDownToDo from "./DropDownToDo";
import Sorting from "./Sorting";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowDownShortWide, faXmark } from '@fortawesome/free-solid-svg-icons'

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
      <SearchBar 
      isSearchVisible = {props.isSearchVisible} 
      searchTodo = {props.searchTodo} 
      cancleSearch = {props.cancleSearch} 
      />

      <Sorting 
        isSortingVisible = {props.isSortingVisible} 
        sortingTodos = {props.sortingTodos} 
        options = {[
          {id: 1, value: "textDown", name: "От А до Я"},
          {id: 2, value: "textUp", name: "От Я до А"},
          {id: 3, value: "timeNew", name: "Новые"},
          {id: 4, value: "timeOld", name: "Старые"}          
        ]}
      />
      

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