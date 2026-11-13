# Data Model: Add Dose Inputs

## Pen type

- Identity: Mounjaro 15 mg KwikPen, the sole selectable type.
- Labelled dose: 15 mg in 0.6 ml; four fixed doses.
- Mathematical click assumption: 60 clicks per labelled dose; unverified for device dosing.
- Relationship: One pen type is selected for each calculation; no persistence is required.

## Calculation inputs

- `mg` and `ml`: optional non-negative decimal strings, accepting a decimal point or comma.
- `clicks` and `fortieths`: optional non-negative integer strings; each fortieth is 1/40 ml.
- At least one supplied value must be positive. Empty fields contribute zero; a zero field can accompany a positive field. Reject malformed input or any negative value even when another field is valid.
- Treat every populated input as a separate amount; add all equivalents before rounding. Reject exact totals above 15 mg or 0.6 ml.

## Calculation result

- Exact amount in mg and ml, derived using 25 mg/ml, 0.25 mg/click as an assumption, and 0.025 ml per fortieth. These are arithmetic relationships, not delivery instructions.
- Displayed mg and ml: at most four fractional digits, rounded to nearest with ties away from zero. Mark a displayed value approximate when rounding changed it; reject any positive amount whose displayed mg or ml would be zero.
- A result associated with nonzero clicks identifies the click assumption as unverified.

## State transitions

Initial/edited → valid result when a valid calculation is requested; initial/edited → error for invalid inputs or limits. Editing any input clears or recomputes the result. Correcting an error permits another calculation; no history is retained.
