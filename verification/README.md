# Verification — October 10, 2026

Built and checked the production `dist/` output in Chrome against the current Paper desktop and mobile artboards. The screenshots in this directory use 1440px and 390px viewports. Chrome's desktop scrollbar occupies 15px of the screenshot content area.

- `npm run build` and `npm run check`: passed.
- Both routes checked at 320, 375, 390, 768, 1024 and 1440px: no horizontal content overflow or broken loaded images. Measurements are in `responsive-checks.json`.
- Paper section order, copy, typography, image crops and computed styles compared with desktop/mobile exports and screenshots. Payments section heights match the reference at 1440px and 390px, including the 947px/1335px FAQ sections. Narrower layouts grow naturally around wrapped text.
- Payments mobile: all conversion CTAs fill the available width; comparison retains feature, Apptics, Stripe and Others columns, with Apptics blue.
- Qualification: required-answer validation checked. Main qualified flow completed with synthetic `Apptics QA Test` / `qa-paper-design@example.com` / `https://example.com` data, reaching the existing Cal.com booking page. No appointment was booked. Payments' non-ecommerce submission reached `/dq/` successfully.
- Modal: Escape closes it, restores the invoking button's focus, and removes page inertness. Keyboard focus remains visible; the existing Tab trap is retained.
- FAQ: seven native accordions; first open on load; Enter opens and Space closes the selected question. Answers expand without a fixed clipping height.
- Video: all three existing Wistia IDs load embedded players; playback and controls verified in the browser.
- `/dq/` and `/confirmation/` render correctly. Their FAQ footer destinations now point to `/payments/#faq`.
- Contact, AUP, Terms and Privacy destinations returned HTTP 200. Social destinations remain the existing URLs. Meta Pixel, Clarity, attribution, submission integration and Vercel Analytics are retained.

No unresolved implementation issue was found. Deployment is handled by the repository's existing Vercel integration after the main-branch push.
