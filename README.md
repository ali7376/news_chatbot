# Nukta — World News, Explained

A responsive world-news frontend (Next.js) with article cards, a YouTube-style
video shelf, category/country/language filters, saved stories, and an AI news
assistant (Nukta AI) grounded only on the verified articles shown on the page.

## 1. Install

```bash
npm install
```

## 2. Set up your environment file

Copy `.env.example` to `.env.local` in the project root:

```bash
cp .env.example .env.local        # macOS/Linux
copy .env.example .env.local      # Windows
```

Then fill in:

| Variable          | Required | Where to get it |
| ------------------ | -------- | ---------------- |
| `GEMINI_API_KEY`   | **Yes**  | Free key from [Google AI Studio](https://aistudio.google.com/apikey) — sign in with a Google account, click "Create API key". |
| `YOUTUBE_API_KEY`  | **Yes** (for the video shelf) | Free key from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials): create/select a project → **Create Credentials → API key**, then enable **YouTube Data API v3** for that project ([enable it here](https://console.cloud.google.com/apis/library/youtube.googleapis.com)). |
| `AI_MODEL`         | No       | Defaults to `gemini-3.5-flash-lite`. |
| `GNEWS_API_KEY`    | No       | Free key from [GNews](https://gnews.io/). Without it, the homepage shows curated demo stories instead of live headlines — everything else still works. |

Without `GEMINI_API_KEY`, the chat assistant won't work. Without
`YOUTUBE_API_KEY`, the video shelf falls back to demo videos.

## 3. Run it

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## Deploying (e.g. Render)

- **Build command:** `npm install && npm run build`
- **Start command:** `npm run start`
- Add `GEMINI_API_KEY`, `YOUTUBE_API_KEY`, and optionally `AI_MODEL` /
  `GNEWS_API_KEY` as environment variables in your hosting dashboard (`.env.local`
  is never uploaded — it's git-ignored).

## Project structure

- `app/page.tsx` — page layout and all interactions (filters, saved stories, chat).
- `app/globals.css` — the full responsive visual design.
- `app/api/chat/route.ts` — sends the question + on-page articles to Gemini.
- `app/api/youtube/route.ts` — fetches videos from YouTube Data API v3.
- `app/api/news/route.ts` — fetches live headlines/search results from GNews.
- `data/news.ts` — demo content shown before live data loads / if a request fails.
- `lib/rate-limit.ts` — simple per-IP rate limiting for the API routes.
