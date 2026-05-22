# 🏎️ Mercedes-Benz Maybach 3D Cinematic Configurator

> **Premium Interactive 3D Automotive Showcase** | Cinematic Experience | Award-Winning Design

A full-featured, production-grade Mercedes-Benz Maybach 3D configurator built with React, Three.js, and premium visual effects. Experience luxury automotive design like never before.

## ✨ Features

### 🎬 Cinematic Presentation
- **Luxury Intro Sequence** - Black screen fade, Mercedes logo reveal with ambient cinematic audio
- **Studio Lighting System** - Professional key, rim, fill, and back lights for dramatic illumination
- **Postprocessing Effects** - Bloom, SSAO, Depth of Field, Vignette, Tone Mapping
- **Dust Particles & Volumetric Fog** - Atmospheric ambient effects
- **Reflective Floor** - Realistic floor reflections and shadows

### 🎨 Color Configurator
- **4 Luxury Paint Options:**
  - Obsidian Black - Deep metallic black
  - Polar White - Crisp pearl white
  - Brilliant Blue Metallic - Exotic blue
  - AMG Silver - Premium chrome silver
- **Real-time Material Updates** - Metalness, roughness, and clearcoat effects
- **Smooth Color Transitions** - Animated color changes with GSAP

### 🚗 Interactive Controls
- **360° Model Rotation** - Full rotation with smooth inertia
- **Smooth Zoom** - Min/Max zoom limits with responsive feel
- **Touch Support** - Full mobile gesture support
- **Orbit Controls** - Professional camera movement
- **Auto-rotate Showcase Mode** - Cinematic automatic camera movement

### 🚪 Door Controls
- **Left Door Open/Close** - Smooth GSAP animations with realistic hinge movement
- **Right Door Open/Close** - Synchronized animation system
- **Visual State Indicators** - Current door status display

### ⚙️ Engine Check Mode
- **Hood Opening Animation** - Smooth reveal of engine compartment
- **Engine Glow Effect** - Subtle orange glow from engine
- **Cinematic Lighting Activation** - Dynamic lighting adjusts for engine inspection
- **Engine Startup Sound** - Optional audio feedback

### 📷 Multiple Camera Modes
- **Showcase Mode** - Full 360° view with auto-rotation
- **Wheel Close-up** - Detailed wheel inspection
- **Engine Inspection** - Hood open, engine focus
- **Interior View** - Interior camera position

### 🌟 Premium Visual Effects
- **HDR Environment Maps** - Realistic studio reflections
- **Ambient Occlusion** - Detailed shadow definition
- **Cinematic Shadows** - High-resolution shadow mapping
- **Metallic Reflections** - Realistic automotive paint
- **Bloom & Glow** - Luxury lighting effects
- **Depth of Field** - Professional camera effects

### 🎯 User Interface
- **Glassmorphism Design** - Modern frosted glass aesthetic
- **Expandable Control Panels** - Organized feature access
- **Smooth Animations** - Framer Motion transitions
- **Responsive Layout** - Mobile and desktop optimized
- **Hover Effects** - Interactive button feedback
- **Sound Effects** - Click and ambient audio

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn


## 📁 Project Structure

```
mercedes-configurator/
├── components/
│   ├── MercedesModel.jsx          # 3D model loading & material handling
│   ├── CinematicIntro.jsx          # Intro sequence animation
│   ├── CinematicIntro.css          # Intro styling
│   ├── ControlPanel.jsx            # Main control UI
│   ├── ControlPanel.css            # Control panel styling
│   ├── ColorConfigurator.jsx       # Color selection
│   └── AmbientScene.jsx            # Particles & atmosphere
├── App.jsx                         # Main application component
├── App.css                         # Global styling
├── main.jsx                        # React entry point
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
└── package.json                    # Dependencies

public/
└── models/
    └── mercedes.glb                # Mercedes 3D model (your file)
```

## 🎮 Controls

### Mouse Controls
- **Drag** - Rotate the model
- **Scroll** - Zoom in/out
- **Double Click** - Auto rotate toggle

### Touch Controls
- **Drag** - Rotate the model
- **Pinch** - Zoom in/out
- **Two-finger rotate** - Control camera tilt

### Keyboard (Optional)
- `R` - Reset camera
- `E` - Engine check toggle

## 🛠️ Technology Stack

### Core Libraries
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Three.js (r128)** - 3D rendering engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js utilities
- **@react-three/postprocessing** - Post-processing effects

### Animation & Effects
- **GSAP 3** - Advanced animations
- **Framer Motion** - React motion library
- **Postprocessing** - Professional post-effects

### Styling
- **CSS 3** - Modern CSS features
- **Glassmorphism** - Frosted glass UI design
- **CSS Variables** - Dynamic theming

## 🎨 Customization

### Adding New Colors

Edit `components/MercedesModel.jsx`:
```javascript
const MERCEDES_COLORS = {
  'your-color': {
    color: '#hexcode',
    metalness: 0.8,
    roughness: 0.2,
    emissive: '#hexcode',
    name: 'Your Color Name'
  }
};
```

### Adjusting Lighting

Edit `App.jsx` to modify light positions and intensities:
```javascript
<directionalLight
  position={[5, 8, 5]}
  intensity={1.2}
  // ... adjust to taste
/>
```

### Changing Camera Behavior

Edit `App.jsx` OrbitControls props:
```javascript
<OrbitControls
  minDistance={2}    // Closest zoom
  maxDistance={12}   // Farthest zoom
  autoRotateSpeed={3} // Auto-rotation speed
/>
```

## 📊 Performance Optimization

- **LOD (Level of Detail)** - Automatic quality scaling
- **Pixel Ratio Limiting** - `Math.min(window.devicePixelRatio, 2)`
- **Frustum Culling** - Automatic object visibility
- **Texture Optimization** - Compressed formats
- **Lazy Loading** - Model preloading

### Performance Tips
- Monitor with Spline DevTools
- Use Chrome DevTools Three.js Inspector
- Reduce particle count for lower-end devices
- Disable bloom for mobile browsers

## 🔊 Sound Effects

The configurator includes Web Audio API sounds:
- **Ambient Cinematic Audio** - Intro sequence (80-100Hz, 5s fade)
- **Click Sound** - Button interactions (800-600Hz, 0.1s pulse)
- **Engine Sound** - Engine check mode (optional expansion)

Sounds are generated procedurally and don't require audio files.

## ♿ Accessibility

- **Keyboard Navigation** - Full support planned
- **Screen Reader Friendly** - Semantic HTML
- **High Contrast Mode** - Respects `prefers-color-scheme`
- **Reduced Motion** - Respects `prefers-reduced-motion`
- **Touch-Friendly** - Large touch targets
- **Mobile Optimized** - Responsive design

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Fully supported |
| Firefox | Latest | ✅ Fully supported |
| Safari | Latest | ✅ Fully supported |
| Edge | Latest | ✅ Fully supported |
| Mobile Chrome | Latest | ✅ Fully supported |
| Mobile Safari | Latest | ✅ Fully supported |

## 🐛 Troubleshooting

### Model Not Loading
- Verify `public/models/mercedes.glb` exists
- Check file size (should be < 100MB)
- Verify GLB format is valid
- Check browser console for errors

### Performance Issues
- Reduce bloom `intensity` in App.jsx
- Lower particle count in AmbientScene.jsx
- Disable depth of field
- Check GPU usage in DevTools

### Audio Not Playing
- Verify browser allows Web Audio API
- Check browser console for CORS errors
- Some browsers require user interaction first

### Color Not Changing
- Verify material names in GLB file
- Check if materials are applied to correct meshes
- Inspect model with three.js inspector

## 📚 Resources

- **Three.js Documentation** - https://threejs.org/docs/
- **React Three Fiber** - https://docs.pmnd.rs/react-three-fiber/
- **GSAP Docs** - https://gsap.com/docs/
- **Framer Motion** - https://www.framer.com/motion/

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Credits

- **Mercedes-Benz** - Brand inspiration
- **Three.js Community** - 3D rendering foundation
- **Poimandres** - React Three Fiber
- **React Core Team** - UI framework

## 📞 Support

For issues, questions, or suggestions:
- Open an GitHub Issue
- Email: support@configurator.dev
- Discord: [Community Server]

---

**Made with ❤️ for automotive enthusiasts and luxury brand lovers**

*Experience the future of automotive configuration.*
