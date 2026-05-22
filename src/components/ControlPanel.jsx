import React, { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ControlPanel.css'

/* ─── Sound Effects ─── */
const playClickSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  } catch (e) {}
}

const playEngineSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 80
    osc.type = 'sawtooth'
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 1.5)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.frequency.value = 120
    osc2.type = 'sawtooth'
    gain2.gain.setValueAtTime(0.08, ctx.currentTime)
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
    osc2.start(ctx.currentTime)
    osc2.stop(ctx.currentTime + 1.5)
  } catch (e) {}
}

/* ─── Camera Mode Icons (inline SVG paths) ─── */
const CameraIcons = {
  showcase: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  front: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <circle cx="7" cy="12" r="2" />
      <circle cx="17" cy="12" r="2" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  ),
  wheels: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="3" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="21" />
      <line x1="3" y1="12" x2="9" y2="12" />
      <line x1="15" y1="12" x2="21" y2="12" />
    </svg>
  ),
  interior: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
}

const cameraModes = [
  { key: 'showcase', label: 'Showcase' },
  { key: 'front', label: 'Front' },
  { key: 'wheels', label: 'Wheels' },
  { key: 'interior', label: 'Interior' },
]

/* ─── Animation Variants ─── */
const headerVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const colorBarVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const cameraVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const actionsVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const infoVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const buttonMotion = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.97, transition: { duration: 0.1 } },
}

/* ─── Main Component ─── */
export default function ControlPanel({
  currentColor,
  setCurrentColor,
  cameraMode,
  setCameraMode,
  doorsOpen,
  setDoorsOpen,
  engineMode,
  setEngineMode,
  colors,
}) {
  const activeColorObj = colors.find((c) => c.hex === currentColor) || colors[0]

  const handleColorSelect = useCallback(
    (hex) => {
      playClickSound()
      setCurrentColor(hex)
    },
    [setCurrentColor]
  )

  const handleCameraMode = useCallback(
    (mode) => {
      playClickSound()
      setCameraMode(mode)
    },
    [setCameraMode]
  )

  const handleDoorToggle = useCallback((side) => {
    playClickSound()
    setDoorsOpen((prev) => ({
      ...prev,
      [side]: !prev[side]
    }))
  }, [setDoorsOpen])

  const handleEngineToggle = useCallback(() => {
    playEngineSound()
    setEngineMode((prev) => {
      const next = !prev
      if (next) {
        setCameraMode('engine')
      } else {
        setCameraMode('showcase')
      }
      return next
    })
  }, [setEngineMode, setCameraMode])

  const handleReset = useCallback(() => {
    playClickSound()
    setCurrentColor(colors[0].hex)
    setCameraMode('showcase')
    setDoorsOpen({ left: false, right: false })
    setEngineMode(false)
  }, [colors, setCurrentColor, setCameraMode, setDoorsOpen, setEngineMode])

  return (
    <div className="cp-root">
      {/* ─── Header ─── */}
      <motion.div className="cp-header" variants={headerVariants} initial="hidden" animate="visible">
        <div className="cp-logo-row">
          <svg className="cp-logo-star" viewBox="0 0 80 80" width="36" height="36">
            <circle cx="40" cy="40" r="37" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
            <path
              d="M40 8 L48 34 H72 L52 50 L60 76 L40 60 L20 76 L28 50 L8 34 H32 Z"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.2"
              transform="scale(0.6) translate(27,27)"
            />
            <line x1="40" y1="6" x2="40" y2="74" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
            <line x1="6" y1="40" x2="74" y2="40" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
            <line x1="40" y1="40" x2="15" y2="68" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
            <line x1="40" y1="40" x2="65" y2="68" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
            <circle cx="40" cy="40" r="6" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          </svg>
          <div className="cp-logo-text">
            <span className="cp-brand">Mercedes-Benz</span>
            <span className="cp-subtitle">CONFIGURATOR</span>
          </div>
        </div>
      </motion.div>

      {/* ─── Color Selector ─── */}
      <motion.div className="cp-colors" variants={colorBarVariants} initial="hidden" animate="visible">
        <div className="cp-colors-inner">
          {colors.map((color) => {
            const isActive = currentColor === color.hex
            return (
              <motion.button
                key={color.hex}
                className={`cp-swatch ${isActive ? 'cp-swatch--active' : ''}`}
                onClick={() => handleColorSelect(color.hex)}
                whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                title={color.name}
              >
                <span
                  className="cp-swatch-circle"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: isActive ? `0 0 18px 4px ${color.hex}88` : 'none',
                    borderColor: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)',
                  }}
                />
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className="cp-swatch-label"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                    >
                      {color.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* ─── Camera Controls ─── */}
      <motion.div className="cp-camera" variants={cameraVariants} initial="hidden" animate="visible">
        <span className="cp-section-label">VIEW</span>
        <div className="cp-camera-btns">
          {cameraModes.map((mode) => {
            const isActive = cameraMode === mode.key
            return (
              <motion.button
                key={mode.key}
                className={`cp-cam-btn ${isActive ? 'cp-cam-btn--active' : ''}`}
                onClick={() => handleCameraMode(mode.key)}
                {...buttonMotion}
              >
                <span className="cp-cam-icon">{CameraIcons[mode.key]}</span>
                <span className="cp-cam-label">{mode.label}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* ─── Action Buttons ─── */}
      <motion.div className="cp-actions" variants={actionsVariants} initial="hidden" animate="visible">
        <motion.button
          className={`cp-action-btn ${doorsOpen.left ? 'cp-action-btn--active' : ''}`}
          onClick={() => handleDoorToggle('left')}
          {...buttonMotion}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>L DOOR</span>
        </motion.button>

        <motion.button
          className={`cp-action-btn ${doorsOpen.right ? 'cp-action-btn--active' : ''}`}
          onClick={() => handleDoorToggle('right')}
          {...buttonMotion}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>R DOOR</span>
        </motion.button>

        <motion.button
          className={`cp-action-btn cp-engine-btn ${engineMode ? 'cp-action-btn--active cp-engine-btn--on' : ''}`}
          onClick={handleEngineToggle}
          {...buttonMotion}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span>{engineMode ? 'STOP' : 'ENGINE'}</span>
        </motion.button>

        <motion.button className="cp-action-btn cp-reset-btn" onClick={handleReset} {...buttonMotion}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span>RESET</span>
        </motion.button>
      </motion.div>

      {/* ─── Info Badge ─── */}
      <motion.div className="cp-info" variants={infoVariants} initial="hidden" animate="visible">
        <div className="cp-info-row">
          <span
            className="cp-info-dot"
            style={{ backgroundColor: activeColorObj.hex, boxShadow: `0 0 8px ${activeColorObj.hex}88` }}
          />
          <span className="cp-info-color">{activeColorObj.name}</span>
        </div>
        <div className="cp-info-divider" />
        <div className="cp-info-row">
          <span className="cp-info-mode-icon">{CameraIcons[cameraMode]}</span>
          <span className="cp-info-mode">{cameraMode.charAt(0).toUpperCase() + cameraMode.slice(1)}</span>
        </div>
      </motion.div>
    </div>
  )
}
