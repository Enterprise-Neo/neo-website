/*
 * DEPRECATED — "Our Approach to AI" section
 * Originally from index.html (NeoTariff homepage)
 * Removed per Feb 20, 2026 website restructuring
 * Preserved here for potential future restoration
 */

{/* ══ AI Approach ══ */}
<section id="ai-approach" style={{ padding: 'var(--section-pad)' }}>
  <div className="section-inner">
    <div id="ai-s" data-animate className={`anim ${isV('ai-s') ? 'vis' : ''}`}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div className="section-label">Our Approach to AI</div>
        <h2 className="section-heading" style={{ lineHeight: 1.2, marginBottom: 14 }}>
          We don't ask AI to interpret tariff law.
        </h2>
        <p className="sans section-desc" style={{ lineHeight: 1.75, maxWidth: 680 }}>
          The tariff engine is not an LLM. It's a deterministic rules engine backed by a
          tested tariff graph. We use AI in supporting roles — helping humans get into
          the tariff graph faster. The actual duty decisions are deterministic,
          test-backed, and traceable.
        </p>
      </div>

      {/* Two cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          marginBottom: 18,
        }}
      >
        <div className="info-card" style={{ padding: '28px 24px' }}>
          <div
            className="sans"
            style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: 600,
              color: 'var(--green)',
              marginBottom: 10,
              letterSpacing: '0.04em',
            }}
          >
            THE CORE ENGINE
          </div>
          <div
            className="sans"
            style={{ fontSize: 'var(--fs-base)', fontWeight: 600, marginBottom: 8 }}
          >
            Deterministic & Test-Backed
          </div>
          <p className="sans section-desc" style={{ fontSize: 'var(--fs-sm)' }}>
            PDF parsing, cross-reference scanning, rule construction, evaluation — all
            deterministic regex, pattern matching, and tree traversal. No LLM in the
            decision path. Regression-tested against real-world scenarios.
          </p>
        </div>
        <div className="info-card" style={{ padding: '28px 24px' }}>
          <div
            className="sans"
            style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: 600,
              color: 'var(--accent)',
              marginBottom: 10,
              letterSpacing: '0.04em',
            }}
          >
            SUPPORTING ROLES
          </div>
          <div
            className="sans"
            style={{ fontSize: 'var(--fs-base)', fontWeight: 600, marginBottom: 8 }}
          >
            AI as Assistant, Not Decision-Maker
          </div>
          <p className="sans section-desc" style={{ fontSize: 'var(--fs-sm)' }}>
            AI maps product descriptions to candidate HTS codes (with reasoning).
            Summarizes complex outputs. Provides confidence assessments. Never
            influences the deterministic pipeline.
          </p>
        </div>
      </div>

      {/* Quote */}
      <div
        className="info-card"
        style={{
          padding: '22px 26px',
          borderLeft: '3px solid var(--accent)',
        }}
      >
        <p
          className="blockquote serif"
          style={{ fontSize: 16, color: 'var(--text-primary)' }}
        >
          "We use AI to help humans get into and understand the tariff graph faster. The
          actual duty decisions are deterministic, test-backed, and traceable."
        </p>
      </div>
    </div>
  </div>
</section>
