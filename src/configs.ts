import { BoardSize } from '@/reducer/game/size';
import { SpeedType } from '@/reducer/game/speed';
import { FillType } from '@/reducer/game/fill';

export interface GameOptionsType {
  boardSizes: BoardSize[];
  speedTypes: SpeedType[];
  fillTypes: FillType[];
}

export interface gamePropsType {
  boardSize: BoardSize;
  speed: SpeedType;
  fill: FillType;
  autoplay: boolean;
}

export const gameOptions = {
  boardSizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
  speedTypes: [SpeedType.SLOW, SpeedType.MEDIUM, SpeedType.FAST],
  fillTypes: [FillType.LOW, FillType.MEDIUM, FillType.HIGH],
};
