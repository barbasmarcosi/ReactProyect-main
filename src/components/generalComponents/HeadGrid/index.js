import React from "react";
import "./HeadGrid.css";
import { MainContext } from "../MainContext";
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';

function HeadGrid(props) {
  const [orderTableIcon, setOrderTableIcon] = React.useState(<MinimizeRoundedIcon/>);
  const { orderTable, setOrderTable } =
    React.useContext(MainContext);

  const orderTableButton = () => {   
    if (orderTable === props.column) {
      setOrderTable(`-` + props.column);
      setOrderTableIcon(<ArrowUpwardRoundedIcon/>);
    } else {
      setOrderTable(props.column);
      setOrderTableIcon(<ArrowDownwardRoundedIcon/>);
    }
  };
  return (
    <th className="HeadGrid-button" onClick={() => orderTableButton()}>
      {props.value} {orderTableIcon}
    </th>
  );
}

export { HeadGrid };
