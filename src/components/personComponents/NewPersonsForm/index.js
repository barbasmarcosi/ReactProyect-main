import React from "react";
import { MainContext } from "../../generalComponents/MainContext/index";

function NewPersonsForm() {
  const [newCsvFile, setNewCsvFile] = React.useState("");
  const { setOpenAddMultiplePersonsModal, cargarMultiplesMatriculados } =
    React.useContext(MainContext);
    
  const onCancel = () => {
    setOpenAddMultiplePersonsModal(false);
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setNewCsvFile(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    cargarMultiplesMatriculados(newCsvFile);
    setOpenAddMultiplePersonsModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese el archivo Excel</label>
      <input className="File" type="file" onChange={(e) => showFile(e)} />
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

export { NewPersonsForm };
