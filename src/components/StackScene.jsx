"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sphere,
  Icosahedron,
  Torus,
  Html,
  Box,
  Cylinder,
} from "@react-three/drei";

// কী-বোর্ডের রিয়েলিস্টিক কী-গ্রিড (Html দিয়ে বানানো, পারফরম্যান্স-ফ্রেন্ডলি)
function KeyboardKeys() {
  const rows = [12, 12, 11, 10]; // প্রতি সারিতে কী-সংখ্যা (উপর থেকে নিচে)

  return (
    <Html
      transform
      distanceFactor={1.1}
      position={[0, 0.011, 0.06]}
      rotation={[-Math.PI / 2, 0, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          padding: "4px",
        }}
      >
        {rows.map((count, ri) => (
          <div
            key={ri}
            style={{ display: "flex", gap: "3px", justifyContent: "center" }}
          >
            {Array.from({ length: count }).map((_, ki) => (
              <div
                key={ki}
                style={{
                  width: "18px",
                  height: "14px",
                  borderRadius: "3px",
                  background:
                    "linear-gradient(180deg, #334155 0%, #1e293b 100%)",
                  border: "1px solid rgba(148,163,184,0.3)",
                  boxShadow: "0 1px 1px rgba(0,0,0,0.4)",
                }}
              />
            ))}
          </div>
        ))}
        {/* স্পেসবার */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1px",
          }}
        >
          <div
            style={{
              width: "140px",
              height: "14px",
              borderRadius: "3px",
              background: "linear-gradient(180deg, #334155 0%, #1e293b 100%)",
              border: "1px solid rgba(148,163,184,0.3)",
              boxShadow: "0 1px 1px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </div>
    </Html>
  );
}

// ল্যাপটপ স্ক্রিনে দেখানো "MERN Stack" কোড-এডিটর স্টাইল ডিসপ্লে
function ScreenDisplay() {
  return (
    <Html
      transform
      distanceFactor={1.05}
      position={[0, 0.28, 0.016]}
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          width: "336px",
          height: "208px",
          borderRadius: "3px",
          background:
            "linear-gradient(145deg, #0f172a 0%, #1e1b4b 55%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontFamily: "monospace",
        }}
      >
        {/* টাইটেল বার */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "14px",
            background: "#1e293b",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            paddingLeft: "6px",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#f59e0b",
            }}
          />
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
        </div>

        {/* মূল লোগো/টেক্সট */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 800,
              letterSpacing: "2px",
              background:
                "linear-gradient(90deg, #61DAFB 0%, #47A248 40%, #339933 70%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(97,218,251,0.5)",
            }}
          >
            MERN Stack
          </div>
          <div
            style={{
              marginTop: "6px",
              fontSize: "9px",
              color: "#94a3b8",
              letterSpacing: "3px",
            }}
          >
            MongoDB · Express · React · Node
          </div>
          {/* ব্লিঙ্কিং কার্সর সহ টার্মিনাল লাইন */}
          <div
            style={{
              marginTop: "14px",
              fontSize: "9px",
              color: "#61DAFB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <span>$ npm run dev</span>
            <span
              style={{
                width: "5px",
                height: "10px",
                background: "#61DAFB",
                animation: "blink 1s step-start infinite",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}</style>
      </div>
    </Html>
  );
}

// ১. প্রফেশনাল ৩ডি ল্যাপটপ ও ডেস্ক সেটআপ মডেল
function WorkspaceModel() {
  const deskRef = useRef(null);

  useFrame((state) => {
    if (!deskRef.current) return;
    const t = state.clock.elapsedTime;
    // মৃদু ও স্মুথ আইডল মোশন (যাতে পুরো সিনটা জীবন্ত লাগে)
    deskRef.current.position.y = -0.5 + Math.sin(t * 1.2) * 0.02;
  });

  return (
    <group ref={deskRef} position={[0, -0.5, 0.4]}>
      {/* ল্যাপটপ বেস / কী-বোর্ড বডি */}
      <Box args={[0.9, 0.02, 0.6]} position={[0, 0.01, 0]}>
        <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.2} />
      </Box>

      {/* কী-বোর্ডের ডার্ক ডেক প্যানেল (কী-ক্যাপ বসানোর বেস) */}
      <Box args={[0.68, 0.006, 0.38]} position={[0, 0.0135, 0.06]}>
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </Box>
      <KeyboardKeys />

      {/* ট্র্যাকপ্যাড */}
      <Box args={[0.22, 0.002, 0.13]} position={[0, 0.012, 0.19]}>
        <meshStandardMaterial
          color="#e2e8f0"
          metalness={0.3}
          roughness={0.15}
        />
      </Box>

      {/* ল্যাপটপ স্ক্রিন (খোলা অবস্থায়) */}
      <group position={[0, 0.01, -0.29]} rotation={[-0.25, 0, 0]}>
        {/* স্ক্রিনের পেছনের কভার */}
        <Box args={[0.9, 0.58, 0.02]} position={[0, 0.28, 0]}>
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.6}
            roughness={0.3}
          />
        </Box>
        {/* ডিসপ্লে গ্লাস (বেজেল) */}
        <Box args={[0.84, 0.52, 0.01]} position={[0, 0.28, 0.01]}>
          <meshStandardMaterial color="#1e293b" roughness={0.1} />
        </Box>
        {/* বাস্তব স্ক্রিন কনটেন্ট — MERN Stack */}
        <ScreenDisplay />
        {/* স্ক্রিন থেকে বের হওয়া ফিউচারিস্টিক গ্লো */}
        <pointLight
          position={[0, 0.28, 0.2]}
          intensity={1.5}
          distance={1.8}
          color="#61DAFB"
        />
      </group>

      {/* কফি মগ (ডানপাশে) */}
      <group position={[0.7, 0.1, 0.1]}>
        <Cylinder args={[0.07, 0.07, 0.18, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1e1b4b" roughness={0.4} />
        </Cylinder>
        {/* মগের হ্যান্ডেল */}
        <Torus
          args={[0.05, 0.015, 8, 16]}
          position={[0.07, 0, 0]}
          rotation={[0, 0, 0]}
        >
          <meshStandardMaterial color="#1e1b4b" roughness={0.4} />
        </Torus>
      </group>

      {/* ডেস্ক ল্যাম্প (বামপাশে) */}
      <group position={[-0.7, 0.2, 0]}>
        {/* ল্যাম্প স্ট্যান্ড */}
        <Cylinder args={[0.015, 0.015, 0.4, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#b45309" metalness={0.7} />
        </Cylinder>
        {/* ল্যাম্প শেড / বাল্ব কভার */}
        <Sphere args={[0.08, 16, 16]} position={[0.05, 0.2, 0]}>
          <meshStandardMaterial
            color="#d97706"
            emissive="#f59e0b"
            emissiveIntensity={0.3}
          />
        </Sphere>
        {/* ল্যাম্পের ওয়ার্ম লাইট ইফেক্ট */}
        <pointLight
          position={[0.05, 0.1, 0]}
          intensity={1.2}
          distance={1.2}
          color="#fbbf24"
        />
      </group>
    </group>
  );
}

// ২. টেকনোলজি নোড কম্পোনেন্ট (পেছনের আইকনগুলোর জন্য)
function TechNode({ position, color, label, speed, offset, children }) {
  const nodeRef = useRef(null);

  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime;
    nodeRef.current.position.y =
      position[1] + Math.sin(t * speed + offset) * 0.15;
    nodeRef.current.position.x =
      position[0] + Math.cos(t * (speed * 0.4) + offset) * 0.08;
  });

  return (
    <group ref={nodeRef} position={position}>
      {children}
      <Html distanceFactor={4} center style={{ pointerEvents: "none" }}>
        <div className="px-3 py-1 rounded-xl bg-slate-950/60 backdrop-blur-md text-white text-[9px] font-mono font-bold tracking-wider shadow-lg border border-white/10 flex items-center gap-1.5 whitespace-nowrap">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: color }}
          />
          {label}
        </div>
      </Html>
    </group>
  );
}

function LearningScene() {
  const sceneRef = useRef(null);

  useFrame((state) => {
    if (!sceneRef.current) return;
    const targetY = (state.pointer.x * Math.PI) / 12;
    const targetX = (-state.pointer.y * Math.PI) / 12;
    sceneRef.current.rotation.y +=
      (targetY - sceneRef.current.rotation.y) * 0.05;
    sceneRef.current.rotation.x +=
      (targetX - sceneRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={sceneRef}>
      <WorkspaceModel />

      <TechNode
        position={[0, 0.9, -0.6]}
        color="#ffffff"
        label="Next.js"
        speed={0.7}
        offset={0}
      >
        <Box args={[0.18, 0.18, 0.18]}>
          <meshStandardMaterial
            color="#09090b"
            emissive="#27272a"
            roughness={0.1}
          />
        </Box>
      </TechNode>

      <TechNode
        position={[1.3, 0.3, -0.4]}
        color="#61DAFB"
        label="React.js"
        speed={0.9}
        offset={2}
      >
        <group>
          <Sphere args={[0.08, 32, 32]}>
            <meshStandardMaterial
              color="#61DAFB"
              emissive="#61DAFB"
              emissiveIntensity={0.8}
            />
          </Sphere>
          <Torus args={[0.18, 0.015, 8, 32]} rotation={[1, 0.5, 0]}>
            <meshStandardMaterial
              color="#61DAFB"
              emissive="#61DAFB"
              emissiveIntensity={0.2}
            />
          </Torus>
        </group>
      </TechNode>

      <TechNode
        position={[-1.3, 0.3, -0.4]}
        color="#47A248"
        label="MongoDB"
        speed={0.8}
        offset={4}
      >
        <Icosahedron args={[0.11, 0]}>
          <meshStandardMaterial
            color="#47A248"
            emissive="#14532d"
            flatShading
            roughness={0.2}
          />
        </Icosahedron>
      </TechNode>

      <TechNode
        position={[0.7, -0.4, -0.5]}
        color="#339933"
        label="Node.js"
        speed={0.6}
        offset={1.5}
      >
        <Sphere args={[0.09, 16, 16]}>
          <meshStandardMaterial color="#339933" emissive="#166534" wireframe />
        </Sphere>
      </TechNode>

      <TechNode
        position={[-0.7, -0.4, -0.5]}
        color="#ffffff"
        label="Express.js"
        speed={0.5}
        offset={3.5}
      >
        <Icosahedron args={[0.08, 1]}>
          <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </Icosahedron>
      </TechNode>
    </group>
  );
}

export default function StackScene() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  const dpr = useMemo(
    () =>
      typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
    [],
  );

  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <pointLight position={[-4, 4, -2]} intensity={2.0} color="#6366f1" />
        <pointLight position={[4, -4, 2]} intensity={1.5} color="#a855f7" />

        {reduceMotion ? (
          <group rotation={[0.02, 0, 0]}>
            <LearningScene />
          </group>
        ) : (
          <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
            <LearningScene />
          </Float>
        )}
      </Canvas>
    </div>
  );
}
