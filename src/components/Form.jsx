import React, { useState } from "react";

const Form = (props) => {
  const [inputValue, setInputValue] = useState();

  return <form>
      <input type="text" className="formInput" placeholder="TO-DO" onChange={e => {setInputValue(e.target.value)}} />
      <button className="form__button" onClick={e => {
        e.preventDefault();
        props.getInputValue(inputValue)
      }}>Add</button>
    </form>  
}

export default Form