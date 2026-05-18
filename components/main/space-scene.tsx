"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import * as THREE from "three";

// --- Floating Satellite / Space Station (Refined & Subtle) ---
const FloatingSatellite = () => {
  const satRef = useRef<THREE.Group>(null);
  const blinkingLightRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (satRef.current) {
      // Extremely smooth orbital movement
      const t = state.clock.elapsedTime * 0.08;
      satRef.current.position.x = Math.sin(t * 1.2) * 6 + 1;
      satRef.current.position.z = Math.cos(t) * 4 - 3;
      satRef.current.position.y = Math.sin(t * 0.8) * 1.5 + 1;
      
      // Elegant micro-rotations
      satRef.current.rotation.x += delta * 0.08;
      satRef.current.rotation.y += delta * 0.12;
      satRef.current.rotation.z += delta * 0.04;
    }

    // Blinking navigation light
    if (blinkingLightRef.current) {
      const isLit = Math.floor(state.clock.elapsedTime * 2.5) % 2 === 0;
      blinkingLightRef.current.visible = isLit;
    }
  });

  return (
    <group ref={satRef} scale={0.16}>
      <Trail width={0.3} length={6} color="#7042f8" attenuation={(t) => t * t}>
        <mesh>
          <boxGeometry args={[1.2, 0.18, 0.18]} />
          <meshStandardMaterial color="#3a2b58" metalness={0.9} roughness={0.1} />
        </mesh>
      </Trail>
      
      {/* Solar Panel Wing A */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.7, 0.45]} />
        <meshStandardMaterial color="#1a0e36" metalness={0.7} emissive="#7042f8" emissiveIntensity={0.15} />
      </mesh>
      
      {/* Solar Panel Wing B */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[0.08, 0.7, 0.45]} />
        <meshStandardMaterial color="#1a0e36" metalness={0.7} emissive="#7042f8" emissiveIntensity={0.15} />
      </mesh>

      {/* Futuristic Blinking Beacon Light */}
      <mesh ref={blinkingLightRef} position={[0.7, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>
    </group>
  );
};

export const SpaceSceneCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-[15] pointer-events-none hidden md:block">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <fog attach="fog" args={["#030014", 4, 15]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 10, 3]} intensity={1.2} color="#b49bff" />
        <directionalLight position={[-5, -10, -3]} intensity={0.4} color="#e59cff" />
        
        <FloatingSatellite />
      </Canvas>
    </div>
  );
};
