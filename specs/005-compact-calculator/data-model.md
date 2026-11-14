# Data Model: Compact Calculator Layout

No persisted data, new entities, or calculation rules are introduced. These existing presentation states must remain intact:

- **Pen selection**: Selected product and its existing fixed-dose information.
- **Amount field**: Label, unit, text value, field-specific accessible adjustment controls and validation relationship. Its value is either empty, valid, or invalid; the existing validation and step rules apply.
- **Live result**: For a valid positive combined amount, the current mg and ml values, units and any approximation indicators. It is absent for empty, zero-only or invalid input as specified in `specs/004-live-dose-controls/spec.md`.
- **Feedback and context**: Input guidance, error feedback, always-visible click-assumption warning, conditional result click warning, and product/non-medical context.

A change to any field transitions the live result or error immediately according to the existing specification. A layout change must never retain a stale result, hide the current error, or alter another field. See [UI contract](contracts/ui.md).
