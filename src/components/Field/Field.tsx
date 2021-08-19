import React, { FC, CSSProperties } from 'react';
import Cell from '../Cell/Cell';
import { Model, ClickCellType } from '@/components/App/App';

export interface FieldProps {
  model: Model;
  clickHandler: ClickCellType;
}

const fieldStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const rowStyle: CSSProperties = {
  display: 'flex',
};

const Field: FC<FieldProps> = (props) => {
  const { model, clickHandler } = props;

  return (
    <div style={fieldStyle}>
      {model.map((modelRow, rowIndex) => {
        return (
          <div style={rowStyle} key={`row-${rowIndex}`}>
            {modelRow.map((item, columnIndex) => {
              const coords = { x: columnIndex, y: rowIndex };

              return (
                <Cell
                  key={`${rowIndex}.${columnIndex}`}
                  coords={coords}
                  isActive={!!item}
                  clickHandler={clickHandler}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Field;
