import React from "react";
import { MainContext } from "../../generalComponents/MainContext/index";
function NewBillForm() {
  const [newBillNumber, setNewBillNumber] = React.useState("");
  const [newBillDescription, setNewBillDescription] = React.useState("");
  const [newBillBillDate, setNewBillDate] = React.useState("");
  const [newBillAmount, setNewBillAmount] = React.useState("");
  const [newBillRegisterDate, setNewBillRegisterDate] = React.useState("");
  const [newBillPerson, setNewBillPerson] = React.useState("");

  const {
    searchPerson,
    setSearchPerson,
    setOpenAddBillModal,
    persons,
    addProject,
  } = React.useContext(MainContext);

  const onChangeBillNumber = (event) => {
    setNewBillNumber(event.target.value);
  };
  const onChangeDescription = (event) => {
    setNewBillDescription(event.target.value);
  };
  const onChangeBillDate = (event) => {
    setNewBillDate(event.target.value);
  };
  const onChangeAmount = (event) => {
    console.log(event.target.value);
    setNewBillAmount(event.target.value);
  };
  const onChangePerson = (event) => {
    setNewBillPerson(event.target.value);
    setDate();
  };
  const OnChangeSearch = (event) => {
    setSearchPerson(event.target.value);
  };
  const setDate = () => {
    const date = new Date(Date.now());
    const registerDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    setNewBillRegisterDate(registerDate);
  };
  const onCancel = () => {
    setOpenAddBillModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    //const date = new Date(newBillBillDate);
    //const billDate =  `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
    addProject(
      newBillNumber,
      newBillDescription,
      newBillBillDate,
      newBillAmount,
      newBillRegisterDate,
      newBillPerson
    );
    setOpenAddBillModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese los datos de la Factura</label>
      <textarea
        value={newBillNumber}
        onChange={onChangeBillNumber}
        placeholder="Numero de Factura"
      />
      <textarea
        value={newBillDescription}
        onChange={onChangeDescription}
        placeholder="Descripcion"
      />
      <input
        className="Date"
        type="date"
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
        <option selected>Elija un Matriculado</option>
        {persons
          .filter((person) => person.estado === 1)
          .map((person) => (
            <option key={person.id} value={person.cuit}>
              {person.apellido + " " + person.nombre + " " + person.cuit}
            </option>
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
          Añadir
        </button>
      </div>
    </form>
  );
}

export { NewBillForm };
