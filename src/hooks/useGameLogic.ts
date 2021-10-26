import { useState, useEffect, useCallback, useRef } from 'react';
import useGameSettings from './useGameSettings';
import { SpeedType, BoardSize, FillType } from '@/constants';
import { SpeedValue } from '@/configs';
import {
  getNextGenMatrix,
  createRandomMatrix,
  createNewSizeMatrix,
  createZeroMatrix,
  Model,
} from '@/core/core';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [model, updateModel] = useState(createRandomMatrix(size, fill));

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

  const startGame = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const stopGame = useCallback(() => {
    setIsPlaying(false);
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

  const clear = useCallback((): void => {
    stopGame();
    updateModel(createZeroMatrix(size));
  }, [size]);

  const updateFill = useCallback((fill: FillType): void => {
    stopGame();
    changeFill(fill);
  }, []);

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
    play: startGame,
    pause: stopGame,
    isPlaying,
    model,
    updateModel,
    clickHandler: onClickCell,
    clear,
  };
};

export default useGameLogic;
