# Abeer Alkhmese — Portfolio

A single-page personal portfolio built with plain **HTML, CSS and JavaScript**. No build step, no
dependencies, no framework — every host that can serve static files can serve this.

```
Portfolio/
├── index.html   # all content (about, skills, experience, projects, education, contact)
├── styles.css   # design system + responsive layout
├── script.js    # nav, scroll reveal, typing effect, counters, project filters
└── assets/
    └── Abeer-Alkhmese-AI-Engineer-CV.pdf
```

## Run it locally

Just double-click `index.html`. Or, for a local server:

```bash
npx serve .
```

## Deploy — Vercel (current setup)

`vercel.json` is already configured: no build step, clean URLs, cache headers on `/assets`, and basic
security headers. From **this folder**:

```bash
npx vercel login
```

```bash
npx vercel --prod
```

First run asks a few setup questions — accept the defaults:

| Prompt | Answer |
| --- | --- |
| Set up and deploy? | **Y** |
| Which scope? | your own account |
| Link to existing project? | **N** |
| Project name? | e.g. `abeer-portfolio` (becomes the URL) |
| In which directory is your code located? | `./` — press Enter |
| Want to modify the settings? | **N** |

Live at `https://<project-name>.vercel.app`. **To publish an update later**, re-run `npx vercel --prod`
from this folder — same URL, no re-login.

### Optional: auto-deploy from GitHub

Push this folder to a GitHub repo, then on vercel.com → *Add New → Project → Import* that repo.
Framework preset **Other**, build command **none**, output directory **`./`**. After that every
`git push` deploys automatically.

### Custom domain

Vercel dashboard → your project → *Settings → Domains*. A domain like `abeeralkhmese.com` costs roughly
$10–15/year from any registrar; Vercel walks you through the DNS records and issues HTTPS free.

### Other hosts

The site is plain static files, so it also works as-is on Netlify (drag the folder onto
[app.netlify.com/drop](https://app.netlify.com/drop)), GitHub Pages, or Cloudflare Pages. There is no
build command and no output directory to configure — the folder root **is** the site.

## Color palette

Defined once as CSS custom properties at the top of `styles.css`:

| Token | Hex |
| --- | --- |
| `--dark-amethyst` | `#10002b` |
| `--dark-amethyst-2` | `#240046` |
| `--indigo-ink` | `#3c096c` |
| `--indigo-velvet` | `#5a189a` |
| `--royal-violet` | `#7b2cbf` |
| `--lavender-purple` | `#9d4edd` |
| `--mauve-magic` | `#c77dff` |
| `--mauve` | `#e0aaff` |

## Editing

- **Text, projects, jobs** → `index.html`. Each section is marked with a comment banner.
- **Add a project** → copy an `<article class="card project" data-cat="...">` block. `data-cat` is one of
  `ai`, `web`, `csharp` and drives the filter buttons.
- **Colors** → the `:root` block in `styles.css`. Change a token and it updates everywhere.
- **Hero rotating titles** → the `phrases` array in `script.js`.
- **New CV** → replace `assets/Abeer-Alkhmese-AI-Engineer-CV.pdf`, keeping the same filename.

## Responsive behaviour

Tested with no horizontal overflow at 320, 360, 375, 390, 430, 768, 812×375 (landscape phone),
834, 1024, 1280, 1440, 1536 and 1920 px.

| Breakpoint | What changes |
| --- | --- |
| `≤ 960px` | Hero and About drop from two columns to one |
| `≤ 900px` | Nav collapses to the hamburger drawer — covers every iPad in portrait (768 / 810 / 820 / 834) |
| `≤ 620px` | Stat tiles stack to one per row (number beside label), brand name hides, contact CTA stacks |
| `≤ 380px` | Tighter gutters and cards, full-width hero buttons (iPhone SE) |
| `≤ 480px tall, landscape` | Vertical padding trimmed for a phone held sideways |

Grid tracks use `minmax(min(300px, 100%), 1fr)` so a card can never be wider than the screen on a
320px phone. The drawer menu is height-capped with `100dvh` and scrolls internally, so every link
stays reachable in landscape.

**Touch handling:** `@media (hover: none)` removes hover lifts that would otherwise stick after a tap
on an iPhone or iPad, replacing them with a press effect; `@media (pointer: coarse)` grows filter
buttons and nav links to comfortable finger-sized targets. Safe-area insets keep content clear of the
notch, and `text-size-adjust` stops iOS Safari inflating text on rotation.

## Notes

- Fonts load from Google Fonts (Sora, Inter, JetBrains Mono) with system fallbacks.
- Respects `prefers-reduced-motion`, includes a skip link, keyboard-accessible mobile menu and focus styles.
- Includes a print stylesheet, so the page prints cleanly to PDF.
