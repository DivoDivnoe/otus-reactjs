import { State } from '@/reducer';
import { getUserState, getGameState } from './selectors';
import { BoardSize } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';
import { FillType } from '@/modules/game/fill';

describe('getUserState selector', () => {
  it('returns correct state', () => {
    const state: State = {
      game: {
        isPlaying: false,
        model: [[]],
        size: BoardSize.LARGE,
        speed: SpeedType.MEDIUM,
        fill: FillType.MEDIUM,
      },
      user: { userData: 'Andrey' },
    };

    expect(getUserState(state)).toEqual({ userData: 'Andrey' });
  });
});

describe('getGameState selector', () => {
  it('returns correct state', () => {
    const state: State = {
      game: {
        isPlaying: false,
        model: [[]],
        size: BoardSize.LARGE,
        speed: SpeedType.MEDIUM,
        fill: FillType.MEDIUM,
      },
      user: { userData: 'Andrey' },
    };

    expect(getGameState(state)).toEqual({
      isPlaying: false,
      model: [[]],
      size: BoardSize.LARGE,
      speed: SpeedType.MEDIUM,
      fill: FillType.MEDIUM,
    });
  });
});
