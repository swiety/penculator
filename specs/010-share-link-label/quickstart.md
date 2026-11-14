# Quickstart and Validation

## Prerequisites and launch

From the repository root, use Node.js 22+, Ruby and Bundler. Install dependencies with `bundle install` if needed, then run:

```sh
npm test
./run.sh
```

Open the address printed by Jekyll. To check a project-site deployment, run `./run.sh --baseurl /penculator` and open the address under `/penculator/`. Stop the server with Ctrl-C. Use non-personal example settings.

## Acceptance checks

1. Run `npm test`; verify the existing link round-trip suite and updated UI tests pass. Record actual results.
2. In English and Polish, confirm the exact sentences in `contracts/sharing-instruction.md`, only “link” is clickable, the full destination is not displayed, and language switching leaves the destination and selected values unchanged.
3. Change pen and target, copy the link address using browser controls, and open it in a fresh tab. Confirm the exact presentation and target restore, including a 0.5 mg pen with an ambiguous strength, a previously generated feature 009 link and the `/penculator/` path.
4. Enter invalid, empty, zero and malformed target values and confirm the full sharing sentence disappears and no old actionable destination remains. Correct the target and verify the sentence and new link return.
5. Use keyboard navigation and a screen reader in each language to identify and activate the link in context. Check phone and desktop layouts. Record which checks were actually performed; do not claim accessibility or usability results without observation.

## Validation record — 2026-11-14

- Before and after the change, `npm test` passed: 28 tests. The updated UI test checks the English and Polish sentence segments, destination preservation, invalid-target hiding and recovery; existing settings-link tests cover presentation round trips and subpaths.
- The browser access host was unavailable, so manual browser copy/open, keyboard and screen-reader checks and phone/desktop visual checks were not performed. These remain outstanding.

## Follow-up validation — 2026-11-14

- `npm test`: 28 tests passed.
- In the Zen desktop browser at the root path, checked the English and Polish instructions, confirmed that changing the target updated the link destination, opened the link by pointer, verified invalid zero target hid it and correction restored it, and focused/activated it using Tab and Enter. Language preference was restored to Polish afterwards.
- The accessibility tree exposed the anchor as a link in its sentence; this is not a screen-reader usability test. Browser copy-link, subpath in the browser, phone layout and screen-reader checks in both languages were not performed and remain outstanding. Automated link tests cover subpath serialization and restoration, but do not replace those browser checks.
