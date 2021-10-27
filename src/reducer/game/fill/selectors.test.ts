import { getFill, FillType } from './';
import { State } from '@/reducer';
import { BoardSize } from '@/reducer/game/size';
import { SpeedType } from '@/reducer/game/speed';

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
