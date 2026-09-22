'use client';

import { VERCEL_BLOB_VIDEOS } from '@/config/videoAssets';

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

    // 1. Scene with pitch-black cinematic background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    // 2. Camera setup
    const fov = isMobile ? 48 : 38;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.05, 100);

    // 3. Renderer with high dynamic range feel and cinematic tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    canvasContainer.appendChild(renderer.domElement);

    // 4. Dramatic, Atmospheric Cinematic Lighting for Black Backdrop
    // Ambient light - keep low and moody so the room sits inside a dark cinematic environment
    const ambient = new THREE.AmbientLight(0xd4cfc5, 0.45);
    scene.add(ambient);

    // Key directional light creating soft shadows across furniture
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 1.4);
    keyLight.position.set(2.5, 4.5, 3.5);
    scene.add(keyLight);

    // Warm moody fill light
    const warmFill = new THREE.DirectionalLight(0xce6b33, 0.4);
    warmFill.position.set(-3.0, 2.0, 2.0);
    scene.add(warmFill);

    // Rim light to separate the edges of the room and TV from the black void
    const rimLight = new THREE.DirectionalLight(0x6080a0, 0.6);
    rimLight.position.set(1.0, 3.0, -3.0);
    scene.add(rimLight);

    // Dynamic TV phosphor point light casting amber/cyan glow
    const tvGlowLight = new THREE.PointLight(0xffecd0, 0.3, 5);
    scene.add(tvGlowLight);

    // 5. Video Element setup (exact requested file)
    const video = document.createElement('video');
    video.src = VERCEL_BLOB_VIDEOS.room_tv;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.preload = 'metadata';
    video.style.position = 'fixed';
    video.style.top = '-9999px';
    video.style.left = '-9999px';
    video.style.width = '1px';
    video.style.height = '1px';
    video.style.opacity = '0.01';
    video.style.pointerEvents = 'none';
    document.body.appendChild(video);

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.generateMipmaps = false;

    // Dedicated material strictly clipped to the screen surface
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: videoTexture,
      toneMapped: false,
      side: THREE.FrontSide,
      depthTest: true,
      depthWrite: true,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });

    // 6. Model & Screen Plane Nodes
    const roomRoot = new THREE.Group();
    scene.add(roomRoot);

    // Screen dimensions covering CRT glass snugly within the bezel
    const screenWidth = 0.48;
    const screenHeight = 0.36;
    const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.renderOrder = 999;

    // Target vectors in World coordinates
    let targetWorldLookAt = new THREE.Vector3();
    let camStartPos = new THREE.Vector3();
    let camEndPos = new THREE.Vector3();
    let isSceneReady = false;

    // 7. Load GLB Room Model
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/pokemon_firered_-_players_room.glb',
      (gltf) => {
        const model = gltf.scene;
        let tvMesh: THREE.Mesh | null = null;

        // Traverse to find TV mesh and ensure clean double-sided room rendering
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            if (child.material) {
              child.material.side = THREE.DoubleSide;
            }
            if (child.name.toLowerCase().includes('tv') && !child.name.toLowerCase().includes('stand')) {
              tvMesh = child;
            }
          }
        });

        // Center the room at origin
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.set(-center.x, -center.y, -center.z);
        roomRoot.add(model);

        // Attach screenMesh directly to tvMesh so all transforms and hierarchy are exact!
        // Local CRT center: x=0.4082, y=0.8859, and z=0.1625 (sits right on the front glass face)
        if (tvMesh) {
          screenMesh.position.set(0.4082, 0.8859, 0.1625);
          (tvMesh as THREE.Mesh).add(screenMesh);
        } else {
          screenMesh.position.set(0.4082 - center.x, 0.8859 - center.y, 0.1625 - center.z);
          roomRoot.add(screenMesh);
        }

        // Force full world matrix update
        roomRoot.updateMatrixWorld(true);

        // Calculate world position of TV screen center
        screenMesh.getWorldPosition(targetWorldLookAt);

        // Extract orientation of the screen
        const screenQuat = new THREE.Quaternion();
        screenMesh.getWorldQuaternion(screenQuat);
        const screenNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(screenQuat).normalize();
        const screenRight = new THREE.Vector3(1, 0, 0).applyQuaternion(screenQuat).normalize();
        const screenUp = new THREE.Vector3(0, 1, 0).applyQuaternion(screenQuat).normalize();

        // Position dynamic point light right in front of the screen
        tvGlowLight.position.copy(targetWorldLookAt).addScaledVector(screenNormal, 0.25);

        // Camera Positions:
        // Final position (camEndPos):
        // Directly in front of the TV along the perpendicular screen normal axis!
        // Distance 1.18 allows the entire TV housing/bezel and stand to be fully framed with breathing room.
        const endDistance = isMobile ? 1.40 : 1.18;
        camEndPos.copy(targetWorldLookAt).addScaledVector(screenNormal, endDistance);

        // Starting position (camStartPos):
        // Standing INSIDE the room looking towards the TV.
        // Stepped back into the room entrance, elevated slightly to eye level.
        camStartPos.copy(targetWorldLookAt)
          .addScaledVector(screenNormal, 2.9)
          .addScaledVector(screenRight, 0.40)
          .addScaledVector(screenUp, 0.65);

        camera.position.copy(camStartPos);
        camera.lookAt(targetWorldLookAt);

        isSceneReady = true;
        setIsLoaded(true);

        // Start video immediately
        video.play().catch(() => {});
      },
      undefined,
      (err) => {
        console.error('Error loading room GLB:', err);
      }
    );

    // Ensure playback triggers on first scroll or touch
    const handleUserInteraction = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener('scroll', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });

    // 8. Animation Loop driven by Scroll Progress
    let animFrameId: number;
    const currentCamPos = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Read scroll progress relative to this pinned section
      const container = containerRef.current;
      let sp = 0;
      if (container) {
        const rect = container.getBoundingClientRect();
        const trackHeight = container.offsetHeight - window.innerHeight;
        if (trackHeight > 0) {
          sp = Math.min(Math.max(-rect.top / trackHeight, 0), 1);
        }
      }

      if (isSceneReady) {
        // Smooth easing curve (easeInOutCubic)
        const smoothProgress = sp < 0.5 
          ? 4 * sp * sp * sp 
          : 1 - Math.pow(-2 * sp + 2, 3) / 2;

        // Camera path:
        // Moves from room overview inside directly to the perfectly straight-on focal distance
        const targetPos = new THREE.Vector3().lerpVectors(
          camStartPos,
          camEndPos,
          smoothProgress
        );

        // LookAt target:
        // Always locked precisely onto the screen center throughout the move
        const targetLook = targetWorldLookAt.clone();

        // High quality lerp for butter-smooth momentum
        currentCamPos.lerp(targetPos, 0.09);
        currentLookAt.lerp(targetLook, 0.09);

        camera.position.copy(currentCamPos);
        camera.lookAt(currentLookAt);

        // Dynamic TV Screen Glow increases as you approach
        const glowIntensity = THREE.MathUtils.lerp(0.4, 2.2, smoothProgress);
        tvGlowLight.intensity = glowIntensity;

        // Keep video playing and texture fresh
        if (video.paused && sp > 0.005) {
          video.play().catch(() => {});
        }
        if (video.readyState >= 2) {
          videoTexture.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!canvasContainer) return;
      width = canvasContainer.clientWidth;
      height = canvasContainer.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 10. Disposal and Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      renderer.dispose();
      screenMaterial.dispose();
      screenGeometry.dispose();
      videoTexture.dispose();
      video.pause();
      video.src = '';
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
      if (renderer.domElement && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      id="room-experience"
      ref={containerRef}
      className="relative z-50 w-full min-h-[300vh] bg-[#050505]"
    >
      {/* Pinned Cinematic Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        
        {/* Subtle, minimal editorial branding header */}
        <div className="absolute top-0 left-0 right-0 z-20 mx-auto w-full max-w-7xl pt-8 sm:pt-10 px-6 md:px-12 flex items-center justify-between border-b border-white/10 pb-4 pointer-events-none">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-saffron">
              Creative Space
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
              Interactive Room
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 hidden sm:block">
            Scroll to Navigate
          </span>
        </div>

        {/* Three.js Canvas Container */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Ambient Loading Veil */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#050505]">
            <div className="flex items-center space-x-3 text-xs font-mono text-white/40 uppercase tracking-widest">
              <div className="h-1.5 w-1.5 rounded-full bg-saffron animate-pulse" />
              <span>Initializing Scene</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
