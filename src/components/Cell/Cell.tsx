import React, { Component, ReactNode } from 'react';
import { Coords, ClickCellType } from '@/components/App/App';
import styled from '@emotion/styled';

export interface CellProps {
  coords: Coords;
  isActive: boolean;
  clickHandler: ClickCellType;
}

const CellItem = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid #dddddd;
  font-size: 8px;
  line-height: 20px;
  cursor: pointer;
`;

// const Cell: FC<CellProps> = (props) => {
//   const { coords, isActive, clickHandler } = props;

//   return (
//     <CellItem onClick={() => clickHandler(coords)} role='cell'>
//       {isActive && `${coords.y}.${coords.x}`}
//     </CellItem>
//   );
// };

class Cell extends Component<CellProps, never> {
  render(): ReactNode {
    const { coords, isActive, clickHandler } = this.props;

    return (
      <CellItem onClick={() => clickHandler(coords)} role='cell'>
        {isActive && `${coords.y}.${coords.x}`}
      </CellItem>
    );
  }

  shouldComponentUpdate(nextProps: CellProps): boolean {
    if (this.props.isActive === nextProps.isActive) return false;

    return true;
  }
}

export default Cell;
