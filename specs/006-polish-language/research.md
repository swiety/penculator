# Research: Polish Language Support

## Language detection on a static site

**Decision**: Use the browser-exposed ordered `navigator.languages` list, falling back to `navigator.language` if the list is unavailable or empty, and then English if neither supplies a supported match. Match the `pl` or `en` primary language subtag case-insensitively and respect list order. A valid stored explicit choice takes precedence.

**Rationale**: The static site has no application server that can inspect the incoming request header and tailor its response. Browser-exposed preferences provide the closest client-side signal, but they are not guaranteed to be identical to the actual `Accept-Language` header: browser privacy settings and header formatting can differ. This is a documented approximation of the user's header-based intent, not a claim to read the header. See the [HTML language preference specification](https://html.spec.whatwg.org/multipage/system-state.html#language-preferences) and [HTTP Accept-Language](https://www.rfc-editor.org/rfc/rfc9110.html#name-accept-language).

**Alternatives considered**: Parse the request header on a server (requires new hosting infrastructure outside this static site's scope); use only the first preference (misses a supported language later in the list); infer language from location (does not express the user's stated preference).

## Persistence and accessible selection

**Decision**: Store only an explicit `en` or `pl` selection in browser local storage. Guard both reads and writes against exceptions, ignore invalid values and keep current-page selection in memory. Provide a compact labeled selector with options in their native language, update document language and accessible names, and retain focus.

**Rationale**: An explicit choice should survive later visits without an account while the calculator remains usable when storage is blocked. The [HTML storage specification](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-getter) permits storage access to fail. The [W3C language declaration guidance](https://www.w3.org/International/questions/qa-html-language-declarations) describes declaring document and different-language text for assistive technology.

**Alternatives considered**: Save automatic detection as a preference (would mask later browser preference changes); use a flag-only control (flags do not reliably identify languages); require storage or an account (unnecessary dependency and failure point).

## Translating calculator feedback

**Decision**: Introduce stable, structured error identities and parameters at the calculation/step boundary and render their corresponding localized text at the UI boundary. Keep current field text, selected pen, state and focus intact on language change, including an error created by stepping. Maintain parallel English and Polish message keys and check catalog completeness.

**Rationale**: Existing calculator and step logic throw English prose. Parsing those strings or merely recalculating on switch can lose the origin or meaning of a step error. Structured errors preserve the distinction between calculation state and language while keeping arithmetic and validation unchanged.

**Alternatives considered**: Translate by matching English sentences (fragile); reset inputs on switch (loses user work); recalculate every state on switch without retaining error context (may alter a step-specific error).

## Content and layout validation

**Decision**: Inventory all static and conditional content, including theme-generated title, accessibility labels, errors and warnings, then review Polish translations against the English meaning and test both languages in rendered views. Identify the external English leaflet in Polish. Re-run the feature 005 viewport checks rather than assume they passed.

**Rationale**: Missing state-dependent messages and longer Polish text can undermine safety, accessibility and the compact layout. Prior feature 005 browser verification was not completed.

**Alternatives considered**: Translate only labels or machine-translate warnings without review (misses dynamic content and may alter safety meaning); assume a passing layout from source inspection (does not establish actual rendering).
