
export interface LatencyEvent {
  id: string;
  date: string;
  venue: string;
  time: string;
  title: string;
  description: string;
  benefits: string[];
  image: string;
  tags: string[];
}

export interface LegacyItem {
  year: string;
  highlight: string;
  image: string;
  stat: string;
}
