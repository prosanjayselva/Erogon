# ERGON Foundation — Website

React + Vite site for ERGON Foundation ("Rooted in Good Deeds"), built from
the provided content brief and the reference homepage design.

## Design system
- **Palette:** deep forest green + warm gold + cream paper (see `src/styles.css` `:root`)
- **Type:** Fraunces (display, serif) + Work Sans (body) — loaded via Google Fonts in `index.html`
- **Signature element:** "The Root Line" (`src/components/RootLine.jsx`) — an animated vine that
  draws itself on scroll and branches into three leaves for People / Pets / Planet. Reused as a
  section divider and step-marker across pages.
- **Motion:** framer-motion scroll reveals (`src/components/Reveal.jsx`), staggered card grids,
  animated mobile nav, hover micro-interactions on cards/buttons.
- **Photography:** all photo spots are elegant placeholder frames (`src/components/PhotoFrame.jsx`)
  with a duotone gradient + icon mark + caption, ready to be swapped for the client's real
  photography — just replace the `<PhotoFrame>` usage with an `<img>`.

## Run locally
```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
```

## Structure
```
src/
├── components/   Header, Footer, Icons, Logo, RootLine, Reveal, PhotoFrame, PageHero
├── data/         content.js — all copy sourced from the client brief, in one place
├── pages/        10 routed pages
├── router.jsx    react-router-dom routes
├── styles.css    full design system (tokens, layout, components, motion)
└── main.jsx
```

## Next steps for launch
1. Swap `PhotoFrame` placeholders for real photography (children, rescued animals, plantation
   drives, team headshots) — the frames already carry the right aspect ratios and captions.
2. Wire the Donate, Volunteer, Contact and Career forms to a backend / email service (currently
   client-side only, with a friendly success state).
3. Drop in the client's final logo artwork in place of `src/components/Logo.jsx`, if different
   from the recreated mark.
