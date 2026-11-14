# Sharing Instruction Contract

## Visible content and accessibility

- English: “Share this link with preselected pen type and target value”; Polish: “Udostępnij ten link z wybranym rodzajem pena i zamierzoną dawką”. In both, only “link” is a native actionable anchor; the destination address is not visible in the instruction.
- Keep the anchor within its sentence so its purpose is understandable in context. It must accept keyboard focus and activation and permit normal browser link-address copying. Verify its accessible name and context with a screen reader; do not claim that a standalone generic label conveys context in every screen-reader navigation mode.
- Translating the prefix, label and suffix must preserve the anchor element and destination, with correct whitespace in both languages.

## Link behavior

- With valid target settings, destination generation, exact presentation identity, fragment format and restore behavior follow `specs/009-target-dose-link/contracts/settings-link.md`. Updates after pen or target changes affect the destination, not the concise label.
- With invalid target text, hide the entire sentence and make the previous destination non-actionable; after correction show the localized sentence and destination for current settings.
- Language switching does not change destination, selected settings or calculator inputs/results. Existing links, including subpath links and previously generated fragments, remain valid.
