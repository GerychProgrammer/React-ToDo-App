import React, { useMemo, useState } from "react";
import Form from "../components/Form.jsx";
import Todo from "../components/Todo.jsx";
import CompletedTodos from "../components/CompletedTodos.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import "../styles/reset.scss"
import "../styles/App.scss"

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [sortedAndSearchedTodos, setSortedAndSearchedTodos] = useState([]);
  const [todosLenght, setTodosLenght] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [selectedSortType, setSelectedSortType] = useState("");
  const [isCompletedTodosVisible, setIsCompletedTodosVisible] = useState(false);
  const [isSortingVisible, setSortingVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);

  const getInputValue = (value) => {
    setTodos([...todos, value]);
    setSortingVisible(true);
    setSearchVisible(true);
    setTodosLenght([todos.length + 1]);
    getPageCount()
  };
  
  const copleteTodo = (todoId) => {
    setCompletedTodos([...completedTodos, todos.filter(element => element.id === todoId)[0]]);
    setIsCompletedTodosVisible(true);
  };

  const removeTodo = (todoId, paginationArr) => {
    setTodos(todos.filter(element => element.id !== todoId));

    if (todos.length === 1) {
      setSortingVisible(false);
      setSearchVisible(false);
      setPageCount([])
      paginationArr([])
    }
  };

  const removeCompleteTodo = (todoId) => {
    setCompletedTodos(completedTodos.filter(element => element.id !== todoId));

    if (completedTodos.length === 1) {
      setIsCompletedTodosVisible(false);
    } 
  };
  
  const getSortType = (sortValue) => {
    setSelectedSortType(sortValue)
  };

  const sortingTodos = useMemo(() => {
    if (selectedSortType !== "") {
      const todosCopy = [...todos];
          todosCopy.sort((a,b) => {  
            if (selectedSortType === "textDown") {
                return a.text.localeCompare(b.text)
            }
          
            if (selectedSortType === "textUp") {
                return b.text.localeCompare(a.text)
            }

            if (selectedSortType === "timeNew") {
                return new Date(b.time) - new Date(a.time)
              }
            
            return new Date(a.time) - new Date(b.time)
          })      
      
      return setSortedAndSearchedTodos(todosCopy)
    }
    return setSortedAndSearchedTodos(todos);
  }, [selectedSortType, todos]);
    
  const searchTodo = (searchValue) => {
    const todosCopy = [...todos];
    if (searchValue !== "") {    
      return setSortedAndSearchedTodos(todosCopy.filter(element => element.text === searchValue));  
    }     
    return setSortedAndSearchedTodos(todos)
  };

  const getPageCount = () => {
    if (pageCount[pageCount.length - 1] !== Math.ceil(todosLenght / 10)) {
      setPageCount([...pageCount ,Math.ceil(todosLenght / 10)]) 
    }
  };  
  
  return (
    <div className="home">
      <NavigationBar userName = {localStorage.getItem("userName")}/>

      <div className="home__wrapper">
        <Form getInputValue = {getInputValue} />    
    
        <Todo 
          todos = {sortedAndSearchedTodos} 
          removeTodo = {removeTodo} 
          complete = {copleteTodo} 
          isSortingVisible = {isSortingVisible} 
          sortingTodos = {getSortType} 
          isSearchVisible = {isSearchVisible} 
          searchTodo = {searchTodo}
          pageCount = {pageCount}
        />
    
       <CompletedTodos completedTodos = {completedTodos} removeCompleteTodo = {removeCompleteTodo} isCompletedTodosVisible = {isCompletedTodosVisible} />
      </div>      
    </div>    
  )
}

export default Home