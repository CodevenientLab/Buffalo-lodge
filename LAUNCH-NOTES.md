# Business launch checks

## Required before the lodge's public launch
1. Confirm permission to reuse property images and all business details. Sources: https://www.buffalolodge.co.za/ and its Accommodation page. Do not imply the old 640px courtyard image is high-resolution; obtain current original photos for a sharper hero. Published room count and conference capacity require owner confirmation. Do not invent ratings, reviews, prices or facilities.
2. Connect a lodge-owned analytics property. Set ga4MeasurementId in src/config.js only after updating privacy wording for actual provider, retention and transfers. Disable GA4 enhanced-measurement form interactions and ensure no PII enters page URLs or custom events. Verify consent-denied network behaviour and enquiry_click, enquiry_prepared, phone_click and directions_click events in the property's DebugView. enquiry_prepared is not a booking conversion.
3. For direct website form delivery, connect an authenticated server-side email service owned by the lodge. Add server-side field validation, per-IP rate limits and verified Turnstile before exposing that endpoint. Current browser-only honeypot/cooldown is limited deterrence; it is not robust server spam protection. There is currently no publicly callable form submission endpoint.
4. Lodge owner/legal review must finalize legal entity, Information Officer, retention, processors, deposits, cancellations, refunds and arrival policies. Existing reservation PDF was not retrievable; no terms were fabricated. Primary privacy reference: https://inforegulator.org.za/popia/ and https://inforegulator.org.za/complaints/ .
5. Configure any custom domain in GitHub Pages settings and rebuild through the included workflow. Enable Enforce HTTPS. Domain account access is needed; the existing business domain has not been changed.
6. Add 301 mappings from original Joomla URLs (by option/id/Itemid) to equivalent new pages. Do not drop old URL rankings during migration. Search Console property verification and sitemap submission require owner access.
7. Run mobile Lighthouse/PageSpeed on the public final domain, check Core Web Vitals and test the final host's 404 status and headers. This preview received local structural, link/asset and JS checks; no Lighthouse score or real-user speed result is claimed.


## Source assets
- Courtyard: https://www.buffalolodge.co.za/images/front_page/lodge_2.jpg
- Conference: https://www.buffalolodge.co.za/images/images/conference_room.jpg
- Social preview: original generated typographic brand artwork.
