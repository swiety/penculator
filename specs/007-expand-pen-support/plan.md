# Implementation Plan: Expand Pen Support

**Branch**: `main` (actual checkout; feature identifier `007-expand-pen-support`) | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)

## Summary

Implement 007 first: a catalog and exact per-presentation conversion for six Mounjaro and seven Ozempic presentations. Keep conversion mathematics separate from rendering, preserve 15 mg Mounjaro behavior, and make selection, limits, warnings and leaflet follow the selected presentation. See the companion plan in `specs/008-add-wegovy-support/plan.md`.

## Technical Context

**Language/Version**: Browser JavaScript modules, Node.js 22+.
**Primary Dependencies**: Existing static Jekyll site and Node built-in test runner; no new runtime dependency.
**Storage**: Existing language preference only; no calculation persistence.
**Testing**: `node --test`; browser checks described in quickstart.
**Target Platform**: Phone and desktop browsers; static GitHub Pages site.
**Project Type**: Static client-side calculator.
**Performance Goals**: Live recalculation; meet specification's 60-second selection/usability target.
**Constraints**: Exact rational arithmetic, no network needed for calculations; retain language and safety context.
**Scale/Scope**: 13 presentations across Mounjaro and Ozempic.

## Constitution Check

**Before research: PASS.** Use focused catalog and arithmetic, explicit units, limits and rational rounding; cover representative values, boundaries, invalid input and switches with automated tests; retain offline calculations and product warnings. No exception or new dependency required.

**After design: PASS.** The model separates display from calculations, tracks product-specific ratios, and requires independently derived fixtures, regression checks and documentation updates. User-facing calculations remain mathematical equivalents and not administration guidance.

## Project Structure

### Documentation (this feature)

```text
specs/007-expand-pen-support/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/ui.md
├── quickstart.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html                 # selector and safety context
assets/js/pen.js           # presentation catalog
assets/js/calculator.js    # exact conversion and validation
assets/js/app.js           # selection, result and controls
assets/js/i18n.js          # English and Polish product text
tests/                     # Node calculation and UI tests
README.md                  # product scope and validation
```

**Structure Decision**: Extend existing client-side modules. Feature 007 creates the shared selection and arithmetic foundation; feature 008 adds Wegovy data and any needed product-specific presentation. No implementation has been assumed complete.
