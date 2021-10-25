import reducer, { ActionCreator } from './';
import { Action, AnyAction } from 'redux';

describe('action creator', () => {
  describe('SET_USER', () => {
    it('returns correct action', () => {
      const user = 'Andrey';

      const action = ActionCreator.setUser(user);

      expect(action.type).toEqual('SET_USER');
      expect(action.payload).toEqual('Andrey');
    });
  });

  describe('RESET_USER ', () => {
    it('returns correct action', () => {
      const action = ActionCreator.resetUser();

      expect(action.type).toEqual('RESET_USER');
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
      expect(state.userData).toEqual('some user');
    });

    it('with unknown action placed', () => {
      const initialState = { userData: 'Andrey' };

      const action: AnyAction = {
        type: 'SOME_ACTION',
        payload: 'some payload',
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('updates state correctly', () => {
    it('with SET_USER action', () => {
      const initialState = {
        userData: '',
      };

      const action: AnyAction = {
        type: 'SET_USER',
        payload: 'Andrey',
      };

      const state = reducer(initialState, action);
      expect(state.userData).toEqual('Andrey');
    });
  });

  describe('updates state correctly', () => {
    it('with RESET_USER action', () => {
      const initialState = {
        userData: 'Andrey',
      };

      const action: Action = {
        type: 'RESET_USER',
      };

      const state = reducer(initialState, action);
      expect(state.userData).toBeNull();
    });
  });
});
