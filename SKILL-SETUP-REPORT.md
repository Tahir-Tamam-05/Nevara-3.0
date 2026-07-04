# NEVARA — Skill Setup Report
Generated: 2026-06-11

## Verification Summary

All three skills researched, sourced, and installed. No project files modified. No package.json exists (NEVARA is a plain HTML project — none needed).

---

## Skills Installed

### 1. `emil-design-eng` — Emil Kowalski's Design Engineering Skill
- **Source**: https://github.com/emilkowalski/skill (verified, 77k installs, MIT)
- **Author**: Emil Kowalski (creator of Sonner, Vaul — 13M+ weekly npm downloads)
- **Installed at**: `.claude/skills/emil-design-eng/SKILL.md`
- **What it does**: Encodes Emil's philosophy on UI polish and animation. Provides a framework for deciding *when* to animate, *what easing* to use, and *how fast*. Enforces a review table format (Before/After/Why) for auditing UI code.
- **Key rules**: UI animations < 300ms, never animate from scale(0), never ease-in, custom cubic-bezier curves, CSS transitions over keyframes for interruptible UI, only animate `transform` + `opacity`.
- **NEVARA applicability**: HIGH. NEVARA already uses CSS transitions and custom easing. Emil's rules directly improve the `.rv` reveal animations, nav transitions, button `:active` states, and scroll behaviors.
- **Limitations**: No React/framework dependency. Works with any HTML/CSS/JS stack. Fully compatible.

### 2. `design-taste-frontend` — Taste-Skill Anti-Slop Framework
- **Source**: https://github.com/Leonxlnx/taste-skill (verified, 31.8k stars, MIT)
- **Author**: Leonxlnx (active, sponsored, issues/PRs open)
- **Installed at**: `.claude/skills/design-taste-frontend/SKILL.md`
- **What it does**: Three adjustable dials (DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 4) that override LLM's statistical biases toward generic UI patterns. Bans AI slop tells: centered heroes, 3-column card layouts, Inter font, pure black, neon glows, generic placeholder names.
- **NEVARA applicability**: MEDIUM-HIGH. Design philosophy applies fully to the HTML file. Typography and color rules are framework-agnostic. Code examples reference React/Tailwind but the *principles* map to NEVARA's vanilla CSS. Use for design critique and improvement direction.
- **Limitations**: Code examples assume React/Tailwind. For NEVARA (plain HTML), apply the conceptual rules; ignore framework-specific syntax. DESIGN_VARIANCE at 8 implies asymmetric layouts — already present in NEVARA.

### 3. `impeccable` — Design Vocabulary for AI Agents
- **Source**: https://github.com/pbakaus/impeccable (verified, 34k stars, Apache 2.0, npm package)
- **Author**: Paul Bakaus (ex-Google, creator of impeccable.style)
- **Installed at**: `.claude/skills/impeccable/SKILL.md`
- **What it does**: Gives AI a designer's vocabulary. OKLCH color system, 4pt spacing scale, semantic tokens, typography pairing methodology. Absolute bans on the two most egregious AI design tells: side-stripe borders and gradient text. Font reject list prevents monoculture. AI Slop Test forces a quality bar question.
- **NEVARA applicability**: HIGH. Directly applicable to NEVARA's plain CSS. OKLCH colors (NEVARA uses `rgba`/hex — candidate for upgrade). Font selection methodology flags that NEVARA uses `Newsreader` (on the reject list) and `Instrument Sans` (also on the reject list). Worth reviewing.
- **Limitations**: `/impeccable craft|teach|extract` commands are Claude Code CLI slash commands, not Cowork slash commands. Use by explicitly invoking: "apply the impeccable skill to review X."

---

## Installation Location

```
Nevara-3.0/
├── nevara (2).html          ← the previous project
├── CLAUDE.md                ← (empty, for Claude Code context)
├── SKILL-SETUP-REPORT.md    ← this file
└── .claude/
    └── skills/
        ├── emil-design-eng/
        │   └── SKILL.md     ← 6,738 bytes ✓
        ├── design-taste-frontend/
        │   └── SKILL.md     ← 5,489 bytes ✓
        └── impeccable/
            └── SKILL.md     ← 3,838 bytes ✓
```

---

## How Skills Are Loaded in Future Sessions

**Claude Code CLI**: When you open the `Nevara-3.0` folder in Claude Code CLI, all three SKILL.md files are auto-loaded from `.claude/skills/`. No further setup needed.

**Cowork (this tool)**: Skills in `.claude/skills/` are NOT auto-loaded in Cowork sessions. However, since all three skills have been read and are in Claude's active context this session, they are fully active right now. In future Cowork sessions, explicitly ask: "apply the impeccable/taste-skill/emil-design-eng skill when working on the landing page."

**Alternative for npx fans** (run yourself in Terminal):
```bash
cd ~/Desktop/Nevara-3.0
npx skills add emilkowalski/skill        # re-fetches latest from GitHub
npx impeccable skills install            # installs Impeccable CLI build
npx skills add Leonxlnx/taste-skill      # re-fetches latest taste-skill
```

---

## Package.json & Lock File Health

NEVARA has no `package.json` or lock file — it is a self-contained HTML file. **Zero risk of dependency breakage.** The skills are pure markdown instruction files; they do not modify the project's runtime code in any way.

---

## NEVARA-Specific Findings (Pre-Improvement Notes)

Running the impeccable + taste-skill lenses on NEVARA's current HTML:

| Finding | Skill | Severity | Notes |
|---|---|---|---|
| `Instrument Sans` font used | impeccable | Medium | On the monoculture reject list. Consider pairing with something more distinctive. |
| `Newsreader` font used | impeccable | Medium | On the monoculture reject list. Serif is acceptable for ecological/editorial tone but could be more distinctive. |
| `transition: opacity .9s` on `.rv` elements | Emil | Low | 900ms is above the 300ms UI guideline. Intentional for page load feel — acceptable as a "rare/first-time" event. |
| No `:active` scale on buttons/CTAs | Emil | Medium | Add `transform: scale(0.97)` on `:active` for tactile feedback. |
| `rgba` colors instead of `oklch` | impeccable | Low | OKLCH would improve perceptual consistency. Not blocking — current palette is well-considered. |
| Centered hero section | taste-skill | Low | DESIGN_VARIANCE 8 would push toward asymmetric. Current centered hero is consistent with ecological/calm brand tone. |

---

## Recommendation for Landing Page Work

Best order of operations:
1. **Run Emil audit first**: Ask "use the emil-design-eng skill to audit the animations in nevara.html"
2. **Run impeccable teach**: Ask "/impeccable teach" to capture NEVARA's design context before any changes
3. **Apply taste-skill critique**: Ask "using the design-taste-frontend skill, review the typography and layout choices in nevara.html"
4. Only then: make targeted improvements grounded in the skill frameworks

---

## Caveats

- `taste-skill` and parts of `impeccable` assume React/Tailwind for code examples. For NEVARA (plain HTML/CSS), Claude will translate principles to vanilla CSS equivalents.
- `npx impeccable skills install` installs a compiled build with 23 slash commands for Claude Code CLI. These slash commands (`/impeccable polish`, `/impeccable typeset`, etc.) only work in Claude Code CLI, not Cowork.
- Skills are pinned to the content fetched on 2026-06-11. To get latest, re-run the npx commands above.
