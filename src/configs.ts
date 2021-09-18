import { BoardSize, SpeedType, FillType } from '@/constants';
import { SizeProps } from '@/components/App/App';

export interface SpeedValueType {
  [SpeedType.FAST]: number;
  [SpeedType.MEDIUM]: number;
  [SpeedType.SLOW]: number;
}

export interface BoardSizeValueType {
  [BoardSize.LARGE]: SizeProps;
  [BoardSize.MEDIUM]: SizeProps;
  [BoardSize.SMALL]: SizeProps;
}

export interface BoardFillPercentageType {
  [FillType.HIGH]: number;
  [FillType.MEDIUM]: number;
  [FillType.LOW]: number;
}

export interface GameOptionsType {
  boardSizes: BoardSize[];
  speedTypes: SpeedType[];
  fillTypes: FillType[];
}

export interface gamePropsType {
  boardSize: BoardSize;
  speed: SpeedType;
  fill: FillType;
}

export const BoardSizeValue: BoardSizeValueType = {
  [BoardSize.LARGE]: { width: 100, height: 80 },
  [BoardSize.MEDIUM]: { width: 70, height: 50 },
  [BoardSize.SMALL]: { width: 50, height: 30 },
};

// timeout interval ms
export const SpeedValue: SpeedValueType = {
  [SpeedType.FAST]: 30,
  [SpeedType.MEDIUM]: 150,
  [SpeedType.SLOW]: 500,
};

export const BoardFillPercentage: BoardFillPercentageType = {
  [FillType.HIGH]: 0.3,
  [FillType.MEDIUM]: 0.2,
  [FillType.LOW]: 0.1,
};

export const gameOptions = {
  boardSizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
  speedTypes: [SpeedType.SLOW, SpeedType.MEDIUM, SpeedType.FAST],
  fillTypes: [FillType.LOW, FillType.MEDIUM, FillType.HIGH],
};

export const gameProps = {
  boardSize: BoardSize.MEDIUM,
  speed: SpeedType.MEDIUM,
  fill: FillType.MEDIUM,
};
