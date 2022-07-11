import React from "react";
import { MainContext } from "../../generalComponents/MainContext/index";

function ModifyPersonForm() {
  const {modifyPerson, setOpenModifyModal, searchedById} = React.useContext(MainContext);
  const [newPersonName, setNewPersonName] = React.useState(searchedById[0].nombre);
  const [newPersonLastName, setNewPersonLastName] = React.useState(searchedById[0].apellido);

  const onChangeNombre = (event) => {
    setNewPersonName(event.target.value);
  };
  const onChangeApellido = (event) => {
    setNewPersonLastName(event.target.value);
  };
  const onCancel = () => {
    setOpenModifyModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    modifyPerson(searchedById[0].id, newPersonName, newPersonLastName);
    setOpenModifyModal(false);
  };
  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese los nuevos datos de la persona</label>
      <textarea
        value={newPersonName}
        onChange={onChangeNombre}
        placeholder={'Nombre'}
      />
      <textarea
        value={newPersonLastName}
        onChange={onChangeApellido}
        placeholder={'Apellido'}
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
          Modificar
        </button>
      </div>
    </form>
  );
}

export { ModifyPersonForm };
