# GitHub Pages Deployment TODO for LutristaBox

**Pending:**
- [ ] Install gh-pages dependency (`pnpm add -D gh-pages`)
- [ ] Update vite.config.ts with base '/LutristaBox/' and preview config
- [ ] Update package.json scripts (build, preview, predeploy, deploy)
- [ ] Update .gitignore for dist
- [ ] Commit changes to current branch
- [ ] Run `pnpm run deploy` to push dist to gh-pages branch

**Next Manual Steps in GitHub (https://github.com/agstudio98/LutristaBox):**
1. Settings > Pages
2. Source: "Deploy from a branch" → Branch: gh-pages → / (root)
3. Save. Live at https://agstudio98.github.io/LutristaBox/

**Test:** `pnpm run build && pnpm run preview`

