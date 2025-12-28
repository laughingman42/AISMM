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

MIT License - see [LICENSE](../LICENSE) for details.

Part of the AISMM (AI Security Maturity Model) project.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ Assessment  │  │Organization │  │    Results &        │ │
│  │    Form     │  │  Dashboard  │  │    Visualizations   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST
┌───────────────────────────▼─────────────────────────────────┐
│                   Express API Server                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │Organizations│  │ Assessments │  │   AI Agent API      │ │
│  │   CRUD      │  │    CRUD     │  │   (Orchestrator)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
         │                                    │
         ▼                                    ▼
┌─────────────────┐              ┌─────────────────────────────┐
│  SQLite (data/) │              │   LangChain React Agents    │
│  ┌───────────┐  │              │  ┌─────────────────────┐   │
│  │   orgs    │  │              │  │  Pillar Agents (3)  │   │
│  │assessments│  │              │  └─────────────────────┘   │
│  │ responses │  │              │            │               │
│  │  scores   │  │              │            ▼               │
│  └───────────┘  │              │  ┌─────────────────────┐   │
└─────────────────┘              │  │   Ollama (LLM)      │   │
                                 │  └─────────────────────┘   │
                                 └─────────────────────────────┘
```

## Deployment

> **Note**: This application is designed as a **local development/assessment tool** and does not include authentication or authorization. Do not expose it to the public internet without adding proper security measures.

### Local Development

```bash
npm run dev:all
```

### Production Build

```bash
npm run build
npm run preview  # Preview built app
```

For production deployment, you'll need to:
1. Configure `VITE_API_BASE_URL` environment variable
2. Set up a reverse proxy (nginx, etc.)
3. Add authentication if exposing publicly
4. Consider using a more robust database for high-volume usage

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.
    },
  },
])
```
