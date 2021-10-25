import { State } from '@/reducer';
import { getSpeed } from './';
import { BoardSize, SpeedType, FillType } from '@/constants';

describe('getSpeed selector', () => {
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

    expect(getSpeed(state)).toEqual(SpeedType.MEDIUM);
  });
});
