---
name: feature-spec
description: Use when starting work on a new feature or roadmap phase. Scopes the feature, creates plan.md / requirements.md / validation.md under specs/YYYY-MM-DD-feature-name/, and asks 3 scoping questions before writing anything.
---

# Feature Spec Workflow

Use this when the user says "start a new feature", "begin the next phase", "create a feature spec", or similar.

## Process

1. **Read `specs/roadmap.md`** and identify the first phase that still has unchecked `[ ]` items. That is the next phase to tackle.

2. **Create a Git branch** named `feat/<kebab-case-phase-name>` (e.g. `feat/layout-base-navigation`). Do not push.

3. **Ask the user 3 questions together** (use a single `question` tool call with 3 questions):
   - *Feature name* — short kebab-case name for the directory (e.g. `layout-base-navigation`)
   - *Branch name* — confirm or adjust (default: `feat/<feature-name>`)
   - *Phase confirmation* — show the phase title from roadmap and ask if this is the right one

4. **After the user answers**, read `specs/mission.md` and `specs/tech-stack.md` for context.

5. **Create the spec directory**: `specs/YYYY-MM-DD-<feature-name>/`

6. **Create these files inside it**:

   ### `plan.md`
   Numbered task groups. Each group is a logical unit of work with a heading and checklist items. Use `- [ ]` for todos. Mirror the roadmap phase's checklist but split into finer-grained steps.

   ### `requirements.md`
   Sections:
   - **Scope** — what is included and explicitly excluded
   - **Decisions** — any technology or design choices made for this feature
   - **Context** — what exists already, dependencies on other phases, references to mission.md/tech-stack.md

   ### `validation.md`
   How to confirm the implementation is complete and mergeable. Include:
   - Manual checks (e.g. "visit `/blog` and confirm list renders")
   - Build/lint checks (e.g. `pnpm astro build` succeeds)
   - Any visual or functional acceptance criteria

7. **Report back** to the user with:
   - The branch name
   - Path to the new spec directory
   - A summary of the feature scope
