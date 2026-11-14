# Implementation Plan: Target Dose and Shareable Link

**Branch**: `main` (actual checkout; feature identifier `009-target-dose-link`) | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/009-target-dose-link/spec.md`

## Summary

Add a separate, strictly positive target in mg beside pen selection and a link that round-trips the exact presentation and target through a namespaced URL fragment. Keep target state and validation separate from the additive calculator; if fragment navigation changes the pen, revalidate retained calculation inputs without clearing them. Restore a valid pair atomically before the first state render; update the displayed link after valid edits and invalidate it during malformed input. Preserve existing pen behavior and safety context.

## Technical Context

**Language/Version**: Browser JavaScript ES modules; Node.js 22 or later for tests.

**Primary Dependencies**: Existing static Jekyll/GitHub Pages site and browser APIs; Node built-in test runner. No additional dependencies.

**Storage**: URL fragment for explicitly shared settings only; existing browser language preference remains unchanged. No target persistence or server-side storage.

**Testing**: `npm test` (`node --test`), deterministic DOM/interaction tests and manual phone/desktop checks in `quickstart.md`.

**Target Platform**: Modern phone and desktop browsers, including root and GitHub Pages subpath deployments.

**Project Type**: Static client-side web application.

**Performance Goals**: Field feedback and link updates on each input without submission; usability target is 90% of first-time participants within 60 seconds per language.

**Constraints**: Decimal text and steps must not lose precision; no labelled-dose upper bound on target; no regression in calculation inputs, limits, results or safety messaging; fragment discloses pen and target to link recipients.

**Scale/Scope**: All existing 19 uniquely identified presentations; two shared settings; English and Polish.

## Constitution Check

**Before research — PASS**: The feature has a focused UI and pure settings logic, explicit positive-value validation, exact 1 mg stepping and atomic URL parsing. It preserves existing calculations, privacy boundaries, and non-medical context. Automated boundary and transition tests plus setup documentation are planned. No new dependency or exception is needed.

**After design — PASS**: Shared state is isolated from calculator state; canonical decimal strings avoid floating-point loss; fragment handling fails closed for recognized invalid links, with accessible feedback. Tests cover both valid and invalid boundaries and end-to-end restoration without external services. No exception is required.

## Project Structure

### Documentation (this feature)

```text
specs/009-target-dose-link/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/settings-link.md
└── quickstart.md
```

### Source Code (repository root)

```text
index.html                  # field, controls, target error and anchor
assets/css/style.css        # responsive layout and visible focus
assets/js/app.js            # state transitions and localized rendering
assets/js/pen.js            # existing presentation IDs and defaults
assets/js/calculator.js     # existing calculation contract, unchanged
assets/js/step.js           # existing amount-step behavior, preserved
assets/js/i18n.js           # English/Polish labels and feedback
assets/js/target-settings.js # pure validation, stepping and fragment contract (new)
tests/                      # focused pure and UI integration tests
README.md                   # sharing and local validation guidance
```

**Structure Decision**: Extend the existing static application with one focused pure settings module. Integrate it through the existing UI without including the new field in the four additive inputs. `tasks.md` belongs to the next phase and is not created here.
