# Marvel Forge

A professional portfolio for Marvel, presenting practical software for business operations: frontend and backend development, Python applications, data reporting, and automation.

**[Live portfolio](https://igwenzemarvel.pythonanywhere.com/)** · **[Project archive](https://igwenzemarvel.pythonanywhere.com/projects.html)** · **[Résumé](https://igwenzemarvel.pythonanywhere.com/resume.html)**

## Features

- Responsive dark design with dimensional accents.
- Section navigation with fade transitions and reduced-motion support.
- Six implemented projects with anonymous case studies and demonstration screenshots.
- Two blueprint-stage projects clearly identified as in development.
- Capabilities, business benefits, working process, and an anonymous About section.
- Printable résumé with a separate print layout.
- Email and WhatsApp contact links and a project-brief composer.
- Optional synthesized ambient sound, enabled only by the visitor.

## Technology

HTML, CSS, and vanilla JavaScript, without a build step or frontend framework. A small Node.js server provides local preview. `pythonanywhere_wsgi.py` serves the static portfolio through Python WSGI without additional dependencies.

Technologies described in case studies belong to separate projects. Their private source code, credentials, and databases are not included here.

## Run locally

With Node.js installed, run:

```sh
node server.cjs
```

Open http://127.0.0.1:4173. No package installation is required.

## Structure

- `dist/index.html`: main portfolio and sections.
- `dist/projects.html`: project archive and case studies.
- `dist/resume.html`: professional profile.
- `dist/app.js`: navigation, dialogs, sound, and contact brief.
- `dist/style.css`: shared responsive styles.
- `dist/resume-theme.css` and `resume.js`: résumé styling and printing.
- `dist/assets/`: workspace image and project captures.
- `server.cjs`: local preview server.
- `pythonanywhere_wsgi.py`: static WSGI application.

## Hosting

Deploy `dist` beside `pythonanywhere_wsgi.py`, then load its `application` callable from the hosting WSGI configuration. Keep databases and credentials outside `dist`. The production account separately mounts a CAC application at `/cac/`; that application and its configuration are not part of this repository.

GitHub stores the source. Commits do not automatically deploy to PythonAnywhere.

## Content and privacy

Client identities are omitted. Screenshots use anonymous branding, fictional records, or empty local previews. Delivery stages distinguish deployed applications, prototypes, drafts, and blueprint-stage development. The official CAC API connection is at the integration-design stage.

The contact composer opens the visitor's email or WhatsApp application, or downloads a text brief. It does not send automatically or store inquiries on a server.

The hero workspace photograph is credited to [Tai Bui on Unsplash](https://unsplash.com/photos/a-person-sitting-at-a-desk-in-front-of-a-computer-pZQgstUp_-o). Fonts load from Google Fonts with system fallbacks. Third-party imagery retains its original rights.

## Contact

[igwenze_marvel@outlook.com](mailto:igwenze_marvel@outlook.com) · [WhatsApp](https://wa.me/15806438179)
