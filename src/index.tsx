import React, { FC, Component, ReactNode } from "react";
import ReactDOM from "react-dom";

interface FullNameProps {
  name: string;
  surname: string;
  showSurname?: boolean;
}

const FullName: FC<FullNameProps> = (props) => (
  <h2>
    {props.name} {props.showSurname && props.surname}
  </h2>
);

export class FullNameClass extends Component<FullNameProps> {
  render(): ReactNode {
    return (
      <h2>
        {this.props.name} {this.props.showSurname && this.props.surname}
      </h2>
    );
  }
}

const HelloWorld = () => {
  return (
    <div>
      <h1>
        Hello, <FullName name="Andrey" surname="Ivanov" />
      </h1>
    </div>
  );
};

ReactDOM.render(<HelloWorld />, document.querySelector("#root"));
