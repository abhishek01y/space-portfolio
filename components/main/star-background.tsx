"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import type { Points as PointsType, Mesh as MeshType } from "three";

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
  const ref1 = useRef<PointsType | null>(null);
  const ref2 = useRef<PointsType | null>(null);
  
  const sphere1 = useMemo(() => createStarField(4000, 1.2), []);
  const sphere2 = useMemo(() => createStarField(1500, 1.5), []);

  useFrame((_state, delta) => {
    if (ref1.current && ref2.current) {
      ref1.current.rotation.x -= delta / 10;
      ref1.current.rotation.y -= delta / 15;
      
      // Faster moving outer layer for parallax
      ref2.current.rotation.x -= delta / 5;
      ref2.current.rotation.y -= delta / 7;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref1} stride={3} positions={sphere1} frustumCulled {...props}>
        <PointMaterial transparent color="#fff" size={0.002} sizeAttenuation depthWrite={false} />
      </Points>
      <Points ref={ref2} stride={3} positions={sphere2} frustumCulled {...props}>
        <PointMaterial transparent color="#b49bff" size={0.003} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

export const ShootingStar = () => {
  const meshRef = useRef<MeshType>(null);
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.x -= delta * 2;
      meshRef.current.position.y -= delta * 2;
      
      if (meshRef.current.position.x < -2 || meshRef.current.position.y < -2) {
        meshRef.current.position.x = 2 + Math.random();
        meshRef.current.position.y = 2 + Math.random();
        meshRef.current.position.z = Math.random() * 2 - 1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 2, 0]}>
      <sphereGeometry args={[0.005, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
        <ShootingStar />
        <ShootingStar />
      </Suspense>
    </Canvas>
  </div>
);
