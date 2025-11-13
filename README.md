# Vellviez Backend (Node.js + Express) — Live API Integration

This version of the Vellviez backend integrates with **Google Books API** and **TMDB (The Movie Database)**.

## Endpoints
- `GET /api/books/latest` — Fetches newest books (Google Books).
- `GET /api/movies/now_playing` — Fetches movies now playing in theaters (TMDB).
- `GET /api/movies/popular` — Fetches popular movies (TMDB).
- `GET /api/movies/ott?region=US` — Attempts to fetch movies with watch/providers (TMDB) filtered by region (optional).

## Setup
1. Copy `.env.example` to `.env` and add your API keys:
   - `TMDB_API_KEY` (required): Get from https://www.themoviedb.org/settings/api
   - `GOOGLE_API_KEY` (optional): Google Books API key (can work without for low-volume)

2. Install dependencies:
```bash
npm install
```

3. Run locally:
```bash
npm run dev
# or
npm start
```

4. Example:
```
GET http://localhost:8080/api/books/latest
GET http://localhost:8080/api/movies/now_playing
GET http://localhost:8080/api/movies/ott?region=US
```

## Notes
- The TMDB `/ott` endpoint uses `discover` with `with_watch_providers` and may require mapping provider IDs for specific services. The endpoint returns results using TMDB metadata.
- This project is intentionally small and focused — you can extend it with caching, DB persistence, authentication, and better error handling.
