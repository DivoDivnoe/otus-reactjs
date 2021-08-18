import React from "react";
import { render } from "react-dom";

import Field from "./components/Field";
import { gameSize } from "./model";

render(<Field size={gameSize} />, document.querySelector("#root"));
