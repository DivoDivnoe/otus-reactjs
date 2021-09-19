import React, { Component, ReactNode } from 'react';
import { Coords, ClickCellType } from '@/components/App/App';
import styled from '@emotion/styled';

export interface CellProps {
  coords: Coords;
  isActive: boolean;
  clickHandler: ClickCellType;
}

const CellItem = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  background-color: ${(props: Pick<CellProps, 'isActive'>) =>
    props.isActive ? '#000071' : 'transparent'};
  background-color: ${(props: Pick<CellProps, 'isActive'>) =>
    props.isActive ? '#F9FF00' : '#073081'};
  border: 1px solid #dddddd;
  border: 1px solid #021a60;
  font-size: 8px;
  line-height: 20px;
  cursor: pointer;
`;

class Cell extends Component<CellProps, never> {
  render(): ReactNode {
    const { coords, isActive, clickHandler } = this.props;

    return (
      <CellItem
        isActive={isActive}
        onClick={() => clickHandler(coords)}
        data-testid='cell'
      ></CellItem>
    );
  }

  shouldComponentUpdate(nextProps: CellProps): boolean {
    if (this.props.isActive === nextProps.isActive) return false;

    return true;
  }
}

export default Cell;
