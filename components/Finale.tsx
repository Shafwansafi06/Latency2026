
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Finale: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yearScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.5, 1.2, 1]);
  const yearOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const taglineOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  return (
    <div ref={containerRef} className="h-[250vh] relative">
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">

        <motion.div className="text-center relative z-10">
          <motion.h4
            style={{ opacity: yearOpacity }}
            className="text-cyan-400 text-lg md:text-xl font-mono tracking-[0.5em] mb-4 uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,1)] font-bold"
          >
            THE WAIT IS OVER
          </motion.h4>

          <motion.h2
            style={{
              opacity: yearOpacity,
              scale: yearScale,
              WebkitTextStroke: '8px black',
              paintOrder: 'stroke fill',
              textShadow: '0 4px 20px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.9)',
              paddingRight: '0.05em'
            }}
            className="text-[6rem] md:text-[14rem] font-black text-white leading-[0.8] italic select-none drop-shadow-[0_8px_24px_rgba(0,0,0,1)]"
          >
            LATENCY 2026
          </motion.h2>

          <motion.div style={{ opacity: taglineOpacity }} className="mt-8">
            <p className="text-white text-xl md:text-2xl font-grotesk tracking-[0.4em] uppercase mb-12 max-w-4xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,1)] font-semibold">
              Low Latency. High Impact. <span className="text-cyan-400 drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">Infinite Possibilities.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer info simplified to keep focus on center */}
        <div className="absolute bottom-12 w-full flex justify-center opacity-40">
          <span className="font-mono text-[10px] tracking-[1em]">IISER BHOPAL // EECS CLUB // CORE SYSTEM</span>
        </div>
      </section>
    </div>
  );
};

export default Finale;
