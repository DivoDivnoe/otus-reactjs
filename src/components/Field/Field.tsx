import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Cell } from './Cell';
import { ClickCellType } from '@/modules/game/useGameLogicRedux';
import { BoardSize } from '@/modules/game/size';
import { Model } from '@/modules/game/model';
export interface FieldProps {
  /**
   * field current size, used just for styles
   */
  size: BoardSize;
  /**
   * matrix for rendering cells
   */
  model: Model;
  /**
   * callback to fire when field is clicked
   */
  clickHandler: ClickCellType;
}

const FieldWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  box-shadow: 0 0 0 16px #021a60;
  border-radius: ${(props: Pick<FieldProps, 'size'>) =>
    props.size === BoardSize.SMALL ? '8px 8px 0 0' : '8px'};
`;

const RowWrapper = styled.div`
  display: inline-flex;
`;

export const Field: FC<FieldProps> = (props) => {
  const { size, model, clickHandler } = props;

  return (
    <FieldWrapper size={size}>
      {model.map((modelRow, rowIndex) => {
        return (
          <RowWrapper key={`index-${rowIndex}`}>
            {modelRow.map((item, columnIndex) => {
              const coords = { x: columnIndex, y: rowIndex };

              return (
                <Cell
                  key={`index-${rowIndex}.${columnIndex}`}
                  coords={coords}
                  isActive={!!item}
                  clickHandler={clickHandler}
                />
              );
            })}
          </RowWrapper>
        );
      })}
    </FieldWrapper>
  );
};
