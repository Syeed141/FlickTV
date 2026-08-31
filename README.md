# FlickTv

Premium IPTV marketing site — a cleaner, more capable alternative to basic Neiro-style landing pages.

## Stack

- **Next.js** (App Router) — SEO-friendly vs client-only SPAs
- **Tailwind CSS v4** — custom dark theme (teal + amber accents)
- **Framer Motion** — scroll & hero animations
- **WhatsApp checkout** — validated form → pre-filled message

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customize

Edit `src/lib/site.ts`:

- `whatsappNumber` — your WhatsApp number (country code, no `+`)
- `email`, `location`, `supportHours`

Edit plans in `src/lib/plans.ts`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, features, channels, FAQ, CTA |
| `/plans` | Full plan picker + WhatsApp checkout |

## Color direction

- **Background:** near-black `#030306`
- **Accent:** teal `#2dd4bf` (primary CTA, links)
- **Warm:** amber `#fbbf24` (badges, highlights)

Swap these in `src/app/globals.css` when you lock brand colors.
