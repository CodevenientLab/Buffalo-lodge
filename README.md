# Buffalo Park Lodge

React + Vite redesign for GitHub Pages. It includes SEO metadata and structured data, privacy and terms pages, cookie preference controls, browser-side enquiry validation, spam honeypot, and a custom static 404 page.

## Local development

```powershell
npm install
npm run dev
```

Open the local URL Vite prints. Verify the production build with `npm run build`.

## Deploy to GitHub Pages

The repository is configured as the project site `https://codevenientlab.github.io/Buffalo-lodge/`. The Vite base path is `/Buffalo-lodge/`; the workflow deploys automatically whenever `main` receives a push.

```powershell
git add .
git commit -m "Convert Buffalo Lodge redesign to React and Vite"
git push origin main
```

In GitHub, open **Settings → Pages**, select **GitHub Actions** as the build source, then wait for **Deploy to GitHub Pages** in the Actions tab to succeed. Enable **Enforce HTTPS** in Pages when it becomes available.

## Before a public lodge launch

- Confirm business details, room/conference capacities, image rights and all policies with the lodge.
- Replace the preview privacy and terms wording with lodge-approved legal details, including the Information Officer and retention practices.
- The form opens an email draft; it does not submit data to a server or make a booking. A real endpoint needs server-side validation, rate limiting and verified anti-bot protection.
- Optional analytics has not been connected. Do not add a measurement ID without updating the privacy notice and consent implementation.
- If a custom domain is added, change `base` in `vite.config.js` to `/` and replace the GitHub Pages URLs in the canonical tags, sitemap and robots file before rebuilding.
