# AppDeploy.ai Complete Skill File for Claude Code

**AppDeploy.ai is a chat-native deployment platform that lets AI coding agents deploy full-stack web applications via MCP tools, returning a live public URL in seconds.** The platform handles hosting, databases, file storage, authentication, real-time WebSockets, AI inference, cron jobs, and automated E2E QA — all through **10 MCP tools** exposed at `https://api-v2.appdeploy.ai/mcp`.

---

## Setting up AppDeploy in Claude Code

The MCP server URL is **`https://api-v2.appdeploy.ai/mcp`** and uses the Streamable HTTP transport.

**CLI command (recommended):**
```bash
claude mcp add --transport http AppDeploy https://api-v2.appdeploy.ai/mcp
```

**JSON configuration:**
```bash
claude mcp add-json AppDeploy '{"type":"http","url":"https://api-v2.appdeploy.ai/mcp"}'
```

**Project-scoped `.mcp.json`:**
```json
{
  "mcpServers": {
    "AppDeploy": {
      "type": "http",
      "url": "https://api-v2.appdeploy.ai/mcp"
    }
  }
}
```

Authentication uses **OAuth** (Google, Apple, or Guest sign-in) — the browser opens automatically on first connection. For CLI/programmatic use, generate an API key:

```bash
curl -X POST https://api-v2.appdeploy.ai/mcp/api-key \
  -H "Content-Type: application/json" \
  -d '{"client_name": "claude-code"}'
```

Returns `{"api_key": "ak_...", "user_id": "agent-claude-code-...", ...}`. Save to `.appdeploy` and add to `.gitignore`. Pass as `Authorization: Bearer ak_...`. Once configured, tools appear as `mcp__AppDeploy__<tool_name>`. Run `/mcp` inside a session to check connection status.

---

## The Mandatory Deployment Workflow (Follow This Exactly)

**Step 1 — `get_deploy_instructions`:** Always call first. Write a concise implementation checklist and preflight checklist from the response.

**Step 2 — `get_app_template`:** Call with your chosen `app_type` and `frontend_template`. Returns base template files and SDK type definitions. Use only the returned API surface — do not guess or invent methods.

**Step 3 — Write code:** Generate files following the implementation checklist. Only create new files + diffs to template files. Never resend unmodified template files. Include `tests/tests.txt` with 3–10 tests.

**Step 4 — Preflight check:** Verify every item in the preflight checklist before calling `deploy_app`.

**Step 4b — Token limit check:** Before calling `deploy_app`, scan all files and estimate their combined token count. The `deploy_app` tool has a **~32,000 token input limit** for the entire payload. If the `files[]` array is too large:
- **Batch 1 (initial deploy):** Call `deploy_app` with `app_id: null` and only the most critical files — entry points, types, contexts, core hooks, key screens, and template diffs.
- **Batch 2 (update):** Immediately call `deploy_app` again with the returned `app_id` and the remaining files (e.g. sprites, large data files, secondary screens).
- Large inline assets (SVG sprite strings, base64 data) are common culprits — defer them to the second batch.
- Always include `tests/tests.txt` in the first batch.

**Step 5 — `deploy_app`:** Make exactly **one** deploy call per batch. Fix all validation errors in one pass if it fails — avoid iterative single-error retries.

**Step 6 — `get_app_status`:** Poll every **5 seconds** until status is `ready`, `failed`, or `deleted`. Always read `response.message`.

**Step 7 — Handle result:** On `ready`: show public URL. On `failed`: review `errors` and `files_to_fix`, fix with diffs, redeploy.

---

## Token Budget, Model Selection & Deploy Strategy

### Model to Use
Always pass `"claude-sonnet-4-6"` as the `model` field in `deploy_app`. This is the current Claude Sonnet model with a **64K output token limit** — more headroom than Opus (32K).

### The ~32K Input Limit on `deploy_app`
The `deploy_app` tool has a **~32,000 token input limit** for the entire payload (all files combined). To stay within this, follow these strategies based on whether it's a first deploy or an update.

#### First Deploy (`app_id: null`)
- Only send **new/custom files** — template files are auto-included, never resend them verbatim
- Include entry points, types, contexts, core hooks, key screens, and template diffs
- Always include `tests/tests.txt` in this batch
- If still over ~32K tokens: send only the most critical files first, then immediately call `deploy_app` again with the returned `app_id` and remaining files (large data files, sprite sheets, secondary screens)

#### Ongoing Updates (`app_id: existing ID`)
- Send **only changed files** — never resend unchanged files
- **Always prefer `diffs` over full `content`** for files that already exist — a diff of 3 changed lines uses a fraction of the tokens of resending an entire file
- Use `deletePaths` to remove files no longer needed
- Before editing, use `src_read` / `src_grep` to confirm the current deployed state — local files may drift from the deployed version after multiple sessions
- If unsure what's currently deployed, use `src_glob` to list deployed files first

---

## All 10 MCP Tools with Exact Parameters

### 1. `get_deploy_instructions`

**Purpose:** Returns deployment constraints, hard rules, and checklists. **Must be called before generating any code or calling `deploy_app`.**

**Parameters:** None.

---

### 2. `get_app_template`

**Purpose:** Returns base app template files and SDK type definitions. Call after `get_deploy_instructions`. Template files are **auto-included** — do not resend them verbatim.

| Parameter | Type | Required | Values |
|-----------|------|----------|--------|
| `app_type` | enum | Yes | `"frontend-only"` or `"frontend+backend"` |
| `frontend_template` | enum | Yes | `"html-static"`, `"react-vite"`, or `"nextjs-static"` |

---

### 3. `deploy_app`

**Purpose:** Deploy or update a web app. Returns a public URL.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `app_id` | string or null | Yes | `null` for new app, existing ID for updates |
| `app_name` | string | Yes | Short display name |
| `app_type` | enum | Yes | `"frontend-only"` or `"frontend+backend"` |
| `frontend_template` | enum | New apps only | `"html-static"`, `"react-vite"`, `"nextjs-static"` |
| `description` | string | New apps only | Short description |
| `files` | array | Yes | Files to write |
| `deletePaths` | array | Updates only | Paths to delete |
| `intent` | string | Yes | e.g., `"initial app deploy"`, `"bugfix - fix layout"` |
| `model` | string | Yes | `"claude-sonnet-4-6"` (current; always use this) |

**File entry — full content:**
```json
{
  "filename": "src/components/MyWidget.tsx",
  "content": "full file content here"
}
```

**File entry — diffs (for modifying template files or existing files):**
```json
{
  "filename": "src/App.tsx",
  "diffs": [
    { "from": "APP_CONTENT", "to": "<h1>Hello World</h1>" },
    { "from": "// APP STATES", "to": "const [count, setCount] = useState(0);" }
  ]
}
```

Each diff: `{ from: string (exact match, non-empty), to: string, multiple?: boolean }`. Set `multiple: true` to replace all occurrences; default `false` fails if `from` matches more than once.

---

### 4. `get_app_status`

**Purpose:** Check deployment status, QA results, and error logs. **Must be called after every `deploy_app` until terminal state.**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `app_id` | string | Yes | Target app ID |
| `limit` | integer (1–100) | No | Cap for returned logs (default 50) |
| `since` | integer | No | Epoch ms timestamp filter |

**Status values:** `deploying` (in-progress), `deleting` (in-progress), `ready` (✅ terminal), `failed` (❌ terminal), `deleted` (terminal).

---

### 5. `get_apps`

**Purpose:** List all apps owned by the current user.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `continuation_token` | string | No | Pagination token |

---

### 6. `get_app_versions`

**Purpose:** List deployable versions for an app (newest first).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `app_id` | string | Yes | Target app ID |

Returns: `{ name, version, timestamp }[]`. Display `name` to users; use `version` for `apply_app_version`.

---

### 7. `apply_app_version`

**Purpose:** Roll back or deploy a specific version.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `app_id` | string | Yes | Target app ID |
| `version` | string | Yes | Version ID from `get_app_versions` |

---

### 8. `delete_app`

**Purpose:** Permanently and irreversibly delete an app. Only call on explicit user request.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `app_id` | string | Yes | Target app ID |

---

### 9. `src_glob`

**Purpose:** Discover files in an app's source snapshot by glob pattern.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `app_id` | string | Yes | Target app ID |
| `glob` | string | No | Pattern (default `**/*`) |
| `path` | string | No | Directory to search within |
| `include_dirs` | boolean | No | Include directories (default false) |
| `version` | string | No | Version to inspect |
| `continuation_token` | string | No | Pagination |

---

### 10. `src_grep`

**Purpose:** Search for patterns in source code with regex support.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `app_id` | string | Yes | Target app ID |
| `pattern` | string | Yes | Regex pattern (max 500 chars) |
| `glob` | string | No | File filter (e.g., `*.ts`) |
| `path` | string | No | Directory to search within |
| `case_insensitive` | boolean | No | Default false |
| `context` | integer (0–20) | No | Lines before and after |
| `before_context` | integer (0–20) | No | Lines before match |
| `after_context` | integer (0–20) | No | Lines after match |
| `output_mode` | enum | No | `"content"`, `"files_with_matches"`, `"count"` |
| `line_numbers` | boolean | No | Default true |
| `version` | string | No | Version to search |

---

### 11. `src_read`

**Purpose:** Read a specific file with line pagination.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `app_id` | string | Yes | Target app ID |
| `file_path` | string | Yes | Path to file |
| `offset` | integer | No | Line offset (0-indexed, default 0) |
| `limit` | integer (1–2000) | No | Lines to return (default 200) |
| `version` | string | No | Version to read from |

---

## Six Supported Template Combinations

`frontend-only` is the default unless custom backend logic is needed. `frontend+backend` is required for custom HTTP endpoints, server-side secrets, third-party API calls, or **any AI behavior**.

| Template | Build Tool | Framework | Entry Point |
|----------|------------|-----------|-------------|
| `html-static` | Vite 6 | Vanilla TS | `src/main.ts` |
| `react-vite` | Vite 6 + React plugin | React 19 | `src/main.tsx` → `src/App.tsx` |
| `nextjs-static` | Next.js 15 (static export) | React 19 + Next.js | `pages/index.tsx` |

All templates include Tailwind CSS and Lucide icons pre-configured.

Backend templates add: `backend/index.ts` (router with Lambda handler) and `backend/realtime.ts` (WebSocket handling).

---

## Two Platform SDKs

### `@appdeploy/client` (frontend only)

```typescript
import { api, ws, auth, image } from '@appdeploy/client';
```

- **`api`** — Axios-like HTTP client. Methods: `api.get()`, `api.post()`, `api.put()`, `api.delete()`. Bearer tokens auto-attach after `auth.signIn()`. **Never use fetch/axios directly.**
- **`ws`** — WebSocket client. `ws.connect()` → `WsConnection` with `connectionId`, `ready`, `onMessage()`, `onOpen()`, `onClose()`, `onError()`, `disconnect()`.
- **`auth`** — `auth.signIn(options?)` opens popup → `{ user, accessToken, expiresIn }`. `auth.isSignedIn()` (sync). `auth.getUser()` (auto-refreshes). `auth.signOut()`.
- **`image`** — `image.resizeIfNeeded(file, options?)` downscales to max 1600px / 2MP before AI calls.

---

### `@appdeploy/sdk` (backend only)

```typescript
import { db, storage, ws, auth, ai, router, json, error, requireAuth, withScopes, requireAdminEmailAllowlist, isAppDeployRpcError } from '@appdeploy/sdk';
```

**`db`** — Key-value database:
- `db.add(table, records[])` → `(string|null)[]`
- `db.get<T>(table, ids[])` → `(T|null)[]`
- `db.list<T>(table, {filter?, nextToken?, limit?})` → `{items, nextToken?}`
- `db.update(table, [{id, record}])` → `boolean[]` (full replacement, not merge)
- `db.delete(table, ids[])` → `boolean[]`
- ⚠️ **DynamoDB behavior:** filters apply AFTER limit — never combine `limit` with `filter`.

**`storage`** — File storage:
- `storage.write([{path, content, contentType}])` → `boolean[]`
- `storage.read(paths[])`
- `storage.url(paths[])` → signed URLs (1-hour expiry)
- `storage.list({prefix?, nextToken?, limit?})`
- `storage.delete(paths[])`

**`ws`** — Server-side WebSocket: `ws.send(connection_ids, payload)`. Fire-and-forget.

**`auth`** — `auth.getUser(event)` extracts/verifies JWT. `auth.hasScope(user, scope)`. `auth.requireScope(user, scope)` throws 403.

**`ai`** — 7 AI methods (all backend-only):

| Method | Purpose | Key Options |
|--------|---------|-------------|
| `ai.generate(options)` | Single model call | `prompt`, `messages`, `system`, `schema`, `images` (max 5, 6MB), `audios` (max 3, 2MB), `tools`, `maxTokens` (cap 8192), `temperature` (0–2), `thinkingMode` (`NONE`/`FAST`/`DEEP`) |
| `ai.imageGen(options)` | Gemini image generation | `prompt`, `images?`, `maxOutputBytes` (cap 1MB) |
| `ai.classify(options)` | Fixed-label classification | `labels` (≥2) → `{label, text, attempts}` |
| `ai.extract(options)` | Schema-based extraction | `schema` → `{data, text, attempts}` |
| `ai.ocr(options)` | OCR/transcription | → `{text, data?, attempts}` |
| `ai.scrape(options)` | Fetch AI-friendly page text | `url` → `{text, title?, status}` |
| `ai.run(options)` | Bounded agent loop | Max 10 steps; `emit_result` tool ends loop → `result.data` |

**Router helpers:** `router(routes)` creates a Lambda handler. `json(data, status?)` and `error(message, status?)` create responses. Middleware: `requireAuth()`, `withScopes(...scopes)`, `requireAdminEmailAllowlist(emails)`.

---

## Hard Rules — Never Violate These

### Architecture boundaries
- Frontend **must never** import `@appdeploy/sdk`
- Backend **must never** import `@appdeploy/client`
- Both packages are pre-installed — **never add them to `package.json`**
- Frontend calls backend **only** via `api.<method>()` — never `fetch('/api/...')` or `axios`
- Frontend **must never** call LLM providers (Anthropic/OpenAI/Gemini) directly

### Template rules
- Always replace `APP_TITLE` placeholder in `index.html` `<title>`
- New apps must include `frontend_template` and `description`
- New app files = only new files + diffs to template files (never resend unmodified template files)
- Updates = only changed files

### Testing
- New apps must include `tests/tests.txt` with **3–10 stateless tests**, exactly **one** marked `[sanity]`
- Updates that change user-visible behavior must update tests via diffs
- Each test specifies viewport: `desktop` (1280×800) or `mobile` (375×667)

### Routing
- SPAs must not use absolute client routes (leading `/`)
- Use `HashRouter` for React Router

### Backend
- Backend entrypoint is always `backend/index.ts`
- Extend the template router via diffs — add routes to existing `router({...})` call
- Protected endpoints must use `[requireAuth(), ...]` middleware arrays
- Always scope data access by `ctx.user!.userId` to prevent cross-user leaks
- All AI calls must go through `@appdeploy/sdk` `ai.*` APIs

### Styling
- Use Tailwind CSS utilities
- Icons must use Lucide imports — never inline SVG

---

## Cron Jobs

Supported for `frontend+backend` apps via `cron.json` at project root. Max **3 crons per app**, **5-minute minimum interval**.

```json
[
  {
    "name": "daily-cleanup",
    "cron": "0 2 * * *",
    "handler": "dailyCleanup",
    "timezone": "UTC",
    "payload": {}
  }
]
```

- Including `cron.json` upserts all listed crons and deletes unlisted ones
- An empty array `[]` deletes all crons
- Handlers must be top-level named exports in `backend/index.ts` (not inside the router)

---

## Versioning and Remote Filesystem

Every `deploy_app` creates a new version. Use `get_app_versions` → `apply_app_version` to roll back. The remote source snapshot is the source of truth — local files may drift after multiple edits. Use `src_glob`, `src_grep`, and `src_read` to inspect current or historical app state when uncertain.

---

## Common Failures and How to Fix Them

| Error | Fix |
|-------|-----|
| Importing `@appdeploy/sdk` in frontend | Move all AI/backend logic to `backend/index.ts` |
| Using `fetch()` or `axios()` for backend | Replace with `api.get/post/put/delete()` |
| `@appdeploy/client` or `@appdeploy/sdk` in `package.json` | Remove them — pre-installed by platform |
| Missing `scripts.build` in `package.json` | Add build script |
| Absolute routes in SPA | Use `HashRouter` |
| `APP_TITLE` not replaced | Replace in `index.html` `<title>` |
| Sending unmodified template files | Only send new files + diffs |
| `db.list()` with `limit` + `filter` | Remove `limit` when filtering — filters apply after limit |
| Frontend calling AI providers directly | Route all AI calls through backend `ai.*` |
| Redeploying to unstick `deploying` status | Never — poll `get_app_status` every 5s instead |
| `deploy_app` payload exceeds ~32k token limit | Split into two calls: first deploy core files with `app_id: null`, then update with remaining files using the returned `app_id` |
