import reducer, { ActionCreator } from './speed';
import { AnyAction } from 'redux';
import { State } from '@/reducer';
import { getSpeed } from './selectors';
import { BoardSize, SpeedType, FillType } from '@/constants';

describe('getSpeed selector', () => {
  it('returns correct state', () => {
    const state: State = {
      game: {
        isPlaying: false,
        model: [[]],
        size: BoardSize.LARGE,
        speed: SpeedType.MEDIUM,
        fill: FillType.MEDIUM,
      },
      user: { userData: null },
    };

    expect(getSpeed(state)).toEqual(SpeedType.MEDIUM);
  });
});

describe('action creator', () => {
  describe('SET_SPEED returns correct action', () => {
    it('speed fast', () => {
      const speed = SpeedType.FAST;
      const action = ActionCreator.SET_SPEED(speed);

      expect(action.type).toEqual('SET_SPEED');
      expect(action.payload).toEqual(speed);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action: AnyAction = {
        type: 'SET_SPEED',
        payload: SpeedType.FAST,
      };

      const state = reducer(undefined, action);
      expect(state).toEqual(SpeedType.FAST);
    });
  });

  describe('updates state correctly', () => {
    it('with SET_SPEED action', () => {
      const initialState = SpeedType.MEDIUM;

      const action: AnyAction = {
        type: 'SET_SPEED',
        payload: SpeedType.FAST,
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(SpeedType.FAST);
    });
  });
});
