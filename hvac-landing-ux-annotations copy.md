# HVAC Landing Page — UX Improvement Annotations

**File:** `hvac-landing-page.jsx`
**Based on:** Figma node `9:10747` — All Products Landing Pages Redesign
**Approach:** Layout & UX improvements only — no visual redesign

---

## Summary of Changes

All changes are low-to-medium lift, A/B testable, and stay within the existing design system.

---

## 1. Hero Section — CTA Reorder

| | Original | Improved |
|---|---|---|
| Primary CTA | "Talk to an Expert for Free" | **"Find My System"** |
| Secondary CTA | "Find My System" | "Talk to an Expert — Free" |

**Why:** The guide-first principle means we want users to self-serve first. "Find My System" drives users into the decision funnel (higher CTR, lower drop-off). Expert CTA is still prominent as a secondary option — not removed.

**Expected impact:** Higher funnel entry rate; reduced immediate bounce to phone call.

---

## 2. Trust Bar — NEW (just below hero)

Added a lightweight horizontal bar showing: `4.8 Stars · 12,000+ Reviews | Free Expert Support | Trusted Since 2002 | Phone number`

**Why:** Trust signals placed immediately after the hero reduce perceived risk at the moment of first impression. Currently these are buried in the "Why Alpine" section 3+ sections down. Most users won't scroll that far if they bounce early.

**Expected impact:** Lower bounce rate, higher time-on-site, reduced perceived risk.

**Implementation lift:** Low — uses existing MUI Stack + Divider + Typography components.

---

## 3. Shopping Assistance → "Start Here" Reframe

| | Original | Improved |
|---|---|---|
| Heading | "Shopping Assistance" | **"Start Here — Find Your System"** |
| Subtext | "Start with System Selector if you're not sure…" | "Not sure which system you need? Start with the System Selector — it takes 2 minutes." |
| "System Selector" badge | None | **"Start Here" chip** on the System Selector card |

**Why:** "Shopping Assistance" is a neutral label — it doesn't tell users what to do. "Start Here" is directive and reduces cognitive load for first-time visitors. The 2-minute framing lowers commitment barrier.

**Expected impact:** Higher tool engagement rate; more users entering the guided flow.

---

## 4. Expert Fallback — Moved Up the Page

| | Original | Improved |
|---|---|---|
| Position | Bottom of page ("Still Not Sure?") | **Inline, below tools section** |
| Format | Standalone section with button | Two-line copy + text button |

**Why:** The current page buries the expert CTA at the very bottom. Most users who are confused will drop off before reaching it. Placing it directly under the tools makes it a visible safety net without requiring a scroll.

**Expected impact:** More expert consultation conversions; reduced drop-off for undecided users.

---

## 5. Category Cards — CTA Visibility

| | Original | Improved |
|---|---|---|
| "Browse" link | Small plain text (`Browse In Stock Systems →`) | **MUI text Button with endIcon** |
| Card height | Variable (image-driven) | **Consistent via flexbox** |

**Why:** The original "browse" link is 12px plain text — very low contrast and hard to tap on mobile. A proper Button component is larger, more accessible, and communicates affordance. Consistent card height improves scanability in grid layout.

**Expected impact:** Higher category CTR, better mobile tap rate.

---

## 6. Section Order Change

**Original order:**
1. Hero
2. Shopping Tools
3. Categories
4. Why Alpine (trust)
5. Marketing Content
6. Still Not Sure (expert CTA)
7. SEO Content

**Improved order:**
1. Hero
2. **Trust Bar** ← NEW, immediately after hero
3. Shopping Tools ("Start Here" + inline expert CTA)
4. Categories
5. Why Alpine (trust)
6. SEO Content

**Why:** The original page puts trust signals (Why Alpine) after the main conversion areas. Users who are uncertain will drop off before reaching that content. Moving trust signals earlier in the flow — and removing the standalone "Still Not Sure" section in favor of inline placement — reduces total scroll depth needed to reach key decision-support content.

**Expected impact:** Lower bounce rate, higher conversion rate for both guided (tool) and browse (category) paths.

---

## A/B Testing Recommendations

Each change is independently testable:

| Test | Variant A (Control) | Variant B (Test) | Primary Metric |
|---|---|---|---|
| Hero CTAs | "Talk to Expert" primary | "Find My System" primary | Tool start rate |
| Trust Bar | Hidden | Visible below hero | Bounce rate |
| Section label | "Shopping Assistance" | "Start Here" | Tool click rate |
| Expert CTA | Bottom of page | Inline with tools | Expert consultation rate |
| Browse CTA | Plain text link | MUI text button | Category CTR |

---

## Components Used (MUI)

`Box`, `Button`, `Card`, `CardContent`, `Chip`, `Container`, `Divider`, `Grid`, `Paper`, `Stack`, `Typography`

No new component types introduced. All patterns match existing Alpine design system.
