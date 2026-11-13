# Implementation Plan: Multiple Dose Inputs

**Branch**: `main` | **Date**: 2026-11-13 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-multiple-dose-inputs/spec.md`

**Status**: Blocked pending clarification of how multiple populated fields are combined (FR-004). This is a preliminary plan, not approval to implement.

## Summary

Build a small static calculator published through GitHub Pages, using a Jekyll theme for presentation and plain JavaScript for input validation and arithmetic. Show both mg and ml, the requested disclaimer, and the limitations specified for the pen and click assumption. The calculation behavior for multiple inputs remains unresolved.

## Technical Context

**Language/Version**: Plain browser JavaScript using standard ES modules; HTML and CSS; Jekyll templates.

**Primary Dependencies**: A GitHub Pages-compatible Jekyll theme; exact selection to be confirmed in research. No client-side application framework.

**Storage**: None required for calculations or personal information.

**Testing**: Automated JavaScript unit tests for conversion, validation, boundaries and rounding; browser checks for user-facing behavior and responsive layout.

**Target Platform**: Modern desktop and mobile browsers; static GitHub Pages hosting, including a project-site base path.

**Project Type**: Static web application.

**Performance Goals**: Meet the usability targets in the feature specification; calculations run locally without a network request.

**Constraints**: No backend or runtime calculation service; transparent units and approximation; manufacturer's limitations and the requested disclaimer visible.

**Scale/Scope**: One calculator and one supported pen type.

## Constitution Check

**Pre-design gate: BLOCKED.** The constitution requires supported behavior and acceptance criteria before implementation. FR-004 is unresolved, so multi-field calculation behavior, validation, and its acceptance tests cannot yet be finalized. Separating calculation from presentation, meaningful deterministic tests, clear documentation, and no misleading medical instructions are required design gates.

**Post-design gate**: Not evaluated; design must be completed after the unresolved behavior is specified.

## Project Structure

### Documentation (this feature)

```text
specs/002-multiple-dose-inputs/
├── spec.md
├── plan.md
├── research.md          # Phase 0, pending
├── data-model.md        # Phase 1, pending
├── contracts/           # Phase 1, pending
├── quickstart.md        # Phase 1, pending
└── tasks.md             # Phase 2, not part of this command
```

### Source Code (repository root)

```text
_config.yml              # Jekyll configuration
index.html               # Calculator page
assets/
├── css/                 # Theme adjustments
└── js/                  # Calculation and presentation modules
tests/                   # JavaScript unit tests
```

**Structure Decision**: A single static site with independently testable calculation logic and a thin presentation layer; no server or persistent data store.

## Complexity Tracking

No constitution exception proposed. The missing behavior must be clarified rather than treated as an exception.
