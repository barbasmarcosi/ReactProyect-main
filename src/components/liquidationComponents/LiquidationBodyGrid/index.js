import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function LiquidationBodyGrid(props) {
  if (props.estado === 1) {
    return (
      <>
        <tr key={props.id}>
          <td>{props.montoMes}</td>
          <td>{props.montoRetenido}</td>
          <td>{props.fecha}</td>
          <td>{props.cuit}</td>
          <td>{props.nombre}</td>
          <td
            className="BodyGrid-button BodyGrid-deleteButton"
            onClick={props.onDelete}
          >
            <DeleteForeverOutlinedIcon />
          </td>
        </tr>
      </>
    );
  }
}

export { LiquidationBodyGrid };
