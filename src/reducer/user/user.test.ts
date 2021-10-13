import reducer, { ActionCreator } from './user';
import { Action, AnyAction } from 'redux';

describe('action creator', () => {
  describe('SET_USER returns correct action', () => {
    it('user "Andrey"', () => {
      const user = 'Andrey';

      const action = ActionCreator.SET_USER(user);

      expect(action.type).toEqual('SET_USER');
      expect(action.payload).toEqual('Andrey');
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action: AnyAction = {
        type: 'SET_USER',
        payload: 'some user',
      };

      const state = reducer(undefined, action);
      expect(state.user).toEqual('some user');
    });
  });

  describe('updates state correctly', () => {
    it('with SET_USER action', () => {
      const initialState = {
        user: '',
      };

      const action: AnyAction = {
        type: 'SET_USER',
        payload: 'Andrey',
      };

      const state = reducer(initialState, action);
      expect(state.user).toEqual('Andrey');
    });
  });

  describe('updates state correctly', () => {
    it('with RESET_USER action', () => {
      const initialState = {
        user: 'Andrey',
      };

      const action: Action = {
        type: 'RESET_USER',
      };

      const state = reducer(initialState, action);
      expect(state.user).toBeNull();
    });
  });
});
