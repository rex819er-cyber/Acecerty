import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Shield, CheckCircle, Users, Star, Award } from 'lucide-react';
import { VideoPreview, VideoModal } from './VideoModal';
import { useTheme } from '../context/ThemeContext';
import { ConstellationCanvas } from './ConstellationCanvas';

const STATS = [
  { value: '250k+', label: 'Certified', icon: Users },
  { value: '95%', label: 'Pass Rate', icon: Star },
  { value: '100+', label: 'Certs', icon: Award },
];

const CERT_BADGES = ['CISSP', 'Security+', 'AWS', 'PMP', 'CCNA', 'CISM'];

/* ── Animated counter ────────────────────────────────────────────── */
function AnimatedCounter({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center sm:items-start"
    >
      <span
        style={{
          fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#00A2B6',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.55, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 3 }}>
        {label}
      </span>
    </motion.div>
  );
}

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isDark } = useTheme();

  const bg = isDark ? '#050505' : '#FAF9F6';
  const textPrimary = isDark ? '#FFFFFF' : '#111111';
  const textMuted = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const cardBg = isDark ? 'rgba(14,14,14,0.95)' : 'rgba(255,255,255,0.95)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const badgeBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const badgeBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';
  const dividerColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  return (
    <section
      style={{ backgroundColor: bg, fontFamily: 'Inter, sans-serif', minHeight: '100vh', color: textPrimary }}
      className="relative flex items-center pt-16 sm:pt-20 overflow-hidden"
    >
      {/* Constellation particle engine (System K) */}
      <ConstellationCanvas />

      {/* Cyan glow blob */}
      <div
        className="absolute -top-40 -left-40 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(0,162,182,0.14) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(0,162,182,0.08) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(0,162,182,0.07) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(0,162,182,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Copy ───────────────────────────────────── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.02 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: badgeBg, border: `1px solid ${badgeBorder}` }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse flex-shrink-0"
                style={{ backgroundColor: '#22c55e' }}
              />
              <span className="text-xs font-semibold" style={{ color: textMuted }}>
                Classes now enrolling · July 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: textPrimary,
                fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
              }}
              className="mb-6"
            >
              Learn Today.
              <br />
              <span style={{ color: '#00A2B6' }}>Lead Tomorrow.</span>
              <span style={{ color: textMuted, fontSize: '0.7em' }}>™</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mb-8 max-w-lg leading-relaxed"
              style={{ color: textMuted, fontSize: '1.08rem' }}
            >
              Accelerated IT certification training designed to unlock new skills,
              fast-track your career, and deliver results — today, not someday.
            </motion.p>

            {/* Guarantee pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
              style={{ backgroundColor: badgeBg, border: `1px solid ${badgeBorder}` }}
            >
              <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#22c55e' }} />
              <span className="text-xs font-semibold" style={{ color: textPrimary }}>
                Exam-Day Ready · Free Retake Guarantee · ₦60,000 Flat Rate
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-all hover:opacity-90 active:scale-95 hover:shadow-lg"
                style={{ backgroundColor: '#00A2B6', fontSize: '0.92rem', boxShadow: '0 8px 24px rgba(0,162,182,0.30)' }}
              >
                Browse Courses <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/training"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all active:scale-95"
                style={{
                  fontSize: '0.92rem',
                  color: textPrimary,
                  backgroundColor: badgeBg,
                  border: `1px solid ${badgeBorder}`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00A2B6'; (e.currentTarget as HTMLElement).style.color = '#00A2B6'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = badgeBorder; (e.currentTarget as HTMLElement).style.color = textPrimary; }}
              >
                View Training
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-7 flex-wrap"
            >
              {STATS.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && (
                    <div className="h-8 w-px hidden sm:block" style={{ backgroundColor: dividerColor }} />
                  )}
                  <AnimatedCounter value={s.value} label={s.label} icon={s.icon} />
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Video ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow behind video */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(0,162,182,0.18) 0%, transparent 65%)',
                filter: 'blur(20px)',
                transform: 'scale(1.15)',
              }}
            />

            <VideoPreview onOpen={() => setModalOpen(true)}>
              {/* Floating badge: Shield */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: 'blur(16px)' }}
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#00A2B6' }}
                >
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ color: textPrimary }}>Exam-Day Ready</p>
                  <p className="text-xs" style={{ color: textMuted }}>Free Retake Guarantee</p>
                </div>
              </motion.div>

              {/* Floating badge: Certs */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-5 -right-5 rounded-2xl px-4 py-3 shadow-2xl"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, backdropFilter: 'blur(16px)' }}
              >
                <p className="text-xs mb-2 font-medium" style={{ color: textMuted }}>Top Certifications</p>
                <div className="flex flex-wrap gap-1.5">
                  {CERT_BADGES.slice(0, 4).map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-white"
                      style={{ backgroundColor: '#00A2B6' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Live indicator */}
              <div
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
              >
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: '#00A2B6' }} />
                <span className="text-white text-xs font-semibold">Live Training Preview</span>
              </div>
            </VideoPreview>
          </motion.div>
        </div>
      </div>

      <VideoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
