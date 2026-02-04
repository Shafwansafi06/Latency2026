import React from 'react';
import { Timeline } from './ui/timeline';
import { EVENTS_DATA } from '../constants';
import { Clock, MapPin } from 'lucide-react';

const EventTimeline: React.FC = () => {
  // Group events by date
  const eventsByDate = EVENTS_DATA.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof EVENTS_DATA>);

  const timelineData = Object.entries(eventsByDate).map(([date, events]) => ({
    title: date,
    content: (
      <div className="space-y-6">
        {events.map((event, idx) => (
          <div
            key={event.id}
            className="backdrop-blur-xl bg-black/70 border border-white/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-500 group shadow-2xl"
          >
            <div className="flex items-start gap-4">
              {event.image && (
                <div className="hidden md:block w-32 h-32 rounded-xl overflow-hidden border border-white/30 flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cyan-400/20 border border-cyan-400/50 rounded-full text-[10px] font-mono text-cyan-300 uppercase tracking-wider font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-2 group-hover:text-cyan-400 transition-colors">
                  {event.title}
                </h4>
                <div className="flex flex-wrap gap-4 mb-3 text-gray-300 text-sm">
                  <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded-lg">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono font-semibold">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded-lg">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="font-mono font-semibold">{event.venue}</span>
                  </div>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {event.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-xs text-gray-200 font-mono"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  }));

  return <Timeline data={timelineData} />;
};

export default EventTimeline;
