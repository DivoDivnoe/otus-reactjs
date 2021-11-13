import reducer, { ActionCreator } from '.';

describe('action creator', () => {
  describe('signin', () => {
    it('returns correct action', () => {
      const user = 'Andrey';

      const action = ActionCreator.signin(user);

      expect(action.type).toEqual('user/signin');
      expect(action.payload).toEqual('Andrey');
    });
  });

  describe('signout ', () => {
    it('returns correct action', () => {
      const action = ActionCreator.signout();

      expect(action.type).toEqual('user/signout');
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action = ActionCreator.signin('some user');

      const state = reducer(undefined, action);
      expect(state.userData).toEqual('some user');
    });
  });

  describe('updates state correctly', () => {
    it('with signin action', () => {
      const initialState = {
        userData: '',
      };

      const action = ActionCreator.signin('Andrey');

      const state = reducer(initialState, action);
      expect(state.userData).toEqual('Andrey');
    });

    it('with signout action', () => {
      const initialState = {
        userData: 'Andrey',
      };

      const action = ActionCreator.signout();

      const state = reducer(initialState, action);
      expect(state.userData).toBeNull();
    });
  });
});
