# SparkRight Electrical Services - Website Project

## Student Information
- **Name:** Mpho Mbele
- **Student Number:** ST10509066
- **Group:** 1
- **Module:** Web Development (WEDE5020)
- **Institution:** IIE Rosebank College

## Project Overview
This repository contains the website build for SparkRight Electrical Services, a fictional residential and small commercial electrical contracting business based in Johannesburg, created as the target organisation for this assignment. SparkRight was founded in 2021 by a qualified electrician and has grown through word-of-mouth referrals, completing wiring, fault-finding, and Certificate of Compliance (CoC) work for homeowners and small businesses across Gauteng.

The project is being built across three parts:

- **Part 1: HTML foundation** - project planning, content research, sitemap, wireframes, and static HTML structure.
- **Part 2: CSS styling** - responsive, branded visual design.
- **Part 3: JavaScript functionality and SEO** - interactive elements, dynamic content, form validation, SEO, security headers and deployment (current stage).

## Website Goals and Objectives
**Primary Goal:** Generate qualified leads by making it easy for potential customers to request a quote or book a call-out online, reducing reliance on word-of-mouth alone.

**Key Performance Indicators (KPIs):**
- Number of quote requests submitted per month.
- Average response time to enquiries.
- Percentage of website visitors who submit an enquiry form.

## Key Features and Functionality
- Homepage with a clear call-to-action to request a quote and a summary of services.
- Services page detailing wiring, fault-finding, CoC inspections, and emergency call-outs, with indicative pricing.
- Online enquiry/quote-request form capturing job type, location, and preferred contact method.
- About Us page with company history, mission, vision, and team profiles.
- Contact page with phone, WhatsApp, email, multiple service-area maps, and a contact form.

## Timeline and Milestones

| Week | Milestone |
|---|---|
| 1-2 | Project planning, proposal approval, content/image sourcing |
| 3-4 | HTML structure and page linking (Part 1) |
| 5-7 | CSS styling and responsive design (Part 2) |
| 8-9 | JavaScript functionality and testing (Part 3) |
| 10 | Final testing, debugging, and submission |

## Part 1 Details - Building the Foundation
Part 1 covers project initiation and planning, and includes:

- Two website project proposals submitted for lecturer approval (SparkRight Electrical Services approved as the target organisation).
- Content research and sourcing: original page copy written for SparkRight, plus legally-sourced free-license images (see `content-sourcing-log.md`).
- File and folder structure: `index.html`, `about.html`, `services.html`, `enquiry.html`, `contact.html` at the root, with `css/`, `js/`, `images/`, `content/`, and `wireframes/` subfolders.
- Low-fidelity wireframes for all five pages (`wireframes/`).
- Sitemap showing site structure (`wireframes/sitemap.svg`).
- Semantic, commented HTML for all five pages with a consistent site-wide navigation menu.

## Part 2 Details - Designing the Visuals
Part 2 covers CSS styling and responsive design, and includes:

- A single external stylesheet (`css/style.css`) linked from all five HTML pages.
- A CSS reset and base styles (font family, colours, spacing defaults) applied site-wide.
- A consistent typography scale (`h1`-`h4`, body text) using relative units (`rem`).
- Flexbox for the header/navigation, CSS Grid for the hero section, service cards, and team member layout.
- Visual styling (colour, borders, box-shadow) on cards, buttons, and form fields, with `:hover`, `:focus`, and `:active` states on all interactive elements.
- Responsive design with three breakpoints (1024px, 768px, 480px): multi-column layouts collapse to single-column on smaller screens, navigation stacks vertically on mobile, and buttons go full-width on small screens.
- Tested across desktop, tablet, and mobile widths using browser DevTools device emulation - see screenshots below.

### Screenshot Evidence

**Desktop:**
![Home page - desktop view](screenshots/home-desktop.png)

**Tablet:**
![Home page - tablet view](screenshots/home-tablet.png)

**Mobile:**
![Home page - mobile view](screenshots/home-mobile.png)

## Sitemap
See `wireframes/sitemap.svg` for the full visual sitemap. Site structure summary:

- Home (index.html)
  - About Us (about.html)
  - Services (services.html)
  - Get a Quote (enquiry.html)
  - Contact (contact.html)

All pages share the same header, navigation, and footer. The Services page also links directly to the Get a Quote page as a call-to-action.

## Changelog
- **7 August 2026** - Project proposals drafted for two target organisations (SparkRight Electrical Services and Crumbs & Co Artisan Bakery).
- **14 August 2026** - SparkRight Electrical Services approved by lecturer as the chosen organisation. Sitemap, wireframes, file structure, and initial HTML pages for Part 1 completed. Content research and sourcing completed (original text content + free-license images logged).
- **18 September 2026** - Created `css/style.css` and linked it from all five HTML pages. Implemented CSS reset, base styles, typography scale, Flexbox/Grid layout for header, hero, service cards, and team section, visual styling with hover/focus/active states on all interactive elements, and responsive breakpoints at 1024px/768px/480px. Captured desktop, tablet, and mobile screenshots as evidence (see Screenshot Evidence above).

- **2 November 2026 - Part 2 feedback: verifiable Git commit history.** Feedback asked for verifiable commit history. All Part 3 work was committed in small, single-purpose commits with descriptive messages and pushed to GitHub as each feature was finished, instead of one large upload. The commit history on the `main` branch (25 commits in total) now shows each feature separately, for example `Add enquiry form with JavaScript validation, cost estimate and availability response`, `Replace Google Maps iframes with interactive Leaflet map showing both branches` and `Add security headers (vercel.json) and rel=noopener on external links`. Git author details were set to my verified GitHub email so every commit is attributed to my account (`popodev24`).
- **2 November 2026 - Part 2 feedback: stronger responsive image techniques** (commits `912d9a5` and `98819cb`). Generated 480px, 800px and 1200px versions of the hero and both team photos from the originals (the hero image dropped from about 2.3 MB to about 124 KB at 1200px). Replaced the plain `<img>` tags with `srcset` and `sizes` so each device downloads an appropriately sized file. Added explicit `width` and `height` attributes to prevent layout shift. Added `loading="lazy"` and `decoding="async"` to below-the-fold images and `fetchpriority="high"` to the hero image. Added `img { max-width: 100%; height: auto; }` to `css/style.css` so the images stay fluid. Files: `index.html`, `about.html`, `css/style.css`, `images/`.
- **2 November 2026 - Technical SEO** (commits `52c07fb`, `da2fc0e`, `9cef7fd`). Added unique `<title>` tags, meta descriptions, meta keywords and canonical links to all five pages. Created `robots.txt` and `sitemap.xml`, then updated them, the canonical links and the form recipient with the live Vercel URL. Files: all `.html` files, `robots.txt`, `sitemap.xml`.
- **2 November 2026 - Dynamic content and interactivity** (commit `5f821c6`). Added a JavaScript-rendered services list with live search, category filtering and sorting, plus an accordion (FAQ). Files: `services.html`, `js/`, `css/style.css`.
- **2 November 2026 - Gallery with lightbox** (commit `83edef7`). Added an image gallery to the About page that opens full-size images in an accessible lightbox with keyboard controls (Esc, Left and Right arrows) and click-outside-to-close. Files: `about.html`, `js/lightbox.js`, `css/style.css`.
- **2 November 2026 - Interactive map** (commits `2fd4b6c`, `980f3db`). Replaced the Google Maps iframes with an interactive Leaflet map showing both branches, then switched the tiles to Esri World Street Map because it needs no API key. Files: `contact.html`, `js/`.
- **2 November 2026 - Forms and validation** (commits `da68b3d`, `1c11afa`, `80434d3`, `b500f62`, `d5ab9e4`). Built the enquiry form (validated input, calculated cost estimate and availability response) and the contact form (validated input, compiled email). Upgraded the contact form to submit asynchronously with `fetch()` (AJAX) through FormSubmit, with a sending indicator, success and error messages and a `mailto:` fallback. Fixed an HTTP 405 error by preventing the default form submit. Added clean responsive styles for inputs, labels and buttons. Files: `enquiry.html`, `contact.html`, `js/forms.js`, `css/style.css`.
- **2 November 2026 - Security** (commit `1d43f00`). Added security headers in `vercel.json` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) and `rel="noopener noreferrer"` on all external links that open in a new tab. Files: `vercel.json`, all `.html` files.
- **2 November 2026 - Deployment and documentation.** Deployed the site on Vercel at https://sparkright-website.vercel.app, finalised the README (Part 3 section, changelog, references) and removed a stray file created by a mistyped command (commit `2cbca8d`).


---

## Part 3 Details - Enhancing Functionality and SEO

Part 3 adds JavaScript functionality, SEO, validated forms, security headers and deployment (The Independent Institute of Education, 2026c). The live site is at https://sparkright-website.vercel.app.

JavaScript files in `js/`:

- `js/forms.js`
- `js/lightbox.js`
- `js/map.js`
- `js/services.js`

### 1. Interactive Elements and Dynamic Content

- **Gallery with lightbox:** the About page shows thumbnail images that open full-size in a lightbox. It supports keyboard control (Esc to close, Left and Right arrows to move), click-outside-to-close and descriptive alt text.
- **Accordion:** FAQ items expand and collapse on click so visitors only see the answers they need.
- **Dynamic content and search:** the services list is rendered by JavaScript, with live search, a category filter and sorting, so results update without reloading the page.
- **Interactive map:** the Contact page uses Leaflet (Leaflet, n.d.) with Esri World Street Map tiles (Esri, n.d.), showing both branches with clickable markers. No API key is required.
- **Animations and transitions:** CSS transitions and keyframe animations are used for hover states, accordion panels and the lightbox.

### 2. Search Engine Optimisation (SEO)

- **On-page:** every page has a unique `<title>`, meta description and meta keywords; headings follow a single `<h1>` then `<h2>` and `<h3>` structure; images have descriptive alt text; internal links connect all five pages; the layout is mobile-friendly (Google Search Central, 2026).
- **Technical:** `robots.txt` points crawlers to `sitemap.xml`, and canonical links on every page point to the live Vercel URL.
- **Page speed:** images use `srcset`, `sizes`, explicit dimensions and lazy loading, and no JavaScript frameworks are used.
- **Off-page and local SEO:** as a coursework site on a free host it cannot build real backlinks. In a live project the plan would be a Google Business Profile for Johannesburg, listings in local directories, and sharing completed jobs on social media.

### 3. Forms and Validation

- **Enquiry form (`enquiry.html`):** collects name, contact details, service, property type, area, date and contact method. JavaScript validates every field (South African phone format, email format, date not in the past, text length) and shows inline error messages, then displays an estimated cost and availability response.
- **Contact form (`contact.html`):** collects contact details, message type and message. After validation, the message is compiled into an email and sent asynchronously with `fetch()` (AJAX) through FormSubmit (FormSubmit, n.d.). It shows a sending state, a success message and an error message, with a `mailto:` button as a fallback.

### 4. Security and Deployment

- `vercel.json` sets X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy headers.
- External links that open in a new tab use `rel="noopener noreferrer"`.
- The site is deployed on Vercel, with the source code on GitHub at https://github.com/popodev24/sparkright-website.

---

## References
This project follows the Part 1 and Part 2 module briefs (The Independent Institute of Education, 2026a; 2026b; 2026c) for structure and CSS/responsive requirements. Hero and team images are free-license stock photography sourced from Pexels (Pexels, n.d.a; n.d.b).

The Independent Institute of Education (Pty) Ltd. 2026a. WEDE5020: Web Development (Introduction) - Part 1: Building the Foundation, Project Initiation and Planning. Unpublished module manual. Johannesburg: IIE Rosebank College.

The Independent Institute of Education (Pty) Ltd. 2026b. WEDE5020: Web Development (Introduction) - Part 2: Designing the Visuals, CSS Styling and Responsive Design. Unpublished module manual. Johannesburg: IIE Rosebank College.

Pexels. n.d.a. Electrician. [Online]. Available at: https://www.pexels.com/photo/photo-of-a-person-s-hands-cutting-a-green-cable-7285975/ [Accessed: 14 August 2026].

Pexels. n.d.b. Electrical panel. [Online]. Available at: https://www.pexels.com/photo/electrical-wires-connected-on-conductors-7541342/ [Accessed: 14 August 2026].

The Independent Institute of Education (Pty) Ltd. 2026c. WEDE5020: Web Development (Introduction) - Part 3: Enhancing Functionality and SEO. Unpublished module manual. Johannesburg: IIE Rosebank College.

Esri. n.d. World Street Map. [Online]. Available at: https://www.arcgis.com/home/item.html?id=3b93337983e9436f8db950e38a8629af [Accessed: 2 November 2026].

FormSubmit. n.d. FormSubmit documentation. [Online]. Available at: https://formsubmit.co/ [Accessed: 2 November 2026].

Google Search Central. 2026. SEO Starter Guide. [Online]. Available at: https://developers.google.com/search/docs [Accessed: 2 November 2026].

Leaflet. n.d. Leaflet: an open-source JavaScript library for interactive maps. [Online]. Available at: https://leafletjs.com/ [Accessed: 2 November 2026].

Mozilla Developer Network. 2026. Responsive images. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images [Accessed: 2 November 2026].