
import { LatencyEvent, LegacyItem } from './types';

export const EVENTS_DATA: LatencyEvent[] = [
  {
    id: 'day1-1',
    date: '6 FEB',
    venue: 'L4',
    time: '7:30 PM',
    title: 'Tech Talk Conference',
    description: 'Career progression in engineering and his experience with Sharique Arshi, CEO of Baseraa. A deep dive into the startup ecosystem with a visionary founder.',
    benefits: ['Startup Insights', 'Networking', 'Entrepreneurship Mindset'],
    image: '/guest talk.png',
    tags: ['Startup', 'Vision']
  },
  {
    id: 'day2-1',
    date: '7 FEB',
    venue: 'L4',
    time: '5:30 PM',
    title: 'Spark Tank',
    description: 'An intense panel discussion where ideas are grilled and vision is refined.',
    benefits: ['Critical Thinking', 'Public Speaking', 'Pitching Skills'],
    image: '/latency schedule final.png',
    tags: ['Pitching', 'Discussion']
  },
  {
    id: 'day2-2',
    date: '7 FEB',
    venue: 'L4',
    time: '8:30 PM',
    title: 'Movie Screening I',
    description: 'Experience the gripping tale of ambition, innovation, and betrayal that redefined social media. "The Social Network" chronicles the meteoric rise of Facebook and Mark Zuckerberg, exploring the cost of success in the digital age. A must-watch for every aspiring entrepreneur and tech enthusiast.',
    benefits: ['Startup Inspiration', 'Tech History', 'Entrepreneurial Mindset'],
    image: '/social-network.jpeg',
    tags: ['Community', 'Visuals']
  },
  {
    id: 'day3-1',
    date: '8 FEB',
    venue: 'L4',
    time: '2:00 PM',
    title: 'Student Talk',
    description: 'Image Generation and World Models: How AI Learns to Imagine Reality. Explore the evolution from GANs to diffusion-based world models, covering the pre-training of large generative models, how they work under the hood, and the exciting possibilities they unlock for the future.',
    benefits: ['Generative AI', 'World Models', 'Deep Learning Insights'],
    image: '/student talk.png',
    tags: ['PeerTalk', 'Learning']
  },
  {
    id: 'day3-2',
    date: '8 FEB',
    venue: 'Multimedia Classroom',
    time: '5:00 PM',
    title: 'Robotics Workshop',
    description: 'Hands-on session by Robonauts India. Building the hardware of tomorrow.',
    benefits: ['Hands-on Skills', 'Robotics Basics', 'Hardware Hacking'],
    image: '/Robotics_Workshop.png',
    tags: ['Robotics', 'Workshop']
  },
  {
    id: 'day4-1',
    date: '9 FEB',
    venue: 'L1',
    time: '8:00 PM',
    title: 'Movie Screening II',
    description: 'The grand finale of visuals. Celebrating the spirit of tech through art.',
    benefits: ['Grand Closing', 'Memories', 'Team Spirit'],
    image: '/LATENCY FINAL.png',
    tags: ['Finale', 'Art']
  }
];

export const LEGACY_DATA: LegacyItem[] = [
  {
    year: '2023',
    highlight: 'Foundation Year',
    image: 'https://picsum.photos/seed/legacy23/800/600',
    stat: '300+ Attendees'
  },
  {
    year: '2025',
    highlight: 'Digital Renaissance',
    image: 'https://picsum.photos/seed/legacy25/800/600',
    stat: 'Global reach'
  }
];
