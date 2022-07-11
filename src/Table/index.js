import React from 'react';
//import './Table.css';

function Table(props) {
  return (
    <table>
      {props.children}
    </table>)
}

export { Table };