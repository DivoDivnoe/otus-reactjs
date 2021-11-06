import { applyMiddleware, createStore, AnyAction } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import reducer, { State, Operation } from './reducer';
import { APP_KEY } from './constants';
import { ActionCreator as UserActionCreator } from '@/modules/user';
import { ActionCreator as IsPlayingActionCreator } from '@/modules/game/isPlaying';
import { BoardSize } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';
import { FillType } from '@/modules/game/fill';

describe('Operation', () => {
  describe('getStateFromLocalStorage method works correctly', () => {
    it('if no state in local storage', () => {
      const store = createStore(
        reducer,
        applyMiddleware(thunk as ThunkMiddleware<State, AnyAction>)
      );

      const initialState: State = {
        game: {
          size: BoardSize.MEDIUM,
          speed: SpeedType.MEDIUM,
          fill: FillType.MEDIUM,
          isPlaying: false,
          model: [[]],
        },
        user: { userData: null },
      };

      store.dispatch(Operation.getStateFromLocalStorage());
      expect(store.getState()).toEqual(initialState);
    });

    it('if there is some state in local storage', () => {
      const store = createStore(
        reducer,
        applyMiddleware(thunk as ThunkMiddleware<State, AnyAction>)
      );

      store.dispatch(UserActionCreator.signin('Andrey'));
      store.dispatch(Operation.saveStateToLocalStorage());

      store.dispatch(IsPlayingActionCreator.startPlaying());
      store.dispatch(Operation.getStateFromLocalStorage());

      expect(store.getState()).toEqual({
        game: {
          size: BoardSize.MEDIUM,
          speed: SpeedType.MEDIUM,
          fill: FillType.MEDIUM,
          isPlaying: false,
          model: [[]],
        },
        user: { userData: 'Andrey' },
      });
    });
  });

  it('saveStateToLocalStorage method works correctly', () => {
    const mockFn = jest.fn();
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = mockFn;

    const store = createStore(
      reducer,
      applyMiddleware(thunk as ThunkMiddleware<State, AnyAction>)
    );
    store.dispatch(Operation.saveStateToLocalStorage());

    const initialState: State = {
      game: {
        size: BoardSize.MEDIUM,
        speed: SpeedType.MEDIUM,
        fill: FillType.MEDIUM,
        isPlaying: false,
        model: [[]],
      },
      user: { userData: null },
    };

    expect(mockFn).toHaveBeenCalledWith(APP_KEY, JSON.stringify(initialState));
  });
});
