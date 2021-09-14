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
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  box-shadow: 0 0 0 16px #ffffff;
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

export default Field;
