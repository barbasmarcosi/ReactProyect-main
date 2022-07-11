import React from "react";
const MainContext = React.createContext();

function MainProvider(props) {
  const [searchPerson, setSearchPerson] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchProject, setSearchProject] = React.useState("");
  const [searchRetention, setSearchRetention] = React.useState("");
  const [searchLiquidation, setSearchLiquidation] = React.useState("");
  const [orderTable, setOrderTable] = React.useState("");
  const [openTable, setOpenTable] = React.useState(false);
  const [openAddPersonModal, setOpenAddPersonModal] = React.useState(false);
  const [openAddMultiplePersonsModal, setOpenAddMultiplePersonsModal] =
    React.useState(false);
  const [openAddMultipleRetentionsModal, setOpenAddMultipleRetentionsModal] =
    React.useState(false);
  const [openAddBillModal, setOpenAddBillModal] = React.useState(false);
  const [openAddRetentionModal, setOpenAddRetentionModal] =
    React.useState(false);
  const [openAddLiquidationModal, setOpenAddLiquidationModal] =
    React.useState(false);
  const [openModifyModal, setOpenModifyModal] = React.useState(false);
  const [openModifyBillModal, setOpenModifyBillModal] = React.useState(false);
  const [openModifyRetentionModal, setOpenModifyRetentionModal] =
    React.useState(false);
  const [clickId, setClickId] = React.useState(0);
  const [selectedNav, setSelectedNav] = React.useState(1);

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
      const cuit = `${person.cuit}`;
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
      const billNumber = `${project.nroFactura}`;
      const description = project.descripcion.toLowerCase();
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
      const date = `${retention.fecha}`;
      const percentage = `${retention.retencion}`;
      const name = retention.nombre.toLowerCase();
      const cuit = `${retention.cuitMatriculado}`;
      const searchText = searchRetention.toLowerCase();
      return (
        percentage.includes(searchText) ||
        date.includes(searchText) ||
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
    console.log(toFind);
    searchedById = toFind.filter((find) => {
      const id = `${find.id}`;
      const search = `${clickId}`;
      console.log(id, search);
      return id.match(search);
    });
  }

  const personFinderById = async (personId) => {
    let person = persons.filter((find) => {
      const id = `${find.id}`;
      const search = `${personId}`;
      return id.match(search);
    });
    return person[0];
  };

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
    let gridIndex = -1;
    gridIndex = persons.findIndex(
      (person) => Number(person.cuit) === Number(cuit)
    );
    if (gridIndex !== -1 && persons[gridIndex].estado === 0) {
      persons[gridIndex].estado = 1;
      alert(
        "Esta persona ya estaba registrada pero dada de baja, ser procedera a darlo de alta"
      );
    } else if (gridIndex !== -1 && persons[gridIndex].estado === 1) {
      persons[gridIndex].estado = 1;
      alert("Esta persona ya estaba registrada");
    } else {
      let person = {
        id: persons.length !== 0 ? persons[persons.length - 1].id + 1 : 1,
        cuit: cuit,
        nombre: nombre,
        apellido: apellido,
        estado: 1,
      };
      persons.push(person);
    }
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
    let gridIndex = -1;
    gridIndex = projects.findIndex(
      (project) => Number(project.nroFactura) === Number(nroFactura)
    );
    if (gridIndex !== -1 && projects[gridIndex].estado === 0) {
      alert(
        "Este numero de factura ya estaba cargada pero anulada, sera dada de alta con los datos originales"
      );
      projects[gridIndex].estado = 1;
    } else if (gridIndex !== -1 && projects[gridIndex].estado === 1) {
      alert(
        "Este numero de factura ya estaba cargada"
      );
    } else {
      let project = {
        id: projects.length !== 0 ? projects[projects.length - 1].id + 1 : 1,
        nroFactura: nroFactura,
        descripcion: descripcion,
        fechaFactura: fechaFactura,
        monto: monto,
        fechaIngreso: fechaIngreso,
        cuitMatriculado: cuitMatriculado,
        estado: 1,
        idLiquidacion: null,
      };
      projects.push(project);
    }
    localProjectStg(projects);
  };

  const addRetention = (retencion, fecha, cuitMatriculado, nombre) => {
    let gridIndex = -1;
    retentions.sort(dynamicSort("id"));
    const retentionDate = new Date(fecha);
    const todayDate = new Date(Date.now());
    gridIndex = retentions.findIndex(
      (retention) =>
        Number(retention.cuitMatriculado) === Number(cuitMatriculado) &&
        retentionDate.getFullYear() === todayDate.getFullYear() &&
        retentionDate.getMonth() === todayDate.getMonth()
    );
    if (gridIndex !== -1 && retentions[gridIndex].estado === 0) {
      alert(
        "Esta retencion ya estaba cargada pero anulada, sera dada de alta con los datos originales"
      );
      retentions[gridIndex].estado = 1;
    } else if (gridIndex !== -1 && retentions[gridIndex].estado === 1) {
      alert("Esta retencion ya estaba cargada");
    } else {
      let retention = {
        id:
          retentions.length !== 0
            ? retentions[retentions.length - 1].id + 1
            : 1,
        retencion: retencion,
        fecha: fecha,
        cuitMatriculado: cuitMatriculado,
        nombre: nombre,
        estado: 1,
      };
      retentions.push(retention);
    }
    localRetentionStg(retentions);
  };

  const addLiquidation = (mes, cuitMatriculado, nombre) => {
    retentions.sort(dynamicSort("id"));
    let searchedBills = projects.filter((bill) => {
      const billCuit = `${bill.cuitMatriculado}`;
      const billState = bill.estado;
      const billLiquidation = bill.idLiquidacion;
      const search = `${cuitMatriculado}`;
      console.log(billCuit, search, billState, billLiquidation);
      return billCuit.match(search) && billState === 1 && !billLiquidation;
    });
    if (searchedBills.length > 0) {
      let newAmount = 0;
      searchedBills.forEach((bill) => {
        newAmount = newAmount + Number(bill.monto);
      });
      let searchedRetention = retentions.filter((retention) => {
        const retentionCuit = `${retention.cuitMatriculado}`;
        const retentionMonth = `${new Date(retention.fecha).getMonth() + 1}`;
        const search = `${cuitMatriculado}`;
        return retentionCuit.match(search) && retentionMonth === mes;
      });
      if (searchedRetention.length > 0) {
        let newRetainedAmount =
          (searchedRetention[0].retencion / 100) * newAmount;
        let liquidation = {
          id:
            liquidations.length !== 0
              ? liquidations[liquidations.length - 1].id + 1
              : 1,
          montoMes: newAmount,
          montoRetenido: newRetainedAmount,
          fecha: `${new Date(Date.now()).getFullYear()}-${
            new Date(Date.now()).getMonth() + 1
          }-${new Date(Date.now()).getDate()}`,
          cuit: cuitMatriculado,
          nombre: nombre,
          estado: 1,
        };
        searchedBills.forEach((searchedBill) => {
          projects.forEach((project) => {
            if (project === searchedBill) {
              project.idLiquidacion =
                liquidations.length !== 0
                  ? liquidations[liquidations.length - 1].id + 1
                  : 1;
            }
          });
        });
        liquidations.push(liquidation);
        localLiquidationStg(liquidations);
        localProjectStg(projects);
      } else {
        alert(
          "Esta persona no posee retenciones asignadas en el mes seleccionado"
        );
      }
    } else {
      alert("Esta persona no posee facturas pendientes a Liquidar en este mes");
    }
  };

  const reg = (regex, text, regexLength, rows) => {
    let indexes = [];
    let data = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      indexes.push(match.index);
    }
    let part = text.slice(0, indexes[0]);
    let count;
    for (let i = 0; i < indexes.length + 1; i++) {
      part = text.slice(indexes[i - 1] + regexLength, indexes[i]);
      if (part === "") {
        count++;
      } else {
        count = 0;
      }
      data.push(part);
      if (count > rows - 2) {
        data.splice(data.length - rows, rows);
        break;
      }
    }
    return data;
  };

  const cargarMultiplesMatriculados = (file) => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 3000);
    const regexMat = /(;|(\s\n))/g;
    try {
      const extracted = reg(regexMat, file, 1, 40);
      console.log(extracted);
      const cuit = extracted.indexOf("CUIT");
      const name = extracted.indexOf("Nombres");
      const lastName = extracted.indexOf("Apellido");
      let matriculadoId;
      persons.length !== 0
        ? (matriculadoId = persons[persons.length - 1].id + 1)
        : (matriculadoId = 0);
      let dataArray = [];
      for (let i = 40; i < extracted.length; i += 40) {
        matriculadoId += 1;
        dataArray.push(
          matriculadoId,
          extracted[i + name],
          extracted[i + lastName],
          extracted[i + cuit]
        );
      }
      if (dataArray.length !== 0) {
        let indexes = [];
        for (let j = 0; j < persons.length; j++) {
          let coincidente = 0;
          for (let i = 3; i < dataArray.length; i += 4) {
            if (Number(dataArray[i]) === persons[j].cuit) {
              indexes.push(i);
              coincidente++;
            }
          }
          if (coincidente && persons[j].estado === 0) {
            persons[j].estado = 1;
          } else if (!coincidente && persons[j].estado === 1) {
            persons[j].estado = 0;
          }
        }
        for (let i = 3; i < dataArray.length; i += 4) {
          let coincidente = true;
          for (let j = 0; j < indexes.length; j++) {
            if (indexes[j] === i) coincidente = false;
          }
          if (coincidente)
            addPerson(Number(dataArray[i]), dataArray[i - 2], dataArray[i - 1]);
        }
        console.log(persons);
        localPersonStg(persons);
        alert("Matriculados Cargados Exitosamente");
      } else {
        alert("Verifique el archivo ingresado");
      }
    } catch {
      alert("Verifique el archivo ingresado");
    }
  };

  const cargarRetenciones = (file) => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 10000);
    let fechaHoy = new Date(Date.now());
    let fecha =
      fechaHoy.getFullYear() +
      "-" +
      (fechaHoy.getMonth() + 1) +
      "-" +
      fechaHoy.getDate();
    //console.log(fecha);
    const regexAfip = /(;)/g;
    try {
      const padronAfip = reg(regexAfip, file, 1, 9);
      let flag = true;
      /*for (let i = 0; i < retentions.length; i++) {
        let fechaRetencion = new Date(retentions[i].fecha);
        if (
          fechaRetencion.getMonth() === fechaHoy.getMonth() &&
          fechaRetencion.getFullYear() === fechaHoy.getFullYear()
        ) {
          flag = false;
          break;
        }
      }*/
      if (flag) {
        let originalLength = retentions.length;
        for (let i = 0; i < persons.length; i++) {
          for (let j = 4; j < padronAfip.length; j += 10) {
            //console.log(persons[i].cuit, Number(padronAfip[j]))
            if (persons[i].cuit === Number(padronAfip[j])) {
              let num = padronAfip[j + 4];
              num = num.replace(",", ".");
              addRetention(
                Number(num),
                fecha,
                persons[i].cuit,
                persons[i].nombre + " " + persons[i].apellido
              );
            }
          }
        }
        if (retentions.length !== originalLength) {
          alert("Se han cargado correctamente las nuevas retenciones");
        } else {
          alert("No se han encontrado nuevas retenciones para cargar");
        }
      } else {
        alert("Las retenciones de este mes ya han sido cargadas");
      }
    } catch {
      alert("Hubo un error, verifique el archivo ingresado");
    }
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
    descripcion,
    fechaFactura,
    monto,
    cuitMatriculado
  ) => {
    projects.sort(dynamicSort("id"));
    projects[id - 1].descripcion = descripcion;
    projects[id - 1].fechaFactura = fechaFactura;
    projects[id - 1].monto = monto;
    projects[id - 1].cuitMatriculado = cuitMatriculado;
    localProjectStg(projects);
  };

  const modifyRetention = (id, retencion, fecha, cuitMatriculado, nombre) => {
    retentions.sort(dynamicSort("id"));
    retentions[id - 1].retencion = retencion;
    retentions[id - 1].fecha = fecha;
    retentions[id - 1].cuitMatriculado = cuitMatriculado;
    retentions[id - 1].nombre = nombre;
    localRetentionStg(retentions);
  };

  const deletePerson = (id) => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    const gridIndex = persons.findIndex((person) => person.id === id);
    persons[gridIndex].estado = 0;
    localPersonStg(persons);
  };

  const deleteProject = (id) => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    const gridIndex = projects.findIndex((project) => project.id === id);
    if (!projects[gridIndex].idLiquidacion) {
      projects[gridIndex].estado = 0;
      localProjectStg(projects);
    } else {
      alert("No puede anular esta factura porque ya fue Liquidada");
    }
  };

  const deleteRetention = (id) => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    const gridIndex = retentions.findIndex((retention) => retention.id === id);
    retentions[gridIndex].estado = 0;
    localRetentionStg(retentions);
  };

  const deleteLiquidation = (id) => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    const gridIndex = liquidations.findIndex(
      (liquidation) => liquidation.id === id
    );
    projects.forEach((project) => {
      if (project.idLiquidacion === liquidations[gridIndex].id) {
        project.idLiquidacion = null;
        console.log("Coincidencia");
      }
    });
    liquidations[gridIndex].estado = 0;
    localLiquidationStg(liquidations);
    localProjectStg(projects);
    console.log(liquidations);
    console.log(projects);
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
        openAddRetentionModal,
        setOpenAddRetentionModal,
        openModifyRetentionModal,
        setOpenModifyRetentionModal,
        modifyRetention,
        addLiquidation,
        openAddLiquidationModal,
        setOpenAddLiquidationModal,
        openAddMultiplePersonsModal,
        setOpenAddMultiplePersonsModal,
        cargarMultiplesMatriculados,
        cargarRetenciones,
        openAddMultipleRetentionsModal,
        setOpenAddMultipleRetentionsModal,
        personFinderById,
        loading,
        setLoading,
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
      cuit: 20380831651,
      nombre: "Juan Pablo",
      apellido: "Perez",
      estado: 1,
    },
    {
      id: 3,
      cuit: 203808316510,
      nombre: "Matias",
      apellido: "Silva",
      estado: 1,
    }
  ]))
  
  localStorage.setItem('PROYECTOS', JSON.stringify([
    {
      id: 1,
      nroFactura: 123456789,
      descripcion: "Proyecto 1",
      fechaFactura: "7-2-2022",
      monto: 15000,
      fechaIngreso: "10-2-2022",
      cuitMatriculado: 20380831652,
      estado: 1,
      idLiquidacion: null,
    },
    {
      id: 2,
      nroFactura: 16164681631264,
      descripcion: "Proyecto 2",
      fechaFactura: "20-5-2022",
      monto: 25000,
      fechaIngreso: "27-5-2022",
      cuitMatriculado: 20380831652,
      estado: 1,
      idLiquidacion: null,
    },
    {
      id: 3,
      nroFactura: 16164682352354,
      descripcion: "Proyecto 3",
      fechaFactura: "22-1-2022",
      monto: 710000,
      fechaIngreso: "25-1-2022",
      cuitMatriculado: 20380831650,
      estado: 1,
      idLiquidacion: null,
    },
    {
      id: 4,
      nroFactura: 16164681642342,
      descripcion: "Proyecto 4",
      fechaFactura: "3-2-2022",
      monto: 8900,
      fechaIngreso: "13-2-2022",
      cuitMatriculado: 20380831651,
      estado: 1,
      idLiquidacion: null,
    },
    {
      id: 5,
      nroFactura: 1616464234264,
      descripcion: "Proyecto 5",
      fechaFactura: "11-4-2022",
      monto: 15800,
      fechaIngreso: "13-4-2022",
      cuitMatriculado: 20380831652,
      estado: 1,
      idLiquidacion: null,
    },
    {
      id: 6,
      nroFactura: 1616463453164,
      descripcion: "Proyecto 6",
      fechaFactura: "11-6-2022",
      monto: 16500,
      fechaIngreso: "17-6-2022",
      cuitMatriculado: 20380831651,
      estado: 1,
      idLiquidacion: null,
    }
  ]))

localStorage.setItem('RETENCIONES', JSON.stringify([
  {
    id: 1,
    retencion: 0.12,
    fecha: '2022-3-14',
    cuitMatriculado: 20380831652,
    nombre: 'Marcos Barbas',
    estado: 1,
  },{
    id: 2,
    retencion: 0.15,
    fecha: '2022-1-7',
    cuitMatriculado: 20380831651,
    nombre: 'Carlos Perez',
    estado: 1,
  },{
    id: 3,
    retencion: 0.2,
    fecha: '2022-6-22',
    cuitMatriculado: 20380831650,
    nombre: 'Maria Sera',
    estado: 1,
  },{
    id: 4,
    retencion: 0.35,
    fecha: '2022-2-20',
    cuitMatriculado: 20380831650,
    nombre: 'Pepe San',
    estado: 1,
  }]))

localStorage.setItem('LIQUIDACIONES', JSON.stringify([
  {
    id: 1,
    montoMes: 15000,
    montoRetenido: 1500,
    fecha: '22-07-2022',
    cuit: 20380831652,
    nombre: 'Marcos Barbas',
    estado: 1,
  },{
    id: 2,
    montoMes: 18000,
    montoRetenido: 1800,
    fecha: '22-06-2022',
    cuit: 20380831650,
    nombre: 'Juan Pablo',
    estado: 1,
  },{
    id: 3,
    montoMes: 25000,
    montoRetenido: 1500,
    fecha: '27-07-2022',
    cuit: 20380831651,
    nombre: 'Matias Silva',
    estado: 1,
  },{
    id: 4,
    montoMes: 118888,
    montoRetenido: 6516,
    fecha: '31-07-2022',
    cuit: 20380831652,
    nombre: 'Marcos Barbas',
    estado: 1,
  }
  ]))
  
  */
