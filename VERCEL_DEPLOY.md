# Deploying to Vercel

This is the Vercel-specific path. For a self-managed Linux VPS instead, see [DEPLOY.md](DEPLOY.md).

Two things differ from a VPS deploy and must be handled up front:

1. **Media storage** — Vercel's filesystem is read-only and ephemeral outside a request, so the
   Media collection's default local-disk uploads (`staticDir: 'media'`) don't work. This project
   ships `@payloadcms/storage-vercel-blob`, wired up in `src/payload.config.ts` to activate
   automatically whenever `BLOB_READ_WRITE_TOKEN` is set — no code changes needed.
2. **Build-time DB access** — `pnpm build` statically generates pages from MongoDB, so the
   database must be reachable (and, ideally, already have content) *before* the first deploy —
   not just at runtime. A local-only Mongo instance won't work; use MongoDB Atlas (or any
   MongoDB reachable from the public internet).

## 1. MongoDB Atlas

1. Create a free/shared or dedicated cluster at https://cloud.mongodb.com.
2. Database Access → add a user with a strong password.
3. Network Access → add `0.0.0.0/0` (Vercel has no static outbound IP, so an IP allowlist isn't
   workable unless you use Vercel's MongoDB Atlas integration, which handles this for you).
4. Copy the connection string (`mongodb+srv://...`) — this is your `DATABASE_URI`.

## 2. Import the project into Vercel

Use the GitHub import flow (Vercel → Add New → Project → import
`PratushDev/river-bank-jungle-resort`), or the link you already have open. Framework preset
should auto-detect as Next.js.

**Before clicking Deploy**, add the environment variables below (Project Settings →
Environment Variables), for both **Production** and **Preview**:

| Variable | Value |
| --- | --- |
| `DATABASE_URI` | your Atlas `mongodb+srv://` connection string |
| `PAYLOAD_SECRET` | a long random string — `openssl rand -hex 32` |
| `NEXT_PUBLIC_SERVER_URL` | `https://riverbankjungleresort.com.np` (or your Vercel URL until the domain is attached — see step 5) |
| `CONTACT_NOTIFY_EMAIL` | `info@riverbankjungleresort.com.np` |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | optional, only if enquiry emails should send |

`BLOB_READ_WRITE_TOKEN` gets added in the next step.

## 3. Create the Blob store

Project → Storage → Create Database → **Blob** → connect it to this project. Vercel injects
`BLOB_READ_WRITE_TOKEN` into the project's env vars automatically for all environments — no
manual copy/paste needed. Redeploy is required for it to take effect if the store is created
after the first deploy.

## 4. Seed the database (first deploy only)

The build reads from `DATABASE_URI` to statically generate pages, so the Atlas database needs
content (or at minimum the collections/admin user) before the first successful build. From your
own machine, pointed at Atlas:

```bash
DATABASE_URI="<your atlas connection string>" PAYLOAD_SECRET="<same secret you set in Vercel>" pnpm seed
```

This creates the admin user and demo content (rooms, dining, experiences, blog, FAQs, images).
It's idempotent — safe to re-run. Skip this only if you're migrating an existing populated
database instead.

> Uploaded images from `pnpm seed` go through Payload's upload pipeline, so they land in Vercel
> Blob automatically once `BLOB_READ_WRITE_TOKEN` is set — no separate media migration step.

## 5. Deploy, then attach the domain

Trigger the deploy (or it runs automatically once env vars are set). Once it's live:

- Point `riverbankjungleresort.com.np` DNS at Vercel (Project → Settings → Domains → Add).
- If `NEXT_PUBLIC_SERVER_URL` didn't already match the final domain, update it and redeploy —
  it's inlined at build time (canonical URLs, OG tags, sitemap, JSON-LD all depend on it).

## 6. Go-live checklist

- [ ] Change the seeded admin password (`/admin` → Users)
- [ ] Replace placeholder images with resort photography (Media collection)
- [ ] Fill real Booking.com / TripAdvisor / MakeMyTrip listing URLs in Site Settings → Links
- [ ] Confirm DNS + the legacy-URL 301s (e.g. `/rooms-suites` → `/rooms`, see `next.config.ts`)
- [ ] Submit `https://riverbankjungleresort.com.np/sitemap.xml` in Google Search Console
- [ ] Replace placeholder Privacy Policy / Terms with counsel-reviewed text
- [ ] Turn on Atlas's own backup schedule (Vercel Blob has no separate backup — treat Media as
      re-derivable from source photos, or export from the admin panel periodically)

## Notes

- **ISR:** content edited in `/admin` refreshes on the live site within 1 hour, or immediately
  on a redeploy — there's no need to redeploy after every content change.
- **Function duration:** `vercel.json` sets `maxDuration: 60` for the Payload admin/API routes,
  since image-heavy uploads (Payload generates 4 resized variants per image via `sharp`) can run
  past Vercel's default limit. 60s works on every Vercel plan, including Hobby.
- **Updating:** pushing to the connected branch redeploys automatically — no manual `pm2
  restart` step like the VPS path.
