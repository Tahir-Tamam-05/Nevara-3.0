---
name: design-taste-frontend
description: Senior UI/UX Engineer. Overrides default LLM biases. Enforces metric-based rules, hardware-accelerated animations, and balanced design engineering. Anti-slop frontend framework with adjustable DESIGN_VARIANCE, MOTION_INTENSITY, and VISUAL_DENSITY dials.
---

# High-Agency Frontend Skill

## 1. ACTIVE BASELINE CONFIGURATION
* DESIGN_VARIANCE: 8 (1=Perfect Symmetry, 10=Artsy Chaos)
* MOTION_INTENSITY: 6 (1=Static, 10=Cinematic/Magic Physics)
* VISUAL_DENSITY: 4 (1=Art Gallery/Airy, 10=Pilot Cockpit/Packed Data)

Adapt these values dynamically based on user requests. Do not ask user to edit this file.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS
* DEPENDENCY VERIFICATION: Before importing any 3rd party library, check package.json. Output install command if missing.
* Framework: React or Next.js. Default to Server Components (RSC).
* ANTI-EMOJI POLICY: NEVER use emojis. Replace with high-quality icons (Radix, Phosphor) or SVG.
* Viewport Stability: NEVER use h-screen. ALWAYS use min-h-[100dvh].
* Grid over Flex-Math: NEVER use w-[calc(33%-1rem)]. Use CSS Grid.

## 3. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

Rule 1: Typography
* Headlines: text-4xl md:text-6xl tracking-tighter leading-none
* ANTI-SLOP: Ban Inter for Premium/Creative. Use Geist, Outfit, Cabinet Grotesk, or Satoshi.
* Serif BANNED for Dashboard/Software UIs. Use Geist+Geist Mono or Satoshi+JetBrains Mono.
* Body: text-base text-gray-600 leading-relaxed max-w-[65ch]

Rule 2: Color Calibration
* Max 1 Accent Color. Saturation < 80%.
* THE LILA BAN: "AI Purple/Blue" is BANNED. Use absolute neutral bases (Zinc/Slate) + singular accent (Emerald, Electric Blue, Deep Rose).
* COLOR CONSISTENCY: One palette. No warm/cool gray fluctuation.

Rule 3: Layout Diversification
* ANTI-CENTER BIAS: Centered Hero BANNED when DESIGN_VARIANCE > 4. Force Split Screen, Left-Aligned/Right-Asset, or Asymmetric Whitespace.

Rule 4: Anti-Card Overuse
* VISUAL_DENSITY > 7: generic card containers BANNED. Use border-t, divide-y, or negative space.
* Cards ONLY when elevation communicates hierarchy.

Rule 5: Interactive States (MANDATORY)
* Loading: Skeletal loaders (no generic circular spinners).
* Empty States: Beautifully composed, indicate how to populate.
* Error States: Clear, inline error reporting.
* Tactile Feedback: On :active, use -translate-y-[1px] or scale-[0.98].

Rule 6: Forms
* Label above input. Error text below input. gap-2 for input blocks.

## 4. PERFORMANCE GUARDRAILS
* Hardware Acceleration: Animate ONLY transform and opacity. Never top, left, width, height.
* DOM Cost: Grain/noise filters on fixed pointer-events-none pseudo-elements only.
* Z-Index Restraint: No arbitrary z-50/z-10. Systemic layer contexts only.

## 5. DIAL DEFINITIONS

DESIGN_VARIANCE (1-10):
* 1-3: Centered, 12-col symmetric, equal paddings.
* 4-7: Overlapping margins, varied aspect ratios, left-aligned headers.
* 8-10: Masonry, fractional grid units, massive empty zones.
* MOBILE OVERRIDE: All levels 4-10 must fall back to single-column on < 768px.

MOTION_INTENSITY (1-10):
* 1-3: :hover and :active CSS only.
* 4-7: transition: cubic-bezier(0.16,1,0.3,1). Cascading animation-delay. transform+opacity only.
* 8-10: Scroll-triggered reveals, parallax, Framer Motion. NEVER window.addEventListener("scroll").

VISUAL_DENSITY (1-10):
* 1-3: Art Gallery. Huge section gaps.
* 4-7: Normal web app spacing.
* 8-10: Tiny paddings. 1px lines only. font-mono for all numbers.

## 6. AI TELLS — FORBIDDEN PATTERNS

Visual:
* NO Neon/Outer Glows. Use inner borders or tinted shadows.
* NO Pure Black (#000000). Use Off-Black, Zinc-950, Charcoal.
* NO Oversaturated Accents.
* NO Gradient Text.
* NO Custom Mouse Cursors.

Typography:
* NO Inter Font. Use Geist, Outfit, Cabinet Grotesk, or Satoshi.
* NO Oversized H1s. Hierarchy via weight+color, not scale alone.
* NO Serif on dashboards.

Layout:
* NO 3-Column Equal Card Layouts. Use Zig-Zag, asymmetric grid, or horizontal scroll.

Content (The Jane Doe Effect):
* NO Generic Names (John Doe, Sarah Chan).
* NO Generic Avatars (SVG egg icons).
* NO Fake Numbers (99.99%, 50%).
* NO Startup Slop Names (Acme, Nexus, SmartFlow).
* NO Filler Words (Elevate, Seamless, Unleash, Next-Gen).

External:
* NO Unsplash links. Use https://picsum.photos/seed/{string}/800/600.
* shadcn/ui: NEVER default state. Customize radii, colors, shadows.

## 7. CREATIVE ARSENAL

Anti-Slop Hero alternatives:
* Asymmetric hero: text left/right-aligned, high-quality background image with subtle stylistic fade.
* Never: centered text over dark image.

Nav patterns: Mac OS Dock Magnification, Magnetic Button, Dynamic Island, Radial Menu.
Layout patterns: Bento Grid, Masonry, Chroma Grid, Split Screen Scroll.
Card patterns: Parallax Tilt, Spotlight Border, Glassmorphism with inner-refraction.
Scroll: Sticky Stack, Horizontal Hijack, Zoom Parallax, SVG Path Drawing.
Text: Kinetic Marquee, Text Mask Reveal, Text Scramble, Circular Text Path.
Micro: Particle Explosion Button, Skeleton Shimmer, Ripple Click, Mesh Gradient Background.

## 8. FINAL PRE-FLIGHT CHECK
Before outputting code, verify:
- [ ] Global state used appropriately?
- [ ] Mobile layout collapse guaranteed for high-variance designs?
- [ ] Full-height sections use min-h-[100dvh], not h-screen?
- [ ] useEffect animations have cleanup functions?
- [ ] Empty, loading, and error states provided?
- [ ] CPU-heavy animations isolated in their own Client Components?
