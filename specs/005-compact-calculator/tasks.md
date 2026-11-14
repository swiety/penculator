---
description: "Implementation tasks for the compact calculator layout"
---

# Tasks: Compact Calculator Layout

**Input**: `specs/005-compact-calculator/plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`, and `quickstart.md`

**Organization**: Tasks are grouped by user story. `[P]` marks tasks that can run concurrently without modifying the same files or relying on unfinished work. Browser checks are acceptance verification, not new test-suite requirements.

## Phase 1: Setup

- [ ] T001 Review local prerequisites and start the site according to `README.md`; record any setup blocker for the checks in `specs/005-compact-calculator/quickstart.md`.
- [ ] T002 [P] Inspect the current form, warning and result markup in `index.html` and existing control behavior in `assets/js/app.js` and `assets/js/step.js` to identify integration constraints.

## Phase 2: Foundational

- [ ] T003 Review and preserve the existing selectors, accessible names, field-to-error relationships, and live-result hooks in `index.html` and `assets/js/app.js` before changing presentation; use `specs/005-compact-calculator/contracts/ui.md` as the contract.

**Checkpoint**: Existing control and content contracts are understood before layout work.

## Phase 3: User Story 1 — See the calculation without scrolling (Priority: P1) 🎯 MVP

**Goal**: Fit all four labelled fields and controls, the click warning and both live results in the specified compact initial viewports.

**Independent test**: At 100% zoom and page top, enter 1 mg at 768 × 768 and 390 × 844 CSS-pixel viewports and confirm every specified element is visible without vertical scrolling, including the site header.

- [ ] T004 [US1] Restructure the existing input markup in `index.html` as needed to place each pair of step controls alongside its input, keeping labels, units, selectors and warning content intact.
- [ ] T005 [US1] Update `assets/css/style.scss` to place the step controls vertically at the right of each input, reserve room for values and units, and remove the separate control row without obscuring content.
- [ ] T006 [US1] Compact introductory and section spacing, card padding and repeated headings in `index.html` and `assets/css/style.scss`; preserve the click warning and distinguish inputs from results.
- [ ] T007 [US1] Update responsive rules in `assets/css/style.scss` to retain two field columns at the 390-pixel target when readable and reflow to one column when space or enlarged text requires it, without horizontal page scrolling.
- [ ] T008 [US1] Run the two rendered viewport checks and live-update check in `specs/005-compact-calculator/quickstart.md`; adjust `assets/css/style.scss` and `index.html` until the specified elements fit, and record actual viewport and browser results.

**Checkpoint**: The principal calculation journey meets SC-001 while preserving existing field and warning behavior.

## Phase 4: User Story 2 — Adjust amounts comfortably (Priority: P1)

**Goal**: Keep typing and both step controls usable with pointer, touch and keyboard in the compact layout.

**Independent test**: Type a value and operate both controls for each field using pointer, touch and keyboard; check correct field changes, live results, accessible names, focus and target geometry.

- [ ] T009 [US2] Refine control and focus styles in `assets/css/style.scss` so each button contains a 24 × 24 CSS-pixel target, has a visible focus indicator, and remains distinct from adjacent controls and the editable value.
- [ ] T010 [US2] Verify and, only if necessary, update control markup in `index.html` and interaction wiring in `assets/js/app.js` to retain field-specific accessible names, tab order, text entry, existing increments and live updates.
- [ ] T011 [US2] Perform the control geometry, accessible-name, pointer, touch and keyboard checks in `specs/005-compact-calculator/quickstart.md` for all eight buttons; record the devices or emulation used and resolve any unintended activations.

**Checkpoint**: Each control works independently and does not rely on a particular pointer or screen size.

## Phase 5: User Story 3 — Understand results and limitations (Priority: P2)

**Goal**: Keep guidance, feedback, warnings and product context understandable and available in the compact layout.

**Independent test**: Enter invalid text after a valid result, correct it, and enter clicks; locate the error, persistent warning, conditional result warning and product information without a disclosure action.

- [ ] T012 [US3] Adjust `index.html` and `assets/css/style.scss` as necessary to retain readable field guidance, persistent click warning, conditional result warning, result units and approximation indicators, leaflet and medical/product limitations without overlap or hidden disclosure.
- [ ] T013 [US3] Verify invalid input removes the stale result, presents associated feedback and recovers on correction; verify click warnings and product information using `specs/005-compact-calculator/quickstart.md`, recording results and any limitations.

**Checkpoint**: The compact presentation preserves the existing calculation context and error recovery.

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T014 Run `node --test` against the existing suites in `tests/` and fix any regressions caused by the layout changes; record the result in `specs/005-compact-calculator/quickstart.md` or the change record.
- [ ] T015 Verify 320 CSS-pixel width, 200% text enlargement, long values, wrapped text and error states against `specs/005-compact-calculator/contracts/ui.md`; fix horizontal overflow, clipping or overlap in `assets/css/style.scss` and `index.html`.
- [ ] T016 Conduct the first-time-user exercise in `specs/005-compact-calculator/quickstart.md`, recording participant count, completion count and timing against SC-003; explicitly report if participants are unavailable rather than claiming a pass.
- [ ] T017 Verify the project subpath as described in `specs/005-compact-calculator/quickstart.md`, update `README.md` only if usage or setup changed, and record completed checks and blockers.
- [ ] T018 Re-run the viewport and interaction checks in `specs/005-compact-calculator/quickstart.md` after any fixes, and review the final diff against `specs/005-compact-calculator/spec.md` and the constitution.

## Dependencies & Execution Order

- Setup T001–T002 → foundation T003 → US1 T004–T008 → US2 T009–T011 and US3 T012–T013 → cross-cutting T014–T018.
- US2 and US3 are independently verifiable, but the planned implementation builds on US1's shared markup and styles. They touch the same files and must be coordinated or performed sequentially; recheck US1 after either change.
- T014 may run after implementation stabilizes; T015–T017 can be planned independently but fixes, final recording and T018 must be coordinated. Do not run concurrent edits to `index.html` or `assets/css/style.scss`.

### Parallel opportunities per story

- **US1**: Before T004, a read-only review of the markup and CSS can be performed alongside independent review of the viewport acceptance criteria; T004–T008 themselves share files or depend on prior work and should be sequential.
- **US2**: After the layout stabilizes, accessibility-name inspection and touch-device availability checks can be prepared independently; T009–T011 are ordered because verification follows styling and wiring.
- **US3**: After US1, a read-only inventory of product warnings can run alongside review of invalid-input behavior; T012 and T013 remain sequential.

## Implementation Strategy

1. Complete setup and foundational review, then deliver and independently validate US1 as the MVP without sacrificing existing usability or warnings.
2. Complete US2 and US3, verifying each story independently and revisiting the viewport target after shared-file changes.
3. Run the existing regression suite, full responsive and interaction checks, usability exercise when possible, and project-subpath check. Record actual results and outstanding limitations before declaring completion.
