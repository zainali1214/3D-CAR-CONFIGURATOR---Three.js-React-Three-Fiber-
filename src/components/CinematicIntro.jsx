import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CinematicIntro.css';

const TITLE_TEXT = 'MERCEDES-BENZ';

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <div className="intro-particles">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="intro-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            scale: [0, 1, 0],
            y: [0, -30 - Math.random() * 40],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function MercedesStar() {
  return (
    <div className="intro-logo-container">
      <div className="intro-logo-glow" />
      <svg viewBox="0 0 100 100" className="intro-logo-svg">
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="1.5"
        />
        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.8"
        />
        {/* Three pointed star - lines from center */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="8"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.5"
        />
        <line
          x1="50"
          y1="50"
          x2="13.6"
          y2="71"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.5"
        />
        <line
          x1="50"
          y1="50"
          x2="86.4"
          y2="71"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.5"
        />
        {/* Center dot */}
        <circle cx="50" cy="50" r="4" fill="rgba(255,255,255,0.9)" />
      </svg>
    </div>
  );
}

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers = [];

    // Phase 1 at 1.5s — logo fades in
    timers.push(setTimeout(() => setPhase(1), 1500));

    // Phase 2 at 4s — logo scales/fades, title appears letter by letter
    timers.push(setTimeout(() => setPhase(2), 4000));

    // Phase 3 at 6s — tagline + particles
    timers.push(setTimeout(() => setPhase(3), 6000));

    // Phase 4 at 8s — everything fades out
    timers.push(setTimeout(() => setPhase(4), 8000));

    // Complete at 9s
    timers.push(
      setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 9000)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Phase 3+ particles */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Particles />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 1-2: Mercedes star logo */}
          <AnimatePresence>
            {phase >= 1 && phase < 4 && (
              <motion.div
                className="intro-logo-wrapper"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: phase >= 2 ? 0 : 1,
                  scale: phase >= 2 ? 1.3 : 1,
                }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <MercedesStar />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 2+: Title letter by letter */}
          <AnimatePresence>
            {phase >= 2 && phase < 4 && (
              <motion.div
                className="intro-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {TITLE_TEXT.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    className="intro-title-letter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {letter === '-' ? '\u2013' : letter}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3+: Tagline */}
          <AnimatePresence>
            {phase >= 3 && phase < 4 && (
              <motion.p
                className="intro-tagline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                The Best or Nothing
              </motion.p>
            )}
          </AnimatePresence>

          {/* Phase 4: Final fade overlay */}
          {phase >= 4 && (
            <motion.div
              className="intro-fade-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
