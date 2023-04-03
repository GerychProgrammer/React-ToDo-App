import React, { useMemo, useState, useEffect } from "react";
import Form from "../components/Form.jsx";
import Todo from "../components/Todo.jsx";
import CompletedTodos from "../components/CompletedTodos.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import "../styles/reset.scss"
import "../styles/App.scss"

const Home = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));
  const [completedTodos, setCompletedTodos] = useState([]);
  const [sortedAndSearchedTodos, setSortedAndSearchedTodos] = useState([]);
  const [selectedSortType, setSelectedSortType] = useState("");
  const [isCompletedTodosVisible, setIsCompletedTodosVisible] = useState(false);
  const [isSortingVisible, setSortingVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);

  const getInputValue = (value) => {
    // setTodos([...todos, value]);
    setTodos(JSON.parse(localStorage.getItem("todos")));
    setSortingVisible(true);
    setSearchVisible(true);
  };
  
  const copleteTodo = (todoId) => {
    setCompletedTodos([...completedTodos, todos.filter(element => element.id === todoId)[0]]);
    setIsCompletedTodosVisible(true);
  };

  const removeTodo = (todoId) => {
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    let filteredLocalStorageTodos = localStorageTodos.filter(element => element.id !== todoId);
    localStorage.setItem("todos", JSON.stringify(filteredLocalStorageTodos))
    setTodos(todos.filter(element => element.id !== todoId));
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

  // eslint-disable-next-line no-unused-vars
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

  useEffect(() => {
    if (todos.length === 0) {
      setSortingVisible(false);
      setSearchVisible(false);
    } else {
      setSortingVisible(true);
      setSearchVisible(true);
    }
  }, [todos])
  
  
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
        />
    
       <CompletedTodos completedTodos = {completedTodos} removeCompleteTodo = {removeCompleteTodo} isCompletedTodosVisible = {isCompletedTodosVisible} />
      </div>      
    </div>    
  )
}

export default Home