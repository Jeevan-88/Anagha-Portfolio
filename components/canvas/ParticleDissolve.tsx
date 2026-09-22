'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleDissolve() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Render "ANAGHA" to sample target points
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 600;
    textCanvas.height = 180;
    const tCtx = textCanvas.getContext('2d');
    if (tCtx) {
      tCtx.fillStyle = '#000000';
      tCtx.fillRect(0, 0, 600, 180);
      tCtx.fillStyle = '#FFFFFF';
      tCtx.font = 'bold 85px "Cormorant Garamond", Georgia, serif';
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.letterSpacing = '6px';
      tCtx.fillText('ANAGHA', 300, 90);
    }

    const imgData = tCtx?.getImageData(0, 0, 600, 180);
    const basePoints: { x: number; y: number; z: number }[] = [];
    const step = 4;

    if (imgData) {
      for (let y = 0; y < 180; y += step) {
        for (let x = 0; x < 600; x += step) {
          const index = (y * 600 + x) * 4;
          if (imgData.data[index] > 140) {
            basePoints.push({
              x: (x - 300) * 0.14,
              y: -(y - 90) * 0.14,
              z: (Math.random() - 0.5) * 2
            });
          }
        }
      }
    }

    const count = basePoints.length;
    if (count === 0) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const driftDirections = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const cInk = new THREE.Color('#141312');
    const cSaffron = new THREE.Color('#D06B29');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const pt = basePoints[i];
      positions[i3] = pt.x;
      positions[i3 + 1] = pt.y;
      positions[i3 + 2] = pt.z;

      // Random slow outward drift vector
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      driftDirections[i3] = Math.cos(angle) * speed;
      driftDirections[i3 + 1] = Math.sin(angle) * speed + (Math.random() * 4); // slight upward float
      driftDirections[i3 + 2] = (Math.random() - 0.5) * 15;

      opacities[i] = Math.random() * 0.4 + 0.6;

      const isSaffron = Math.random() < 0.06;
      const c = isSaffron ? cSaffron : cInk;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animId: number;
    let clock = new THREE.Clock();
    let dissolveFactor = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      
      // Gradually dissolve over time
      dissolveFactor += delta * 0.18;
      const d = Math.min(1.0, dissolveFactor);

      const pos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const pt = basePoints[i];
        
        // Disperse outwards as d increases
        pos[i3] = pt.x + driftDirections[i3] * d * d;
        pos[i3 + 1] = pt.y + driftDirections[i3 + 1] * d * d;
        pos[i3 + 2] = pt.z + driftDirections[i3 + 2] * d * d;
      }

      material.opacity = Math.max(0, 0.85 * (1.0 - d * 0.9));
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative h-48 w-full max-w-xl mx-auto overflow-hidden opacity-75"
      aria-hidden="true"
    />
  );
}
