import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'


const SearchBar = (props) => {
  const [serchValue, setSearchValue] = useState("");

  const clearSearchInputs = () => {
    setSearchValue("");
    props.searchTodo(serchValue)
  }

  return (
    <div className = {props.isSearchVisible ? "todos__search todos__search-visible" : "todos__search"} >
        <input value={serchValue} onChange={e => {setSearchValue(e.target.value)}} type = "text" placeholder = "Search" />
        <button onClick = {() => props.searchTodo(serchValue)}><FontAwesomeIcon icon = {faMagnifyingGlass} /></button>
        <button onClick={() => clearSearchInputs()}><FontAwesomeIcon icon = {faXmark} /></button>
    </div>
  )
}

export default SearchBar;