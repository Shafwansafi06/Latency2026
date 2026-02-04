import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";

// Countdown to February 6, 2026 - Start of Latency 2026
const COUNTDOWN_FROM = "2026-02-06T00:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function ShiftingCountdown() {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 py-32">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            COUNTDOWN TO <span className="text-cyan-400">LATENCY</span>
          </h2>
          <p className="text-gray-200 text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            The ultimate tech fest begins soon. Mark your calendars!
          </p>
        </div>
        <div className="flex w-full items-center backdrop-blur-md bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8">
          <CountdownItem unit="Day" label="Days" />
          <CountdownItem unit="Hour" label="Hours" />
          <CountdownItem unit="Minute" label="Minutes" />
          <CountdownItem unit="Second" label="Seconds" />
        </div>
      </div>
    </section>
  );
}

function CountdownItem({ unit, label }: { unit: string; label: string }) {
  const { ref, time } = useTimer(unit);
  // For seconds, ensure two digits (00–59)
  const display = unit === "Second" ? String(time).padStart(2, '0') : time;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-6 md:gap-2 md:py-8">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-3xl font-mono font-black text-cyan-400 md:text-5xl lg:text-7xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
        >
          {display}
        </span>
      </div>
      <span className="text-sm font-semibold text-gray-200 md:text-base lg:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        {label}
      </span>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mt-4"></div>
    </div>
  );
}

function useTimer(unit: string) {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;
    switch (unit) {
      case "Day":
        newTime = Math.max(0, Math.floor(distance / DAY));
        break;
      case "Hour":
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
        break;
      case "Minute":
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
        break;
      default:
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
    }

    if (newTime !== timeRef.current) {
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
}
