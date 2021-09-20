import _ from 'underscore';
import React, { PureComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import Field from '@/components/Field/Field';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { SpeedType, BoardSize, FillType, CellState } from '@/constants';
import {
  gameOptions,
  BoardSizeValue,
  gameProps,
  BoardFillPercentage,
  SpeedValue,
} from '@/configs';
import Bar from '@/components/Bar/Bar';
import StartPopup from '@/components/StartPopup/StartPopup';
import { getRandomValuesArr, getZeroMatrix } from '@/utils/utils';
import { getNextGenMatrix } from '@/core/core';

export type Binary = 0 | 1;
export type Model = Binary[][];

export interface SizeProps {
  width: number;
  height: number;
}

export interface Coords {
  x: number;
  y: number;
}

export interface AppProps {
  size?: BoardSize;
  speed?: SpeedType;
  fill?: FillType;
}

export interface State {
  model: Model;
  user: string | null;
  speed: SpeedType;
  isPlaying: boolean;
}

export type ClickCellType = (coords: Coords) => void;

export const getRandomMatrix = (size: SizeProps, fill: number): Model => {
  const { width, height } = size;
  const maxValue = width * height;
  const amount = Math.round(fill * maxValue);
  const randomIndexes = getRandomValuesArr(maxValue, amount);

  return Array.from({ length: height }, (_, rowIndex) => {
    return Array.from({ length: width }, (_, columnIndex) => {
      return randomIndexes.includes(rowIndex * width + columnIndex)
        ? CellState.ALIVE
        : CellState.DEAD;
    });
  });
};

const createRandomMatrix = (sizeType: BoardSize, fillType: FillType): Model => {
  const size = BoardSizeValue[sizeType];
  const fill = BoardFillPercentage[fillType];

  return getRandomMatrix(size, fill);
};

const getNewSizeMatrix = (size: SizeProps, prevMatrix: Model): Model => {
  const { width, height } = size;

  return Array.from({ length: height }, (_, rowIndex) => {
    return Array.from({ length: width }, (_, columnIndex) => {
      const prevItem = prevMatrix[rowIndex]?.[columnIndex];

      return prevItem === undefined ? CellState.DEAD : prevItem;
    });
  });
};

const createNewSizeMatrix = (sizeType: BoardSize, prevMatrix: Model): Model => {
  const size = BoardSizeValue[sizeType];

  return getNewSizeMatrix(size, prevMatrix);
};

const createZeroMatrix = (sizeType: BoardSize): Model => {
  const size = BoardSizeValue[sizeType];

  return getZeroMatrix(size) as Model;
};

const Title = styled.h1`
  color: #ffffff;
`;

class App extends PureComponent<AppProps, State> {
  boardSize = this.props.size || gameProps.boardSize;
  fill = this.props.fill || gameProps.fill;

  state = {
    model: createRandomMatrix(this.boardSize, this.fill),
    speed: this.props.speed || gameProps.speed,
    isPlaying: false,
    user: null,
  };

  _gameTimeoutId = -1;
  _isMounted = false;

  render(): ReactNode {
    const { boardSizes, speedTypes, fillTypes } = gameOptions;

    return (
      <ErrorBoundary>
        {this.state.user && <Title>Hello, {this.state.user}.</Title>}
        <Field
          size={this.boardSize}
          model={this.state.model}
          clickHandler={this._onClick}
        />
        <Bar
          sizes={boardSizes}
          speedTypes={speedTypes}
          fillTypes={fillTypes}
          size={this.boardSize}
          speed={this.state.speed}
          fill={this.fill}
          isPlaying={this.state.isPlaying}
          changeSizeHandler={this._onChangeSize}
          changeSpeedHandler={this._onChangeSpeedType}
          changeFillType={this._onChangeFillType}
          play={this._onClickPlay}
          pause={this._stop}
          clear={this._clear}
        />
        <StartPopup
          isVisible={!this.state.user}
          submitHandler={this._setUser}
        />
      </ErrorBoundary>
    );
  }

  async componentDidMount(): Promise<null> {
    this._isMounted = true;

    return null;
  }

  componentWillUnmount(): void {
    this._isMounted = false;
    this._stop();
  }

  _onChangeSize = (sizeType: BoardSize): void => {
    if (this.boardSize === sizeType) return;

    this.boardSize = sizeType;

    const model = createNewSizeMatrix(sizeType, this.state.model);
    this.setState({ model });
  };

  _onChangeSpeedType = (speed: SpeedType): void => {
    if (this.state.speed === speed) return;

    this.setState({ speed });
  };

  _onChangeFillType = (fill: FillType): void => {
    this.fill = fill;

    const model = createRandomMatrix(this.boardSize, this.fill);

    this._stop();
    this.setState({ model });
  };

  _onClick = (coords: Coords): void => {
    const { x, y } = coords;
    const model = this.state.model.map((row) => row.slice());
    model[y][x] = model[y][x] ? 0 : 1;

    this.setState({ model });
  };

  _start = (): void => {
    this._gameTimeoutId = window.setTimeout(() => {
      const model = getNextGenMatrix(this.state.model);

      this.setState({ model, isPlaying: true }, this._start);
    }, SpeedValue[this.state.speed]);
  };

  _onClickPlay = (): void => {
    if (this._gameTimeoutId > -1) return;

    this._start();
  };

  _stop = (): void => {
    if (this._gameTimeoutId === -1) return;

    window.clearTimeout(this._gameTimeoutId);
    this._gameTimeoutId = -1;

    this.setState({ isPlaying: false });
  };

  _restart = (): void => {
    this._stop();
    this._start();
  };

  _clear = (): void => {
    this._stop();

    const model = createZeroMatrix(this.boardSize);
    this.setState({ model });
  };

  _setUser = (name: string): void => {
    this.setState({ user: name });
  };
}

export default App;
