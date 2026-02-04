
import React from 'react';
import { motion } from 'framer-motion';
import { LatencyEvent } from '../types';
import { MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';

interface EventCardProps {
  event: LatencyEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <motion.div 
      className="flex-shrink-0 w-[85vw] md:w-[600px] h-[70vh] md:h-[500px] relative group overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 mx-4"
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end">
        <div className="flex gap-2 mb-4">
          {event.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-1 rounded text-cyan-400 font-bold">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-grotesk font-bold mb-1">
            <Calendar size={14} />
            <span>{event.date}</span>
            <span className="opacity-20">|</span>
            <Clock size={14} />
            <span>{event.time}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-cyan-400 transition-colors duration-500 mb-2">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <MapPin size={14} className="text-purple-500" />
            <span>{event.venue}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-md line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {event.benefits.map(benefit => (
            <div key={benefit} className="flex items-center gap-2 text-xs font-grotesk text-gray-300">
              <CheckCircle size={12} className="text-cyan-400" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual Glitch Element */}
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-12 h-12 border-t-2 border-r-2 border-cyan-400"></div>
      </div>
    </motion.div>
  );
};

export default EventCard;
