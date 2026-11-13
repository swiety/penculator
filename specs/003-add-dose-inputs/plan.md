# Implementation Plan: Add Dose Inputs

**Branch**: `main` | **Date**: 2026-11-13 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/003-add-dose-inputs/spec.md`

## Summary

Build a static GitHub Pages calculator using a Jekyll Minima theme and plain JavaScript. Users select the supported pen and enter values in one or more fields; the application adds their mathematical equivalents and displays mg and ml. Keep calculation and validation separate from presentation, use exact arithmetic for boundary and rounding decisions, and display the requested disclaimer and product limitations.

## Technical Context

**Language/Version**: HTML, CSS, Jekyll/Liquid and modern browser JavaScript using ES modules and BigInt. Node.js 22 or later for local tests.

**Primary Dependencies**: GitHub Pages-compatible Jekyll and its Minima theme; Node built-in test runner for development. No frontend framework or runtime API.

**Storage**: None; no accounts or persistence of entered values.

**Testing**: `node --test` with `node:test` and `node:assert/strict`; manual browser checks on desktop and mobile, including project base paths.

**Target Platform**: Modern desktop and mobile browsers; GitHub Pages static hosting.

**Project Type**: Single static web application.

**Performance Goals**: Specification SC-003 and SC-004; calculation runs locally with no network call.

**Constraints**: Static assets only after publication; correct unit labels and exact pre-rounding limits; visible disclaimer and manufacturer's click limitation; work at root and repository subpaths.

**Scale/Scope**: One calculator screen, one supported pen type, four inputs, no server or personal data storage.

## Constitution Check

**Pre-design: PASS.** The specification defines the additive rule, boundaries, acceptance scenarios and product limitations. The design must keep the calculator separate from UI and use independent examples and meaningful automated tests.

**Post-design: PASS.** The model and contract define exact arithmetic, validation, and observable outputs; unit tests cover calculation boundaries and user-facing browser checks cover the interface. Documentation and static hosting introduce no unjustified runtime dependency. Results remain mathematical conversions, not administration instructions. No exception is required.

## Project Structure

### Documentation (this feature)

```text
specs/003-add-dose-inputs/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/ui.md
├── quickstart.md
└── tasks.md             # later $speckit-tasks output
```

### Source Code (repository root)

```text
_config.yml              # Jekyll configuration
Gemfile                  # local GitHub Pages-compatible Jekyll environment
index.html               # calculator page and product context
assets/
├── css/style.scss       # theme customization
└── js/
    ├── calculator.js    # pure parsing, validation and calculations
    └── app.js           # browser interactions
package.json             # ES module configuration and test command
tests/calculator.test.js # behavior and boundary tests
README.md                # setup, local preview and publishing
```

**Structure Decision**: One Jekyll site with separate pure calculation and UI modules. Test tools are development-only; no backend, database, build-time JavaScript framework or external runtime calculation service is needed.

## Complexity Tracking

No constitution violations or exceptions.
