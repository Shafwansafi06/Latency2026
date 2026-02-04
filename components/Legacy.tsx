
import React from 'react';
import { motion } from 'framer-motion';

const Legacy: React.FC = () => {
  // Previous Latency 2025 images
  const latencyImages = [
    '/DSC_0609.JPG',
    '/DSC_0611.JPG',
    '/DSC_0619.JPG',
    '/IMG20250125174319.jpg',
    '/IMG20250125185345.jpg',
  ];

  return (
    <section className="py-32 px-8 md:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20 gap-8">
          <div className="max-w-3xl text-center">
            <span className="text-purple-500 font-bold tracking-[0.3em] text-xs block mb-4 uppercase">OUR LEGACY</span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              LATENCY <span className="text-cyan-400">2025</span>
            </h2>
            <p className="text-gray-200 font-grotesk text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] backdrop-blur-sm bg-black/30 rounded-2xl p-6 border border-white/10">
              Our inaugural year brought together the brightest minds at IISER Bhopal. A celebration of tech, creativity, and community that set the foundation for what Latency represents today.
            </p>
          </div>
        </div>

        {/* Infinite Sliding Gallery */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-6">
            {/* First set of images */}
            <motion.div
              className="flex gap-6 flex-shrink-0"
              animate={{
                x: [0, -1 * (latencyImages.length * (384 + 24))], // 384px width + 24px gap
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {latencyImages.map((image, index) => (
                <div
                  key={`first-${index}`}
                  className="relative w-96 h-64 rounded-2xl overflow-hidden border border-white/20 flex-shrink-0 group"
                >
                  <img
                    src={image}
                    alt={`Latency 2025 - ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated border on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-16 h-16">
                      <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                        <path d="M 0 20 L 0 0 L 20 0" stroke="currentColor" strokeWidth="3" fill="none" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16">
                      <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                        <path d="M 100 80 L 100 100 L 80 100" stroke="currentColor" strokeWidth="3" fill="none" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Second set of images (duplicate for seamless loop) */}
            <motion.div
              className="flex gap-6 flex-shrink-0"
              animate={{
                x: [0, -1 * (latencyImages.length * (384 + 24))],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {latencyImages.map((image, index) => (
                <div
                  key={`second-${index}`}
                  className="relative w-96 h-64 rounded-2xl overflow-hidden border border-white/20 flex-shrink-0 group"
                >
                  <img
                    src={image}
                    alt={`Latency 2025 - ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-16 h-16">
                      <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                        <path d="M 0 20 L 0 0 L 20 0" stroke="currentColor" strokeWidth="3" fill="none" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16">
                      <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                        <path d="M 100 80 L 100 100 L 80 100" stroke="currentColor" strokeWidth="3" fill="none" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Third set for extra smooth loop */}
            <motion.div
              className="flex gap-6 flex-shrink-0"
              animate={{
                x: [0, -1 * (latencyImages.length * (384 + 24))],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {latencyImages.map((image, index) => (
                <div
                  key={`third-${index}`}
                  className="relative w-96 h-64 rounded-2xl overflow-hidden border border-white/20 flex-shrink-0 group"
                >
                  <img
                    src={image}
                    alt={`Latency 2025 - ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-16 h-16">
                      <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                        <path d="M 0 20 L 0 0 L 20 0" stroke="currentColor" strokeWidth="3" fill="none" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16">
                      <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                        <path d="M 100 80 L 100 100 L 80 100" stroke="currentColor" strokeWidth="3" fill="none" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center backdrop-blur-sm bg-black/30 rounded-2xl p-6 border border-white/10"
          >
            <div className="text-5xl font-black text-cyan-400 mb-2">300+</div>
            <p className="text-gray-300 font-mono text-xs uppercase tracking-widest">Attendees</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center backdrop-blur-sm bg-black/30 rounded-2xl p-6 border border-white/10"
          >
            <div className="text-5xl font-black text-pink-400 mb-2">4</div>
            <p className="text-gray-300 font-mono text-xs uppercase tracking-widest">Days of Innovation</p>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decorative Line */}
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Legacy;
