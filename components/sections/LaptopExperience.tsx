'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { anaghaContent } from '@/content/anagha';

export default function LaptopExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll tracking across pinned viewport
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const trackHeight = container.offsetHeight - window.innerHeight;
      if (trackHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / trackHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js 3D Studio & Laptop Initialization
  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    let width = canvasContainer.clientWidth;
    let height = canvasContainer.clientHeight;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const initialCamZ = isMobile ? 3.9 : isTablet ? 3.2 : 2.75;
    camera.position.set(0, 0.38, initialCamZ);
    camera.lookAt(0, 0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    canvasContainer.appendChild(renderer.domElement);

    // 2. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.85);
    scene.add(ambientLight);

    // Overhead Key Spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 3.2, 15, Math.PI / 4, 0.45, 1.2);
    spotLight.position.set(0, 4.5, 2.5);
    spotLight.target.position.set(0, 0, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Cool Sculpting Rim Light from Rear
    const rimLight = new THREE.DirectionalLight(0x8cb5e0, 1.4);
    rimLight.position.set(-2, 3, -3);
    scene.add(rimLight);

    // Warm Accent Fill
    const warmFill = new THREE.DirectionalLight(0xce6b33, 0.65);
    warmFill.position.set(3, 1, 2);
    scene.add(warmFill);

    // 3. HTML Video Element & Video Texture
    // Using WhatsApp Video 2026-09-22 at 2.00.15 PM.mp4 (copied as neil-momo-walkthrough.mp4)
    const video = document.createElement('video');
    video.src = anaghaContent.webDesign.videoSrc;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    videoElementRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    // Dedicated Screen Quad Material mapped directly on display glass
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: videoTexture,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: videoTexture,
      emissiveIntensity: 0.0,
      roughness: 0.18,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    // 4. Load GLB Laptop Model
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    let lidNode: THREE.Object3D | null = null;
    let screenMeshNode: THREE.Mesh | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/laptop.glb',
      (gltf) => {
        const model = gltf.scene;

        model.traverse((child) => {
          if (child.name === 'Laptop007') {
            lidNode = child;
          }
          if (
            child.name.includes('Material006') ||
            (child instanceof THREE.Mesh && child.material && (child.material as THREE.Material).name === 'Material.006')
          ) {
            screenMeshNode = child as THREE.Mesh;
          }
        });

        // Remap screenMesh UVs directly on the exact 3D screen glass
        if (screenMeshNode) {
          const geom = screenMeshNode.geometry;
          const pos = geom.attributes.position;
          const uv = geom.attributes.uv;
          const minY = -0.97579, maxY = 0.97589;
          const minZ = 0.07349, maxZ = 1.28218;

          for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i);
            const z = pos.getZ(i);
            const u = (maxY - y) / (maxY - minY);
            const v = (z - minZ) / (maxZ - minZ);
            uv.setXY(i, u, v);
          }
          uv.needsUpdate = true;
          screenMeshNode.material = screenMaterial;
        }

        if (lidNode) {
          lidNode.rotation.y = 1.57; // Closed on load
        }

        model.position.set(-0.347, -0.548, 0);
        const scale = isMobile ? 0.78 : isTablet ? 0.88 : 0.98;
        laptopGroup.scale.set(scale, scale, scale);
        laptopGroup.position.set(0, -0.15, 0);

        laptopGroup.add(model);
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.error('Error loading laptop.glb:', err);
      }
    );

    // 5. Animation Loop driven by Scroll Progress
    let animationFrameId: number;
    let currentLidRotY = 1.57;
    let currentEmissive = 0.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Get latest scroll progress
      const container = containerRef.current;
      let sp = 0;
      if (container) {
        const rect = container.getBoundingClientRect();
        const trackHeight = container.offsetHeight - window.innerHeight;
        if (trackHeight > 0) {
          sp = Math.min(Math.max(-rect.top / trackHeight, 0), 1);
        }
      }

      // Spotlight intensity
      const spotIntensity = THREE.MathUtils.lerp(0.8, 3.4, Math.min(sp / 0.35, 1));
      spotLight.intensity = spotIntensity;

      // Phase 1 (0.15 to 0.45): Lid smoothly opens in 3D
      let targetLidY = 1.57;
      if (sp > 0.15) {
        const openProgress = Math.min(Math.max((sp - 0.15) / 0.30, 0), 1);
        const smoothOpen = openProgress * openProgress * (3 - 2 * openProgress);
        targetLidY = THREE.MathUtils.lerp(1.57, -0.12, smoothOpen);
      }
      currentLidRotY = THREE.MathUtils.lerp(currentLidRotY, targetLidY, 0.1);
      if (lidNode) {
        lidNode.rotation.y = currentLidRotY;
      }

      // Phase 2 (0.35 to 0.55): Screen illuminates
      let targetEmissive = 0.0;
      if (sp > 0.30) {
        const illumProgress = Math.min(Math.max((sp - 0.30) / 0.20, 0), 1);
        targetEmissive = THREE.MathUtils.lerp(0.0, 1.0, illumProgress);
      }
      currentEmissive = THREE.MathUtils.lerp(currentEmissive, targetEmissive, 0.1);
      screenMaterial.emissiveIntensity = currentEmissive;

      // Phase 3 (0.45 to 0.85): Camera zooms forward into the screen!
      // Room -> Camera moves forward -> Computer becomes focus -> Screen fills view
      if (sp > 0.35) {
        const zoomProgress = Math.min(Math.max((sp - 0.35) / 0.45, 0), 1);
        const smoothZoom = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);

        const initZ = isMobile ? 3.9 : isTablet ? 3.2 : 2.75;
        const closeZ = isMobile ? 1.45 : 1.02; // Zooms much closer so screen fills 70-80% of viewport cleanly
        const curZ = THREE.MathUtils.lerp(initZ, closeZ, smoothZoom);

        const initY = 0.38;
        const closeY = 0.08; // Centers screen directly in viewport
        const curY = THREE.MathUtils.lerp(initY, closeY, smoothZoom);

        camera.position.set(0, curY, curZ);
        camera.lookAt(0, THREE.MathUtils.lerp(0.05, 0.08, smoothZoom), 0);
      } else {
        camera.position.set(0, 0.38, initialCamZ);
        camera.lookAt(0, 0.05, 0);
      }

      // Video playback control: Play when lid is opening / opened
      if (sp >= 0.20 && sp <= 0.92) {
        if (video.paused) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      } else {
        if (!video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      }

      // Subtle float
      const targetGroupRotY = Math.PI / 2 + Math.sin(Date.now() * 0.0008) * 0.015;
      laptopGroup.rotation.y = THREE.MathUtils.lerp(laptopGroup.rotation.y, targetGroupRotY, 0.05);

      renderer.render(scene, camera);
    };

    animate();

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      screenMaterial.dispose();
      videoTexture.dispose();
      video.pause();
      video.src = '';
      if (renderer.domElement && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  const toggleSound = () => {
    const video = videoElementRef.current;
    if (!video) return;
    const nextState = !isMuted;
    video.muted = nextState;
    setIsMuted(nextState);
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  const isDarkPhase = scrollProgress > 0.08 && scrollProgress < 0.95;
  const isZoomedIn = scrollProgress >= 0.55;

  return (
    <section
      id="laptop-experience"
      ref={containerRef}
      className="relative w-full h-[320vh] bg-transparent"
    >
      {/* Pinned Viewport Stage */}
      <div
        className={`sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 ${
          isDarkPhase ? 'bg-[#0A0A09] text-[#F3EFE6]' : 'bg-[#FBF9F5] text-ink'
        }`}
      >
        {/* Editorial Studio Top Header */}
        <div className="relative z-20 mx-auto w-full max-w-7xl pt-8 sm:pt-10 px-6 md:px-12 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-saffron">
              08 · Web Design &amp; Development
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mt-1">
              Neil &amp; Momo Website Case Study
            </h2>
          </div>

          <div className="flex items-center space-x-4 mt-3 sm:mt-0 text-xs font-mono text-white/50">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="inline-flex items-center space-x-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Walkthrough Audio"
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5 text-white/70" /> : <Volume2 className="h-3.5 w-3.5 text-saffron" />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            <a
              href={anaghaContent.webDesign.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-saffron hover:underline underline-offset-4"
            >
              <span>Visit Live Store</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
          <div
            ref={canvasContainerRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          />

          {/* Contextual Overlay: Positioned on the LEFT SIDE outside the laptop screen */}
          <div
            className={`absolute left-6 sm:left-10 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-700 ${
              isZoomedIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="max-w-[280px] sm:max-w-xs md:max-w-sm pointer-events-auto bg-black/85 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-saffron font-medium">
                  Real Storefront Walkthrough
                </span>
                <span className="text-[11px] font-mono text-white/50">
                  neilandmomo.com
                </span>
              </div>

              <p className="text-xs text-white/75 leading-relaxed font-light">
                {anaghaContent.webDesign.description}
              </p>

              <div className="flex items-center justify-between pt-1">
                <a
                  href={anaghaContent.webDesign.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 rounded-full bg-saffron px-4 py-1.5 text-xs font-medium text-white hover:bg-saffron/90 transition-colors"
                >
                  <span>Visit Live Store</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
                <span className="text-[10px] font-mono text-white/40">
                  Scroll to continue
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Track */}
        <div className="relative z-20 mx-auto w-full max-w-7xl pb-6 px-6 md:px-12 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-white/40">
          <span>Camera zooms into screen as you scroll</span>
          <span>Actual Screen Recording: neilandmomo.com</span>
        </div>

      </div>
    </section>
  );
}