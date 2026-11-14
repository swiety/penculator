# Data Model

## Pen presentation

A stable unique identifier selects exactly one immutable presentation. Fields: brand, device, active ingredient, labelled dose in mg, labelled dose count, total contents in mg and ml, conversion basis as exact rational mg/ml, source/basis label, relevant leaflet and product-specific warning. Decimal fields must be representable without binary floating-point error. The original 15 mg Mounjaro alone has the unverified 60-click relationship; other presentations have no click conversion. Unknown IDs must fail closed.

Feature 007: six Mounjaro and seven Ozempic presentations; Ozempic ratio is the labelled dose divided by its labelled dose volume. Feature 008: six Wegovy FlexTouch presentations; ratio is total labelled mg divided by total labelled ml, a mathematical assumption rather than delivered volume. See each spec for the exact catalog.

## Calculation and transition

Inputs are nonnegative decimal mg/ml or nonnegative whole-number clicks/fortieths; at least one value is positive. Sum is at most one selected labelled dose. Output is mg and ml to at most four decimal places, rounded half up, with an approximation flag; reject a positive output that rounds to zero. On selection change clear unsupported click input, revalidate remaining inputs, update context and clear or recalculate results. Invalid selections or inputs cannot retain a valid-looking stale result. Preserve comma/point input and both languages.
