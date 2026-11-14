# UI Contract: Polish Language Support

## Initial and explicit selection

- With no valid saved choice, scan the browser's ordered exposed language preferences and choose the first `pl` or `en` base-language match (case insensitive); skip unsupported tags and fall back to English. `fr, pl-PL, en` selects Polish; `en-GB, pl` selects English.
- A valid explicit browser-local choice wins on later visits. Invalid stored data is ignored; storage read/write failure never prevents the calculator or current-page language switching.
- A compact, labeled control shows the active selection and choices `English` and `Polski`; it works by keyboard, pointer and touch. Keep focus on the control after switching.

## Content and state

- Switching updates every static and dynamic text and accessible name, document language, relevant descriptions, site title/navigation, page title, warnings, disclaimer and visible errors. English destinations of external links are identified in Polish. Preserve the full substance of existing warnings and product limitations.
- Switching must not change selected pen, exact input text, field validity, numeric result, units, approximation indicators or current feedback type. Invalid/incomplete input remains unchanged, with no stale result; step-generated errors also translate.
- Decimal comma and point remain accepted in both languages; underlying conversion, rounding, limit and step rules stay as specified in `specs/004-live-dose-controls/spec.md`.
- At 100% zoom, with 1 mg and no errors, the relevant fields, warning and results fit the initial 768 × 768 and 390 × 844 CSS-pixel viewports in both languages, including the selector and site header. At 320 CSS pixels and 200% text enlargement all content is readable and reachable without horizontal page scrolling; longer warnings and invalid states may require vertical scrolling.

## Failure behavior

The default English page must remain usable if preference detection or storage is unavailable. Language-specific content must not silently mix due to a missing catalog entry; validate complete key coverage before release. Translation updates use text-safe rendering and preserve semantic links and live-region associations.
