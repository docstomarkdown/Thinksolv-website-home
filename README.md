# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Employment verification (`/verify/:token`)

Every Thinksolv employee ID card carries a QR code. Scanning it opens `https://thinksolv.com/verify/<token>`, a page
(`src/pages/VerifyPage.jsx`) that asks the Thinksolv workspace whether the card is genuine and shows who it belongs to
(name, employee ID, designation, company, and their photo while they are employed) or that they are not currently employed.

- The page calls `GET <workspace>/api/id-verify/<token>` (and `/photo`). It knows nothing else: no contact details are ever
  shown, and it tells "not recognised" (404) apart from "verification is unavailable" (any other failure) so an outage never
  looks like a fake card.
- The workspace is `https://workspace.thinksolv.com` unless `VITE_WORKSPACE_URL` says otherwise (set it to a local
  workspace, e.g. `http://localhost:3000`, to try the flow; see `.env.local.example`). The workspace only allows this site's
  origin (and `localhost` outside production) to call it from a browser.
- `<token>` is an opaque code, not the employee ID (IDs are sequential and would let anyone list the roster). Who issues and
  checks it lives in the workspace project (`src/lib/id-verify*.ts`).
- `vercel.json` keeps `/verify/*` out of search engines and stops the token being sent on as a referrer.
- Deploy order: the workspace first (it serves the API), then this site.
