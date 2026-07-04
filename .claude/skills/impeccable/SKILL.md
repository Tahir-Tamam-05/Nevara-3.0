---
name: impeccable
description: Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics. Use when the user asks to build web components, pages, artifacts, posters, or applications, or when any design skill requires project context. Call with 'craft' for shape-then-build, 'teach' for design context setup, or 'extract' to pull reusable components and tokens into the design system.
version: 2.1.1
user-invocable: true
argument-hint: "[craft|teach|extract]"
license: Apache 2.0. Based on Anthropic frontend-design skill.
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

## Context Gathering Protocol

Before any design work, confirm design context. Check: (1) loaded instructions for a Design Context section, (2) .impeccable.md in project root, (3) run /impeccable teach if neither exists.

Required context: target audience, use cases, brand personality/tone.

---

## Design Direction

Commit to a BOLD aesthetic direction. Pick a tone: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, editorial/magazine, brutalist/raw, industrial/utilitarian. Execute with precision and intentionality.

## Frontend Aesthetics

### Typography
- Modular type scale with fluid sizing (clamp) for headings.
- Fewer sizes with more contrast (1.25 ratio minimum between steps).
- Cap line length at 65-75ch.
- FONT BAN: Fraunces, Newsreader, Lora, Crimson Pro, Playfair Display, Cormorant, Syne, IBM Plex Mono/Sans, Space Mono/Grotesk, Inter, DM Sans, DM Serif Display, Outfit, Plus Jakarta Sans, Instrument Sans/Serif are monoculture defaults. Reject them.
- DO pair a distinctive display font with a refined body font.
- DON'T use monospace as shorthand for "technical vibes."

### Color & Theme
- Use OKLCH (perceptually uniform), not HSL.
- Tint neutrals toward brand hue (even chroma 0.005 is perceptible).
- 60-30-10: 60% neutral / 30% secondary / 10% accent.
- Theme derived from audience context, not defaults.
- DON'T: AI color palette (cyan-on-dark, purple-to-blue gradients, neon accents).
- DON'T: pure black (#000) or pure white (#fff).
- ABSOLUTE BAN: gradient text (background-clip:text with gradient = never).

### Layout & Space
- 4pt spacing scale with semantic tokens (--space-sm, --space-md, etc.).
- Use gap instead of margins for sibling spacing.
- Self-adjusting grid: grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)).
- DON'T wrap everything in cards.
- DON'T use identical 3-card grids (icon + heading + text, repeated).
- DON'T center everything. Left-aligned asymmetric layouts feel more designed.

### Absolute Bans
BAN 1 - Side-stripe borders: border-left or border-right > 1px as colored accent = NEVER.
  Rewrite: use full borders, background tints, leading numbers/icons, or nothing.
BAN 2 - Gradient text: background-clip:text + gradient = NEVER.
  Rewrite: solid color for text.

### Motion
- Use exponential easing (ease-out-quart/expo) for natural deceleration.
- For height animations, use grid-template-rows transitions.
- DON'T animate layout properties (width, height, padding, margin). Transform and opacity only.
- DON'T use bounce or elastic easing.

---

## The AI Slop Test

If showing this to someone and saying "AI made this" makes them nod immediately — that's the problem. A distinctive interface makes someone ask "how was this made?"

---

## Modes
- /impeccable craft [desc]: Shape aesthetic direction first, then build.
- /impeccable teach: Gather project design context → write .impeccable.md.
- /impeccable extract [target]: Pull design tokens/components into design system.
