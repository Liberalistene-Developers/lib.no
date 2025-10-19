# Dependency Update Strategy

**Last Updated:** 2025-10-19
**Current Status:** 0 vulnerabilities, 22 packages outdated

---

## Priority 1: Safe Updates (Patch/Minor) ✅

These can be updated immediately with low risk:

### Build Tools
```bash
npm update esbuild                    # 0.25.10 → 0.25.11 (patch)
npm update @eslint/js                 # 9.37.0 → 9.38.0 (minor)
npm update eslint                     # 9.37.0 → 9.38.0 (minor)
npm update typescript-eslint          # 8.46.0 → 8.46.1 (patch)
```

### Storybook
```bash
npm update @storybook/addon-docs      # 9.1.10 → 9.1.13 (patch)
npm update @storybook/addon-links     # 9.1.10 → 9.1.13 (patch)
npm update @storybook/react-webpack5  # 9.1.10 → 9.1.13 (patch)
npm update eslint-plugin-storybook    # 9.1.10 → 9.1.13 (patch)
npm update storybook                  # 9.1.10 → 9.1.13 (patch)
```

### Runtime Dependencies
```bash
npm update html-react-parser          # 5.2.6 → 5.2.7 (patch)
```

**Action:** Can be done in one batch
**Risk:** Very Low
**Testing:** Run `npm test` and `npm run check` after update

---

## Priority 2: Moderate Updates (Requires Testing) ⚠️

These are major version bumps but likely safe:

### Commitlint (17 → 20)
```bash
npm install --save-dev @commitlint/cli@^20.1.0
npm install --save-dev @commitlint/config-conventional@^20.0.0
```

**Risk:** Medium
**Breaking Changes:** Yes (17→18, 18→19, 19→20)
**Impact:** Commit message linting only
**Testing:** Test commit hooks with various commit messages
**Reference:** [Commitlint releases](https://github.com/conventional-changelog/commitlint/releases)

### Husky (8 → 9)
```bash
npm install --save-dev husky@^9.1.7
```

**Risk:** Medium
**Breaking Changes:** Yes
**Impact:** Git hooks installation
**Testing:** Test pre-commit hooks work correctly
**Reference:** [Husky v9 release](https://github.com/typicode/husky/releases/tag/v9.0.1)

### Semantic Release (24 → 25)
```bash
npm install --save-dev semantic-release@^25.0.0
```

**Risk:** Medium
**Breaking Changes:** Yes
**Impact:** Release automation only (doesn't affect development)
**Testing:** Test on feature branch first
**Reference:** [Semantic Release changelog](https://github.com/semantic-release/semantic-release/releases)

### webpack-cli (5 → 6)
```bash
npm install --save-dev webpack-cli@^6.0.1
```

**Risk:** Medium
**Breaking Changes:** Yes
**Impact:** Build process (Webpack commands)
**Testing:** Full build test: `npm run clean && npm run build:prod`
**Reference:** [webpack-cli v6 release](https://github.com/webpack/webpack-cli/releases)

---

## Priority 3: High Risk / Needs Investigation ⛔

### react-leaflet (4 → 5)
```bash
# DO NOT UPDATE YET
npm install react-leaflet@^5.0.0
```

**Risk:** High
**Breaking Changes:** Yes (major version bump)
**Impact:** Map components will break
**Current Status:** Map components use dynamic loading (src/main/resources/react4xp/common/Map/Map.tsx:40)
**Testing Required:**
- [ ] Review [react-leaflet v5 changelog](https://github.com/PaulLeCam/react-leaflet/releases)
- [ ] Test all map components
- [ ] Test dynamic Leaflet loading still works
- [ ] Verify Leaflet 1.9.4 compatibility

**Recommendation:** Create separate issue and test branch

### eslint-plugin-react-hooks (6 → 7)
```bash
# DO NOT UPDATE YET
npm install --save-dev eslint-plugin-react-hooks@^7.0.0
```

**Risk:** Medium-High
**Breaking Changes:** Stricter hooks rules
**Impact:** May flag new linting errors
**Testing Required:**
- [ ] Review changelog
- [ ] Run `npm run lint` after update
- [ ] Fix any new hook rule violations

**Recommendation:** Update with caution, fix linting errors

### ini (3 → 5)
```bash
# DO NOT UPDATE YET
npm install ini@^5.0.0
```

**Risk:** Medium
**Breaking Changes:** Yes (3→4, 4→5)
**Impact:** Unknown (need to check where ini is used)
**Testing Required:**
- [ ] Search codebase for ini usage
- [ ] Review breaking changes

---

## ⛔ BLOCKED: Cannot Update (React 19 Dependencies)

These are blocked until @enonic/react4xp supports React 19:

### React Core (BLOCKED)
```bash
# ⛔ DO NOT UPDATE - React4xp requires React 18
react: 18.3.1 → 19.2.0              # BLOCKED
react-dom: 18.3.1 → 19.2.0          # BLOCKED
@types/react: 18.3.26 → 19.2.2      # BLOCKED
```

**Blocker:** @enonic/react4xp@6.0.2 requires `"react": "^18.0.0"`
**Status:** Monitor React4xp releases
**Reference:** See docs/REACT_19_MIGRATION.md

### React Ecosystem (BLOCKED)
```bash
# ⛔ DO NOT UPDATE - May require React 19
react-slugify: 3.0.3 → 5.0.0        # BLOCKED (check if React 19 required)
```

**Action:** Check if react-slugify 5.x requires React 19

---

## Recommended Update Plan

### Batch 1: Safe Updates (Now)
**Time:** 15 minutes
**Risk:** Very Low

```bash
# Update all safe packages
npm update esbuild @eslint/js eslint typescript-eslint \
  @storybook/addon-docs @storybook/addon-links @storybook/react-webpack5 \
  eslint-plugin-storybook storybook html-react-parser

# Test
npm run check
npm test
npm run storybook
```

### Batch 2: Tooling Updates (Next Session)
**Time:** 1 hour
**Risk:** Medium

```bash
# Update commitlint
npm install --save-dev @commitlint/cli@^20.1.0 \
  @commitlint/config-conventional@^20.0.0

# Test commits
git commit --allow-empty -m "test: verify commitlint works"

# Update husky
npm install --save-dev husky@^9.1.7

# Test hooks
npm run postinstall
```

### Batch 3: Build Tools (Separate Branch)
**Time:** 2 hours
**Risk:** Medium-High

```bash
# Create test branch
git checkout -b chore/update-webpack-semantic-release

# Update packages
npm install --save-dev webpack-cli@^6.0.1 semantic-release@^25.0.0

# Full build test
npm run clean
npm run build:prod
npm test

# If successful, merge
```

### Batch 4: React Ecosystem (Future)
**Time:** 4-6 hours
**Risk:** High
**Prerequisites:** React4xp React 19 support

1. Investigate react-leaflet 5.x compatibility
2. Update eslint-plugin-react-hooks
3. Test thoroughly before React 19 upgrade

---

## Commands Reference

### Check Outdated Packages
```bash
npm outdated
```

### Update Specific Package
```bash
npm update <package-name>
```

### Install Specific Version
```bash
npm install <package-name>@<version>
```

### Check for Security Issues
```bash
npm audit
```

### Update package-lock.json
```bash
npm update
```

---

## Success Criteria

After each batch:
- ✅ `npm test` passes (754 tests)
- ✅ `npm run check:types` passes
- ✅ `npm run lint` passes
- ✅ `npm run build:prod` succeeds
- ✅ `npm run storybook` works
- ✅ No new vulnerabilities (`npm audit`)

---

## Monitoring

**Create GitHub Issue:** "Dependency Updates - Batch 1"
**Track Progress:** Update this document with completed batches
**Review Frequency:** Monthly check for new updates

---

## Next Steps

1. ✅ **Execute Batch 1** (safe updates) - Ready to run now
2. ⏳ **Schedule Batch 2** (tooling) - Next session
3. ⏳ **Investigate Batch 3** (build tools) - Separate branch
4. ⏳ **Monitor React4xp** for React 19 support

**Status:** Ready for Batch 1 execution
