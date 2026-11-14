# Research: Share Link Label

## Localized sentence with native anchor

**Decision**: Use a container with independently translated prefix, native anchor label and suffix. The English sentence is “Share this link with preselected pen type and target value”; the Polish sentence is “Udostępnij ten link z wybranym rodzajem pena i zamierzoną dawką”. Keep the anchor as the sole clickable part.

**Rationale**: Existing localization sets `textContent` on each translated element. Translating a parent containing the link would remove the anchor, and assigning generated URL text to the anchor would defeat the request. Separate nodes retain normal link semantics and allow the two languages' surrounding text.

**Alternatives considered**: Injecting a translated HTML string adds unnecessary markup parsing; a button or custom click handler loses standard browser copy-link behavior; displaying the whole URL is the behavior being replaced.

## Destination and visibility

**Decision**: Keep `settingsLink()` and fragment parsing from feature 009. On valid state set the native anchor's destination and show the entire sentence; on invalid target hide the entire container and remove the old destination. Language switches only change text, never the selected pen, target or destination.

**Rationale**: The current renderer already generates correct destinations but overwrites link text and hides only the anchor, leaving its explanatory prefix. A single visibility boundary prevents an orphaned instruction and a stale link.

**Alternatives considered**: Hiding only the anchor leaves misleading text; rebuilding the URL format risks old links and exact presentation identity. No unresolved technical clarification remains.
