# AI Security Maturity Model (AISMM)

The AISMM v1.1 provides a comprehensive, standards-aligned maturity model for organizations to assess and advance their AI security posture across three integrated pillars:

- **Security for AI** - Protecting AI systems throughout their lifecycle
- **AI for Security** - Deploying AI as a security capability  
- **Security from AI** - Managing AI-specific risks and harms

This version incorporates guidance from:
- NIST AI Risk Management Framework (AI RMF 2.0) and Generative AI Profile (NIST AI 600-1)
- EU AI Act
- ISO/IEC 42001 (AI Management Systems)
- OWASP GenAI Security initiatives

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for YAML validation)
- Ollama (for AI agent analysis) - [Install Ollama](https://ollama.ai)

### Installation

```bash

# Install webapp dependencies
cd webapp
npm install

# (Optional) Set up Python virtual environment for validation
cd ..
python3 -m venv .venv
source .venv/bin/activate  # On macOS/Linux
pip install pyyaml

# (Optional) Install and start Ollama for AI agent features
ollama serve
ollama pull llama3.2  # or gemma3:27b for better quality
```

### Running the Application

```bash
# Navigate to webapp directory
cd webapp

# Run both backend and frontend together
npm run dev:all

# Or run separately:
npm run dev        # Frontend only (http://localhost:5173)
npm run dev:server # Backend only (http://localhost:3001)
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### Using AI Agent Analysis

The AISMM includes AI-powered agents that analyze completed assessments and generate comprehensive security maturity reports.

#### Prerequisites
1. **Start Ollama**:
   ```bash
   ollama serve
   ```

2. **Pull a model** (choose one):
   ```bash
   ollama pull llama3.2      # Lightweight, fast
   ollama pull gemma3:27b    # Better quality, slower
   ollama pull llama3.1      # Balanced
   ```

#### Via Web UI
1. Navigate to an organization with completed assessments
2. Click the **"AI Agentic Analysis"** button in the Maturity Dashboard header
3. Wait 1-2 minutes for analysis to complete
4. View the comprehensive report with insights, recommendations, and priorities

#### Via CLI
```bash
# Run analysis for an organization
npm run agent -- --org <organization-id>

# Example:
npm run agent -- --org 58020301-7ec4-4dd5-8db1-c771fcdd6315

# Configure Ollama settings
export OLLAMA_MODEL=gemma3:27b          # Change model
export OLLAMA_TEMPERATURE=0.3            # Adjust creativity
export OLLAMA_BASE_URL=http://localhost:11434
```

The agent generates:
- Executive summary across all three pillars
- Key milestones and achievements per pillar
- Areas for improvement with gap analysis
- Prioritized recommendations (critical/high/medium/low)
- Cross-pillar insights and strategic guidance

## Development Guide

### Project Structure

```
AISMM_V10/
├── aismm_definition/
│   └── aismm.yaml              # Canonical AISMM model definition
├── scripts/
│   ├── validate_yaml.py        # YAML validation script
│   └── sync_webapp.py          # Sync YAML to webapp
├── webapp/
│   ├── public/
│   │   └── aismm.yaml          # Synced YAML for webapp
│   ├── server/
│   │   └── index.ts            # Express API server
│   ├── src/
│   │   ├── components/         # React UI components
│   │   ├── api/                # API client
│   │   ├── types/              # TypeScript types
│   │   └── react_agent/        # AI agent implementation
│   │       ├── agents/         # Pillar-specific agents
│   │       ├── tools/          # LangChain tools
│   │       └── config/         # Agent configuration
│   └── data/
│       └── aismm.db            # SQLite database
└── ExternalReferences/         # Supporting documentation
```

### Syncing YAML Changes

When you modify the AISMM definition:

```bash
# 1. Edit the canonical YAML
vim aismm_definition/aismm.yaml

# 2. Validate changes
python3 scripts/validate_yaml.py

# 3. Sync to webapp
cd webapp
npm run sync

# 4. Restart the application for changes to take effect
npm run dev:all
```

### YAML Validation Rules

The `validate_yaml.py` script enforces:
- **No tabs** - Use spaces for indentation only
- **Required structure**: `aismm.components` with `pillars`, `domains`, `maturity_levels`
- **Complete maturity levels**: Each domain must have levels 1-5
- **Valid question types**: `multiple_choice`, `true_false`, `scoring`, `free_text`, `numeric`
- **Consistent IDs**: Both `id` and `id_code` for components and domains

### Available Scripts

```bash
# Webapp scripts (run from webapp/ directory)
npm run dev           # Start Vite dev server
npm run dev:server    # Start Express API server
npm run dev:all       # Start both frontend and backend
npm run build         # Build for production
npm run preview       # Preview production build
npm run seed          # Seed database with sample data
npm run sync          # Sync YAML from aismm_definition/
npm run agent         # Run AI agent CLI

# Validation (run from project root)
python3 scripts/validate_yaml.py
```

### Database Management

The SQLite database is automatically created on first run. To reset:

```bash
cd webapp
rm data/aismm.db
npm run seed  # Re-seed with sample data
```

### Configuring AI Agents

Edit [webapp/src/react_agent/config/index.ts](webapp/src/react_agent/config/index.ts) or use environment variables:

```bash
export OLLAMA_BASE_URL=http://localhost:11434
export OLLAMA_MODEL=llama3.2
export OLLAMA_TEMPERATURE=0.3
export OLLAMA_MAX_TOKENS=4096
export AGENT_MAX_ITERATIONS=10
export AGENT_VERBOSE=true
```

### Building for Production

```bash
cd webapp
npm run build

# Build output in webapp/dist/
# Deploy both:
# - Static files from dist/ (frontend)
# - server/index.ts with Node.js (backend)
```

## Features

- 📊 **Assessment Management** - Create and manage organization security assessments
- 📈 **Maturity Dashboard** - Track progress across pillars and domains over time
- 🤖 **AI Agent Analysis** - LangChain-powered agents analyze assessments and generate insights
- 📱 **Responsive UI** - Modern React interface with Tailwind CSS
- 🔄 **Real-time Scoring** - Automatic calculation of maturity levels and scores
- 📥 **Data Export** - Download assessment reports and AI analysis as markdown
- 🛡️ **Standards-Aligned** - Based on NIST AI RMF, EU AI Act, ISO 42001, OWASP

## Architecture

### Frontend
- **React + TypeScript** - Type-safe UI components
- **Vite** - Fast build tooling and HMR
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide Icons** - Modern iconography

### Backend
- **Express.js** - RESTful API server
- **SQLite** - Embedded database
- **Better-sqlite3** - Synchronous SQLite bindings

### AI Agents
- **LangChain** - Agent framework and tool integration
- **LangGraph** - ReAct pattern state machine
- **Ollama** - Local LLM inference
- **Three specialized agents** - One per AISMM pillar

## Contributing

1. Validate YAML changes: `python3 scripts/validate_yaml.py`
2. Sync to webapp: `cd webapp && npm run sync`
3. Test changes: `npm run dev:all`
4. Keep commits focused on single components/domains
5. Follow existing code structure and naming conventions

## License

[Add your license here] 