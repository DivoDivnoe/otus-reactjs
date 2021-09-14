import { Binary, SizeProps } from '@/components/App/App';

export enum CellState {
  DEAD = 'dead',
  ALIVE = 'alive',
}

export enum SpeedType {
  FAST = 'fast',
  MEDIUM = 'medium',
  SLOW = 'slow',
}

export enum FillType {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum BoardSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

interface CellStateValuetype {
  [CellState.DEAD]: Binary;
  [CellState.ALIVE]: Binary;
}

interface SpeedValueType {
  [SpeedType.FAST]: number;
  [SpeedType.MEDIUM]: number;
  [SpeedType.SLOW]: number;
}

interface BoardSizeValueType {
  [BoardSize.LARGE]: SizeProps;
  [BoardSize.MEDIUM]: SizeProps;
  [BoardSize.SMALL]: SizeProps;
}

export const CellStateValue: CellStateValuetype = {
  [CellState.DEAD]: 0,
  [CellState.ALIVE]: 1,
};

export const BoardSizeValue: BoardSizeValueType = {
  [BoardSize.LARGE]: { width: 100, height: 80 },
  [BoardSize.MEDIUM]: { width: 70, height: 50 },
  [BoardSize.SMALL]: { width: 150, height: 30 },
};

// frames per second
export const SpeedValue: SpeedValueType = {
  [SpeedType.FAST]: 15,
  [SpeedType.MEDIUM]: 10,
  [SpeedType.SLOW]: 5,
};
