import React, { FC } from "react";
import { render } from "react-dom";

const Cell: FC = () => <div>Hello, world!</div>;

render(<Cell />, document.querySelector("#root"));
