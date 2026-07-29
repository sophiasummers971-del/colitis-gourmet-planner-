import { useState, useEffect } from 'react';
import { ChevronDown, UtensilsCrossed } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [visible, setVisible] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setGlowIntensity(prev => {
        const next = prev + direction * 0.012;
        if (next >= 0.7) direction = -1;
        if (next <= 0.3) direction = 1;
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, #050506 0%, #0a0a0c 40%, #0f0f12 100%)',
      }}
    >
      {/* Hero food image with parallax + ken burns */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          transform: `scale(1.1) translateY(${scrollY * 0.3}px)`,
          opacity: visible ? 0.12 : 0,
          transition: 'opacity 2s ease-out',
        }}
      >
        <img
          src="https://images.pexels.com/photos/5501019/pexels-photo-5501019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'blur(2px) saturate(0.7)' }}
        />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, #070708 80%)',
        }} />
      </div>

      {/* Ambient smoke particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${80 + i * 50}px`,
              height: `${80 + i * 50}px`,
              background: i % 2 === 0
                ? `radial-gradient(circle, rgba(196,30,58,${0.025 + glowIntensity * 0.035}) 0%, transparent 70%)`
                : `radial-gradient(circle, rgba(212,160,23,${0.015 + glowIntensity * 0.025}) 0%, transparent 70%)`,
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 22}%`,
              animation: `float ${7 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
              filter: 'blur(35px)',
            }}
          />
        ))}
      </div>

      {/* Top light wash */}
      <div
        className="fixed top-0 left-0 right-0 h-[45%] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(196,30,58,${glowIntensity * 0.14}) 0%, transparent 60%)`,
        }}
      />

      {/* Main content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 min-h-screen justify-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Icon emblem */}
        <div
          className="mb-8 animate-drop-in"
          style={{ animationDelay: '200ms' }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
            style={{
              background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)',
              boxShadow: `0 0 ${30 + glowIntensity * 40}px rgba(196,30,58,${glowIntensity * 0.5}), 0 8px 30px rgba(0,0,0,0.6)`,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <UtensilsCrossed size={36} style={{ color: '#fff' }} />
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-xs uppercase mb-5 animate-fade-in"
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.35em',
            animationDelay: '400ms',
            animationFillMode: 'both',
          }}
        >
          Meal Planner for UC
        </p>

        {/* Main Title */}
        <h1
          className="mb-3 animate-slide-up"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 9vw, 5.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textShadow: `0 0 ${30 + glowIntensity * 40}px rgba(196,30,58,${glowIntensity * 0.4}), 0 4px 30px rgba(0,0,0,0.8)`,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            animationDelay: '500ms',
            animationFillMode: 'both',
          }}
        >
          Colitis Gourmet
        </h1>

        {/* Decorative line */}
        <div
          className="w-32 h-px mx-auto mb-6 animate-fade-in"
          style={{
            background: `linear-gradient(90deg, transparent 0%, var(--crimson) 50%, transparent 100%)`,
            opacity: 0.5 + glowIntensity * 0.3,
            animationDelay: '700ms',
            animationFillMode: 'both',
          }}
        />

        {/* Subtitle */}
        <p
          className="text-sm mb-10 max-w-sm mx-auto animate-fade-in leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.7,
            animationDelay: '800ms',
            animationFillMode: 'both',
          }}
        >
          Forward is enough. Plan gentle, nourishing meals
          with confidence — whether you're flaring or thriving.
        </p>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="group relative px-12 py-4 rounded-xl font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-dim) 100%)',
            boxShadow: `0 0 ${20 + glowIntensity * 30}px rgba(196,30,58,${glowIntensity * 0.6}), 0 4px 20px rgba(0,0,0,0.5)`,
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '0.08em',
            border: '1px solid rgba(255,255,255,0.1)',
            animationDelay: '1000ms',
            animationFillMode: 'both',
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
              animation: 'shimmer 2s infinite',
            }}
          />
          <span className="relative z-10">Bon Appétit</span>
        </button>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 animate-fade-in"
          style={{ animationDelay: '1200ms', animationFillMode: 'both' }}
        >
          {['Safe Foods', 'Meal Planning', 'Nutrition', 'Shopping'].map((feat) => (
            <span
              key={feat}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
              }}
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Chevron hint */}
        <div
          className="mt-10 animate-bounce"
          style={{ color: 'var(--text-muted)', opacity: 0.4 }}
        >
          <ChevronDown size={20} />
        </div>
      </div>

      {/* Signature */}
      <div
        className={`fixed bottom-6 left-0 right-0 text-center transition-all duration-1000 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1500ms' }}
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
          style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em' }}
        >
          Created with heart by Babykay
        </p>
        <p
          className="text-[10px] mt-1"
          style={{ color: 'var(--text-muted)', opacity: 0.5, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
        >
          For Jade · 2026
        </p>
      </div>

      {/* Corner accents */}
      <div
        className="fixed top-6 right-6 w-12 h-12 pointer-events-none transition-opacity duration-1000"
        style={{
          borderTop: '1px solid rgba(196,30,58,0.25)',
          borderRight: '1px solid rgba(196,30,58,0.25)',
          opacity: glowIntensity,
        }}
      />
      <div
        className="fixed bottom-6 left-6 w-12 h-12 pointer-events-none transition-opacity duration-1000"
        style={{
          borderBottom: '1px solid rgba(196,30,58,0.25)',
          borderLeft: '1px solid rgba(196,30,58,0.25)',
          opacity: glowIntensity,
        }}
      />
    </div>
  );
}
