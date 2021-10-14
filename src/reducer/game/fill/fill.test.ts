import reducer, { ActionCreator } from './fill';
import { AnyAction } from 'redux';
import { getFill } from './selectors';
import { State } from '@/reducer';
import { BoardSize, SpeedType, FillType } from '@/constants';

describe('getFill selector', () => {
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

    expect(getFill(state)).toEqual(FillType.MEDIUM);
  });
});

describe('action creator', () => {
  describe('SET_FILL returns correct action', () => {
    it('fill high', () => {
      const fill = FillType.HIGH;
      const action = ActionCreator.SET_FILL(fill);

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
