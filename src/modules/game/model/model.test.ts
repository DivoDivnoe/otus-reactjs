import reducer, { ActionCreator, Model } from '.';

describe('action creator', () => {
  describe('setModel returns correct action', () => {
    it('model [[0, 0], [0, 0]]', () => {
      const model: Model = [
        [0, 0],
        [0, 0],
      ];

      const action = ActionCreator.setModel(model);

      expect(action.type).toEqual('model/setModel');
      expect(action.payload).toStrictEqual(model);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action = ActionCreator.setModel([
        [0, 0],
        [1, 0],
      ]);

      const state = reducer(undefined, action);
      expect(state).toBe(action.payload);
    });
  });

  describe('updates state correctly', () => {
    it('with setModel action', () => {
      const initialState: Model = [
        [1, 1],
        [1, 1],
      ];

      const action = ActionCreator.setModel([
        [0, 0],
        [0, 0],
      ]);

      const state = reducer(initialState, action);
      expect(state).toEqual(action.payload);
    });
  });
});
