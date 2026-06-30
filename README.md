# TravelX

A travel guide aur tracker.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages Deployment

This project is deployed to GitHub Pages using the workflow:
- `.github/workflows/deploy.yml`

It builds the app and publishes `TravelX/dist` to the `gh-pages` branch.

### Steps
1. Push your code to GitHub (e.g., to the `main` branch).
2. GitHub Actions will run automatically and deploy to `gh-pages`.
3. Enable Pages in GitHub repo settings (Settings → Pages):
   - Source: **GitHub Actions**
   - Branch: `gh-pages`

After deployment, your site URL will appear in the Pages section.

<!-- redeploy 2026-06-21 02:21:11 -->
