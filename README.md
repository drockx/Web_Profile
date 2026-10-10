# Dwayne Rubite — personal profile

A responsive, dependency-free HTML, CSS, and JavaScript portfolio in beige, burlywood, deep brown, and muted khaki.

## Open locally

Run `npm start` and visit http://127.0.0.1:4173. The site uses native ES modules, so serve it over HTTP instead of opening the HTML file directly. No dependency installation or build is needed. `npm run check` validates JavaScript syntax and module imports; `npm test` runs domain and adapter tests.

## Content

The profile, qualifications, education, contact details, and AniMarket project contributions come from `Rubite_Dwayne_CV.pdf`, supplemented by user corrections. AniMarket is a React Native mobile application built with TypeScript and Firebase, as confirmed by the user; this replaces the Dart and Flutter attribution in the CV. Dart and Flutter remain in the personal skills list. The user also confirmed C#, Supabase, Cloudinary, and API integration as general expertise; these are not attributed to AniMarket without project-specific confirmation.

The portfolio features AniMarket and the [DRMC Patient Portal](https://github.com/DAJabonite/drmc-patient-portal). DRMC technology and capabilities were verified against its README and project file: C#, ASP.NET Core, Entity Framework Core, SQL Server, and Bootstrap. It is presented as a development project, with a source link and no claim of a live hospital integration.

The portrait is the user-supplied `Digoy` PNG, stored as `assets/dwayne-portrait.png`. The AniMarket showcase uses the supplied `assets/animarket-logo.png`. The credentials section displays the supplied `assets/database-certificate.png`, with a full-size link. The certificate's verification code is not manually transcribed from the low-resolution image; view the document for its details. The original PDF is included as a downloadable asset. There are no invented project metrics, social profiles, or external certification verification claims.

The site includes an accessible project detail dialog, skill search and filters, mobile navigation, a FAQ, a downloadable CV and vCard, and an email copy button. Email, phone, and GitHub links with inline SVG icons appear in the hero and in prominent contact cards. Each link has an accessible name and a touch target at least 44px tall. The project controller supports category filters when more projects are added. The contact form prepares a mailto draft; it does not store or send inquiries and requires an email application. The page remains readable if JavaScript is disabled. Google Fonts are optional external resources with local font fallbacks.

## Personalize

- Edit biography, education, certification, and skill labels in `index.html`.
- Edit full project contributions in `src/data/projects.js` and profile configuration in `src/data/profile.js`.
- Set palette in `src/styles/tokens.css` and layout in the focused stylesheets imported by `styles.css`.
- Replace `assets/dwayne-portrait.png`, `assets/Rubite_Dwayne_CV.pdf`, and `assets/dwayne-rubite.vcf` when updating personal details.
- Add real project screenshots, live URLs, or public repository URLs when available. Preserve correct role attribution.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for the dependency diagram, SOLID mapping, feature modules, adapter contracts, lifecycle cleanup, and extension guidance.

## Design references

The information structure takes inspiration from [Aljun Cursiga's developer portfolio](https://aljun-cursiga-portfolio.vercel.app/), inspected in the browser. The current design retains the beige, burlywood, deep brown, and muted khaki palette, with restrained bronze and espresso gradients approved by the user. Bold Barlow Condensed headings, DM Sans body text, angular framing, and stronger borders follow the supplied visual reference. Supplied project branding remains in the showcase.

Pinterest directions researched before implementation:

- [Warm neutral minimal portfolio](https://in.pinterest.com/pin/photography-portfolio-website-in-beige-gold-brown-warm-neutral-modern-minimal-style--636414991121995293/)
- [White, beige, and brown portfolio](https://ca.pinterest.com/pin/white-beige-brown-fashion-designer-portfolio-002--927319379520748835/)
- [Cream and brown creative portfolio](https://in.pinterest.com/pin/aesthetic-cream-pastel-portfolio-website-template-brown-website-template-creative-website-template-canva-presentation-portfolio-website-etsy-in-2025--917889967808271113/)

Pinterest's full previews were inaccessible; only indexed titles/descriptions informed the initial direction.

## Hosting

Run `npm run build` to package `index.html`, `styles.css`, `script.js`, `src/`, and `assets/` into `dist/`. Publish the contents of `dist/` through a static host. The generated folder excludes the local preview server, tests, and development files.

For Vercel, import `drockx/Web_Profile` with the repository root as the Root Directory. The included `vercel.json` selects **Other**, runs **npm run build**, skips dependency installation, and serves **dist**. These file settings override the equivalent dashboard settings; no environment variables are needed. Push these files to the connected production branch to create a new deployment. `server.js` is only a local preview server and must not be used as the production entry point.

If the deployed URL shows plain `Not found`, check that the latest deployment includes `vercel.json` and has a build log ending with `Static portfolio built in dist/`. Confirm the project is connected to `drockx/Web_Profile` and its Root Directory is the repository root. Open the newly completed deployment after updating settings; an older deployment keeps its previous configuration.
