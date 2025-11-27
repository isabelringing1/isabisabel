import { useState } from "react";
import Field from "./Field";
import Title from "./Title";
import Item from "./Item";
import Hoverbox from "./HoverBox";
import Switch from "@mui/material/Switch";

import grassBg from "/grass_bg.jpg";
import itemsData from "./data/items.json";

import "./App.css";

function App() {
  const MAX_BLADES_PER_ROW = 50;
  const MAX_BLADES_PER_COLUMN = 40;

  const [hoverData, setHoverData] = useState(null);
  const [grassMotion, setGrassMotion] = useState(true);
  const [whoHovered, setWhoHovered] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  var blades_per_row = Math.floor(
    Math.min(MAX_BLADES_PER_ROW, window.innerWidth / 35)
  );
  var blades_per_column = Math.floor(
    Math.min(MAX_BLADES_PER_COLUMN, window.innerHeight / 24)
  );

  function getZIndex(x, y) {
    const xIndex = (x / window.innerWidth) * blades_per_row;
    const yIndex = (y / window.innerHeight) * blades_per_column;

    const j = Math.floor(xIndex);
    const i = Math.floor(yIndex);

    // Use the same indexing logic as when creating
    const zIndex = i * blades_per_column + j;

    return zIndex;
  }

  return (
    <div className="content">
      <img id="bg" src={grassBg} />
      <Field
        blades_per_row={blades_per_row}
        blades_per_column={blades_per_column}
        grassMotion={grassMotion}
      />
      <Title />
      {itemsData.items.map((item, i) => {
        return (
          <Item
            item={item}
            getZIndex={getZIndex}
            key={"item-" + i}
            setHoverData={setHoverData}
          />
        );
      })}
      {hoverData && <Hoverbox data={hoverData} />}
      <div className="text grass-off">
        grass is {grassMotion ? "on" : "off"}{" "}
        <Switch
          checked={grassMotion}
          onChange={() => {
            setGrassMotion(!grassMotion);
          }}
        />
      </div>
      <div
        className={"text who " + (whoHovered ? "text-highlight" : "")}
        onMouseOver={() => {
          setWhoHovered(true);
        }}
        onMouseOut={() => {
          setWhoHovered(false);
        }}
        onClick={() => {
          setShowAbout(true);
        }}
      >
        who?
      </div>
    </div>
  );
}

export default App;
