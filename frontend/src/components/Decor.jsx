// Decorative floating shapes / graffiti for hero sections.
export default function Decor({ variant = 'default' }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="blob bg-coral-gradient floaty" style={{ width: 360, height: 360, top: -80, right: -80 }} />
      <div className="blob bg-coral-gradient floaty" style={{ width: 240, height: 240, bottom: -60, left: -40, animationDelay: '2s' }} />
      {variant === 'default' && (
        <>
          <svg className="absolute top-10 right-20 spin-slow text-coral-400/40" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2l2.39 7.36H22l-6.19 4.5L18.2 22 12 17.5 5.8 22l2.39-8.14L2 9.36h7.61z" />
          </svg>
          <svg className="absolute bottom-20 right-10 floaty text-ink-400/30" style={{ animationDelay: '1.2s' }} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3v18" />
          </svg>
          <div className="absolute bottom-12 left-12 text-[10px] uppercase tracking-[0.4em] text-ink-400/50 font-mono">// ship · code · repeat</div>
        </>
      )}
    </div>
  );
}
