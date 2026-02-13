/* ═══════════════════════════════════════════════════
   Neo Tariff — Shared Configuration
   Central place for nav links, footer content,
   and site-wide data used by all pages.
   ═══════════════════════════════════════════════════ */

window.NEO_CONFIG = {
  // Site info
  siteName: "Neo Tariff",
  company: "Enterprise-Neo",
  tagline: "Tariff intelligence engine by Enterprise-Neo. Precise, explainable duties for any scenario.",
  copyright: "© 2025 Enterprise-Neo. All rights reserved.",

  // External URLs
  urls: {
    register: "https://enterprise-neo.com/register",
    login:    "https://enterprise-neo.com/login",
    swagger:  "https://tariff-data-dev.enterprise-neo.com/docs",
    pypi:     "https://pypi.org/project/neo-tariff/",
    website:  "https://enterprise-neo.com",
  },

  // Navigation structure
  nav: {
    product: [
      { label: "Platform",    href: "/platform" },
      { label: "REST API",    href: "/api" },
      { label: "Python SDK",  href: "/sdk" },
    ],
    main: [
      { label: "Technology",  href: "/technology" },
      { label: "Pricing",     href: "/pricing" },
      { label: "Company",     href: "/company" },
    ],
    resources: [
      { label: "Swagger API Docs ↗", href: "https://tariff-data-dev.enterprise-neo.com/docs", external: true },
      { label: "PyPI: neo-tariff ↗",  href: "https://pypi.org/project/neo-tariff/", external: true },
    ],
  },

  // Footer columns
  footer: {
    product: [
      { label: "Platform",    href: "/platform" },
      { label: "REST API",    href: "/api" },
      { label: "Python SDK",  href: "/sdk" },
    ],
    learn: [
      { label: "Technology",  href: "/technology" },
      { label: "Pricing",     href: "/pricing" },
    ],
    developers: [
      { label: "Swagger Docs ↗",  href: "https://tariff-data-dev.enterprise-neo.com/docs", external: true },
      { label: "PyPI Package ↗",  href: "https://pypi.org/project/neo-tariff/", external: true },
    ],
    company: [
      { label: "About",             href: "/company" },
      { label: "enterprise-neo.com ↗", href: "https://enterprise-neo.com", external: true },
    ],
  },
};
