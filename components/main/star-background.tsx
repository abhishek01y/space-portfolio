"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

const createStarField = (count: number, radius: number) => {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    let lengthSquared = 0;

    while (lengthSquared === 0 || lengthSquared > 1) {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      lengthSquared = x * x + y * y + z * z;
    }

    const distance = Math.cbrt(Math.random()) * radius;
    const length = Math.sqrt(lengthSquared);
    const stride = i * 3;

    positions[stride] = (x / length) * distance;
    positions[stride + 1] = (y / length) * distance;
    positions[stride + 2] = (z / length) * distance;
  }

  return positions;
};

export const StarBackground = (props: PointsInstancesProps) => {
  const ref = useRef<PointsType | null>(null);
  const sphere = useMemo(() => createStarField(5000, 1.2), []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);
