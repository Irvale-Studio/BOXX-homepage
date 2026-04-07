'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

const founders = [
  {
    id: 'bert',
    name: 'Bert',
    role: 'Co-Founder',
    image: '/images/brand/bert.png',
    paragraphs: [
      'Bert was born in Thailand and moved to the UK at the age of eight. It was there that he developed a passion for boxing and strength training.',
      'After qualifying as a Personal Trainer and Boxing Coach in Central London, Bert spent over a decade helping people aged from 6-87, train with purpose, focusing on correct technique, sustainable habits, and building both physical and mental strength.',
      'Returning to Thailand in 2024, he had a clear vision: to bring the standards of Western boxing and strength training to his home country, and to make fitness accessible, and part of everyday life.',
      'BOXX was created from that purpose, a boutique boxing and strength studio built to share knowledge, build confidence, and create a strong, supportive community through training.',
    ],
  },
  {
    id: 'georgina',
    name: 'Georgina',
    role: 'Co-Founder',
    image: '/images/brand/georgina.png',
    imagePosition: 'center 30%',
    paragraphs: [
      'Georgina grew up in the UK and has always had a strong connection to Thailand, having first visited over 20 years ago. She met Bert in London through their shared passion for fitness and boxing, before leaving her corporate career to travel across Asia.',
      'Following her interest in health and movement, Georgina qualified as a STOTT Pilates instructor in both mat and reformer in the UK. She went on to teach at multiple studios in the UK before relocating to Thailand, where she worked at one of Bangkok\u2019s leading STOTT Pilates studios.',
      'After moving to Chiang Mai, Georgina co-founded BOXX alongside Bert, combining their shared vision to create a boutique fitness space centred around quality training, community, and long-term wellbeing.',
    ],
  },
];

function FounderCard({ founder }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border border-card-border bg-card/50 overflow-hidden group"
    >
      {/* Image — always visible */}
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <Image
          src={founder.image}
          alt={`${founder.name}, ${founder.role} of BOXX`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: founder.imagePosition || 'center top' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Name overlay */}
        <div className="absolute bottom-5 left-6 right-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-1.5">
            {founder.role}
          </p>
          <h4 className="text-2xl md:text-3xl font-bold tracking-tight">
            {founder.name}
          </h4>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 border-t border-card-border"
      >
        <span className="text-[11px] tracking-wider text-white/25">
          {expanded ? 'Click to collapse' : 'Read more'}
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/25 text-lg"
        >
          &#x2304;
        </motion.span>
      </button>

      {/* Expandable bio */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 space-y-5">
              {founder.paragraphs.map((p, i) => (
                <p key={i} className="text-white/50 text-sm md:text-base leading-[1.9]">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Founders() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <div className="mt-20">
      {/* Header with founders photo */}
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent text-xs tracking-[0.4em] uppercase mb-5"
        >
          Our Story
        </motion.p>
        <div ref={headingRef} className="overflow-hidden">
          <motion.h3
            initial={{ y: '100%' }}
            animate={headingInView ? { y: 0 } : { y: '100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Meet The Founders
          </motion.h3>
        </div>
      </div>

      {/* Founder cards */}
      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {founders.map((founder) => (
          <FounderCard key={founder.id} founder={founder} />
        ))}
      </div>
    </div>
  );
}
