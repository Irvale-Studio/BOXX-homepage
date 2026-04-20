'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

function MemberVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const inView = useInView(containerRef, { once: true, margin: '-80px' });

  const handleToggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mt-24 md:mt-32 flex flex-col items-center"
    >
      <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6">
        Hear From Our Members
      </p>
      <div className="w-8 h-[1px] bg-accent mb-10" />

      <button
        type="button"
        onClick={handleToggle}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="group relative block w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/16] rounded-[28px] overflow-hidden border border-white/10 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <video
          ref={videoRef}
          src="/videos/members-testimonial.mp4"
          poster="/videos/members-testimonial-poster.jpg"
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/90 backdrop-blur-sm shadow-lg transition-transform duration-500 group-hover:scale-110">
            <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
            <svg
              viewBox="0 0 24 24"
              className="relative w-6 h-6 md:w-7 md:h-7 text-black translate-x-[2px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

const testimonials = [
  {
    quote:
      "Bert is more than a PT. He's a coach, a guide, and a partner in your growth.",
    author: 'Client Review',
  },
  {
    quote:
      'Got me fighting fit for my wedding 10 years ago and I never looked back.',
    author: 'Long-time Client',
  },
  {
    quote: 'Always gives 110% to every person he is training.',
    author: 'BOXX Member',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-34 md:py-44 lg:py-56 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Large decorative quote mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] leading-none text-white/[0.015] font-serif select-none pointer-events-none">
        &ldquo;
      </div>

      <div ref={ref} className="max-w-[1100px] mx-auto px-10 lg:px-20 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="text-accent text-xs tracking-[0.4em] uppercase mb-16 md:mb-20"
        >
          What People Say
        </motion.p>

        {/* Quote carousel */}
        <div className="relative min-h-[280px] md:min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full px-4"
            >
              <p className="text-2xl md:text-3xl lg:text-5xl font-light tracking-tight leading-[1.4] text-white/85">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <footer className="mt-10 md:mt-12">
                <div className="w-8 h-[1px] bg-accent mx-auto mb-5" />
                <cite className="text-[11px] tracking-[0.3em] uppercase text-white/30 not-italic">
                  {testimonials[active].author}
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-20">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'bg-accent w-8' : 'bg-white/15 w-1.5 hover:bg-white/30'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <MemberVideo />
      </div>
    </section>
  );
}
