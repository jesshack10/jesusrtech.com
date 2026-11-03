# jesusrtech — Brand Guide

Use this for anything made for Jesús Ramírez Nava / **jesusrtech**: websites, web apps,
slides, docs, CVs, social posts, thumbnails, logos. Source of truth for tokens:
`src/styles/global.css`.

## Identity

- **Name:** Jesús Ramírez Nava. **Brand:** `jesusrtech` (always lowercase, one word).
- **Role:** AI Consultant & Software Developer.
- **Positioning:** "I help businesses adopt AI with confidence: a clear strategy, a team
  that knows how to use it, and custom software that puts it to work."
- **Based:** Monterrey, Mexico (UTC-6), remote with US teams.
- **Languages:** English + Spanish. Pick per audience; don't mix in one piece.

## Concept: "Blueprint"

Engineering drawing meets backlit console. Think technical drawing sheet: faint grid,
monospace annotations, numbered sections, registration-mark corner ticks, spec tables.
Precise, quiet, confident. Not flashy, not playful, not "AI startup gradient".

## Logo

- **Wordmark:** `/ jesusrtech` — JetBrains Mono, medium weight, lowercase, tight tracking.
  The `/` is amber; the name is the primary text color.
- **Icon:** rounded square (radius 25%) in brand green `#4a7c59` with a white-ish
  `#f5f5f3` bold "J" (Inter 700), centered.
- Don't stretch, outline, add gradients or shadows to either.

## Color

**Dark is the default theme.** Light is the alternate ("drafting paper").

### Brand colors

| Role | Dark | Light |
|---|---|---|
| Primary accent (amber) | `#f59e0b` | `#b45309` |
| Accent hover | `#fbbf24` | `#92400e` |
| Text on accent fill | `#0b0d10` | `#ffffff` |
| Secondary accent (green) | `#6aa57d` (text/lines) / `#4a7c59` (fills) | `#4a7c59` |

- Amber is the main brand color: CTAs, links, active states, key numbers, the `/`.
- Green `#4a7c59` is the secondary brand color: logo icon, secondary highlights,
  chart series #2, social accents. Use it less than amber. Never as the primary CTA.
- Keep brand green visually distinct from the "success" green below.

### Neutrals

| Token | Dark | Light |
|---|---|---|
| Background (base) | `#0b0d10` | `#fbfbfc` |
| Surface | `#121519` | `#f4f5f7` |
| Elevated | `#191d23` | `#eceef1` |
| Border | `#2b313a` | `#d5dae1` |
| Line (hairlines, grid) | `#21262d` | `#e3e7ec` |
| Text primary | `#e6e9ed` | `#14171a` |
| Text secondary | `#98a2b0` | `#565f6b` |
| Text muted | `#646d7a` | `#8b95a1` |

### Status

| Role | Dark | Light |
|---|---|---|
| Success / ok | `#4ade80` | `#15803d` |
| Info | `#7ea9ff` | `#1d4ed8` |
| Danger | `#e5484d` | `#e5484d` |
| Warning | amber accent | amber accent |

### Print / PDF

White background, light-theme colors, text secondary darkened to `#3f4650`,
muted to `#6b7480`, amber `#b45309`.

## Typography

- **Sans (everything):** Inter — 300/400/500/600/700.
- **Mono (annotation voice):** JetBrains Mono — 400/500. Used for labels, tags, metadata,
  numbers/metrics, the wordmark, code.
- Headings: semibold (600), tight tracking, `text-balance`. Hero H1 ~60px, leading 1.05.
  Section H2 24–30px.
- Body: 16–18px, relaxed leading, secondary text color, `text-pretty`, max ~65ch.
- **Label style** (`.bp-label`): JetBrains Mono, 11px, UPPERCASE, letter-spacing 0.14em,
  muted color. This is the signature detail — use it for eyebrows, metadata, table keys.

## Shape, space & surfaces

- **Corners are nearly square:** 3px for buttons, cards, panels; 2px for tags/chips.
  `rounded-full` only for status dots and avatars. No pill buttons, no big radii.
- **Borders over shadows.** 1px borders + hairline dividers. At most a 1px bottom shadow
  on primary buttons. No soft drop shadows, no glassmorphism (light backdrop blur on a
  panel is OK).
- Containers: max width ~1152px (`max-w-6xl`), 24px side padding. Generous vertical space.
- Cards: border + surface at ~40% opacity, hover → border goes amber at 40%, surface solid,
  corner ticks appear.

## Signature elements

1. **Engineering grid** — 64px grid of `line`-colored 1px lines, faded out with a radial
   mask from the top. Behind hero areas only, never over content.
2. **Section headers** — `01 ── WORK ─────────` : amber mono number, short rule, mono
   label, then a hairline to the edge, then the H2 and a one-line lede.
3. **Corner ticks** — 7px amber L-marks on top-left and bottom-right of cards/panels,
   shown on hover/focus. Like registration marks.
4. **Spec panel / title block** — key/value table (mono keys, small text values) with a
   header strip ("SPECIFICATION" … "v2026.1" in amber).
5. **Mono chips** — 11px mono tags with 1px border, 2px radius.
6. **Metrics** — big mono numbers in amber with a mono label above.
7. **Arrows** — `→` on primary CTAs (nudges right on hover), `↗` for external links.

## Components

- **Primary button:** amber fill, accent-ink text, 3px radius, medium weight, hover to
  accent-hover, press moves 1px down.
- **Secondary button:** transparent, 1px border, hover → amber border + amber text.
- **Ghost button:** secondary text, hover → primary text.
- **Tags:** variants accent / ok / info / neutral = 35% border, 8% fill of that color.
- **Callouts:** 1px border, 2px colored left border, 6% tinted fill, mono uppercase title.
- **Highlight (`mark`):** amber at 22% behind text.
- Focus ring: 2px amber outline, 2px offset. Selection: amber bg, accent-ink text.

## Motion

- Subtle and fast. Reveal on scroll: fade + 12px rise, 600ms,
  `cubic-bezier(0.22, 1, 0.36, 1)`, staggered 60–80ms.
- Hover transitions 150–200ms. Page transitions: 180ms cross-fade.
- Always respect `prefers-reduced-motion`. Content must be readable without JS.

## Voice

- Plain and direct. Short, concrete sentences. Engineer-honest.
- Lead with outcomes and specifics (what was built, numbers, tech), not adjectives.
- No hype, no buzzwords ("revolutionary", "synergy", "cutting-edge"), no emoji in UI copy.
- First person ("I help…"). Confident, not salesy.

## Applying it elsewhere

- **Slides/docs:** dark background for decks, light/print palette for documents and CVs.
  Mono labels for slide eyebrows and section numbers; one amber highlight per slide.
- **Social / thumbnails:** dark base, faint grid, big Inter semibold headline, amber key
  word, green as the second accent, `/ jesusrtech` wordmark in a corner.
- **Charts:** series 1 amber, series 2 green, then neutrals; gridlines in `line` color.

## Do / Don't

- Do: lots of negative space, hairlines, mono metadata, amber used sparingly.
- Don't: gradients, glow, purple/blue "AI" palettes, rounded bubbly cards, stock 3D
  illustrations, heavy shadows, more than two accent colors on screen.
