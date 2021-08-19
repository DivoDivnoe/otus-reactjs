import React, { Component, ReactElement } from 'react';
import Field from '@/components/Field/Field';

type Binary = 0 | 1;
export type Model = Array<Array<Binary>>;

interface SizeProps {
  width: number;
  height: number;
}

export interface Coords {
  x: number;
  y: number;
}

export interface Props {
  size?: SizeProps;
}

export interface State {
  model: Model;
}

const gameSize: SizeProps = {
  width: 40,
  height: 25,
};

export type ClickCellType = (coords: Coords) => void;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const size: SizeProps = props.size || gameSize;

    this.state = {
      model: App.buildModel(size),
    };
  }

  render(): ReactElement {
    return <Field model={this.state.model} clickHandler={this.onClick} />;
  }

  onClick: ClickCellType = (coords) => {
    const { x, y } = coords;
    const { model } = this.state;
    model[y][x] = model[y][x] ? 0 : 1;
    console.log('model', JSON.stringify(this.state.model));

    this.setState({ model });
  };

  static buildModel(size: SizeProps): Model {
    return Array.from({ length: size.height }, () => {
      return Array.from({ length: size.width }, () => 0);
    });
  }
}

export default App;
