import { combineReducers } from 'redux';
import ModelReducer from './model/model';

import IsPlayingReducer from './isPlaying/isPlaying';
import SizeReducer from './size/size';
import SpeedReducer from './speed/speed';
import FillReducer from './fill/fill';
import { Model } from '@/core/core';
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
