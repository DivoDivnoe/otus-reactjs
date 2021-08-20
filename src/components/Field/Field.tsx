import React, { FC } from 'react';
import styled from '@emotion/styled';
import Cell from '../Cell/Cell';
import { Model, ClickCellType } from '@/components/App/App';
export interface FieldProps {
  model: Model;
  clickHandler: ClickCellType;
}

const FieldWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RowWrapper = styled.div`
  display: flex;
`;

const Field: FC<FieldProps> = (props) => {
  const { model, clickHandler } = props;

  return (
    <FieldWrapper>
      {model.map((modelRow, rowIndex) => {
        return (
          <RowWrapper key={`row-${rowIndex}`}>
            {modelRow.map((item, columnIndex) => {
              const coords = { x: columnIndex, y: rowIndex };

              return (
                <Cell
                  key={`item-${rowIndex}.${columnIndex}`}
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

export default Field;
