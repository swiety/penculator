# UI Contract: Compact Calculator

## Layout and content

- At 100% zoom with 1 mg entered and no errors, the labels, fields, both step controls per field, click warning and both result values with units are inside the initial visible viewport at 768 × 768 and 390 × 844 CSS pixels. Measure the rendered viewport starting at page scroll position zero; include the site header and actual generated page.
- At 320 CSS pixels and wider and with 200% text enlargement, no horizontal page scrolling or overlapping content; all information remains reachable by vertical scrolling. Long values, validation messages and conditional warnings may increase page height.
- Keep pen selection, guidance, the always-visible click warning, result-specific warning when applicable, approximation indicators, leaflet and other existing limitations available. Warnings must not require expansion or another action.
- Labels and units remain visually and programmatically associated; values and focus indicators do not overlap the controls.

## Interaction and semantics

- Each field retains distinct increase and decrease buttons, accessible names containing field and direction, visible focus, and pointer, keyboard and touch operability. Each button target contains a 24 × 24 CSS-pixel square; aim for larger targets where space allows.
- Preserve tab navigation, text editing, step sizes, immediate recalculation, invalid-input feedback and result removal from `specs/004-live-dose-controls/spec.md`. Do not substitute browser-native number controls if that changes decimal entry or step semantics.
- Error text remains linked to relevant fields and live feedback retains its existing accessible announcement behavior.
