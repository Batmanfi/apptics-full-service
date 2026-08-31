# Apptics — Full-Service Revenue Retention

A responsive, static landing page built from the finalized Apptics Paper design. Plain HTML, CSS, and JavaScript; no framework, dependencies, or build step are required to serve it.

## Local preview

```sh
python3 -m http.server 4173
```

Open http://localhost:4173.

All section containers use a common 1200px desktop maximum, while individual introductory paragraphs can keep a narrower reading measure. All bullet lists use small disc markers, hanging indents, and 14px between items. H1/H2 headings use 48px on desktop and 28px on mobile, with no underlines.

See [TYPOGRAPHY.md](TYPOGRAPHY.md) for every desktop and mobile heading, body, label, and button size, including line heights.

On phones (600px and below), the hero uses 20px side padding, 24px top padding, a 24px-high logo box, and 12px between copy blocks. The audit button appears after the WITHOUT line and before the longer supporting paragraph so it remains visible in compact phone viewports. Desktop order is unchanged.

## Files

- `index.html`: page content, accessible links, native FAQ disclosures (closed by default), and testimonial player.
- `design.css`: typography, colors, gradients, and desktop styling exported from Paper.
- `styles.css`: responsive layout rules and interactive states.
- `script.js`: progressive enhancement for the testimonial player.
- `assets/`: Apptics logos, icons, photos, bundled video, and self-hosted Geist fonts.

The services section uses two equal columns on desktop/tablet and one column at 600px and below. Layouts have been checked at 320, 375, 390, 600, 768, 1024, 1440, and 1920px. The original copy was compared with all 12 sections of the source design; the fit, services, guarantee, and closing copy were subsequently updated from the supplied final copy.

Audit buttons point to the existing Apptics demo page. Footer links use existing Apptics destinations. FAQs work without JavaScript, and video falls back to native controls.

## Deployment

GitHub Pages serves the files directly from the root of `main`. Push changes to `main` to update the live site. `.nojekyll` disables Jekyll processing.

## Design and assets

Source: Apptics Paper file, “Apptics — Full-Service Landing Page,” as edited on August 31, 2026. Apptics copy and brand assets remain the property of their respective owners. Geist and Geist Mono are distributed under the SIL Open Font License; notices are included in `assets/`.
