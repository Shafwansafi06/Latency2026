
import React from 'react';
import { motion } from 'framer-motion';

const Vision: React.FC = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-32 px-8 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
          REWIRING CONNECTIONS WITH <br/>
          <span className="text-cyan-400">VISION AND TECH</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-2xl font-grotesk leading-relaxed">
          Where innovation meets execution. Where students become creators. <br className="hidden md:block" />
          Four days of tech, creativity, and endless possibilities.
        </p>
      </motion.div>
      
      {/* HUD line */}
      <div className="absolute left-1/2 bottom-0 w-[1px] h-32 bg-gradient-to-b from-cyan-400 to-transparent"></div>
    </section>
  );
};

export default Vision;
