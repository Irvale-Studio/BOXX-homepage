'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const classColors = {
  BOXXING: { bg: '#B3D4FC', text: '#1a3a5c' },
  'BOXX&TRAIN': { bg: '#FCE588', text: '#5c4a0e' },
  BOXXPILATES: { bg: '#D8B4FE', text: '#4a1d7a' },
  BOXXSOUND: { bg: '#FDE8C8', text: '#6b4226' },
  BOXXSTRENGTH: { bg: '#A7F3D0', text: '#14532d' },
  BOXXRUN: { bg: '#FBCFE8', text: '#831843' },
};

const timeSlots = [
  {
    time: '8:00 – 9:15',
    classes: { SAT: 'BOXXRUN' },
  },
  {
    time: '9:30 – 10:45',
    classes: {
      MON: 'BOXXING',
      TUE: 'BOXX&TRAIN',
      WED: 'BOXXING',
      THU: 'BOXX&TRAIN',
      FRI: 'BOXXING',
      SAT: 'BOXXING',
    },
  },
  {
    time: '11:00 – 12:15',
    classes: { SAT: 'BOXX&TRAIN' },
  },
  {
    time: '5:30 – 6:45',
    classes: {
      MON: 'BOXX&TRAIN',
      TUE: 'BOXXING',
      WED: 'BOXXPILATES',
      THU: 'BOXXSTRENGTH',
      FRI: 'BOXX&TRAIN',
    },
  },
  {
    time: '7:00 – 8:00',
    classes: { WED: 'BOXXSOUND' },
  },
];

function ScheduleCell({ className: cls }) {
  if (!cls) return <td className="border border-white/[0.04] p-2" />;

  const color = classColors[cls];
  return (
    <td className="border border-white/[0.04] p-2">
      <div
        className="rounded-sm px-3 py-5 text-center font-semibold text-xs tracking-wide leading-tight h-full flex items-center justify-center"
        style={{ backgroundColor: color.bg, color: color.text }}
      >
        {cls}
      </div>
    </td>
  );
}

export default function Schedule() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const legendItems = Object.entries(classColors);

  return (
    <div ref={ref} className="mt-20 hidden md:block">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">Weekly Timetable</p>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Class Schedule</h3>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-3 px-6 py-3 border border-white/10 hover:border-accent/30 transition-colors duration-300 group"
        >
          <span className="text-xs tracking-[0.15em] uppercase text-white/50 group-hover:text-white/70 transition-colors">
            {expanded ? 'Minimise' : 'Expand'}
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/30 text-sm"
          >
            &#9660;
          </motion.span>
        </button>
      </motion.div>

      {/* Minimised — today/tomorrow */}
      <AnimatePresence mode="wait">
        {!expanded && (
          <motion.div
            key="minimised"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <MinimisedView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded — full timetable */}
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border border-white/[0.06] overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-[11px] tracking-[0.2em] uppercase text-accent/70 font-medium py-4 px-4 text-left border-b border-white/[0.06] w-[100px]">
                      Time
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className={`text-[11px] tracking-[0.2em] uppercase font-medium py-4 px-2 text-center border-b border-white/[0.06] ${
                          day === 'SUN' ? 'text-white/20' : 'text-white/60'
                        }`}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, slotIndex) => (
                    <tr key={slot.time}>
                      <td className="text-xs text-accent/50 font-medium py-4 px-4 border border-white/[0.04] whitespace-nowrap">
                        {slot.time}
                      </td>
                      {days.map((day) => {
                        if (day === 'SUN') {
                          return (
                            <td
                              key={day}
                              className="border border-white/[0.04] p-2 text-center"
                            >
                              {slotIndex === 2 && (
                                <span className="text-white/15 text-[11px] tracking-[0.2em] uppercase">
                                  Closed
                                </span>
                              )}
                            </td>
                          );
                        }
                        return (
                          <ScheduleCell key={day} className={slot.classes[day]} />
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8 pt-6 border-t border-white/[0.06]">
              {legendItems.map(([name, color]) => (
                <div key={name} className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: color.bg }}
                  />
                  <span className="text-[11px] tracking-wider text-white/40 uppercase">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book a Class CTA */}
      <div className="mt-10">
        <a
          href="https://boxx.zatrovo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-5 bg-cta text-[#0a0a0a] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-cta-hover transition-colors duration-300 text-center"
        >
          Book a Class
        </a>
      </div>
    </div>
  );
}

function MinimisedView() {
  const now = new Date();
  const dayIndex = now.getDay();
  const todayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const todayKey = days[todayIndex];

  const todayClasses = timeSlots
    .filter((slot) => slot.classes[todayKey])
    .map((slot) => ({
      time: slot.time,
      name: slot.classes[todayKey],
    }));

  const tomorrowIndex = (todayIndex + 1) % 7;
  const tomorrowKey = days[tomorrowIndex];
  const tomorrowClasses = timeSlots
    .filter((slot) => slot.classes[tomorrowKey])
    .map((slot) => ({
      time: slot.time,
      name: slot.classes[tomorrowKey],
    }));

  return (
    <div className="grid grid-cols-2 gap-5">
      <DayCard title="Today" dayKey={todayKey} classes={todayClasses} />
      <DayCard title="Tomorrow" dayKey={tomorrowKey} classes={tomorrowClasses} />
    </div>
  );
}

function DayCard({ title, dayKey, classes }) {
  return (
    <div className="border border-white/[0.06] bg-card/50">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide">{title}</span>
        <span className="text-[11px] tracking-[0.2em] uppercase text-accent/60">{dayKey}</span>
      </div>
      <div className="p-4 space-y-2">
        {classes.length === 0 ? (
          <p className="text-white/30 text-sm px-2 py-4 text-center">No classes</p>
        ) : (
          classes.map((cls) => {
            const color = classColors[cls.name];
            return (
              <div
                key={cls.time}
                className="flex items-center gap-4 px-4 py-3 bg-white/[0.02] border border-white/[0.04]"
              >
                <span className="text-xs text-accent/50 font-medium w-24 shrink-0">
                  {cls.time}
                </span>
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: color.bg }}
                />
                <span className="text-sm font-semibold tracking-wide">{cls.name}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
