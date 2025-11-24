import { useState, useEffect, useRef } from "react";

import w from "/w.png";

function Item(props) {
  const { getZIndex } = props;
  const [posTop, setPosTop] = useState(null);
  const [posLeft, setPosLeft] = useState(0);

  const dragTop = useRef(null);
  const dragLeft = useState(null);

  const startDrag = (e) => {
    dragTop.current = e.clientY;
    dragLeft.current = e.clientX;
    document.onmouseup = closeDragElement;
    document.onmousemove = itemDragged;
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const itemDragged = (e) => {
    e.preventDefault();
    // calculate the new cursor position:
    var leftDelta = dragLeft.current - e.clientX;
    var topDelta = dragTop.current - e.clientY;

    // set the element's new position:
    setPosTop(posTop - topDelta);
    setPosLeft(posLeft - leftDelta);
  };

  var itemStyle = {
    top: posTop + "px",
    left: posLeft + "px",
    zIndex: getZIndex(posTop, posLeft),
  };

  return (
    <div className="item" onMouseDown={startDrag} style={itemStyle}>
      <img className="item-img" src={w} />
    </div>
  );
}

export default Item;
