import reducer, { ActionCreator } from './';
import { AnyAction } from 'redux';
import { FillType } from '@/constants';

describe('action creator', () => {
  describe('SET_FILL returns correct action', () => {
    it('fill high', () => {
      const fill = FillType.HIGH;
      const action = ActionCreator.setFill(fill);

      expect(action.type).toEqual('SET_FILL');
      expect(action.payload).toEqual(fill);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action: AnyAction = {
        type: 'SET_FILL',
        payload: FillType.HIGH,
      };

      const state = reducer(undefined, action);
      expect(state).toEqual(FillType.HIGH);
    });

    it('with unknown action placed', () => {
      const initialState = FillType.HIGH;

      const action: AnyAction = {
        type: 'SOME_ACTION',
        payload: 'some payload',
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('updates state correctly', () => {
    it('with SET_FILL action', () => {
      const initialState = FillType.MEDIUM;

      const action: AnyAction = {
        type: 'SET_FILL',
        payload: FillType.LOW,
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(FillType.LOW);
    });
  });
});
