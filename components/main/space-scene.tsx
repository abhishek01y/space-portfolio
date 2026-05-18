"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Trail } from "@react-three/drei";
import * as THREE from "three";

// --- Accretion Disk (Interstellar-style gravitational swirl) ---
const AccretionDisk = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1500;

  const [positions, rotationsSpeed, radii] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const rads = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Create a flat tilted disc of particles with a central gap (accretion disk)
      const r = 1.8 + Math.random() * 4.5; // Radius between 1.8 and 6.3
      const theta = Math.random() * Math.PI * 2;
      
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.12; // Extremely thin profile
      pos[i * 3 + 2] = Math.sin(theta) * r;

      // Keplerian-like orbit: closer particles rotate faster
      speeds[i] = (0.25 + Math.random() * 0.25) / Math.pow(r, 0.5);
      rads[i] = r;
    }
    return [pos, speeds, rads];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      
      for (let i = 0; i < particleCount; i++) {
        let x = positionsAttr.getX(i);
        let z = positionsAttr.getZ(i);
        
        let angle = Math.atan2(z, x);
        angle += rotationsSpeed[i] * delta * 0.6; // Controlled slow orbit speed
        
        positionsAttr.setX(i, Math.cos(angle) * radii[i]);
        positionsAttr.setZ(i, Math.sin(angle) * radii[i]);
        
        // Subtle ripple waves propagating outwards
        positionsAttr.setY(i, Math.sin(state.clock.elapsedTime * 0.8 - radii[i] * 2) * 0.08);
      }
      positionsAttr.needsUpdate = true;
      
      // Gentle overall rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group rotation={[0.5, 0.2, 0.3]} position={[0, 1.2, -3]}>
      {/* Primary Accretion Ring */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#b49bff"
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Core Gravitational Glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#110729" transparent opacity={0.8} />
      </mesh>
      
      {/* Intense Inner Accretion Sparkles */}
      <Sparkles count={150} scale={3.5} size={2.5} color="#e59cff" speed={0.4} opacity={0.5} />
    </group>
  );
};

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
        <pointLight position={[0, 1.2, -3]} intensity={2.5} color="#7042f8" distance={8} />
        
        <AccretionDisk />
        <FloatingSatellite />
      </Canvas>
    </div>
  );
};
