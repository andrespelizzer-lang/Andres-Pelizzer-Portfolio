# Portfolio — Andres Pelizzer

## Project context

Personal portfolio for Andres Pelizzer, first-year student in the ITS Web Stack
Full Developer program at ITS Digital Academy Mario Volpato (San Donà di Piave).
Born 25/11/2006, lives in Monastier di Treviso (TV).

Upcoming internship at **MTS Informatica** (Treviso area) — likely starting **end of May / early June 2026**.
Stack at MTS: Angular, .NET, .NET MAUI.

The site's purpose is to present himself for the internship and future opportunities.
**Internal deadline: mid-May 2026.**

## Tech stack

- **Pure frontend**: HTML5, CSS3, vanilla JavaScript
- **No frameworks**: no React, Vue, Tailwind, Bootstrap, jQuery
- **No build step**: no Webpack, Vite, npm install
- **Fonts**: Syne (headings) + DM Mono (body) via Google Fonts
- **Deploy**: GitHub + (later) GitHub Pages or Vercel

## Project files

- `index.html` — full structure, single page
- `style.css` — all styles
- `script.js` — all JS in numbered blocks
- `CLAUDE.md` — this file
- `.git/` — repository
- `README.md` — public description

### Bio / Presentation

> First-year student in the ITS Web Stack Full Developer program at ITS Digital
> Academy Mario Volpato. Passionate about full-stack development: front-end with
> HTML, CSS, and JavaScript (with attention to design and UX), back-end with
> Node.js, Express, and MySQL. Interested in integrating AI into web applications.
>
> Strengths: technical curiosity, attention to detail in design and code,
> ability to learn independently.

### Projects to showcase

| Project                  | Period         | Description                                                                                                           |
| ------------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Mini JSONPlaceholder** | Apr 2026 – now | Full REST API in Node.js/Express. CRUD with Express Router, nested routes, tested with Thunder Client.                |
| **Personal portfolio**   | Mar 2026 – now | Vanilla HTML/CSS/JS site. Dark minimal, lime accent, Syne + DM Mono, CSS keyframes, responsive, Git/GitHub.           |
| **"Diventa" website**    | Feb–Mar 2026   | Multi-page institutional site from Figma design. Flexbox + Grid, media queries.                                       |
| **GameHub**              | Dec 2025 – now | Java desktop app (Swing) for e-sports tournament management. Layered architecture (UI / logic / data). Group project. |

### Technical skills (verified through coursework)

**Front-end**

- Semantic HTML5
- CSS3: Flexbox, Grid, responsive design, media queries, keyframe animations
- JavaScript: DOM manipulation, events, async/await, fetch API
- Vue.js (basics)

**Back-end**

- Node.js
- Express.js: routing, middleware, REST API design, JWT authentication

**Database**

- MySQL: schema design, foreign keys, relationships, normalization (1NF–3NF)
- SQLite

**Other languages / paradigms**

- Python: OOP, Standard Library, file handling
- Java: OOP, Swing, layered architecture

**Tools**

- Git / GitHub
- Docker / Docker Compose
- VS Code, Thunder Client
- Figma
- Power BI

**Languages**

- Italian (native)
- English (B2)

### Interests (for the About section)

- Tennis (regular practice + statistical analysis)
- Artificial intelligence and understanding how hardware/software work "behind the scenes"

---

## Conventions

### Language

- **Code comments**: Italian (these are study notes — do not remove existing ones)
- **Website content**: English
- **Communication with Andres**: Italian

### Code style

- **Indentation**: 2 spaces
- **CSS**: variables `--name` in `:root`, never hardcoded colors
- **CSS**: BEM-like but relaxed (`.about-quote`, `.project-card`, `.skill-dot`)
- **JS**: `const` by default, `let` only when reassignment is needed, never `var`
- **JS**: arrow functions `() => {}` preferred when `this` isn't needed
- **HTML**: semantic (`<section>`, `<article>`, `<button>`, `<nav>`, not `<div>` everywhere)

### Design system

**Palette**

- `--bg: #080808`
- `--text: #ebebeb`
- `--muted: #4a4a4a`
- `--dim: #1e1e1e`
- `--accent: #c8ff00`

**Fonts**

- Headings: Syne (Google Fonts)
- Body / mono: DM Mono (Google Fonts)

**Visual identity**

- Logo: "AP" monogram where the tennis racket forms both letters — the handle
  is the left leg of the A, the racket head (oval with strings) becomes the P.
  Lime green (#c8ff00) racket on white letters, or all-lime variant.
  The logo PNG file (`logo.png`) is in the project root, with transparent background.
  In the nav: logo mark + "andres pelizzer" text next to it (or below, whichever fits).
- Recurring elements (used as separators, hover accents, backgrounds, buttons):
  1. **Ball trajectory**: dashed curved lines with dot endpoints — like a ball
     flight path tracked by a system. Used as section separators.
  2. **Ball seam curve**: the S-shaped curve from a tennis ball surface — used
     as a graphic accent on hover states, card borders, decorative touches.
  3. **Court lines**: thin straight lines reminiscent of tennis court markings —
     used for layout structure, grid lines, subtle background patterns.
  4. **Gradient/texture**: lime-to-transparent gradients and dot patterns for
     depth and movement — used in backgrounds and section transitions.
- Aesthetic: dark minimal, high contrast, lime accent on near-black

**Navigation**

- Sticky: the nav must remain fixed at the top at all times (never hides on scroll)
- Solid background: `--bg` (#080808) so content scrolls behind/under the nav
- Same behavior as christiancolonna.com — always visible, opaque, content disappears under it

### Comment style

Maintain this established pattern:

```css
/* ════════════════════════════════════════════
   SECTION NAME — brief description of what it does.
   Optional technical notes about tricks or patterns used.
   ════════════════════════════════════════════ */

.class {
  property: value; /* explanation of why */
}
```

```javascript
/* ════════════════════════════════════════════
   N. BLOCK NAME

   What it does visually:
   ...

   Why it's needed:
   ...

   Technique used:
   ...
   ════════════════════════════════════════════ */

const x = ...; // inline comment explaining why
```

---

## Do NOT

- Add dependencies (no npm, no external libraries)
- Rewrite existing files without showing the plan first
- Change the palette or fonts without asking
- Use `localStorage` or `sessionStorage`
- Remove existing Italian comments — they're there for learning

---

## Working with Andres

### Autonomy level

Andres has set the level to "junior professional":

- You can write code directly — no need to give hints only
- You MUST ALWAYS explain the plan BEFORE writing
- You MUST ALWAYS explain technical choices AFTER writing
- He reviews everything and can request changes

### Workflow for each task

1. **Restate** the task in your own words to confirm understanding
2. **Present the plan** in 2–5 numbered points
3. **Wait for OK** before writing code (or "go ahead" if trivial)
4. **Write** the code
5. **Explain choices** — why X instead of Y, any trade-offs

### Technical explanations

Andres is learning, so:

- When using a CSS property or JS method he hasn't seen before,
  add an inline comment explaining it
- For "intermediate/advanced" concepts (e.g. IntersectionObserver,
  cubic-bezier, regex), add a 3–4 line mini-lesson in the comment
- Always in Italian. If he doesn't know a technical term, explain it.

---

## Current project state

### Completed sections

- [x] 001 — Hero (live system bar, parallax, curtain reveal)
  - Responsive: done and working well
  - Logo: replace `$` with the AP monogram (racket-based, see Visual Identity).
    The logo is `logo.png` (transparent background) in the project root. In the nav,
    show the logo image + "andres pelizzer" text.
  - Nav: make it sticky (position: fixed, top: 0, z-index high), solid --bg
    background, content scrolls under it. Never auto-hide on scroll.
    Add appropriate padding-top to the hero section to compensate for fixed nav height.
  - Mobile hamburger menu: needs complete redesign (fullscreen overlay, large
    Syne links numbered 001–004, lime accents, "Open to work" status at bottom,
    social links GH/LI — remove "Andres Pelizzer 2026" text)
  - Typography: slightly increase font sizes of smaller elements (section label,
    status bar, bottom bar, CTA buttons) across all breakpoints — phone, tablet,
    and desktop. They currently feel a bit too small. Don't touch the main
    "ANDRES PELIZZER" heading, that's fine.
- [x] 002 — About (tooltip, Now card, stat cards)
  - Has a sticky element similar to section 003 — needs differentiation
  - Content still generic — update with real CV text
- [x] 003 — Projects (card layout)
  - Structure is decent, may need refinements
  - Images are Unsplash placeholders — replace with real project screenshots
- [x] 004 — Skills (3 infinite marquees)
  - Andres doesn't like this section — redesign completely, use your judgment
- [ ] 005 — Contact (to build from scratch, free creative direction)

### Known bugs / to review

- General responsiveness to verify across all breakpoints
- Project images are placeholder Unsplash, need real screenshots
- Missing Contact section
- About content still generic

### Future wishes

- Recurring visual elements are now defined (see Visual Identity section):
  ball trajectory separators, seam curves as accents, court line patterns,
  lime gradient textures. Implement these progressively across sections
  as they are built or revised. Reference: the brand board image provided
  by Andres (AP monogram + elements).

---

## Resources

- Design reference: Elan 42 (quality level to aim for)
- Peer comparison: christiancolonna.com
- GitHub repo: https://github.com/andrespelizzer-lang/Andres-Pelizzer-Portfolio.git

---

## Git commands

```bash
# check repo status
git status

# see changes
git diff

# save and push
git add .
git commit -m "description"
git push

# pull changes from another PC
git pull
```

When told to push, push to the GitHub repo.
