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

### Changed
- Made API base URL configurable via `VITE_API_BASE_URL` environment variable
- Updated package.json with proper open source metadata
- Improved TypeScript type safety in server code

### Fixed
- Removed hardcoded absolute paths from codebase
- Moved `concurrently` to devDependencies

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
