
import React from 'react';
import { EVENTS_DATA } from '../constants';
import PinnedEvent from './PinnedEvent';

const EventShowcase: React.FC = () => {
  return (
    <section>
      {EVENTS_DATA.map((event, index) => (
        <PinnedEvent key={event.id} event={event} index={index} />
      ))}
    </section>
  );
};

export default EventShowcase;
