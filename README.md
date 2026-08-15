# Web Automation Playground

A standalone React + TypeScript + Vite web application built to be **the target** of browser automation
tools — not to contain any. Every interactive element carries a stable, deterministic `id` and/or
`data-testid` so that Selenium, Playwright, WebdriverIO, Puppeteer, or any other automation framework can
drive it reliably. The app itself has zero dependency on any of those tools.

## Prerequisites

- Node.js 20+
- npm 10+

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173`. Authentication, forms, storage, DOM/UI modules and most of the
playground work immediately — no backend required.

Two modules (**Network** and **WebSocket**) exercise real HTTP/WebSocket traffic against a tiny local
backend. Start it in a second terminal:

```bash
npm run server
```

It listens on `http://localhost:4000`. In dev, Vite proxies `/api` and `/ws` to it automatically.

## Production build

```bash
npm run build     # type-checks then builds to dist/
npm run preview   # serve the production build locally
```

`dist/` is fully static and can be deployed to Nginx, GitHub Pages, Netlify, Vercel, or any static host. If
you deploy the Network/WebSocket modules, also deploy `server/index.js` (any Node host) and point it at the
same origin, or accept that those two modules will show a "backend unreachable" state — every other module
remains fully functional offline.

## Scripts

| Script                    | Purpose                                   |
| -------------------------- | ------------------------------------------ |
| `npm run dev`               | Start the Vite dev server                  |
| `npm run build`              | Type-check + production build              |
| `npm run preview`            | Preview the production build               |
| `npm run lint`               | Lint with oxlint                           |
| `npm run typecheck`          | TypeScript project check (no emit)         |
| `npm run test`               | Run the full Vitest suite once             |
| `npm run test:unit`          | Run only `src/**` unit/component tests     |
| `npm run test:integration`   | Run only `tests/**` integration tests      |
| `npm run test:watch`         | Vitest in watch mode                       |
| `npm run server`             | Start the local backend (Network/WebSocket)|

## Project architecture

```text
public/
  downloads/          reserved for extra static assets
  files/              sample download files (txt/csv/json/pdf/zip)
  images/             sample image asset(s)
src/
  app/                (reserved for app-level composition helpers)
  components/
    layout/           Sidebar, PublicLayout, PlaygroundLayout, route guards
    storage/           shared Local/Session Storage panel
    ui/                Button, TextField, SelectField, Checkbox, Modal, Toaster, Card, Calendar, Spinner…
  constants/          routes, navigation, deterministic auth + test data
  context/            AuthContext, ThemeContext, ToastContext
  hooks/              useAuth, useTheme, useToast, useViewport
  pages/
    home/              marketing/landing page
    auth/              register, login, forgot/reset password, verify email
    dashboard/         dashboard, profile, settings, admin, user management
    errors/            404, 403, error-page gallery
    playground/         one folder per automation module (see below)
  routes/             AppRoutes.tsx — the single route table
  services/           authService (client-side deterministic "backend"), storageService
  styles/             global.css (theme tokens, layout, component styles)
  types/               shared TypeScript types
  utils/               validation helpers, seeded PRNG
  webcomponents/       real Shadow DOM custom elements
server/               Express + ws local backend for Network & WebSocket modules
tests/
  setup.ts             Vitest/RTL setup (jest-dom matchers, matchMedia polyfill)
  integration/          full-flow tests (auth, storage, dynamic behavior)
```

Component tests live next to the component they test (e.g. `src/components/ui/Button.test.tsx`); unit
tests live next to the module they test (e.g. `src/services/authService.test.ts`).

## Application modules

**Public**: Home, Registration, Login, Forgot Password, Reset Password, Email Verification, Access Denied.

**Automation Playground** (`/playground/*`): Basic Elements, Forms, Mouse Actions, Keyboard Actions,
Scrolling, Drag & Drop, Lists, Tables, Dropdowns, Modals, Browser Dialogs, Iframes, Shadow DOM, Windows &
Tabs, Upload & Download, Cookies, Local Storage, Session Storage, Browser History, Network, WebSocket,
JavaScript, Accessibility, Responsive, Dynamic Elements, Advanced DOM, Date & Time, Rich Text, Search,
Tooltips & Popovers, Notifications, Confirmations, Test Data.

Every module page starts with a `data-testid` on its root container matching the route name (e.g.
`data-testid="tables-page"`), and every interactive control within it has its own stable identifier —
documented inline in each component and, for the most-used ones, in the table below.

## Test accounts

All accounts and codes are deterministic — reset them anytime from **Playground → Test Data → Reset Users
to Seed Data** (this only resets user accounts; it does not affect other stored data). The **Login page**
also shows this list live with one-click "Use" buttons that autofill the form.

| Account          | Email                     | Username          | Password       | State                |
| ----------------- | -------------------------- | ------------------ | --------------- | --------------------- |
| Standard User      | `user@example.com`          | `standarduser`      | `User@123`        | Active                |
| Admin User          | `admin@example.com`         | `adminuser`         | `Admin@123`       | Active, role: admin   |
| Locked User         | `locked@example.com`        | `lockeduser`        | `Locked@123`      | Locked                |
| Unverified User     | `unverified@example.com`    | `unverifieduser`    | `User@123`        | Unverified            |
| Disabled User       | `disabled@example.com`      | `disableduser`      | `Disabled@123`    | Disabled              |

Reserved identifiers that always report as "already taken" during registration (for deterministic negative
testing), independent of current storage state: usernames `standarduser`, `adminuser`, `existinguser`;
emails `user@example.com`, `admin@example.com`, `existing@example.com`.

Deterministic codes:

- Email verification code: `123456` (use `000000` to simulate an expired code)
- Password reset code: `654321` (use `000000` to simulate an expired code)
- Maximum verification attempts before lockout: `5`

## Routes

```text
/                                   /playground/dropdowns
/login                              /playground/dialogs            (Modals)
/register                           /playground/dialogs/browser    (Browser Dialogs)
/forgot-password                    /playground/iframes
/reset-password                     /playground/shadow-dom
/verify-email                       /playground/windows-tabs
/registration-success               /playground/upload-download
/access-denied                      /playground/cookies
/errors                             /playground/local-storage
                                     /playground/session-storage
/dashboard                          /playground/browser-history
/profile                            /playground/network
/settings                           /playground/websocket
/admin                              /playground/javascript
/admin/users                        /playground/accessibility
                                     /playground/responsive
/playground                         /playground/dynamic
/playground/basic-actions           /playground/advanced-dom
/playground/forms                   /playground/date-time
/playground/mouse                   /playground/rich-text
/playground/keyboard                /playground/search
/playground/scrolling               /playground/tooltips-popovers
/playground/drag-drop               /playground/notifications
/playground/lists                   /playground/confirmations
/playground/tables                  /playground/test-data
```

`/admin` and `/admin/users` require the `admin` role; standard users are redirected to `/access-denied`.
All `/dashboard`, `/profile`, `/settings` and `/playground/*` routes require authentication and redirect
unauthenticated visitors to `/login`, returning them to the originally requested route after a successful
login. Unknown routes render a 404 page. Direct navigation, browser back/forward, refresh and deep links
all work correctly since routing is handled by `react-router-dom`'s `BrowserRouter`.

## Automation IDs

A representative sample (every page follows the same convention — inspect the page source or its
`data-testid`s directly for the full list):

```text
login-email, login-password, login-submit, login-remember-me
register-email, register-password, register-confirm-password, register-submit
basic-button, basic-checkbox, basic-input-text, basic-select
mouse-click-area, hover-menu-trigger, tooltip-trigger
keyboard-shortcut-area, keyboard-last-key, keyboard-last-combo
drag-source-item-a, drop-zone-a, drop-zone-invalid
data-table, table-row-{id}, table-select-all, table-search
dropdown-custom-trigger, dropdown-searchable-input
simple-modal, confirm-modal-confirm, browser-alert-button
iframe-container, iframe-nested-container, iframe-cross-origin
shadow-host, automation-input-host, automation-nested-host
open-new-tab-link, open-popup-button, popup-close-button
upload-input, download-txt, download-pdf
cookie-set-button, cookie-table, local-storage-set, session-storage-set
history-back, history-forward, network-success, websocket-connect
js-change-text, js-create-element, a11y-modal, a11y-dropdown-trigger
responsive-current-view, dynamic-appear-trigger, detach-toggle-button
date-time-calendar, rich-text-editor, search-input, popover-trigger
```

Identifiers are hand-written, deterministic string literals — never generated from array indices that
could shift, random values, or anything else that would change between reloads or builds.

## Platform / browser differences

- `document.execCommand` (used by the Rich Text module) is deprecated but remains implemented in all
  evergreen browsers used here (Chrome, Edge, Firefox, Safari) for this app's basic formatting commands.
- Native date/time input UI (calendar pickers, spinners) is rendered by the browser/OS and differs
  visually — and in automation-friendliness — between Chromium, Firefox and Safari. The custom Calendar
  component in the Date & Time module is provided as a browser-independent alternative.
- `window.resizable` box resizing (Mouse Actions module) depends on native CSS `resize`, which Safari
  supports slightly differently around minimum sizes.
- Popup blockers may prevent `window.open` calls (Windows & Tabs module) unless triggered directly by a
  user gesture, which all triggers in this app are.

## Local backend

Only the **Network** and **WebSocket** modules use it. Everything else — authentication, forms, storage,
DOM/UI modules — runs entirely client-side against `localStorage`/`sessionStorage`, so the app is usable
fully offline without starting the backend.

```bash
npm run server
```

This starts an Express server on port 4000 exposing deterministic endpoints under `/api/network/*`
(success, 400/401/403/404/500, delayed, timeout, empty, large) and a `/ws` WebSocket echo endpoint. See
`server/index.js`.

## Scope boundary

This application contains no Selenium, Playwright, Cypress, WebdriverIO, Puppeteer, or any other browser
automation framework code. It is the system under test, not a test runner.
