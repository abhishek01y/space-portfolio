"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Ring, Sphere, Trail } from "@react-three/drei";
import * as THREE from "three";

// --- Holographic Planet (Saturn-Style) ---
const HolographicPlanet = () => {
  const planetRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.1;
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <group ref={planetRef} position={[-4, 2, -5]} rotation={[0.2, 0, 0.1]} scale={1.5}>
      {/* Core Planet */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial 
          color="#1a0b2e" 
          emissive="#7042f8" 
          emissiveIntensity={0.2}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Inner Glowing Atmosphere */}
      <Sphere args={[0.95, 32, 32]}>
        <meshBasicMaterial color="#b49bff" transparent opacity={0.5} />
      </Sphere>

      {/* Outer Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 1.8, 0, 0]}>
        <ringGeometry args={[1.4, 2, 64]} />
        <meshStandardMaterial 
          color="#b49bff" 
          emissive="#e59cff" 
          emissiveIntensity={0.5} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.4}
        />
      </mesh>
      
      {/* Orbital Particles */}
      <Sparkles count={100} scale={3} size={2} color="#e59cff" speed={0.5} opacity={0.6} />
    </group>
  );
};

// --- Stylized Futuristic Astronaut ---
// Since we don't have a 3D model, we create a high-quality abstract humanoid shape
// representing a futuristic astronaut using glowing geometric elements.
const StylizedAstronaut = () => {
  const astronautRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (astronautRef.current) {
      // Smooth mouse parallax
      astronautRef.current.position.x = THREE.MathUtils.lerp(astronautRef.current.position.x, state.pointer.x * 1.5 + 2, 0.05);
      astronautRef.current.position.y = THREE.MathUtils.lerp(astronautRef.current.position.y, state.pointer.y * 1.5, 0.05);
      
      // Idle rotation
      astronautRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 - 0.5;
      astronautRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={2}>
      <group ref={astronautRef} position={[2, 0, 0]} scale={0.8}>
        {/* Helmet */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={0.9} 
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 1.2, 0.28]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.3]} />
          <meshStandardMaterial color="#000000" metalness={1} roughness={0} emissive="#7042f8" emissiveIntensity={0.5} />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.35, 0.7, 16, 32]} />
          <meshPhysicalMaterial color="#e0e0e0" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Backpack */}
        <mesh position={[0, 0.3, -0.3]}>
          <boxGeometry args={[0.5, 0.8, 0.3]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.5, 0.2, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.15, 0.6, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.15, 0.6, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.2, -0.7, 0]}>
          <capsuleGeometry args={[0.18, 0.6, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.2, -0.7, 0]}>
          <capsuleGeometry args={[0.18, 0.6, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Ambient Aura */}
        <Sparkles count={40} scale={2} size={3} color="#7042f8" speed={1} opacity={0.4} />
      </group>
    </Float>
  );
};

// --- Floating Satellite ---
const FloatingSatellite = () => {
  const satRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (satRef.current) {
      // Orbital movement
      const t = state.clock.elapsedTime * 0.2;
      satRef.current.position.x = Math.sin(t) * 5;
      satRef.current.position.z = Math.cos(t) * 3 - 2;
      satRef.current.position.y = Math.sin(t * 1.5) * 1 + 2;
      
      // Self rotation
      satRef.current.rotation.x += delta * 0.2;
      satRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={satRef} scale={0.3}>
      <Trail width={0.5} length={4} color="#e59cff" attenuation={(t) => t * t}>
        <mesh>
          <boxGeometry args={[1, 0.2, 0.2]} />
          <meshStandardMaterial color="#a0a0a0" metalness={0.9} roughness={0.1} />
        </mesh>
      </Trail>
      
      {/* Solar Panels */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.1, 1, 0.5]} />
        <meshStandardMaterial color="#2A0E61" metalness={0.5} emissive="#7042f8" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.1, 1, 0.5]} />
        <meshStandardMaterial color="#2A0E61" metalness={0.5} emissive="#7042f8" emissiveIntensity={0.2} />
      </mesh>

      {/* Blinking Light */}
      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    </group>
  );
};

export const SpaceSceneCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-[15] pointer-events-none hidden md:block">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={["#030014", 5, 20]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#b49bff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#e59cff" />
        <pointLight position={[2, 0, 2]} intensity={2} color="#7042f8" distance={5} />
        
        <HolographicPlanet />
        <StylizedAstronaut />
        <FloatingSatellite />
      </Canvas>
    </div>
  );
};
