import { Binary } from '@/components/App/App';

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

export enum Controls {
  PLAY = 'play',
  PAUSE = 'pause',
  CLEAR = 'clear',
}

export interface CellStateType {
  DEAD: Binary;
  ALIVE: Binary;
}

export const CellState: CellStateType = {
  DEAD: 0,
  ALIVE: 1,
};
