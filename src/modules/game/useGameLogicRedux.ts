import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useGameSettings from './useGameSettingsRedux';
import { BoardSize } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';
import { FillType } from '@/modules/game/fill';
import {
  getIsPlaying,
  ActionCreator as IsPlayingActionCreator,
} from '@/modules/game/isPlaying';
import {
  getModel,
  Model,
  ActionCreator as ModelActionCreator,
  getZeroMatrix,
} from '@/modules/game/model';
import { State } from '@/reducer';
// import { createZeroMatrix } from '@/modules/game/core';

export interface Coords {
  x: number;
  y: number;
}

export type ClickCellType = (coords: Coords) => void;

export interface StartGameType {
  size: BoardSize;
  speed: SpeedType;
  fill: FillType;
  sizes: BoardSize[];
  speedTypes: SpeedType[];
  fillTypes: FillType[];
  changeSize: (size: BoardSize) => void;
  changeSpeed: (speedType: SpeedType) => void;
  changeFill: (fill: FillType) => void;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  clear: () => void;
  model: Model;
  updateModel: (model: Model) => void;
  clickHandler: ClickCellType;
}

const useGameLogic = (): StartGameType => {
  const {
    speed,
    size,
    fill,
    changeSize,
    changeSpeed,
    changeFill,
    sizes,
    speedTypes,
    fillTypes,
  } = useGameSettings();

  const dispatch = useDispatch();

  const model = useSelector<State, Model>(getModel);
  const zeroMatrix = useSelector<State, Model>(getZeroMatrix);
  const isPlaying = useSelector<State, boolean>(getIsPlaying);

  const updateModel = useCallback((someModel) => {
    dispatch(ModelActionCreator.setModel(someModel));
  }, []);

  const clear = useCallback(() => {
    pause();
    updateModel(zeroMatrix);
  }, [size]);

  const play = useCallback(() => {
    dispatch(IsPlayingActionCreator.startPlaying());
  }, []);
  const pause = useCallback(() => {
    dispatch(IsPlayingActionCreator.stopPlaying());
  }, []);

  const updateSize = useCallback((size: BoardSize): void => {
    pause();
    changeSize(size);
  }, []);

  const updateFill = useCallback((fill: FillType): void => {
    pause();
    changeFill(fill);
  }, []);

  const onClickCell = useCallback(
    (coords: Coords): void => {
      const { x, y } = coords;
      const newModel = model.map((row) => row.slice());
      newModel[y][x] = model[y][x] ? 0 : 1;

      updateModel(newModel);
    },
    [model]
  );

  return {
    speed,
    size,
    fill,
    changeSize: updateSize,
    changeSpeed,
    changeFill: updateFill,
    sizes,
    speedTypes,
    fillTypes,
    play,
    pause,
    isPlaying,
    model,
    updateModel,
    clickHandler: onClickCell,
    clear,
  };
};

export default useGameLogic;
