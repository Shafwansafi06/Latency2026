
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Vision from './components/Vision';
import EventShowcase from './components/EventShowcase';
import Legacy from './components/Legacy';
import EventTimeline from './components/EventTimeline';
import CountdownSection from './components/CountdownSection';
import Finale from './components/Finale';
import VideoScroll from './components/VideoScroll';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Using local video with scroll-controlled playback
  const VIDEO_URL = "/Feb_03__1023_29s_202602031253_ifyj0.mp4";
  const BACKGROUND_MUSIC_URL = "/background-music.mp3";

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  useEffect(() => {
    // Artificial delay to allow for pre-loading and smooth transition
    const timer = setTimeout(() => {
      if (isVideoReady) {
        setIsLoading(false);
      }
    }, 3000);

    if (isVideoReady) {
      setIsLoading(false);
    }

    return () => clearTimeout(timer);
  }, [isVideoReady]);

  // Background music autoplay handler - follows Chrome autoplay policy
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.volume = 0.3; // Set volume to 30%
        audioRef.current.play().catch(err => {
          console.warn("Background music autoplay blocked:", err);
        });
      }
    };

    // Listen for user interactions
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [hasInteracted]);

  return (
    <div className="min-h-screen text-white font-inter selection:bg-cyan-500 selection:text-black">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src={BACKGROUND_MUSIC_URL}
        loop
        preload="auto"
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(40px)" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.8em] mb-6 font-bold uppercase"
              >
                Syncing Cinematic Engine...
              </motion.div>
              <div className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-4">
                LATENCY
              </div>
              <div className="w-48 md:w-64 h-[2px] bg-white/5 mx-auto relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-0">
        {/* THE VIDEO ENGINE LAYER */}
        <div className="fixed inset-0 z-0">
          <VideoScroll videoSrc={VIDEO_URL} onReady={handleVideoReady} />
        </div>

        {/* NAVIGATION LAYER */}
        <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 flex justify-between items-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 pointer-events-auto mix-blend-difference cursor-pointer group"
          >
            <div className="h-10 flex items-center group-hover:scale-110 transition-transform duration-500">
              <img src="/latency-logo.png" alt="Latency Logo" className="h-full w-auto" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black italic tracking-widest uppercase text-white">Latency 2026</span>
              <span className="text-[8px] text-gray-500 font-mono tracking-widest uppercase">EECS CLUB</span>
            </div>
          </motion.div>
          <div className="hidden md:flex gap-12 pointer-events-auto mix-blend-difference items-center">
            <div className="px-4 py-2 border border-white/10 rounded-full text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest">
              Live Connection: Active
            </div>
          </div>
        </nav>

        {/* SCROLLABLE CONTENT LAYERS */}
        <div className="relative z-10">
          <Hero />
          <Vision />
          <EventShowcase />
          <Legacy />
          <EventTimeline />
          <CountdownSection />
          <Finale />
        </div>
      </main>

      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[80] opacity-[0.08]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 2px, rgba(255,255,255,0.03) 3px)', backgroundSize: '1px 3px' }}></div>

      {/* Scroll Progress Indicator (Right Side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-white/10 hidden md:block z-50 overflow-hidden rounded-full">
        <motion.div
          className="w-full bg-cyan-400"
          style={{ height: "100%", originY: 0 }}
        />
      </div>
    </div>
  );
};

export default App;
