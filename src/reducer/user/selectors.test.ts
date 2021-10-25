import { State } from '@/reducer';
import { getUser } from './';
import { BoardSize, SpeedType, FillType } from '@/constants';

describe('getUser selector', () => {
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

    expect(getUser(state)).toEqual('Andrey');
  });
});
