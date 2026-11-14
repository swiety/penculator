# Implementation Plan: Polish Language Support

**Branch**: `main` (setup feature identifier: `006-polish-language`) | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/006-polish-language/spec.md`

## Summary

Provide complete Polish and English interfaces with a compact, accessible language selector, browser-preference-based initial selection, and an optional browser-local saved choice. Translate static and dynamic content, including validation errors and safety statements, without changing calculations or losing current input and result state. Verify both languages against the existing compact-layout targets, which remain unverified from feature 005.

## Technical Context

**Language/Version**: HTML, SCSS/CSS and browser JavaScript; Node.js 22+ and Ruby 3.3 for local tooling.

**Primary Dependencies**: Existing Jekyll GitHub Pages and Minima theme; browser language and local storage facilities; no new production dependency planned.

**Storage**: One browser-local language preference only when the user explicitly chooses a language; no calculation data persisted.

**Testing**: Existing Node test runner, focused automated tests for language selection, messages and state preservation, and rendered browser, accessibility and usability checks in [quickstart.md](quickstart.md).

**Target Platform**: Static GitHub Pages site and modern desktop/mobile browsers; 320 CSS pixels and above.

**Project Type**: Static client-side calculator.

**Performance Goals**: Language changes and existing live calculation updates remain immediate without a separate request or submission.

**Constraints**: Preserve exact calculations, validation, warnings and current values; translate all UI states and accessible names; preserve focus and compact responsive layout; handle unavailable storage and preferences.

**Scale/Scope**: One calculator page, two languages, four amount fields and their associated feedback.

## Constitution Check

**Before research — PASS**: The scope is a focused presentation and language-preference change. Existing calculation behavior and safety limitations remain authoritative; translation must preserve meaning and uncertainty. Automated behavior checks and real-browser verification are planned. No external dependency is required.

**After design — PASS**: Stable error identities keep calculation logic separate from translated presentation and enable language switching without losing invalid-state information. Tests cover preference order, unavailable storage, errors, precision and user interaction. The plan requires translation review and retains all product and medical limitations. Documentation is updated where usage changes. No exception is identified.

## Project Structure

### Documentation (this feature)

```text
specs/006-polish-language/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/ui.md
```

### Source Code (repository root)

```text
index.html                 # Calculator content, labels and selector
assets/css/style.scss      # Compact selector and responsive styling
assets/js/app.js           # Form, live state and rendering
assets/js/calculator.js    # Validation and calculation
assets/js/step.js          # Step validation and adjustment
assets/js/                 # New focused localization module and translations
_config.yml                # Site title and theme configuration
tests/                     # Existing and focused Node tests
README.md                  # Usage and setup
```

**Structure Decision**: Extend the existing static client-side architecture. Add a small localization module and explicit translation dictionary, keep calculations separate from presentation, and change theme-generated page elements only as needed to localize the entire UI. Preserve base-path-safe assets and avoid new production libraries.
