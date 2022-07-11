import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const MainContext = React.createContext();

function MainProvider(props) {
  /*const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);*/
  const [searchPerson, setSearchPerson] = React.useState("");
  const [searchProject, setSearchProject] = React.useState("");
  const [searchRetention, setSearchRetention] = React.useState("");
  const [searchLiquidation, setSearchLiquidation] = React.useState("");
  const [orderTable, setOrderTable] = React.useState("");
  const [openTable, setOpenTable] = React.useState(false);
  const [openAddPersonModal, setOpenAddPersonModal] = React.useState(false);
  const [openAddBillModal, setOpenAddBillModal] = React.useState(false);
  const [openModifyModal, setOpenModifyModal] = React.useState(false);
  const [openModifyBillModal, setOpenModifyBillModal] = React.useState(false);
  const [clickId, setClickId] = React.useState(0);
  const [selectedNav, setSelectedNav] = React.useState(1);

  //const completedTodos = todos.filter((todo) => !!todo.completed).length;
  //const totalTodos = todos.length;

  const localPersonStg = (set) => {
    if (set) {
      localStorage.setItem("PERSONAS", JSON.stringify(set));
    } else {
      return JSON.parse(localStorage.getItem("PERSONAS"));
    }
  };

  const localProjectStg = (set) => {
    if (set) {
      localStorage.setItem("PROYECTOS", JSON.stringify(set));
    } else {
      return JSON.parse(localStorage.getItem("PROYECTOS"));
    }
  };

  const localRetentionStg = (set) => {
    if (set) {
      localStorage.setItem("RETENCIONES", JSON.stringify(set));
    } else {
      return JSON.parse(localStorage.getItem("RETENCIONES"));
    }
  };

  const localLiquidationStg = (set) => {
    if (set) {
      localStorage.setItem("LIQUIDACIONES", JSON.stringify(set));
    } else {
      return JSON.parse(localStorage.getItem("LIQUIDACIONES"));
    }
  };

  let persons = localPersonStg() || [];
  let projects = localProjectStg() || [];
  let retentions = localRetentionStg() || [];
  let liquidations = localLiquidationStg() || [];
  let searchedById;

  if (searchPerson.length >= 1) {
    persons = persons.filter((person) => {
      const name = person.nombre.toLowerCase();
      const lastName = person.apellido.toLowerCase();
      const cuit = `${person.id}`;
      const searchText = searchPerson.toLowerCase();
      return (
        name.includes(searchText) ||
        lastName.includes(searchText) ||
        cuit.includes(searchText)
      );
    });
  }

  if (searchProject.length >= 1) {
    projects = projects.filter((project) => {
      //const billNumber = project.nombre.toLowerCase();
      const billNumber = `${project.nroFactura}`;
      const description = project.fechaFactura.toLowerCase();
      const beginDate = project.fechaFactura.toLowerCase();
      const amount = `${project.monto}`;
      const finishDate = project.fechaIngreso.toLowerCase();
      const cuit = `${project.cuitMatriculado}`;
      const searchText = searchProject.toLowerCase();
      return (
        billNumber.includes(searchText) ||
        description.includes(searchText) ||
        beginDate.includes(searchText) ||
        amount.includes(searchText) ||
        finishDate.includes(searchText) ||
        cuit.includes(searchText)
      );
    });
  }

  if (searchRetention.length >= 1) {
    retentions = retentions.filter((retention) => {
      const month = `${retention.mes}`;
      const year = `${retention.anio}`;
      const percentage = `${retention.retencion * 100}`;
      const name = retention.nombre.toLowerCase();
      const cuit = `${retention.cuitMatriculado}`;
      const searchText = searchRetention.toLowerCase();
      return (
        percentage.includes(searchText) ||
        month.includes(searchText) ||
        year.includes(searchText) ||
        name.includes(searchText) ||
        cuit.includes(searchText)
      );
    });
  }

  if (searchLiquidation.length >= 1) {
    liquidations = liquidations.filter((liquidation) => {
      const monthAmount = `${liquidation.montoMes}`;
      const retainedAmount = `${liquidation.montoRetenido}`;
      const date = liquidation.fecha.toLowerCase();
      const name = liquidation.nombre.toLowerCase();
      const cuit = `${liquidation.cuit}`;
      const searchText = searchLiquidation.toLowerCase();
      return (
        monthAmount.includes(searchText) ||
        retainedAmount.includes(searchText) ||
        date.includes(searchText) ||
        name.includes(searchText) ||
        cuit.includes(searchText)
      );
    });
  }

  if (clickId) {
    let toFind;
    if (selectedNav === 1) toFind = persons;
    if (selectedNav === 2) toFind = projects;
    if (selectedNav === 3) toFind = retentions;
    if (selectedNav === 4) toFind = liquidations;
    searchedById = toFind.filter((find) => {
      const id = `${find.id}`;
      const search = `${clickId}`;
      return id.match(search);
    });
  }

  const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  if (selectedNav === 1) persons.sort(dynamicSort(`${orderTable}`));
  if (selectedNav === 2) projects.sort(dynamicSort(`${orderTable}`));
  if (selectedNav === 3) retentions.sort(dynamicSort(`${orderTable}`));
  if (selectedNav === 4) liquidations.sort(dynamicSort(`${orderTable}`));

  const addPerson = (cuit, nombre, apellido) => {
    persons.sort(dynamicSort("id"));
    let person = {
      id: persons[persons.length - 1].id + 1,
      cuit: cuit,
      nombre: nombre,
      apellido: apellido,
      estado: 1,
    };
    persons.push(person);
    localPersonStg(persons);
  };

  const addProject = (
    nroFactura,
    descripcion,
    fechaFactura,
    monto,
    fechaIngreso,
    cuitMatriculado
  ) => {
    projects.sort(dynamicSort("id"));
    let project = {
      id: projects[projects.length - 1].id + 1,
      nroFactura: nroFactura,
      descripcion: descripcion,
      fechaFactura: fechaFactura,
      monto: monto,
      fechaIngreso: fechaIngreso,
      cuitMatriculado: cuitMatriculado,
      estado: 1,
    };
    projects.push(project);
    localProjectStg(projects);
  };
  
  const addRetention = (
    retencion,
    mes,
    anio,
    cuitMatriculado,
    nombre,
  ) => {
    retentions.sort(dynamicSort("id"));
    let retention = {
      id: retentions[retentions.length - 1].id + 1,
      retencion: retencion,
      mes: mes,
      anio: anio,
      cuitMatriculado: cuitMatriculado,
      nombre: nombre,
      estado: 1,
    };
    retentions.push(retention);
    localRetentionStg(retentions);
  };

  const modifyPerson = (id, nombre, apellido) => {
    persons.sort(dynamicSort("id"));
    persons[id - 1].nombre = nombre;
    persons[id - 1].apellido = apellido;
    localPersonStg(persons);
  };

  const modifyProject = (
    id,
    nroFactura,
    descripcion,
    fechaFactura,
    monto,
    cuitMatriculado
  ) => {
    projects.sort(dynamicSort("id"));
    projects[id - 1].nroFactura = nroFactura;
    projects[id - 1].descripcion = descripcion;
    projects[id - 1].fechaFactura = fechaFactura;
    projects[id - 1].monto = monto;
    projects[id - 1].cuitMatriculado = cuitMatriculado;
    localProjectStg(projects);
  };

  const deletePerson = (id) => {
    const gridIndex = persons.findIndex((person) => person.id === id);
    persons[gridIndex].estado = 0;
    localPersonStg(persons);
  };

  const deleteProject = (id) => {
    const gridIndex = projects.findIndex((project) => project.id === id);
    projects.splice(gridIndex, 1);
    localProjectStg(projects);
  };

  const deleteRetention = (id) => {
    const gridIndex = retentions.findIndex((retention) => retention.id === id);
    retentions.splice(gridIndex, 1);
    localRetentionStg(retentions);
  };

  const deleteLiquidation = (id) => {
    const gridIndex = liquidations.findIndex(
      (liquidation) => liquidation.id === id
    );
    liquidations.splice(gridIndex, 1);
    localLiquidationStg(liquidations);
  };

  return (
    <MainContext.Provider
      value={{
        //loading,
        //error,
        //totalTodos,
        //completedTodos,
        addProject,
        addRetention,
        searchedById,
        searchPerson,
        setSearchPerson,
        searchProject,
        setSearchProject,
        searchRetention,
        setSearchRetention,
        persons,
        orderTable,
        setOrderTable,
        openAddPersonModal,
        setOpenAddPersonModal,
        openModifyModal,
        setOpenModifyModal,
        clickId,
        setClickId,
        deletePerson,
        deleteProject,
        addPerson,
        modifyPerson,
        dynamicSort,
        openTable,
        setOpenTable,
        projects,
        deleteRetention,
        selectedNav,
        setSelectedNav,
        retentions,
        liquidations,
        searchLiquidation,
        setSearchLiquidation,
        deleteLiquidation,
        openAddBillModal,
        setOpenAddBillModal,
        openModifyBillModal,
        setOpenModifyBillModal,
        modifyProject,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}

export { MainContext, MainProvider };

/*localStorage.setItem('PERSONAS', JSON.stringify([
    {
      id: 1,
      cuit: 20380831652,
      nombre: "Marcos",
      apellido: "Barbas",
      estado: 1,
    },
    {
      id: 2,
      cuit: 2358964235,
      nombre: "Juan Pablo",
      apellido: "Perez",
      estado: 1,
    },
    {
      id: 3,
      cuit: 1258665475,
      nombre: "Matias",
      apellido: "Silva",
      estado: 1,
    },
    {
      id: 4,
      cuit: 1234567890,
      nombre: "Pepe",
      apellido: "Fernandez",
      estado: 1,
    },
    {
      id: 5,
      cuit: 1616181618,
      nombre: "Maria",
      apellido: "Torre",
      estado: 1,
    },
    {
      id: 6,
      cuit: 7894561237,
      nombre: "Camila",
      apellido: "Lamda",
      estado: 1,
    },
    {
      id: 7,
      cuit: 4568791234,
      nombre: "Sofia",
      apellido: "Castro",
      estado: 1,
    },
  ]))
  
  localStorage.setItem('PROYECTOS', JSON.stringify([
    {
      id: 1,
      nroFactura: 16164681648164,
      descripcion: "Proyecto 1",
      fechaFactura: "11/11/2022",
      monto: 16646846,
      fechaIngreso: "13/12/2022",
      cuitMatriculado: 1,
      estado: 1,
    },
    {
      id: 2,
      nroFactura: 16164681631264,
      descripcion: "Proyecto 2",
      fechaFactura: "11/12/2022",
      monto: 16646846,
      fechaIngreso: "17/12/2022",
      cuitMatriculado: 1,
      estado: 1,
    },
    {
      id: 3,
      nroFactura: 16164682352354,
      descripcion: "Proyecto 3",
      fechaFactura: "07/11/2022",
      monto: 16646846,
      fechaIngreso: "07/12/2022",
      cuitMatriculado: 3,
      estado: 1,
    },
    {
      id: 4,
      nroFactura: 16164681642342,
      descripcion: "Proyecto 4",
      fechaFactura: "04/02/2022",
      monto: 16646846,
      fechaIngreso: "13/12/2022",
      cuitMatriculado: 4,
      estado: 1,
    },
    {
      id: 5,
      nroFactura: 1616464234264,
      descripcion: "Proyecto 5",
      fechaFactura: "11/11/2022",
      monto: 16646846,
      fechaIngreso: "13/12/2022",
      cuitMatriculado: 1,
      estado: 1,
    },
    {
      id: 6,
      nroFactura: 1616463453164,
      descripcion: "Proyecto 6",
      fechaFactura: "11/12/2022",
      monto: 16646846,
      fechaIngreso: "17/12/2022",
      cuitMatriculado: 7,
      estado: 1,
    },
    {
      id: 7,
      nroFactura: 161646816346364,
      descripcion: "Proyecto 7",
      fechaFactura: "07/11/2022",
      monto: 16646846,
      fechaIngreso: "07/12/2022",
      cuitMatriculado: 6,
      estado: 1,
    },
    {
      id: 8,
      nroFactura: 16164681641234,
      descripcion: "Proyecto 8",
      fechaFactura: "04/02/2022",
      monto: 16646846,
      fechaIngreso: "13/12/2022",
      cuitMatriculado: 3,
      estado: 1,
    },
    {
      id: 9,
      nroFactura: 16164681648234,
      descripcion: "Proyecto 9",
      fechaFactura: "11/11/2022",
      monto: 16646846,
      fechaIngreso: "13/12/2022",
      cuitMatriculado: 2,
      estado: 1,
    },
    {
      id: 10,
      nroFactura: 16164681644234,
      descripcion: "Proyecto 10",
      fechaFactura: "11/12/2022",
      monto: 16646846,
      fechaIngreso: "17/12/2022",
      cuitMatriculado: 5,
      estado: 1,
    },
    {
      id: 11,
      nroFactura: 16164481648164,
      descripcion: "Proyecto 11",
      fechaFactura: "07/11/2022",
      monto: 16646846,
      fechaIngreso: "07/12/2022",
      cuitMatriculado: 7,
      estado: 1,
    },
    {
      id: 12,
      nroFactura: 16164681628164,
      descripcion: "Proyecto 12",
      fechaFactura: "04/02/2022",
      monto: 16646846,
      fechaIngreso: "13/12/2022",
      cuitMatriculado: 7,
      estado: 1,
    },
  ]))

localStorage.setItem('RETENCIONES', JSON.stringify([
  {
    id: 1,
    retencion: 0.12,
    mes: 11,
    anio: 2022,
    cuitMatriculado: 38083165,
    nombre: 'Marcos Barbas',
  },{
    id: 2,
    retencion: 0.15,
    mes: 12,
    anio: 2022,
    cuitMatriculado: 18166846,
    nombre: 'Carlos Perez',
  },{
    id: 3,
    retencion: 0.2,
    mes: 07,
    anio: 2022,
    cuitMatriculado: 18148844,
    nombre: 'Maria Sera',
  },{
    id: 4,
    retencion: 0.35,
    mes: 02,
    anio: 2022,
    cuitMatriculado: 49849888,
    nombre: 'Pepe San',
  }]))

localStorage.setItem('LIQUIDACIONES', JSON.stringify([
  {
    id: 1,
    montoMes: 15000,
    montoRetenido: 1500,
    fecha: '22/07/2022',
    cuit: 2038083165,
    nombre: 'Marcos Barbas',
    estado: 1,
  },{
    id: 2,
    montoMes: 18000,
    montoRetenido: 1800,
    fecha: '22/06/2022',
    cuit: 165161616,
    nombre: 'Maria Torre',
    estado: 1,
  },{
    id: 3,
    montoMes: 25000,
    montoRetenido: 1500,
    fecha: '27/07/2022',
    cuit: 185164166,
    nombre: 'Pepe Fernandez',
    estado: 1,
  },{
    id: 4,
    montoMes: 118888,
    montoRetenido: 6516,
    fecha: '31/07/2022',
    cuit: 151668684,
    nombre: 'Juan Pablo Perez',
    estado: 1,
  },{
    id: 5,
    montoMes: 166646,
    montoRetenido: 1556,
    fecha: '31/07/2022',
    cuit: 487949499,
    nombre: 'Camila Lambda',
    estado: 1,
  }]))
  
  */
