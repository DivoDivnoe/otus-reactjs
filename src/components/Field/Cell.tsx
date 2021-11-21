import React, { FC, memo } from 'react';
import styled from '@emotion/styled';
import { Coords } from '@/modules/game/model';
import _ from 'underscore';

export interface CellProps {
  /**
   *cell coords
   */
  coords: Coords;
  /**
   * is cell active flag
   */
  isActive: boolean;
  /**
   * callback to fire when cell is clicked
   */
  clickHandler: (coords: Coords) => void;
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

const CellCompoment: FC<CellProps> = ({ coords, isActive, clickHandler }) => {
  return (
    <CellItem
      data-testid='cell'
      isActive={isActive}
      onClick={() => clickHandler(coords)}
    ></CellItem>
  );
};

export const areEqual = (
  prevProps: CellProps,
  nextProps: CellProps
): boolean => {
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.clickHandler === nextProps.clickHandler &&
    _.isEqual(prevProps.coords, nextProps.coords)
  );
};

export const Cell = memo(CellCompoment, areEqual);
