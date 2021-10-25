import reducer, { ActionCreator } from './';
import { Action, AnyAction } from 'redux';

describe('action creator', () => {
  it('SET_PLAYING returns correct action', () => {
    const action = ActionCreator.setPlaying(true);

    expect(action.type).toEqual('SET_PLAYING');
    expect(action.payload).toEqual(true);
  });

  it('START_PLAYING returns correct action', () => {
    const action = ActionCreator.startPlaying();

    expect(action.type).toEqual('START_PLAYING');
  });

  it('STOP_PLAYING returns correct action', () => {
    const action = ActionCreator.stopPlaying();

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

    it('with unknown action placed', () => {
      const initialState = false;

      const action: AnyAction = {
        type: 'SOME_ACTION',
        payload: 'some payload',
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(false);
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
