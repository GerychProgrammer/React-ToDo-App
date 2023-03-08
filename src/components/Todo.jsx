import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowDownShortWide, faXmark} from '@fortawesome/free-solid-svg-icons'

const Todo = (props) => {
  return props.todos.map((value, index) => {
    return <div className="todo" key={index}>
              <span className="todoText">{value}</span>

              <div className="todo__buttons">
                <button className= "todo__buttons--button"><FontAwesomeIcon icon={faArrowDownShortWide} /></button>        
                <button className= "todo__buttons--button"><FontAwesomeIcon icon={faCheck} /></button>
                <button className= "todo__buttons--button"><FontAwesomeIcon icon={faXmark} /></button>
              </div>
            </div>
  })  
}

export default Todo