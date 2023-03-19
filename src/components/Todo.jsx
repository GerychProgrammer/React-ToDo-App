import React, { useEffect, useState } from "react";
import DropDownToDo from "./DropDownToDo";
import Sorting from "./Sorting";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowDownShortWide, faXmark } from '@fortawesome/free-solid-svg-icons'

const Todo = (props) => {
  const [dropDownVisibleIdList, setDropDownVisibleIdList] = useState([]);
  const [paginationArr, setPaginationArr] = useState([]);

  const addDropDownToDo = (dropDownId) => {
    setDropDownVisibleIdList([...dropDownVisibleIdList, dropDownId])
  };

  const changeVisibility = (todoId) => {
    setDropDownVisibleIdList(dropDownVisibleIdList.filter(element => element !== todoId));
  };

  const changePage = (pageNumber) => {
    // TODO: Почему когда я использую setPaginationArr(props.todos) массив paginationArr был равен []
    const lastTodoOnPage = pageNumber * 10 - 1;
    const firstTodoOnPage = lastTodoOnPage - 9;
    setPaginationArr([...props.todos].filter((element, index) => index >= firstTodoOnPage && index <= lastTodoOnPage))
  }

  useEffect(() => {
    // TODO: Почему здесь я не могу вызвать функцию
    if (props.todos.lenght === 1) return setPaginationArr([])

    props.todos.forEach(element => {  
      if (element.id <= 10) {
        setPaginationArr([...props.todos].filter((element, index) => index >= 0 && index <= 9));
      } else return
    });
  }, [props.todos])

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
        paginationArr.map((value) => 
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
                  <button className = "todo__buttons--button" onClick = {() => {props.removeTodo(value.id, setPaginationArr)}}><FontAwesomeIcon icon = {faXmark} /></button>
                </div>
              </div>        

              <DropDownToDo dropDownVisible = {dropDownVisibleIdList.includes(value.id)} removeDropDownTodo = {changeVisibility} todoId = {value.id}  />    
            </div>
          )        
        )  
      }

      <div className="todos__pagination">
        {props.pageCount.filter(element => element !== 0).map((value) => (
          <button key={value} className="todos__pagination--button" onClick={e => changePage(e.target.innerText)}>{value}</button>
        ))}
      </div>
    </div>
  ) 
}

export default Todo