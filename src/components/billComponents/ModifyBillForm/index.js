import React from "react";
import { MainContext } from "../../generalComponents/MainContext";
function ModifyBillForm() {
  const {searchPerson ,setSearchPerson ,modifyProject, setOpenModifyBillModal, searchedById, persons } = React.useContext(MainContext);
  const [newBillDescription, setNewBillDescription] = React.useState(searchedById[0].descripcion);
  const [newBillBillDate, setNewBillDate] = React.useState(searchedById[0].fechaFactura);
  const [newBillAmount, setNewBillAmount] = React.useState(searchedById[0].monto);
  const [newBillPerson, setNewBillPerson] = React.useState(searchedById[0].cuitMatriculado);

  const onChangeDescription = (event) => {
    setNewBillDescription(event.target.value);
  };
  const onChangeBillDate = (event) => {
    setNewBillDate(event.target.value);
  };
  const onChangeAmount = (event) => {
    console.log(event.target.value)
    setNewBillAmount(event.target.value);
  };
  const onChangePerson = (event) => {
    setNewBillPerson(event.target.value);
  };
  const OnChangeSearch = (event) => {
    setSearchPerson(event.target.value);
  };
  const onCancel = () => {
    setOpenModifyBillModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    modifyProject(searchedById[0].id, newBillDescription, newBillBillDate, newBillAmount, newBillPerson);
    setOpenModifyBillModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese los nuevos datos de la Factura</label>
      <textarea
        value={newBillDescription}
        onChange={onChangeDescription}
        placeholder="Descripcion"
      />
      <input className="Date" type="date"
        value={newBillBillDate}
        onChange={onChangeBillDate}
        placeholder="Fecha de Factura"
      />
      <textarea
        value={newBillAmount}
        onChange={onChangeAmount}
        placeholder="Monto Correspondiente"
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
          <option key={person.id} value={person.cuit}>{person.apellido + " " + person.nombre +" " + person.cuit}</option>
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

export { ModifyBillForm };
