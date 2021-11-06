import reducer, { ActionCreator, SpeedType } from './';

describe('action creator', () => {
  describe('setSpeed returns correct action', () => {
    it('speed fast', () => {
      const speed = SpeedType.FAST;
      const action = ActionCreator.setSpeed(speed);

      expect(action.type).toEqual('speed/setSpeed');
      expect(action.payload).toEqual(speed);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action = ActionCreator.setSpeed(SpeedType.FAST);

      const state = reducer(undefined, action);
      expect(state).toEqual(SpeedType.FAST);
    });
  });

  describe('updates state correctly', () => {
    it('with setSpeed action', () => {
      const initialState = SpeedType.MEDIUM;

      const action = ActionCreator.setSpeed(SpeedType.FAST);

      const state = reducer(initialState, action);
      expect(state).toEqual(SpeedType.FAST);
    });
  });
});
