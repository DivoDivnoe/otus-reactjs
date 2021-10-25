import reducer, { ActionCreator } from './';
import { AnyAction } from 'redux';
import { Model } from '@/core';
import { BoardSize } from '@/constants';

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

  describe('resetModel returns correct action', () => {
    it('size small', () => {
      const size = BoardSize.SMALL;
      const model = Array.from({ length: 30 }, () =>
        Array.from({ length: 50 }, () => 0)
      );

      const action = ActionCreator.resetModel(size);

      expect(action.type).toEqual('model/resetModel');
      expect(action.payload).toEqual(BoardSize.SMALL);
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

    it('with resetModel action', () => {
      const initialState: Model = [
        [1, 1],
        [1, 1],
      ];

      const action = ActionCreator.resetModel(BoardSize.SMALL);
      const expectedState = Array.from({ length: 30 }, () =>
        Array.from({ length: 50 }, () => 0)
      );

      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
});
