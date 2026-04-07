'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Schedule from './Schedule';
import PersonalTraining from './PersonalTraining';
import Founders from './Founders';

const classes = [
  {
    id: 'boxxing',
    name: 'BOXXING',
    level: 'All Levels',
    duration: '1 hr 15 min',
    capacity: '6 max',
    image: '/images/studio/class-boxing.webp',
    imagePosition: 'center 25%',
    description:
      'Boxing for all levels, combining shadow boxing, partner drills, bag work, and pad work. No sparring.',
    features: ['Shadow boxing', 'Partner drills', 'Bag work', 'Pad work'],
  },
  {
    id: 'train',
    name: 'BOXX&TRAIN',
    level: 'All Levels',
    duration: '1 hr 15 min',
    capacity: '6 max',
    image: '/images/studio/class-train.webp',
    description:
      'A blend of boxing and strength training, combining shadow boxing, bag work, and circuits with kettlebells, dumbbells, and bodyweight. Train to your ability, at your own pace.',
    features: ['Shadow boxing', 'Bag work', 'Kettlebells', 'Circuits'],
  },
  {
    id: 'strength',
    name: 'BOXXSTRENGTH',
    level: 'All Levels',
    duration: '1 hr 15 min',
    capacity: '8 max',
    image: '/images/studio/class-action.webp',
    description:
      'A strength and conditioning class focused on building full-body strength using kettlebells, dumbbells, and bodyweight through station-based circuits. Suitable for all levels. Train at your own pace.',
    features: ['Kettlebells', 'Dumbbells', 'Bodyweight', 'Station circuits'],
  },
  {
    id: 'pilates',
    name: 'BOXXPILATES',
    level: 'All Levels',
    duration: '1 hr',
    capacity: '6 max',
    image: '/images/studio/class-juniors.webp',
    description:
      'A full-body STOTT Pilates mat class focused on strength, control, and mobility. Suitable for all levels.',
    features: ['STOTT Pilates', 'Strength', 'Control', 'Mobility'],
  },
];

const communityClasses = [
  {
    id: 'sound',
    name: 'BOXXSOUND',
    level: 'All Levels',
    duration: '1 hr',
    capacity: '7 max',
    image: '/images/studio/class-boxing.webp',
    description:
      'A guided sound healing session using Tibetan singing bowls to promote deep relaxation, reset the nervous system, and restore overall balance, led by qualified practitioners.',
    features: ['Sound healing', 'Tibetan singing bowls', 'Deep relaxation', 'Nervous system reset'],
  },
  {
    id: 'run',
    name: 'BOXXRUN',
    level: 'All Levels',
    duration: '',
    capacity: '20 max',
    image: '/images/studio/class-action.webp',
    description:
      'A fun, community-driven run focused on improving technique with guidance from our trained coaches. Suitable for all levels.',
    features: ['Community run', 'Technique coaching', 'All levels', 'Fun focused'],
  },
];

function ClassCard({ cls, index, isExpanded, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onClick={onToggle}
      className={`group cursor-pointer relative overflow-hidden border transition-[border-color,background-color] duration-700 ${
        isExpanded
          ? 'border-accent/30 bg-card'
          : 'border-card-border bg-card/50 hover:border-white/10'
      }`}
    >
      {/* Image section */}
      <div
        className={`relative overflow-hidden transition-all duration-700 ${
          isExpanded ? 'h-56 md:h-72' : 'h-52 md:h-64'
        }`}
      >
        <Image
          src={cls.image}
          alt={cls.name}
          fill
          className={`object-cover transition-transform duration-700 ${
            isExpanded ? 'scale-105' : 'group-hover:scale-105'
          }`}
          style={cls.imagePosition ? { objectPosition: cls.imagePosition } : undefined}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        {/* Level badge */}
        <div className="absolute top-5 left-5 px-5 py-2.5 bg-black/60 backdrop-blur-sm border border-white/10">
          <span className="text-[11px] tracking-[0.2em] uppercase text-accent">
            {cls.level}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            {cls.name}
          </h3>
          <div className="flex gap-4 mt-3">
            {[cls.duration, cls.capacity].map((detail) => (
              <span key={detail} className="text-[11px] tracking-wider text-white/40">
                {detail}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pt-6 pb-7 space-y-5">
              <p className="text-white/50 text-sm leading-[1.8]">{cls.description}</p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {cls.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-sm text-white/60">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a
                  href="https://boxx.zatrovo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs tracking-[0.2em] uppercase text-accent hover:text-accent-dim transition-colors"
                >
                  Book this class &rarr;
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand indicator */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-card-border">
        <span className="text-[11px] tracking-wider text-white/25">
          {isExpanded ? 'Click to collapse' : 'Click to learn more'}
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/25 text-lg"
        >
          &#x2304;
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Classes() {
  const [expandedId, setExpandedId] = useState(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <section id="classes" className="relative py-34 md:py-44 lg:py-52">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-10 lg:px-20">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs tracking-[0.4em] uppercase mb-5"
          >
            Our Classes
          </motion.p>

          <div ref={headingRef} className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={headingInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Find Your Class
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 mt-6 max-w-lg text-base md:text-lg leading-relaxed"
          >
            Small group classes in a boutique setting, led by UK and Thai qualified
            coaches. Built on real technique, strong community, and fun.
          </motion.p>
        </div>

        {/* Class cards grid */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-start">
          {classes.map((cls, i) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              index={i}
              isExpanded={expandedId === cls.id}
              onToggle={() =>
                setExpandedId(expandedId === cls.id ? null : cls.id)
              }
            />
          ))}
        </div>

        {/* Community Classes subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-20 mb-16 md:mb-20"
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Community Classes
          </h3>
        </motion.div>

        {/* Community class cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-start">
          {communityClasses.map((cls, i) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              index={i}
              isExpanded={expandedId === cls.id}
              onToggle={() =>
                setExpandedId(expandedId === cls.id ? null : cls.id)
              }
            />
          ))}
        </div>

        {/* Personal Training section */}
        <PersonalTraining />

        {/* Meet The Founders */}
        <Founders />

        {/* Weekly Schedule */}
        <Schedule />
      </div>
    </section>
  );
}
