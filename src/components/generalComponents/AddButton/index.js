import React from "react";
import './AddButton.css';

function AddButton(props) {
  const onClickButton = () => {
    props.setModal(prevState => !prevState);
  };
  return (
    <>
      <button onClick={onClickButton}>{props.children}</button>
    </>
  );
}

export { AddButton };
