# Kings Agent QA site

Internal QA site for the Kings Agent (@KingsAgent on KingsChat).

- `index.html` - what the Kings Agent is, and what it is not (agent vs chat bot)
- `qa.html` - every feature, with what to try, what good looks like, a tick box and a feedback form
- `admin.html` - every feedback entry, grouped by feature, in feature order. No password, by design

## How the pieces work

- Ticks (tested / not tested) live in the tester's browser, key `kcqa.tested.v1`.
- Feedback is written to the Firestore collection `qa_feedback` in the `kings-agent` Firebase
  project, through the public web config in `assets/firebase-config.js`. Security rules allow
  `read` and `create` on that one collection and nothing else; update and delete are denied.
  No app data is reachable from this page.
- The features live in `assets/features.js`. **The newest feature goes at the TOP of the array.**
  That array order is the page order. See the header comment in that file.

## Adding a feature (the standing rule)

1. Add the entry to the top of `window.KC_QA.features` in `assets/features.js`, with today's date
   in `added`.
2. Commit and push. GitHub Pages publishes in about a minute.
3. Tell the tester which feature is new. Everything else on the page stays as it is.

Never append a new feature to the bottom, and never sort the array.
