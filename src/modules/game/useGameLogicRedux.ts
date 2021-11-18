import { useCallback } from 'react';
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

  const clear = useCallback(() => {
    dispatch(ModelActionCreator.setModel(zeroMatrix));
  }, [size]);

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

  const onClickCell = useCallback(
    (coords: Coords): void => {
      dispatch(ModelActionCreator.updateModel(coords));
    },
    [model]
  );

  return {
    speed,
    size,
    fill,
    changeSize,
    changeSpeed,
    changeFill,
    sizes,
    speedTypes,
    fillTypes,
    play,
    pause,
    isPlaying,
    model,
    clickHandler: onClickCell,
    clear,
  };
};

export default useGameLogic;
