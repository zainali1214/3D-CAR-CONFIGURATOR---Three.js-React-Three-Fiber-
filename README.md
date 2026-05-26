# 🏎️ Mercedes-Benz Maybach 3D Cinematic Configurator

> **Premium Interactive 3D Automotive Showcase** | Cinematic Experience | Production-Grade Code Architecture

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://mercedes-three-phi.vercel.app/)

A full-featured, AAA-showroom standard Mercedes-Benz Maybach 3D configurator built with **React**, **Three.js (React Three Fiber)**, and premium **GSAP motion pipelines**. Experience luxury automotive design with real-time interactive engineering optimizations running at a locked **60 FPS**.

🔗 **Live Deployment:** [mercedes-three-phi.vercel.app](https://mercedes-three-phi.vercel.app/)

---

## ✨ Production-Tier Features

### 🎬 Cinematic Presentation & Reveal
- **Matrix Headlight Startup Sequence:** A sequential, staggered laser-breathing warm-up effect (simulating matrix laser headlights warming up) followed by an LED sweep cutting through volumetric fog.
- **Luxury Intro Sequence:** A synchronized black screen fade-in revealing a glassmorphic Mercedes-Benz logo accompanied by procedurally synthesized ambient audio.

### 🚗 Intelligent Mechanical Animations
- **Recursive Mesh Traversal Logic:** Built-in deep-traversal loop (`scene.traverse`) inside the 3D runtime that dynamically scans the 78MB `mercedes.glb` model files for custom component naming conventions (`door`, `hood`, `spoiler`, `wheel`) to automatically bind them to interactive events.
- **Robust Smart Fallback Engine:** If the uploaded GLB model properties lack distinct, isolated sub-meshes for animation, the UI gracefully suppresses broken states and switches to an immersive **Cinematic Camera Peek** (zooming smoothly *through* glass panels into a high-fidelity interior camera mode).
- **Aerodynamics Test Mode:** Coordinated camera tracks focusing on the rear decklid while driving a mechanical trunk spoiler lift-and-tilt timeline.
- **Dynamic Drive Showcase:** A dedicated evaluation state that hides user interface modules, loops real-time tire mesh angular rotations, and offsets floor reflection texture coordinates to mock a high-speed highway tracking shot.
- **X-Ray Chassis Mode:** Toggles the outer car body paint opacity down to `0.15` smoothly while altering materials into an emissive blueprint edge-glow, exposing underlying interior and structural components.

### 🎨 Customization & Audio Engineering
- **Luxury Paint Palettes:** Instantaneous, fluid updates across four premium finishes (**Obsidian Black**, **Polar White**, **Brilliant Blue Metallic**, and **AMG Silver**) using GSAP color-interpolation states that preserve material properties like metalness, roughness, clearcoat, and environment mappings.
- **Procedural Sound Engine:** Leverages the native Web Audio API to synthesize microtonal click interactions (800-600Hz pulses) and sweep audio frequencies without downloading massive static external `.mp3` or `.wav` dependencies.

---

## 🛠️ Technology Stack

### Core Runtime
- **React 18** - Component-driven UI architecture
- **Vite** - High-speed module bundling and local dev serving
- **Three.js** - Low-level WebGL graphics compilation wrapper
- **@react-three/fiber (R3F)** - Declarative React renderer for Three.js
- **@react-three/drei** - Specialized 3D utility helpers and control setups

### Shaders & Post-Processing Pipeline
- **@react-three/postprocessing** - Dedicated GPU rendering passes:
  - **SSAO:** Screen Space Ambient Occlusion for micro-shadow mapping definitions.
  - **Bloom:** High-intensity glowing thresholds to amplify matrix lasers.
  - **Depth of Field (DoF):** Cinematic focus blurring based on spatial distance.
  - **Vignette:** High-end studio vignette shadowing framing the viewports.

### Motion Engines
- **GSAP 3 (GreenSock)** - High-performance timeline sequences and camera tracks
- **Framer Motion** - Fluid React animations handling DOM-based glassmorphism menus

---

## 📁 Project Structure

```text
mercedes-configurator/
├── public/
│   └── models/
│       └── mercedes.glb           # Target folder for your 78MB asset
├── src/
│   ├── components/
│   │   ├── MercedesModel.jsx      # Traversal loops, materials, & GSAP pipelines
│   │   ├── AmbientScene.jsx       # Volumetric fog & speed-drifting dust arrays
│   │   ├── ControlPanel.jsx       # Interactive Glassmorphic DOM dashboard
│   │   └── ControlPanel.css       # Clean layout styling (Garet & Inter font maps)
│   ├── App.jsx                    # Root wrapper, lighting arrays, & Postprocessing
│   ├── App.css                    # Main interface layout resets
│   └── main.jsx                   # React mounting anchor
├── index.html                     # HTML Template document
├── vite.config.js                 # Dev server parameters and asset exclusions
└── package.json                   # Project dependency definitions
