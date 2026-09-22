'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Image from 'next/image';

interface ToolItem {
  id: string;
  name: string;
  shortName: string;
  discipline: string;
  workTitle: string;
  icon: string;
  image: string;
  accent: string;
  details: string;
}

const toolsData: ToolItem[] = [
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    shortName: 'Illustrator',
    discipline: 'Packaging System & Vector Die-Lines',
    workTitle: 'Neil & Momo Botanical Gin Packaging',
    icon: '/assets/tools/tool-ai.svg',
    image: '/assets/projects/neil-momo-01.webp',
    accent: '#FF9A00',
    details: 'Master die-line structures, botanical vector illustrations, and print production standards.',
  },
  {
    id: 'after-effects',
    name: 'Adobe After Effects',
    shortName: 'After Effects',
    discipline: 'Motion Systems & Frame-by-Frame Rhythm',
    workTitle: 'Warrior Deck Cinematic Social Motion',
    icon: '/assets/tools/tool-ae.svg',
    image: '/assets/projects/warrior-deck-01.webp',
    accent: '#9999FF',
    details: '60fps kinetic typography, spatial transition choreography, and audio-synced visual pacing.',
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    shortName: 'Photoshop',
    discipline: 'Master Campaign Color & Visual Art',
    workTitle: 'Multi-Platform Strategic Campaign Creative',
    icon: '/assets/tools/tool-ps.svg',
    image: '/assets/projects/campaign-posts-01.webp',
    accent: '#31A8FF',
    details: 'Precision skin & lighting retouching, multi-layer compositing, and platform color profiles.',
  },
  {
    id: 'figma',
    name: 'Figma',
    shortName: 'Figma',
    discipline: 'Digital Products & Interface Systems',
    workTitle: 'Tripster Studio Interactive Prototype',
    icon: '/assets/tools/tool-figma.svg',
    image: '/assets/projects/tripster-01.webp',
    accent: '#F24E1E',
    details: 'Atomic design token systems, responsive auto-layout frames, and interactive component flows.',
  },
  {
    id: 'wordpress',
    name: 'WordPress & CMS',
    shortName: 'WordPress',
    discipline: 'Content Architecture & Publishing Systems',
    workTitle: 'Editorial Web Framework & Digital Publishing',
    icon: '/assets/tools/tool-wordpress.svg',
    image: '/assets/projects/brand-identity-01.webp',
    accent: '#21759B',
    details: 'Semantic block architecture, search-engine structured data, and high-performance digital delivery.',
  },
];

export default function LaptopExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const activeToolIndexRef = useRef(activeToolIndex);
  const screenMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    activeToolIndexRef.current = activeToolIndex;
  }, [activeToolIndex]);

  // Scroll tracking across the pinned viewport track
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const trackHeight = container.offsetHeight - window.innerHeight;
      if (trackHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / trackHeight, 0), 1);
      setScrollProgress(progress);

      // Map progress in range [0.55, 0.95] to active tool index [0..4]
      if (progress >= 0.55 && progress < 0.95) {
        const toolFraction = (progress - 0.55) / 0.40;
        const newIndex = Math.min(Math.floor(toolFraction * toolsData.length), toolsData.length - 1);
        if (newIndex !== activeToolIndexRef.current) {
          setActiveToolIndex(newIndex);
        }
      }
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
    const camZ = isMobile ? 3.9 : isTablet ? 3.2 : 2.75;
    camera.position.set(0, 0.38, camZ);
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

    // 3. High-Definition Screen Texture Generation
    const screenTextureCanvases: HTMLCanvasElement[] = [];
    const screenTextures: THREE.CanvasTexture[] = [];

    // Dedicated Screen Quad Material
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.0,
      roughness: 0.18,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    screenMaterialRef.current = screenMaterial;

    // Preload work images and draw them onto 16:10 texture canvases
    toolsData.forEach((tool, idx) => {
      const sCanvas = document.createElement('canvas');
      sCanvas.width = 1600;
      sCanvas.height = 1000;
      const sCtx = sCanvas.getContext('2d');

      const texture = new THREE.CanvasTexture(sCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      screenTextureCanvases.push(sCanvas);
      screenTextures.push(texture);

      if (idx === 0) {
        screenMaterial.map = texture;
        screenMaterial.emissiveMap = texture;
      }

      if (sCtx) {
        const renderScreenContent = (imageObj?: HTMLImageElement) => {
          // Studio screen dark editorial base
          sCtx.fillStyle = '#141312';
          sCtx.fillRect(0, 0, sCanvas.width, sCanvas.height);

          // Minimal editorial app topbar
          sCtx.fillStyle = '#1E1D1B';
          sCtx.fillRect(0, 0, sCanvas.width, 54);

          // Window controls dots (Apple minimal)
          sCtx.fillStyle = '#FF5F56';
          sCtx.beginPath();
          sCtx.arc(32, 27, 6, 0, Math.PI * 2);
          sCtx.fill();
          sCtx.fillStyle = '#FFBD2E';
          sCtx.beginPath();
          sCtx.arc(52, 27, 6, 0, Math.PI * 2);
          sCtx.fill();
          sCtx.fillStyle = '#27C93F';
          sCtx.beginPath();
          sCtx.arc(72, 27, 6, 0, Math.PI * 2);
          sCtx.fill();

          // Minimal Header Text
          sCtx.fillStyle = '#DCD8D0';
          sCtx.font = '500 17px "Cormorant Garamond", Georgia, serif';
          sCtx.textAlign = 'center';
          sCtx.fillText(tool.name.toUpperCase() + ' · ' + tool.discipline.toUpperCase(), sCanvas.width / 2, 34);

          // Work title watermark in status bar
          sCtx.fillStyle = '#78746D';
          sCtx.font = '400 12px monospace';
          sCtx.textAlign = 'right';
          sCtx.fillText(tool.workTitle, sCanvas.width - 28, 34);

          // Render image centered in work area with zero overlay boxes
          if (imageObj) {
            const availW = sCanvas.width - 40;
            const availH = sCanvas.height - 54 - 40;
            const imgAspect = imageObj.width / imageObj.height;
            let drawW = availW;
            let drawH = drawW / imgAspect;
            if (drawH > availH) {
              drawH = availH;
              drawW = drawH * imgAspect;
            }
            const drawX = (sCanvas.width - drawW) / 2;
            const drawY = 54 + (availH - drawH) / 2 + 20;

            sCtx.drawImage(imageObj, drawX, drawY, drawW, drawH);
          }

          texture.needsUpdate = true;
          if (screenMaterialRef.current) {
            screenMaterialRef.current.needsUpdate = true;
          }
        };

        // Render placeholder immediately
        renderScreenContent();

        // Load image and re-render
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.src = tool.image;
        img.onload = () => {
          renderScreenContent(img);
        };
      }
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

        // Find lid node and screen mesh
        model.traverse((child) => {
          if (child.name === 'Laptop007') {
            lidNode = child;
          }
          if (child.name.includes('Material006') || (child instanceof THREE.Mesh && child.material && (child.material as THREE.Material).name === 'Material.006')) {
            screenMeshNode = child as THREE.Mesh;
          }
        });

        // Remap screenMesh UVs directly on the exact 3D screen glass!
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
          // Initial state: lid closed flat
          lidNode.rotation.y = 1.57;
        }

        // Center model and orient towards camera
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
    let lastRenderedToolIdx = 0;

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

      // Phase 1 (0.0 to 0.25): Spotlight rises, laptop enters focus
      const spotIntensity = THREE.MathUtils.lerp(0.8, 3.4, Math.min(sp / 0.35, 1));
      spotLight.intensity = spotIntensity;

      // Phase 2 (0.25 to 0.60): Lid smoothly opens in 3D
      // Open target rotation is -0.12 rad (~-7 deg tilt back)
      let targetLidY = 1.57;
      if (sp > 0.20) {
        const openProgress = Math.min(Math.max((sp - 0.20) / 0.35, 0), 1);
        const smoothOpen = openProgress * openProgress * (3 - 2 * openProgress);
        targetLidY = THREE.MathUtils.lerp(1.57, -0.12, smoothOpen);
      }

      currentLidRotY = THREE.MathUtils.lerp(currentLidRotY, targetLidY, 0.1);
      if (lidNode) {
        lidNode.rotation.y = currentLidRotY;
      }

      // Phase 3 (0.45 to 0.65): Screen illuminates
      let targetEmissive = 0.0;
      if (sp > 0.40) {
        const illumProgress = Math.min(Math.max((sp - 0.40) / 0.22, 0), 1);
        targetEmissive = THREE.MathUtils.lerp(0.0, 0.95, illumProgress);
      }
      currentEmissive = THREE.MathUtils.lerp(currentEmissive, targetEmissive, 0.1);
      screenMaterial.emissiveIntensity = currentEmissive;

      // Subtle dynamic float / tilt of the laptop stage
      const targetGroupRotY = Math.PI / 2 + Math.sin(Date.now() * 0.0008) * 0.025;
      laptopGroup.rotation.y = THREE.MathUtils.lerp(laptopGroup.rotation.y, targetGroupRotY, 0.05);

      // Update screen texture when active tool changes
      const currentToolIdx = activeToolIndexRef.current;
      if (currentToolIdx !== lastRenderedToolIdx && screenTextures[currentToolIdx]) {
        screenMaterial.map = screenTextures[currentToolIdx];
        screenMaterial.emissiveMap = screenTextures[currentToolIdx];
        screenMaterial.needsUpdate = true;
        lastRenderedToolIdx = currentToolIdx;
      }

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
      screenTextures.forEach((t) => t.dispose());
      if (renderer.domElement && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeTool = toolsData[activeToolIndex];

  // Stage background darkness transition (#FBF9F5 -> #0A0A09 -> #FBF9F5)
  const isDarkPhase = scrollProgress > 0.08 && scrollProgress < 0.94;

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
              04 · Interactive Creative Suite
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mt-1">
              Digital Workshop &amp; Applied Work
            </h2>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center space-x-3 text-xs font-mono opacity-60">
            <span>3D WORKSTATION</span>
            <span>·</span>
            <span>REAL TIME APPLIED CREATIVE</span>
          </div>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div
          ref={canvasContainerRef}
          className="relative z-10 flex-1 w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Floating Minimal Tool Inspector HUD (Zero Badges, Zero Text Boxes on Artwork) */}
        <div className="relative z-20 mx-auto w-full max-w-7xl pb-8 sm:pb-12 px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/10 pt-5">
            
            {/* Active Tool Meta Information */}
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center space-x-3">
                <div className="relative h-6 w-6 overflow-hidden rounded">
                  <Image
                    src={activeTool.icon}
                    alt={activeTool.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-display text-2xl font-medium tracking-tight">
                  {activeTool.name}
                </h3>
                <span className="text-xs font-mono opacity-50">· {activeTool.discipline}</span>
              </div>

              <p className="text-sm opacity-75 font-light leading-relaxed">
                {activeTool.workTitle}: {activeTool.details}
              </p>
            </div>

            {/* Minimal Interactive Tool Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {toolsData.map((tool, idx) => {
                const isActive = idx === activeToolIndex;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveToolIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center space-x-2 ${
                      isActive
                        ? 'bg-saffron text-white shadow-md scale-105'
                        : isDarkPhase
                        ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        : 'bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink'
                    }`}
                  >
                    <span>0{idx + 1}</span>
                    <span className="hidden sm:inline">{tool.shortName}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}