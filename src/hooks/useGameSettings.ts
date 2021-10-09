import { useState } from 'react';

import {
  SpeedType,
  BoardSize,
  FillType,
  CellState,
  Controls,
} from '@/constants';
import {
  gameOptions,
  BoardSizeValue,
  gameProps,
  BoardFillPercentage,
  SpeedValue,
} from '@/configs';
import { AppProps } from '@/components/App/App';

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

const useGameSettings = (props: AppProps): GameSettings => {
  const [size, changeSize] = useState(props.size || gameProps.boardSize);
  const [speed, changeSpeed] = useState(props.speed || gameProps.speed);
  const [fill, changeFill] = useState(props.fill || gameProps.fill);

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
