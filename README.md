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

## Data sources
- **NFL** — `api.nfl.com` (NFL.com's own API). An anonymous token is minted client-side
  using the public client key embedded in NFL.com's site JS (no login, no cost); the API
  sends CORS `*`, so it's called directly from the browser. Gives **live play-by-play**:
  down & distance, possession, quarter/clock, red-zone, and scoring/big plays.
- **Football (Man City, Norrköping, league feeds)** — **TheSportsDB** (free key `3`,
  CORS-enabled). Live **match events** (goals ⚽, cards 🟥🟨, subs 🔁) come from its
  `lookuptimeline.php` endpoint during a live game.

Refresh adapts: **25s** while any game is live, **60s** otherwise.

> Reliability note: the NFL path uses NFL.com's public-but-unofficial client key. If NFL
> rotates it or changes the schema, each NFL card falls back to TheSportsDB automatically
> (score only), so the page never goes blank.

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
