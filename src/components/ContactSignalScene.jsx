"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ContactSignalScene({ className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // ---------- Scene / Camera / Renderer ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const STEEL = "#7C9EC4";
    const STEEL_LIGHT = "#A9C2DE";
    const INK = "#1C1C1C";

    const group = new THREE.Group();
    scene.add(group);

    // ================= Icon texture builder =================
    // Draws a rounded glass "chip" background + a line-art icon on top,
    // returns a CanvasTexture.
    function makeIconTexture(drawIconFn) {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      // rounded square glass chip
      const r = 56;
      const pad = 14;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pad + r, pad);
      ctx.arcTo(size - pad, pad, size - pad, size - pad, r);
      ctx.arcTo(size - pad, size - pad, pad, size - pad, r);
      ctx.arcTo(pad, size - pad, pad, pad, r);
      ctx.arcTo(pad, pad, size - pad, pad, r);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "rgba(255,255,255,0.92)");
      grad.addColorStop(1, "rgba(230,236,244,0.85)");
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgba(124,158,196,0.55)";
      ctx.stroke();
      ctx.restore();

      // icon (drawn in ink/steel line-art, centered in a 160x160 box)
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = INK;
      ctx.fillStyle = INK;
      ctx.lineWidth = 9;
      drawIconFn(ctx);
      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    // --- Phone / call icon ---
    const callTexture = makeIconTexture((ctx) => {
      ctx.beginPath();
      // classic rounded handset shape via path
      ctx.moveTo(-45, -55);
      ctx.bezierCurveTo(-55, -50, -50, -20, -20, 10);
      ctx.bezierCurveTo(10, 40, 40, 45, 45, 35);
      ctx.lineTo(55, 15);
      ctx.bezierCurveTo(58, 8, 55, 2, 48, -2);
      ctx.lineTo(28, -12);
      ctx.bezierCurveTo(20, -16, 12, -14, 8, -6);
      ctx.lineTo(0, 4);
      ctx.bezierCurveTo(-16, -6, -30, -20, -38, -36);
      ctx.lineTo(-30, -44);
      ctx.bezierCurveTo(-26, -50, -32, -58, -40, -55);
      ctx.closePath();
      ctx.stroke();
    });

    // --- Message / SMS bubble icon ---
    const smsTexture = makeIconTexture((ctx) => {
      const w = 92,
        h = 66,
        r = 20;
      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2);
      ctx.arcTo(w / 2, -h / 2, w / 2, h / 2, r);
      ctx.arcTo(w / 2, h / 2, -w / 2, h / 2, r);
      ctx.arcTo(-w / 2, h / 2, -w / 2, -h / 2, r);
      ctx.arcTo(-w / 2, -h / 2, w / 2, -h / 2, r);
      ctx.closePath();
      ctx.stroke();
      // little tail
      ctx.beginPath();
      ctx.moveTo(-14, h / 2 - 2);
      ctx.lineTo(-22, h / 2 + 20);
      ctx.lineTo(4, h / 2 - 2);
      ctx.stroke();
      // dots inside (typing indicator)
      ctx.fillStyle = STEEL;
      [-24, 0, 24].forEach((dx) => {
        ctx.beginPath();
        ctx.arc(dx, -2, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // --- Social / share icon (three connected nodes) ---
    const socialTexture = makeIconTexture((ctx) => {
      const nodes = [
        { x: 40, y: -40 },
        { x: 40, y: 40 },
        { x: -45, y: 0 },
      ];
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.stroke();

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = 7;
        ctx.stroke();
      });
    });

    const iconTextures = [callTexture, smsTexture, socialTexture];

    // ================= Floating icon sprites =================
    const ICON_COUNT_PER_TYPE = 3;
    const sprites = [];

    iconTextures.forEach((tex, typeIdx) => {
      for (let i = 0; i < ICON_COUNT_PER_TYPE; i++) {
        const material = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(material);
        const scale = 1.0 + Math.random() * 0.4;
        sprite.scale.set(scale, scale, 1);

        // scatter roughly on a sphere shell so nothing overlaps camera too much
        const phi = Math.random() * Math.PI * 2;
        const costheta = Math.random() * 2 - 1;
        const theta = Math.acos(costheta);
        const radius = 10 + Math.random() * 6;
        sprite.position.set(
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi) * 0.7,
          radius * Math.cos(theta) * 0.6,
        );

        group.add(sprite);
        sprites.push({
          sprite,
          typeIdx,
          basePos: sprite.position.clone(),
          floatSpeed: 0.4 + Math.random() * 0.5,
          floatOffset: Math.random() * Math.PI * 2,
          orbitSpeed: (Math.random() - 0.5) * 0.06,
        });
      }
    });

    // ================= Faint connecting lines between icons =================
    const linkGeometry = new THREE.BufferGeometry();
    const linkPositions = new Float32Array(
      sprites.length * sprites.length * 3 * 2,
    );
    const linkMaterial = new THREE.LineBasicMaterial({
      color: STEEL,
      transparent: true,
      opacity: 0.12,
    });
    const links = new THREE.LineSegments(linkGeometry, linkMaterial);
    group.add(links);

    function updateLinks() {
      let ptr = 0;
      const MAX_DIST = 11;
      for (let i = 0; i < sprites.length; i++) {
        for (let j = i + 1; j < sprites.length; j++) {
          const a = sprites[i].sprite.position;
          const b = sprites[j].sprite.position;
          if (a.distanceTo(b) < MAX_DIST) {
            linkPositions[ptr++] = a.x;
            linkPositions[ptr++] = a.y;
            linkPositions[ptr++] = a.z;
            linkPositions[ptr++] = b.x;
            linkPositions[ptr++] = b.y;
            linkPositions[ptr++] = b.z;
          }
        }
      }
      linkGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(linkPositions.subarray(0, ptr), 3),
      );
      linkGeometry.attributes.position.needsUpdate = true;
      linkGeometry.setDrawRange(0, ptr / 3);
    }

    // ================= Ambient background dust =================
    const dustCount = 120;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 50;
      dustPositions[i + 1] = (Math.random() - 0.5) * 34;
      dustPositions[i + 2] = (Math.random() - 0.5) * 20 - 6;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3),
    );
    const dustMaterial = new THREE.PointsMaterial({
      color: STEEL_LIGHT,
      size: 0.25,
      transparent: true,
      opacity: 0.4,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // ================= Mouse parallax =================
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ================= Animation loop =================
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.05;

      sprites.forEach(({ sprite, basePos, floatSpeed, floatOffset }) => {
        sprite.position.y =
          basePos.y + Math.sin(elapsed * floatSpeed + floatOffset) * 1.1;
        sprite.position.x =
          basePos.x + Math.cos(elapsed * floatSpeed * 0.7 + floatOffset) * 0.6;
      });

      updateLinks();

      dust.rotation.y = elapsed * 0.01;

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // ================= Resize =================
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ================= Cleanup =================
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      iconTextures.forEach((t) => t.dispose());
      sprites.forEach((s) => {
        s.sprite.material.dispose();
      });
      linkGeometry.dispose();
      linkMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
