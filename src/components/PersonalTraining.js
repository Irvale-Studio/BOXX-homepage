'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const priceTabs = [
  {
    id: 'bert',
    label: 'Bert — Head Coach, Co-founder',
    prices: [
      {
        title: '1:1 Personal Training',
        intro: { label: 'Intro Offer', price: '1,000 THB' },
        rows: [
          { label: 'Single Session', price: '1,750 THB' },
          { label: '5 Sessions', price: '7,750 THB', note: '1,550/session' },
          { label: '10 Sessions', price: '14,500 THB', note: '1,450/session' },
        ],
      },
      {
        title: '2:1 Personal Training (2 people)',
        rows: [
          { label: '', price: '+100 THB per session' },
        ],
      },
    ],
  },
  {
    id: 'coaches',
    label: 'BOXX Coaches',
    prices: [
      {
        title: '1:1 Personal Training',
        intro: { label: 'Intro Offer', price: '1,000 THB' },
        rows: [
          { label: 'Single Session', price: '1,400 THB' },
          { label: '5 Sessions', price: '6,500 THB', note: '1,300/session' },
          { label: '10 Sessions', price: '12,000 THB', note: '1,200/session' },
        ],
      },
      {
        title: '2:1 Personal Training (Coach Tier)',
        rows: [
          { label: '', price: '+100 THB per session' },
        ],
      },
    ],
  },
];

function PriceSection({ section }) {
  return (
    <div>
      <h4 className="text-sm font-semibold tracking-wide mb-4">
        {section.title}
      </h4>

      {section.intro && (
        <div className="flex items-center justify-between px-5 py-4 mb-2 bg-accent/10 border border-accent/20">
          <span className="text-sm text-accent font-medium">
            {section.intro.label}
          </span>
          <span className="text-sm font-bold text-accent">
            {section.intro.price}
          </span>
        </div>
      )}

      <div className="space-y-1">
        {section.rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-4 bg-white/[0.02] border border-white/[0.04]"
          >
            <div>
              {row.label && (
                <span className="text-sm text-white/70">{row.label}</span>
              )}
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold">{row.price}</span>
              {row.note && (
                <span className="text-xs text-white/30 ml-3">
                  ({row.note})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PersonalTraining() {
  const [activeTab, setActiveTab] = useState('bert');

  const activeData = priceTabs.find((t) => t.id === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mt-20"
    >
      <div className="border border-white/[0.06] bg-card/50">
        {/* Header inside the card */}
        <div className="px-6 md:px-10 pt-10 pb-8 border-b border-white/[0.06]">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">
            1-to-1 &amp; Small Group
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            Personal Training
          </h3>
          <p className="text-white/50 text-sm md:text-base leading-[1.9] max-w-2xl">
            Personal training at BOXX offers fully tailored sessions in a private,
            boutique setting. Train in your own space, outside of class times, with
            AC and air purification.
          </p>
          <p className="text-white/50 text-sm md:text-base leading-[1.9] max-w-2xl mt-4">
            Each programme begins with a consultation to understand your goals,
            current fitness level, and where you want to go. Whether your focus is
            weight loss, muscle toning, or overall strength and fitness, we support
            your progress with personalised training, nutrition guidance, and meal
            prep advice.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2">
          {priceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 md:px-10 py-5 text-sm md:text-base font-medium tracking-wide transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white bg-white/[0.04]'
                  : 'text-white/30 hover:text-white/50 hover:bg-white/[0.02]'
              }`}
            >
              {tab.label}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                initial={false}
                animate={{ opacity: activeTab === tab.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

        {/* Price content — always visible, single column */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-6 md:px-10 py-8 space-y-8"
          >
            {activeData.prices.map((section) => (
              <PriceSection key={section.title} section={section} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enquire button inside card */}
        <div className="px-6 md:px-10 pb-10">
          <button
            onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-5 bg-cta text-[#0a0a0a] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-cta-hover transition-colors duration-300"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
