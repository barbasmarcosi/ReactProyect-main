import React from 'react';
import './GridContainter.css';
function GridContainer(props) {
  return (
  <table> 
      {props.children}
  </table>
  )
}

export { GridContainer };