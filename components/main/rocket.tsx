"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const RocketModel = () => {
  const rocketRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rocketRef.current) {
      // Slight movement based on mouse
      rocketRef.current.rotation.x = THREE.MathUtils.lerp(rocketRef.current.rotation.x, (state.pointer.y * Math.PI) / 10, 0.1);
      rocketRef.current.rotation.y = THREE.MathUtils.lerp(rocketRef.current.rotation.y, (state.pointer.x * Math.PI) / 10, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={rocketRef} rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={0.5}>
        {/* Rocket Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Rocket Nose */}
        <mesh position={[0, 1.5, 0]}>
          <coneGeometry args={[0.5, 1, 32]} />
          <meshStandardMaterial color="#b49bff" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Rocket Fins */}
        <mesh position={[0.6, -0.5, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <boxGeometry args={[0.2, 1, 0.1]} />
          <meshStandardMaterial color="#7042f8" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.6, -0.5, 0]} rotation={[0, 0, Math.PI / 8]}>
          <boxGeometry args={[0.2, 1, 0.1]} />
          <meshStandardMaterial color="#7042f8" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.5, 0.6]} rotation={[Math.PI / 8, 0, 0]}>
          <boxGeometry args={[0.1, 1, 0.2]} />
          <meshStandardMaterial color="#7042f8" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.5, -0.6]} rotation={[-Math.PI / 8, 0, 0]}>
          <boxGeometry args={[0.1, 1, 0.2]} />
          <meshStandardMaterial color="#7042f8" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Engine Exhaust/Fire */}
        <mesh position={[0, -1.2, 0]}>
          <coneGeometry args={[0.4, 0.8, 16]} />
          <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} />
        </mesh>
        
        {/* Engine Glow Particles */}
        <Sparkles position={[0, -2, 0]} scale={[1, 2, 1]} count={50} size={4} speed={2} opacity={1} color="#ff5500" />
      </group>
    </Float>
  );
};

export const RocketCanvas = () => {
  return (
    <div className="absolute right-0 top-1/4 w-[400px] h-[400px] z-[15] hidden lg:block pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#b49bff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#e59cff" />
        <RocketModel />
      </Canvas>
    </div>
  );
};
