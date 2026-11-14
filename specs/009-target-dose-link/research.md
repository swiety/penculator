# Research: Target Dose and Shareable Link

## Decimal representation and steps

**Decision**: Validate decimal text with the existing accepted grammar, canonicalize comma to point for the link, and use exact decimal integer/rational arithmetic for target +/- 1 mg. Refuse a step that would make a target non-positive; preserve invalid text.

**Rationale**: Target input permits fractions and values above the selected dose without precision loss. Existing `step()` clamps to zero and permits empty input, so its semantics cannot be reused unmodified for a strictly positive target. The existing additive fields must retain their behavior.

**Alternatives considered**: Floating-point arithmetic risks drift; changing global `step()` behavior would alter existing calculation controls.

## Fragment contract and restoration

**Decision**: Reserve `#settings?pen=<id>&target=<decimal>` for this feature, using stable existing presentation IDs and encoded parameter values. Use an explicit recognized prefix, validate strict percent escapes and UTF-8, require exactly one of each allowed key and no other keys, validate the presentation and positive decimal, then commit both values together. Canonical output uses point decimal notation. Preserve the current origin, path and query when constructing the link; do not include other user inputs in its fragment.

**Rationale**: A namespace distinguishes unrelated anchors; exact presentation IDs disambiguate pens; atomic validation prevents combining an unrelated target with a fallback pen. Keeping the page location supports project-site base paths. A fragment is not sent in ordinary HTTP requests but is visible to link recipients and local browser history.

**Alternatives considered**: Brand plus dose is ambiguous; query parameters change the request URL; trusting permissive URL parsing without checking malformed escapes can accept corrupt input. Auto-updating the browser address is not required; expose an anchor and handle its navigation explicitly.

## State transitions and feedback

**Decision**: Initialize defaults, parse recognized fragment before first render, apply a valid pair atomically or keep defaults with localized link error. Direct pen changes reset target to that pen's labelled dose. Target edits and steps update only target, target feedback and link; they do not call the calculation update path. A later valid fragment navigation is processed as an atomic settings transition. If it changes the pen, revalidate retained calculation inputs without clearing them; an unsupported retained click input yields an error, not a stale result. Existing click-reset behavior on a direct pen change remains intact. New target controls must not match the existing generic calculation-control selector unless that handler is changed to exclude them.

**Rationale**: Initial linked target must not be overwritten by default selection handling; target edits must not disturb existing results or errors. Unknown fragments remain ordinary anchors.

**Alternatives considered**: Triggering the pen selector change during restoration could reset the linked target or clear existing calculation inputs; using the shared calculator error region could erase an unrelated error.

No technical clarifications remain. `specs/009-target-dose-link/spec.md` defines the user-facing scope and medical limitations.
