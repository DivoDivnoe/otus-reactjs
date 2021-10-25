import { combineReducers } from 'redux';
import ModelReducer from './model';
import IsPlayingReducer from './isPlaying';
import SizeReducer from './size';
import SpeedReducer from './speed';
import FillReducer from './fill';
import { Model } from '@/core';
import { BoardSize, SpeedType, FillType } from '@/constants';

export interface GameState {
  size: BoardSize;
  speed: SpeedType;
  fill: FillType;
  isPlaying: boolean;
  model: Model;
}

const reducer = combineReducers({
  size: SizeReducer,
  speed: SpeedReducer,
  fill: FillReducer,
  isPlaying: IsPlayingReducer,
  model: ModelReducer,
});

export default reducer;
