<!--
Sync Impact Report
Version change: unversioned scaffold → 1.0.0
Modified principles: none; the previous document contained only template placeholders.
Added principles: Clear and Focused Code; Correctness at Boundaries; Meaningful Tests;
  Maintainable Design; Explicit Dependencies and Documentation.
Added sections: Quality Standards; Development Workflow.
Removed sections: none; placeholder sections were replaced.
Follow-up TODOs: none.
Remove this report before committing the constitution.
-->
# Penculator Constitution

## Core Principles

### I. Clear and Focused Code

Code MUST express its purpose through clear names and small, cohesive units. Each change MUST
address the requested behavior without unrelated refactoring. Duplication MUST be removed when
it obscures a shared rule; abstractions MUST have a present use rather than anticipate hypothetical
features. These rules keep the application understandable as it grows.

### II. Correctness at Boundaries

User input MUST be validated before it is used in a calculation, and invalid input MUST produce
an understandable error instead of a misleading result. Calculation units, precision, rounding,
and supported limits MUST be explicit in the relevant specification and implementation.
Changes to calculation behavior MUST be checked against independently derived examples and
boundary cases. Product assumptions and limitations MUST remain visible where users need them.

### III. Meaningful Tests

Behavior changes MUST be accompanied by automated tests appropriate to their risk. Tests MUST
verify observable behavior and meaningful failure cases rather than mirror implementation details.
Calculation tests MUST cover representative values, boundaries, invalid input, and rounding.
Corrections to defects MUST include a regression test when the defect can be reproduced
automatically. Reversible, low-impact changes may be verified without new automated tests when
the change record explains the verification performed.

### IV. Maintainable Design

Calculation rules MUST be separable from presentation so that each can be understood and tested
independently. Components and interfaces MUST have a single clear responsibility and avoid hidden
shared state. Changes MUST preserve existing behavior unless a specification explicitly changes
it. Complexity and new dependencies MUST be justified by a current requirement.

### V. Explicit Dependencies and Documentation

The project MUST document how to set up, run, and verify the application as those capabilities
are introduced. External dependencies MUST have a stated purpose and MUST be kept to those needed
for current functionality. Documentation MUST be updated when a change makes existing setup,
usage, or verification instructions inaccurate.

## Quality Standards

- Supported behavior and acceptance criteria MUST be defined before implementation.
- User-facing results MUST identify their units and distinguish approximations from exact values.
- Changes MUST preserve the product's stated limitations and MUST NOT present mathematical
  calculations as medical advice or instructions for administering medication.
- Tests MUST be deterministic and independent of execution order; external services MUST NOT be
  required for routine calculation tests.

## Development Workflow

- Each change MUST be reviewed against the relevant specification and these principles.
- Before a change is considered complete, the contributor MUST run the checks appropriate to
  the affected behavior and record the results, including any checks that could not be run.
- A failing required check MUST be fixed before completion or explicitly reported with its cause
  and remaining risk.
- Any exception to a principle MUST state its scope, rationale, risk, and plan for resolution in
  the change record and receive maintainer approval.

## Governance

This constitution governs project design, implementation, and review. Plans, specifications, and
changes MUST be checked for compliance; conflicts MUST be resolved before implementation or handled
as an approved exception under the Development Workflow.

Amendments MUST describe the proposed change and its impact, receive maintainer approval, update
this document and its version, and identify any necessary follow-up work. Versioning follows
semantic versioning: MAJOR for incompatible removal or redefinition of governance, MINOR for new
or materially expanded principles, and PATCH for clarifications or non-semantic edits. The
ratification date records initial adoption; the last-amended date changes when the constitution
changes.

**Version**: 1.0.0 | **Ratified**: 2026-11-13 | **Last Amended**: 2026-11-13
