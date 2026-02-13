# Neo Tariff — Product Website

Static website for Neo Tariff by Enterprise-Neo. 7 pages, no build step required.

## Pages

| Path | Page | Description |
|------|------|-------------|
| `/` | Overview | Landing page — hero, problem, personas, pillars, platform preview, comparison, AI approach, FAQ |
| `/technology` | Technology | 7-stage pipeline deep dive, architecture diagram, stats, AI boundary |
| `/platform` | Platform | 6 tools walkthrough with interactive demos |
| `/api` | REST API | 50 endpoints across 16 groups, request/response examples |
| `/sdk` | Python SDK | Typed client reference with code examples |
| `/pricing` | Pricing | 5-tier usage-based model, feature grid, 13 FAQs |
| `/company` | Company | Leadership team, advisors, philosophy, advisory services |

## Folder Structure

```
neo-tariff-site/
├── index.html                  # Overview (landing page)
├── technology/index.html       # Technology deep dive
├── platform/index.html         # Platform tools
├── api/index.html              # REST API reference
├── sdk/index.html              # Python SDK reference
├── pricing/index.html          # Pricing
├── company/index.html          # Company & team
├── shared/
│   ├── styles.css              # ⭐ CENTRALIZED STYLES — edit here to update all pages
│   ├── config.js               # Site-wide config (nav links, footer, URLs)
│   └── components.jsx          # Shared React components (Nav, Footer)
├── _redirects                  # Netlify routing rules
├── netlify.toml                # Netlify build & header config
└── README.md
```

## Centralized Formatting

All design tokens live in `shared/styles.css` under `:root`. To change colors, fonts, or spacing across the entire site, edit these variables:

```css
:root {
  /* Colors — change these to rebrand */
  --accent:        #6C63FF;    /* Primary brand color */
  --accent-bright: #7B73FF;    /* Hover state */
  --bg:            #0C0E1A;    /* Page background */
  --bg-card:       #131627;    /* Card backgrounds */
  --text-primary:  #E4E2DD;    /* Main text */
  --text-secondary:#9B99A3;    /* Secondary text */
  --text-muted:    #6B697A;    /* Dimmed text */
  --border:        #252840;    /* Card/section borders */

  /* Fonts — change these to swap typefaces */
  --font-serif: 'Source Serif 4', Georgia, serif;
  --font-sans:  'DM Sans', -apple-system, sans-serif;
  --font-mono:  'JetBrains Mono', monospace;

  /* Layout */
  --max-width:    1180px;
  --nav-height:   60px;
  --section-pad:  80px 48px;
}
```

Site-wide nav links and footer content are in `shared/config.js` — update URLs, labels, or add new pages there.

## Deploy to Netlify (5 minutes)

### Option A: GitHub + Auto-Deploy (recommended)

1. **Create a GitHub repo:**
   ```bash
   cd neo-tariff-site
   git init
   git add .
   git commit -m "Initial Neo Tariff website"
   git remote add origin git@github.com:enterprise-neo/neo-tariff-site.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click **"Add new site" → "Import an existing project"**
   - Select your GitHub repo
   - Build settings: leave blank (no build command needed)
   - Publish directory: `.` (root)
   - Click **Deploy**

3. **Set custom domain:**
   - In Netlify dashboard → Domain settings
   - Add custom domain: `neotariff.enterprise-neo.com` (or your choice)
   - Add a CNAME record in your DNS: `neotariff` → `[your-site].netlify.app`
   - Netlify provisions HTTPS automatically

4. **Future updates:**
   - Push to `main` → site auto-deploys in ~10 seconds
   - No build step, no CI, no waiting

### Option B: Manual drag-and-drop

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the `neo-tariff-site` folder onto the deploy area
3. Site is live immediately
4. Add custom domain in settings

## Making Content Changes

**Update text/content:** Edit the relevant `index.html` file directly. Content is in JSX arrays and data objects near the top of each page's `<script>` block.

**Update styles globally:** Edit `shared/styles.css`. Changes cascade to all pages immediately.

**Update nav links or footer:** Edit `shared/config.js`. Currently, pages 2–7 still have inline nav/footer (they reference the same CSS variables so style changes still cascade). The Overview page uses the shared React components.

**Add a new page:** Create a new folder (e.g., `blog/index.html`), copy the HTML template from any existing page, and add the nav link to `shared/config.js`.

## Tech Stack

- **React 18** (CDN, no build step)
- **Babel Standalone** (JSX compilation in browser)
- **No framework, no npm, no webpack** — just HTML files
- Fonts: Source Serif 4, DM Sans, JetBrains Mono (Google Fonts CDN)

## Notes

- These are static HTML files with client-side React. No server required.
- Babel Standalone compiles JSX in the browser. This adds ~200ms to initial load but eliminates all build tooling. For a product marketing site with low traffic, this is a fine tradeoff.
- If performance becomes a concern, the pages can be pre-compiled with a simple `npx babel` build step — the code is standard React and would compile unchanged.
