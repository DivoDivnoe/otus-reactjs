import reducer, { ActionCreator } from './';
import { BoardSize } from '@/constants';

describe('action creator', () => {
  describe('setSize returns correct action', () => {
    it('size small', () => {
      const size = BoardSize.SMALL;

      const action = ActionCreator.setSize(size);

      expect(action.type).toEqual('size/setSize');
      expect(action.payload).toEqual(size);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action = ActionCreator.setSize(BoardSize.LARGE);

      const state = reducer(undefined, action);
      expect(state).toEqual(BoardSize.LARGE);
    });
  });

  describe('updates state correctly', () => {
    it('with setSize action', () => {
      const initialState = BoardSize.MEDIUM;

      const action = ActionCreator.setSize(BoardSize.SMALL);

      const state = reducer(initialState, action);
      expect(state).toEqual(BoardSize.SMALL);
    });
  });
});
