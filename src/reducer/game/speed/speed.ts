import { AnyAction } from 'redux';
import { ActionType } from '@/reducer/constants';
import { SpeedType } from '@/constants';
import { gameProps } from '@/configs';

export interface GameSpeedActionCreator {
  setSpeed: (speed: SpeedType) => AnyAction;
}

const initialState: SpeedType = gameProps.speed;

export const ActionCreator: GameSpeedActionCreator = {
  setSpeed: (speed: SpeedType) => ({
    type: ActionType.SET_SPEED,
    payload: speed,
  }),
};

const reducer = (
  state: SpeedType = initialState,
  action: AnyAction
): SpeedType => {
  switch (action.type) {
    case ActionType.SET_SPEED:
      return action.payload;
  }

  return state;
};

export default reducer;
