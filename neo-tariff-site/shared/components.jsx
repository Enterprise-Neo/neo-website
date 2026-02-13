/* ═══════════════════════════════════════════════════
   Neo Tariff — Shared React Components
   Nav and Footer used across all pages.
   Loaded as text/babel before each page's script.
   ═══════════════════════════════════════════════════ */

const { useState, useEffect } = React;
const CFG = window.NEO_CONFIG;

/* ── Shared Navigation ── */
window.SharedNav = ({ activePage, scrollAware }) => {
  const [productOpen, setProductOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!scrollAware) return;
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, [scrollAware]);

  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest('.dropdown-product')) setProductOpen(false);
      if (!e.target.closest('.dropdown-resources')) setResourcesOpen(false);
    };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const showBg = scrollAware ? scrollY > 50 : true;

  return (
    <nav className="sans" style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      padding:"0 48px", height:"var(--nav-height)", display:"flex",
      alignItems:"center", justifyContent:"space-between",
      background: showBg ? "rgba(12,14,26,0.94)" : "transparent",
      backdropFilter: showBg ? "blur(14px)" : "none",
      borderBottom: showBg ? "1px solid rgba(37,40,64,0.6)" : "1px solid transparent",
      transition: "all 0.3s ease"
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:28 }}>
        <a href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:6, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:13, fontWeight:800, fontFamily:"var(--font-sans)" }}>N</span>
          </div>
          <span style={{ color:"var(--text-primary)", fontSize:16, fontWeight:700, letterSpacing:"-0.01em" }}>Neo</span>
          <span style={{ color:"var(--text-muted)", fontSize:16, fontWeight:300 }}>Tariff</span>
        </a>
        <div style={{ width:1, height:18, background:"var(--border)" }} />
        <span className="mono" style={{ fontSize:10, color:"var(--text-muted)", letterSpacing:"0.08em" }}>by {CFG.company}</span>
      </div>

      {/* Links */}
      <div style={{ display:"flex", alignItems:"center", gap:0 }}>
        {/* Product dropdown */}
        <div className="dropdown-product" style={{ position:"relative" }}>
          <button onClick={(e)=>{e.stopPropagation();setProductOpen(!productOpen);setResourcesOpen(false);}} className="sans"
            style={{ padding:"8px 14px", fontSize:13, fontWeight:400, color:"var(--text-secondary)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
            Product <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition:"transform 0.2s", transform:productOpen?"rotate(180deg)":"" }}><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className={`dropdown-menu ${productOpen?"open":""}`}>
            {CFG.nav.product.map((l,i)=>(<a key={i} href={l.href}>{l.label}</a>))}
          </div>
        </div>

        {/* Main links */}
        {CFG.nav.main.map((l,i)=>(
          <a key={i} href={l.href} className="sans" style={{
            padding:"8px 14px", fontSize:13, textDecoration:"none",
            fontWeight: activePage===l.label ? 600 : 400,
            color: activePage===l.label ? "var(--text-primary)" : "var(--text-secondary)",
            borderBottom: activePage===l.label ? "2px solid var(--accent)" : "2px solid transparent",
            marginBottom: activePage===l.label ? -1 : 0,
          }}>{l.label}</a>
        ))}

        {/* Resources dropdown */}
        <div className="dropdown-resources" style={{ position:"relative" }}>
          <button onClick={(e)=>{e.stopPropagation();setResourcesOpen(!resourcesOpen);setProductOpen(false);}} className="sans"
            style={{ padding:"8px 14px", fontSize:13, fontWeight:400, color:"var(--text-secondary)", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
            Resources <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition:"transform 0.2s", transform:resourcesOpen?"rotate(180deg)":"" }}><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className={`dropdown-menu ${resourcesOpen?"open":""}`}>
            <div className="dd-label sans">DEVELOPER DOCS</div>
            {CFG.nav.resources.map((l,i)=>(<a key={i} href={l.href} target={l.external?"_blank":undefined} rel={l.external?"noopener noreferrer":undefined}>{l.label}</a>))}
          </div>
        </div>

        <div style={{ width:1, height:18, background:"var(--border)", margin:"0 10px" }} />
        <a href={CFG.urls.login} className="sans" style={{ padding:"8px 14px", fontSize:13, fontWeight:400, color:"var(--text-secondary)", textDecoration:"none" }}>Sign In</a>
        <a href={CFG.urls.register} className="cta-btn sans" style={{ padding:"8px 20px", fontSize:12.5, borderRadius:2, textDecoration:"none" }}>Get Started</a>
      </div>
    </nav>
  );
};


/* ── Shared Footer ── */
window.SharedFooter = () => {
  const F = CFG.footer;
  const FooterCol = ({ title, links }) => (
    <div>
      <div style={{ fontSize:10.5, fontWeight:600, letterSpacing:"0.1em", color:"var(--text-muted)", marginBottom:16 }}>{title}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {links.map((l,i)=>(
          <a key={i} href={l.href} className="nav-link" style={{ fontSize:12.5 }}
            target={l.external?"_blank":undefined} rel={l.external?"noopener noreferrer":undefined}>{l.label}</a>
        ))}
      </div>
    </div>
  );

  return (
    <footer className="sans" style={{ padding:"48px 48px 36px", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:"var(--max-width)", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:16 }}>
              <div style={{ width:22, height:22, borderRadius:5, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#fff", fontSize:11, fontWeight:800 }}>N</span>
              </div>
              <span style={{ fontSize:14, fontWeight:700 }}>{CFG.siteName}</span>
            </div>
            <p style={{ fontSize:12.5, color:"var(--text-muted)", lineHeight:1.65, maxWidth:260 }}>{CFG.tagline}</p>
          </div>
          <FooterCol title="PRODUCT" links={F.product} />
          <FooterCol title="LEARN" links={F.learn} />
          <FooterCol title="DEVELOPERS" links={F.developers} />
          <FooterCol title="COMPANY" links={F.company} />
        </div>
        <div style={{ borderTop:"1px solid var(--border-light)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11.5, color:"var(--text-muted)" }}>{CFG.copyright}</span>
          <div style={{ display:"flex", gap:20 }}>
            <a href="#" className="nav-link" style={{ fontSize:11.5 }}>Privacy</a>
            <a href="#" className="nav-link" style={{ fontSize:11.5 }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


/* ── Shared Animation Observer Hook ── */
window.useScrollAnimations = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  useEffect(() => {
    const o = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setVisibleSections((p) => new Set([...p, e.target.id]));
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll("[data-animate]").forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);
  return (id) => visibleSections.has(id);
};
