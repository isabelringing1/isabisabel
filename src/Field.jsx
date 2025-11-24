import { useEffect, useRef } from "react";

export default function Field(props) {
  const { blades_per_row, blades_per_column } = props;
  const fieldRef = useRef(null);
  const bladesRef = useRef([]);

  const numBetween = (num, lower, higher) => num > lower && num < higher;

  useEffect(() => {
    const PUSH_RADIUS = 100;

    const VARIANCE = 60;

    const field = fieldRef.current;
    bladesRef.current = [];

    // Clear
    field.innerHTML = "";

    for (let i = 0; i < blades_per_column; i++) {
      for (let j = 0; j < blades_per_row; j++) {
        const blade = document.createElement("div");
        blade.className = "blade";

        var x = (j / blades_per_row) * window.innerWidth;
        var y = (i / blades_per_column) * window.innerHeight;
        x += Math.random() * VARIANCE - VARIANCE / 2;
        y += Math.random() * VARIANCE - VARIANCE / 2;

        blade.style.left = x + "px";
        blade.style.top = y + "px";
        blade.style.zIndex = i * blades_per_column + j;

        if (numBetween(j, 10 - i / 2, 30 - i / 2) && numBetween(i, 0, 50)) {
          if (Math.random() * 10 < 8) {
            blade.className += " style-1";
          }
        }

        if (numBetween(j, 50 - i / 3, 60) && numBetween(i, 0, 50)) {
          if (Math.random() * 10 < 9) {
            blade.className += " style-2";
          }
        }

        const bladeObj = {
          el: blade,
          x,
          y,
          isPushed: false,
          idleSpeed: 0.0008 + Math.random() * 0.0012,
          idlePhase: Math.random() * Math.PI * 2,
        };

        bladesRef.current.push(bladeObj);
        field.appendChild(blade);
      }
    }

    // Mouse interaction
    function handleMouseMove(e) {
      const mx = e.clientX;
      const my = e.clientY;

      bladesRef.current.forEach((b) => {
        const dx = mx - b.x;
        const dy = my - b.y - 45; // bottom of blade
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PUSH_RADIUS) {
          var direction = dx > 0 ? 1 : 0;

          const angle = Math.atan2(dy, dx);
          const force = (PUSH_RADIUS - dist) / PUSH_RADIUS;
          const rot = (angle - (direction * Math.PI) / 2) * force * 0.4;
          b.isPushed = true;

          b.el.style.setProperty("--rot", `${rot}rad`);
        } else {
          b.isPushed = false;
        }
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    // Idle ripple (batched)
    let frame = 0;

    function animate(t) {
      const blades = bladesRef.current;

      const numBatches = 500;

      for (let i = 0; i < numBatches; i++) {
        for (var j = 0; j < blades.length; j++) {
          if (j % numBatches != i) {
            continue;
          }
          const b = blades[j];
          if (b.isPushed) continue;

          const idle = Math.sin(t * b.idleSpeed + b.idlePhase) * 0.12;
          b.el.style.setProperty("--rot", `${idle}rad`);
        }
      }

      frame = (frame + 1) % Math.ceil(numBatches);

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="grass-field" ref={fieldRef}></div>;
}
