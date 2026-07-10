import React, { useState, useMemo } from 'react';
import { Search, Clock, Monitor, ShoppingCart, X } from 'lucide-react';
import { COURSES, CATEGORIES, CATEGORY_COLOR } from '../data/courses';
import type { CourseCategory, CourseType } from '../data/courses';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export default function CourseCatalog() {
  const { addToCart, items } = useCart();
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<CourseType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<CourseCategory | 'all'>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const bg = isDark ? '#050505' : '#FAF9F6';
  const cardBg = isDark ? '#0E0E0E' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : '#e5e7eb';
  const textPrimary = isDark ? '#FFFFFF' : '#111111';
  const textMuted = isDark ? 'rgba(255,255,255,0.45)' : '#6b7280';
  const filterBg = isDark ? '#111111' : '#FFFFFF';
  const filterBorder = isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb';
  const filterText = isDark ? 'rgba(255,255,255,0.6)' : '#6b7280';

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const matchQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.shortTitle.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase());
      const matchType = typeFilter === 'all' || c.type === typeFilter;
      const matchCat = categoryFilter === 'all' || c.category === categoryFilter;
      const matchLevel = levelFilter === 'all' || c.level === levelFilter;
      return matchQuery && matchType && matchCat && matchLevel;
    });
  }, [query, typeFilter, categoryFilter, levelFilter]);

  const inCart = (id: string) => items.some((i) => i.course.id === id);

  const clearFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setLevelFilter('all');
  };

  const hasFilters = query || typeFilter !== 'all' || categoryFilter !== 'all' || levelFilter !== 'all';

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, fontFamily: 'Inter, sans-serif' }}>
      {/* Page hero — always dark */}
      <div
        className="pt-24 sm:pt-28 pb-14 px-4"
        style={{ background: 'linear-gradient(135deg, #050D1A 0%, #0A1628 100%)' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00A2B6' }}>
            Course Catalog
          </p>
          <h1 className="text-white mb-3 leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800 }}>
            Find Your Next Certification
          </h1>
          <p className="text-white/60 mb-8" style={{ fontSize: '1.05rem', maxWidth: 520 }}>
            Browse {COURSES.length} courses — from accelerated bootcamps to self-paced online training.
            All priced at ₦60,000 flat.
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by course name, cert, or category…"
              className="w-full pl-12 pr-10 py-4 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 shadow-lg"
              style={{ '--tw-ring-color': '#00A2B6' } as React.CSSProperties}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          {/* Type tabs */}
          <div
            className="flex rounded-xl p-1 shadow-sm"
            style={{ backgroundColor: filterBg, border: `1px solid ${filterBorder}` }}
          >
            {(['all', 'bootcamp', 'online'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
                style={{
                  backgroundColor: typeFilter === t ? '#00A2B6' : 'transparent',
                  color: typeFilter === t ? '#fff' : filterText,
                }}
              >
                {t === 'all' ? 'All' : t === 'bootcamp' ? 'Bootcamps' : 'Online'}
              </button>
            ))}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(categoryFilter === cat ? 'all' : cat)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  backgroundColor: categoryFilter === cat ? CATEGORY_COLOR[cat] : filterBg,
                  color: categoryFilter === cat ? '#fff' : filterText,
                  borderColor: categoryFilter === cat ? CATEGORY_COLOR[cat] : filterBorder,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 border"
            style={{
              '--tw-ring-color': '#00A2B6',
              backgroundColor: filterBg,
              color: filterText,
              borderColor: filterBorder,
            } as React.CSSProperties}
          >
            <option value="all">All Levels</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>

          <div className="ml-auto flex items-center gap-3">
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium flex items-center gap-1.5"
                style={{ color: '#00A2B6' }}
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
            <span className="text-sm font-medium" style={{ color: textMuted }}>
              {filtered.length} courses
            </span>
          </div>
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div
              className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#f3f4f6' }}
            >
              <Search className="h-7 w-7" style={{ color: textMuted }} />
            </div>
            <p className="font-semibold text-lg mb-2" style={{ color: textPrimary }}>No courses found</p>
            <p className="text-sm mb-6" style={{ color: textMuted }}>Try adjusting your filters or search terms.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-full font-semibold text-white"
              style={{ backgroundColor: '#00A2B6' }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course) => {
            const catColor = CATEGORY_COLOR[course.category] || '#6b7280';
            const alreadyInCart = inCart(course.id);

            return (
              <article
                key={course.id}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                {/* Thumbnail */}
                <div
                  className="relative h-44 overflow-hidden flex-shrink-0"
                  style={{ background: course.gradient || '#0A1628' }}
                >
                  {course.image ? (
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-end p-5">
                      <span
                        className="font-black text-white/90"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1 }}
                      >
                        {course.shortTitle}
                      </span>
                    </div>
                  )}

                  {/* Type badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                      style={{
                        backgroundColor:
                          course.type === 'bootcamp'
                            ? 'rgba(0,162,182,0.9)'
                            : 'rgba(10,22,40,0.85)',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      {course.type === 'bootcamp' ? 'Bootcamp' : 'Online'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  {/* Category */}
                  <span
                    className="text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: catColor }}
                  >
                    {course.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="mb-1 leading-snug"
                    style={{ fontSize: '0.87rem', fontWeight: 700, color: textPrimary }}
                  >
                    {course.title}
                  </h3>

                  <p
                    className="text-xs leading-relaxed mb-3 flex-1"
                    style={{ color: textMuted }}
                  >
                    {course.description.slice(0, 80)}…
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs mb-3" style={{ color: textMuted }}>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {course.duration}
                    </span>
                    {course.videos && (
                      <span className="flex items-center gap-1">
                        <Monitor className="h-3.5 w-3.5" /> {course.videos}
                      </span>
                    )}
                  </div>

                  {/* Price row */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-black"
                      style={{ fontSize: '1.15rem', color: '#00A2B6' }}
                    >
                      ₦{course.price.toLocaleString()}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#f3f4f6',
                        color: textMuted,
                        border: `1px solid ${cardBorder}`,
                      }}
                    >
                      {course.level}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => addToCart(course)}
                    disabled={alreadyInCart}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
                    style={{
                      backgroundColor: alreadyInCart
                        ? (isDark ? 'rgba(255,255,255,0.06)' : '#e5e7eb')
                        : '#00A2B6',
                      color: alreadyInCart ? textMuted : '#fff',
                      cursor: alreadyInCart ? 'default' : 'pointer',
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {alreadyInCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
