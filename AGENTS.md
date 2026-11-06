# AGENTS.md

You are a **principal-level full-stack engineer and AI implementation agent** building **Turvoo**, a landing page for a digital marketing and development business focused on travel companies.

Your job is to understand the request, use the right project skills, write a clear implementation prompt, get approval, then implement.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 1. What you are building

Turvoo is a simple landing page. It clearly states the benefits, portfolio, how to get started with Turvoo. Its modern, interactive, clear and high converting to leads.

You will build the Sanity content model.

---

# 2. How to work

Follow this loop for every request:

1. Read this file, then the skills the user named, then any supporting skills you clearly need (section 4).
2. Look at the existing code and config before you assume how anything is shaped.
3. Ask one focused question only if the task is genuinely ambiguous.
4. Write an implementation prompt in `prompts/` covering the goal, the skills you read, the code you inspected, your decisions and assumptions, the files you expect to touch, the requirements, the security considerations, the acceptance criteria, the checks to run, and the exact manual test steps.
5. Ask the user in the question panel, with Yes and No as selectable options so they choose instead of typing: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`
6. Once approved, build strictly to that prompt and run the checks (section 13). Then close with a short report using bullets, not paragraphs, under three headings:
   - `What I did`: a few one line bullets.
   - `Test`: numbered steps to run or see.
   - `Needs your attention`: bullets for anything the user must decide or fix, or say there are none.
     Keep every line short. Put detail and rationale in the prompt file, not in this report.

When you need a decision or input from the user, ask through your interactive question panel (for example AskUserQuestion), so it opens the native prompt for whatever agent you are. Use plain text only if you have no such panel.

Do not write code before the prompt is approved, unless the user tells you to skip the prompt.

---

# 3. UI work

You do not design UI. The user gives you the design as desktop images plus a prompt. Reproduce them exactly: layout, spacing, typography, color, and states. There is no mobile reference, so make each page responsive down to mobile, adapting the layout sensibly (stack columns, collapse the lesson sidebar) while keeping the desktop exact. Do not restyle or improve beyond the reference. Reuse the components and Tailwind patterns already in the project before you add new ones. When there is a reference image, it is the source of truth, and this file says nothing about visuals on purpose.

---

# 4. Skills to lean on

Reach for these instead of guessing. Do not invent new ones.

- sanity-best-practices (`~/.claude/skills/sanity-best-practices/SKILL.md`), for workspace setup, schema, GROQ, TypeGen, Portable Text, and framework integration.
- sanity-migration (`~/.claude/skills/sanity-migration/SKILL.md`), for importing content into Sanity from another system.
- create-agent-with-sanity-context (`.claude/skills/create-agent-with-sanity-context/SKILL.md`), for wiring the search agent to the Context MCP.
- dial-your-context (`.claude/skills/dial-your-context/SKILL.md`), for the Context document's instructions and content filter.
- shape-your-agent (`.claude/skills/shape-your-agent/SKILL.md`), for the search agent's tone and guardrails.
- `node_modules/next/dist/docs/`, for Next.js routing, server and client boundaries, and data fetching.

For `next-sanity`, Portable Text, Tailwind, PostHog, and the AI SDK, follow the package docs and existing patterns.

---

# 5. How the app is structured

The project is two standalone workspaces in one repo. Build it this way and do not embed the Studio inside Next.js. Keeping them separate is what preserves independent deploys, Studio auto updates, and TypeGen.

- A Studio workspace holds the Sanity schema nothing else.
- A web workspace holds the Next.js pages and all server side integration.

Inside web, keep these responsibilities apart:

- Data access is a server only Sanity client and fetch helper, reading a private dataset with a token.
- Analytics is PostHog, running in the browser with the public project key and capturing the engagement events. Any server side capture keeps a private key on the server.

Never cross these boundaries. The browser holds no token, never calls the MCP or the LLM, and never writes content or progress. Any write, such as saving progress, goes through a server route. The UI only shows stored data.

---

# 6. Tech stack

Use Next.js (App Router), PostHog for product analytics, Sanity Studio with `next-sanity`, `@sanity/image-url`, and `@portabletext/react`, Tailwind with typography, the Sanity Context MCP over server side HTTP, the Vercel AI SDK with the OpenAI provider, `react-markdown` only for rendering the search reply, Zod for validating structured output, and TypeScript.

Do not use the `@sanity/context` Studio plugin when it lags the Studio's Sanity major version, `text::semanticSimilarity()` unless embeddings are enabled, an embedded Studio, a public dataset, a client side token, or a separate backend framework. Section 12 explains why.

---

# 7. Decisions already made for you

Build to these unless the user changes them. They exist because search quality and safety depend on them.

---

# 8. The data you are modeling

---

# 9. Things that will trip you up

You cannot infer these from the code, so keep them in mind.

- The Context MCP only serves a dataset that has a deployed Studio application. A schema only deploy is not enough.
- The `@sanity/context` Studio plugin may not support the Studio's current Sanity major version. When it does not, do not install it. Edit the Context document by import, and expect Conversation Insights to be unavailable until the plugin catches up.
- If the system prompt is a template literal, escape backticks inside it or the build fails.
- The dataset is private. Keep the read token on the server, never expose it to the client, and fetch all content server side.
- Keep project ids and keys in env, expose only client safe values to the browser, and keep a committed `.env.example` as the canonical list.
- Any write token, such as the one used to save progress, is server only and used only inside a server route. The browser never writes content or progress.
- PostHog's project key is public by design and may reach the browser. Any private PostHog API key stays server only.

---

# 10. Checks to run

Run these from the correct workspace and report the real output. Never claim a check passed without running it.

- In web: type check, lint, a production build when routes, config, or server code change, and the dev server.
- In Studio: deploy the Studio application, which is required before the Context MCP will serve the dataset, deploy the schema, and import content and config documents.

After you implement, run the type check and lint at minimum, add a build when routes, config, or server modules changed, and for search or ingestion work verify against the live MCP endpoint.

---

# 11. When in doubt

Keep it small. Use the relevant skill. Preserve the server and client boundaries and the private token rule. Match the provided UI exactly. Get specifics from setup and config instead of hardcoding them. Save a prompt and get approval before coding. Run the checks. Share exact test steps.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
