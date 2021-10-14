import { applyMiddleware, createStore, AnyAction } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { State } from '@/reducer';
import reducer, { Operation } from '@/reducer';
import { BoardSize, SpeedType, FillType } from '@/constants';
import { APP_KEY } from './constants';
import { ActionCreator as UserActionCreator } from '@/reducer/user/user';
import { ActionCreator as IsPlayingActionCreator } from '@/reducer/game/isPlaying/isPlaying';

class LocalStorageMock {
  store: Record<string, unknown> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: unknown) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

describe('Operation', () => {
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

describe('Operation', () => {
  describe('getStateFromLocalStorage method works correctly', () => {
    it('if no state in local storage', () => {
      Object.defineProperty(window, 'localStorage', {
        value: new LocalStorageMock(),
      });

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
      Object.defineProperty(window, 'localStorage', {
        value: new LocalStorageMock(),
      });

      const store = createStore(
        reducer,
        applyMiddleware(thunk as ThunkMiddleware<State, AnyAction>)
      );

      store.dispatch(UserActionCreator.SET_USER('Andrey'));
      store.dispatch(Operation.saveStateToLocalStorage());

      store.dispatch(IsPlayingActionCreator.START_PLAYING());
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
});
