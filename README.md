# Body of Work

Tomás Jacinto's portfolio — React, Vite, Tailwind and Framer Motion, deployed on
Vercel at https://tj-portfolio.vercel.app.

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build into dist/
npm run lint      # ESLint, including accessibility checks
npm run format    # Prettier
```

## Pages

| URL                         | Page                                           |
| --------------------------- | ---------------------------------------------- |
| `/`                         | Intro animation and the numbered index         |
| `/physical`                 | Manufactured, conceptualized, or everything    |
| `/physical/:origin`         | Index of physical projects                     |
| `/digital`                  | Index of digital projects                      |
| `/work/:slug`               | A single project                               |
| `/about`                    | Bio and CV                                     |
| `/inquire`                  | Contact details (not linked from the site yet) |
| `/classic/digital`          | Earlier floating-device layout (hidden)        |
| `/classic/physical/:origin` | Earlier square-card grid (hidden)              |
| `/lines/digital`            | Hairline picture gallery (hidden)              |
| `/lines/physical/:origin`   | Hairline picture gallery (hidden)              |

`vercel.json` sends every path to `index.html` so these URLs work when opened
directly.

## Adding or editing a project

Everything shown lives in [`src/data/projects.js`](src/data/projects.js). Add an
entry with a unique `slug` (it becomes the URL) and pick a `layout`:

- `stages` — a list of `{ title, text, image }` process stages
- `collection` — a list of `{ title, image }` items
- `detail` — a paragraph of `text` and a `link: { label, href }`; digital
  projects also need a `device` (`iphone` or `macbook`) and a `screen` image

Images are Cloudinary URLs. Paste the plain upload URL — `src/lib/cdn.js` adds
the resizing and format options. Set `hidden: true` to keep a project out of the
site without deleting it.

## Layout

```
src/
├── App.jsx            routes and page transitions
├── main.jsx           entry point
├── index.css          base styles and the two shared classes (link-fade, label)
├── data/projects.js   all site content
├── pages/             one component per route
├── components/        Page shell, project sections, intro, cursor, gallery
├── lib/               motion presets, smooth scroll, Cloudinary, navigation
└── styles/            device frame CSS for the digital gallery
scripts/make-logo.cjs  regenerates public/logo.png and og-image.png
```
