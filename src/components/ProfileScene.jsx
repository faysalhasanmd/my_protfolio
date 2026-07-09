"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Ring } from "@react-three/drei";

/**
 * Signature 3D element for the About section.
 *
 * A soft glowing orb drifting behind the portrait — quiet, ambient depth
 * rather than visible structure. Slow autorotation on the orbit ring,
 * a gentle parallax tilt toward the cursor, and it fully disables motion
 * for prefers-reduced-motion so it never fights the page.
 */

const STEEL = "#7C9CC0";
const SAND = "#CBBBA3";

function PointerRig({ children, hovered }) {
  const group = useRef(null);
  const { viewport } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    const strength = hovered ? 1.6 : 1;
    target.current.x = (state.pointer.x * Math.PI * strength) / 10;
    target.current.y = (state.pointer.y * Math.PI * strength) / 12;
    group.current.rotation.y +=
      (target.current.x - group.current.rotation.y) * 0.06;
    group.current.rotation.x +=
      (-target.current.y - group.current.rotation.x) * 0.06;
    const targetScale = hovered ? 1.08 : 1;
    group.current.scale.x += (targetScale - group.current.scale.x) * 0.08;
    group.current.scale.y += (targetScale - group.current.scale.y) * 0.08;
    group.current.scale.z += (targetScale - group.current.scale.z) * 0.08;
  });

  return (
    <group ref={group} scale={Math.min(viewport.width, viewport.height) / 3.6}>
      {children}
    </group>
  );
}

function GlowCore({ reduceMotion, hovered }) {
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const coreMat = useRef(null);
  const ringMat = useRef(null);

  useFrame((state, delta) => {
    const speedMultiplier = hovered ? 3 : 1;
    if (!reduceMotion) {
      if (ringRef.current)
        ringRef.current.rotation.z -= delta * 0.12 * speedMultiplier;
      if (coreRef.current) {
        // ধীর, নিঃশ্বাসের মতো pulse — কোনো ভিজিবল এজ/স্ট্রাকচার নেই
        const t = state.clock.elapsedTime;
        const pulse = 1 + Math.sin(t * 0.8) * 0.04;
        coreRef.current.scale.setScalar(pulse);
      }
    }
    const targetCoreOpacity = hovered ? 0.55 : 0.35;
    const targetRingOpacity = hovered ? 0.8 : 0.5;
    if (coreMat.current) {
      coreMat.current.opacity +=
        (targetCoreOpacity - coreMat.current.opacity) * 0.08;
    }
    if (ringMat.current) {
      ringMat.current.opacity +=
        (targetRingOpacity - ringMat.current.opacity) * 0.08;
    }
  });

  return (
    <>
      {/* সফট গ্লোয়িং অরব — কোনো তার/জাল নেই, শুধু আলোর একটা নরম পিণ্ড */}
      <Sphere ref={coreRef} args={[1.1, 32, 32]}>
        <meshBasicMaterial
          ref={coreMat}
          color={STEEL}
          transparent
          opacity={0.35}
        />
      </Sphere>
      <Ring
        ref={ringRef}
        args={[1.7, 1.72, 64]}
        rotation={[Math.PI / 2.4, 0, 0]}
      >
        <meshBasicMaterial
          ref={ringMat}
          color={SAND}
          transparent
          opacity={0.5}
          side={2}
        />
      </Ring>
    </>
  );
}

export default function ProfileScene({ hovered = false }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const dpr = useMemo(
    () =>
      typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
    [],
  );

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: reduceMotion ? "none" : "auto" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight
        position={[3, 3, 3]}
        intensity={hovered ? 0.7 : 0.4}
        color={STEEL}
      />
      {reduceMotion ? (
        <GlowCore reduceMotion hovered={hovered} />
      ) : (
        <Float
          speed={hovered ? 2.4 : 1.4}
          rotationIntensity={0.3}
          floatIntensity={0.6}
        >
          <PointerRig hovered={hovered}>
            <GlowCore reduceMotion={false} hovered={hovered} />
          </PointerRig>
        </Float>
      )}
    </Canvas>
  );
}
