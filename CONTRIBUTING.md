# Contributing to AISMM

Thank you for your interest in contributing to the AI Security Maturity Model (AISMM)! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow. Please be respectful, inclusive, and considerate in all interactions.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Types of Contributions

We welcome several types of contributions:

1. **AISMM Model Updates** - Improvements to `aismm_definition/aismm.yaml`
2. **Webapp Enhancements** - Features and fixes for the assessment web application
3. **Documentation** - README improvements, inline documentation, tutorials
4. **Bug Reports** - Issue reports with reproduction steps
5. **Feature Requests** - Well-documented feature proposals

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AISMM_V10.git
   cd AISMM_V10
   ```

2. **Install dependencies**
   ```bash
   cd webapp
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```

4. **Start development servers**
   ```bash
   npm run dev:all
   ```

5. **Validate AISMM YAML changes**
   ```bash
   cd ..
   python3 scripts/validate_yaml.py
   ```

## How to Contribute

### For YAML Model Changes

1. Edit `aismm_definition/aismm.yaml`
2. Run `python3 scripts/validate_yaml.py` to validate
3. Keep changes focused - one component/domain per commit
4. Avoid reformatting unrelated sections

### For Webapp Changes

1. Create a feature branch from `main`
2. Make your changes with appropriate tests
3. Ensure linting passes: `npm run lint`
4. Test your changes locally
5. Submit a pull request

### Reporting Bugs

When reporting bugs, please include:

- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Environment details (OS, Node version, browser)
- Screenshots if applicable

### Suggesting Features

Feature requests should include:

- Clear description of the feature
- Use case and motivation
- Potential implementation approach (optional)

## Pull Request Process

1. **Create a branch** with a descriptive name:
   ```bash
   git checkout -b feature/add-new-domain
   git checkout -b fix/assessment-scoring-bug
   ```

2. **Make focused commits** with clear messages:
   ```
   feat: add threat modeling domain to AISMM model
   fix: correct maturity level calculation in scoring
   docs: update README with deployment instructions
   ```

3. **Update documentation** if your changes affect usage

4. **Ensure all checks pass**:
   - YAML validation (for model changes)
   - Linting (for code changes)
   - Build succeeds

5. **Submit the PR** with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots for UI changes

6. **Respond to review feedback** promptly

## Style Guidelines

### YAML (aismm.yaml)

- Use spaces for indentation (no tabs)
- Use short, stable `id` strings (e.g., `governance_risk_compliance`)
- Include parallel `id_code` for display (e.g., `S01.GRC01`)
- Enumerate `maturity_levels` 1-5 with `name` and `description`

### TypeScript/React

- Follow existing code patterns
- Use TypeScript types (avoid `any`)
- Add JSDoc comments for public functions
- Use meaningful variable/function names

### Commit Messages

Follow conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

## Questions?

If you have questions about contributing, feel free to:

1. Open a discussion or issue
2. Review existing issues and PRs for context

Thank you for contributing to AISMM!
