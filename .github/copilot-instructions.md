# GitHub Copilot / AI Agent Instructions for AISMM_V10

This repository contains the AISMM (AI Security Maturity Model) definition data and simple validation tooling. The goal of an AI coding agent working here is to help maintain, validate, and evolve the YAML model and small helper scripts.

Key facts you'll need immediately
- **Primary data:** `aismm_definition/aismm.yaml` is the canonical source. Treat it as data-first (not code).
- **Validation script:** `webapp/scripts/validate_yaml.ts` performs structural checks and is the standard way to validate changes locally and in CI.
- **Build system:** The webapp uses Vite + TypeScript. Validation scripts use tsx for direct execution.

Developer workflows (commands)
- Install dependencies: `cd webapp && npm install`
- Run YAML validation: `cd webapp && npm run validate` — this exits non-zero on failure and prints helpful diagnostics.
- Start development server: `cd webapp && npm run dev:all`

Important project-specific conventions
- YAML MUST use spaces for indentation. The validator rejects files containing tab characters and prints offending line numbers.
- Top-level structure expectations (enforced by `webapp/scripts/validate_yaml.ts`):
  - Top-level mapping with key `aismm` (a mapping/object).
  - `components` must be a list of mappings; each component must have `id` and `id_code` and a `domains` list.
  - Each domain must include `id`, `id_code`, and `maturity_levels` containing levels 1..5 (integers).
  - `assessment_questionnaire.questions` must be a list; each question must include `id`, `type`, `title`, `help_text`, and `required`.
  - Allowed question `type` values: `multiple_choice`, `true_false`, `scoring`, `free_text`, `numeric`.

Naming and structural patterns to follow
- Use short, stable `id` strings (e.g., `governance_risk_compliance`) and a parallel `id_code` (e.g., `S01.GRC01`) for display/exports.
- `maturity_levels` should be enumerated objects with `level` keys exactly 1..5 and descriptive `name` and `description` fields.
- Questionnaire entries should be explicit: if `options` are provided for `multiple_choice`, they should be a list of `code`/`label` mappings.

Files and locations to reference
- `aismm_definition/aismm.yaml` — canonical model (example of all conventions).
- `webapp/scripts/validate_yaml.ts` — contains the exact validation rules; prefer updating the validator if you need to support new structure.
- `ExternalReferences/` — supporting artifacts referenced from the model (keep relative links stable).

When editing the YAML
- Run `cd webapp && npm run validate` before committing; fix any reported errors.
- Keep diffs focused: prefer multiple small commits (one component/domain change per commit) to simplify review.
- Avoid reformatting unrelated sections; whitespace and ordering matter for clean diffs.

If you need to update validation rules
- Modify `webapp/scripts/validate_yaml.ts` and add unit-style checks or examples nearby. The script is intentionally small and readable — extend it conservatively and add clear error messages.

Examples (copyable)
- Validate locally:
  - `cd webapp && npm run validate`

Questions or missing information
- If any structural rule appears missing or ambiguous in `aismm.yaml`, update `webapp/scripts/validate_yaml.ts` first and then adjust data files. Ask reviewers for schema changes.

If anything in this file is unclear or you want more examples (e.g., typical PR checklist, release notes, or CI instructions), tell me which section to expand.
