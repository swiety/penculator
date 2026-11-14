# Data Model: Share Link Label

## Sharing instruction

- **Language**: Existing `en` or `pl` selection; determines prefix, link label and suffix.
- **Valid settings**: Existing selected presentation ID and strictly positive target. The standard anchor destination is the unchanged feature 009 settings link, which contains the exact pair.
- **Invalid target**: No visible sharing instruction or actionable stale destination; existing target feedback remains visible.
- **Visibility**: All three sentence components share one container. Language rendering may change their text independently without removing the link or changing its destination.

## State transitions

1. Valid settings show the localized instruction; the anchor label is “link”, while its destination carries the current settings.
2. Valid pen/target edits update only the destination as needed; the visible label remains “link”.
3. Invalid target hides the complete instruction and removes or disables the previous destination; correction restores the instruction and a current destination.
4. Language change replaces sentence segments and preserves selected settings, validity, destination and any existing calculator state.
5. Following an old or current settings link retains the feature 009 restoration and validation behavior.
