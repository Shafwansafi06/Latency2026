
import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoScrollProps {
  videoSrc: string;
  onReady?: () => void;
}

// Video timing configuration (29 seconds total)
// 0-8s: Hero page (0% - 27.6%)
// 8-15s: Events page (27.6% - 51.7%)
// 15-21s: Previous latency section (51.7% - 72.4%)
// 21-29s: Remaining section (72.4% - 100%)
const VIDEO_SECTIONS = {
  hero: { start: 0, end: 8 },
  events: { start: 8, end: 15 },
  legacy: { start: 15, end: 21 },
  finale: { start: 21, end: 29 }
};

const VideoScroll: React.FC<VideoScrollProps> = ({ videoSrc, onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
  const blurValue = useTransform(scrollYProgress, [0.85, 0.9], [0, 25]);
  const flashOpacity = useTransform(scrollYProgress, [0.88, 0.92, 0.96], [0, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded. Duration:", video.duration);
      setIsReady(true);
      if (onReady) onReady();
    };

    const handleError = () => {
      const errorMsg = video.error ? `Code ${video.error.code}: ${video.error.message}` : "Unknown video error";
      setError(errorMsg);
      console.error("Video load error details:", errorMsg);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    // Initial check in case it's already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    let rafId: number | null = null;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video && video.duration && !isNaN(video.duration)) {
        // Cancel previous animation frame to prevent stacking
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
          // Map scroll progress to video time based on sections
          let targetTime = 0;

          if (latest <= 0.25) {
            const sectionProgress = latest / 0.25;
            targetTime = VIDEO_SECTIONS.hero.start + (sectionProgress * (VIDEO_SECTIONS.hero.end - VIDEO_SECTIONS.hero.start));
          } else if (latest <= 0.5) {
            const sectionProgress = (latest - 0.25) / 0.25;
            targetTime = VIDEO_SECTIONS.events.start + (sectionProgress * (VIDEO_SECTIONS.events.end - VIDEO_SECTIONS.events.start));
          } else if (latest <= 0.75) {
            const sectionProgress = (latest - 0.5) / 0.25;
            targetTime = VIDEO_SECTIONS.legacy.start + (sectionProgress * (VIDEO_SECTIONS.legacy.end - VIDEO_SECTIONS.legacy.start));
          } else {
            const sectionProgress = (latest - 0.75) / 0.25;
            targetTime = VIDEO_SECTIONS.finale.start + (sectionProgress * (VIDEO_SECTIONS.finale.end - VIDEO_SECTIONS.finale.start));
          }

          // Smooth scrubbing with reduced threshold for better precision
          if (Math.abs(video.currentTime - targetTime) > 0.05) {
            video.currentTime = targetTime;
          }
          rafId = null;
        });
      }
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      unsubscribe();
    };
  }, [scrollYProgress, onReady]);

  // Effect to handle play/pause when muting/unmuting
  // Following Chrome's autoplay policy: https://developer.chrome.com/blog/autoplay/
  // 1. Muted autoplay is always allowed
  // 2. Autoplay with sound requires user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && videoRef.current) {
        setHasInteracted(true);
        // Unmute and play after user interaction
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play().catch(err => {
          console.warn("Audio play blocked:", err);
          // If still blocked, revert to muted
          videoRef.current.muted = true;
          setIsMuted(true);
        });
      }
    };

    // Listen for any user interaction to enable audio
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [hasInteracted]);

  // Handle manual mute toggle after initial interaction
  useEffect(() => {
    if (videoRef.current && hasInteracted) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, hasInteracted]);

  return (
    <div ref={containerRef} className="relative h-[1000vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 p-12 text-center">
            <div className="text-cyan-500/30 font-mono text-xs uppercase tracking-[0.5em] mb-4">
              [ System Visuals Offline ]
            </div>
            <div className="text-white/20 text-[10px] font-mono max-w-xs uppercase">
              {error}
            </div>
          </div>
        ) : (
          <motion.video
            ref={videoRef}
            src={videoSrc}
            muted={isMuted}
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            disablePictureInPicture
            style={{
              opacity: isReady ? videoOpacity : 0,
              filter: `blur(${blurValue}px)`
            }}
            className="w-full h-full object-cover pointer-events-none will-change-transform scale-[1.02]"
          />
        )}

        {/* Cinematic Overlays */}
        <motion.div
          style={{ opacity: flashOpacity }}
          className="absolute inset-0 bg-white z-50 pointer-events-none"
        />

        {/* Ambient Shading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_black_100%)] pointer-events-none opacity-40"></div>
      </div>

      {/* Audio Toggle Button - Moved outside sticky container to ensure it stays on top of everything */}
      {!error && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMuted(!isMuted)}
          className="fixed bottom-10 right-10 z-[200] p-4 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 pointer-events-auto group"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-gray-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-cyan-400" />
          )}

          <div className="absolute -top-12 right-0 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
              {isMuted ? "Sound Off" : "Sound On"}
            </span>
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default VideoScroll;
