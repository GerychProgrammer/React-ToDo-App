import React, { useContext, useState } from "react";
import DropDownToDo from "./DropDownToDo";
import Sorting from "./Sorting";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowDownShortWide, faXmark, faPencil, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import { ModifiedTodosContext } from "../context/ModifiedTodosContext";
import { useNavigate } from "react-router-dom";

const Todo = (props) => {
  const [dropDownVisibleIdList, setDropDownVisibleIdList] = useState(JSON.parse(localStorage.getItem("dropDownVisibleIdList")));
  const [todoEditVisibilityIdList, setTodoEditVisibilityIdList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [todoValue, setTodoValue] = useState("");
  const {modifiedTodos, setModifiedTodos} = useContext(ModifiedTodosContext);
  const navigate = useNavigate("");

  const saveDropDownTodoLocaly = (dropDownId, data) => {
    const key = `dropDownTodo-${dropDownId}`;
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addDropDownToDo = (dropDownId) => {
    let localStorageDropDownVisibleIdList = JSON.parse(localStorage.getItem("dropDownVisibleIdList"));
    localStorageDropDownVisibleIdList = [...localStorageDropDownVisibleIdList, dropDownId];
    localStorage.setItem("dropDownVisibleIdList", JSON.stringify(localStorageDropDownVisibleIdList));
    setDropDownVisibleIdList(JSON.parse(localStorage.getItem("dropDownVisibleIdList")));
    setDropDownVisibleIdList([...dropDownVisibleIdList, dropDownId]);
    saveDropDownTodoLocaly(dropDownId, []);
  };

  const changeVisibility = (todoId) => {
    let localDropDownTodosIdList = JSON.parse(localStorage.getItem("dropDownVisibleIdList"));
    console.log(localDropDownTodosIdList);
    let filteredlocalDropDownTodosIdList = localDropDownTodosIdList.filter(element => element.id !== todoId);
    console.log(filteredlocalDropDownTodosIdList);
    localStorage.setItem("dropDownVisibleIdList", JSON.stringify(filteredlocalDropDownTodosIdList))
    
    setDropDownVisibleIdList(dropDownVisibleIdList.filter(element => element !== todoId));
  };

  const editTodo = (todoId) => {
    setTodoEditVisibilityIdList([...todoEditVisibilityIdList, todoId]);
    const index = props.todos.findIndex(element => element.id === todoId);
    setTodoValue(props.todos[index].text)
  };

  const confirmEditTodo = (todoId) => {
    const newModifiedText = "text" + Math.random();
    const index = props.todos.findIndex(element => element.id === todoId);
    const indexOfOldTodo = modifiedTodos.findIndex(element => element.id === todoId);

    if (indexOfOldTodo !== -1) {
      modifiedTodos[indexOfOldTodo][newModifiedText] = props.todos[index].text
      props.todos[index].text = todoValue;
      let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
      localStorageTodos = props.todos
      localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    } else {
      const oldTodo = Object.assign({}, props.todos[index]);
      setModifiedTodos([...modifiedTodos, oldTodo])
      props.todos[index].text = todoValue;

      let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
      localStorageTodos = props.todos
      localStorage.setItem("todos", JSON.stringify(localStorageTodos));
    }
    
    setTodoEditVisibilityIdList(todoEditVisibilityIdList.filter(element => element !== todoId));
  }

  const openTodoHistoryPage = (todoId) => {
    // const index = modifiedTodos.findIndex(element => element.id === todoId);
    // Object.keys(modifiedTodos[index]).forEach(element => {
    //   if(/text/.test(element)) {
    //     setCurrentModifiedTodo(modifiedTodos[index])
    //   }      
    // });

    navigate(`/home/${todoId}`)
  }  

  const getPaginationArray = () => {
    const currentPage = pageCount;

    if (props.todos.slice(currentPage * 10, (currentPage + 1) * 10).length === 0 && currentPage !== 0) {
        setPageCount(currentPage - 1);
      return props.todos.slice(currentPage - 1 * 10, (currentPage) * 10)
    } else return props.todos.slice(currentPage * 10, (currentPage + 1) * 10)
  }

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
          {id: 1, value: "textDown", name: `По алфавиту 🠓`},
          {id: 2, value: "textUp", name: `По алфавиту 🠑`},
          {id: 3, value: "timeNew", name: "Новые"},
          {id: 4, value: "timeOld", name: "Старые"}          
        ]}
      />

      {
        getPaginationArray().map((value) => 
          (
            <div className = "todo" key = {value.id}>
              <div className = "todo__wrapper">
                <span className = {todoEditVisibilityIdList.includes(value.id) ? "todo__span-displayNone" : "todo__span"}>{value.text}</span>
                <input type="text" value={todoValue} onChange = {e => setTodoValue(e.target.value)} className = {todoEditVisibilityIdList.includes(value.id) ? "todo__text todo__text-visible" : "todo__text"} />
                <div className = "todo__buttons">
                  <button className= {todoEditVisibilityIdList.includes(value.id) ? "todo__buttons--button-displayNone" : "todo__buttons--button"} onClick = {e => editTodo(value.id)}><FontAwesomeIcon icon = {faPencil}/></button>

                  <button className= {todoEditVisibilityIdList.includes(value.id) ? "todo__buttons--button" : "todo__buttons--button-displayNone"} onClick = {e => confirmEditTodo(value.id)}><FontAwesomeIcon icon = {faCheckCircle}/></button>
                  <button className = "todo__buttons--button" onClick = {() => {openTodoHistoryPage(value.id)}}><FontAwesomeIcon icon = {faClock} /></button> 
                  <button className = "todo__buttons--button" onClick = {() => {addDropDownToDo(value.id)}}><FontAwesomeIcon icon = {faArrowDownShortWide} /></button>        
                  <button className = "todo__buttons--button" 
                  onClick = {() => {
                    props.complete(value.id);
                    props.removeTodo(value.id);
                  }}><FontAwesomeIcon icon = {faCheck} /></button>
                  <button className = "todo__buttons--button" onClick = {() => {props.removeTodo(value.id)}}><FontAwesomeIcon icon = {faXmark} /></button>
                </div>
              </div>        

              <DropDownToDo dropDownVisible = {dropDownVisibleIdList.includes(value.id)} removeDropDownTodo = {changeVisibility} todoId = {value.id} />    
            </div>
          )        
        )  
      }

      <div className="todos__pagination">
        {new Array(Math.ceil(props.todos.length / 10)).fill(null).map((_, numberIndex) => (
          <button 
            key={numberIndex} 
            className="todos__pagination--button" 
            onClick={e => setPageCount(numberIndex)}
          >
            {numberIndex + 1}
          </button>
        ))}
      </div>
    </div>
  ) 
}

export default Todo
