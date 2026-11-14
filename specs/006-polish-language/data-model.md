# Data Model: Polish Language Support

## Language preference

- **Supported values**: `en`, `pl`.
- **Source**: valid explicitly saved browser-local selection; otherwise the first supported language from the browser's ordered language list; if that list is unavailable or empty, use the single browser language; otherwise `en`.
- **Matching**: normalize case and match the base language of valid language tags, so `pl-PL` and `en-GB` match; skip unsupported or malformed entries. Invalid saved values are ignored.
- **Transitions**: Initialization selects a language without saving an automatic choice. Selecting a supported language updates the current language immediately and attempts to save it. Storage read/write exceptions are caught; current-session switching still works.

## Localization catalog

Each supported language maps the same stable content keys to text for all static and conditional UI, accessible names and errors. Product names, mathematical notation and standardized units can remain identical. Maintain parameters separately from translation text for field-specific validation and dose values; never interpolate untrusted input as markup. A missing key is a defect found by catalog completeness tests, not a reason to silently present mixed languages.

## Calculator and feedback state

- Existing pen, exact field text, validity, current result and approximation indicators remain authoritative; switching language does not mutate them.
- Validation failures carry stable error identifiers and any safe parameters, including the affected field, independently of translated display text. Keep the current error identity and context so a language change re-renders it, including errors produced by a step action. Preserve current English behavior and error coverage.
- Empty form has neither result nor error; valid input shows current result; invalid input hides it and shows current error. A language change changes only displayed language and accessible metadata, not these transitions.
- Preference persists across reloads if storage is available; calculation inputs do not gain persistence.
