# CLAUDE.md

# NEVARA — MASTER BUILD SPECIFICATION
Version: 1.0
Status: Production Build
Author: Tahir

---

# PROJECT VISION

NEVARA is NOT a SaaS dashboard.

NEVARA is NOT a consultancy website.

NEVARA is NOT an NGO website.

NEVARA is an Environmental Intelligence company.

Our product converts satellite observations into audit-ready environmental evidence.

Everything on this website must communicate trust, precision, elegance and scientific credibility.

The website should feel closer to an Apple keynote film or a National Geographic documentary than a traditional corporate website.

The visitor should experience a story—not browse pages.

---

# DESIGN PHILOSOPHY

Keywords

Luxury
Minimal
Timeless
Editorial
Scientific
Cinematic
Calm
Premium
Architectural
Elegant

Never flashy.

Never futuristic.

Never cyberpunk.

Never software-heavy.

Technology should disappear into the background.

Nature is always the hero.

---

# PRIMARY AUDIENCE

Priority order

1.
CSR Teams

2.
Environmental Impact Assessment (EIA) Consultants

3.
Environmental Consulting Firms

4.
Government Agencies

5.
Restoration Organizations

6.
NGOs

7.
Research Institutions

---

# CORE MESSAGE

Environmental Intelligence.

Verified From Space.

Audit-ready.

Actionable.

Scientific.

---

# USER EMOTION

Beginning

Curiosity

↓

Wonder

↓

Understanding

↓

Trust

↓

Confidence

↓

Action

---

# TECH STACK

Framework

Astro

Language

TypeScript

Animation

GSAP

Scroll

Lenis

Canvas

HTML Canvas

Images

PNG Frame Sequence

Styling

TailwindCSS

Icons

Lucide

Deployment

Vercel

---

# WEBSITE STRUCTURE

Landing Page

↓

Hero Story

↓

Problem

↓

What We Do

↓

Environmental Intelligence

↓

Reports

↓

Projects

↓

Partners

↓

Contact

Single Page

No page reloads.

---

# HERO

This is the most important part.

Everything else is secondary.

The hero occupies approximately 70% of development effort.

---

Canvas

Uses extracted frame sequence.

Folder

/public/assets/sequence/

Images

frame_000000.png

...

frame_000263.png

Canvas should always fill the viewport.

No image distortion.

Contain aspect ratio.

---

Scroll

The hero uses scroll-driven animation.

No autoplay.

Frames advance according to scroll position.

GSAP ScrollTrigger controls the sequence.

Lenis controls smooth scrolling.

---

Text

The text overlays fade in/out independently.

Never overlap.

Never animate aggressively.

Use opacity.

Small translateY.

No bouncing.

No scaling.

---

Hero Story

Scene 1

Nature

↓

Scene 2

Observation

↓

Scene 3

Environmental Intelligence

↓

Scene 4

Ecological Change

↓

Scene 5

Environmental Evidence

↓

Scene 6

Final Message

---

After Hero

The final frame remains visible.

The website naturally scrolls into content.

No hard cut.

---

# CONTENT SECTIONS

SECTION 1

Why NEVARA Exists

Large editorial headline

Minimal text

Large whitespace

One supporting image

---

SECTION 2

What We Do

Satellite Monitoring

Ecological Intelligence

Environmental Assessment

Change Detection

Restoration Monitoring

Audit-ready Reports

Cards

Minimal

White

Rounded

Soft shadows

---

SECTION 3

How It Works

Acquire

↓

Analyze

↓

Verify

↓

Deliver

Simple horizontal timeline.

No diagrams.

---

SECTION 4

Environmental Intelligence

Display

NDVI

NDWI

Land Cover

Thermal

Historical Change

Very clean.

No dashboards.

---

SECTION 5

Report Preview

Large report mockups.

Use actual NEVARA reports.

Do NOT fake reports.

Scrolling report gallery.

---

SECTION 6

Projects

Large image cards.

Current projects.

Bommasandra

Jonnahalli

Doddathoguru

etc.

Each card

Location

Partner

Assessment Type

View Report

---

SECTION 7

Partners

Twin Glacier

SayTrees

Jalposhan

Minimal logos.

Lots of whitespace.

---

SECTION 8

Contact

Simple.

Elegant.

Assessment Request.

No long forms.

---

# NAVIGATION

Transparent

Glass

Blur

Sticky

Minimal

Logo left.

Links center.

CTA right.

---

# TYPOGRAPHY

Primary

Cormorant Garamond

Secondary

Inter

Headlines

Very large.

Bold.

Editorial.

Body

Readable.

Comfortable.

---

# COLOR SYSTEM

Background

Warm White

Forest Green

Stone

Deep Charcoal

Accent

Muted Emerald

No bright colors.

---

# ANIMATION RULES

Everything should feel expensive.

Maximum duration

0.8s

Ease

power2.out

Never bounce.

Never elastic.

Never flashy.

---

# SCROLL EXPERIENCE

Apple style.

No snapping.

No sudden jumps.

Scroll should feel like floating.

---

# PERFORMANCE

Lazy load everything below hero.

Preload frame sequence.

Canvas rendering optimized.

Target

60 FPS

---

# MOBILE

Maintain cinematic feel.

Reduce frame count if necessary.

Disable expensive effects.

Never hide important content.

---

# ACCESSIBILITY

Semantic HTML

Keyboard navigation

ARIA labels

Contrast AA

---

# SEO

Title

NEVARA — Environmental Intelligence

Meta

Environmental monitoring using satellite intelligence and AI.

OpenGraph

Twitter Cards

Structured Data

Organization schema

---

# FILE STRUCTURE

src/

components/

Hero/

CanvasSequence/

Navbar/

Sections/

Footer/

layouts/

pages/

styles/

public/

assets/

sequence/

reports/

images/

---

# IMPORTANT RULES

DO NOT redesign the visual identity.

DO NOT invent random sections.

DO NOT add SaaS dashboards.

DO NOT add fake metrics.

DO NOT add unnecessary gradients.

DO NOT use stock illustrations.

DO NOT make it look like a startup template.

---

# OLD WEBSITE

There is an existing HTML file.

Treat it ONLY as a content reference.

Ignore its layout.

Ignore its CSS.

Ignore its structure.

Extract only useful wording if required.

Everything else should be rebuilt from scratch.

---

# DEVELOPMENT ORDER

Phase 1

Project setup

↓

Phase 2

Hero

↓

Phase 3

Scroll animation

↓

Phase 4

Content sections

↓

Phase 5

Responsiveness

↓

Phase 6

Performance

↓

Phase 7

Polish

Never skip this order.

---

# FINAL GOAL

When a visitor reaches the end of the website they should not think:

"This is a nice website."

They should think:

"This company understands the Earth."

That emotional response is the definition of success.
