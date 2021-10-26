import { useState } from 'react';
import { SpeedType, BoardSize, FillType } from '@/constants';
import { gameOptions, gameProps } from '@/configs';

export interface GameSettings {
  size: BoardSize;
  speed: SpeedType;
  fill: FillType;
  sizes: BoardSize[];
  speedTypes: SpeedType[];
  fillTypes: FillType[];
  changeSize: (size: BoardSize) => void;
  changeSpeed: (speedType: SpeedType) => void;
  changeFill: (fill: FillType) => void;
}

const { boardSizes: sizes, speedTypes, fillTypes } = gameOptions;

const useGameSettings = (): GameSettings => {
  const [size, changeSize] = useState(gameProps.boardSize);
  const [speed, changeSpeed] = useState(gameProps.speed);
  const [fill, changeFill] = useState(gameProps.fill);

  return {
    size,
    speed,
    fill,
    changeSize,
    changeSpeed,
    changeFill,
    sizes,
    speedTypes,
    fillTypes,
  };
};

export default useGameSettings;
