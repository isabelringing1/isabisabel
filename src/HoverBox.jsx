export default function Hoverbox(props) {
  const { data } = props;

  return (
    <div className="hoverbox" style={{ left: data.x, top: data.y }}>
      <div className="hoverbox-title">{data.item.title}</div>
      <div className="hoverbox-gif-div">
        <img
          className="hoverbox-gif"
          src={window.location.origin + data.item.gif}
        />
      </div>
      <div className="hoverbox-desc">{data.item.desc}</div>

      <div className="hoverbox-tail"></div>
    </div>
  );
}
