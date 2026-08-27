# Contract Template Generator

A full stack web application that turns a form submission into a print ready PDF contract. Built for musicians and freelancers who need to send professional agreements without paying for contract software.

**Stack:** Next.js, React, Supabase (PostgreSQL), Tailwind CSS, puppeteer-core, @sparticuz/chromium, deployed on Vercel

## What it does

1. User signs in and fills out a contract form with client details, scope, dates, and rates
2. The submission is written to a relational Postgres schema in Supabase
3. The server renders the stored record into a print ready PDF
4. A documents table lists every contract, with dynamic routing to an individual page for each row

## What I built

**Relational database design.** Designed the Postgres schema with table relationships and foreign key constraints so contracts, clients, and users stay linked and referentially intact.

**Authentication.** Implemented user auth through Supabase so each account only sees its own documents.

**PDF generation inside Vercel's size limit.** The first working version used full Puppeteer, which ships its own Chromium binary and pushed the serverless function past Vercel's bundle size limit. Deploys failed. I migrated to `puppeteer-core` paired with `@sparticuz/chromium`, a Chromium build compiled specifically for serverless environments, which brought the bundle under the limit and got the deploy through.

**Dynamic routing.** Every row in the documents table routes to its own page, so a contract can be reviewed and re-exported without filling the form again.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Requires a Supabase project. Add your project URL and anon key to `.env.local`.

## Status

In active development.

---

Built by Mario Venneri &middot; [nect.studio](https://nect.studio) &middot; [LinkedIn](https://www.linkedin.com/in/mario-venneri/)
