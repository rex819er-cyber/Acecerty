import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import type { Course } from '../data/courses';
import {
  ChevronDown, ChevronUp, CheckCircle2, Users, Star, Clock,
  BookOpen, Award, Play, ShoppingCart, ArrowLeft, Globe,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES } from '../data/courses';
import { getCourseDetail, DEFAULT_DETAIL } from '../data/courseDetails';
import type { CurriculumModule } from '../data/courseDetails';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

function ModuleRow({ mod, index, defaultOpen }: { mod: CurriculumModule; index: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const { isDark } = useTheme();
  const border = isDark ? 'rgba(255,255,255,0.07)' : '#e5e7eb';
  const bg = isDark ? '#0d0d0d' : '#fff';
  const hoverBg = isDark ? '#111' : '#f9fafb';
  const textPrimary = isDark ? '#fff' : '#111';
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : '#6b7280';
  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 12, marginBottom: 8, backgroundColor: bg }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ borderRadius: 12, color: textPrimary }}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tabular-nums" style={{ color: '#00A2B6', minWidth: 20 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold text-sm">{mod.title}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <span className="text-xs" style={{ color: textMuted }}>{mod.duration}</span>
          {open ? <ChevronUp className="h-4 w-4" style={{ color: textMuted }} /> : <ChevronDown className="h-4 w-4" style={{ color: textMuted }} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="px-5 pb-4 flex flex-col gap-2">
              {mod.lessons.map((lesson, i) => (
                <li key={i} className="flex items-center gap-3 text-sm" style={{ color: textMuted }}>
                  <Play className="h-3 w-3 flex-shrink-0" style={{ color: '#00A2B6' }} />
                  {lesson}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isDark } = useTheme();
  const { addToCart, items } = useCart();

  const course = COURSES.find((c) => c.id === id);
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ backgroundColor: isDark ? '#050505' : '#FAF9F6' }}>
        <p className="text-2xl font-bold" style={{ color: isDark ? '#fff' : '#111' }}>Course not found</p>
        <Link to="/courses" className="px-6 py-3 rounded-full text-sm font-bold text-white" style={{ backgroundColor: '#00A2B6' }}>
          Browse Courses
        </Link>
      </div>
    );
  }

  const rawDetail = getCourseDetail(course.id);
  const detail = rawDetail ?? { ...DEFAULT_DETAIL, id: course.id };

  const isInCart = items.some((i) => i.course.id === course.id);
  const bg = isDark ? '#050505' : '#FAF9F6';
  const cardBg = isDark ? '#0d0d0d' : '#fff';
  const textPrimary = isDark ? '#fff' : '#111';
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : '#6b7280';
  const border = isDark ? 'rgba(255,255,255,0.07)' : '#e5e7eb';

  const handleEnroll = () => {
    if (!isInCart) addToCart(course);
  };

  const stars = Math.round(detail.rating);
  const totalLessons = detail.curriculum.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <div style={{ backgroundColor: bg, fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        className="pt-20 sm:pt-24 pb-10 px-4"
        style={{ background: course.gradient ?? 'linear-gradient(135deg,#0B1D3A,#1a3a6e)' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5 text-white/60 text-xs">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/90">{course.shortTitle}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* Left: info */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: 'rgba(0,162,182,0.25)', color: '#00D4EC' }}>
                {course.category}
              </span>
              <h1 className="text-white font-black mb-3 leading-tight" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.6rem)' }}>
                {course.title}
              </h1>
              <p className="text-white/75 mb-6" style={{ fontSize: '1.05rem', maxWidth: 560 }}>
                {detail.tagline}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4" fill={i < stars ? '#F59E0B' : 'none'} style={{ color: '#F59E0B' }} />
                    ))}
                  </div>
                  <span className="text-white font-semibold text-sm">{detail.rating}</span>
                  <span className="text-white/60 text-sm">({detail.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Users className="h-4 w-4" /> {detail.students.toLocaleString()} students
                </div>
                <div className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Globe className="h-4 w-4" /> {detail.language}
                </div>
                <div className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Clock className="h-4 w-4" /> Updated {detail.lastUpdated}
                </div>
              </div>

              {/* Instructor mini */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white"
                  style={{ backgroundColor: '#00A2B6' }}>
                  {detail.instructor.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{detail.instructor.name}</p>
                  <p className="text-white/55 text-xs">{detail.instructor.credentials}</p>
                </div>
              </div>
            </div>

            {/* Right: enroll card (desktop) */}
            <div className="hidden lg:block">
              <EnrollCard
                course={course}
                detail={detail}
                isInCart={isInCart}
                onEnroll={handleEnroll}
                isDark={isDark}
                totalLessons={totalLessons}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Main content */}
          <div>
            {/* Highlights grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {detail.highlights.map((h) => (
                <div key={h.label} className="rounded-2xl p-4 flex items-center gap-3"
                  style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}>
                  <span className="text-2xl">{h.icon}</span>
                  <div>
                    <p className="text-xs" style={{ color: textMuted }}>{h.label}</p>
                    <p className="text-sm font-bold" style={{ color: textPrimary }}>{h.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What you'll learn */}
            <Section title="What You'll Learn" isDark={isDark}>
              <div className="grid sm:grid-cols-2 gap-3">
                {detail.outcomes.map((o, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#00A2B6' }} />
                    <span className="text-sm" style={{ color: textMuted }}>{o}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Curriculum */}
            <Section title={`Curriculum · ${detail.curriculum.length} modules · ${totalLessons} lessons`} isDark={isDark}>
              {detail.curriculum.map((mod, i) => (
                <ModuleRow key={i} mod={mod} index={i} defaultOpen={i === 0} />
              ))}
            </Section>

            {/* Requirements */}
            <Section title="Requirements" isDark={isDark}>
              <ul className="flex flex-col gap-2">
                {detail.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: textMuted }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#00A2B6' }} />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Who is this for */}
            <Section title="Who Is This For?" isDark={isDark}>
              <ul className="flex flex-col gap-2">
                {detail.audience.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: textMuted }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#00A2B6' }} />
                    {a}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Instructor */}
            <Section title="Your Instructor" isDark={isDark}>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0"
                  style={{ backgroundColor: '#00A2B6' }}>
                  {detail.instructor.avatar}
                </div>
                <div>
                  <p className="font-bold text-base mb-0.5" style={{ color: textPrimary }}>{detail.instructor.name}</p>
                  <p className="text-sm mb-2" style={{ color: '#00A2B6' }}>{detail.instructor.credentials}</p>
                  <p className="text-xs mb-3" style={{ color: textMuted }}>{detail.instructor.experience} experience</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {detail.instructor.certs.map((c) => (
                      <span key={c} className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: isDark ? 'rgba(0,162,182,0.15)' : 'rgba(0,162,182,0.10)', color: '#00A2B6' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: textMuted }}>{detail.instructor.bio}</p>
                </div>
              </div>
            </Section>
          </div>

          {/* Sidebar (desktop) */}
          <div className="hidden lg:block sticky top-24">
            <EnrollCard
              course={course}
              detail={detail}
              isInCart={isInCart}
              onEnroll={handleEnroll}
              isDark={isDark}
              totalLessons={totalLessons}
            />
          </div>
        </div>

        {/* Mobile enroll bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4"
          style={{ backgroundColor: isDark ? 'rgba(5,5,5,0.97)' : 'rgba(255,255,255,0.97)', borderTop: `1px solid ${border}`, backdropFilter: 'blur(16px)' }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-black text-xl" style={{ color: '#00A2B6' }}>₦60,000</p>
              {course.originalPrice && (
                <p className="text-xs line-through" style={{ color: textMuted }}>₦{course.originalPrice.toLocaleString()}</p>
              )}
            </div>
            <button
              onClick={handleEnroll}
              className="flex-1 max-w-xs py-3.5 rounded-full text-sm font-bold text-white transition-all active:scale-95"
              style={{ backgroundColor: isInCart ? '#047857' : '#00A2B6' }}
            >
              {isInCart ? '✓ Added to Cart' : 'Enrol Now — ₦60,000'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, isDark }: { title: string; children: React.ReactNode; isDark: boolean }) {
  const border = isDark ? 'rgba(255,255,255,0.07)' : '#e5e7eb';
  const textPrimary = isDark ? '#fff' : '#111';
  return (
    <div className="mb-10 pb-10" style={{ borderBottom: `1px solid ${border}` }}>
      <h2 className="text-lg font-black mb-5" style={{ color: textPrimary }}>{title}</h2>
      {children}
    </div>
  );
}

function EnrollCard({
  course, detail, isInCart, onEnroll, isDark, totalLessons,
}: {
  course: Course;
  detail: any; isInCart: boolean; onEnroll: () => void; isDark: boolean; totalLessons: number;
}) {
  const cardBg = isDark ? '#0d0d0d' : '#fff';
  const border = isDark ? 'rgba(255,255,255,0.10)' : '#e5e7eb';
  const textPrimary = isDark ? '#fff' : '#111';
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : '#6b7280';

  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}>
      {/* Hero preview */}
      <div className="h-40 relative flex items-center justify-center"
        style={{ background: course.gradient ?? 'linear-gradient(135deg,#0B1D3A,#1a3a6e)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div className="text-center relative z-10">
          <div className="text-4xl font-black text-white opacity-90 mb-1">{course.shortTitle}</div>
          <div className="text-white/60 text-sm">{course.duration} Bootcamp</div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <span className="text-3xl font-black" style={{ color: '#00A2B6' }}>₦60,000</span>
          {course.originalPrice && (
            <span className="text-sm line-through ml-2" style={{ color: textMuted }}>₦{course.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <button
          onClick={onEnroll}
          className="w-full py-4 rounded-2xl text-base font-bold text-white transition-all active:scale-[0.97] mb-3"
          style={{
            backgroundColor: isInCart ? '#047857' : '#00A2B6',
            boxShadow: isInCart ? 'none' : '0 4px 20px rgba(0,162,182,0.35)',
          }}
        >
          {isInCart ? '✓ Added to Cart' : 'Enrol Now'}
        </button>

        <Link
          to="/checkout"
          className="block w-full py-3.5 rounded-2xl text-sm font-semibold text-center transition-all active:scale-[0.97]"
          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: textPrimary }}
          onClick={() => { if (!isInCart) onEnroll(); }}
        >
          Buy Now
        </Link>

        <div className="mt-5 flex flex-col gap-2.5">
          {[
            { icon: Clock, label: `${course.duration} instructor-led training` },
            { icon: BookOpen, label: `${totalLessons} lessons across ${detail.curriculum.length} modules` },
            { icon: Award, label: 'Completion certificate' },
            { icon: Users, label: `${detail.students.toLocaleString()} enrolled` },
            { icon: ShoppingCart, label: '30-day satisfaction guarantee' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-xs" style={{ color: textMuted }}>
              <Icon className="h-4 w-4 flex-shrink-0" style={{ color: '#00A2B6' }} />
              {label}
            </div>
          ))}
        </div>

        {course.nextDate && (
          <div className="mt-5 rounded-2xl px-4 py-3 text-center"
            style={{ backgroundColor: isDark ? 'rgba(0,162,182,0.10)' : 'rgba(0,162,182,0.08)' }}>
            <p className="text-xs" style={{ color: textMuted }}>Next cohort starts</p>
            <p className="font-bold text-sm mt-0.5" style={{ color: '#00A2B6' }}>{course.nextDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}
