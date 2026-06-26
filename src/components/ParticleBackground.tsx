import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Sliders, Play, RotateCw, Wind, Zap, Network, Box, Activity } from 'lucide-react';

type AnimationMode = 'drift' | 'warp' | 'vortex';

interface ParticleBackgroundProps {
  activeTheme?: {
    id: string;
    name: string;
    icon: string;
    colors: {
      bgPrimary: string;
      bgSecondary: string;
      bgCard: string;
      bgAccentLight: string;
      borderColor: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      accentPrimary: string;
      accentPrimaryHover: string;
      accentSecondary: string;
      accentGlow: string;
      gradientFrom: string;
      gradientTo: string;
      isLight: boolean;
    };
  };
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ activeTheme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<AnimationMode>('drift');
  const [speed, setSpeed] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  
  // Custom interactive features
  const [enablePlexus, setEnablePlexus] = useState<boolean>(true);
  const [enableAbstractShape, setEnableAbstractShape] = useState<boolean>(true);
  const [meshType, setMeshType] = useState<'torusKnot' | 'icosahedron' | 'octahedron'>('torusKnot');

  // Keep refs of Three.js instances to update on state changes
  const pointsRef = useRef<THREE.Points | null>(null);
  const lineSegmentsRef = useRef<THREE.LineSegments | null>(null);
  const abstractMeshRef = useRef<THREE.Mesh | null>(null);
  
  // Settings sync refs
  const modeRef = useRef<AnimationMode>('drift');
  const speedRef = useRef<number>(1);
  const mouseRef = useRef({ x: 0, y: 0 });
  const plexusRef = useRef<boolean>(true);
  const abstractShapeRef = useRef<boolean>(true);
  const meshTypeRef = useRef<'torusKnot' | 'icosahedron' | 'octahedron'>('torusKnot');

  // Sync state values to animation loop refs
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { plexusRef.current = enablePlexus; }, [enablePlexus]);
  useEffect(() => { abstractShapeRef.current = enableAbstractShape; }, [enableAbstractShape]);
  useEffect(() => { meshTypeRef.current = meshType; }, [meshType]);

  // Effect to handle dynamic color updates when theme changes
  useEffect(() => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;
    const geometry = points.geometry as THREE.BufferGeometry;
    const colorsAttr = geometry.attributes.color as THREE.BufferAttribute;
    if (!colorsAttr) return;

    const count = colorsAttr.count;
    const tempColor = new THREE.Color();
    const colorFrom = new THREE.Color(activeTheme?.colors?.gradientFrom || '#ec4899');
    const colorTo = new THREE.Color(activeTheme?.colors?.gradientTo || '#06b6d4');

    for (let i = 0; i < count; i++) {
      const mixRatio = Math.random();
      tempColor.copy(colorFrom).lerp(colorTo, mixRatio);
      colorsAttr.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);
    }
    colorsAttr.needsUpdate = true;

    // Also update current wireframe mesh color if it exists
    if (abstractMeshRef.current) {
      const meshMat = abstractMeshRef.current.material as THREE.MeshBasicMaterial;
      meshMat.color.set(activeTheme?.colors?.accentPrimary || '#ec4899');
    }
  }, [activeTheme]);

  // Build or update abstract geometry mesh
  useEffect(() => {
    if (!abstractMeshRef.current) return;
    const mesh = abstractMeshRef.current;
    
    // Dispose previous geometry
    mesh.geometry.dispose();

    if (meshType === 'torusKnot') {
      mesh.geometry = new THREE.TorusKnotGeometry(25, 6, 120, 16);
    } else if (meshType === 'icosahedron') {
      mesh.geometry = new THREE.IcosahedronGeometry(35, 1);
    } else {
      mesh.geometry = new THREE.OctahedronGeometry(35, 1);
    }
  }, [meshType]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup with dynamic color
    const scene = new THREE.Scene();
    const themeBg = activeTheme?.colors?.bgPrimary || '#020617';
    scene.fog = new THREE.FogExp2(themeBg, 0.0022);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1200);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create custom soft circle texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createCircleTexture();

    // 1. Primary Nebula Particles Geometry (1000 items)
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const colorFrom = new THREE.Color(activeTheme?.colors?.gradientFrom || '#ec4899');
    const colorTo = new THREE.Color(activeTheme?.colors?.gradientTo || '#06b6d4');
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 500;
      const y = (Math.random() - 0.5) * 500;
      const z = (Math.random() - 0.5) * 500;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const mixRatio = Math.random();
      tempColor.copy(colorFrom).lerp(colorTo, mixRatio);
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.5,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // 2. Constellation Plexus Nodes (200 particles for line connections)
    const plexusCount = 150;
    const plexusGeometry = new THREE.BufferGeometry();
    const plexusPositions = new Float32Array(plexusCount * 3);
    const plexusVelocities = new Float32Array(plexusCount * 3);

    for (let i = 0; i < plexusCount; i++) {
      plexusPositions[i * 3] = (Math.random() - 0.5) * 350;
      plexusPositions[i * 3 + 1] = (Math.random() - 0.5) * 350;
      plexusPositions[i * 3 + 2] = (Math.random() - 0.5) * 350;

      // Random slow velocity
      plexusVelocities[i * 3] = (Math.random() - 0.5) * 0.4;
      plexusVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      plexusVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }

    plexusGeometry.setAttribute('position', new THREE.BufferAttribute(plexusPositions, 3));

    const plexusPointsMat = new THREE.PointsMaterial({
      size: 3.5,
      color: new THREE.Color(activeTheme?.colors?.accentSecondary || '#06b6d4'),
      map: particleTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.95
    });

    const plexusPoints = new THREE.Points(plexusGeometry, plexusPointsMat);
    scene.add(plexusPoints);

    // Plexus Line Segments Connection setup
    const maxConnections = 250;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      linewidth: 1,
      opacity: 0.4
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);
    lineSegmentsRef.current = lineSegments;

    // 3. Abstract 3D Sculpture Geometry
    let shapeGeo;
    if (meshTypeRef.current === 'torusKnot') {
      shapeGeo = new THREE.TorusKnotGeometry(25, 6, 120, 16);
    } else if (meshTypeRef.current === 'icosahedron') {
      shapeGeo = new THREE.IcosahedronGeometry(35, 1);
    } else {
      shapeGeo = new THREE.OctahedronGeometry(35, 1);
    }

    const shapeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(activeTheme?.colors?.accentPrimary || '#ec4899'),
      wireframe: true,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending
    });

    const abstractMesh = new THREE.Mesh(shapeGeo, shapeMat);
    // Position abstract shape offset slightly for a modern asymmetrical composition
    abstractMesh.position.set(45, 15, -40);
    scene.add(abstractMesh);
    abstractMeshRef.current = abstractMesh;

    // Input handlers
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseRef.current.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation variables
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const currentMode = modeRef.current;
      const currentSpeed = speedRef.current;
      const isPlexusActive = plexusRef.current;
      const isAbstractActive = abstractShapeRef.current;

      // Mouse Parallax easing
      const targetCamX = mouseRef.current.x * 35;
      const targetCamY = mouseRef.current.y * 35;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Rotate/Animate the Abstract Sculpture
      if (abstractMesh) {
        if (isAbstractActive) {
          abstractMesh.visible = true;
          abstractMesh.rotation.y = elapsedTime * 0.12 * currentSpeed;
          abstractMesh.rotation.x = elapsedTime * 0.08 * currentSpeed;
          // Floating vertical orbit path
          abstractMesh.position.y = 15 + Math.sin(elapsedTime * 0.4) * 12;
        } else {
          abstractMesh.visible = false;
        }
      }

      // Handle Plexus Nodes Movement & Constellation Drawing
      if (plexusPoints) {
        const plexusPosAttr = plexusGeometry.attributes.position as THREE.BufferAttribute;
        const plexusPositionsArr = plexusPosAttr.array as Float32Array;

        // Dynamic update plexus node coords
        for (let i = 0; i < plexusCount; i++) {
          const idx = i * 3;
          // Apply velocity
          plexusPositionsArr[idx] += plexusVelocities[idx] * currentSpeed;
          plexusPositionsArr[idx + 1] += plexusVelocities[idx + 1] * currentSpeed;
          plexusPositionsArr[idx + 2] += plexusVelocities[idx + 2] * currentSpeed;

          // Wrap boundaries
          if (Math.abs(plexusPositionsArr[idx]) > 200) plexusVelocities[idx] *= -1;
          if (Math.abs(plexusPositionsArr[idx + 1]) > 200) plexusVelocities[idx + 1] *= -1;
          if (Math.abs(plexusPositionsArr[idx + 2]) > 200) plexusVelocities[idx + 2] *= -1;
        }
        plexusPosAttr.needsUpdate = true;

        // Connection Lines Computation
        if (isPlexusActive && lineSegments) {
          lineSegments.visible = true;
          const linePosArr = lineGeometry.attributes.position.array as Float32Array;
          const lineColArr = lineGeometry.attributes.color.array as Float32Array;
          let connectionIndex = 0;

          const activeColor = new THREE.Color(activeTheme?.colors?.accentPrimary || '#ec4899');

          for (let i = 0; i < plexusCount; i++) {
            for (let j = i + 1; j < plexusCount; j++) {
              if (connectionIndex >= maxConnections) break;

              const dx = plexusPositionsArr[i * 3] - plexusPositionsArr[j * 3];
              const dy = plexusPositionsArr[i * 3 + 1] - plexusPositionsArr[j * 3 + 1];
              const dz = plexusPositionsArr[i * 3 + 2] - plexusPositionsArr[j * 3 + 2];
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

              // Draw connection line if distance is small
              if (dist < 48) {
                const alpha = (1.0 - dist / 48) * 0.35; // Thicker lines when closer

                const node1Idx = connectionIndex * 6;
                const node2Idx = node1Idx + 3;

                // Node 1 position
                linePosArr[node1Idx] = plexusPositionsArr[i * 3];
                linePosArr[node1Idx + 1] = plexusPositionsArr[i * 3 + 1];
                linePosArr[node1Idx + 2] = plexusPositionsArr[i * 3 + 2];

                // Node 2 position
                linePosArr[node2Idx] = plexusPositionsArr[j * 3];
                linePosArr[node2Idx + 1] = plexusPositionsArr[j * 3 + 1];
                linePosArr[node2Idx + 2] = plexusPositionsArr[j * 3 + 2];

                // Node 1 Color with Alpha fading
                lineColArr[node1Idx] = activeColor.r * alpha;
                lineColArr[node1Idx + 1] = activeColor.g * alpha;
                lineColArr[node1Idx + 2] = activeColor.b * alpha;

                // Node 2 Color
                lineColArr[node2Idx] = activeColor.r * alpha;
                lineColArr[node2Idx + 1] = activeColor.g * alpha;
                lineColArr[node2Idx + 2] = activeColor.b * alpha;

                connectionIndex++;
              }
            }
          }

          // Clear unused buffer coordinates so dead lines don't persist
          for (let k = connectionIndex; k < maxConnections; k++) {
            const startIdx = k * 6;
            linePosArr[startIdx] = 0;
            linePosArr[startIdx + 1] = 0;
            linePosArr[startIdx + 2] = 0;
            linePosArr[startIdx + 3] = 0;
            linePosArr[startIdx + 4] = 0;
            linePosArr[startIdx + 5] = 0;
          }

          lineGeometry.attributes.position.needsUpdate = true;
          lineGeometry.attributes.color.needsUpdate = true;
        } else {
          lineSegments.visible = false;
        }
      }

      // Handle Primary Nebula Particles Animations
      const positionsArr = geometry.attributes.position.array as Float32Array;

      if (currentMode === 'drift') {
        points.rotation.y = elapsedTime * 0.015 * currentSpeed;
        points.rotation.x = Math.sin(elapsedTime * 0.03) * 0.04 * currentSpeed;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          positionsArr[idx + 1] = originalPositions[idx + 1] + Math.sin(elapsedTime * 0.25 * currentSpeed + originalPositions[idx] * 0.008) * 10;
        }
        geometry.attributes.position.needsUpdate = true;
      } else if (currentMode === 'warp') {
        points.rotation.set(0, 0, 0);

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          // Warp forward along Z axis
          positionsArr[idx + 2] += 2.0 * currentSpeed;

          // Repopulate wrapping boundary
          if (positionsArr[idx + 2] > 250) {
            positionsArr[idx + 2] = -250;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      } else if (currentMode === 'vortex') {
        points.rotation.set(0, 0, 0);

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const x = positionsArr[idx];
          const z = positionsArr[idx + 2];

          const radius = Math.sqrt(x * x + z * z) || 1;
          const angularSpeed = (0.24 / (radius * 0.025 + 1)) * currentSpeed;
          const angle = angularSpeed * 0.04;

          const cos = Math.cos(angle);
          const sin = Math.sin(angle);

          positionsArr[idx] = x * cos - z * sin;
          positionsArr[idx + 2] = x * sin + z * cos;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources correctly
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      plexusGeometry.dispose();
      plexusPointsMat.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      shapeGeo.dispose();
      shapeMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  // Kinetic splash trigger
  const triggerBurst = () => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const count = positions.length / 3;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = positions[idx];
      const y = positions[idx + 1];
      const z = positions[idx + 2];
      const len = Math.sqrt(x * x + y * y + z * z) || 1;

      // Force radial push
      positions[idx] += (x / len) * 45;
      positions[idx + 1] += (y / len) * 45;
      positions[idx + 2] += (z / len) * 45;
    }
    geometry.attributes.position.needsUpdate = true;
  };

  const isThemeLight = activeTheme?.colors?.isLight || false;
  const themeBgColor = activeTheme?.colors?.bgPrimary || '#020617';

  // Dynamic style parameters
  const overlayGradient = isThemeLight
    ? `radial-gradient(circle at center, rgba(250,249,251,0.1) 0%, ${themeBgColor}f0 100%)`
    : `radial-gradient(circle at center, rgba(2,6,12,0.1) 0%, ${themeBgColor}fa 100%)`;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      
      {/* Dynamic Render Surface container */}
      <div 
        ref={containerRef} 
        style={{ backgroundColor: themeBgColor }}
        className="absolute inset-0 w-full h-full transition-colors duration-500" 
      />

      {/* Extreme readability vignette overlay */}
      <div 
        style={{ backgroundImage: overlayGradient }}
        className="absolute inset-0 pointer-events-none transition-all duration-500" 
      />

      {/* Premium control console overlay panel */}
      <div className="absolute bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="btn-3d-controls"
          className="bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-800/80 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-semibold shadow-2xl backdrop-blur-xl transition-all cursor-pointer hover:border-indigo-500/35 group active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
          <span>3D Engine Sandbox</span>
        </button>

        {isOpen && (
          <div className="mt-3 bg-slate-900/95 border border-slate-850 p-5 rounded-2xl w-64 shadow-2xl backdrop-blur-xl space-y-4 text-xs select-none animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-extrabold text-slate-100 uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Engine Console v2.0</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-[10px]"
              >
                ✕
              </button>
            </div>

            {/* Matrix mode selections */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-bold uppercase tracking-wider text-[8px] flex items-center gap-1">
                <Activity className="w-3 h-3 text-pink-500" />
                <span>Motion Geometry</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'drift' as const, label: 'Drift', icon: <RotateCw className="w-3 h-3" /> },
                  { id: 'warp' as const, label: 'Warp', icon: <Wind className="w-3 h-3" /> },
                  { id: 'vortex' as const, label: 'Vortex', icon: <Play className="w-3 h-3" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-[9px] font-bold cursor-pointer transition-all ${
                      mode === item.id
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400'
                        : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.icon}
                    <span className="mt-1">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive toggles */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-bold uppercase tracking-wider text-[8px] flex items-center gap-1">
                <Network className="w-3 h-3 text-cyan-400" />
                <span>Constellation Network</span>
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setEnablePlexus(true)}
                  className={`flex-1 py-1 px-2 rounded-lg border text-[9px] font-bold cursor-pointer transition-all ${
                    enablePlexus
                      ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                      : 'bg-slate-950/40 border-slate-850 text-slate-500'
                  }`}
                >
                  Enabled
                </button>
                <button
                  onClick={() => setEnablePlexus(false)}
                  className={`flex-1 py-1 px-2 rounded-lg border text-[9px] font-bold cursor-pointer transition-all ${
                    !enablePlexus
                      ? 'bg-slate-800 border-slate-750 text-slate-400'
                      : 'bg-slate-950/40 border-slate-850 text-slate-500'
                  }`}
                >
                  Disabled
                </button>
              </div>
            </div>

            {/* Abstract Wireframe shape toggles */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-bold uppercase tracking-wider text-[8px] flex items-center gap-1">
                <Box className="w-3 h-3 text-emerald-400" />
                <span>3D Abstract Sculpture</span>
              </label>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setEnableAbstractShape(!enableAbstractShape)}
                  className={`flex-1 py-1.5 px-2 rounded-lg border text-[9px] font-bold cursor-pointer transition-all ${
                    enableAbstractShape
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                      : 'bg-slate-950/40 border-slate-850 text-slate-500'
                  }`}
                >
                  {enableAbstractShape ? 'Visible' : 'Hidden'}
                </button>
                
                {enableAbstractShape && (
                  <select
                    value={meshType}
                    onChange={(e) => setMeshType(e.target.value as any)}
                    className="bg-slate-950 border border-slate-850 text-[9px] text-slate-300 font-bold rounded-lg px-2 py-1 outline-none"
                  >
                    <option value="torusKnot">Torus Knot</option>
                    <option value="icosahedron">Icosahedron</option>
                    <option value="octahedron">Octahedron</option>
                  </select>
                )}
              </div>
            </div>

            {/* Velocity sliders */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400 text-[8px] font-bold uppercase tracking-wider">
                <span>Speed Acceleration</span>
                <span className="font-mono text-indigo-400">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-400 h-1 bg-slate-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* Click to trigger particle shockwave */}
            <button
              onClick={triggerBurst}
              className="w-full bg-slate-950 hover:bg-slate-850 text-[9px] text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 font-extrabold py-2.5 rounded-xl transition-all uppercase tracking-widest cursor-pointer hover:shadow-[0_0_15px_rgba(99,102,241,0.18)] flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Trigger Kinetic Burst</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
