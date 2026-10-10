# Apptics landing pages

Static HTML and responsive CSS, with a lazy-loaded React bundle for the existing seven-step qualification form. The finalized Paper designs provide the baseline; the approved October 10 browser review refines typography, widths, spacing, hero crops and qualification copy:

- `/`: [CRM Landing Page — Phoenix Reference](https://app.paper.design/file/01M0Z60996QY1ASVAG1HFDXGKT/p-G-0), desktop and mobile.
- `/payments/`: [Page.Payments.Desktop and Page.Payments.Mobile](https://app.paper.design/file/01M0Z60996QY1ASVAG1HFDXGKT/p-J-0). The scratch Mask group and archived payments exports are excluded.

## Build and preview

```sh
npm ci
npm run build
npm run check
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. The build recreates `dist/`, including the form and analytics bundles, local assets and all four routes. The build minifies the landing styles using the existing esbuild dependency. Shared mobile typography lives in `assets/landing/tokens.css`; desktop sections are capped at 1100px with the reviewed compact scale. Vercel serves `dist/`; pushes to `main` trigger the connected production deployment.

## Structure

- `index.html` and `payments/index.html`: semantic page markup, one responsive DOM per route.
- `landing.css`: shared components and desktop/mobile layout rules.
- `assets/landing/tokens.css`: current Paper tokens; `assets/landing/`: original production images and illustrations.
- `script.js`: qualification modal, keyboard/focus/history behavior and click-to-play Wistia players.
- `src/AppticsForm.tsx`: existing qualification, submission, attribution and booking integrations.
- `src/form-entry.tsx`: lazy form mount and root-relative disqualification route.
- `dq/` and `confirmation/`: existing auxiliary routes, retaining their original styles.
- `verification/`: desktop/mobile screenshots, responsive measurements and verification notes.

All conversion CTAs open the existing form. Qualified submissions go to the existing Cal.com audit booking page; disqualified visitors go to `/dq/`. Meta Pixel, Clarity and Vercel Analytics remain in place. Payments FAQs use native keyboard-accessible details/summary accordions; the first is open initially.
