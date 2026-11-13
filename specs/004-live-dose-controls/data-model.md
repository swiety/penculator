# Data Model: Live Dose Controls

## Amount field

- Identity: `mg`, `ml`, `clicks`, or `fortieths`.
- Raw text: empty, valid non-negative numeric text, or invalid/incomplete text. Mg and ml allow decimal point or comma; counts allow only whole numbers.
- Step: 1 mg, 0.1 ml, 1 click, or 1 fortieth, respectively.
- Stepping changes only the selected field. Empty up becomes one step; empty down remains empty. Valid values increase or decrease by exactly the step without snapping; decrease clamps to zero. Invalid, incomplete, negative, or fractional count text is preserved and yields corrective feedback.
- Exact decimal operations preserve fractional offsets; stepping does not impose a maximum on the field. If the total exceeds the existing limit, leave the changed value visible and report the error.

## Live calculation state

- **Empty**: all fields are empty; no result or error.
- **Valid**: at least one positive value, no invalid values, within the existing exact limit and display precision; show current mg and ml with existing approximation and click-assumption context.
- **Invalid**: nonempty input is malformed, negative, zero-only, beyond the exact 15 mg / 0.6 ml limit, or below display precision; show no result and a corrective message.
- Every field edit, paste, clearing or successful step moves to the state determined by current inputs; a failed step on invalid text retains the text and invalid state. Changing from invalid to valid removes the error immediately.

## Relationships and invariants

Four amount fields feed one additive result. Reuse `specs/003-add-dose-inputs/spec.md` for conversion ratios, exact pre-rounding limits, output precision and medical-context constraints. No field or calculation history is persisted.
