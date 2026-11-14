# Implementation Plan: Share Link Label

**Branch**: `main` (actual checkout; feature identifier `010-share-link-label`) | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/010-share-link-label/spec.md`

## Summary

Replace the displayed full settings URL with a localized sentence containing a standard link labelled “link”. Keep the existing destination generation and restoration contract; hide the complete sharing sentence and remove the actionable destination when the target is invalid. Preserve settings, calculation behavior, safety context and prior links.

## Technical Context

**Language/Version**: Browser JavaScript ES modules; Node.js 22+ for tests.

**Primary Dependencies**: Existing static Jekyll/GitHub Pages site and Node built-in test runner; no new dependency.

**Storage**: Existing URL fragment and language preference; no new storage.

**Testing**: `npm test`; extend focused existing UI interaction tests and manually verify browser link behavior, keyboard and assistive technology in both languages.

**Target Platform**: Phone and desktop browsers, both root and project-site subpaths.

**Project Type**: Static client-side web application.

**Performance Goals**: Update link destination and localized sentence immediately on existing input and language events.

**Constraints**: Destination and link format from feature 009 remain unchanged; no full address is displayed as sentence text; no stale actionable link survives invalid input. Preserve keyboard and assistive technology access.

**Scale/Scope**: One sharing sentence, two languages, all existing presentations and target values.

## Constitution Check

**Before research — PASS**: The change is confined to presentation and translations, preserves calculation and safety behavior, and adds no dependency. Appropriate regression coverage will verify valid and invalid states and existing link destinations.

**After design — PASS**: The planned anchor remains a native link; the original fragment contract and calculator state remain unchanged. UI tests and documented browser checks cover the new behavior and limitations. No exception is required.

## Project Structure

### Documentation (this feature)

```text
specs/010-share-link-label/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/sharing-instruction.md
└── quickstart.md
```

### Source Code (repository root)

```text
index.html                 # sentence container, prefix, anchor and suffix
assets/js/i18n.js          # English and Polish sentence segments
assets/js/app.js           # link destination and container visibility
tests/target-ui.test.js    # localized sentence and state transitions
tests/settings-link.test.js # existing destination and round-trip regression
README.md                  # adjust only if rendered instruction is described
```

**Structure Decision**: Extend the existing markup and translation pattern; keep `assets/js/target-settings.js` and its link format unchanged. Do not create `tasks.md` during planning.
