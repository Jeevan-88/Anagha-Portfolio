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
    // Ambient light - keep subtle and moody so black surroundings look rich
    const ambient = new THREE.AmbientLight(0xf5eedc, 1.1);
    scene.add(ambient);

    // Key directional light creating soft shadows across furniture
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.2);
    keyLight.position.set(2.5, 4.5, 3.5);
    scene.add(keyLight);

    // Warm moody fill light
    const warmFill = new THREE.DirectionalLight(0xce6b33, 0.7);
    warmFill.position.set(-3.0, 2.0, 2.0);
    scene.add(warmFill);

    // Rim light to separate the edges of the room and TV from the black void
    const rimLight = new THREE.DirectionalLight(0x6080a0, 0.9);
    rimLight.position.set(1.0, 3.0, -3.0);
    scene.add(rimLight);

    // Dynamic TV phosphor point light casting amber/cyan glow
    const tvGlowLight = new THREE.PointLight(0xffecd0, 0.2, 5);
    scene.add(tvGlowLight);

    // 5. Video Element setup (exact requested file)
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

    // Dedicated material strictly clipped to the screen surface
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: videoTexture,
      side: THREE.FrontSide,
    });

    // 6. Model & Screen Plane Nodes
    const roomRoot = new THREE.Group();
    scene.add(roomRoot);

    // We create the screen plane inside roomRoot so all scale and positions match the room exactly!
    // The screen face coordinates from GLB vertex analysis:
    // Screen quad bounded by v51 (left=0.2071, bottom=0.7189) to v53 (right=0.6093, top=1.0529), z = 0.1384
    // Screen dimensions: width = 0.4022, height = 0.3340
    // Screen center: x = 0.4082, y = 0.8859, z = 0.1386
    const screenWidth = 0.4022;
    const screenHeight = 0.3340;
    const screenCenter = new THREE.Vector3(0.4082, 0.8859, 0.1390);

    const screenGeometry = new THREE.PlaneGeometry(screenWidth, screenHeight);
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.copy(screenCenter);
    roomRoot.add(screenMesh);

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

        // Clean up any unlit shader quirks and ensure double-sided room rendering
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            if (child.material) {
              child.material.side = THREE.DoubleSide;
            }
          }
        });

        // Center the room at origin
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.set(-center.x, -center.y, -center.z);

        // Adjust screen mesh position relative to room center
        screenMesh.position.set(
          screenCenter.x - center.x,
          screenCenter.y - center.y,
          screenCenter.z - center.z
        );

        roomRoot.add(model);

        // Calculate world position of TV screen center
        screenMesh.getWorldPosition(targetWorldLookAt);

        // Position dynamic point light right in front of the screen
        tvGlowLight.position.set(
          targetWorldLookAt.x,
          targetWorldLookAt.y,
          targetWorldLookAt.z + 0.3
        );

        // Camera Positions:
        // Final position (camEndPos):
        // Directly in front of the TV along the +Z normal axis!
        // Perfectly centered on X and Y, with Z pulled back so the screen takes 50-70% of viewport.
        // At fov=38 (vertical rad = ~0.663 rad), screen height of ~0.334 fills 60% of vertical FOV
        // when distance d ≈ (0.334 / 0.60) / (2 * tan(19 deg)) ≈ 0.556 / 0.688 ≈ 0.81 units.
        const endDistance = isMobile ? 1.05 : 0.84;
        camEndPos.set(
          targetWorldLookAt.x,
          targetWorldLookAt.y,
          targetWorldLookAt.z + endDistance
        );

        // Starting position (camStartPos):
        // Standing INSIDE the room looking towards the TV/computer.
        // Slightly elevated and stepped back into the room entrance/stairs threshold.
        // Facing generally towards the TV, not an extreme diagonal isometric view.
        camStartPos.set(
          targetWorldLookAt.x + 0.45,
          targetWorldLookAt.y + 0.85,
          targetWorldLookAt.z + 3.4
        );

        camera.position.copy(camStartPos);
        camera.lookAt(targetWorldLookAt);

        isSceneReady = true;
        setIsLoaded(true);

        // Start video immediately muted so texture is ready
        video.play().catch(() => {});
      },
      undefined,
      (err) => {
        console.error('Error loading room GLB:', err);
      }
    );

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
        // As camera approaches straight-on Z axis, the orientation automatically aligns perpendicular to the screen!
        const targetLook = targetWorldLookAt.clone();

        // High quality lerp for butter-smooth momentum
        currentCamPos.lerp(targetPos, 0.09);
        currentLookAt.lerp(targetLook, 0.09);

        camera.position.copy(currentCamPos);
        camera.lookAt(currentLookAt);

        // Dynamic TV Screen Glow increases as you approach
        const glowIntensity = THREE.MathUtils.lerp(0.4, 2.2, smoothProgress);
        tvGlowLight.intensity = glowIntensity;

        // Manage video play/pause lifecycle
        if (sp >= 0.02 && sp <= 0.98) {
          if (video.paused) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
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
      renderer.dispose();
      screenMaterial.dispose();
      screenGeometry.dispose();
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
      className="relative w-full min-h-[300vh] bg-[#050505]"
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
