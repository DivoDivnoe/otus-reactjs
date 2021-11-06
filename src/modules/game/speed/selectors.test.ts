import { State } from '@/reducer';
import { getSpeed, SpeedType } from '.';
import { BoardSize } from '@/modules/game/size';
import { FillType } from '@/modules/game/fill';

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
