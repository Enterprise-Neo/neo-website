# Style Migration — Legacy Framer → Current Website

Tracking incremental style changes to align with legacy Enterprise-NEO Framer website while maintaining modern design.

---

## Stage 1 — Global Foundations (CSS Variables)

| #   | Item                                                                     | Status |
| --- | ------------------------------------------------------------------------ | ------ |
| 1   | Page background color (`--bg: #000319`)                                  | Done   |
| 2   | Card background colors (`--bg-card`, `--bg-card-hover`, `--bg-elevated`) | Done   |
| 3   | Border treatment (semi-transparent `rgba(255,255,255,0.12)`)             | Done   |
| 4   | Font smoothing (`-webkit-font-smoothing: antialiased`)                   | Done   |
| 5   | Selection colors (`::selection` purple accent)                           | Done   |
| 6   | Custom easing curve (`--ease: cubic-bezier(0.44, 0, 0.56, 1)`)           | Done   |

**Extras completed during Stage 1:**

- Hero glow: Shifted to upper-left spotlight at 18% opacity, removed bottom-right glow
- All inner pages: NeoHero glow presets unified to match homepage
- Nav: Made transparent by default on all pages (was homepage only)
- Nav scroll styles: Moved from inline JS to CSS classes (`neo-nav--transparent`, `neo-nav--scrolled`)
- RGB channel variables: Added `--bg-rgb`, `--bg-card-rgb`, `--bg-card-hover-rgb`, `--bg-elevated-rgb`, `--accent-rgb` for `rgba()` usage
- Hardcoded colors: Replaced all `#0C0E1A` hex and `rgba(12,14,26,...)` across 6 HTML files + components with `var(--bg)` / `rgba(var(--bg-rgb), ...)`
- Webmanifest: Updated `background_color` to `#000319`

---

## Stage 2 — Text & Color Refinements

| #   | Item                                                                                                               | Status |
| --- | ------------------------------------------------------------------------------------------------------------------ | ------ |
| 7   | Body text color adjustment (transparent white: secondary `rgba(255,255,255,0.70)`, muted `rgba(255,255,255,0.42)`) | Done   |
| 8   | Letter-spacing on headings (`h1, h2, h3 { letter-spacing: -0.02em }`)                                              | Done   |
| 9   | Font size normalization & CSS variables (`--fs-xs`, `--fs-sm`, `--fs-base`, `--fs-md`)                             | Done   |

**Extras completed during Stage 2:**

- Hero font: Switched large hero text from Source Serif 4 to Plus Jakarta Sans (`className="display"`), weight 600, lineHeight 1.2
- All headings: Extended Plus Jakarta Sans to all `h1, h2, h3` via CSS rule
- Hero descender fix: Adjusted `lineHeight` from 1.08 to 1.2 to prevent clipping
- Text RGB variables: Added `--text-primary-rgb` for `rgba()` usage
- Text color hierarchy: Revised `--text-secondary` to `rgba(255,255,255,0.70)` and `--text-muted` to `rgba(255,255,255,0.42)` (transparent white approach instead of fixed hex)
- Text-muted audit: Promoted ~20 `--text-muted` usages to `--text-secondary` where content was body text (card descriptions, paragraphs). Kept muted for labels, icons, inactive states.
- Section title alignment: Left-aligned mid-page content section titles across all pages (How It Works, FAQ, By the Numbers, Our Team, What You Get, What Powers It All). Kept centered: CTA sections, quote sections, team category labels.
- Line-height consolidation: Reduced 12+ distinct values to 6 standard values (1.0, 1.15, 1.2, 1.4, 1.6, 1.75) with CSS variables (`--lh-tight`, `--lh-heading`, `--lh-snug`, `--lh-body`, `--lh-relaxed`)
- Font size consolidation: Reduced 31 distinct sizes to 4 CSS variables (142 replacements) + intentionally kept micro/heading sizes

---

## Stage 3 — Component Depth

| #   | Item                                                                                           | Status |
| --- | ---------------------------------------------------------------------------------------------- | ------ |
| 10  | Card border-radius (`--radius: 8px`, `--radius-sm: 4px`) — 12 CSS classes + 21 inline elements | Done   |
| 11  | Button border-radius (`--radius-btn: 6px`) — `.cta-btn`, `.tier-btn`, nav buttons, tabs        | Done   |
| 12  | Subtle card shadows (`--shadow-card`, `--shadow-card-hover`) — all card classes                | Done   |
| 13  | Purple radial glow on CTA sections (all 6 pages)                                               | Done   |

---

## Stage 4 — Polish

| #   | Item                                                                                                  | Status |
| --- | ----------------------------------------------------------------------------------------------------- | ------ |
| 14  | Enhanced divider gradients (purple accent tint at center)                                             | Done   |
| 15  | Warm secondary accent variable (`--accent-warm: #e96f49`, `--accent-warm-rgb`) — defined, not applied | Done   |
| 16  | Final consistency audit — fixed remaining bare `ease` in animations/transitions across all files      | Done   |

---

## Decisions Made

| Topic               | Decision                                                                                                                                             | Rationale                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Fonts               | Plus Jakarta Sans for all headings (h1-h3) + DM Sans (body) + JetBrains Mono (code). Source Serif 4 still loaded but no longer primary heading font. | Plus Jakarta Sans provides cleaner, more modern headings. DM Sans remains for body text. |
| Primary accent      | Keep purple (`#6c63ff`), do not switch to legacy orange                                                                                              | Purple is working well; changing primary accent would require full brand overhaul        |
| Border radius       | Will use 6-8px cards / 4-6px buttons (middle ground)                                                                                                 | Legacy 28px too rounded for 2026; current 2px too sharp                                  |
| Glassmorphism       | Keep flat cards, only use backdrop-filter on overlays                                                                                                | Heavy glassmorphism is dated (peaked 2021-2023)                                          |
| Section padding     | Keep current 80px                                                                                                                                    | Legacy 135px wastes vertical space                                                       |
| Mobile body text    | Do not adopt legacy 12px                                                                                                                             | Accessibility concern — too small                                                        |
| Pure white headings | Keep warm white `#e4e2dd`                                                                                                                            | Better for eye comfort on dark bg                                                        |

---

## Skipped from Legacy (Intentionally)

- Plus Jakarta Sans as primary body font (current DM Sans is better)
- 28px card border-radius (too rounded/dated)
- 999px pill buttons (too soft)
- Heavy glassmorphism on content cards
- Orange as primary accent
- 135px section vertical padding
- 12px mobile body text
- Nav link hover → orange (inconsistent with purple system)
