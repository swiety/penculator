---
description: "Implementation tasks for Polish language support"
---

# Tasks: Polish Language Support

**Input**: `specs/006-polish-language/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/ui.md`, and `quickstart.md`

**Organization**: Tasks are grouped by user story. `[P]` marks tasks that can run concurrently without shared-file edits or unfinished dependencies. Verification tasks exercise the specification's acceptance criteria; existing tests remain required.

## Phase 1: Setup

- [ ] T001 Review setup and local runtime requirements in `README.md` and `specs/006-polish-language/quickstart.md`; establish a way to serve the site and record blockers.
- [X] T002 [P] Inventory visible, conditional, accessible and theme-generated English text and every validation error in `index.html`, `assets/js/app.js`, `assets/js/calculator.js`, `assets/js/step.js`, and `_config.yml`.

## Phase 2: Foundational

- [X] T003 Design the shared translation keys and structured error identities for the inventory in `specs/006-polish-language/data-model.md`; preserve field and dose parameters without interpolating user input as markup.
- [X] T004 Update `assets/js/calculator.js` and `assets/js/step.js` to expose stable error identifiers and parameters while preserving existing English behavior, arithmetic, validation, precision and step semantics.
- [X] T005 Add a focused localization module at `assets/js/i18n.js` with shared catalog lookup and text-safe rendering support; supported language values are exactly `en` and `pl`, and missing keys must be detectable.

**Checkpoint**: Calculation feedback has language-independent identity and both languages can share a consistent catalog.

## Phase 3: User Story 1 — Use the calculator in Polish (Priority: P1) 🎯 MVP

**Goal**: Present all calculator content, feedback and safety limitations in accurate Polish when Polish is preferred.

**Independent test**: With no stored choice and Polish as the first supported browser preference, enter valid and invalid values and inspect all text, warnings, accessible names and product limitations in Polish.

- [X] T006 [US1] Add complete matching English and Polish translation catalogs in `assets/js/i18n.js` for the T002 inventory, including field-specific errors, step errors, result states, warnings, disclaimer, controls and theme-generated text.
- [X] T007 [US1] Implement first-visit preference selection in `assets/js/i18n.js`: “normalize case and match the base language of valid language tags,” skip unsupported or malformed entries, use the ordered exposed browser list, fall back to the single browser language when the list is unavailable or empty, then to `en`.
- [X] T008 [US1] Integrate initial language application and structured error rendering in `assets/js/app.js`, preserving existing live calculation and validation behavior; update document language and accessible descriptions.
- [X] T009 [US1] Adapt `index.html` and, only as needed, theme configuration or layout files under `_config.yml` and `_layouts/` so all static content, document title, navigation, semantic links and accessible names can be localized without losing the existing warning text.
- [ ] T010 [US1] Check Polish wording and safety equivalence against the English inventory in `assets/js/i18n.js`, including units, uncertainty, manufacturer advice, product limitations and the English-language leaflet indicator; record reviewer and unresolved issues in `specs/006-polish-language/quickstart.md`.
- [ ] T011 [US1] Execute the Polish first-visit, valid/invalid input, warning and accessible-content checks in `specs/006-polish-language/quickstart.md`; correct omissions and record results.

**Checkpoint**: Polish preference yields a complete, accurate Polish calculator without changing its calculations.

## Phase 4: User Story 2 — Select and retain a language (Priority: P1)

**Goal**: Let users switch language immediately, retain their preference when possible, and preserve the current calculation and focus.

**Independent test**: Switch both ways with empty, valid and invalid inputs, including a step error; reload with a changed browser preference and verify the explicit choice wins when storage is available.

- [X] T012 [US2] Add a compact, labeled language selector with `English` and `Polski` choices and an identifiable active selection in `index.html`, with keyboard, pointer, touch and assistive-technology support.
- [X] T013 [US2] Style the selector and translated content in `assets/css/style.scss` to preserve focus visibility, readable controls and the compact responsive layout, including at 320 CSS pixels and 200% text enlargement.
- [X] T014 [US2] Implement the preference lifecycle in `assets/js/i18n.js`: “Initialization selects a language without saving an automatic choice”; an explicit supported choice updates the current language and attempts browser-local persistence, with read/write errors caught.
- [X] T015 [US2] Connect the selector in `assets/js/app.js` to re-render static and current dynamic content, including step-generated errors, while preserving selected pen, exact input text, result, approximation status, invalid state and focus.
- [ ] T016 [US2] Run the switch, storage, reload, keyboard, pointer and touch scenarios in `specs/006-polish-language/quickstart.md`; verify no stale result or lost focus and record results.

**Checkpoint**: Explicit selection works in either direction and does not discard the user's work.

## Phase 5: User Story 3 — Use a supported fallback (Priority: P2)

**Goal**: Choose the first supported browser preference and keep the calculator usable when preferences or storage are unavailable.

**Independent test**: Check mixed, unsupported, empty and unavailable preference lists, language variants, invalid saved values and blocked storage; verify selection and continued use.

- [X] T017 [US3] Verify and adjust `assets/js/i18n.js` to enforce the preference precedence in `specs/006-polish-language/data-model.md`: “valid explicitly saved browser-local selection” first, then ordered browser preferences, single-language fallback when needed, then `en`; do not save automatic choices.
- [ ] T018 [US3] Exercise mixed preference order, case and region variants, unsupported or malformed entries, invalid saved values, and storage read/write failures using `specs/006-polish-language/quickstart.md`; ensure current-page switching remains functional and record outcomes.

**Checkpoint**: Unsupported or unavailable preferences never prevent access to either language.

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T019 Run `node --test` for the existing suites in `tests/` and verify calculation, stepping, comma/point input, rounding, limits, error recovery and catalog completeness for both languages; fix regressions and record results in `specs/006-polish-language/quickstart.md`.
- [ ] T020 Measure the rendered page in both languages at 768 × 768 and 390 × 844 CSS pixels at 100% zoom, then verify 320-pixel width and 200% text enlargement as specified in `specs/006-polish-language/contracts/ui.md`; fix overlap, overflow or failure to fit in `index.html` and `assets/css/style.scss`.
- [ ] T021 Conduct the first-time-user exercise specified by SC-004 in `specs/006-polish-language/spec.md`; record participant count, completion count and times in `specs/006-polish-language/quickstart.md`, or report that it remains unverified if participants are unavailable.
- [ ] T022 Verify the project subpath and complete the browser and accessibility checklist in `specs/006-polish-language/quickstart.md`; update `README.md` to explain language selection and the browser-local preference, and record any checks that could not be run.
- [ ] T023 Review final changes against `specs/006-polish-language/spec.md`, `specs/004-live-dose-controls/spec.md`, `specs/005-compact-calculator/spec.md` and `.specify/memory/constitution.md`; repeat affected checks after fixes and document remaining limitations.

## Dependencies & Execution Order

- Setup T001–T002 → foundation T003–T005 → US1 T006–T011 → US2 T012–T016 → US3 T017–T018 → cross-cutting T019–T023.
- US1 supplies the shared catalog and initial selection; US2 adds explicit switching and storage; US3 verifies and completes fallback behavior. Each story has an independent acceptance check, though implementation is sequenced around the shared localization module and UI.
- Recheck US1 after US2 or US3 changes. Do not concurrently edit `assets/js/i18n.js`, `assets/js/app.js`, `index.html`, or `assets/css/style.scss`.

### Parallel opportunities per story

- **US1**: After the foundational inventory, a read-only Polish safety-meaning review can proceed alongside planning the static-content mappings; integrate catalog and markup changes sequentially where they share files.
- **US2**: Selector accessibility review and storage-failure scenario preparation can proceed independently; implement and verify shared-module changes in order.
- **US3**: Prepare independent mixed-language and unavailable-storage acceptance cases in parallel; run them after US2 persistence is integrated.
- T001 and T002 are independent; avoid parallel edits to the same file in every phase.

## Implementation Strategy

1. Complete setup and the shared error/localization foundation, then implement and independently validate US1 as the MVP.
2. Add the explicit selector and saved preference in US2, then verify fallback behavior in US3; rerun previous story checks after integration.
3. Run existing regression checks, rendered checks in both languages, accessibility and usability validation, and the project-subpath check. Report actual evidence and any uncompleted verification before declaring the feature finished.
