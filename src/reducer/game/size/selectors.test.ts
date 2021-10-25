import { State } from '@/reducer';
import { getSize } from './';
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
