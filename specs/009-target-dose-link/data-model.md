# Data Model: Target Dose and Shareable Link

## Selected presentation

- Existing unique stable `id` identifies one catalog entry; its `doseMg` is the default target.
- A valid shareable setting must identify exactly one supported entry; unknown IDs never silently map to another entry.

## Target amount

- Separate text field and parsed positive decimal amount in mg. Accept digits with optional complete `.` or `,` fraction; reject empty, zero, negative, malformed and incomplete text. No maximum based on labelled dose.
- Keep text and validation state separate from calculator inputs and their errors. Canonical serialization uses a point and preserves the exact numerical value, including fractional values; avoid binary floating point.
- Increasing/decreasing adds/subtracts exactly 1 mg. Invalid text is unchanged; a decrement to zero or below leaves the positive value unchanged and reports the boundary.

## Shared settings link

- Exactly one presentation ID and one valid target amount, serialized as defined in `contracts/settings-link.md`; no amounts from the calculator, language preference or other personal data.
- A valid state shows the current link. An invalid target hides or disables the actionable link and removes any stale destination; correction regenerates it.

## Transitions

1. Initialize default pen and its labelled dose; parse the initial fragment before the final UI render. A recognized, valid fragment replaces both atomically; an invalid recognized fragment applies neither and produces link feedback; an unrelated or absent fragment leaves defaults without link feedback.
2. A direct pen selection resets target to its labelled single dose, clears target validation and refreshes the link. Preserve the existing pen-change calculation and click rules.
3. A target edit or step updates only target state, target feedback and link. Existing calculation inputs, results and calculation errors stay unchanged.
4. Navigating to another recognized fragment, including via the displayed anchor, applies the same atomic validation; unrelated fragments are ignored. Do not clear or modify calculation inputs during fragment restoration. If the pen changes, recalculate or invalidate the result under the new pen; retained unsupported clicks produce a calculation error. If only the target changes, preserve the existing result and error. A later direct selection follows transition 2.
5. A language switch changes labels and feedback without changing numeric settings, link or calculation state.
