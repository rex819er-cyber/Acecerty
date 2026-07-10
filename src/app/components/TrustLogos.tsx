import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LOGOS = [
  'Amazon', 'Aramark', 'Chase Bank', 'Exelon', 'L3Harris',
  'Optiv', 'Samsung', 'Toyota', 'USAA', 'US Air Force', 'Visa',
];

export function TrustLogos() {
  const { isDark } = useTheme();
  const tripled = [...LOGOS, ...LOGOS, ...LOGOS];

  const bg = isDark ? '#050505' : '#FAF9F6';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.40)';

  return (
    null
  );
}
