import React from "react";
//import "./ProjectBodyGrid.css";
import { MainContext } from "../../generalComponents/MainContext/index";
import { ModifyRetentionForm } from "../ModifyRetentionForm";
import { Modal } from "../../generalComponents/Modal";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function RetentionBodyGrid(props) {
  const { openModifyRetentionModal, setOpenModifyRetentionModal, setClickId } =
    React.useContext(MainContext);
  const onClickButton = (id) => {
    setClickId(id);
    setOpenModifyRetentionModal((prevState) => !prevState);
  };
  if (props.estado === 1) {
    return (
      <>
        <tr key={props.id}>
          <td>{props.retencion}</td>
          <td>{props.fecha}</td>
          <td>{props.cuitMatriculado}</td>
          <td>{props.nombre}</td>
          <td
            className="BodyGrid-button BodyGrid-editButton"
            //onClick={() => onClickButton(props.id, props.nombre, props.apellido)}
          >
            <ModeEditOutlineOutlinedIcon
              onClick={() => onClickButton(props.id)}
            />
          </td>
          <td
            className="BodyGrid-button BodyGrid-deleteButton"
            onClick={props.onDelete}
          >
            <DeleteForeverOutlinedIcon />
          </td>
        </tr>
        {!!openModifyRetentionModal && (
          <Modal>
            <ModifyRetentionForm />
          </Modal>
        )}
      </>
    );
  }
}

export { RetentionBodyGrid };
