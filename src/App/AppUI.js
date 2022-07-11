import React from "react";
import { MainContext } from "../components/generalComponents/MainContext/index";
import { Modal } from "../components/generalComponents/Modal";
import { HeadGrid } from "../components/generalComponents/HeadGrid";
import { PersonBodyGrid } from "../components/personComponents/PersonBodyGrid";
import { GridContainer } from "../components/generalComponents/GridContainer";
import { Input } from "../components/generalComponents/Input";
import { AddButton } from "../components/generalComponents/AddButton";
import { NewPersonForm } from "../components/personComponents/NewPersonForm";
import { NewBillForm } from "../components/billComponents/NewBillForm";
import { NewRetentionForm } from "../components/retentionComponents/NewRetentionForm";
import { NewLiquidationForm } from "../components/liquidationComponents/NewLiquidationForm";
import { NewPersonsForm } from "../components/personComponents/NewPersonsForm";
import { NewRetentionsForm } from "../components/retentionComponents/NewRetentionsForm";
import { Header } from "../components/generalComponents/Header";
import { NavBar } from "../components/generalComponents/NavBar";
import { BillBodyGrid } from "../components/billComponents/BillBodyGrid";
import { RetentionBodyGrid } from "../components/retentionComponents/RetentionBodyGrid";
import { LiquidationBodyGrid } from "../components/liquidationComponents/LiquidationBodyGrid";
import { Loading } from "../components/generalComponents/Loading";
function AppUI() {
  const {
    searchPerson,
    setSearchPerson,
    deletePerson,
    deleteProject,
    openAddPersonModal,
    setOpenAddPersonModal,
    searchProject,
    setSearchProject,
    persons,
    projects,
    selectedNav,
    retentions,
    searchRetention,
    setSearchRetention,
    liquidations,
    searchLiquidation,
    setSearchLiquidation,
    deleteRetention,
    deleteLiquidation,
    openAddBillModal,
    setOpenAddBillModal,
    openAddRetentionModal,
    setOpenAddRetentionModal,
    openAddLiquidationModal,
    setOpenAddLiquidationModal,
    openAddMultiplePersonsModal,
    setOpenAddMultiplePersonsModal,
    openAddMultipleRetentionsModal,
    setOpenAddMultipleRetentionsModal,
    loading,
  } = React.useContext(MainContext);
  const personsHeader = [
    {
      id: 1,
      value: "CUIT",
      column: "cuit",
    },
    {
      id: 2,
      value: "Nombre",
      column: "nombre",
    },
    {
      id: 3,
      value: "Apellido",
      column: "apellido",
    },
  ];

  const projectHeader = [
    {
      id: 1,
      value: "Numero de factura",
      column: "nroFactura",
    },
    {
      id: 2,
      value: "Descripcion",
      column: "descripcion",
    },
    {
      id: 3,
      value: "Fecha de Factura",
      column: "fechaFactura",
    },
    {
      id: 4,
      value: "Monto",
      column: "monto",
    },
    {
      id: 5,
      value: "Fecha de Ingreso",
      column: "fechaIngreso",
    },
    {
      id: 6,
      value: "CUIT de Matriculado",
      column: "cuitMatriculado",
    },
  ];

  const retencionesHeader = [
    {
      id: 1,
      value: "Porcentaje de Retencion",
      column: "retencion",
    },
    {
      id: 2,
      value: "Fecha",
      column: "fecha",
    },
    {
      id: 3,
      value: "CUIT de Matriculado",
      column: "cuitMatriculado",
    },
    {
      id: 4,
      value: "Nombre de Matriculado",
      column: "nombre",
    },
  ];

  const liquidacionesHeader = [
    {
      id: 1,
      value: "Monto del Mes",
      column: "montoMes",
    },
    {
      id: 2,
      value: "Monto Retenido",
      column: "montoRetenido",
    },
    {
      id: 3,
      value: "Fecha",
      column: "fecha",
    },
    {
      id: 4,
      value: "CUIT de Matriculado",
      column: "fechaIngreso",
    },
    {
      id: 5,
      value: "Nombre de Matriculado",
      column: "nombre",
    },
  ];

  return (
    <React.Fragment>
      <Header>
        <NavBar />
      </Header>
      {selectedNav === 1 && (
        <>
          <Input search={searchPerson} setSearch={setSearchPerson} />
          <AddButton setModal={setOpenAddPersonModal}>
            Agregar Matriculado
          </AddButton>
          <AddButton setModal={setOpenAddMultiplePersonsModal}>
            Agregar por Excel
          </AddButton>
          <GridContainer>
            <thead>
              <tr>
                {personsHeader.map((header) => (
                  <HeadGrid
                    value={header.value}
                    column={header.column}
                    id={header.id}
                    key={header.id}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <PersonBodyGrid
                  key={person.id}
                  id={person.id}
                  cuit={person.cuit}
                  nombre={person.nombre}
                  apellido={person.apellido}
                  estado={person.estado}
                  onDelete={() => deletePerson(person.id)}
                />
              ))}
            </tbody>
          </GridContainer>
        </>
      )}
      {selectedNav === 2 && (
        <>
          <Input search={searchProject} setSearch={setSearchProject} />
          <AddButton setModal={setOpenAddBillModal}>Cargar Factura</AddButton>
          <GridContainer>
            <thead>
              <tr>
                {projectHeader.map((header) => (
                  <HeadGrid
                    value={header.value}
                    column={header.column}
                    id={header.id}
                    key={header.id}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <BillBodyGrid
                  key={project.id}
                  id={project.id}
                  nroFactura={project.nroFactura}
                  descripcion={project.descripcion}
                  fechaFactura={project.fechaFactura}
                  monto={project.monto}
                  estado={project.estado}
                  fechaIngreso={project.fechaIngreso}
                  cuitMatriculado={project.cuitMatriculado}
                  onDelete={() => deleteProject(project.id)}
                ></BillBodyGrid>
              ))}
            </tbody>
          </GridContainer>
        </>
      )}
      {selectedNav === 3 && (
        <>
          <Input search={searchRetention} setSearch={setSearchRetention} />
          <AddButton setModal={setOpenAddRetentionModal}>
            Agregar Retencion
          </AddButton>
          <AddButton setModal={setOpenAddMultipleRetentionsModal}>
            Agregar por archivo
          </AddButton>
          <GridContainer>
            <thead>
              <tr>
                {retencionesHeader.map((todo) => (
                  <HeadGrid
                    value={todo.value}
                    column={todo.column}
                    id={todo.id}
                    key={todo.id}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {retentions.map((retention) => (
                <RetentionBodyGrid
                  key={retention.id}
                  id={retention.id}
                  retencion={retention.retencion}
                  nombre={retention.nombre}
                  fecha={retention.fecha}
                  estado={retention.estado}
                  cuitMatriculado={retention.cuitMatriculado}
                  onDelete={() => deleteRetention(retention.id)}
                ></RetentionBodyGrid>
              ))}
            </tbody>
          </GridContainer>
        </>
      )}
      {selectedNav === 4 && (
        <>
          <Input search={searchLiquidation} setSearch={setSearchLiquidation} />
          <AddButton setModal={setOpenAddLiquidationModal}>Generar Liquidacion</AddButton>
          <GridContainer>
            <thead>
              <tr>
                {liquidacionesHeader.map((head) => (
                  <HeadGrid
                    value={head.value}
                    column={head.column}
                    id={head.id}
                    key={head.id}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {liquidations.map((liquidation) => (
                <LiquidationBodyGrid
                  key={liquidation.id}
                  id={liquidation.id}
                  montoMes={liquidation.montoMes}
                  montoRetenido={liquidation.montoRetenido}
                  fecha={liquidation.fecha}
                  cuit={liquidation.cuit}
                  estado={liquidation.estado}
                  nombre={liquidation.nombre}
                  onDelete={() => deleteLiquidation(liquidation.id)}
                ></LiquidationBodyGrid>
              ))}
            </tbody>
          </GridContainer>
        </>
      )}

      {!!openAddPersonModal && (
        <Modal>
          <NewPersonForm />
        </Modal>
      )}
      {!!openAddBillModal && (
        <Modal>
          <NewBillForm />
        </Modal>
      )}
      {!!openAddRetentionModal && (
        <Modal>
          <NewRetentionForm />
        </Modal>
      )}
      {!!openAddLiquidationModal && (
        <Modal>
          <NewLiquidationForm />
        </Modal>
      )}
      {!!openAddMultiplePersonsModal && (
        <Modal>
          <NewPersonsForm />
        </Modal>
      )}
      {!!openAddMultipleRetentionsModal && (
        <Modal>
          <NewRetentionsForm />
        </Modal>
      )}
      {!!loading && <Loading>Esepere por favor...</Loading>}
    </React.Fragment>
  );
}

export { AppUI };
