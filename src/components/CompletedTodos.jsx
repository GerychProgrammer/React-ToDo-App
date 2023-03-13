import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const CompletedTodos = (props) => {
  return (
    <div className = {props.isCompletedTodosVisible ? "completedTodos--visible completedTodos" : "completedTodos"}>
      <div className = "completedTodos__dividingLine"></div>
      <span className="completedTodos__text">DONE</span>
      {
        props.completedTodos.map((value) => 
          (
            <div className="todo" key={value.id}>
              <span className="todoText">{value.text}</span>
              <div className="todo__buttons">        
                <button className= "todo__buttons--button" onClick={() => {props.removeCompleteTodo(value.id)}}><FontAwesomeIcon icon={faXmark} /></button>
              </div>
            </div>
          )        
        )
      } 
    </div>
  )
}  

export default CompletedTodos