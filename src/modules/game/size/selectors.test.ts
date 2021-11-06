import { State } from '@/reducer';
import { getSize, BoardSize } from '.';
import { FillType } from '@/modules/game/fill';
import { SpeedType } from '@/modules/game/speed';

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
