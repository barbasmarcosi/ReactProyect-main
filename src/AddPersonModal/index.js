import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function AddPersonModal(props) {
  return ReactDOM.createPortal(
    <div className="ModalBackground">
      {props.children}
    </div>,
    document.getElementById('modal')
  );
}

export { AddPersonModal };
