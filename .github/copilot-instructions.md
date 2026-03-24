# Copilot Instructions for `inpulse-libs`

## Big picture (read this first)
- This is a **monorepo** containing two shared TypeScript library packages consumed by all in.pulse-crm backend services and the frontend.
- The two sub-packages are `sdk/` (`@in.pulse-crm/sdk`) and `utils/` (`@in.pulse-crm/utils`). The SDK depends on utils; utils has no internal deps.
- Both packages compile with plain `tsc` to a `dist/` folder. There is no bundler. Output is CommonJS (`module: "commonjs"`, `target: "es2022"`).
- Neither package has a test suite. Validate with runtime checks in consuming services.

## Sub-packages

### `@in.pulse-crm/utils` (`utils/`)
General-purpose utilities with no framework coupling.

| Export | What it does |
|---|---|
| `Logger` | Colored console logger (INFO/ERROR/DEBUG/WARNING) using `chalk`. Static methods only. |
| `sanitizeErrorMessage` | Extracts a string message from any error, handling `AxiosError` specially. |
| `TaskQueue<T>` | Generic async task queue with configurable `concurrency`, `onTaskCompleted`, and `onTaskFailed` callbacks. |
| `Formatter` | String/data formatting helpers (see `formatter/`). |
| `logRoutes` | Express route logging helper. |
| `PhoneUtils` | Phone number validation (`isValid`) and formatting. Also exports types `PhoneNumber` and `FormattedPhoneNumber`. |

### `@in.pulse-crm/sdk` (`sdk/`)
Typed HTTP/WebSocket client abstractions for every in.pulse-crm service. All HTTP clients extend `ApiClient`.

| Export | What it does |
|---|---|
| `ApiClient` | Base class: wraps `axios` with 60s timeout, JSON content-type, and response interceptor that normalizes errors to `Error` with the server `message`. All other HTTP clients extend this. |
| `AuthClient` | Login, session data fetch, authentication check against the auth service. |
| `CustomersClient` | Customers/contacts CRUD for the customers service. |
| `FilesClient` | File uploads and retrieval for the files service. |
| `InstancesClient` | Instance management for the instances service. |
| `UsersClient` | User management for the users service. |
| `WhatsappClient` | Comprehensive WhatsApp API: chats, messages, contacts, scheduling, notifications, automatic response rules, file sending, forwarding. |
| `WalletsClient` | Wallet operations. |
| `ReportsClient` | Report generation. |
| `SocketClient` | WebSocket client (socket.io-client) with typed event registration/removal and manual connect control. |
| `SocketServerClient` | Server-to-server socket emitter. |
| `InternalChatClient` | Internal chat operations. |
| `ReadyMessageClient` | Ready/canned message management. |
| All types | Re-exported from `./types` — covers auth, customers, files, reports, request filters, response envelopes, socket events/rooms, users, whatsapp, internal, and ready-messages. |

## Tech stack
- **Language**: TypeScript 5.x, strict mode, `es2022` target, `commonjs` module output.
- **Build**: `tsc` only. No bundler (esbuild/rollup/webpack). Output goes to `dist/`.
- **SDK runtime deps**: `axios`, `form-data`, `socket.io-client`, `@in.pulse-crm/utils`.
- **Utils runtime deps**: `axios`, `chalk`.
- **Formatting**: Prettier is configured in both sub-packages.

## Build / dev commands
Run from inside the sub-package directory (`sdk/` or `utils/`):

```bash
npm run build           # tsc → dist/
npm run prettier        # format in place
npm run prettier:check  # check formatting
```

There is no `watch`, `dev`, or `test` script. Rebuild manually after changes.

## How consuming services use this
Services install the packages from the local monorepo or from a private registry. Import patterns:

```ts
// SDK
import { AuthClient, WhatsappClient } from "@in.pulse-crm/sdk";
import type { WppChat, SessionData } from "@in.pulse-crm/sdk";

// Utils
import { Logger, sanitizeErrorMessage, TaskQueue, PhoneUtils } from "@in.pulse-crm/utils";
```

Instantiate HTTP clients by passing the target service's base URL:

```ts
const auth = new AuthClient(process.env.AUTH_API_URL);
const wpp  = new WhatsappClient(process.env.WHATSAPP_API_URL);
```

## Critical conventions
- **Extend `ApiClient`, never repeat axios setup.** All new HTTP clients must extend `ApiClient` and use `this.ax` for requests.
- **Error handling**: `ApiClient.handleError` strips response data into a plain `Error`. Callers receive `Error` objects — do not re-wrap them unless adding context.
- **Types live in `sdk/src/types/`.** Add new domain types there, export them from `types/index.ts`, and re-export from `sdk/src/index.ts`. Keep types co-located with their client file's domain.
- **Utils are framework-agnostic.** Do not introduce Express, Prisma, or service-specific deps into `utils/`.
- **Rebuild before testing downstream.** Consuming services use `dist/`; changes to `src/` are invisible until `npm run build` runs in the sub-package.
- **No `any` in public API.** Use the typed response envelopes (`DataResponse<T>`, `MessageResponse`) already defined in `response.types.ts`.
