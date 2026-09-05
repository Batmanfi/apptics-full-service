# Apptics — Full-Service Revenue Retention

Static landing page matching the Framer source of truth at `https://fun-product-779362.framer.app/`. Plain HTML and CSS, with a compiled React bundle only for the qualification form.

## Local preview

```sh
python3 -m http.server 4173
```

Open http://localhost:4173.

To rebuild the form bundle after editing `src/AppticsForm.tsx`:

```sh
npm install
npm run build:form
```

The published GitHub Pages site is static. `assets/apptics-form.bundle.js` is committed so a direct-from-branch deploy works without a server build.

## Files

- `index.html`: landing page
- `dq/index.html` and `confirmation/index.html`: auxiliary routes
- `design.css` / `styles.css`: tokens, layout, and Framer breakpoints
- `script.js`: testimonial player and form overlay (open/close, focus, history)
- `src/AppticsForm.tsx`: canonical five-step form
- `src/form-entry.tsx`: React mount adapter (`disqualifiedUrl="/dq/"`)
- `assets/`: logos, icons, photos, video, Geist fonts, compiled form bundle

Audit CTAs open the in-page qualification form. They do not link to `apptics.ai/demo`. FAQ 1 is open on load. Footer is the simplified Framer set (logo, social, Help, legal, Meta disclaimer).

## Deployment

GitHub Pages serves files from the root of `main`. `.nojekyll` disables Jekyll processing. `/dq/` and `/confirmation/` are directory indexes.

## Design

Framer is authoritative for copy, styling, and form behavior. Known source strings such as `youll` and `his site` are preserved.
