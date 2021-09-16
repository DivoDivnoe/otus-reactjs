import _ from 'underscore';
import React, { Component, ReactNode } from 'react';
import Field from '@/components/Field/Field';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { fetchUser } from '@/api/api';
import { CellState, SpeedType, BoardSize, FillType } from '@/constants';
import { CellStateValue, gameOptions, BoardSizeValue } from '@/configs';
import Bar from '@/components/Bar/Bar';

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
}

export type User = Record<string, unknown> | null;

export interface State {
  model: Model;
  user: User | null;
}

export type ClickCellType = (coords: Coords) => void;

const getRandomState = (): Binary =>
  CellStateValue[Math.random() < 0.5 ? CellState.DEAD : CellState.ALIVE];

const createRandomMatrix = (size: SizeProps): Model => {
  return Array.from({ length: size.height }, () => {
    return Array.from({ length: size.width }, () => 0);
  });
};

const DEFAULT_GAME_SIZE_TYPE = BoardSize.MEDIUM;

class App extends Component<AppProps, State> {
  boardSize: BoardSize;
  userSessionTime: number;
  userSessionTimerId: number | null;
  _isMounted: boolean;

  constructor(props: AppProps) {
    super(props);

    this.boardSize = this.props.size || DEFAULT_GAME_SIZE_TYPE;

    this.state = {
      model: createRandomMatrix(BoardSizeValue[this.boardSize]),
      user: null,
    };

    this.userSessionTime = 0;
    this.userSessionTimerId = null;

    this._isMounted = false;

    this._onClick = this._onClick.bind(this);
  }

  render(): ReactNode {
    const { boardSizes, speedTypes, fillTypes } = gameOptions;

    return (
      <ErrorBoundary>
        <Field model={this.state.model} clickHandler={this._onClick} />
        <Bar
          sizes={boardSizes}
          speedTypes={speedTypes}
          fillTypes={fillTypes}
          changeSizeHandler={this._onChangeSize}
          changeSpeedHandler={this._onChangeSpeedType}
          changeFillType={this._onChangeFillType}
        />
      </ErrorBoundary>
    );
  }

  _onChangeSize = (sizeType: BoardSize): void => {
    if (this.boardSize === sizeType) return;

    this.boardSize = sizeType;

    const size = BoardSizeValue[sizeType];
    const model = createRandomMatrix(size);

    this.setState({ model });
  };

  _onChangeSpeedType = (speedType: SpeedType): void => {
    console.log('change speed type', speedType);
  };

  _onChangeFillType = (fillPercentage: FillType) => {
    console.log('change percentage', fillPercentage);
  };

  async componentDidMount(): Promise<null> {
    this._isMounted = true;

    const userData = await fetchUser();

    if (userData && this._isMounted) {
      this.setState({ user: userData });

      this.userSessionTimerId = window.setInterval(() => {
        this.userSessionTime++;
      }, 1000);
    }

    return null;
  }

  shouldComponentUpdate(nextProps: AppProps, nextState: State): boolean {
    if (_.isEqual(this.state.model, nextState.model)) {
      return false;
    }

    return true;
  }

  _onClick(coords: Coords): void {
    const { x, y } = coords;
    const model = this.state.model.map((row) => row.slice());
    model[y][x] = model[y][x] ? 0 : 1;

    this.setState({ model });
  }

  // Сбрасываю model, если кликнули на 10 клеток
  componentDidUpdate(): void {
    const clickedItemsAmount = this.state.model.reduce((acc1, row) => {
      return acc1 + row.reduce((acc2, cur) => acc2 + cur, Number(0));
    }, 0);

    if (clickedItemsAmount >= 10) {
      this.setState({
        model: createRandomMatrix(BoardSizeValue[this.boardSize]),
      });
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false;
    this.userSessionTimerId && window.clearInterval(this.userSessionTimerId);
  }
}

export default App;
