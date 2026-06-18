"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

/* ─────────────────────────────
   MOBILE HOOK (ONLY ONCE)
───────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

/* ─────────────────────────────
   MODEL (SIN HOOK MOBILE AQUÍ)
───────────────────────────── */
function LogoModel({ config }: any) {
  const { scene } = useGLTF("/models/logodroch.glb");
  const ref = useRef<THREE.Group>(null);

  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    scene.position.x -= center.x;
    scene.position.y -= center.y;
    scene.position.z -= center.z;

    scene.rotation.set(1.5, 0.3, 0.3);

    scene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.name === "Cubo") {
          child.material = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            transparent: true,
            opacity: 0.35,
            roughness: 0.05,
            metalness: 0.8,
            envMapIntensity: 1.5,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
        }

        if (child.name === "Curve") {
          child.material = new THREE.MeshStandardMaterial({
            color: "#050505",
            roughness: 0.2,
            metalness: 0.1,
          });
        }
      }
    });
  }, [scene]);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      mouse.current.x * 0.4,
      0.03,
    );

    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      mouse.current.y * 0.2,
      0.03,
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
      <group
        ref={ref}
        scale={config.scale}
        position={[config.positionX, config.positionY, 0]}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}

/* ─────────────────────────────
   SCENE
───────────────────────────── */
export default function HeaderScene() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const config = isMobile
    ? {
        scale: 0.7,
        positionY: 0.7,
        positionX: -0.5,
      }
    : {
        scale: 1.2,
        positionY: 0,
        positionX: 0.5,
      };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <Canvas
        frameloop="always"
        resize={{ scroll: false }}
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={1}
        gl={{ antialias: false }}
        eventSource={
          typeof document !== "undefined" ? document.body : undefined
        }
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={isMobile ? 1.2 : 1.6}
        />

        <Environment preset="city" />

        <LogoModel config={config} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/logodroch.glb");
