import reducer, { ActionCreator } from './';
import { AnyAction } from 'redux';
import { FillType } from '@/constants';

describe('action creator', () => {
  describe('setFill returns correct action', () => {
    it('fill high', () => {
      const fill = FillType.HIGH;
      const action = ActionCreator.setFill(fill);

      expect(action.type).toEqual('fill/setFill');
      expect(action.payload).toEqual(fill);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action = ActionCreator.setFill(FillType.HIGH);

      const state = reducer(undefined, action);
      expect(state).toEqual(FillType.HIGH);
    });
  });

  describe('updates state correctly', () => {
    it('with setFill action', () => {
      const initialState = FillType.MEDIUM;
      const action = ActionCreator.setFill(FillType.LOW);

      const state = reducer(initialState, action);
      expect(state).toEqual(FillType.LOW);
    });
  });
});
