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
