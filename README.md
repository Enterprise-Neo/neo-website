# Neo Tariff — Product Website

Static site for [Neo Tariff](https://enterprise-neo.com), the Tariff Intelligence Engine by Enterprise-Neo.

## Quick Start — Deploy to Netlify

### Option A: GitHub + Netlify (Recommended)

1. **Push this folder to GitHub:**
   ```bash
   cd neo-tariff-site
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin git@github.com:enterprise-neo/neo-tariff-site.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project"
   - Select your GitHub repo
   - Build command: *(leave blank — no build step needed)*
   - Publish directory: `.`
   - Click "Deploy site"

3. **Set custom domain:**
   - In Netlify dashboard → Domain settings → Add custom domain
   - Add `neotariff.enterprise-neo.com` (or your preferred subdomain)
   - Update DNS: add a CNAME record pointing to your Netlify site URL

4. **Future updates:**
   - Edit files → `git push` → site auto-deploys in ~5 seconds

### Option B: Drag-and-Drop

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this entire folder onto the browser
3. Site is live immediately

## Local Development

```bash
# Any simple HTTP server works. Pick one:
npx serve .
# or
python3 -m http.server 8000
# or
php -S localhost:8000
```

Then open `http://localhost:8000` (or `:3000` for npx serve).

> **Note:** Opening HTML files directly (via `file://`) won't work because the shared components use XHR to load, which requires same-origin. Always use a local server.

## Site Architecture

```
neo-tariff-site/
├── index.html                 ← Overview / landing page
├── technology/index.html      ← Technology deep dive
├── platform/index.html        ← Platform features
├── api/index.html             ← REST API reference
├── sdk/index.html             ← Python SDK reference
├── pricing/index.html         ← Pricing plans
├── company/index.html         ← Team, philosophy, advisory
├── shared/
│   ├── styles.css             ← ALL design tokens & styles (edit here!)
│   └── components.js          ← Nav, Footer, utility components
├── _redirects                 ← Netlify URL routing
├── netlify.toml               ← Netlify caching config
└── README.md                  ← This file
```

## How to Make Changes

### Change fonts, colors, or spacing site-wide
Edit `shared/styles.css`. All design tokens are CSS custom properties at the top of the file under `:root`. Change `--accent` to update the purple accent everywhere, change font families in the utility classes, etc.

### Change nav links, footer links, or site metadata
Edit `shared/components.js`. The `SITE` config object at the top controls URLs, the copyright line, and external links. The `NeoNav` and `NeoFooter` components define the navigation structure.

### Change page content
Edit the individual page's `index.html`. Each page is a self-contained React component with its own data and layout. The unique content is all inline.

### Add a new page
1. Create a new folder: `mkdir new-page`
2. Copy any existing page as a template: `cp pricing/index.html new-page/index.html`
3. Update the title, `activePage` prop on `<NeoNav>`, and the content
4. Add a link to the nav in `shared/components.js`

## Tech Stack

- **React 18** (loaded from CDN, no build step)
- **Babel Standalone** (in-browser JSX compilation)
- **Pure CSS** (no Tailwind, no Sass — just CSS custom properties)
- **Netlify** (static hosting, automatic HTTPS)

No Node.js, no npm, no webpack, no build pipeline. Edit HTML files and deploy.

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Overview | `/` | Landing page — problem, personas, pillars, platform preview, comparison, FAQ |
| Technology | `/technology` | 7-stage pipeline deep dive, architecture diagram, coverage stats |
| Platform | `/platform` | Interactive feature showcase for all platform tools |
| REST API | `/api` | 50 endpoints across 16 groups with method details |
| Python SDK | `/sdk` | Typed client reference with code examples |
| Pricing | `/pricing` | 5-tier usage-based pricing with feature list and FAQ |
| Company | `/company` | Team, advisors, philosophy, advisory services |
