import React, { useContext, useState } from 'react';
import NavigationBar from "../components/NavigationBar.jsx";
import { ModifiedTodos } from '../context/context.js';
import "../styles/history.scss"

const History = (props) => {
  const {modifiedTodos} = useContext(ModifiedTodos);
  const [pageCount, setPageCount] = useState(0);
  const userName = localStorage.getItem("userName");

  return (
    <div className = "history">
      <NavigationBar userName = {userName} />
      <div className="history__wrapper">
        <h2>History of todos</h2>
        {
          modifiedTodos.slice(pageCount * 10, (pageCount + 1) * 10).map((value) => (
            <div key={value.id} className="modifiedTodo">
              <span className = "modifiedTodo__text-flexBasis">Номер todo - {value.id}</span>
              <span>Текст todo - {value.text}</span>
              <span>Время последнего изменения - {value.time}</span>
              <span>Кем отредактированно - {userName}</span>
            </div>
          ))
        }
        <div className="todos__pagination">
          {new Array(Math.ceil(modifiedTodos.length / 10)).fill(null).map((_, numberIndex) => (
            <button key={numberIndex} className="todos__pagination--button" onClick={e => setPageCount(numberIndex)}>{numberIndex + 1}</button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default History;