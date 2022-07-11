import React from "react";
import { MainContext } from "../MainContext";
import { ModifyBillForm } from "../ModifyBillForm";
import { ModifyPersonModal } from "../ModifyPersonModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function ProjectBodyGrid(props) {
  const {
    setClickId,
    openModifyBillModal,
    setOpenModifyBillModal
  } = React.useContext(MainContext);
  const onClickButton = (id) => {
    setClickId(id);
    setOpenModifyBillModal((prevState) => !prevState);
  };

  return (
    <>
      <tr key={props.id}>
        <td>{props.nroFactura}</td>
        <td>{props.descripcion}</td>
        <td>{props.fechaFactura}</td>
        <td>{props.monto}</td>
        <td>{props.fechaIngreso}</td>
        <td>{props.cuitMatriculado}</td>
        <td
          className="BodyGrid-button BodyGrid-editButton"
          //onClick={() => onClickButton(props.id, props.nombre, props.apellido)}
        >
          <ModeEditOutlineOutlinedIcon onClick={() => onClickButton(props.id)}/>
        </td>
        <td
          className="BodyGrid-button BodyGrid-deleteButton"
          onClick={props.onDelete}
        >
          <DeleteForeverOutlinedIcon />
        </td>
      </tr>
      {!!openModifyBillModal && (
        <ModifyPersonModal>
          <ModifyBillForm />
        </ModifyPersonModal>
      )}
    </>
  );
}

export { ProjectBodyGrid };