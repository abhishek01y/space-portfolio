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
  const ref3 = useRef<PointsType | null>(null);
  
  const sphere1 = useMemo(() => createStarField(4000, 1.2), []);
  const sphere2 = useMemo(() => createStarField(2000, 1.5), []);
  const sphere3 = useMemo(() => createStarField(1000, 1.8), []); // Extra deep layer

  useFrame((_state, delta) => {
    if (ref1.current && ref2.current && ref3.current) {
      ref1.current.rotation.x -= delta / 15;
      ref1.current.rotation.y -= delta / 20;
      
      ref2.current.rotation.x -= delta / 10;
      ref2.current.rotation.y -= delta / 12;

      ref3.current.rotation.x -= delta / 5;
      ref3.current.rotation.y -= delta / 7;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref1} stride={3} positions={sphere1} frustumCulled {...props}>
        <PointMaterial transparent color="#ffffff" size={0.0015} sizeAttenuation depthWrite={false} />
      </Points>
      <Points ref={ref2} stride={3} positions={sphere2} frustumCulled {...props}>
        <PointMaterial transparent color="#b49bff" size={0.002} sizeAttenuation depthWrite={false} opacity={0.6} />
      </Points>
      <Points ref={ref3} stride={3} positions={sphere3} frustumCulled {...props}>
        <PointMaterial transparent color="#e59cff" size={0.003} sizeAttenuation depthWrite={false} opacity={0.4} />
      </Points>
    </group>
  );
};

export const ShootingStar = ({ speed = 2, delay = 0, color = "#ffffff" }) => {
  const meshRef = useRef<MeshType>(null);
  const time = useRef(delay);
  
  useFrame((_state, delta) => {
    time.current -= delta;
    if (time.current > 0) return;

    if (meshRef.current) {
      meshRef.current.position.x -= delta * speed;
      meshRef.current.position.y -= delta * speed;
      
      if (meshRef.current.position.x < -3 || meshRef.current.position.y < -3) {
        meshRef.current.position.x = 2 + Math.random() * 2;
        meshRef.current.position.y = 2 + Math.random() * 2;
        meshRef.current.position.z = Math.random() * 2 - 1;
        time.current = Math.random() * 5 + 2; // Wait 2-7 seconds before next shot
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[5, 5, 0]}>
      <sphereGeometry args={[0.003, 8, 8]} />
      <meshBasicMaterial color={color} />
      <pointLight color={color} intensity={0.5} distance={0.5} />
    </mesh>
  );
};

export const NebulaCloud = () => {
  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial color="#7042f8" transparent opacity={0.05} blending={2} /> 
      {/* Subtle glow layer behind stars */}
    </mesh>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#110729] via-[#030014] to-[#010005]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <fog attach="fog" args={["#030014", 0.5, 2.5]} />
      <Suspense fallback={null}>
        <NebulaCloud />
        <StarBackground />
        <ShootingStar speed={1.5} delay={0} color="#ffffff" />
        <ShootingStar speed={2.5} delay={3} color="#b49bff" />
        <ShootingStar speed={3.0} delay={6} color="#e59cff" />
      </Suspense>
    </Canvas>
  </div>
);
