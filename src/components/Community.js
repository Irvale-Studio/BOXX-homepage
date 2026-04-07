'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

const communityImages = [
  { src: '/images/studio/community-1.jpg', alt: 'BOXX Community run club' },
  { src: '/images/studio/community-2.jpg', alt: 'Members at the #BOXXCNX mirror' },
  { src: '/images/studio/community-3.jpg', alt: 'Post-session selfie at BOXX' },
  { src: '/images/studio/community-4.jpg', alt: 'Family training session at BOXX' },
];

// Grid template based on which index is featured
// [0]=top-left, [1]=top-right, [2]=bottom-left, [3]=bottom-right
const gridTemplates = [
  { cols: '2.5fr 1fr', rows: '2.5fr 1fr' },  // 0: top-left big
  { cols: '1fr 2.5fr', rows: '2.5fr 1fr' },  // 1: top-right big
  { cols: '2.5fr 1fr', rows: '1fr 2.5fr' },  // 2: bottom-left big
  { cols: '1fr 2.5fr', rows: '1fr 2.5fr' },  // 3: bottom-right big
];

const communityItems = [
  {
    title: 'BOXXRUN',
    description: 'Community runs focused on connection and improving running technique.',
  },
  {
    title: 'BOXXSOUND',
    description: 'Restorative sound healing sessions designed to reset and recharge.',
  },
  {
    title: 'EVENTS',
    description: 'Workshops and community events designed to bring people together.',
  },
];

function CommunityAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-0"
    >
      {communityItems.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="border-b border-white/[0.06]">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between py-6 group"
            >
              <h4 className={`text-lg md:text-xl font-bold tracking-wide transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
                {item.title}
              </h4>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`text-lg transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-white/20'}`}
              >
                &#x2304;
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-white/50 text-base md:text-lg leading-[1.8] pb-6">
                    {item.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
}

export default function Community() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });
  const gridInView = useInView(gridRef, { margin: '-100px' });
  const [featured, setFeatured] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Auto-cycle every 3s when visible
  useEffect(() => {
    if (!gridInView) return;
    const timer = setInterval(() => {
      setFeatured((prev) => (prev + 1) % communityImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [gridInView]);

  const template = gridTemplates[featured];

  return (
    <section id="community" ref={sectionRef} className="relative py-34 md:py-44 lg:py-52 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-10 lg:px-20">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs tracking-[0.4em] uppercase mb-5"
          >
            #BOXXCOMMUNITY
          </motion.p>

          <div ref={headingRef} className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={headingInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              More Than a Gym
            </motion.h2>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Image side — animated reshuffling grid */}
          <motion.div ref={gridRef} style={{ y: imageY }} className="relative">
            <div
              className="grid gap-2 aspect-square"
              style={{
                gridTemplateColumns: template.cols,
                gridTemplateRows: template.rows,
                transition: 'grid-template-columns 0.8s cubic-bezier(0.22, 1, 0.36, 1), grid-template-rows 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {communityImages.map((img, i) => {
                const isFeatured = i === featured;

                return (
                  <div
                    key={img.src}
                    onClick={() => setFeatured(i)}
                    className="relative overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Dim overlay on non-featured */}
                    <div
                      className="absolute inset-0 transition-all duration-700"
                      style={{
                        background: isFeatured
                          ? 'linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 50%)'
                          : 'rgba(0,0,0,0.35)',
                      }}
                    />

                    {/* Label on featured */}
                    <div
                      className="absolute bottom-3 left-3 transition-opacity duration-500"
                      style={{ opacity: isFeatured ? 1 : 0 }}
                    >
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-medium">
                        #BOXXCNX
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>

          {/* Accordion side */}
          <CommunityAccordion />
        </div>
      </div>
    </section>
  );
}
