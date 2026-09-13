# Buffalo Park Lodge — GitHub Pages edition

Full editable HTML, CSS, JavaScript and image assets from the approved preview, including the latest “Make an enquiry” CTA. No React, npm dependencies or paid services are required. Python 3.9+ builds portable URLs.

## Run locally on Windows

Open PowerShell in this extracted folder (the one containing build.py):

```powershell
py build.py
py -m http.server 8000 --directory dist
```

Open http://localhost:8000 . Keep the terminal open; Ctrl+C stops the server. If your Python command is `python`, use it instead of `py`.

On macOS/Linux use `python3`. Don't double-click index.html: serve the folder so navigation works correctly.

## Push to GitHub Pages

1. Create a new empty GitHub repository, for example `buffalo-lodge`. A public repository works with GitHub Free. Do not initialise it with a README if following these commands.
2. In this extracted folder, replace YOUR-USERNAME and YOUR-REPO below with the account/repository you actually created:

```powershell
git init
git add .
git commit -m "Add Buffalo Park Lodge website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

3. In the repository go to **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Go to **Actions → Deploy to GitHub Pages → Run workflow → main**. If the initial run failed because Pages wasn't enabled yet, rerun it now.
5. Open the URL shown by the successful deployment. Usually it is `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

Every later push to main rebuilds and deploys automatically. No `gh-pages` branch or manual base-path edits are needed. The workflow reads the actual Pages base URL and updates navigation, images, canonical URLs, social metadata and sitemap during the build. It also supports account-root sites and custom domains configured in Pages.

Official workflow guide: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Edit the site

- `src/index.html`: homepage content.
- `src/style.css`: visual design and mobile layouts.
- `src/app.js`: navigation, cookie choices, form validation and email preparation.
- `src/enquire/index.html`: enquiry page.
- `src/privacy/index.html`, `src/terms/index.html`: policy drafts.
- `src/config.js`: optional lodge-owned GA4 measurement ID (currently empty).
- `src/assets/`: compressed property photographs.
- `src/og.png`: social preview image.
- `src/404.html`: real custom 404 page.
- `src/sitemap.xml`, `src/robots.txt`, `src/llms.txt`: discovery files.
- `build.py`: URL replacement and local link checks.

Keep `__SITE_URL__` placeholders in source metadata. The builder replaces them. Edit source files, then rerun `py build.py`; changes made only in dist will be overwritten. Header/footer markup is present in every HTML page, so apply shared changes across those pages.

To test a specific deployment build locally:

```powershell
py build.py --url https://YOUR-USERNAME.github.io/YOUR-REPO
```

This produces files configured for that remote path. Run `py build.py` again before the normal localhost preview.

## Current functionality and launch limitations

- Form prepares an email in the visitor's email app; the visitor sends it. It does not send mail on a server, take payment, reserve rooms or confirm bookings.
- Honeypot and cooldown are browser-only deterrents. A future direct form endpoint needs its own server validation, rate limits and verified anti-bot challenge. GitHub Pages cannot run that backend.
- Analytics is disabled until you configure a property and update the privacy notice. Consent controls are implemented.
- Privacy and terms are clearly labelled drafts pending business details and approval.
- This export includes the approved preview and CTA change. The separately researched off-site catering and self-catering services have not yet been added as dedicated sections/options.
- GitHub Pages ignores Cloudflare `_headers` files, so none is shipped. Enable **Enforce HTTPS** in Pages settings where available. Custom security response headers require a proxy/other host; this export does not claim they are applied.
- On a project site, `robots.txt` is served under the repository path; crawlers generally use the hostname-root robots.txt. Submit the generated sitemap through your verified Search Console property; use a custom domain for independent root robots control.
- Check real page speed, image rights, current business details and final policies before client launch. Nothing in the ZIP connects or changes the lodge's current domain.

See LAUNCH-NOTES.md for original business/content checks. The build commands, folder structure and URL configuration in this README supersede the original hosting-specific instructions in those notes.
