"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
  Trail,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense, useState } from "react";
import type { Points as PointsType } from "three";
import * as THREE from "three";

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

export const Comet = ({ color = "#ffffff" }) => {
  const [comet, setComet] = useState(() => resetComet());

  function resetComet() {
    const angle = Math.PI * 1.25 + (Math.random() - 0.5) * 0.3; // Elegant diagonal trajectory
    const length = 4.5 + Math.random() * 2.0;
    
    // Starting positions (spread off-screen)
    const startX = 1.2 + Math.random() * 1.8;
    const startY = 1.2 + Math.random() * 1.8;
    const startZ = -0.5 + Math.random() * 1.0;
    
    const speed = 0.06 + Math.random() * 0.08; // Significantly slower, majestic orbital velocity (takes ~10-15s to cross)
    const size = 0.003 + Math.random() * 0.004;
    const delay = Math.random() * 12 + 4; // Comets are rare, special, and majestic (4-16s spawn spacing)

    return {
      startX,
      startY,
      startZ,
      dx: Math.cos(angle) * length,
      dy: Math.sin(angle) * length,
      speed,
      size,
      progress: -delay,
    };
  }

  useFrame((_state, delta) => {
    setComet((prev) => {
      const nextProgress = prev.progress + delta * prev.speed;
      if (nextProgress > 1.0) {
        return resetComet();
      }
      return { ...prev, progress: nextProgress };
    });
  });

  const { currentPos, opacity } = useMemo(() => {
    if (comet.progress < 0) {
      return { currentPos: new THREE.Vector3(999, 999, 999), opacity: 0 };
    }

    const x = comet.startX + comet.dx * comet.progress;
    const y = comet.startY + comet.dy * comet.progress;
    const z = comet.startZ;

    // Smoother fade-in and fade-out envelope
    let op = 0;
    if (comet.progress < 0.25) {
      op = comet.progress / 0.25; // 25% smooth fade-in
    } else if (comet.progress > 0.75) {
      op = (1.0 - comet.progress) / 0.25; // 25% smooth fade-out
    } else {
      op = 1.0;
    }

    return {
      currentPos: new THREE.Vector3(x, y, z),
      opacity: op,
    };
  }, [comet]);

  if (comet.progress < 0) return null;

  return (
    <Trail
      width={0.7}
      length={28} // Extended tail history for extremely long, elegant volumetric trail
      color={color}
      attenuation={(t) => t * t} // Tapered volumetric trail fade
    >
      <mesh position={currentPos}>
        <sphereGeometry args={[comet.size, 8, 8]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={opacity * 0.8} 
          blending={THREE.AdditiveBlending}
        />
        {/* Rich atmospheric glowing halo light */}
        <pointLight color={color} intensity={2.0} distance={1.5} />
      </mesh>
    </Trail>
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
  <div className="w-full h-auto fixed inset-0 -z-10 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <fog attach="fog" args={["#030014", 0.5, 2.5]} />
      <Suspense fallback={null}>
        <NebulaCloud />
        <StarBackground />
        <Comet color="#ffffff" />
        <Comet color="#b49bff" />
        <Comet color="#e59cff" />
        <Comet color="#ffffff" />
      </Suspense>
    </Canvas>
  </div>
);
