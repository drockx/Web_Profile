# Dwayne Rubite — personal profile

A responsive, dependency-free HTML, CSS, and JavaScript portfolio in beige, burlywood, deep brown, and muted khaki.

## Open locally

Run `npm start` and visit http://127.0.0.1:4173. The site uses native ES modules, so serve it over HTTP instead of opening the HTML file directly. No dependency installation or build is needed. `npm run check` validates JavaScript syntax and module imports; `npm test` runs domain and adapter tests.

## Content

The profile, qualifications, education, contact details, and project contributions come from `Rubite_Dwayne_CV.pdf`. The portrait is the user-supplied `Digoy` PNG, stored as `assets/dwayne-portrait.png`. The AniMarket showcase uses the supplied `assets/animarket-logo.png`. The credentials section displays the supplied `assets/database-certificate.png`, with a full-size link. The certificate's verification code is not manually transcribed from the low-resolution image; view the document for its details. The original PDF is included as a downloadable asset. Only AniMarket is featured on the portfolio page. There are no invented project metrics, repository links, social profiles, or external certification verification claims.

The site includes an accessible project detail dialog, skill search and filters, mobile navigation, a FAQ, a downloadable CV and vCard, and an email copy button. The project controller supports category filters when more projects are added. The contact form prepares a mailto draft; it does not store or send inquiries and requires an email application. The page remains readable if JavaScript is disabled. Google Fonts are optional external resources with local font fallbacks.

## Personalize

- Edit biography, education, certification, and skill labels in `index.html`.
- Edit full project contributions in `src/data/projects.js` and profile configuration in `src/data/profile.js`.
- Set palette in `src/styles/tokens.css` and layout in the focused stylesheets imported by `styles.css`.
- Replace `assets/dwayne-portrait.png`, `assets/Rubite_Dwayne_CV.pdf`, and `assets/dwayne-rubite.vcf` when updating personal details.
- Add real project screenshots, live URLs, or public repository URLs when available. Preserve correct role attribution.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the dependency diagram, SOLID mapping, feature modules, adapter contracts, lifecycle cleanup, and extension guidance.

## Design references

The information structure takes inspiration from [Aljun Cursiga's developer portfolio](https://aljun-cursiga-portfolio.vercel.app/), inspected in the browser. The design is original, using warm typography, editorial spacing, a portrait arch, and supplied project branding.

Pinterest directions researched before implementation:

- [Warm neutral minimal portfolio](https://in.pinterest.com/pin/photography-portfolio-website-in-beige-gold-brown-warm-neutral-modern-minimal-style--636414991121995293/)
- [White, beige, and brown portfolio](https://ca.pinterest.com/pin/white-beige-brown-fashion-designer-portfolio-002--927319379520748835/)
- [Cream and brown creative portfolio](https://in.pinterest.com/pin/aesthetic-cream-pastel-portfolio-website-template-brown-website-template-creative-website-template-canva-presentation-portfolio-website-etsy-in-2025--917889967808271113/)

Pinterest's full previews were inaccessible; only indexed titles/descriptions informed the initial direction.

## Hosting

This folder is a static site. Deploy `index.html`, `styles.css`, `script.js`, `src/`, and `assets/` together. Do not publish `tmp/`. The included CV contains the original personal/contact information and project history; review it before public deployment. No site has been published as part of this local implementation.
