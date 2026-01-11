# Changelog

All notable changes to the AISMM project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- MIT License for open source publication
- CONTRIBUTING.md with contribution guidelines
- Environment configuration via `.env.example`
- Vitest testing infrastructure
- Comprehensive `framework_alignment` sections for all 26 domains in aismm.yaml
- New `rationale.md` documentation explaining framework control mappings for each domain
- Framework coverage expanded to include:
  - NIST CSF 2.0 (updated from 1.1 format)
  - ISO 27001 (Annex A controls)
  - ISO 42001 (AI management system clauses)
  - NIST AI RMF (GOVERN, MAP, MEASURE, MANAGE functions)
  - SOC 2 (Trust Services Criteria)
  - MITRE ATLAS (adversarial ML attack techniques)
  - OWASP GenAI Top 10 2025 (LLM vulnerabilities)
  - NIST SP 800-207 (Zero Trust Architecture)
  - COBIT (governance processes)
  - OWASP ASVS/SAMM (application security)
  - ISO 27701 (privacy controls)
  - NIST SSDF (secure development)

### Changed
- Made API base URL configurable via `VITE_API_BASE_URL` environment variable
- Updated package.json with proper open source metadata
- Improved TypeScript type safety in server code
- Updated all NIST CSF references from 1.1 to 2.0 format (e.g., "RS.AN-1" → "RS.AN-01")
- Optimized framework mappings: removed attack frameworks (MITRE ATLAS, OWASP GenAI) from governance/process domains, retained for detection/defense domains
- Standardized indicator naming across all domain framework_alignment sections

### Fixed
- Removed hardcoded absolute paths from codebase
- Moved `concurrently` to devDependencies
- Fixed duplicate `nist_ai_rmf` key in asset_management domain framework_alignment

### Security
- Documented that this is a local development tool without authentication

## [0.1.0] - 2025-12-28

### Added
- Initial AISMM model definition in YAML format
- Three-pillar assessment framework:
  - Security for AI
  - Security from AI  
  - AI for Security
- React-based assessment web application
- SQLite backend for assessment storage
- AI-powered analysis agent using LangChain/Ollama
- YAML validation script
- Assessment questionnaire with multiple question types
- Maturity level scoring (1-5 scale)
- Organization and assessment management
- Domain-level score tracking
- Assessment results visualization with charts

### Technical
- Vite + React 19 + TypeScript frontend
- Express.js API server
- better-sqlite3 for data persistence
- LangChain integration for AI analysis
- Tailwind CSS for styling
