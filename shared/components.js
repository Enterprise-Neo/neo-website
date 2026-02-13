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
  name: "Neo Tariff",
  tagline: "by Enterprise-Neo",
  loginUrl: "https://enterprise-neo.com/login",
  registerUrl: "https://enterprise-neo.com/register",
  siteUrl: "https://enterprise-neo.com",
  swaggerUrl: "https://tariff-data-dev.enterprise-neo.com/docs",
  pypiUrl: "https://pypi.org/project/neo-tariff/",
  copyright: "© 2025 Enterprise-Neo. All rights reserved.",
};

/* ── Scroll Animation Hook ── */
window.useScrollAnimation = (threshold = 0.08) => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  useEffect(() => {
    const o = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id])); }); },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);
  return (id) => visibleSections.has(id);
};

/* ── Arrow Icon (reused in many places) ── */
window.ArrowIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Chevron Icon ── */
const ChevronDown = ({ open }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition:"transform 0.2s", transform: open ? "rotate(180deg)" : "" }}>
    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ════════════════════════════════════════════
   NAV COMPONENT
   ────────────────────────────────────────────
   Props:
     activePage: "overview"|"technology"|"pricing"|"company"|"platform"|"api"|"sdk"
     transparent: boolean — if true, nav starts transparent and becomes solid on scroll (overview hero)
   ════════════════════════════════════════════ */
window.NeoNav = ({ activePage = "overview", transparent = false }) => {
  const [productOpen, setProductOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, [transparent]);

  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest('.dropdown-product')) setProductOpen(false);
      if (!e.target.closest('.dropdown-resources')) setResourcesOpen(false);
    };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const isProductPage = ["platform","api","sdk"].includes(activePage);
  const navStyle = transparent
    ? { background: scrolled ? "rgba(12,14,26,0.94)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid rgba(37,40,64,0.6)" : "1px solid transparent" }
    : {};

  const linkStyle = (page) => ({
    padding: "8px 14px", fontSize: 13, textDecoration: "none",
    fontWeight: activePage === page ? 600 : 400,
    color: activePage === page ? "var(--text-primary)" : "var(--text-secondary)",
    ...(activePage === page ? { borderBottom: "2px solid var(--accent)", marginBottom: -1 } : {}),
  });

  return (
    <nav className="neo-nav sans" style={navStyle}>
      <div style={{ display:"flex", alignItems:"center", gap:28 }}>
        <a href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:6, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:13, fontWeight:800, fontFamily:"'DM Sans',sans-serif" }}>N</span>
          </div>
          <span style={{ color:"var(--text-primary)", fontSize:16, fontWeight:700, letterSpacing:"-0.01em" }}>Neo</span>
          <span style={{ color:"var(--text-muted)", fontSize:16, fontWeight:300 }}>Tariff</span>
        </a>
        <div style={{ width:1, height:18, background:"var(--border)" }} />
        <span className="mono" style={{ fontSize:10, color:"var(--text-muted)", letterSpacing:"0.08em" }}>{SITE.tagline}</span>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:0 }}>
        {/* Product dropdown */}
        <div className="dropdown-product" style={{ position:"relative" }}>
          <button onClick={(e) => { e.stopPropagation(); setProductOpen(!productOpen); setResourcesOpen(false); }}
            className="sans" style={{ ...linkStyle(isProductPage ? activePage : ""), fontWeight: isProductPage ? 600 : 400, color: isProductPage ? "var(--text-primary)" : "var(--text-secondary)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, ...(isProductPage ? { borderBottom:"2px solid var(--accent)", marginBottom:-1 } : {}) }}>
            Product <ChevronDown open={productOpen} />
          </button>
          <div className={`dropdown-menu ${productOpen ? "open" : ""}`}>
            <a href="/platform" style={activePage === "platform" ? { color:"var(--accent)" } : {}}>Platform</a>
            <a href="/api" style={activePage === "api" ? { color:"var(--accent)" } : {}}>REST API</a>
            <a href="/sdk" style={activePage === "sdk" ? { color:"var(--accent)" } : {}}>Python SDK</a>
          </div>
        </div>

        <a href="/technology" className="sans" style={linkStyle("technology")}>Technology</a>
        <a href="/pricing" className="sans" style={linkStyle("pricing")}>Pricing</a>
        <a href="/company" className="sans" style={linkStyle("company")}>Company</a>

        {/* Resources dropdown */}
        <div className="dropdown-resources" style={{ position:"relative" }}>
          <button onClick={(e) => { e.stopPropagation(); setResourcesOpen(!resourcesOpen); setProductOpen(false); }}
            className="sans" style={{ padding:"8px 14px", fontSize:13, fontWeight:400, color:"var(--text-secondary)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
            Resources <ChevronDown open={resourcesOpen} />
          </button>
          <div className={`dropdown-menu ${resourcesOpen ? "open" : ""}`}>
            <div className="dd-label sans">DEVELOPER DOCS</div>
            <a href={SITE.swaggerUrl} target="_blank">Swagger API Docs ↗</a>
            <a href={SITE.pypiUrl} target="_blank">PyPI: neo-tariff ↗</a>
          </div>
        </div>

        <div style={{ width:1, height:18, background:"var(--border)", margin:"0 10px" }} />
        <a href={SITE.loginUrl} className="sans" style={{ padding:"8px 14px", fontSize:13, fontWeight:400, color:"var(--text-secondary)", textDecoration:"none" }}>Sign In</a>
        <a href={SITE.registerUrl} className="cta-btn sans" style={{ padding:"8px 20px", fontSize:12.5, borderRadius:2, textDecoration:"none" }}>Get Started</a>
      </div>
    </nav>
  );
};

/* ════════════════════════════════════════════
   FOOTER COMPONENT
   ════════════════════════════════════════════ */
window.NeoFooter = () => (
  <footer className="sans" style={{ padding:"48px 48px 36px", borderTop:"1px solid var(--border)" }}>
    <div style={{ maxWidth:"var(--max-width)", margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:16 }}>
            <div style={{ width:22, height:22, borderRadius:5, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"#fff", fontSize:11, fontWeight:800 }}>N</span>
            </div>
            <span style={{ fontSize:14, fontWeight:700 }}>Neo Tariff</span>
          </div>
          <p style={{ fontSize:12.5, color:"var(--text-muted)", lineHeight:1.65, maxWidth:260 }}>Tariff intelligence engine by Enterprise-Neo. Precise, explainable duties for any scenario.</p>
        </div>
        <div>
          <div style={{ fontSize:10.5, fontWeight:600, letterSpacing:"0.1em", color:"var(--text-muted)", marginBottom:16 }}>PRODUCT</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <a href="/platform" className="nav-link" style={{ fontSize:12.5 }}>Platform</a>
            <a href="/api" className="nav-link" style={{ fontSize:12.5 }}>REST API</a>
            <a href="/sdk" className="nav-link" style={{ fontSize:12.5 }}>Python SDK</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize:10.5, fontWeight:600, letterSpacing:"0.1em", color:"var(--text-muted)", marginBottom:16 }}>LEARN</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <a href="/technology" className="nav-link" style={{ fontSize:12.5 }}>Technology</a>
            <a href="/pricing" className="nav-link" style={{ fontSize:12.5 }}>Pricing</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize:10.5, fontWeight:600, letterSpacing:"0.1em", color:"var(--text-muted)", marginBottom:16 }}>DEVELOPERS</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <a href={SITE.swaggerUrl} className="nav-link" style={{ fontSize:12.5 }}>Swagger Docs ↗</a>
            <a href={SITE.pypiUrl} className="nav-link" style={{ fontSize:12.5 }}>PyPI Package ↗</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize:10.5, fontWeight:600, letterSpacing:"0.1em", color:"var(--text-muted)", marginBottom:16 }}>COMPANY</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <a href="/company" className="nav-link" style={{ fontSize:12.5 }}>About</a>
            <a href={SITE.siteUrl} className="nav-link" style={{ fontSize:12.5 }}>enterprise-neo.com ↗</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop:"1px solid var(--border-light)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:11.5, color:"var(--text-muted)" }}>{SITE.copyright}</span>
        <div style={{ display:"flex", gap:20 }}>
          <a href="#" className="nav-link" style={{ fontSize:11.5 }}>Privacy</a>
          <a href="#" className="nav-link" style={{ fontSize:11.5 }}>Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

/* ════════════════════════════════════════════
   UTILITY COMPONENTS
   ════════════════════════════════════════════ */
window.NeoGrain = () => <div className="grain" />;
window.NeoDivider = () => <div className="divider" />;
