import React from "react";
import "./BodyGrid.css";
import { MainContext } from "../MainContext";
import { ModifyPersonForm } from "../ModifyPersonForm";
import { ModifyPersonModal } from "../ModifyPersonModal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function BodyGrid(props) {
  const {
    openModifyModal,
    setOpenModifyModal,
    setClickId,
  } = React.useContext(MainContext);
  const onClickButton = (id) => {
    setClickId(id);
    setOpenModifyModal((prevState) => !prevState);
  };
  console.log(props.estado);
  if (props.estado === 1) {
    return (
      <>
        <tr key={props.id}>
          <td>{props.cuit}</td>
          <td>{props.nombre}</td>
          <td>{props.apellido}</td>
          <td
            className="BodyGrid-button BodyGrid-editButton"
            onClick={() => onClickButton(props.id)}
          >
            <ModeEditOutlineOutlinedIcon />
          </td>
          <td
            className="BodyGrid-button BodyGrid-deleteButton"
            onClick={props.onDelete}
          >
            <DeleteForeverOutlinedIcon />
          </td>
        </tr>
        {!!openModifyModal && (
          <ModifyPersonModal>
            <ModifyPersonForm />
          </ModifyPersonModal>
        )}
      </>
    );
  }
}

export { BodyGrid };
