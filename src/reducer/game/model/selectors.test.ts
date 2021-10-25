import { State } from '@/reducer';
import { getModel } from './';
import { BoardSize, SpeedType, FillType } from '@/constants';

describe('getModel selector', () => {
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

    expect(getModel(state)).toEqual([[]]);
  });
});
