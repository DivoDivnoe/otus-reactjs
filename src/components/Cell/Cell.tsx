import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Coords, ClickCellType } from '@/hooks/useGameLogicRedux';

export interface CellProps {
  coords: Coords;
  isActive: boolean;
  clickHandler: ClickCellType;
}

const CellItem = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
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

export const Cell: FC<CellProps> = ({ coords, isActive, clickHandler }) => {
  return (
    <CellItem
      data-testid='cell'
      isActive={isActive}
      onClick={() => clickHandler(coords)}
    ></CellItem>
  );
};
