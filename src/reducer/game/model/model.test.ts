import reducer, { ActionCreator } from './';
import { AnyAction } from 'redux';
import { Model } from '@/core';
import { BoardSize } from '@/constants';

describe('action creator', () => {
  describe('SET_MODEL returns correct action', () => {
    it('model [[0, 0], [0, 0]]', () => {
      const model: Model = [
        [0, 0],
        [0, 0],
      ];

      const action = ActionCreator.setModel(model);

      expect(action.type).toEqual('SET_MODEL');
      expect(action.payload).toStrictEqual(model);
    });
  });

  describe('RESET_MODEL returns correct action', () => {
    it('size small', () => {
      const size = BoardSize.SMALL;
      const model = Array.from({ length: 30 }, () =>
        Array.from({ length: 50 }, () => 0)
      );

      const action = ActionCreator.resetModel(size);

      expect(action.type).toEqual('SET_MODEL');
      expect(action.payload).toEqual(model);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action: AnyAction = {
        type: 'SET_MODEL',
        payload: [
          [0, 0],
          [1, 0],
        ],
      };

      const state = reducer(undefined, action);
      expect(state).toBe(action.payload);
    });

    it('with unknown action placed', () => {
      const initialState: Model = [
        [1, 1],
        [0, 1],
      ];

      const action: AnyAction = {
        type: 'SOME_ACTION',
        payload: 'some payload',
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('updates state correctly', () => {
    it('with SET_MODEL action', () => {
      const initialState: Model = [
        [1, 1],
        [1, 1],
      ];

      const action: AnyAction = {
        type: 'SET_MODEL',
        payload: [
          [0, 0],
          [0, 0],
        ],
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(action.payload);
    });
  });
});
