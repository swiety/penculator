# Quickstart and Validation

## Prerequisites and launch

From the repository root, install Node.js 22+, Ruby and Bundler. Run `bundle install` if needed, then:

```sh
npm test
./run.sh
```

Open the address printed by Jekyll. For a project-site path, run `./run.sh --baseurl /penculator` and open the printed address with `/penculator/` appended. Stop the server with Ctrl-C. Do not use real patient information in test links.

## Acceptance checks

1. Run `npm test` and verify the existing calculator tests and new target/link unit and UI tests pass. Test every catalog presentation's default and round-trip; record outcomes.
2. Select Mounjaro 15 mg: target starts at 15. Set 7.5, press plus and minus, and confirm 8.5 then 7.5. Enter 16 and confirm it is accepted while existing calculation limits remain unchanged. Test comma/point and positive lower boundary.
3. Select Ozempic 0.5 mg, 2 mg/3 ml, set target 0.25, copy the displayed link and open it in a fresh page. Verify the exact pen and target, including with `/penculator/`; change pen and check target resets to its new labelled dose.
4. After a valid link, test empty, zero, negative, malformed and incomplete target text, plus/minus on invalid text and correction. Verify no stale actionable link remains. Open recognized fragments with missing, duplicate, malformed or unsupported settings and confirm atomic default fallback and localized feedback; unrelated fragments show no link error.
5. Enter calculator inputs and show a result, then edit/step target and follow a settings link. Confirm the additive fields and their result/error remain unchanged by target-only operations, and that the new link excludes those fields and language. Follow a link selecting a different pen: inputs remain intact, while the result is recalculated or rejected under the new pen, including any now-unsupported clicks. Verify direct pen-change behavior separately.
6. Check English and Polish labels, target and link errors, focus names and controls on phone and desktop without horizontal scrolling. Test the first-time user target in the specification separately; record unavailable checks and do not claim it passed without participant results.

Contract examples and exact validation rules are in `contracts/settings-link.md`; state transitions are in `data-model.md`.
