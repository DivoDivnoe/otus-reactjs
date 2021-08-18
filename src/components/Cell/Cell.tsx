import React, { FC, CSSProperties } from "react";
import { Coords, ClickCellType } from "../App/App";

interface CellProps {
  coords: Coords;
  isActive: boolean;
  clickHandler: ClickCellType;
}

const style: CSSProperties = {
  boxSizing: "border-box",
  flexShrink: 0,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: 20,
  height: 20,
  border: "1px solid #dddddd",
  fontSize: 8,
  lineHeight: "20px",
  cursor: "pointer",
};

const Cell: FC<CellProps> = (props) => {
  const { coords, isActive, clickHandler } = props;

  return (
    <div style={style} onClick={() => clickHandler(coords)}>
      {isActive && `${coords.y}.${coords.x}`}
    </div>
  );
};

export default Cell;
