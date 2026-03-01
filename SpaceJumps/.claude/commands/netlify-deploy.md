---
description: Build and deploy the current project to Netlify (production)
allowed-tools: Bash
---

# Netlify Deploy Skill

## What this does
Builds the project and deploys it to Netlify production. Works for any Vite/React project with a `dist/` output folder.

## Step-by-Step Instructions

When triggered, execute the following steps **in order**. Report results after each step.

### Step 1 — Check Netlify CLI
```bash
netlify --version
```
- If command not found: run `npm install -g netlify-cli` and confirm installation before continuing.

### Step 2 — Build the project
```bash
npm run build
```
- If the build fails, **stop here** and report the error message to the user. Do not attempt deployment.
- If successful, confirm: "✓ Build complete — dist/ is ready."

### Step 3 — Deploy to production
```bash
netlify deploy --prod --dir=dist
```
- If the project is **not linked** to a Netlify site yet, the CLI will prompt interactively:
  - Select **"Create & configure a new project"**
  - Accept the default site name or enter a custom one
- If already linked (site is configured), deployment runs automatically.

### Step 4 — Report the URL
After deployment completes, extract and display:
- **Production URL** (e.g. `https://your-site-name.netlify.app`)
- Confirm the deploy is live.

## Notes
- The `dist/` folder must exist (Step 2 creates it).
- No source code is uploaded — only the pre-built static files in `dist/`.
- To update an already-deployed site, simply trigger this skill again.
- If `netlify login` is needed (first time on a machine), the CLI will open the browser automatically.
