import React from "react";
import { MainContext } from "../../generalComponents/MainContext/index";

function ModifyRetentionForm() {
  const {searchPerson, setSearchPerson, setOpenModifyRetentionModal, persons, searchedById, modifyRetention } = React.useContext(MainContext);
  const [newRetentionDate, setNewRetentionDate] = React.useState(searchedById[0].fecha);
  const [newRetentionPercentage, setNewRetentionPercentage] = React.useState(searchedById[0].retencion);
  const [newRetentionName, setNewRetentionName] = React.useState(searchedById[0].nombre);
  const [newRetentionCuit, setNewRetentionCuit] = React.useState(searchedById[0].cuitMatriculado);

  const onChangePercentage = (event) => {

    setNewRetentionPercentage(event.target.value);
  };
  const onChangeDate = (event) => {
    setNewRetentionDate(event.target.value);
  };
  const onChangePerson = (event) => {
    setNewRetentionName(persons[event.target.value-1].nombre + " " + persons[event.target.value-1].apellido);
    setNewRetentionCuit(persons[event.target.value-1].cuit);
  };
  const OnChangeSearch = (event) => {
    setSearchPerson(event.target.value);
  };
  /*const setDate = () => {
    const date = new Date(Date.now());
    const registerDate =  `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
    setNewRetentionRegisterDate(registerDate);
  }*/
  const onCancel = () => {
    setOpenModifyRetentionModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    modifyRetention(searchedById[0].id ,newRetentionPercentage/100, newRetentionDate, newRetentionCuit, newRetentionName);
    setOpenModifyRetentionModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese los nuevos datos de la retencion</label>
      <textarea
        value={newRetentionPercentage}
        onChange={onChangePercentage}
        placeholder="Porcentaje de la retencion"
      />
      <input
        type="date"
        className="Date"
        value={newRetentionDate}
        onChange={onChangeDate}
      />
      <input
        className="Input"
        placeholder="Filtrar Matriculados"
        value={searchPerson}
        onChange={OnChangeSearch}
      />
      <select onChange={onChangePerson} className="Select" name="select">
      <option selected>Elija un matriculado</option>
        {persons.filter(person => person.estado === 1).map((person) => (
          <option key={person.id} value={person.id}>{person.apellido + " " + person.nombre +" " + person.cuit}</option>
          ))}
      </select>
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

export { ModifyRetentionForm };
