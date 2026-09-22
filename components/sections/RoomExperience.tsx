'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function RoomExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    let width = canvasContainer.clientWidth;
    let height = canvasContainer.clientHeight;

    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbf9f5);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.01, 100);
    const initialPos = new THREE.Vector3(2.8, 2.6, 2.8);
    const initialLookAt = new THREE.Vector3(0.4, 0.5, 0);
    camera.position.copy(initialPos);
    camera.lookAt(initialLookAt);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    canvasContainer.appendChild(renderer.domElement);

    // Lighting: warm ambient matching the portfolio palette
    const ambient = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambient);

    // Overhead directional
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(2, 4, 2);
    scene.add(dirLight);

    // Warm fill from front
    const warmFill = new THREE.DirectionalLight(0xce6b33, 0.4);
    warmFill.position.set(-1, 2, 3);
    scene.add(warmFill);

    // Point light near TV that intensifies as camera approaches
    const tvLight = new THREE.PointLight(0xce6b33, 0, 4);
    tvLight.position.set(0.4, 1.0, 0.4);
    scene.add(tvLight);

    // Video element for TV screen
    const video = document.createElement('video');
    video.src = '/assets/projects/WhatsApp Video 2026-09-22 at 2.00.15 PM.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    // TV screen plane material
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: videoTexture,
      side: THREE.FrontSide,
    });

    // TV screen plane geometry: positioned at the front face of the TV mesh
    // Screen quad vertices from GLB inspection:
    //   BL: (0.2071, 0.7189, 0.1384)  BR: (0.6093, 0.7189, 0.1384)
    //   TL: (0.2071, 1.0529, 0.1384)  TR: (0.6093, 1.0529, 0.1384)
    const screenWidth = 0.6093 - 0.2071;   // 0.4022
    const screenHeight = 1.0529 - 0.7189;  // 0.334
    const screenCenterX = (0.2071 + 0.6093) / 2; // 0.4082
    const screenCenterY = (0.7189 + 1.0529) / 2; // 0.8859
    const screenZ = 0.1384 + 0.002; // slightly in front

    const screenGeom = new THREE.PlaneGeometry(screenWidth, screenHeight);
    const screenMesh = new THREE.Mesh(screenGeom, screenMaterial);
    screenMesh.position.set(screenCenterX, screenCenterY, screenZ);

    // Load GLB
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/pokemon_firered_-_players_room.glb',
      (gltf) => {
        const model = gltf.scene;

        // Center and scale the model for good framing
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = isMobile ? 1.6 / maxDim : 2.0 / maxDim;

        model.scale.setScalar(scale);
        model.position.set(
          -center.x * scale,
          -center.y * scale + 0.1,
          -center.z * scale
        );

        // Scale and reposition the screen plane to match
        screenMesh.position.set(
          (screenCenterX - center.x) * scale,
          (screenCenterY - center.y) * scale + 0.1,
          (screenZ - center.z) * scale
        );
        screenMesh.scale.setScalar(scale);

        scene.add(model);
        scene.add(screenMesh);

        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.error('Error loading room GLB:', err);
      }
    );

    // Camera path keyframes
    const camStart = new THREE.Vector3(
      isMobile ? 3.2 : 2.8,
      isMobile ? 2.8 : 2.6,
      isMobile ? 3.2 : 2.8
    );
    const camMid = new THREE.Vector3(1.2, 1.4, 1.6);
    const camEnd = new THREE.Vector3(0.15, 0.95, 1.1);

    const lookStart = new THREE.Vector3(0.0, 0.3, 0.0);
    const lookMid = new THREE.Vector3(0.0, 0.5, 0.0);
    const lookEnd = new THREE.Vector3(0.0, 0.65, -0.1);

    // Current interpolated values
    let currentCamPos = camStart.clone();
    let currentLookAt = lookStart.clone();
    let currentTvIntensity = 0;

    // Animation loop
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Read scroll progress directly
      const container = containerRef.current;
      let sp = 0;
      if (container) {
        const rect = container.getBoundingClientRect();
        const trackHeight = container.offsetHeight - window.innerHeight;
        if (trackHeight > 0) {
          sp = Math.min(Math.max(-rect.top / trackHeight, 0), 1);
        }
      }

      // Camera interpolation across 3 phases
      let targetPos: THREE.Vector3;
      let targetLookAt: THREE.Vector3;

      if (sp < 0.35) {
        // Phase 1: overview to mid approach
        const t = sp / 0.35;
        const smooth = t * t * (3 - 2 * t);
        targetPos = camStart.clone().lerp(camMid, smooth);
        targetLookAt = lookStart.clone().lerp(lookMid, smooth);
      } else if (sp < 0.7) {
        // Phase 2: mid to TV close-up
        const t = (sp - 0.35) / 0.35;
        const smooth = t * t * (3 - 2 * t);
        targetPos = camMid.clone().lerp(camEnd, smooth);
        targetLookAt = lookMid.clone().lerp(lookEnd, smooth);
      } else {
        // Phase 3: hold at TV close-up
        targetPos = camEnd.clone();
        targetLookAt = lookEnd.clone();
      }

      // Smooth damping
      const dampFactor = 0.08;
      currentCamPos.lerp(targetPos, dampFactor);
      currentLookAt.lerp(targetLookAt, dampFactor);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      // TV light intensifies as camera approaches
      const targetTvIntensity = sp > 0.25 ? Math.min((sp - 0.25) / 0.3, 1) * 1.5 : 0;
      currentTvIntensity += (targetTvIntensity - currentTvIntensity) * dampFactor;
      tvLight.intensity = currentTvIntensity;

      // Video playback control
      if (sp >= 0.25 && sp <= 0.95) {
        if (video.paused) {
          video.play().catch(() => {});
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!canvasContainer) return;
      width = canvasContainer.clientWidth;
      height = canvasContainer.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      screenMaterial.dispose();
      screenGeom.dispose();
      videoTexture.dispose();
      video.pause();
      video.src = '';
      if (renderer.domElement && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      id="room-experience"
      ref={containerRef}
      className="relative w-full min-h-[300vh] bg-canvas"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Editorial Top Label */}
        <div className="absolute top-0 left-0 right-0 z-20 mx-auto w-full max-w-7xl pt-8 px-6 md:px-12 flex items-end justify-between border-b border-ink/10 pb-4 pointer-events-none">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-saffron">
              Creative Space
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-ink mt-1">
              Step Inside
            </h2>
          </div>
          <span className="text-xs font-mono text-ink/35 uppercase hidden sm:block">
            Scroll to Explore
          </span>
        </div>

        {/* Three.js Canvas */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Loading Indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-canvas">
            <div className="flex items-center space-x-3 text-xs font-mono text-ink/40 uppercase tracking-widest">
              <div className="h-1 w-1 rounded-full bg-saffron animate-pulse" />
              <span>Loading Room</span>
            </div>
          </div>
        )}

        {/* Bottom Hint */}
        <div className="absolute bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-7xl pb-6 px-6 md:px-12 flex items-center justify-between border-t border-ink/10 pt-4 pointer-events-none">
          <span className="text-[10px] font-mono text-ink/30 uppercase tracking-wider">
            Scroll to zoom into the room
          </span>
          <span className="text-[10px] font-mono text-ink/30 uppercase tracking-wider hidden sm:block">
            Pokemon FireRed: Player's Room
          </span>
        </div>
      </div>
    </section>
  );
}
