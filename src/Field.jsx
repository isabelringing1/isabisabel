import { useEffect, useRef } from "react";

export default function Field() {
  const fieldRef = useRef(null);
  const bladesRef = useRef([]);

  useEffect(() => {
    const PUSH_RADIUS = 100;
    const BATCH_SIZE = 60; // blades updated per frame
    const BLADES_PER_ROW = 60;
    const BLADES_PER_COLUMN = 50;
    const VARIANCE = 70;

    const field = fieldRef.current;
    bladesRef.current = [];

    // Clear
    field.innerHTML = "";

    for (let i = 0; i < BLADES_PER_COLUMN; i++) {
      for (let j = 0; j < BLADES_PER_ROW; j++) {
        const blade = document.createElement("div");
        blade.className = "blade";

        var x = (j / BLADES_PER_ROW) * window.innerWidth;
        var y = (i / BLADES_PER_COLUMN) * window.innerHeight;
        x += Math.random() * VARIANCE - VARIANCE / 2;
        y += Math.random() * VARIANCE - VARIANCE / 2;

        blade.style.left = x + "px";
        blade.style.top = y + "px";
        blade.style.zIndex = i * BLADES_PER_COLUMN + j;

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

      const start = frame * BATCH_SIZE;
      const end = start + BATCH_SIZE;

      var index = 0;

      for (let i = 0; i < 3; i++) {
        for (var j = 0; j < blades.length; j++) {
          if (j % 3 != i) {
            continue;
          }
          const b = blades[j];
          if (b.isPushed) continue;

          const idle = Math.sin(t * b.idleSpeed + b.idlePhase) * 0.12;
          b.el.style.setProperty("--rot", `${idle}rad`);
        }
      }

      frame = (frame + 1) % Math.ceil(blades.length / BATCH_SIZE);

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="grass-field" ref={fieldRef}></div>;
}
