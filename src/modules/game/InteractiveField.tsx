import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Field } from '@/components/Field';
import { State } from '@/reducer';
import { BoardSize, getSize } from './size';
import {
  Model,
  getModel,
  ActionCreator as ModelActionCreator,
  Coords,
} from './model';

export const InteractiveField: FC = () => {
  const dispatch = useDispatch();

  const size = useSelector<State, BoardSize>(getSize);
  const model = useSelector<State, Model>(getModel);

  const onClickCell = useCallback(
    (coords: Coords): void => {
      dispatch(ModelActionCreator.updateModel(coords));
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );

  return <Field size={size} model={model} clickHandler={onClickCell} />;
};
