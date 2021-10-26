import { useSelector, useDispatch } from 'react-redux';
import { SpeedType, BoardSize, FillType } from '@/constants';
import { gameOptions } from '@/configs';
import { State } from '@/reducer';
import {
  getSize,
  ActionCreator as SizeActionCreator,
} from '@/reducer/game/size';
import {
  getSpeed,
  ActionCreator as SpeedActionCreator,
} from '@/reducer/game/speed';
import {
  getFill,
  ActionCreator as FillActionCreator,
} from '@/reducer/game/fill';
import { SizeProps } from '@/core';

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

const useGameSettings = (): GameSettings => {
  const { boardSizes: sizes, speedTypes, fillTypes } = gameOptions;

  const size = useSelector<State, BoardSize>(getSize);
  const speed = useSelector<State, SpeedType>(getSpeed);
  const fill = useSelector<State, FillType>(getFill);

  const dispatch = useDispatch();

  const changeSize = (size: BoardSize) =>
    dispatch(SizeActionCreator.setSize(size));

  const changeSpeed = (speedType: SpeedType) =>
    dispatch(SpeedActionCreator.setSpeed(speedType));

  const changeFill = (fill: FillType) =>
    dispatch(FillActionCreator.setFill(fill));

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
