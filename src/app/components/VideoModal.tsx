import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { X, Play, Volume2, VolumeX } from 'lucide-react';
import heroVideo from '../../imports/XRecorder_Edited_20260701_01.mp4';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

export function VideoModal({ open, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    if (!open && videoRef.current) {
      videoRef.current.pause();
    }
  }, [open]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration) setProgress(currentTime / duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)' }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            <X className="h-5 w-5" style={{ transform: 'rotate(45deg)', transform: 'none' }} />
          </button>

          {/* Video container with clip-path spring expansion */}
          <motion.div
            initial={{ clipPath: 'inset(43.5% 43.5% 33.5% 43.5%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            exit={{ clipPath: 'inset(43.5% 43.5% 33.5% 43.5%)', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl mx-8"
            style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9' }}
          >
            <video
              ref={videoRef}
              src={heroVideo}
              muted={muted}
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover"
            />

            {/* Control bar */}
            <div
              className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center gap-4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
            >
              <button
                onClick={() => {
                  if (!videoRef.current) return;
                  videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Play className="h-4 w-4" fill="currentColor" />
              </button>

              {/* Progress track */}
              <div
                className="flex-1 h-0.5 rounded-full cursor-pointer relative"
                style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                onClick={handleSeek}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${progress * 100}%`, backgroundColor: '#00A2B6' }}
                />
              </div>

              <button
                onClick={() => setMuted((m) => !m)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Inline preview card with mouse-tracking "Play" tag ─────────── */

interface VideoPreviewProps {
  onOpen: () => void;
  children?: React.ReactNode;
}

export function VideoPreview({ onOpen, children }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tagX = useSpring(rawX, { mass: 0.1, damping: 10, stiffness: 300 });
  const tagY = useSpring(rawY, { mass: 0.1, damping: 10, stiffness: 300 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left - 36);
    rawY.set(e.clientY - rect.top - 18);
  };

  return (
    null
  );
}
