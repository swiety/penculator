# Implementation Plan: Compact Calculator Layout

**Branch**: `main` (setup feature identifier: `005-compact-calculator`) | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/005-compact-calculator/spec.md`

## Summary

Reduce the vertical footprint of the calculator so that all four amount fields, the click warning, and both live result values fit in the specified small viewports. Reorganize spacing, headings, field layout and step controls while preserving readable warnings, keyboard and touch usability, and existing calculation behavior. Validate the rendered site at specified viewport sizes and enlarged text rather than assuming CSS changes achieve the targets.

## Technical Context

**Language/Version**: HTML, SCSS/CSS, browser JavaScript; Node.js 22+ and Ruby 3.3 for local tooling.

**Primary Dependencies**: Existing Jekyll GitHub Pages and Minima theme; no new production dependency planned.

**Storage**: None; existing in-memory form state only.

**Testing**: Existing `node --test` suite plus real-browser layout, keyboard, touch, zoom and accessibility checks described in [quickstart.md](quickstart.md).

**Target Platform**: Responsive desktop and mobile browsers; widths 320 CSS pixels and above.

**Project Type**: Static, client-side web calculator.

**Performance Goals**: Preserve immediate live updates; no new calculation or network work.

**Constraints**: Meet spec SC-001 at 768 × 768 and 390 × 844 CSS pixels; support 200% text enlargement and vertical scrolling when necessary; preserve all warnings, units and existing input behavior.

**Scale/Scope**: One calculator page, four input fields and their adjustment controls; presentation only.

## Constitution Check

**Before research — PASS**: Scope is limited to presentation and no new dependency or shared state is required. Existing validation, calculation boundaries, rounding, limitations and disclaimer remain unchanged. Existing tests plus explicit browser validation address regressions and ergonomics. Documentation is updated if usage or setup changes.

**After design — PASS**: The proposed semantic controls retain the existing calculation boundary and independent logic. Research, contracts and quickstart specify measurable viewport and accessibility checks, invalid-state recovery and preservation of all safety context. No exception is identified.

## Project Structure

### Documentation (this feature)

```text
specs/005-compact-calculator/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/ui.md
```

### Source Code (repository root)

```text
index.html                # Calculator markup and user-facing information
assets/css/style.scss     # Existing styling and responsive layout
assets/js/app.js          # Existing input and live-result interaction
assets/js/calculator.js   # Existing calculation and validation logic
assets/js/step.js         # Existing step behavior
tests/                    # Existing Node behavior tests
README.md                 # Setup and usage instructions
```

**Structure Decision**: Keep the existing static-site structure. Prefer changes in markup and styling; touch interaction code only if needed to preserve the current control contract, and do not change calculation rules. Add focused regression checks only where useful; rendered-browser verification is required for layout.
