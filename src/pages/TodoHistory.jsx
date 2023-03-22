import React, { useContext } from 'react';
import NavigationBar from "../components/NavigationBar.jsx";
import { CurrentModifiedTodo } from '../context/context.js';
import "../styles/todoHistory.scss"

const TodoHistory = (props) => {
  const {currentModifiedTodo} = useContext(CurrentModifiedTodo);
  const userName = localStorage.getItem("userName");
  const todo = [];
  
  const getTodoContent = (object) => {
    console.log(currentModifiedTodo);
    for (const key in object) {
      if (/text/.test(key)) {
        todo.push(object[key])
      }
    }

    return todo
  }

  return (
    <div className = "history">
      <NavigationBar userName = {userName} />
      <div className="history__wrapper">
        <h2>History of todo number {currentModifiedTodo.id}</h2>
            <div className="modifiedTodo">
              {
                getTodoContent(currentModifiedTodo).map((value, index) => {
                  return (
                    <span key={index}>Текст todo - {value}</span>
                  )
                })
              }              
              <span>Время последнего изменения - {currentModifiedTodo.time}</span>
              <span>Кем отредактированно - {userName}</span>
            </div>       
      </div>

    </div>
  )
}

export default TodoHistory;