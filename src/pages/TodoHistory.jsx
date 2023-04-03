import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from "../components/NavigationBar.jsx";
import { ModifiedTodosContext } from "../context/ModifiedTodosContext";
import "../styles/pages/todoHistory.scss"

const TodoHistory = (props) => {
  const {modifiedTodos} = useContext(ModifiedTodosContext);
  const params = useParams();
  const userName = localStorage.getItem("userName");
  const todo = [];
  
  const getTodoContent = (array, id) => {
    const index = array.findIndex(element => element.id === Number(id));
    console.log(array[index]);
    for (const key in array[index]) {
      if (/text/.test(key)) {
        todo.push(array[index][key])
      }
    }

    console.log(todo);

    return todo
  }

  return (
    <div className = "todoHistory">
      <NavigationBar userName = {userName} />
      <div className="todoHistory__wrapper">
        <h2>History of todo</h2>
            <div className="modifiedTodo">
              {
                getTodoContent(modifiedTodos, params.todoId).map((value, index) => {
                  return (
                    <span key={index}>Текст todo - {value}</span>
                  )
                })
              }              
              {/* <span>Время последнего изменения - {modifiedTodos[params.todoId].time}</span> */}
              <span>Кем отредактированно - {userName}</span>
            </div>       
      </div>

    </div>
  )
}

export default TodoHistory;