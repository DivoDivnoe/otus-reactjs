import { BoardSize } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';
import { FillType } from '@/modules/game/fill';

export interface GameOptionsType {
  sizes: BoardSize[];
  speedTypes: SpeedType[];
  fillTypes: FillType[];
}

export interface gamePropsType {
  size: BoardSize;
  speed: SpeedType;
  fill: FillType;
}

export const gameOptions: GameOptionsType = {
  sizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
  speedTypes: [SpeedType.SLOW, SpeedType.MEDIUM, SpeedType.FAST],
  fillTypes: [FillType.LOW, FillType.MEDIUM, FillType.HIGH],
};

export enum Controls {
  PLAY = 'play',
  PAUSE = 'pause',
  CLEAR = 'clear',
}
