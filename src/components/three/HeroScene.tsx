'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RotatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.x = mouse.x * 0.5;
      meshRef.current.position.y = mouse.y * 0.5;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 4]} scale={2}>
      <MeshDistortMaterial
        color="#00d9ff"
        emissive="#b026ff"
        wireframe={true}
        distort={0.3}
        speed={2}
      />
    </Icosahedron>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  useEffect(() => {
    if (!particlesRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesRef.current.geometry = geometry;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0001;
      particlesRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={particlesRef}>
      <pointsMaterial size={0.05} color="#00d9ff" sizeAttenuation={true} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d9ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b026ff" />

      <RotatingGeometry />
      <Particles />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
