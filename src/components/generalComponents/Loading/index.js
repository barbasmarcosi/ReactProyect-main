import React from 'react';
import ReactDOM from 'react-dom';
import './Lading.css';

function Loading(props) {
  return ReactDOM.createPortal(
    <div className="ModalBackground">
      {props.children}
    </div>,
    document.getElementById('modal')
  );
}

export { Loading };
