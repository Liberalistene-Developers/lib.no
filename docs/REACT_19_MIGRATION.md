# React 19 Migration Strategy

## ⚠️ BLOCKED: React4xp Does Not Support React 19 Yet

**Status:** Migration is **BLOCKED** until @enonic/react4xp releases React 19 support.

**Current Situation:**
- **React4xp Version:** 6.0.2 (latest)
- **React4xp Peer Dependency:** `"react": "^18.0.0"` (React 18 only)
- **Our React Version:** 18.3.1 ✅
- **React 19 Status:** Not supported by React4xp

**Next Steps:**
1. Monitor @enonic/react4xp for React 19 support
2. Check the [React4xp GitHub repository](https://github.com/enonic/lib-react4xp) for updates
3. Stay on React 18 until React4xp releases React 19 compatibility

---

## Overview

This document outlines the **future** strategy for upgrading from React 18 to React 19 for the lib.no project, once React4xp supports it.

**Current Version:** React 18.3.1
**Target Version:** React 19.x (when supported)
**Risk Level:** High (Blocked by dependency incompatibility)

---

## Pre-Migration Checklist

### 1. Upgrade to React 18.3 First ✅
**Status:** Currently on 18.3.1 - Already done!

React 18.3 includes warnings for deprecated APIs that will break in React 19. This is the recommended intermediate step.

### 2. Run Existing Tests ✅
**Status:** 754/754 tests passing

Establish baseline test coverage before migration.

### 3. Check Library Compatibility

**Critical Dependencies to Verify:**

| Library | Current | React 19 Compatible? | Action Required |
|---------|---------|---------------------|-----------------|
| `react-dom` | 18.3.1 | ⚠️ Upgrade to 19.x | Upgrade together with react |
| `react-leaflet` | 4.2.1 | ⚠️ Check compatibility | May need upgrade to 5.x |
| `@testing-library/react` | 16.3.0 | ✅ Compatible | None |
| `@enonic/react4xp` | 6.0.2 | ⚠️ Unknown | Test thoroughly |
| `html-react-parser` | 5.2.6 | ⚠️ Check compatibility | Review changelog |
| `@storybook/react-webpack5` | 9.1.10 | ✅ Should be compatible | Update to latest |

---

## Breaking Changes Impact Assessment

### 1. **Ref Handling Changes** - ⚠️ MEDIUM RISK

**Change:** `ref` can now be accessed as a prop in function components. `forwardRef` will be deprecated.

**Impact on Our Codebase:**
- Search for `forwardRef` usage
- Check custom components that forward refs
- Review HOCs (Higher Order Components)

**Action Items:**
- [ ] Search codebase for `React.forwardRef`
- [ ] Use official codemod: `npx codemod@latest react/19/replace-forward-ref`
- [ ] Manually review any complex ref patterns

### 2. **defaultProps Removed** - ✅ LOW RISK

**Change:** `defaultProps` removed from function components (ES6 default params instead)

**Impact on Our Codebase:**
- We use TypeScript with ES6 defaults already
- All components are function components (no class components)

**Action Items:**
- [ ] Search for `defaultProps` usage
- [ ] If found, replace with ES6 default parameters

### 3. **PropTypes Removed** - ✅ NO RISK

**Change:** PropTypes checks removed from React

**Impact:** None - we use TypeScript for type checking

### 4. **useEffect Timing Changes** - ⚠️ MEDIUM RISK

**Change:** Subtle changes to useEffect execution timing

**Impact on Our Codebase:**
- May affect dynamic imports (Leaflet lazy loading)
- May affect data fetching in components

**Action Items:**
- [ ] Test all dynamic imports (especially Map components)
- [ ] Test all useEffect hooks with dependencies
- [ ] Review components with timing-sensitive effects

### 5. **react-test-renderer Deprecated** - ✅ NO RISK

**Change:** `react-test-renderer` is deprecated

**Impact:** None - we use `@testing-library/react` (recommended approach)

### 6. **Context API Changes** - ✅ LOW RISK

**Change:** Legacy Context API removed

**Impact:** We don't use legacy Context API (use modern Context only)

---

## Migration Plan

### Phase 1: Preparation (Current Session)
- [x] Document breaking changes
- [x] Identify affected code
- [ ] Check library compatibility
- [ ] Create feature branch for testing

### Phase 2: Compatibility Testing (Before Upgrade)
- [ ] Search for `forwardRef` usage
- [ ] Search for `defaultProps` usage
- [ ] Audit all `useEffect` hooks
- [ ] Review React 18.3 warnings in console

### Phase 3: Upgrade Dependencies
- [ ] Update `react` and `react-dom` to 19.x
- [ ] Update `@types/react` to 19.x
- [ ] Update `react-leaflet` to 5.x (if needed)
- [ ] Update Storybook to latest
- [ ] Run `npm install`

### Phase 4: Run Codemods
```bash
# Official React 19 codemods
npx codemod@latest react/19/replace-forward-ref
npx codemod@latest react/19/replace-default-props
```

### Phase 5: Manual Code Updates
- [ ] Fix any codemod issues
- [ ] Update custom ref patterns
- [ ] Fix any TypeScript errors

### Phase 6: Testing
- [ ] Run all tests: `npm test`
- [ ] Run type checks: `npm run check:types`
- [ ] Test Storybook: `npm run storybook`
- [ ] Manual testing of critical paths:
  - [ ] Article pages
  - [ ] Event pages
  - [ ] Map components (Leaflet)
  - [ ] Candidate pages
  - [ ] Interactive components (Submenu, etc.)

### Phase 7: Build & Deploy Testing
- [ ] Clean build: `npm run clean && npm run build`
- [ ] Production build: `npm run build:prod`
- [ ] Deploy to test sandbox
- [ ] Smoke test all major features

---

## Rollback Plan

If migration fails or introduces critical bugs:

1. **Revert package.json:**
   ```bash
   git checkout package.json package-lock.json
   npm install
   ```

2. **Revert code changes:**
   ```bash
   git reset --hard HEAD
   ```

3. **Stay on React 18.3.1** until issues resolved

---

## Commands Reference

### Search for Breaking Changes
```bash
# Find forwardRef usage
grep -r "forwardRef" src/main/resources/react4xp

# Find defaultProps usage
grep -r "defaultProps" src/main/resources/react4xp

# Find legacy Context usage
grep -r "contextTypes\|getChildContext" src/main/resources/react4xp

# Find react-test-renderer usage
grep -r "react-test-renderer" src/
```

### Run Codemods
```bash
# Install codemod
npm install -g codemod

# Run React 19 codemods
npx codemod@latest react/19/replace-forward-ref
npx codemod@latest react/19/replace-default-props
```

### Testing Commands
```bash
# Full test suite
npm test

# Type checking
npm run check:types

# Linting
npm run lint

# Storybook
npm run storybook

# Full build
npm run clean && npm run build:prod
```

---

## Risk Assessment

| Risk Category | Level | Mitigation |
|---------------|-------|------------|
| Ref handling changes | Medium | Run codemods, thorough testing |
| useEffect timing | Medium | Test all dynamic imports and effects |
| Library compatibility | Medium | Check before upgrade, update if needed |
| Test suite breakage | Low | Using @testing-library (compatible) |
| Build system issues | Low | Clean build testing |
| Runtime errors | Medium | Comprehensive manual testing |

**Overall Risk:** Medium
**Recommended Approach:** Staged migration with thorough testing

---

## Success Criteria

- ✅ All 754 tests passing
- ✅ Zero TypeScript errors
- ✅ Zero ESLint errors
- ✅ Storybook running without errors
- ✅ Production build succeeds
- ✅ All critical user paths work correctly
- ✅ No console errors/warnings in browser
- ✅ Performance not degraded

---

## Timeline Estimate

- **Preparation:** 30 minutes (this document + searches)
- **Dependency Updates:** 15 minutes
- **Code Migration:** 1-2 hours (codemods + manual fixes)
- **Testing:** 2-3 hours (automated + manual)
- **Build & Deploy:** 1 hour
- **Total:** 4-7 hours

---

## References

- [React 19 Official Release](https://react.dev/blog/2024/12/05/react-19)
- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [React 18 to 19 Codemods](https://docs.codemod.com/guides/migrations/react-18-19)
- [Common Migration Mistakes](https://blog.openreplay.com/common-mistakes-upgrading-react-19-avoid/)

---

**Next Steps:** Run compatibility checks (Phase 2) before proceeding with upgrade.
