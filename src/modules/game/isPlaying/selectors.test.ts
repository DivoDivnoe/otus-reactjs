import { State } from '@/reducer';
import { getIsPlaying } from '.';
import { BoardSize } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';
import { FillType } from '@/modules/game/fill';

describe('getIsPlaying selector', () => {
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

    expect(getIsPlaying(state)).toEqual(false);
  });
});
