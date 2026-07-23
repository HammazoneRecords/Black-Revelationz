# BRANCH_STATUS — Black RevelationZ

**App path:** `active_apps/artise_sites/black-revelationz/`
**Live domain:** N/A (not yet deployed)
**VPS container:** N/A
**VPS port:** N/A (next available: 7012)
**Repo:** `https://github.com/HammazoneRecords/Black-Revelationz`

---

## Current State

| Branch | Last Updated | Deployed? | Notes |
|---|---|---|---|
| master | 2026-06-10 | ⬜ Local only, repo on GitHub | Dev server localhost:5175 |

## Last Action

**Date:** 2026-05-12
**Branch:** main (local only)
**Action:** Full site build — Instagram-clone UI
**What changed:**
- Vite+React+TS+Tailwind v4 scaffold (pnpm)
- Instagram-clone layout: TopBar, ProfileHeader (gold story ring, stats, bio, action buttons), StoriesRow (6 highlights with gold gradient rings), 3-column PostGrid, PostModal lightbox, ReelsFeed (snap-scroll), ArtistPage sub-profiles, mobile BottomNav
- Real label data: Romaine "Sabukie" Allen / Shane "Eyeball" Morgan / Stephen Brown, Kingston JM, 1,916 followers, 129 monthly listeners, 987 website visits
- Adinkra symbols: Gye Nyame (profile name), Dwennimmen (about strip), Sankofa (Legacy highlight + contact modal)
- Spotify: open.spotify.com/artist/77bvWgoc1XRFU4P3UtP0uD
- WorkingDraftBanner removed per owner request
- Screenshots captured: mobile portrait/landscape, tablet portrait/landscape
**Schema migration:** none

---

## Active Feature Branches

| Branch | Purpose | Created | Status |
|---|---|---|---|
| — | — | — | — |

## Pending Merges

- None

---

## History

| Date | Branch | Action | Notes |
|---|---|---|---|
| 2026-05-12 | main | Initial BRANCH_STATUS.md created | Site built locally, not yet on VPS |
| 2026-06-10 | master | Fixed broken local git state (`.git_disabled` had no objects/refs) | Repo was already pushed to GitHub at HammazoneRecords/Black-Revelationz (commit `8e292cf`) — re-init'd local `.git`, set remote, reset to match origin. Still not deployed to VPS. |
