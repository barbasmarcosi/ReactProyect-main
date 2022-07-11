import React from 'react';
import './Input.css';

function Input(props) {
  const onSearchValueChange = (event) => {
    props.setSearch(event.target.value);
  };

  return (
    <input
      className="filter"
      placeholder="Ingrese su busqueda"
      value={props.search}
      onChange={onSearchValueChange}
    />
  );
}

export { Input };