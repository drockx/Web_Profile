# Dwayne Rubite — personal profile

A responsive, dependency-free HTML, CSS, and JavaScript portfolio in beige, burlywood, deep brown, and muted khaki.

## Open locally

Open `index.html` directly, or run `npm start` and visit http://127.0.0.1:4173. The local server supports clipboard features in browsers that require a secure context. No dependency installation or build is needed. `npm run check` checks JavaScript syntax.

## Content

The profile, qualifications, education, contact details, and project contributions come from `Rubite_Dwayne_CV.pdf`. The portrait is the user-supplied `Digoy` PNG, stored as `assets/dwayne-portrait.png`. The original PDF is included as a downloadable asset. SparxG and AniMarket artwork is made in HTML/CSS/SVG and labeled as illustration; it is not an actual application screenshot. There are no invented project metrics, repository links, social profiles, or external certification verification claims.

The site includes project category filters, accessible project detail dialogs, skill search and filters, mobile navigation, a FAQ, a downloadable CV and vCard, and an email copy button. The contact form prepares a mailto draft; it does not store or send inquiries and requires an email application. The page remains readable if JavaScript is disabled. Google Fonts are optional external resources with local font fallbacks.

## Personalize

- Edit biography, education, certification, and skill labels in `index.html`.
- Edit full project contributions in the `projects` object in `script.js`.
- Set palette and spacing in `styles.css`; main colors are CSS variables at the top.
- Replace `assets/dwayne-portrait.png`, `assets/Rubite_Dwayne_CV.pdf`, and `assets/dwayne-rubite.vcf` when updating personal details.
- Add real project screenshots, live URLs, or public repository URLs when available. Preserve correct team role attribution.

## Design references

The information structure takes inspiration from [Aljun Cursiga's developer portfolio](https://aljun-cursiga-portfolio.vercel.app/), inspected in the browser. The design is original, using warm typography, editorial spacing, a portrait arch, and illustrated project previews.

Pinterest directions researched before implementation:

- [Warm neutral minimal portfolio](https://in.pinterest.com/pin/photography-portfolio-website-in-beige-gold-brown-warm-neutral-modern-minimal-style--636414991121995293/)
- [White, beige, and brown portfolio](https://ca.pinterest.com/pin/white-beige-brown-fashion-designer-portfolio-002--927319379520748835/)
- [Cream and brown creative portfolio](https://in.pinterest.com/pin/aesthetic-cream-pastel-portfolio-website-template-brown-website-template-creative-website-template-canva-presentation-portfolio-website-etsy-in-2025--917889967808271113/)

Pinterest's full previews were inaccessible; only indexed titles/descriptions informed the initial direction.

## Hosting

This folder is a static site. Deploy `index.html`, `styles.css`, `script.js`, and `assets/` together. Do not publish `tmp/`. The included CV contains the original personal/contact information; review it before public deployment. No site has been published as part of this local implementation.
