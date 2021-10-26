import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useGameSettings from './useGameSettings';
import { SpeedType, BoardSize, FillType } from '@/constants';
import { SpeedValue } from '@/configs';
import {
  getNextGenMatrix,
  createRandomMatrix,
  createNewSizeMatrix,
  createZeroMatrix,
  Model,
} from '@/core';
import { AppProps } from '@/components/App';
import { State } from '@/reducer';
import {
  getIsPlaying,
  ActionCreator as IsPlayingActionCreator,
} from '@/reducer/game/isPlaying';
import {
  getModel,
  ActionCreator as ModelActionCreator,
} from '@/reducer/game/model';

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

const useGameLogic = (props: AppProps): StartGameType => {
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
  } = useGameSettings(props);

  const dispatch = useDispatch();

  const model = useSelector<State, Model>(getModel);
  const isPlaying = useSelector<State, boolean>(getIsPlaying);

  const play = useCallback(
    () => dispatch(IsPlayingActionCreator.startPlaying()),
    []
  );
  const pause = useCallback(
    () => dispatch(IsPlayingActionCreator.stopPlaying()),
    []
  );
  const clear = useCallback(() => {
    pause();
    updateModel(createZeroMatrix(size));
  }, [size]);

  const updateModel = useCallback(
    (model) => ModelActionCreator.setModel(model),
    []
  );

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

  useEffect(() => {
    updateModel(createNewSizeMatrix(size, model));
  }, [size]);

  useEffect(() => {
    updateModel(createRandomMatrix(size, fill));
  }, [fill]);

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
