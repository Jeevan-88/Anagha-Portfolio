'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ParticleHeroProps {
  scrollProgress?: number;
  onHoverChange?: (isHovered: boolean) => void;
}

export default function ParticleHero({ scrollProgress = 0, onHoverChange }: ParticleHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 100;

    // 2. WebGL Renderer with full alpha transparency on editorial paper background
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Render High-Definition Masthead Typography onto Offscreen Canvas
    const textCanvas = document.createElement('canvas');
    const tCtx = textCanvas.getContext('2d');
    const tWidth = 2800;
    const tHeight = 420;
    textCanvas.width = tWidth;
    textCanvas.height = tHeight;

    if (tCtx) {
      tCtx.fillStyle = '#000000';
      tCtx.fillRect(0, 0, tWidth, tHeight);
      tCtx.fillStyle = '#FFFFFF';
      tCtx.font = '600 135px "Cormorant Garamond", Georgia, serif';
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.letterSpacing = '8px';
      tCtx.fillText('ANAGHA MHAISKAR', tWidth / 2, tHeight / 2);
    }

    const imgData = tCtx?.getImageData(0, 0, tWidth, tHeight);
    if (!imgData) return;

    let minX = tWidth, maxX = 0, minY = tHeight, maxY = 0;
    const rawPoints: { x: number; y: number }[] = [];

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    // Step: 2 on desktop for ultra-sharp editorial serif fidelity, 3 on mobile
    const step = isMobile ? 3 : 2;

    for (let y = 0; y < tHeight; y += step) {
      for (let x = 0; x < tWidth; x += step) {
        const idx = (y * tWidth + x) * 4;
        if (imgData.data[idx] > 115) {
          rawPoints.push({ x, y });
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const textPixelWidth = Math.max(1, maxX - minX);
    const textPixelHeight = Math.max(1, maxY - minY);
    const textPixelCenterX = (minX + maxX) / 2;
    const textPixelCenterY = (minY + maxY) / 2;

    // 3D Frustum dimensions at camera plane z = 0
    const vFOV = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
    const visibleWidth = visibleHeight * (width / height);

    // Masthead scale: 76% - 84% of visible width on desktop for grand editorial presence
    const targetMastheadWidth = isMobile
      ? visibleWidth * 0.94
      : isTablet
      ? visibleWidth * 0.88
      : visibleWidth * 0.82;

    const scaleFactor = targetMastheadWidth / textPixelWidth;

    const bounds3D = {
      minX: (minX - textPixelCenterX) * scaleFactor,
      maxX: (maxX - textPixelCenterX) * scaleFactor,
      minY: -(maxY - textPixelCenterY) * scaleFactor,
      maxY: -(minY - textPixelCenterY) * scaleFactor,
    };

    const count = rawPoints.length;
    if (count === 0) return;

    // 4. Geometry and Deterministic Attributes Setup
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Deterministic Dispersion Metadata per particle
    const pMeta = new Array(count);
    const numColumns = isMobile ? 5 : 7;
    const columnWidthSpan = targetMastheadWidth * 0.85;

    // Color palette: deep charcoal ink with subtle saffron accents
    const colorDeepInk = new THREE.Color('#141312');
    const colorCharcoal = new THREE.Color('#2A2826');
    const colorWarmSaffron = new THREE.Color('#CE6B33');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const pt = rawPoints[i];

      const bx = (pt.x - textPixelCenterX) * scaleFactor;
      const by = -(pt.y - textPixelCenterY) * scaleFactor;
      const bz = 0;

      basePositions[i3] = bx;
      basePositions[i3 + 1] = by;
      basePositions[i3 + 2] = bz;

      // CRITICAL: 100% PRE-FORMED ON LOAD (NO ASSEMBLE ANIMATION, NO DELAY)
      positions[i3] = bx;
      positions[i3 + 1] = by;
      positions[i3 + 2] = bz;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      // Seeded deterministic pseudorandom hash
      const hash1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const r1 = hash1 - Math.floor(hash1); // [0, 1)
      const hash2 = Math.cos(i * 37.719 + 11.137) * 23421.631;
      const r2 = hash2 - Math.floor(hash2); // [0, 1)

      // Phase 1 directionality: left, right, center stretch
      const normX = bx / (targetMastheadWidth * 0.5); // -1 to 1 across word
      const dirX = normX < -0.2 ? -1 : normX > 0.2 ? 1 : (r1 > 0.5 ? 0.6 : -0.6);
      const disperseDistX = dirX * (20 + r1 * 40);
      const disperseDistY = (r2 - 0.5) * 55;

      // Phase 2: Vertical Dotted Stream Columns (................)
      const colIdx = Math.floor(r1 * numColumns);
      const colX = ((colIdx / (numColumns - 1)) - 0.5) * columnWidthSpan;
      const colY = ((i % 120) / 120 - 0.5) * (visibleHeight * 0.85);

      // Phase 3: Ink Splatter / Droplet drift
      const splatterX = colX + (r1 - 0.5) * 35;
      const splatterY = -visibleHeight * 0.48 + (r2 - 0.5) * 18;

      pMeta[i] = {
        r1,
        r2,
        disperseDistX,
        disperseDistY,
        colX,
        colY,
        splatterX,
        splatterY,
      };

      // Restrained palette
      const isSaffron = r1 < 0.038;
      const c = isSaffron ? colorWarmSaffron : (r2 < 0.24 ? colorCharcoal : colorDeepInk);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crisp circular dot texture for physical ink feel
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0.92)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      pCtx.fillStyle = grad;
      pCtx.beginPath();
      pCtx.arc(16, 16, 16, 0, Math.PI * 2);
      pCtx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 1.5 : isTablet ? 1.75 : 2.0,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.96,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 5. Large Localized Fisheye Lens Raycasting
    // Enlarged radius: invisible glass lens moving over typography, purely particle distortion
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouseWorld = new THREE.Vector3(9999, 9999, 0);
    const intersectPoint = new THREE.Vector3();
    const glyphMargin = isMobile ? 14 : 22;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left - 40 ||
        e.clientX > rect.right + 40 ||
        e.clientY < rect.top - 40 ||
        e.clientY > rect.bottom + 40
      ) {
        if (mouseWorld.x < 9000) {
          mouseWorld.set(9999, 9999, 0);
          onHoverChange?.(false);
        }
        return;
      }

      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      raycaster.ray.intersectPlane(plane, intersectPoint);

      // Hit-test strictly on typography glyph boundaries + margin
      const isOverGlyphs =
        intersectPoint.x >= bounds3D.minX - glyphMargin &&
        intersectPoint.x <= bounds3D.maxX + glyphMargin &&
        intersectPoint.y >= bounds3D.minY - glyphMargin &&
        intersectPoint.y <= bounds3D.maxY + glyphMargin;

      if (isOverGlyphs) {
        mouseWorld.copy(intersectPoint);
        onHoverChange?.(true);
      } else {
        if (mouseWorld.x < 9000) {
          mouseWorld.set(9999, 9999, 0);
          onHoverChange?.(false);
        }
      }
    };

    const handleMouseLeave = () => {
      mouseWorld.set(9999, 9999, 0);
      onHoverChange?.(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // 6. Animation Loop: Fisheye Lens Physics + Deterministic 3-Phase Scroll Dispersion
    let animationFrameId: number;
    const clock = new THREE.Clock();

    // Large invisible fisheye lens specifications
    const interactionRadius = isMobile ? 26 : 44;
    const interactionRadiusSq = interactionRadius * interactionRadius;
    const pushStrength = 16.0;
    const returnSpring = 16.0;
    const damping = 0.78;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Current scroll progress from ref (0.0 to 1.0)
      const sp = Math.min(Math.max(scrollProgressRef.current, 0), 1);
      const isMouseActive = mouseWorld.x < 9000 && sp < 0.15; // Lens active primarily when intact

      // Calculate 3-Phase Dispersion Blend Factors
      // Phase 1: 0.00 to 0.35 (Letters break apart into particles)
      const p1 = Math.min(Math.max(sp / 0.35, 0), 1);
      const smoothP1 = p1 * p1 * (3 - 2 * p1); // smoothstep

      // Phase 2: 0.35 to 0.70 (Organize into vertical dotted lines ................)
      const p2 = Math.min(Math.max((sp - 0.35) / 0.35, 0), 1);
      const smoothP2 = p2 * p2 * (3 - 2 * p2);

      // Phase 3: 0.70 to 1.00 (Streams break apart like ink droplets/splatter across paper)
      const p3 = Math.min(Math.max((sp - 0.70) / 0.30, 0), 1);
      const smoothP3 = p3 * p3 * (3 - 2 * p3);

      let needsUpdate = false;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const meta = pMeta[i];

        const baseX = basePositions[i3];
        const baseY = basePositions[i3 + 1];
        const baseZ = basePositions[i3 + 2];

        // 1. Calculate dispersion target based on deterministic phases
        let targetX = baseX;
        let targetY = baseY;
        let targetZ = baseZ;

        if (sp > 0) {
          // Phase 1: Breaking apart from base
          const stage1X = baseX + meta.disperseDistX;
          const stage1Y = baseY + meta.disperseDistY;

          // Phase 2: Snapping into vertical dotted lines
          const stage2X = meta.colX + (meta.r1 - 0.5) * 0.45; // Thin vertical dot line
          const stage2Y = meta.colY;

          // Phase 3: Ink droplets splatter across canvas
          const stage3X = meta.splatterX;
          const stage3Y = meta.splatterY;

          if (sp <= 0.35) {
            targetX = THREE.MathUtils.lerp(baseX, stage1X, smoothP1);
            targetY = THREE.MathUtils.lerp(baseY, stage1Y, smoothP1);
          } else if (sp <= 0.70) {
            targetX = THREE.MathUtils.lerp(stage1X, stage2X, smoothP2);
            targetY = THREE.MathUtils.lerp(stage1Y, stage2Y, smoothP2);
          } else {
            targetX = THREE.MathUtils.lerp(stage2X, stage3X, smoothP3);
            targetY = THREE.MathUtils.lerp(stage2Y, stage3Y, smoothP3);
            targetZ = -smoothP3 * 2.0;
          }
        }

        let px = posArray[i3];
        let py = posArray[i3 + 1];
        let pz = posArray[i3 + 2];

        // 2. Fisheye Lens Optical Force (invisible glass magnifier)
        let forceX = 0;
        let forceY = 0;
        let forceZ = 0;

        if (isMouseActive) {
          const dx = px - mouseWorld.x;
          const dy = py - mouseWorld.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const normDist = dist / interactionRadius; // 0 at center, 1 at edge
            // Smooth spherical cosine lens magnification
            const lensFactor = Math.cos(normDist * (Math.PI / 2));
            const force = lensFactor * pushStrength;
            forceX = (dx / dist) * force;
            forceY = (dy / dist) * force;
            forceZ = -lensFactor * 4.0;
          }
        }

        // 3. Spring Physics towards calculated target (scroll-scrubbable)
        const springX = (targetX - px) * returnSpring;
        const springY = (targetY - py) * returnSpring;
        const springZ = (targetZ - pz) * returnSpring;

        velocities[i3] = (velocities[i3] + (forceX + springX) * delta) * damping;
        velocities[i3 + 1] = (velocities[i3 + 1] + (forceY + springY) * delta) * damping;
        velocities[i3 + 2] = (velocities[i3 + 2] + (forceZ + springZ) * delta) * damping;

        const vx = velocities[i3];
        const vy = velocities[i3 + 1];
        const vz = velocities[i3 + 2];

        const isDisplaced =
          Math.abs(targetX - px) > 0.004 ||
          Math.abs(targetY - py) > 0.004 ||
          Math.abs(targetZ - pz) > 0.004;

        const isMoving = Math.abs(vx) > 0.004 || Math.abs(vy) > 0.004 || Math.abs(vz) > 0.004;

        if (isDisplaced || isMoving || forceX !== 0 || forceY !== 0) {
          posArray[i3] += vx;
          posArray[i3 + 1] += vy;
          posArray[i3 + 2] += vz;
          needsUpdate = true;
        } else if (px !== targetX || py !== targetY || pz !== targetZ) {
          posArray[i3] = targetX;
          posArray[i3 + 1] = targetY;
          posArray[i3 + 2] = targetZ;
          velocities[i3] = 0;
          velocities[i3 + 1] = 0;
          velocities[i3 + 2] = 0;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        posAttr.needsUpdate = true;
      }

      // Material opacity subtly decreases in Phase 3 as About section settles in
      if (sp > 0.7) {
        material.opacity = 0.96 * (1.0 - smoothP3 * 0.7);
      } else {
        material.opacity = 0.96;
      }

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onHoverChange]);

  if (!isSupported) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="font-display text-5xl sm:text-7xl md:text-8xl font-semibold tracking-wider text-ink">
          ANAGHA MHAISKAR
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-32 sm:h-44 md:h-56 lg:h-64 w-full cursor-default select-none overflow-visible"
      aria-label="Particle typography: ANAGHA MHAISKAR"
    />
  );
}
