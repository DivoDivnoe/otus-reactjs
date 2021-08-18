import React, { Component, ReactNode, ReactElement } from "react";
import Field from "../Field/Field";

type Binary = 0 | 1;
export type Model = Array<Array<Binary>>;

interface SizeProps {
  WIDTH: number;
  HEIGHT: number;
}

export interface Coords {
  x: number;
  y: number;
}

export interface Props {
  children?: ReactNode;
}

export interface State {
  model: Model;
}

const gameSize: SizeProps = {
  WIDTH: 40,
  HEIGHT: 25,
};

export type ClickCellType = (coords: Coords) => void;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      model: App.buildModel(gameSize),
    };
  }

  render(): ReactElement {
    return <Field model={this.state.model} clickHandler={this.onClick} />;
  }

  onClick: ClickCellType = (coords) => {
    const { x, y } = coords;
    const { model } = this.state;
    model[y][x] = model[y][x] ? 0 : 1;

    this.setState({ model });
  };

  static buildModel(size: SizeProps): Model {
    return Array.from({ length: size.HEIGHT }, () => {
      return Array.from({ length: size.WIDTH }, () => 0);
    });
  }
}

export default App;
