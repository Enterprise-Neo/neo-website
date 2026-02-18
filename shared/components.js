/* ═══════════════════════════════════════════════════════════════
   Neo Tariff — Shared React Components
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
  name: 'Neo Tariff',
  tagline: 'by Enterprise-Neo',
  loginUrl: 'https://tariff.enterprise-neo.com/',
  signupUrl: 'https://tariff.enterprise-neo.com/signup',
  apiBaseUrl: 'https://tariff-data.enterprise-neo.com',
  apiDocsUrl: 'https://tariff-data.enterprise-neo.com/docs',
  pypiUrl: 'https://pypi.org/project/neo-tariff/',
  githubUrl: 'https://github.com/Enterprise-Neo',
  copyright: '© 2025 Enterprise-Neo. All rights reserved.',
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
     activePage: "overview"|"technology"|"pricing"|"company"|"platform"|"api"|"sdk"
     transparent: boolean — if true, nav starts transparent and becomes solid on scroll (overview hero)
   ════════════════════════════════════════════ */
window.NeoNav = ({ activePage = 'overview', transparent = true }) => {
  const [productOpen, setProductOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, [transparent]);

  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest('.dropdown-product')) setProductOpen(false);
      if (!e.target.closest('.dropdown-resources')) setResourcesOpen(false);
    };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const isProductPage = ['platform', 'api', 'sdk'].includes(activePage);
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
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {/* Product dropdown */}
          <div className="dropdown-product" style={{ position: 'relative' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProductOpen(!productOpen);
                setResourcesOpen(false);
              }}
              className="sans"
              style={{
                padding: '8px 14px',
                fontSize: 'var(--fs-sm)',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontWeight: isProductPage ? 600 : 400,
                color: isProductPage ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderBottom: isProductPage ? '2px solid var(--accent)' : 'none',
                marginBottom: isProductPage ? -1 : 0,
              }}
            >
              Product <ChevronDown open={productOpen} />
            </button>
            <div className={`dropdown-menu ${productOpen ? 'open' : ''}`}>
              <a
                href="/product/platform"
                style={activePage === 'platform' ? { color: 'var(--accent)' } : {}}
              >
                Platform
              </a>
              <a href="/product/api" style={activePage === 'api' ? { color: 'var(--accent)' } : {}}>
                REST API
              </a>
              <a href="/product/sdk" style={activePage === 'sdk' ? { color: 'var(--accent)' } : {}}>
                Python SDK
              </a>
            </div>
          </div>

          <a href="/technology" className="sans" style={linkStyle('technology')}>
            Technology
          </a>
          <a href="/pricing" className="sans" style={linkStyle('pricing')}>
            Pricing
          </a>
          <a href="/company" className="sans" style={linkStyle('company')}>
            Company
          </a>

          {/* Resources dropdown */}
          <div className="dropdown-resources" style={{ position: 'relative' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setResourcesOpen(!resourcesOpen);
                setProductOpen(false);
              }}
              className="sans"
              style={{
                padding: '8px 14px',
                fontSize: 'var(--fs-sm)',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Resources <ChevronDown open={resourcesOpen} />
            </button>
            <div className={`dropdown-menu ${resourcesOpen ? 'open' : ''}`}>
              <div className="dd-label sans">DEVELOPER DOCS</div>
              <a href={SITE.apiDocsUrl} target="_blank">
                Swagger API Docs ↗
              </a>
              <a href={SITE.pypiUrl} target="_blank">
                PyPI: neo-tariff ↗
              </a>
              <a href={SITE.githubUrl} target="_blank">
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href={SITE.loginUrl}
            className="sans"
            style={{
              padding: '8px 20px',
              fontSize: 'var(--fs-sm)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              border: '1px solid var(--accent)',
              borderRadius: 'var(--radius-btn)',
              minWidth: 110,
              textAlign: 'center',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Sign In
          </a>
          <a
            href={SITE.signupUrl}
            className="cta-btn sans"
            style={{
              padding: '8px 20px',
              fontSize: 'var(--fs-sm)',
              borderRadius: 'var(--radius-btn)',
              textDecoration: 'none',
              minWidth: 110,
            }}
          >
            Get Started
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
            PRODUCT
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <a href="/product/platform" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Platform
            </a>
            <a href="/product/api" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              REST API
            </a>
            <a href="/product/sdk" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
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
            <a href="/technology" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              Technology
            </a>
            <a href="/pricing" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
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
            <a href="/company" className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              About
            </a>
            <a href={SITE.githubUrl} className="nav-link" style={{ fontSize: 'var(--fs-sm)' }}>
              GitHub ↗
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
     title:          heading — string or JSX
     description:    paragraph — string or JSX
     stats:          optional array of { val, label }
     ctas:           optional array of { href, label, external? }
     descMaxWidth:   optional max-width for description (default 620)
     paddingBottom:  optional bottom padding (default 64)
     glow:           optional preset: 'center'|'center-low'|'right'|'narrow' (default 'center')
   ════════════════════════════════════════════ */
const GLOW_PRESETS = {
  center: {
    left: 0,
    width: '70%',
    background: 'radial-gradient(ellipse at 25% 20%, rgba(108,99,255,0.18) 0%, transparent 60%)',
  },
  'center-low': {
    left: 0,
    width: '70%',
    background: 'radial-gradient(ellipse at 25% 20%, rgba(108,99,255,0.18) 0%, transparent 60%)',
  },
  right: {
    left: 0,
    width: '70%',
    background: 'radial-gradient(ellipse at 25% 20%, rgba(108,99,255,0.18) 0%, transparent 60%)',
  },
  narrow: {
    left: 0,
    width: '70%',
    background: 'radial-gradient(ellipse at 25% 20%, rgba(108,99,255,0.18) 0%, transparent 60%)',
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
}) => {
  const glowStyle = typeof glow === 'string' ? GLOW_PRESETS[glow] || GLOW_PRESETS.center : glow;
  const hasCtas = ctas && ctas.length > 0;
  const hasStats = stats && stats.length > 0;
  const statsDelay = hasCtas ? 0.5 : 0.4;

  return (
    <section style={{ padding: `140px 48px ${paddingBottom}px`, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          pointerEvents: 'none',
          ...glowStyle,
        }}
      />
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <div className="section-label" style={{ animation: 'fadeUp 0.6s var(--ease) 0.1s both' }}>
          {label}
        </div>
        <h1
          className="display"
          style={{
            fontSize: 52,
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            marginBottom: 18,
            animation: 'fadeUp 0.6s var(--ease) 0.2s both',
          }}
        >
          {title}
        </h1>
        <p
          className="sans"
          style={{
            fontSize: 'var(--fs-md)',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            maxWidth: descMaxWidth,
            marginBottom: 28,
            animation: 'fadeUp 0.6s var(--ease) 0.3s both',
          }}
        >
          {description}
        </p>
        {hasCtas && (
          <div
            style={{
              display: 'flex',
              gap: 14,
              animation: 'fadeUp 0.6s var(--ease) 0.4s both',
            }}
          >
            {ctas.map((cta, i) => (
              <a
                key={i}
                href={cta.href}
                target={cta.external ? '_blank' : undefined}
                className="cta-btn sans"
                style={{ textDecoration: 'none' }}
              >
                {cta.label} {cta.external && <ExternalLinkIcon />}
              </a>
            ))}
          </div>
        )}
        {hasStats && (
          <div
            className="sans"
            style={{
              display: 'flex',
              gap: 28,
              fontSize: 'var(--fs-sm)',
              ...(hasCtas ? { marginTop: 28 } : {}),
              animation: `fadeUp 0.6s var(--ease) ${statsDelay}s both`,
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  className="mono"
                  style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 'var(--fs-base)' }}
                >
                  {s.val}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════
   UTILITY COMPONENTS
   ════════════════════════════════════════════ */
window.NeoGrain = () => <div className="grain" />;
window.NeoDivider = () => <div className="divider" />;
