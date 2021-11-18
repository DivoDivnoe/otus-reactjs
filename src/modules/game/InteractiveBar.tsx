import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from '@/components/Bar';
import { gameOptions } from '@/configs';
import { State } from '@/reducer';
import { BoardSize, getSize, ActionCreator as SizeActionCreator } from './size';
import {
  SpeedType,
  getSpeed,
  ActionCreator as SpeedActionCreator,
} from './speed';
import { FillType, getFill, ActionCreator as FillActionCreator } from './fill';
import {
  getIsPlaying,
  ActionCreator as IsPlayingActionCreator,
} from './isPlaying';
import {
  Model,
  ActionCreator as ModelActionCreator,
  getZeroMatrix,
} from './model';

export const InteractiveBar: FC = () => {
  const dispatch = useDispatch();

  const { sizes, speedTypes, fillTypes } = gameOptions;

  const size = useSelector<State, BoardSize>(getSize);
  const speed = useSelector<State, SpeedType>(getSpeed);
  const fill = useSelector<State, FillType>(getFill);
  const isPlaying = useSelector<State, boolean>(getIsPlaying);
  const zeroMatrix = useSelector<State, Model>(getZeroMatrix);

  const changeSizeHandler = useCallback(
    (size: BoardSize) => {
      dispatch(SizeActionCreator.setSize(size));
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const changeSpeedHandler = useCallback(
    (speedType: SpeedType) => {
      dispatch(SpeedActionCreator.setSpeed(speedType));
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const changeFillType = useCallback(
    (fill: FillType) => {
      dispatch(FillActionCreator.setFill(fill));
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const play = useCallback(
    () => {
      dispatch(IsPlayingActionCreator.startPlaying());
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );
  const pause = useCallback(
    () => {
      dispatch(IsPlayingActionCreator.stopPlaying());
    },
    // Stryker disable next-line ArrayDeclaration
    []
  );

  const clear = useCallback(() => {
    dispatch(ModelActionCreator.setModel(zeroMatrix));
  }, [size]);

  return (
    <Bar
      size={size}
      speed={speed}
      fill={fill}
      sizes={sizes}
      speedTypes={speedTypes}
      fillTypes={fillTypes}
      changeSizeHandler={changeSizeHandler}
      changeSpeedHandler={changeSpeedHandler}
      changeFillType={changeFillType}
      play={play}
      pause={pause}
      clear={clear}
      isPlaying={isPlaying}
    />
  );
};
