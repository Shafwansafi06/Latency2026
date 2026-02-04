
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LatencyEvent } from '../types';

interface PinnedEventProps {
  event: LatencyEvent;
  index: number;
}

const PinnedEvent: React.FC<PinnedEventProps> = ({ event, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Precise timing for glass card reveal
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const blurValue = useTransform(scrollYProgress, [0.1, 0.3], [20, 0]);
  
  // Image animations
  const imageScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.8, 1, 1, 1.1]);
  const imageRotate = useTransform(scrollYProgress, [0.2, 0.5], [isEven ? -5 : 5, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const glowIntensity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0.5]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-8 md:px-24 overflow-hidden">
        <motion.div 
          style={{ opacity: cardOpacity, y: cardY }}
          className={`w-full max-w-5xl backdrop-blur-xl bg-black/60 border border-white/20 rounded-[2.5rem] p-8 md:p-16 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 relative z-10 shadow-2xl`}
        >
          {/* Text Content */}
          <div className="flex-1 text-left backdrop-blur-sm bg-black/30 rounded-3xl p-6 md:p-8 border border-white/10">
            <div className="mb-4">
              <span className="text-cyan-400 font-mono text-sm md:text-base font-bold tracking-widest bg-cyan-400/20 px-4 py-2 rounded-full border border-cyan-400/30 shadow-lg shadow-cyan-400/20">
                {event.date} // {event.time}
              </span>
            </div>
            
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
              {event.title}
            </h3>

            <p className="text-gray-100 text-base md:text-lg font-grotesk leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
              {event.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {event.benefits.map(benefit => (
                <span key={benefit} className="bg-white/10 border border-white/20 px-3 py-2 rounded text-[10px] text-gray-200 font-mono uppercase font-bold backdrop-blur-sm shadow-lg">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Focus - Enhanced Event Poster */}
          <motion.div 
            className="flex-1 w-full flex justify-center relative"
            style={{ opacity: imageOpacity }}
          >
             <motion.div 
               style={{ 
                 scale: imageScale, 
                 rotate: imageRotate,
               }}
               className="w-full max-w-md relative group cursor-pointer"
             >
                {/* Animated glow effect */}
                <motion.div 
                  style={{ opacity: glowIntensity }}
                  className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"
                />
                
                {/* Main poster card */}
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl backdrop-blur-sm"
                >
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Animated corner accents */}
                  <motion.div 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
                  >
                    <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                      <motion.path 
                        d="M 0 20 L 0 0 L 20 0" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                  >
                    <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                      <motion.path 
                        d="M 100 80 L 100 100 L 80 100" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </svg>
                  </motion.div>

                  {/* Hover scan line effect */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    initial={{ y: "-100%" }}
                    whileHover={{ y: "100%" }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-sm" />
                  </motion.div>
                </motion.div>

                {/* Floating particles effect */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
                    style={{
                      top: `${20 + i * 30}%`,
                      left: i % 2 === 0 ? "-10%" : "110%",
                    }}
                    animate={{
                      x: [0, (i % 2 === 0 ? 1 : -1) * 100],
                      y: [0, -50, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
             </motion.div>
          </motion.div>
        </motion.div>

        {/* Background Ghost Text */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.05, 0]) }}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        >
          <h4 className="text-[30vw] font-black text-white">{index + 1}</h4>
        </motion.div>
      </div>
    </div>
  );
};

export default PinnedEvent;
