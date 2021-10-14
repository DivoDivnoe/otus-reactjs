import reducer, { ActionCreator } from './isPlaying';
import { Action } from 'redux';

describe('action creator', () => {
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
  });

  describe('updates state correctly', () => {
    it('with STOP_PLAYING action', () => {
      const initialState = true;
      const action: Action = { type: 'STOP_PLAYING' };
      const state = reducer(initialState, action);

      expect(state).toEqual(false);
    });
  });
});
