import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const REQUEST_TYPES = ['Individual Training', 'Team Training', 'Enterprise Solutions', 'Request Quote', 'Other'];

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const { isDark } = useTheme();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', requestType: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const cardBg = isDark ? '#0E0E0E' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)';
  const labelColor = isDark ? 'rgba(255,255,255,0.45)' : '#6b7280';
  const inputBg = isDark ? '#141414' : '#FFFFFF';
  const inputBorder = isDark ? 'rgba(255,255,255,0.10)' : '#e5e7eb';
  const inputText = isDark ? '#FFFFFF' : '#111827';

  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all';
  const inputStyle = { backgroundColor: inputBg, border: `1px solid ${inputBorder}`, color: inputText, '--tw-ring-color': '#00A2B6' } as React.CSSProperties;

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: isDark ? 'linear-gradient(135deg, #050505 0%, #111118 60%, #050505 100%)' : 'linear-gradient(135deg, #EEF9FB 0%, #F0FDFF 60%, #EEF9FB 100%)', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`, backgroundSize: '40px 40px' }}
      />
      {/* Cyan glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,162,182,0.10) 0%, transparent 70%)', transform: 'translate(30%, -30%)', filter: 'blur(40px)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#00A2B6' }}>Get In Touch</p>
            <h2
              className="mb-6 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, color: isDark ? '#FFFFFF' : '#111111' }}
            >
              The accelerated learning company for busy IT professionals looking to upskill, fast.
            </h2>
            <p className="mb-10 leading-relaxed" style={{ fontSize: '1.05rem', color: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.50)' }}>
              Whether you're an individual looking to level up or an enterprise building a security-ready team, our training advisors are ready to help you find the right path.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[{ val: '250k+', label: 'Students trained' }, { val: '94%', label: 'Pass rate' }, { val: '27 yrs', label: 'Industry experience' }].map((s) => (
                null
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-3xl p-8 lg:p-10 shadow-2xl" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(0,162,182,0.12)' }}>
                  <CheckCircle className="h-8 w-8" style={{ color: '#00A2B6' }} />
                </div>
                <h3 className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 700, color: isDark ? '#FFFFFF' : '#111827' }}>Request Received</h3>
                <p style={{ color: labelColor }}>A training advisor will contact you shortly to discuss your goals.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="mb-2" style={{ fontSize: '1.25rem', fontWeight: 700, color: isDark ? '#FFFFFF' : '#111827' }}>Talk to a training advisor</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>First Name</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Jane" className={inputCls} style={inputStyle} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Smith" className={inputCls} style={inputStyle} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jane@company.com" className={inputCls} style={inputStyle} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputCls} style={inputStyle} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>Company</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" className={inputCls} style={inputStyle} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>Type of Request</label>
                  <select name="requestType" value={form.requestType} onChange={handleChange} className={inputCls} style={{ ...inputStyle }}>
                    <option value="">Select a type…</option>
                    {REQUEST_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your training goals…" className={inputCls} style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: '#00A2B6' }}
                >
                  <Send className="h-4 w-4" /> Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
