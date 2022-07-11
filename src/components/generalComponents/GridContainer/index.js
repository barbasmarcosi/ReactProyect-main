import React from 'react';
import './GridContainer.css';
function GridContainer(props) {
  return (
  <table> 
      {props.children}
  </table>
  )
}

export { GridContainer };