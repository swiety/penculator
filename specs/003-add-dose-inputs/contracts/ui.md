# UI Contract: Add Dose Inputs

## Inputs and action

The page exposes a labelled 15 mg pen selector and four labelled numeric entry fields: mg, ml, clicks, and count of 1/40 ml units. Decimal inputs accept `.` and `,`; count inputs accept whole numbers. A calculation action processes all populated fields as additive quantities. Refer to [data model](../data-model.md) for validation and exactness rules.

## Results and errors

On success, show both combined mg and ml with units and per-value approximation indicators where needed. Examples: 15 mg alone → 15 mg and 0.6 ml; 24 fortieths alone → 15 mg and 0.6 ml; 1 mg plus 0.1 ml → 3.5 mg and 0.14 ml. A nonzero click input adds the unverified-assumption context to the result.

On invalid input, zero-only or empty input, a precision-limit failure, or an exact combined amount above one labelled dose, show a corrective explanation and no result. An invalid field prevents a result even if another is valid. Editing any value clears or recomputes a previous result.

## Context and accessibility

Display the pen's four fixed 15 mg/0.6 ml doses, relevant residual-medicine guidance and a link to the patient's leaflet. Beside clicks, identify the 60-click ratio as an unverified assumption and state that the manufacturer advises against counting clicks to select a dose. Explain that conversions are not medical or administration guidance and do not establish deliverability. Place the requested 'not intended for medical purposes' disclaimer at the bottom of the page, accessible on mobile and desktop without horizontal scrolling. Labels and error messages must be associated with the relevant controls and keyboard operable.
