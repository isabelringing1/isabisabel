import { useState } from "react";
import Field from "./Field";
import Title from "./Title";
import Item from "./Item";

import "./App.css";

function App() {
  const BLADES_PER_ROW = 50;
  const BLADES_PER_COLUMN = 40;

  function getZIndex(x, y) {
    var xIndex = (x / window.innerWidth) * BLADES_PER_ROW;
    var yIndex = (y / window.innerHeight) * BLADES_PER_COLUMN;

    var zIndex = yIndex * BLADES_PER_COLUMN + xIndex;
    console.log("Z index is " + zIndex);
    return zIndex;
  }

  return (
    <div className="content">
      <Field
        blades_per_row={BLADES_PER_ROW}
        blades_per_column={BLADES_PER_COLUMN}
      />
      <Title />
      <Item getZIndex={getZIndex} />
    </div>
  );
}

export default App;
