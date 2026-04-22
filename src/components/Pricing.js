'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const PLATFORM_URL = 'https://boxx.zatrovo.com';

function formatTHB(value) {
  if (value == null) return '';
  return new Intl.NumberFormat('en-US').format(value);
}

function formatValidity(days) {
  if (days == null) return '';
  if (days % 30 === 0 && days >= 30) {
    const months = days / 30;
    return months === 1 ? '1 month' : `${months} months`;
  }
  return days === 1 ? '1 day' : `${days} days`;
}

function perClassPrice(pack) {
  if (!pack.show_per_class_price) return null;
  if (!pack.credits || pack.credits < 1) return null;
  const per = pack.price_thb / pack.credits;
  return formatTHB(Math.round(per));
}

function buildFeatures(pack) {
  if (Array.isArray(pack.features) && pack.features.length > 0) {
    return pack.features;
  }

  const out = [];
  if (pack.credits == null) {
    out.push('Unlimited class credits');
  } else if (pack.credits === 1) {
    out.push('1 class credit');
  } else {
    out.push(`${pack.credits} class credits`);
  }

  out.push(`Valid for ${formatValidity(pack.validity_days)}`);
  out.push('Valid for all BOXX classes');

  const perClass = perClassPrice(pack);
  if (perClass) out.push(`THB ${perClass} per class`);

  if (pack.savings_text) out.push(pack.savings_text);

  return out;
}

function PricingCard({ pack, index, highlighted }) {
  const features = buildFeatures(pack);
  const cta = pack.cta_text || 'Purchase';
  const href = `${PLATFORM_URL}/buy-classes`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col border transition-colors duration-500 ${
        highlighted
          ? 'border-accent/40 bg-card'
          : 'border-card-border bg-card/50 hover:border-white/10'
      }`}
    >
      {pack.badge_text && (
        <div
          className={`absolute -top-3 left-6 px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase ${
            highlighted
              ? 'bg-accent text-[#0a0a0a] font-semibold'
              : 'bg-[#0a0a0a] border border-white/10 text-accent'
          }`}
        >
          {pack.badge_text}
        </div>
      )}

      <div className="p-8 md:p-9 flex-1 flex flex-col">
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            {pack.name}
          </h3>
          {pack.description && (
            <p className="text-white/40 text-sm leading-relaxed mt-3">
              {pack.description}
            </p>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] tracking-[0.2em] uppercase text-white/40">THB</span>
            <span className="text-4xl md:text-5xl font-bold tracking-tight">
              {formatTHB(pack.price_thb)}
            </span>
          </div>
          {pack.is_membership && (
            <p className="text-xs tracking-wider text-white/40 mt-2 uppercase">
              per {formatValidity(pack.validity_days)}
            </p>
          )}
          {perClassPrice(pack) && !pack.is_membership && (
            <p className="text-xs tracking-wider text-white/40 mt-2">
              THB {perClassPrice(pack)} per class
            </p>
          )}
        </div>

        <ul className="space-y-3 mb-10 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
              <span className="text-sm text-white/60 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full py-4 text-xs tracking-[0.2em] uppercase font-semibold text-center transition-colors duration-300 ${
            highlighted
              ? 'bg-cta text-[#0a0a0a] hover:bg-cta-hover'
              : 'border border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40 hover:text-white'
          }`}
        >
          {cta}
        </a>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [packs, setPacks] = useState(null);
  const [error, setError] = useState(false);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/packs', { cache: 'no-store' });
        if (!res.ok) throw new Error('Bad response');
        const data = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data.packs) ? data.packs : [];
        const active = list
          .filter((p) => p.active)
          .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));
        setPacks(active);
      } catch (e) {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const highlightedId = (() => {
    if (!packs) return null;
    const popular = packs.find((p) => (p.badge_text || '').toLowerCase().includes('popular'));
    if (popular) return popular.id;
    const bestValue = packs.find((p) => (p.badge_text || '').toLowerCase().includes('best'));
    if (bestValue) return bestValue.id;
    return null;
  })();

  return (
    <section id="pricing" className="relative py-34 md:py-44 lg:py-52">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-10 lg:px-20">
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs tracking-[0.4em] uppercase mb-5"
          >
            Pricing
          </motion.p>

          <div ref={headingRef} className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={headingInView ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Choose Your Pack
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 mt-6 max-w-lg text-base md:text-lg leading-relaxed"
          >
            Invest in yourself. Flexible packs with no expiry pressure — book anytime.
          </motion.p>
        </div>

        {packs === null && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-[420px] border border-card-border bg-card/30 animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="border border-card-border bg-card/50 p-10 text-center">
            <p className="text-white/60 mb-6">
              Unable to load live pricing right now.
            </p>
            <a
              href={`${PLATFORM_URL}/buy-classes`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-xs tracking-[0.2em] uppercase bg-cta text-[#0a0a0a] font-semibold hover:bg-cta-hover transition-colors"
            >
              View packs on BOXX
            </a>
          </div>
        )}

        {packs && packs.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
            {packs.map((pack, i) => (
              <PricingCard
                key={pack.id}
                pack={pack}
                index={i}
                highlighted={pack.id === highlightedId}
              />
            ))}
          </div>
        )}

        {packs && packs.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs tracking-[0.2em] uppercase text-white/30 mt-14"
          >
            All prices in Thai Baht · Secure checkout via Stripe
          </motion.p>
        )}
      </div>
    </section>
  );
}
