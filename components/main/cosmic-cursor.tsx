"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT = 10;

type TrailPoint = {
  x: number;
  y: number;
};

export const CosmicCursor = () => {
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const canAnimate =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canAnimate) {
      return;
    }

    let animationFrame = 0;
    let isVisible = false;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trail: TrailPoint[] = Array.from({ length: TRAIL_COUNT }, () => ({
      x: pointer.x,
      y: pointer.y,
    }));

    const setTrailVisibility = (opacity: string) => {
      trailRefs.current.forEach((node) => {
        if (node) {
          node.style.opacity = opacity;
        }
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!isVisible) {
        isVisible = true;
        setTrailVisibility("1");
      }
    };

    const handlePointerLeave = () => {
      isVisible = false;
      setTrailVisibility("0");
    };

    const animate = () => {
      let nextX = pointer.x;
      let nextY = pointer.y;

      trail.forEach((point, index) => {
        point.x += (nextX - point.x) * (index === 0 ? 0.55 : 0.36);
        point.y += (nextY - point.y) * (index === 0 ? 0.55 : 0.36);

        nextX = point.x;
        nextY = point.y;

        const node = trailRefs.current[index];

        if (node) {
          const scale = 1 - index * 0.065;
          node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        }
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      {Array.from({ length: TRAIL_COUNT }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          className="absolute left-0 top-0 h-2 w-2 rounded-full bg-[#b49bff] opacity-0 shadow-[0_0_18px_rgba(180,155,255,0.9)] will-change-transform"
          style={{
            width: `${8 - index * 0.35}px`,
            height: `${8 - index * 0.35}px`,
            transition: "opacity 180ms ease",
            filter: index < 3 ? "drop-shadow(0 0 10px #00d8ff)" : undefined,
          }}
        />
      ))}
    </div>
  );
};
