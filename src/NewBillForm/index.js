import React from "react";
import { MainContext } from "../MainContext";
import "./TodoForm.css";

function NewBillForm() {
  const [newBillNumber, setNewBillNumber] = React.useState("");
  const [newBillDescription, setNewBillDescription] = React.useState("");
  const [newBillBillDate, setNewBillDate] = React.useState("");
  const [newBillAmount, setNewBillAmount] = React.useState("");
  const [newBillRegisterDate, setNewBillRegisterDate] = React.useState("");
  const [newBillPerson, setNewBillPerson] = React.useState("");

  const { setOpenAddBillModal, persons, addProject } = React.useContext(MainContext);

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
    console.log(event.target.value)
    setNewBillAmount(event.target.value);
  };
  const onChangePerson = (event) => {
    setNewBillPerson(event.target.value);
    setDate();
  };
  const setDate = () => {
    const date = new Date(Date.now());
    const registerDate =  `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
    setNewBillRegisterDate(registerDate);
  }
  const onCancel = () => {
    setOpenAddBillModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    addProject(newBillNumber, newBillDescription, newBillBillDate, newBillAmount, newBillRegisterDate, newBillPerson);
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
      <textarea
        value={newBillBillDate}
        onChange={onChangeBillDate}
        placeholder="Fecha de Factura"
      />
      <textarea
        value={newBillAmount}
        onChange={onChangeAmount}
        placeholder="Monto Correspondiente"
      />
      <select onChange={onChangePerson} name="select">
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
          Añadir
        </button>
      </div>
    </form>
  );
}

export { NewBillForm };
