"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense, useState } from "react";
import type { Points as PointsType, Mesh as MeshType } from "three";
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

export const ShootingStar = ({ color = "#ffffff" }) => {
  const [star, setStar] = useState(() => resetStar());

  function resetStar() {
    const angle = Math.PI * 1.25 + (Math.random() - 0.5) * 0.4; // Diagonal down-left trajectory
    const length = 3.5 + Math.random() * 2.0;
    
    // Spread starting coordinates
    const startX = 1.0 + Math.random() * 2.0;
    const startY = 1.0 + Math.random() * 2.0;
    const startZ = -0.5 + Math.random() * 1.0;
    
    const speed = 0.6 + Math.random() * 0.9;
    const size = 0.002 + Math.random() * 0.003;
    const delay = Math.random() * 10; // Sparkle timing delay

    return {
      startX,
      startY,
      startZ,
      dx: Math.cos(angle) * length,
      dy: Math.sin(angle) * length,
      speed,
      size,
      angle,
      progress: -delay,
    };
  }

  useFrame((_state, delta) => {
    setStar((prev) => {
      const nextProgress = prev.progress + delta * prev.speed;
      if (nextProgress > 1.0) {
        return resetStar();
      }
      return { ...prev, progress: nextProgress };
    });
  });

  const { currentPos, opacity } = useMemo(() => {
    if (star.progress < 0) {
      return { currentPos: new THREE.Vector3(999, 999, 999), opacity: 0 };
    }

    const x = star.startX + star.dx * star.progress;
    const y = star.startY + star.dy * star.progress;
    const z = star.startZ;

    // Organic fade-in and fade-out envelope
    let op = 0;
    if (star.progress < 0.2) {
      op = star.progress / 0.2; // Fade-in
    } else if (star.progress > 0.8) {
      op = (1.0 - star.progress) / 0.2; // Fade-out
    } else {
      op = 1.0;
    }

    return {
      currentPos: new THREE.Vector3(x, y, z),
      opacity: op * 0.7,
    };
  }, [star]);

  return (
    <mesh 
      position={currentPos} 
      rotation={[0, 0, star.angle + Math.PI / 2]}
    >
      {/* Elongated cylinder creates a highly realistic visual light trail */}
      <cylinderGeometry args={[0, star.size, 0.25, 6]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={opacity} 
        blending={THREE.AdditiveBlending}
      />
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
  <div className="w-full h-auto fixed inset-0 -z-10 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <fog attach="fog" args={["#030014", 0.5, 2.5]} />
      <Suspense fallback={null}>
        <NebulaCloud />
        <StarBackground />
        <ShootingStar color="#ffffff" />
        <ShootingStar color="#b49bff" />
        <ShootingStar color="#e59cff" />
        <ShootingStar color="#ffffff" />
        <ShootingStar color="#7042f8" />
        <ShootingStar color="#b49bff" />
      </Suspense>
    </Canvas>
  </div>
);
