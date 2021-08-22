import React, { Component, ReactElement } from 'react';
import Field from '@/components/Field/Field';

type Binary = 0 | 1;
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
  size?: SizeProps;
}

export interface State {
  model: Model;
}

export type ClickCellType = (coords: Coords) => void;

const createZeroMatrix = (size: SizeProps): Model => {
  return Array.from({ length: size.height }, () => {
    return Array.from({ length: size.width }, () => 0);
  });
};

const gameSize: SizeProps = {
  width: 40,
  height: 25,
};

class App extends Component<AppProps, State> {
  size: SizeProps = this.props.size || gameSize;

  state = {
    model: createZeroMatrix(this.size),
  };

  render(): ReactElement {
    return <Field model={this.state.model} clickHandler={this.onClick} />;
  }

  onClick: ClickCellType = (coords) => {
    const { x, y } = coords;
    const model = this.state.model.map((row) => row.slice());
    model[y][x] = model[y][x] ? 0 : 1;

    this.setState({ model });
  };
}

export default App;
