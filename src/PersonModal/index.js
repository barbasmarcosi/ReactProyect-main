import React from 'react';
import ReactDOM from 'react-dom';

function PersonModal({ children }) {
  return ReactDOM.createPortal(
    <div /*className="ModalBackground"*/>
      {children}
    </div>,
    document.getElementById('modal')
  );
}

export { PersonModal };
