import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const CompletedTodos = (props) => {
  return props.completedTodos.map((value) => {
    return (
      <div className="todo" key={value.id}>
        <span className="todoText">{value.text}</span>
        <div className="todo__buttons">        
          <button className= "todo__buttons--button" onClick={() => {props.removeCompleteTodo(value.id)}}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
      </div>
    )        
  })  
}

export default CompletedTodos