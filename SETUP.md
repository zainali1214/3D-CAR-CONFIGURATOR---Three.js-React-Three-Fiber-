# Mercedes-Benz Configurator - Setup Guide

## ⚡ Quick Start

### 1. Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

---

## 📂 Directory Structure You Need to Create

### Place Your Mercedes Model

Create the following directory and copy your model:

```
mercedes-configurator/
├── public/
│   └── models/
│       └── mercedes.glb  ← Place your uploaded GLB file here
├── components/
├── src/
└── ... (other files)
```

**CRITICAL:** Ensure the file path is exactly: `public/models/mercedes.glb`

### Alternative: Using a Different Model Path

If you want to use a different path, edit `components/MercedesModel.jsx`:

```javascript
// Find this line:
const { scene: modelScene } = await useGLTF('/models/mercedes.glb');

// Change to your path:
const { scene: modelScene } = await useGLTF('/your-new-path/model.glb');
```

---

## 📋 Complete Setup Checklist

- [ ] Node.js 16+ installed
- [ ] Run `npm install`
- [ ] Create `public/models/` directory
- [ ] Copy `mercedes-benz_maybach_2022.glb` to `public/models/mercedes.glb`
- [ ] Run `npm run dev`
- [ ] Open browser to `http://localhost:3000`
- [ ] See loading indicator
- [ ] Watch cinematic intro
- [ ] Interact with the 3D model

---

## 🎮 Feature Quick Reference

### Color Selection
- Click a color swatch in the "PAINT COLORS" panel
- Watch the car color update in real-time

### Door Controls
- Expand "DOORS" panel
- Click left/right door buttons to open/close
- Doors animate smoothly with GSAP

### Engine Inspection
- Expand "ENGINE CHECK" panel
- Click "INSPECT ENGINE" button
- Hood opens, camera focuses, engine glows

### Camera Modes
- Expand "CAMERA MODES" panel
- Select: Showcase, Wheels, Engine, or Interior
- Camera smoothly transitions

### Model Rotation
- **Mouse**: Click and drag to rotate
- **Touch**: Swipe to rotate
- **Scroll**: Zoom in/out
- **Auto-rotate**: Happens in Showcase mode

---

## 🔧 Customization Examples

### Change Intro Music Tone

Edit `components/CinematicIntro.jsx`:
```javascript
const playAmbientSound = () => {
  oscillator.frequency.setValueAtTime(100, audioContext.currentTime); // Change frequency
  oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 5);
};
```

### Adjust Lighting

Edit `App.jsx`:
```javascript
<directionalLight
  position={[5, 8, 5]}  // Change X, Y, Z position
  intensity={1.2}      // Change intensity (0-2+)
/>
```

### Modify Bloom Effect

Edit `App.jsx`:
```javascript
<Bloom
  intensity={0.8}              // Change glow strength
  luminanceThreshold={0.2}     // Change what glows
  luminanceSmoothing={0.9}     // Change smoothness
/>
```

### Add New Colors

Edit `components/MercedesModel.jsx`:
```javascript
const MERCEDES_COLORS = {
  'electric-green': {
    color: '#00ff00',
    metalness: 0.85,
    roughness: 0.15,
    emissive: '#00aa00',
    name: 'Electric Green'
  }
};
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
```

### Deploy to Netlify

```bash
# Build for production
npm run build

# Deploy dist folder to Netlify
# Or use: npm install -g netlify-cli && netlify deploy
```

### Deploy to GitHub Pages

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/mercedes-configurator/', // Your repo name
  // ...
});
```

2. Deploy:
```bash
npm run build
git add dist/
git commit -m "Deploy"
git push origin main
```

---

## 📊 Browser DevTools Tips

### Three.js Inspector
1. Open Chrome DevTools
2. Go to Console
3. Paste: 
```javascript
document.head.appendChild(
  Object.assign(document.createElement('script'), {
    src: 'https://cdn.jsdelivr.net/npm/three-devtools@latest/builds/three-devtools.js'
  })
);
```

### Performance Monitoring
- DevTools → Performance tab
- Record 10 seconds
- Look for 60 FPS consistent timing

### Memory Issues
- DevTools → Memory tab
- Take heap snapshot
- Check for large Three.js buffers

---

## 🎯 Feature Implementation Details

### Real Mercedes Model Loading
- Uses `useGLTF()` from @react-three/drei
- Automatically preloads and caches model
- Fallback to white box if load fails
- Auto-detects door and hood meshes by name

### Color System
- Uses Three.js `MeshStandardMaterial`
- Applies metalness and roughness for realism
- Preserves reflections across color changes
- Real-time updates with no lag

### Door Animation
- GSAP timeline animations
- Smooth easing curves (power2.inOut)
- Rotation-based hinge movement
- Independent left/right control

### Postprocessing Pipeline
1. Bloom - Glow effect
2. SSAO - Ambient shadows
3. ToneMapping - Exposure adjustment
4. Vignette - Edge darkening
5. DepthOfField - Focus blur

### Audio System
- Web Audio API (no files needed)
- Oscillators for tone generation
- Gain nodes for volume control
- Procedural audio synthesis

---

## 🆘 Troubleshooting

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Model shows as white box
- Check `public/models/mercedes.glb` exists
- Verify file path in MercedesModel.jsx
- Try renaming to lowercase

### Buttons not responding
- Check browser console for errors
- Try clearing cache (Ctrl+Shift+R)
- Check if JavaScript is enabled

### Performance issues
1. Reduce particle count (AmbientScene.jsx)
2. Lower bloom intensity (App.jsx)
3. Disable depth of field
4. Close other browser tabs

### Touch controls not working
- Ensure you're on touch device
- Check if browser supports touch events
- Try pinch and drag gestures

---

## 📝 File Generation Notes

This project was generated with:
- ✅ Full React component structure
- ✅ Three.js integration with React Three Fiber
- ✅ GSAP animations for smooth interactions
- ✅ Framer Motion for UI animations
- ✅ Professional post-processing pipeline
- ✅ Mobile-responsive design
- ✅ Web Audio API integration
- ✅ Accessibility features

All files are production-ready and fully documented.

---

## 🚀 Next Steps

1. **Place your model** in `public/models/mercedes.glb`
2. **Run** `npm install && npm run dev`
3. **Explore** the cinematic intro
4. **Interact** with all features
5. **Customize** colors and effects as needed
6. **Deploy** to your preferred platform

---

**Happy configuring! 🏎️✨**
