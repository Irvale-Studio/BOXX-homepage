'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

function RevealText({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        animate={inView ? { y: 0 } : { y: '100%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={sectionRef} className="relative py-34 md:py-44 lg:py-52">
      <div className="max-w-[1600px] mx-auto px-10 lg:px-20">
        <FadeIn>
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-5">
            About
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Left — Text */}
          <div>
            <RevealText>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                BOXX is...
              </h2>
            </RevealText>

            <FadeIn delay={0.2}>
              <p className="text-white/50 text-base md:text-lg leading-[1.9] mt-14">
                Chiang Mai&apos;s first luxury boutique boxing and Fitness Gym.
                Led by UK-qualified coaches, BOXX brings authentic British boxing
                and strength training to Thailand. Our small-group classes and
                private sessions combine proper technique, conditioning, and
                community.
              </p>
            </FadeIn>
          </div>

          {/* Right — Image */}
          <div className="relative mt-4 lg:mt-0">
            <motion.div style={{ y: imageY }} className="relative">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/brand/about-gym.png"
                  alt="BOXX boxing class in session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
