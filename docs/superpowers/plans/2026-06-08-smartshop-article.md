# SmartShop Product Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a detailed PM-journey product article for SmartShop at `content/products/smartshop.mdx`, with 5 custom diagrams, covering ideation → discovery → build → deployment.

**Architecture:** Two-file change: add new CSS diagram classes to `app/globals.css` (retailer-groups grid + affiliate-network grid), then write the full MDX article that uses both new and existing diagram CSS. No changes to lib, routes, or nav — the existing products pipeline picks up the new MDX file automatically.

**Tech Stack:** MDX (gray-matter frontmatter), CSS custom classes in globals.css, HTML divs with className, inline styles for colour accents.

---

## Files Modified

| File | Change |
|---|---|
| `app/globals.css` | Add `.retailer-groups`, `.retailer-group`, `.retailer-group-*`, `.affiliate-network`, `.affiliate-card`, `.affiliate-*` CSS |
| `content/products/smartshop.mdx` | **Create** — full article |

---

## Source Material Summary (from codebase exploration)

**Product:** SmartShop — AI-powered price comparison for Australian shoppers. Three specialized AI agents scan 17 retailers in parallel using Groq's llama-3.3-70b model and return merged, sorted results in <5 seconds.

**Docs:**
- `docs/PRD.md` — User personas (casual shopper, research buyer, deal hunter, gift buyer), goals, non-goals, P0 requirements, success metrics, v2/v3 roadmap
- `docs/SPECS.md` — Full API schema, agent configs, retailer library, merge logic, known limitations
- `docs/WORKFLOW.md` — Ideation → discovery → build → deploy journey, key decisions made

**Key facts for article:**
- Problem: Manual price checking across 17 AU retailers takes 30+ minutes
- 3 agents (Electronics Specialists · Online & General · Brand & Specialty) fire in parallel via `Promise.allSettled()`
- Groq llama-3.3-70b chosen over Claude for sub-second inference on free tier
- 1 LLM call → 3–5 results; 3 agents → up to 15 results
- LLM-generated URLs hallucinate → fixed with server-side retailer lookup table (`retailers.ts`)
- `new Groq()` must be inside the handler, not module scope (build-time error)
- Framer Motion staggered agent cards: 80ms / 320ms / 560ms
- v1: no monetization; v2: Commission Factory + Amazon Associates AU + Rakuten Advertising
- No caching (every search = 3 Groq API calls) — deliberate for v1 simplicity
- Vercel deploy: ~15s build, 1 static route + 1 serverless function

---

## Article Structure

### Frontmatter
```mdx
---
title: "SmartShop"
tagline: "Three AI agents. Seventeen retailers. The best price in under five seconds."
description: "How I built an AI price comparison engine for Australian shoppers — covering the full PM journey from the fake-search problem to a parallel multi-agent architecture deployed on Vercel."
status: "Live"
tags: ["Next.js", "Groq AI", "Multi-Agent", "React", "Vercel"]
date: "2026-06-08"
link: "https://smartshop-reachmayankagarwal.vercel.app/"
---
```

### Section Outline

1. **Opening hook** — The Australian price comparison problem; 17 retailers, 30+ minutes of manual checking vs. <5 seconds
2. **The Problem (Discovery)** — existing tools fail; Google Shopping is generic; price.com.au is slow/dated; no tool built for AU's specific retail mix
3. **The Fake-Search Problem** — original codebase had a 1.5s fake timer + 2 hardcoded products → the first thing that had to go
4. **User Personas** — 4 types from PRD: Casual Shopper, Research Buyer, Deal Hunter, Gift Buyer
5. **Three Key Insights** — (a) LLMs know retail prices well enough for comparison; (b) 3 parallel agents > 1 agent for coverage + transparency; (c) server-side URL lookup, not LLM-generated URLs
6. **Defining the MVP** — goals table, non-goals, P0 requirements
7. **Architecture: 3-Agent Pipeline** → **Diagram 2: Pipeline**
8. **Retailer Coverage** → **Diagram 3: Retailer Groups** (17 retailers across 3 agents)
9. **Tech Stack Decisions** — table with chosen/rejected/reason
10. **The Build** — 5 implementation phases: infra → API → retailer lib → UI → polish
11. **Request Lifecycle** → **Diagram 4: Journey Flow** (query → agents → merge → results)
12. **Before vs. After** → **Diagram 1: Cost Split** (manual vs SmartShop)
13. **Deployment** — `vercel deploy --prod`, gotchas (Groq inside handler, GROQ_API_KEY env var)
14. **V2 Monetization Plan** → **Diagram 5: Affiliate Network** (Commission Factory / Amazon Associates / Rakuten)
15. **Learnings** — 4 key takeaways
16. **What's Next** — v2 (affiliate), v3 (price history, alerts, wishlists)

---

## Diagram Designs

### Diagram 1: Before vs. After (`.cost-split` — existing CSS)
```
[ Manual Price Checking ]  vs  [ SmartShop ]
30+ minutes                    <5 seconds
3–4 retailers checked          17 retailers checked
Prices may be outdated         AI-synthesised best estimate
Tiring & error-prone           One search, ranked results
```

### Diagram 2: 3-Agent Pipeline (`.pipeline` — existing CSS)
```
Phase 1 ⚡ Parallel:
  🔌 Electronics Specialists  |  📦 Online & General  |  🏪 Brand & Specialty
         ↓ all 3 resolve via Promise.allSettled()
Phase 2 Sequential:
  🔀 Merge Agent Results → Sort by Price → Mark best: true → Enrich URLs
         ↓
🎯 Output: Ranked deals table, <5s total
```

### Diagram 3: Retailer Coverage (NEW CSS `.retailer-groups`)
3-column grid, one column per agent:
- **Electronics Specialists**: JB Hi-Fi, Harvey Norman, The Good Guys, Bing Lee, Officeworks
- **Online & General Retailers**: Amazon AU, Kmart, Big W, Target Australia
- **Brand & Specialty Stores**: Apple Store AU, Samsung AU, Sony Store AU, Myer, David Jones

### Diagram 4: Request Lifecycle (`.journey-flow` — existing CSS)
5 steps: User Submits → 3 Agents Fire → Groq Processes → Merge & Sort → Results Rendered

### Diagram 5: Affiliate Network (NEW CSS `.affiliate-network`)
3-column grid:
- **Commission Factory** (blue): JB Hi-Fi, Harvey Norman, The Good Guys, Bing Lee, Kmart, Big W, Officeworks, Target AU
- **Amazon Associates AU** (orange): Amazon AU
- **Rakuten Advertising** (purple): Myer, David Jones

---

## New CSS to Add to `app/globals.css`

### `.retailer-groups`
3-column grid, 1-col on mobile. Each `.retailer-group` card has a header (icon + name + badge), and a `.retailer-list` ul showing retailer names as bullet points.

Colour badges:
- `.retailer-group-badge.electronics` → blue (#dbeafe / #1e40af)
- `.retailer-group-badge.online` → green (#d1fae5 / #065f46)
- `.retailer-group-badge.brand` → pink (#fce7f3 / #9d174d)

### `.affiliate-network`
3-column grid, 1-col on mobile. Each `.affiliate-card` has a coloured top border:
- `.affiliate-card.commission` → blue border (#60a5fa)
- `.affiliate-card.amazon` → orange border (#f97316)
- `.affiliate-card.rakuten` → purple border (#a78bfa)

Each card shows: network name, retailer list, estimated commission range.

---

## Task 1: Add CSS for New Diagram Components

**Files:**
- Modify: `C:\Users\reach\workspace\Tech Blogs\app\globals.css`

- [ ] **Step 1: Append new CSS at end of globals.css**

Append after the existing diagram CSS (after the last `@media` block for providers):

```css
/* ─── Retailer Groups diagram ─── */
.retailer-groups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 28px 0;
}
.retailer-group {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #fafafa;
}
.retailer-group-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.retailer-group-icon {
  font-size: 22px;
  line-height: 1;
}
.retailer-group-name {
  font-weight: 700;
  font-size: 13px;
  color: var(--ink);
  line-height: 1.3;
}
.retailer-group-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: fit-content;
}
.retailer-group-badge.electronics { background: #dbeafe; color: #1e40af; }
.retailer-group-badge.online      { background: #d1fae5; color: #065f46; }
.retailer-group-badge.brand       { background: #fce7f3; color: #9d174d; }
.retailer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.retailer-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  font-size: 13px;
  color: var(--ink-muted);
  border-bottom: 1px solid #f3f4f6;
}
.retailer-list li:last-child { border-bottom: none; }
.retailer-list li::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.retailer-group-badge.electronics ~ .retailer-list li::before { background: #60a5fa; }
.retailer-group-badge.online ~ .retailer-list li::before      { background: #34d399; }
.retailer-group-badge.brand ~ .retailer-list li::before       { background: #f472b6; }

/* ─── Affiliate Network diagram ─── */
.affiliate-network {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 28px 0;
}
.affiliate-card {
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.affiliate-card.commission { border-color: #60a5fa; }
.affiliate-card.amazon     { border-color: #f97316; }
.affiliate-card.rakuten    { border-color: #a78bfa; }
.affiliate-network-name {
  font-weight: 700;
  font-size: 14px;
  color: var(--ink);
}
.affiliate-network-retailers {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.affiliate-network-retailers li {
  font-size: 12px;
  color: var(--ink-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}
.affiliate-network-retailers li::before {
  content: '→';
  font-size: 10px;
  color: #9ca3af;
}
.affiliate-commission-note {
  margin-top: auto;
  padding: 8px 10px;
  background: #f9fafb;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  text-align: center;
}
@media (max-width: 640px) {
  .retailer-groups   { grid-template-columns: 1fr; }
  .affiliate-network { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Verify globals.css compiles — run build**

```bash
cd "C:\Users\reach\workspace\Tech Blogs"
npm run build 2>&1 | tail -20
```
Expected: No CSS errors. Build may warn about unresolved MDX files — that's fine.

---

## Task 2: Write the SmartShop MDX Article

**Files:**
- Create: `C:\Users\reach\workspace\Tech Blogs\content\products\smartshop.mdx`

- [ ] **Step 1: Write the complete MDX file**

Full content in the task below (see Article Content section).

- [ ] **Step 2: Run build and verify route**

```bash
cd "C:\Users\reach\workspace\Tech Blogs"
npm run build 2>&1 | grep -E "(smartshop|error|Error)"
```
Expected: `/products/smartshop` appears as a generated static route. No errors.

- [ ] **Step 3: Commit**

```bash
cd "C:\Users\reach\workspace\Tech Blogs"
git add app/globals.css content/products/smartshop.mdx
git commit -m "feat: add SmartShop product article with 5 custom diagrams"
```

---

## Verification

1. `npm run build` — `/products/smartshop` appears as generated static route
2. Homepage shows SmartShop product card with "Live" badge and correct tags
3. Product detail page renders: Visit Product button, all 5 diagrams, tables styled, prose readable
4. All 5 diagrams are responsive (collapse to 1-col on mobile)
