import reducer, { ActionCreator } from './size';
import { AnyAction } from 'redux';
import { State } from '@/reducer';
import { getSize } from './selectors';
import { BoardSize, SpeedType, FillType } from '@/constants';

describe('getSize selector', () => {
  it('returns correct state', () => {
    const state: State = {
      game: {
        isPlaying: false,
        model: [[]],
        size: BoardSize.LARGE,
        speed: SpeedType.MEDIUM,
        fill: FillType.MEDIUM,
      },
      user: { userData: null },
    };

    expect(getSize(state)).toEqual(BoardSize.LARGE);
  });
});

describe('action creator', () => {
  describe('SET_SIZE returns correct action', () => {
    it('size small', () => {
      const size = BoardSize.SMALL;

      const action = ActionCreator.SET_SIZE(size);

      expect(action.type).toEqual('SET_SIZE');
      expect(action.payload).toEqual(size);
    });
  });
});

describe('reducer', () => {
  describe('returns correct state', () => {
    it('with no state placed', () => {
      const action: AnyAction = {
        type: 'SET_SIZE',
        payload: BoardSize.LARGE,
      };

      const state = reducer(undefined, action);
      expect(state).toEqual(BoardSize.LARGE);
    });
  });

  describe('updates state correctly', () => {
    it('with SET_SIZE action', () => {
      const initialState = BoardSize.MEDIUM;

      const action: AnyAction = {
        type: 'SET_SIZE',
        payload: BoardSize.LARGE,
      };

      const state = reducer(initialState, action);
      expect(state).toEqual(BoardSize.LARGE);
    });
  });
});