
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 1.15]);
  const blur = useTransform(scrollYProgress, [0.05, 0.1], [0, 10]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ opacity, scale, filter: `blur(${blur}px)` }}
        className="text-center z-10 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.8em] font-bold block mb-8 uppercase"
        >
          Connecting the Future
        </motion.div>

        <h1
          style={{ WebkitTextStroke: '4px black', paintOrder: 'stroke fill' }}
          className="text-8xl md:text-[12rem] font-black tracking-tighter text-white leading-none mb-6 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
        >
          LATENCY<br />
          <span
            style={{ WebkitTextStroke: '0px', paddingRight: '0.05em' }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400 italic"
          >
            RETURNS
          </span>
        </h1>

        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-400 font-grotesk max-w-lg mx-auto text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
            FEB 06 — FEB 09 // 2026
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent mt-8"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
