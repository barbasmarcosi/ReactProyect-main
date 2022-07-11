import React from "react";
import { MainContext } from "../../generalComponents/MainContext/index";

function NewRetentionsForm() {
  const [newTxtFile, setNewTxtFile] = React.useState("");

  const { cargarRetenciones , setOpenAddMultipleRetentionsModal } = React.useContext(MainContext);

  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setNewTxtFile(text);
    };
    reader.readAsText(e.target.files[0]);
  };
  /*const setDate = () => {
    const date = new Date(Date.now());
    const registerDate =  `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
    setNewRetentionRegisterDate(registerDate);
  }*/
  const onCancel = () => {
    setOpenAddMultipleRetentionsModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newTxtFile);
    cargarRetenciones(newTxtFile);
    setOpenAddMultipleRetentionsModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese el archivo Txt</label>
      <input type="file" className="File" onChange={(e) => showFile(e)} />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">
          Procesar
        </button>
      </div>
    </form>
  );
}

export { NewRetentionsForm };
