import reducer, { ActionCreator } from './';
import { Action, AnyAction } from 'redux';

describe('action creator', () => {
  it('setPlaying returns correct action', () => {
    const action = ActionCreator.setPlaying(true);

    expect(action.type).toEqual('isPlaying/setPlaying');
    expect(action.payload).toEqual(true);
  });

  it('startPlaying returns correct action', () => {
    const action = ActionCreator.startPlaying();

    expect(action.type).toEqual('isPlaying/startPlaying');
  });

  it('stopPlaying returns correct action', () => {
    const action = ActionCreator.stopPlaying();

    expect(action.type).toEqual('isPlaying/stopPlaying');
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action = ActionCreator.startPlaying();
      const state = reducer(undefined, action);

      expect(state).toEqual(true);
    });
  });

  describe('updates state correctly', () => {
    it('with startPlaying action', () => {
      const initialState = false;
      const action = ActionCreator.startPlaying();
      const state = reducer(initialState, action);

      expect(state).toEqual(true);
    });

    it('with STOP_PLAYING action', () => {
      const initialState = true;
      const action = ActionCreator.stopPlaying();
      const state = reducer(initialState, action);

      expect(state).toEqual(false);
    });

    it('with setPlaying action', () => {
      const initialState = true;
      const action = ActionCreator.setPlaying(false);
      const state = reducer(initialState, action);

      expect(state).toEqual(false);
    });
  });
});
