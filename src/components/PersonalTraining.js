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

export default function PersonalTraining() {
  const [activeTab, setActiveTab] = useState('bert');
  const [isOpen, setIsOpen] = useState(false);

  const activeData = priceTabs.find((t) => t.id === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mt-20"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-5">
          1-to-1 &amp; Small Group
        </p>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8">
          Personal Training
        </h3>
        <div className="max-w-2xl mx-auto space-y-5">
          <p className="text-white/50 text-base md:text-lg leading-[1.9]">
            Personal training at BOXX offers fully tailored sessions in a private,
            boutique setting. Train in your own space, outside of class times, with
            AC and air purification.
          </p>
          <p className="text-white/50 text-base md:text-lg leading-[1.9]">
            Each programme begins with a consultation to understand your goals,
            current fitness level, and where you want to go. Whether your focus is
            weight loss, muscle toning, or overall strength and fitness, we support
            your progress with personalised training, nutrition guidance, and meal
            prep advice.
          </p>
        </div>
      </div>

      {/* Price list accordion toggle */}
      <div className="border border-white/[0.06] bg-card/50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-6 md:px-10 py-6 group"
        >
          <span className="text-sm md:text-base font-semibold tracking-wide">
            View Pricing
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/30 text-sm group-hover:text-accent/50 transition-colors"
          >
            &#9660;
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {/* Tabs */}
              <div className="flex border-t border-b border-white/[0.06]">
                {priceTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-4 text-xs md:text-sm tracking-wide transition-colors duration-300 relative ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-white/30 hover:text-white/50'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="pt-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Price content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-10"
                >
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {activeData.prices.map((section) => (
                      <div key={section.title}>
                        <h4 className="text-base font-semibold tracking-wide mb-6">
                          {section.title}
                        </h4>

                        {section.intro && (
                          <div className="flex items-center justify-between px-5 py-4 mb-3 bg-accent/10 border border-accent/20">
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
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enquire button */}
      <div className="text-center mt-8">
        <button
          onClick={() => {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-12 py-6 bg-cta text-[#0a0a0a] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-cta-hover transition-colors duration-300"
        >
          Enquire Now
        </button>
      </div>
    </motion.div>
  );
}
