import reducer, { ActionCreator } from './';
import { AnyAction } from 'redux';
import { BoardSize } from '@/constants';

describe('action creator', () => {
  describe('SET_SIZE returns correct action', () => {
    it('size small', () => {
      const size = BoardSize.SMALL;

      const action = ActionCreator.setSize(size);

      expect(action.type).toEqual('SET_SIZE');
      expect(action.payload).toEqual(size);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action: AnyAction = {
        type: 'SET_SIZE',
        payload: BoardSize.LARGE,
      };

      const state = reducer(undefined, action);
      expect(state).toEqual(BoardSize.LARGE);
    });

    it('with unknown action placed', () => {
      const initialState = BoardSize.SMALL;

      const action: AnyAction = {
        type: 'SOME_ACTION',
        payload: 'some payload',
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(BoardSize.SMALL);
    });
  });

  describe('updates state correctly', () => {
    it('with SET_SIZE action', () => {
      const initialState = BoardSize.MEDIUM;

      const action: AnyAction = {
        type: 'SET_SIZE',
        payload: BoardSize.LARGE,
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(BoardSize.LARGE);
    });
  });
});
