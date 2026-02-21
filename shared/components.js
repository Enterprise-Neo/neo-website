/* ═══════════════════════════════════════════════════════════════
   NeoTariff — Shared React Components
   ─────────────────────────────────────────────────────────────
   This file defines the Nav, Footer, and utility components
   shared by all pages. Loaded as type="text/babel" so JSX works.

   Edit nav links, footer links, logo, etc. here — once.
   ═══════════════════════════════════════════════════════════════ */

const { useState, useEffect, useCallback } = React;

/* ── Site Config ──
   Change URLs, labels, and external links here.
*/
const SITE = {
  name: 'NeoTariff',
  tagline: 'by Enterprise-Neo',
  loginUrl: 'https://tariff.enterprise-neo.com/',
  signupUrl: 'https://tariff.enterprise-neo.com/signup',
  apiBaseUrl: 'https://tariff-data.enterprise-neo.com',
  apiDocsUrl: 'https://tariff-data.enterprise-neo.com/docs',
  pypiUrl: 'https://pypi.org/project/neo-tariff/',
  githubUrl: 'https://github.com/Enterprise-Neo',
  copyright: '© 2026 Enterprise-Neo. All rights reserved.',
};

/* ── Scroll Animation Hook ── */
window.useScrollAnimation = (threshold = 0.08) => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  useEffect(() => {
    const o = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id]));
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);
  return (id) => visibleSections.has(id);
};

/* ── Arrow Icon (reused in many places) ── */
window.ArrowIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Chevron Icon ── */
const ChevronDown = ({ open }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : '' }}
  >
    <path
      d="M2 4l3 3 3-3"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ════════════════════════════════════════════
   NAV COMPONENT
   ────────────────────────────────────────────
   Props:
     activePage: "home"|"neotariff"|"technology"|"pricing"|"company"|"platform"|"api"|"sdk"
     transparent: boolean — if true, nav starts transparent and becomes solid on scroll (hero)
   ════════════════════════════════════════════ */
window.NeoNav = ({ activePage = 'home', transparent = true }) => {
  const [neotariffOpen, setNeotariffOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ntTimer = React.useRef(null);
  const coTimer = React.useRef(null);

  useEffect(() => {
    if (!transparent) return;
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, [transparent]);

  // Click-outside fallback
  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest('.dropdown-neotariff')) setNeotariffOpen(false);
      if (!e.target.closest('.dropdown-company')) setCompanyOpen(false);
    };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const showNt = () => { clearTimeout(ntTimer.current); setNeotariffOpen(true); setCompanyOpen(false); };
  const hideNt = () => { ntTimer.current = setTimeout(() => setNeotariffOpen(false), 150); };
  const showCo = () => { clearTimeout(coTimer.current); setCompanyOpen(true); setNeotariffOpen(false); };
  const hideCo = () => { coTimer.current = setTimeout(() => setCompanyOpen(false), 150); };

  const isNeoTariffPage = ['neotariff', 'platform', 'api', 'sdk', 'technology'].includes(activePage);
  const isCompanyPage = ['company'].includes(activePage);
  const isEnterpriseBrand = ['home', 'company'].includes(activePage);
  const navClasses = [
    'neo-nav',
    'sans',
    transparent ? 'neo-nav--transparent' : '',
    transparent && scrolled ? 'neo-nav--scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const linkStyle = (page) => ({
    padding: '8px 14px',
    fontSize: 'var(--fs-sm)',
    textDecoration: 'none',
    fontWeight: activePage === page ? 600 : 400,
    color: activePage === page ? 'var(--text-primary)' : 'var(--text-secondary)',
    ...(activePage === page ? { borderBottom: '2px solid var(--accent)', marginBottom: -1 } : {}),
  });

  const dropdownTriggerStyle = (isActive) => ({
    padding: '8px 14px',
    fontSize: 'var(--fs-sm)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontWeight: isActive ? 600 : 400,
    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
    borderBottom: isActive ? '2px solid var(--accent)' : 'none',
    marginBottom: isActive ? -1 : 0,
    cursor: 'pointer',
  });

  return (
    <nav className={navClasses}>
      <a
        href="/"
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: '#fff',
              fontSize: 'var(--fs-sm)',
              fontWeight: 800,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            N
          </span>
        </div>
        {isEnterpriseBrand ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span
              style={{
                color: 'var(--text-primary)',
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              Enterprise
            </span>
            <span style={{ color: 'var(--accent-bright)', fontSize: 16, fontWeight: 700 }}>
              Neo
            </span>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                Neo
              </span>
              <span style={{ color: 'var(--accent-bright)', fontSize: 16, fontWeight: 400 }}>
                Tariff
              </span>
            </div>
            <span
              className="mono"
              style={{ fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.08em' }}
            >
              {SITE.tagline}
            </span>
          </>
        )}
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {/* NeoTariff dropdown — hover to show, click navigates */}
          <div
            className="dropdown-neotariff"
            style={{ position: 'relative' }}
            onMouseEnter={showNt}
            onMouseLeave={hideNt}
          >
            <a
              href="/neotariff/"
              className="sans"
              style={dropdownTriggerStyle(isNeoTariffPage)}
            >
              NeoTariff <ChevronDown open={neotariffOpen} />
            </a>
            <div className={`dropdown-menu ${neotariffOpen ? 'open' : ''}`}>
              <div className="dd-label sans">PRODUCT FEATURES</div>
              <a
                href="/neotariff/platform/"
                style={activePage === 'platform' ? { color: 'var(--accent)' } : {}}
              >
                Platform
              </a>
              <a href="/neotariff/api/" style={activePage === 'api' ? { color: 'var(--accent)' } : {}}>
                REST API
              </a>
              <a href="/neotariff/sdk/" style={activePage === 'sdk' ? { color: 'var(--accent)' } : {}}>
                Python SDK
              </a>
              <div className="dd-label sans">LEARN MORE</div>
              <a href="/neotariff/technology/" style={activePage === 'technology' ? { color: 'var(--accent)' } : {}}>
                Underlying Technology
              </a>
            </div>
          </div>

          <a href="/pricing/" className="sans" style={linkStyle('pricing')}>
            Pricing
          </a>

          {/* Company dropdown — hover to show, click navigates */}
          <div
            className="dropdown-company"
            style={{ position: 'relative' }}
            onMouseEnter={showCo}
            onMouseLeave={hideCo}
          >
            <a
              href="/company/"
              className="sans"
              style={dropdownTriggerStyle(isCompanyPage)}
            >
              Company <ChevronDown open={companyOpen} />
            </a>
            <div className={`dropdown-menu ${companyOpen ? 'open' : ''}`}>
              <a href="/company/#phil">
                Our Philosophy
              </a>
              <a
                href="/company/#team"
                style={activePage === 'company' ? { color: 'var(--accent)' } : {}}
              >
                Leadership & Team
              </a>
              <a href="/company/#insights">
                Insights / Perspectives
              </a>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href={SITE.loginUrl}
            className="cta-btn w120 cta-btn-condensed cta-btn-outline sans"
          >
            Sign In
          </a>
          <a
            href={SITE.signupUrl}
            className="cta-btn w120 cta-btn-condensed sans"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

/* ════════════════════════════════════════════
   FOOTER COMPONENT
   ════════════════════════════════════════════ */
window.NeoFooter = () => (
  <footer
    className="sans"
    style={{ padding: '32px 48px 24px', borderTop: '1px solid var(--border)' }}
  >
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: 32,
          marginBottom: 24,
        }}
      >
        <div>
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 10,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 800 }}>N</span>
            </div>
            <span
              style={{ fontSize: 'var(--fs-base)', fontWeight: 700, color: 'var(--text-primary)' }}
            >
              Neo
            </span>
            <span
              style={{ fontSize: 'var(--fs-base)', fontWeight: 400, color: 'var(--accent-bright)' }}
            >
              Tariff
            </span>
          </a>
          <p
            style={{
              fontSize: 'var(--fs-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: 260,
            }}
          >
            Tariff intelligence engine by Enterprise-Neo. Precise, explainable duties for any
            scenario.
          </p>
        </div>
        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              marginBottom: 10,
            }}
          >
            NEOTARIFF
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <a href="/neotariff/platform/" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Web Application
            </a>
            <a href="/neotariff/api/" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              REST API
            </a>
            <a href="/neotariff/sdk/" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Python SDK
            </a>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              marginBottom: 10,
            }}
          >
            LEARN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <a href="/neotariff/technology/" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Underlying Technology
            </a>
            <a href="/pricing/" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Pricing
            </a>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              marginBottom: 10,
            }}
          >
            DEVELOPERS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <a href={SITE.apiDocsUrl} className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Swagger Docs ↗
            </a>
            <a href={SITE.pypiUrl} className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              PyPI Package ↗
            </a>
            <a href={SITE.githubUrl} className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              GitHub ↗
            </a>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              marginBottom: 10,
            }}
          >
            COMPANY
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <a href="/company/" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Leadership
            </a>
            <a href="/company/#insights" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Insights
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{SITE.copyright}</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#" className="nav-link" style={{ fontSize: 11.5 }}>
            Privacy
          </a>
          <a href="#" className="nav-link" style={{ fontSize: 11.5 }}>
            Terms
          </a>
        </div>
      </div>
    </div>
  </footer>
);

/* ════════════════════════════════════════════
   SCREENSHOT COMPONENT — zoom + lightbox
   ────────────────────────────────────────────
   Props:
     src:       image path (required)
     alt:       alt text
     height:    container height in px (default 300)
     zoom:      scale factor (default 1.5) — higher = more zoomed in
     focusX:    CSS transform-origin X (default "50%")
     focusY:    CSS transform-origin Y (default "20%")
     gradient:  fallback background gradient
   ════════════════════════════════════════════ */
window.NeoScreenshot = ({
  src,
  alt = '',
  height = 300,
  zoom = 1.5,
  focusX = '50%',
  focusY = '20%',
  gradient,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <>
      <div
        className="neo-screenshot"
        onClick={() => setOpen(true)}
        style={{
          height,
          background: gradient || 'var(--bg-elevated)',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'zoom-in',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            display: 'block',
            transform: `scale(${zoom})`,
            transformOrigin: `${focusX} ${focusY}`,
            transition: 'transform 0.4s var(--ease)',
          }}
        />
        <div className="neo-screenshot-hint sans">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M11 11l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Click to expand
        </div>
      </div>
      {open &&
        ReactDOM.createPortal(
          <div className="neo-lightbox" onClick={() => setOpen(false)}>
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              style={{
                objectFit: 'contain',
                borderRadius: 'var(--radius)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              }}
            />
            <button className="neo-lightbox-close sans" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

/* ════════════════════════════════════════════
   HERO COMPONENT
   ────────────────────────────────────────────
   Reusable hero section shared across all inner pages.
   Props:
     label:          section label text (e.g. "Technology")
     title:          heading — string, string[], or JSX (array = one line per entry)
     description:    paragraph — string or JSX
     stats:          optional array of { val, label }
     ctas:           optional array of { href, label, external?, element?, className?, icon? }
     descMaxWidth:   optional max-width for description (default 680)
     paddingBottom:  optional bottom padding (default 64)
     glow:           optional preset: 'center'|'center-low'|'right'|'narrow' (default 'center')
     id:             optional id for the section element (e.g. for scroll-spy)
     fullHeight:     optional bool — true = 100vh centered layout (default false)
     textSize:       optional 'default'|'large' — large = 64px title (default 'default')
     alignContent:   optional 'center'|'left' — left removes margin auto (default 'center')
     showScrollIndicator: optional bool — renders SCROLL indicator (default false)
   ════════════════════════════════════════════ */
const GLOW_PRESETS = {
  center: {
    left: 0,
    width: '70%',
    background: 'radial-gradient(ellipse at 25% 20%, rgba(var(--accent-bright-rgb),0.18) 0%, transparent 60%)',
  },
  'center-low': {
    left: 0,
    width: '70%',
    background: 'radial-gradient(ellipse at 25% 20%, rgba(var(--accent-bright-rgb),0.18) 0%, transparent 60%)',
  },
  right: {
    left: 0,
    width: '70%',
    background: 'radial-gradient(ellipse at 25% 20%, rgba(var(--accent-bright-rgb),0.18) 0%, transparent 60%)',
  },
  narrow: {
    left: 0,
    width: '70%',
    background: 'radial-gradient(ellipse at 25% 20%, rgba(var(--accent-bright-rgb),0.18) 0%, transparent 60%)',
  },
};

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M4 12L12 4M12 4H6M12 4v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

window.NeoHero = ({
  label,
  title,
  description,
  stats,
  ctas,
  descMaxWidth = 680,
  paddingBottom = 64,
  glow = 'center',
  id,
  fullHeight = false,
  textSize = 'default',
  alignContent = 'center',
  showScrollIndicator = false,
}) => {
  const glowStyle = typeof glow === 'string' ? GLOW_PRESETS[glow] || GLOW_PRESETS.center : glow;
  const hasCtas = ctas && ctas.length > 0;
  const hasStats = stats && stats.length > 0;
  const isLarge = textSize === 'large';

  // Animation config: home uses fadeIn/1s, sub-pages use fadeUp/0.6s
  const anim = fullHeight ? 'fadeIn' : 'fadeUp';
  const dur = fullHeight ? '1s' : '0.6s';
  const delays = fullHeight
    ? { label: 0.05, title: null, desc: 0.65, ctas: 0.85, stats: 0.95, scroll: 1.3 }
    : { label: 0.1, title: 0.2, desc: 0.3, ctas: 0.4, stats: hasCtas ? 0.5 : 0.4 };
  const makeAnim = (delay) =>
    delay != null ? `${anim} ${dur} var(--ease) ${delay}s both` : undefined;

  const sectionClass = fullHeight ? 'neo-hero neo-hero--full' : 'neo-hero';
  const contentClass = alignContent === 'left'
    ? 'neo-hero__content neo-hero__content--left'
    : 'neo-hero__content';
  const titleClass = isLarge
    ? 'neo-hero__title neo-hero__title--lg display'
    : 'neo-hero__title display';

  const renderedTitle = Array.isArray(title)
    ? title.map((line, i) => <React.Fragment key={i}>{line}{i < title.length - 1 && <br />}</React.Fragment>)
    : title;

  return (
    <section
      id={id}
      className={sectionClass}
      style={!fullHeight && paddingBottom !== 64 ? { paddingBottom } : undefined}
    >
      <div className="neo-hero__glow" style={glowStyle} />
      <div className={contentClass}>
        <div className="section-label" style={{ animation: makeAnim(delays.label) }}>
          {label}
        </div>
        {isLarge ? (
          <div className={titleClass}>{renderedTitle}</div>
        ) : (
          <h1 className={titleClass} style={{ animation: makeAnim(delays.title) }}>
            {renderedTitle}
          </h1>
        )}
        <p
          className="neo-hero__desc sans"
          style={{
            maxWidth: descMaxWidth,
            animation: makeAnim(delays.desc),
          }}
        >
          {description}
        </p>
        {hasCtas && (
          <div className="neo-hero__ctas" style={{ animation: makeAnim(delays.ctas) }}>
            {ctas.map((cta, i) =>
              cta.element === 'button' ? (
                <button key={i} className={`cta-btn sans ${cta.className || ''}`}>
                  {cta.label} {cta.icon}
                </button>
              ) : (
                <a
                  key={i}
                  href={cta.href}
                  target={cta.external ? '_blank' : undefined}
                  className={`cta-btn sans ${cta.className || ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  {cta.label} {cta.external && <ExternalLinkIcon />} {cta.icon && !cta.external && cta.icon}
                </a>
              )
            )}
          </div>
        )}
        {hasStats && (
          <div
            className={`neo-hero__stats sans ${hasCtas ? 'neo-hero__stats--with-ctas' : ''}`}
            style={{ animation: makeAnim(delays.stats) }}
          >
            {stats.map((s, i) => (
              <div key={i} className="neo-hero__stat">
                <span className="neo-hero__stat-val mono">{s.val}</span>
                <span className="neo-hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {showScrollIndicator && (
        <div className="neo-hero__scroll" style={{ animation: makeAnim(delays.scroll) }}>
          <span className="neo-hero__scroll-text mono">SCROLL</span>
          <div className="neo-hero__scroll-line" />
        </div>
      )}
    </section>
  );
};

/* ════════════════════════════════════════════
   SIDE NAV (Scroll-Spy Dots)
   ════════════════════════════════════════════ */
window.NeoSideNav = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [hoveredDot, setHoveredDot] = useState(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let current = sections[0]?.id || '';
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= 100) current = s.id;
        }
        setActiveSection(current);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div
      className="side-nav-container"
      style={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 150,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        alignItems: 'center',
      }}
    >
      {sections.map((s) => (
        <div
          key={s.id}
          className={`side-dot ${activeSection === s.id ? 'active' : ''}`}
          onClick={() => scrollTo(s.id)}
          onMouseEnter={() => setHoveredDot(s.id)}
          onMouseLeave={() => setHoveredDot(null)}
        >
          <div className={`side-dot-label sans ${hoveredDot === s.id ? 'show' : ''}`}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════
   UTILITY COMPONENTS
   ════════════════════════════════════════════ */
window.NeoGrain = () => <div className="grain" />;
window.NeoDivider = () => <div className="divider" />;
