# ⚡ My Teams — Live Sports Ticker

A single-page, phone/iPad-friendly ticker for four teams:

| Team | League | 
|------|--------|
| Green Bay Packers | NFL |
| Pittsburgh Steelers | NFL |
| Manchester City | Premier League |
| IFK Norrköping | Superettan |

## What it shows
- **Recent results** per team, plus **"Other results"** feeds for the Premier League
  and Superettan (Swedish football).
- **Live score panel** when a team is playing (score + minute/quarter + status),
  with a pulsing LIVE badge.
- NFL teams shown side-by-side; two-column responsive layout that collapses to one
  column on phones. Auto-refreshes every 60s and on tab focus.

## Data source
All data comes from **TheSportsDB** (`thesportsdb.com`, free public key `3`), which is
**CORS-enabled**, so the page calls it directly from the browser — no backend, no proxy.

> Why not ESPN? ESPN's API blocks browser CORS inconsistently *and* blocks datacenter
> IPs (so a Cloudflare Worker proxy gets 403). TheSportsDB works reliably from the
> browser for all four teams, so the whole thing is a static page again.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
Or just open `index.html`.

## Hosting
- **Cloudflare Worker** (current): `https://<your-worker>.workers.dev`
  — `worker.js` + `wrangler.toml` serve the repo as static assets.
  Deploy: `wrangler deploy` (needs a Cloudflare API token with *Workers Scripts: Edit*).
- Or **GitHub Pages** (public repo) — serve `index.html` from the branch.

## Customising teams
Edit the config objects at the top of the `<script>` in `index.html`.
Find team ids: `thesportsdb.com/api/v1/json/3/searchteams.php?t=<name>`.
Find league ids: from a team record's `idLeague`
(`lookupteam.php?id=<teamId>`), e.g. Allsvenskan=4347, Superettan=4403, EPL=4328.

## Notes / limitations
- TheSportsDB's live in-game detail is coarser than a play-by-play feed (no NFL
  down & distance). Scores, fixtures, results and live status are reliable.
- Free tier has no per-team news articles, so "recent results" stand in for news.
