import React, { useState } from 'react'

const Sorting = (props) => {
  const [selectedSort, setSelectedSort] = useState("");

  return (
    <div className = {props.isSortingVisible ? "todos__sorting sorting__visible" : "todos__sorting"}>
        <select value = {selectedSort}  onChange = {e => {
            setSelectedSort(e.target.value);
            props.sortingTodos(e.target.value);
          }
        }>
          <option disabled>Сортировка</option>
          {props.options.map((options) => (
            <option key={options.id} value={options.value}>{options.name}</option>
          ))}
        </select>
      </div>
  )
}

export default Sorting