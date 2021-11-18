import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { gameOptions } from '@/configs';
import { State } from '@/reducer';
import {
  getSize,
  BoardSize,
  ActionCreator as SizeActionCreator,
} from '@/modules/game/size';
import {
  getSpeed,
  SpeedType,
  ActionCreator as SpeedActionCreator,
} from '@/modules/game/speed';
import {
  getFill,
  FillType,
  ActionCreator as FillActionCreator,
} from '@/modules/game/fill';

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
  const { sizes, speedTypes, fillTypes } = gameOptions;

  const size = useSelector<State, BoardSize>(getSize);
  const speed = useSelector<State, SpeedType>(getSpeed);
  const fill = useSelector<State, FillType>(getFill);

  const dispatch = useDispatch();

  const changeSize = useCallback((size: BoardSize) => {
    dispatch(SizeActionCreator.setSize(size));
  }, []);

  const changeSpeed = useCallback((speedType: SpeedType) => {
    dispatch(SpeedActionCreator.setSpeed(speedType));
  }, []);

  const changeFill = useCallback((fill: FillType) => {
    dispatch(FillActionCreator.setFill(fill));
  }, []);

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
