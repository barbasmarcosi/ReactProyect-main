import React from "react";
import { MainContext } from "../../generalComponents/MainContext/index";
function NewPersonForm() {
  const [newPersonName, setNewPersonName] = React.useState("");
  const [newPersonLastName, setNewPersonLastName] = React.useState("");
  const [newPersonCUIT, setNewPersonCUIT] = React.useState("");
  const { addPerson, setOpenAddPersonModal } = React.useContext(MainContext);

  const onChangeCuit = (event) => {
    setNewPersonCUIT(event.target.value);
  };
  const onChangeNombre = (event) => {
    setNewPersonName(event.target.value);
  };
  const onChangeApellido = (event) => {
    setNewPersonLastName(event.target.value);
  };
  const onCancel = () => {
    setOpenAddPersonModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    addPerson(newPersonCUIT, newPersonName, newPersonLastName);
    setOpenAddPersonModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese la nueva persona</label>
      <textarea
        value={newPersonCUIT}
        onChange={onChangeCuit}
        placeholder="CUIT"
      />
      <textarea
        value={newPersonName}
        onChange={onChangeNombre}
        placeholder="Nombre"
      />
      <textarea
        value={newPersonLastName}
        onChange={onChangeApellido}
        placeholder="Apellido"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="TodoForm-button TodoForm-button--add">
          Añadir
        </button>
      </div>
    </form>
  );
}

export { NewPersonForm };
