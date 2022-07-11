import React from "react";
import { MainContext } from "../../generalComponents/MainContext/index";

function NewLiquidationForm() {
  const [newLiquidationMonth, setNewLiquidationMonth] = React.useState("");
  const [newPersonCUIT, setNewPersonCUIT] = React.useState("");
  const [newPersonName, setNewPersonName] = React.useState("");
  const {
    searchPerson,
    setSearchPerson,
    persons,
    setOpenAddLiquidationModal,
    addLiquidation,
    personFinderById,
  } = React.useContext(MainContext);

  const onChangeMonth = (event) => {
    setNewLiquidationMonth(event.target.value);
  };
  const onSelectPerson = async (event) => {
    let person = await personFinderById(event.target.value);
    console.log(person);
    setNewPersonName(person.nombre + " " + person.apellido);
    setNewPersonCUIT(person.cuit);
  };
  const OnChangeSearch = (event) => {
    setSearchPerson(event.target.value);
  };
  const onCancel = () => {
    setOpenAddLiquidationModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newLiquidationMonth, newPersonCUIT, newPersonName);
    //try {
    addLiquidation(newLiquidationMonth, newPersonCUIT, newPersonName);
    setOpenAddLiquidationModal(false);
    /*} catch {
      alert("Esta persona no posee facturas pendientes a Liquidar en este mes");
    }*/
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Ingrese los nuevos datos de la liquidacion</label>
      <textarea
        value={newLiquidationMonth}
        onChange={onChangeMonth}
        placeholder="Mes de la liquidacion"
      />
      <input
        className="Input"
        placeholder="Filtrar Matriculados"
        value={searchPerson}
        onChange={OnChangeSearch}
      />
      <select onChange={onSelectPerson} className="Select" name="select">
        <option selected>Elija un matriculado</option>
        {persons
          .filter((person) => person.estado === 1)
          .map((person) => (
            <option key={person.id} value={person.id}>
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
          Generar
        </button>
      </div>
    </form>
  );
}

export { NewLiquidationForm };
