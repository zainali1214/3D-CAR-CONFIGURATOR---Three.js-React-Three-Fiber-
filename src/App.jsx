import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useProgress,
  Html,
  MeshReflectorMaterial,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  N8AO,
  ToneMapping,
  Vignette,
} from '@react-three/postprocessing';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';

import MercedesModel from './components/MercedesModel';
import CinematicIntro from './components/CinematicIntro';
import ControlPanel from './components/ControlPanel';
import AmbientScene from './components/AmbientScene';
import './App.css';

/* ──────────────────────────────────────────────
   Constants
   ────────────────────────────────────────────── */
const MERCEDES_COLORS = [
  { name: 'Obsidian Black', hex: '#1a1a2e' },
  { name: 'Polar White', hex: '#e8e6e1' },
  { name: 'Brilliant Blue', hex: '#1b3a5c' },
  { name: 'AMG Silver', hex: '#8c8c8c' },
];

const CAMERA_PRESETS = {
  showcase: { position: [6, 3, 6], target: [0, 0.5, 0] },
  wheels: { position: [3, 0.5, 3], target: [0, 0.3, 0] },
  front: { position: [0, 1.5, 6], target: [0, 0.8, 0] },
  interior: { position: [0.5, 1.8, 0.3], target: [0, 1.2, 1] },
  engine: { position: [0, 1.8, 3.5], target: [0, 0.7, 1.2] },
};

/* ──────────────────────────────────────────────
   Loader – luxury loading screen
   ────────────────────────────────────────────── */
function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="loader-container">
        <div className="loader-logo">
          <span className="loader-star">✦</span>
          <h1 className="loader-title">MERCEDES-BENZ</h1>
          <p className="loader-subtitle">Engineered to perfection</p>
        </div>

        <div className="loader-bar-track">
          <div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="loader-percent">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

/* ──────────────────────────────────────────────
   ErrorBoundary – handles canvas & scene crashes gracefully
   ────────────────────────────────────────────── */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught scene crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#050505',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif",
          zIndex: 10000,
          padding: '24px',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '3rem', marginBottom: '16px', filter: 'drop-shadow(0 0 10px rgba(255,100,100,0.4))' }}>⚠️</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Experience Initialization Failed</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '480px', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
            {this.state.error?.message || "An unexpected error occurred while setting up the 3D studio environment."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'transform 0.2s ease'
            }}
          >
            Reload Studio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ──────────────────────────────────────────────
   CameraRig – animates camera on mode change
   ────────────────────────────────────────────── */
function CameraRig({ cameraMode, controlsRef }) {
  const { camera } = useThree();

  useEffect(() => {
    const preset = CAMERA_PRESETS[cameraMode];
    if (!preset || !controlsRef.current) return;

    const controls = controlsRef.current;

    gsap.to(camera.position, {
      x: preset.position[0],
      y: preset.position[1],
      z: preset.position[2],
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => controls.update(),
    });

    gsap.to(controls.target, {
      x: preset.target[0],
      y: preset.target[1],
      z: preset.target[2],
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => controls.update(),
    });
  }, [cameraMode, camera, controlsRef]);

  return null;
}

/* ──────────────────────────────────────────────
   App
   ────────────────────────────────────────────── */
export default function App() {
  const [currentColor, setCurrentColor] = useState('#1a1a2e');
  const [introComplete, setIntroComplete] = useState(false);
  const [cameraMode, setCameraMode] = useState('showcase');
  const [doorsOpen, setDoorsOpen] = useState({ left: false, right: false });
  const [engineMode, setEngineMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const controlsRef = useRef(null);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const handleColorChange = useCallback((hex) => {
    setCurrentColor(hex);
  }, []);

  const handleCameraModeChange = useCallback((mode) => {
    setCameraMode(mode);
  }, []);

  const handleToggleDoors = useCallback((side) => {
    setDoorsOpen((prev) => ({ ...prev, [side]: !prev[side] }));
  }, []);

  const handleToggleEngine = useCallback(() => {
    setEngineMode((prev) => !prev);
  }, []);

  /* Mark loading done once the scene is hydrated */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-root">
      <ErrorBoundary>
        {/* ── Cinematic Intro ── */}
        <AnimatePresence>
          {!introComplete && (
            <CinematicIntro onComplete={handleIntroComplete} />
          )}
        </AnimatePresence>

        {/* ── 3D Canvas (always mounted) ── */}
        <Canvas
          camera={{ position: [6, 3, 6], fov: 40 }}
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          style={{ background: '#000', width: '100vw', height: '100vh' }}
        >
          <Suspense fallback={<Loader />}>
            {/* Background & atmosphere */}
            <color attach="background" args={['#000000']} />
            <fog attach="fog" args={['#000000', 15, 30]} />

            {/* ── Lighting Rig ── */}
            {/* Ambient fill */}
            <ambientLight intensity={0.3} />

            {/* Key light */}
            <directionalLight
              position={[5, 8, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize={2048}
              shadow-bias={-0.001}
            />

            {/* Rim light */}
            <directionalLight
              position={[-5, 5, -5]}
              intensity={0.8}
              color="#b0c4de"
            />

            {/* Fill light */}
            <directionalLight
              position={[0, 3, 8]}
              intensity={0.5}
            />

            {/* Back light */}
            <pointLight
              position={[0, 5, -8]}
              intensity={0.6}
              color="#4a6fa5"
            />

            {/* Ground accent */}
            <spotLight
              position={[0, 8, 0]}
              angle={0.6}
              penumbra={1}
              intensity={0.8}
              castShadow
            />

            {/* ── Scene Objects ── */}
            <MercedesModel
              currentColor={currentColor}
              doorsOpen={doorsOpen}
              engineMode={engineMode}
              cameraMode={cameraMode}
            />

            <AmbientScene />

            {/* Contact shadows */}
            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.6}
              scale={20}
              blur={2}
              far={4}
            />

            {/* Environment */}
            <Environment preset="city" background={false} />

            {/* Reflective floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={40}
                roughness={0.8}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.5}
              />
            </mesh>

            {/* Camera rig & controls */}
            <CameraRig cameraMode={cameraMode} controlsRef={controlsRef} />

            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              maxPolarAngle={Math.PI / 2.1}
              minPolarAngle={0.2}
              minDistance={3}
              maxDistance={12}
              enableDamping
              dampingFactor={0.05}
              autoRotate={cameraMode === 'showcase'}
              autoRotateSpeed={0.5}
            />

            {/* Post-processing */}
            <EffectComposer>
              <Bloom
                intensity={0.5}
                luminanceThreshold={0.8}
                luminanceSmoothing={0.9}
              />
              {/* <N8AO aoRadius={0.5} intensity={1} /> */}
              <Vignette eskil={false} offset={0.1} darkness={0.8} />
              <ToneMapping />
            </EffectComposer>
          </Suspense>
        </Canvas>

        {/* ── UI Overlay (fades in after intro) ── */}
        <AnimatePresence>
          {introComplete && (
            <motion.div
              className="ui-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <ControlPanel
                currentColor={currentColor}
                setCurrentColor={setCurrentColor}
                cameraMode={cameraMode}
                setCameraMode={setCameraMode}
                doorsOpen={doorsOpen}
                setDoorsOpen={setDoorsOpen}
                engineMode={engineMode}
                setEngineMode={setEngineMode}
                colors={MERCEDES_COLORS}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ErrorBoundary>
    </div>
  );
}
