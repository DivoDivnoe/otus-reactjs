import reducer, { ActionCreator } from './isPlaying';
import { Action, AnyAction } from 'redux';
import { State } from '@/reducer';
import { getIsPlaying } from './selectors';
import { BoardSize, SpeedType, FillType } from '@/constants';

describe('getIsPlaying selector', () => {
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

    expect(getIsPlaying(state)).toEqual(false);
  });
});

describe('action creator', () => {
  it('SET_PLAYING returns correct action', () => {
    const action = ActionCreator.SET_PLAYING(true);

    expect(action.type).toEqual('SET_PLAYING');
    expect(action.payload).toEqual(true);
  });

  it('START_PLAYING returns correct action', () => {
    const action = ActionCreator.START_PLAYING();

    expect(action.type).toEqual('START_PLAYING');
  });

  it('STOP_PLAYING returns correct action', () => {
    const action = ActionCreator.STOP_PLAYING();

    expect(action.type).toEqual('STOP_PLAYING');
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action: Action = { type: 'START_PLAYING' };
      const state = reducer(undefined, action);

      expect(state).toEqual(true);
    });
  });

  describe('updates state correctly', () => {
    it('with START_PLAYING action', () => {
      const initialState = false;
      const action: Action = { type: 'START_PLAYING' };
      const state = reducer(initialState, action);

      expect(state).toEqual(true);
    });

    it('with STOP_PLAYING action', () => {
      const initialState = true;
      const action: Action = { type: 'STOP_PLAYING' };
      const state = reducer(initialState, action);

      expect(state).toEqual(false);
    });

    it('with SET_PLAYING action', () => {
      const initialState = true;
      const action: AnyAction = { type: 'SET_PLAYING', payload: false };
      const state = reducer(initialState, action);

      expect(state).toEqual(false);
    });
  });
});
