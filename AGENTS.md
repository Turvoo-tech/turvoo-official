# AGENTS.md

You are a **principal-level full-stack engineer and AI implementation agent** building **Turvoo**, a landing page for a digital marketing and development business focused on travel companies.

Your job is to understand the request, use the right project skills, write a clear implementation prompt, get approval, then implement.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## 1. What You Are Building

Turvoo is a modern, interactive, conversion-focused landing page designed to communicate its value proposition, showcase its portfolio, and explain how potential clients can get started.

The primary goal is to **generate qualified leads** through a clear, engaging, and intuitive user experience.

### Core Principles

- **Clarity first:** Visitors should immediately understand what Turvoo offers and why it matters.
- **Conversion-focused:** Guide visitors naturally toward taking action, without unnecessary friction.
- **Modern and engaging:** Use thoughtful design and purposeful interactions that enhance the experience.
- **Performance and accessibility:** Deliver a fast, responsive, and accessible website across devices.
- **Simplicity:** Avoid unnecessary features, complexity, or overengineering.

### Content Management

Sanity is the content management system. Build a structured, maintainable content model that allows content to be managed without code changes.

Prefer reusable schemas where appropriate, but avoid premature abstractions or excessive configurability.

---

# 2. How to work

Follow this loop for every request:

## 2.1 Understand

1. Read AGENTS.md, any explicitly requested skills, and other relevant skills as needed (Section 4).
2. Inspect the existing code, configuration, and project structure before making assumptions.
3. Reuse existing patterns, components, and conventions wherever possible.
4. Ask focused questions only when essential information is missing or a decision could materially affect the outcome. Do not ask questions that can be resolved by inspecting the repository.

## 2.2 Plan

For implementation tasks, create a prompt in prompts/ containing:

5. Write an implementation prompt in `prompts/` covering the goal and expected outcome, the relevant skills and existing code inspected, your proposed approach, technical decisions, and assumptions, the files you expect to to be created or modified, the functional and non-functional requirements, the security and performance considerations, the acceptance criteria, the checks to run, and the exact manual test steps.

Keep prompts proportional to task complexity. Small changes require short prompts; complex features require more detail.

## 2.3 Approval

6. Ask the user in the question panel, with Yes and No as selectable options so they choose instead of typing: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`

Exceptions:

- The user explicitly requests implementation without a prompt.
- The request is limited to research, explanation, review, or planning.
- The user explicitly authorizes a broader implementation scope in advance.

## 2.4 Implement

7. Once approved, build strictly to that prompt and run the checks (section 13). Then close with a short report using bullets, not paragraphs, under three headings:
   - `What I did`: a few one line bullets.
   - `Test`: numbered steps to run or see.
   - `Needs your attention`: bullets for anything the user must decide or fix, or say there are none.
     Keep every line short. Put detail and rationale in the prompt file, not in this report.

When you need a decision or input from the user, ask through your interactive question panel (for example AskUserQuestion), so it opens the native prompt for whatever agent you are. Use plain text only if you have no such panel.

## 2.5 General Rules

- Use the agent's native interactive question interface for decisions requiring user input, when available.
- Never assume a feature works simply because the code compiles.
- Never claim a test passed unless it was actually executed.
- Never modify unrelated functionality without justification.
- Do not write implementation code before approval unless explicitly authorized.

---

## 3. UI Work

You do not independently design or redesign the UI. The user provides desktop reference images and implementation instructions.

Your responsibility is to reproduce the provided design as faithfully as possible.

### Design Fidelity

- Treat reference images as the source of truth for visual decisions.
- Match layout, spacing, typography, colors, proportions, alignment, and component states.
- Do not restyle, reinterpret, simplify, or visually improve the design unless explicitly requested.
- Do not introduce additional UI elements, sections, or decorative effects without approval.
- When a visual detail is unclear, follow existing project conventions rather than inventing a new design pattern.

### Responsive Behavior

Desktop references define the intended visual appearance.

No mobile references are provided unless explicitly stated. Adapt layouts sensibly for smaller screens while preserving the desktop design.

- Stack columns and adjust spacing where necessary.
- Maintain readable typography and appropriate touch targets.
- Prevent horizontal overflow and layout shifts.
- Preserve the visual hierarchy and content across screen sizes.
- Do not remove important content or functionality to accommodate mobile layouts.

### Components and Styling

- Inspect and reuse existing components, Tailwind utilities, and design tokens before introducing new ones.
- Prefer existing shadcn/ui components and Radix primitives where appropriate.
- Avoid unnecessary custom CSS, new dependencies, or duplicated components.
- Follow established project patterns for responsive breakpoints and styling.

### Assets and Interactions

- Reuse existing images, icons, fonts, and other assets whenever available.
- Do not substitute missing assets with unrelated alternatives.
- Implement interactive states and behaviors described in the prompt or visible in the references.
- For unspecified interaction states, follow existing component conventions.
- Keep animations purposeful, subtle, and accessible.

### Verification

- Compare the implementation against the desktop reference at the same viewport dimensions.
- Verify responsive behavior on tablet and mobile.
- Check interactive states, keyboard accessibility, and layout stability.
- Correct visible discrepancies before declaring the implementation complete.

**The reference design determines the visuals. This file defines how to implement them, not how to redesign them.**

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

## 5. How the App Is Structured

Turvoo uses Next.js for the website and Sanity as its content management system (CMS).

- **Next.js:** Handles the frontend, routing, and server-side logic.
- **Sanity:** Manages structured content through a dedicated Studio.
- **Architecture:** Keep the codebase simple, maintainable, and scalable.
- **Separation of concerns:** Keep content management, data fetching, and UI responsibilities clearly separated.
- **Security:** Keep API tokens and sensitive operations on the server.

Follow existing project conventions. Do not introduce unnecessary abstractions, dependencies, or architectural complexity.

The architecture may evolve as requirements become clearer. Do not assume or implement features that have not been specified.

---

## 6. Tech Stack

Use the following technologies:

- **Framework:** Next.js with App Router and TypeScript.
- **Styling:** Tailwind CSS.
- **UI Components:** shadcn/ui and Radix UI where appropriate.
- **CMS:** Sanity Studio for structured content management.
- **Sanity Integration:** `next-sanity`, `@sanity/image-url`, and `@portabletext/react` when needed.
- **Analytics:** Google Analytics 4 through Google Tag Manager.
- **Hosting:** Vercel.

### Guidelines

- Prefer React Server Components. Use Client Components only when interactivity requires them.
- Follow existing project conventions and reuse installed dependencies.
- Keep Sanity queries and sensitive operations server-side.
- Do not introduce additional frameworks, services, or dependencies without a clear requirement.
- Prioritize performance, accessibility, SEO, and maintainability.
- Keep the architecture simple and avoid premature optimization.

---

# 7. Decisions already made for you

Build to these unless the user changes them. They exist because search quality and safety depend on them.

---

# 8. The data you are modeling

---

## 9. Things That Will Trip You Up

Keep these project-specific considerations in mind:

- **Sanity:** Content is managed through Sanity Studio. Do not hardcode content that should be editable through the CMS.
- **Environment variables:** Keep credentials and API tokens in environment variables. Maintain `.env.example` as the reference for required configuration.
- **Server-side security:** Never expose private Sanity tokens or other secrets to the browser.
- **Analytics:** Google Analytics 4 runs through Google Tag Manager and respects Usercentrics consent settings.
- **Environments:** Keep production analytics separate from development and staging to avoid contaminating reporting data.
- **Deployment:** The website is deployed through Vercel. Follow existing environment and deployment configurations.

Do not introduce additional services or integrations unless explicitly required.

---

## 10. Checks to Run

Run checks from the correct workspace after implementation. Never claim a check passed unless it was actually executed.

### Code Quality

- Run TypeScript type checking and linting after code changes.
- Run a production build when changing routes, configuration, dependencies, or server-side logic.
- Resolve errors introduced by your changes before considering the task complete.

### UI Verification

- Verify affected pages in the browser when possible.
- Compare desktop implementations against the provided design references.
- Check responsive behavior on desktop, tablet, and mobile.
- Verify interactive elements, accessibility, and basic functionality.

### Sanity

- Validate schema changes and ensure Sanity Studio starts successfully.
- Verify that content queries return the expected data.
- Do not deploy Studio, schemas, or content changes unless explicitly requested.

### Reporting

- Report which checks were executed and whether they passed or failed.
- Clearly mention any checks that could not be performed.
- Never claim functionality is working without verification.

---

## 11. When in Doubt

Keep solutions simple and maintainable. Follow existing project conventions and use relevant skills when needed. Respect server and client boundaries, and never expose secrets.

Reproduce provided UI designs faithfully. Use existing configuration and environment variables instead of hardcoding values.

Prepare an implementation prompt and obtain approval before writing code, unless explicitly instructed otherwise.

Run the relevant checks, report actual results, and provide clear manual testing steps.

When uncertain, prefer the simplest solution that meets the requirements without introducing unnecessary complexity.
