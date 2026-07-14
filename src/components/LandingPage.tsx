import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [visible, setVisible] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0.3);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Pulsing glow effect
  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setGlowIntensity(prev => {
        const next = prev + direction * 0.015;
        if (next >= 0.7) direction = -1;
        if (next <= 0.3) direction = 1;
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #050506 0%, #0a0a0c 40%, #0f0f12 100%)',
      }}
    >
      {/* Ambient smoke particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${100 + i * 60}px`,
              height: `${100 + i * 60}px`,
              background: i % 2 === 0
                ? `radial-gradient(circle, rgba(196,30,58,${0.03 + glowIntensity * 0.04}) 0%, transparent 70%)`
                : `radial-gradient(circle, rgba(45,90,61,${0.02 + glowIntensity * 0.03}) 0%, transparent 70%)`,
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      {/* Subtle top light wash */}
      <div
        className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(196,30,58,${glowIntensity * 0.12}) 0%, transparent 60%)`,
        }}
      />

      {/* Main content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-1500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Small tagline above */}
        <p
          className="text-xs uppercase tracking-[0.4em] mb-6"
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.35em',
          }}
        >
          Meal Planner for UC
        </p>

        {/* Main Title — Colitis Gourmet */}
        <h1
          className="mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textShadow: `0 0 ${30 + glowIntensity * 40}px rgba(196,30,58,${glowIntensity * 0.4})`,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Colitis Gourmet
        </h1>

        {/* Decorative line */}
        <div
          className="w-24 h-px mx-auto mb-6"
          style={{
            background: `linear-gradient(90deg, transparent 0%, var(--crimson) 50%, transparent 100%)`,
            opacity: 0.5 + glowIntensity * 0.3,
          }}
        />

        {/* Subtitle */}
        <p
          className="text-sm mb-10 max-w-xs mx-auto"
          style={{
            color: 'var(--text-secondary)',
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.6,
          }}
        >
          Fuel your body. Feed your soul.
        </p>

        {/* Enter Button — Dramatic Crimson Glow */}
        <button
          onClick={onEnter}
          className="group relative px-10 py-4 rounded-xl font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)',
            boxShadow: `0 0 ${20 + glowIntensity * 30}px rgba(196,30,58,${glowIntensity * 0.6}), 0 4px 20px rgba(0,0,0,0.5)`,
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '0.08em',
          }}
        >
          {/* Shimmer overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              animation: 'shimmer 2s infinite',
            }}
          />
          <span className="relative z-10">Bon Appétit</span>
        </button>

        {/* Chevron hint */}
        <div
          className="mt-8 animate-bounce"
          style={{ color: 'var(--text-muted)', opacity: 0.5 }}
        >
          <ChevronDown size={20} />
        </div>
      </div>

      {/* Signature — Bottom */}
      <div
        className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-1500 delay-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="w-16 h-px mx-auto mb-3"
          style={{
            background: `linear-gradient(90deg, transparent 0%, var(--text-muted) 50%, transparent 100%)`,
            opacity: 0.3,
          }}
        />
        <p
          className="text-xs"
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.15em',
          }}
        >
          Created with love by Babykay
        </p>
        <p
          className="text-[10px] mt-1"
          style={{
            color: 'var(--text-muted)',
            opacity: 0.5,
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.1em',
          }}
        >
          For Jade · 2026
        </p>
      </div>

      {/* Corner accent — top right */}
      <div
        className="absolute top-6 right-6 w-12 h-12 pointer-events-none"
        style={{
          borderTop: '1px solid rgba(196,30,58,0.2)',
          borderRight: '1px solid rgba(196,30,58,0.2)',
          opacity: glowIntensity,
        }}
      />
      {/* Corner accent — bottom left */}
      <div
        className="absolute bottom-6 left-6 w-12 h-12 pointer-events-none"
        style={{
          borderBottom: '1px solid rgba(196,30,58,0.2)',
          borderLeft: '1px solid rgba(196,30,58,0.2)',
          opacity: glowIntensity,
        }}
      />
    </div>
  );
}
