import { combineReducers } from 'redux';
import ModelReducer, { Model } from './model';
import IsPlayingReducer from './isPlaying';
import SizeReducer, { BoardSize } from './size';
import SpeedReducer, { SpeedType } from './speed';
import FillReducer, { FillType } from './fill';

export { NAME_SPACE } from './nameSpace';
export { Game } from './Game';
export { getGameModule } from './module';

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
