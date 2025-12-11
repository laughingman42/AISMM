# AISMM Web Application

AI Security Maturity Model (AISMM) assessment platform with integrated AI-powered analysis agents.

## Features

- **Assessment Management**: Create and manage organizations, conduct security maturity assessments
- **Interactive Questionnaire**: Domain-based questions covering all three AISMM pillars
- **Real-time Scoring**: Automatic calculation of maturity levels and scores
- **AI-Powered Analysis**: LangChain React agents that analyze assessments and generate comprehensive reports

## Prerequisites

- **Node.js** 18.0.0 or higher
- **Ollama** (for AI agent functionality) running locally with a compatible model

## Quick Start

```bash
# Install dependencies
npm install

# Start the development server (frontend + API)
npm run dev:all

# Or run separately:
npm run dev      # Frontend only (Vite)
npm run server   # API server only
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run server` | Start Express API server |
| `npm run dev:all` | Start both frontend and API server |
| `npm run agent` | Run the AI agent CLI |
| `npm run seed` | Seed the database with sample data |
| `npm run build` | Build for production |

## AI Agent

The integrated React agent analyzes organizational assessments using three specialized pillar agents:

- **Security for AI Agent**: Analyzes protection of AI systems
- **AI for Security Agent**: Evaluates AI-enhanced security operations
- **Security from AI Agent**: Assesses defenses against AI threats

### Using the Agent CLI

```bash
# List organizations
npm run agent -- --list

# Analyze an organization
npm run agent -- --org <organization-id>

# Save report to file
npm run agent -- --org <id> --output markdown --file report.md
```

### Using the Agent API

```bash
# Generate analysis via API
curl -X POST http://localhost:3001/api/organizations/<id>/analyze

# Check agent status
curl http://localhost:3001/api/agent/status
```

### Agent Configuration

Configure via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | `llama3.2` | Model to use |
| `OLLAMA_TEMPERATURE` | `0.3` | Generation temperature |

## Project Structure

```
webapp/
├── src/
│   ├── components/        # React components
│   ├── api/               # API client
│   ├── types/             # TypeScript types
│   └── react_agent/       # AI agent module
│       ├── agents/        # Pillar agents & orchestrator
│       ├── tools/         # LangChain tools
│       ├── config/        # Agent configuration
│       └── types/         # Agent types
├── server/                # Express API server
├── public/                # Static assets (includes aismm.yaml)
└── data/                  # SQLite database
```

## API Endpoints

### Organizations
- `GET /api/organizations` - List all organizations
- `GET /api/organizations/:id` - Get organization with assessments
- `POST /api/organizations` - Create organization
- `DELETE /api/organizations/:id` - Delete organization

### Assessments
- `GET /api/assessments` - List assessments
- `GET /api/assessments/:id` - Get assessment with responses
- `POST /api/assessments` - Create assessment
- `PUT /api/assessments/:id` - Update assessment

### Agent
- `POST /api/organizations/:id/analyze` - Generate AI analysis report
- `GET /api/agent/status` - Check agent/Ollama status

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Recharts
- **Backend**: Express.js, SQLite (better-sqlite3)
- **AI Agent**: LangChain, LangGraph, Ollama
- **Build**: Vite, tsx

## License

Part of the AISMM (AI Security Maturity Model) project.

---

## Original Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
