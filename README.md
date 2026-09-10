# Apptics — Full-Service Revenue Retention

Static landing page matching the Framer source of truth at `https://fun-product-779362.framer.app/`. Plain HTML and CSS, with a compiled React bundle only for the qualification form.

## Local preview

```sh
python3 -m http.server 4173
```

Open http://localhost:4173.

To install dependencies and create the production-ready static build:

```sh
npm ci
npm run build
```

The build recreates `dist/`, including the compiled form bundle and every static route required by Vercel.

## Files

- `index.html`: landing page
- `dq/index.html` and `confirmation/index.html`: auxiliary routes
- `design.css` / `styles.css`: tokens, layout, and Framer breakpoints
- `script.js`: testimonial player and form overlay (open/close, focus, history)
- `src/AppticsForm.tsx`: canonical six-step form
- `src/form-entry.tsx`: lazy React mount adapter with deployment-relative routing
- `assets/`: logos, icons, photos, video, Geist fonts, compiled form bundle

Audit CTAs open the in-page qualification form. They do not link to `apptics.ai/demo`. FAQ 1 is open on load. Footer is the simplified Framer set (logo, social, Help, legal, Meta disclaimer).

## Deployment

GitHub remains the source repository. Vercel builds and serves the generated `dist/` directory using `vercel.json`. Once the repository is connected to Vercel, pushes to `main` create production deployments automatically.

```sh
npm ci
npm run build
```

The `/dq/` and `/confirmation/` directory indexes work on the Vercel production domain and preview deployments.

## Design

Framer is authoritative for copy, styling, and form behavior. Known source strings such as `youll` and `his site` are preserved.
