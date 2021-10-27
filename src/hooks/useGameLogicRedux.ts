import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useGameSettings from './useGameSettingsRedux';
import { BoardSize } from '@/reducer/game/size';
import { SpeedType, SpeedValue } from '@/reducer/game/speed';
import { FillType } from '@/reducer/game/fill';
import {
  getIsPlaying,
  ActionCreator as IsPlayingActionCreator,
} from '@/reducer/game/isPlaying';
import {
  getModel,
  Model,
  ActionCreator as ModelActionCreator,
} from '@/reducer/game/model';
import { State } from '@/reducer';
import { getNextGenMatrix, createZeroMatrix } from '@/core';

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
  const isPlaying = useSelector<State, boolean>(getIsPlaying);

  const updateModel = useCallback((someModel) => {
    dispatch(ModelActionCreator.setModel(someModel));
  }, []);

  const clear = useCallback(() => {
    pause();
    updateModel(createZeroMatrix(size));
  }, [size]);

  const play = useCallback(() => {
    dispatch(IsPlayingActionCreator.startPlaying());
  }, []);
  const pause = useCallback(() => {
    dispatch(IsPlayingActionCreator.stopPlaying());
  }, []);

  const updateFill = useCallback((fill: FillType): void => {
    pause();
    changeFill(fill);
  }, []);

  const intervalId: { current: NodeJS.Timeout | null } = useRef(null);

  const gameIteration = useCallback(() => {
    updateModel(getNextGenMatrix(model));
  }, [model]);

  const gameIterationRef: { current: () => void } = useRef(gameIteration);

  useEffect(() => {
    gameIterationRef.current = gameIteration;
  }, [model]);

  useEffect(() => {
    if (isPlaying) {
      intervalId.current = setInterval(() => {
        gameIterationRef.current();
      }, SpeedValue[speed]);
    } else if (!isPlaying && intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [isPlaying, speed]);

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
    changeSize,
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
