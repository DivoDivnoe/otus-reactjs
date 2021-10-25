import reducer, { ActionCreator } from './';

describe('action creator', () => {
  describe('setUser', () => {
    it('returns correct action', () => {
      const user = 'Andrey';

      const action = ActionCreator.setUser(user);

      expect(action.type).toEqual('user/setUser');
      expect(action.payload).toEqual('Andrey');
    });
  });

  describe('resetUser ', () => {
    it('returns correct action', () => {
      const action = ActionCreator.resetUser();

      expect(action.type).toEqual('user/resetUser');
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action = ActionCreator.setUser('some user');

      const state = reducer(undefined, action);
      expect(state.userData).toEqual('some user');
    });
  });

  describe('updates state correctly', () => {
    it('with setUser action', () => {
      const initialState = {
        userData: '',
      };

      const action = ActionCreator.setUser('Andrey');

      const state = reducer(initialState, action);
      expect(state.userData).toEqual('Andrey');
    });
  });

  describe('updates state correctly', () => {
    it('with resetUser action', () => {
      const initialState = {
        userData: 'Andrey',
      };

      const action = ActionCreator.resetUser();

      const state = reducer(initialState, action);
      expect(state.userData).toBeNull();
    });
  });
});
