/*
 * DEPRECATED — "Who It's For" section
 * Originally from index.html (NeoTariff homepage)
 * Removed per Feb 20, 2026 website restructuring
 * Preserved here for potential future restoration
 */

{/* ══ Who It's For ══ */}
<section id="personas" style={{ padding: 'var(--section-pad)' }}>
  <div className="section-inner">
    <div
      id="wh-h"
      data-animate
      className={`anim ${isV('wh-h') ? 'vis' : ''}`}
      style={{ marginBottom: 40 }}
    >
      <div className="section-label">Who It's For</div>
      <h2 className="section-heading-lg" style={{ maxWidth: 580 }}>
        Built for organizations that take tariffs seriously.
      </h2>
    </div>
    <div
      id="wh-g"
      data-animate
      className={`anim ${isV('wh-g') ? 'vis' : ''}`}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}
    >
      {[
        {
          role: 'Trade & Logistics Platforms',
          pain: 'Need tariff logic inside your systems without building it from scratch.',
          sol: 'REST API and Python SDK for real-time duty calculations, HTS lookups, and scenario analysis — embed directly into ERP, TMS, or procurement platforms.',
          icon: '⚡',
        },
        {
          role: 'Trade & Customs',
          pain: 'Manually combining HTS tables, broker advice, and Chapter 99 rules for every entry.',
          sol: 'Instant, defensible duty calculations with full legal citations and complete rule-path traceability.',
          icon: '⚖️',
        },
        {
          role: 'Supply Chain & Sourcing',
          pain: "Can't evaluate the tariff impact of changing suppliers or countries of origin.",
          sol: 'Model country-shift and supplier-change scenarios across your catalog with landed cost impact.',
          icon: '🔗',
        },
        {
          role: 'Finance & FP&A',
          pain: 'Tariff assumptions in financial models are stale, incomplete, or unverifiable.',
          sol: 'Precise duty numbers tied to landed cost and margin, updated within hours of official changes.',
          icon: '📊',
        },
        {
          role: 'PE & Due Diligence',
          pain: "No fast, defensible way to quantify a target's tariff exposure or model policy risk.",
          sol: 'Portfolio-level tariff analysis and scenario modeling for investments, with auditable outputs.',
          icon: '🎯',
        },
      ].map((a, i) => (
        <div key={i} className="info-card" style={{ padding: '28px 22px' }}>
          <div style={{ fontSize: 24, marginBottom: 14 }}>{a.icon}</div>
          <div
            className="sans"
            style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 14 }}
          >
            {a.role}
          </div>
          <div
            className="sans"
            style={{
              fontSize: 'var(--fs-xs)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: 14,
              fontStyle: 'italic',
            }}
          >
            "{a.pain}"
          </div>
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 14 }} />
          <div
            className="sans"
            style={{
              fontSize: 'var(--fs-xs)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {a.sol}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
