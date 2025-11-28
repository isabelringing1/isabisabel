import { useRef, useEffect, useState } from "react";

export default function Hoverbox(props) {
  const { data } = props;

  const [boxTop, setBoxTop] = useState(0);
  const [ready, setReady] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    if (!data) {
      return;
    }
    var t = data.y;
    console.log(divRef.current);
    if (data.flipped && divRef.current) {
      var height = divRef.current.getBoundingClientRect().height;

      t -= height;
      console.log(data.y, height, t);
    }
    setReady(true);
    setBoxTop(t);
  }, [data]);

  return (
    ready && (
      <div
        className="hoverbox"
        ref={divRef}
        style={{ opacity: data ? 1 : 0, left: data ? data.x : 0, top: boxTop }}
      >
        {data && (
          <div>
            <div className="hoverbox-title">{data.item.title}</div>
            <div className="hoverbox-gif-div">
              <img
                className="hoverbox-gif"
                src={window.location.origin + data.item.gif}
              />
            </div>
            <div className="hoverbox-desc">{data.item.desc}</div>

            <div
              className={"hoverbox-tail " + (data.flipped ? " flipped" : "")}
            ></div>
          </div>
        )}
      </div>
    )
  );
}
