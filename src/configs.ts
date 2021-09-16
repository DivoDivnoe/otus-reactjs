import { BoardSize, SpeedType, CellState, FillType } from '@/constants';
import { Binary, SizeProps } from '@/components/App/App';

export interface CellStateValuetype {
  [CellState.DEAD]: Binary;
  [CellState.ALIVE]: Binary;
}

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

export const CellStateValue: CellStateValuetype = {
  [CellState.DEAD]: 0,
  [CellState.ALIVE]: 1,
};

export const BoardSizeValue: BoardSizeValueType = {
  [BoardSize.LARGE]: { width: 100, height: 80 },
  [BoardSize.MEDIUM]: { width: 70, height: 50 },
  [BoardSize.SMALL]: { width: 50, height: 30 },
};

// frames per second
export const SpeedValue: SpeedValueType = {
  [SpeedType.FAST]: 15,
  [SpeedType.MEDIUM]: 10,
  [SpeedType.SLOW]: 5,
};

export const BoardFillPercentage: BoardFillPercentageType = {
  [FillType.HIGH]: 30,
  [FillType.MEDIUM]: 20,
  [FillType.LOW]: 10,
};

export const gameOptions = {
  boardSizes: [BoardSize.SMALL, BoardSize.MEDIUM, BoardSize.LARGE],
  speedTypes: [SpeedType.SLOW, SpeedType.MEDIUM, SpeedType.FAST],
  fillTypes: [FillType.LOW, FillType.MEDIUM, FillType.HIGH],
};
