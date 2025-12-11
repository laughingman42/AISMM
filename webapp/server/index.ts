/**
 * AISMM Assessment API Server
 * Handles organizations, assessments, and responses storage using SQLite
 */

import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, '..', 'data', 'aismm.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  -- Organizations table
  CREATE TABLE IF NOT EXISTS organizations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    industry TEXT,
    size TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Assessments table
  CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'in_progress',
    model_version TEXT NOT NULL,
    started_at TEXT DEFAULT (datetime('now')),
    completed_at TEXT,
    total_score REAL,
    maturity_level INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
  );

  -- Assessment responses table
  CREATE TABLE IF NOT EXISTS responses (
    id TEXT PRIMARY KEY,
    assessment_id TEXT NOT NULL,
    domain_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    response_value TEXT,
    response_index INTEGER,
    response_text TEXT,
    score REAL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (assessment_id) REFERENCES assessments(id),
    UNIQUE(assessment_id, question_id)
  );

  -- Domain scores table (calculated scores per domain)
  CREATE TABLE IF NOT EXISTS domain_scores (
    id TEXT PRIMARY KEY,
    assessment_id TEXT NOT NULL,
    domain_id TEXT NOT NULL,
    pillar_id TEXT NOT NULL,
    raw_score REAL,
    weighted_score REAL,
    maturity_level INTEGER,
    questions_answered INTEGER,
    questions_total INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (assessment_id) REFERENCES assessments(id),
    UNIQUE(assessment_id, domain_id)
  );

  -- Create indexes
  CREATE INDEX IF NOT EXISTS idx_assessments_org ON assessments(organization_id);
  CREATE INDEX IF NOT EXISTS idx_responses_assessment ON responses(assessment_id);
  CREATE INDEX IF NOT EXISTS idx_domain_scores_assessment ON domain_scores(assessment_id);
`);

console.log('Database initialized at:', dbPath);

// ============ ORGANIZATION ENDPOINTS ============

// Get all organizations
app.get('/api/organizations', (req, res) => {
  try {
    const orgs = db.prepare(`
      SELECT o.*, 
        (SELECT COUNT(*) FROM assessments WHERE organization_id = o.id) as assessment_count,
        (SELECT MAX(started_at) FROM assessments WHERE organization_id = o.id) as last_assessment
      FROM organizations o
      ORDER BY o.created_at DESC
    `).all();
    res.json(orgs);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get single organization with assessments
app.get('/api/organizations/:id', (req, res) => {
  try {
    const org = db.prepare('SELECT * FROM organizations WHERE id = ?').get(req.params.id);
    if (!org) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    const assessments = db.prepare(`
      SELECT * FROM assessments 
      WHERE organization_id = ? 
      ORDER BY started_at DESC
    `).all(req.params.id);
    res.json({ ...org, assessments });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Create organization
app.post('/api/organizations', (req, res) => {
  try {
    const { name, description, industry, size } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const id = uuidv4();
    db.prepare(`
      INSERT INTO organizations (id, name, description, industry, size)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, name, description || null, industry || null, size || null);
    
    const org = db.prepare('SELECT * FROM organizations WHERE id = ?').get(id);
    res.status(201).json(org);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update organization
app.put('/api/organizations/:id', (req, res) => {
  try {
    const { name, description, industry, size } = req.body;
    db.prepare(`
      UPDATE organizations 
      SET name = ?, description = ?, industry = ?, size = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(name, description, industry, size, req.params.id);
    
    const org = db.prepare('SELECT * FROM organizations WHERE id = ?').get(req.params.id);
    res.json(org);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Delete organization
app.delete('/api/organizations/:id', (req, res) => {
  try {
    // Delete all related data
    const assessmentIds = db.prepare('SELECT id FROM assessments WHERE organization_id = ?')
      .all(req.params.id) as { id: string }[];
    
    for (const { id } of assessmentIds) {
      db.prepare('DELETE FROM responses WHERE assessment_id = ?').run(id);
      db.prepare('DELETE FROM domain_scores WHERE assessment_id = ?').run(id);
    }
    db.prepare('DELETE FROM assessments WHERE organization_id = ?').run(req.params.id);
    db.prepare('DELETE FROM organizations WHERE id = ?').run(req.params.id);
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ============ ASSESSMENT ENDPOINTS ============

// Get all assessments (optionally filter by org)
app.get('/api/assessments', (req, res) => {
  try {
    const { organization_id } = req.query;
    let query = `
      SELECT a.*, o.name as organization_name
      FROM assessments a
      JOIN organizations o ON a.organization_id = o.id
    `;
    const params: any[] = [];
    
    if (organization_id) {
      query += ' WHERE a.organization_id = ?';
      params.push(organization_id);
    }
    query += ' ORDER BY a.started_at DESC';
    
    const assessments = db.prepare(query).all(...params);
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get single assessment with responses
app.get('/api/assessments/:id', (req, res) => {
  try {
    const assessment = db.prepare(`
      SELECT a.*, o.name as organization_name
      FROM assessments a
      JOIN organizations o ON a.organization_id = o.id
      WHERE a.id = ?
    `).get(req.params.id);
    
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    
    const responses = db.prepare(`
      SELECT * FROM responses WHERE assessment_id = ?
    `).all(req.params.id);
    
    const domainScores = db.prepare(`
      SELECT * FROM domain_scores WHERE assessment_id = ?
    `).all(req.params.id);
    
    res.json({ ...assessment, responses, domain_scores: domainScores });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Create new assessment
app.post('/api/assessments', (req, res) => {
  try {
    const { organization_id, name, description, model_version } = req.body;
    if (!organization_id || !name || !model_version) {
      return res.status(400).json({ error: 'organization_id, name, and model_version are required' });
    }
    
    const id = uuidv4();
    db.prepare(`
      INSERT INTO assessments (id, organization_id, name, description, model_version, status)
      VALUES (?, ?, ?, ?, ?, 'in_progress')
    `).run(id, organization_id, name, description || null, model_version);
    
    const assessment = db.prepare('SELECT * FROM assessments WHERE id = ?').get(id);
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update assessment
app.put('/api/assessments/:id', (req, res) => {
  try {
    const { name, description, status, total_score, maturity_level } = req.body;
    const updates: string[] = [];
    const params: any[] = [];
    
    if (name !== undefined) { updates.push('name = ?'); params.push(name); }
    if (description !== undefined) { updates.push('description = ?'); params.push(description); }
    if (status !== undefined) { 
      updates.push('status = ?'); 
      params.push(status);
      if (status === 'completed') {
        updates.push("completed_at = datetime('now')");
      }
    }
    if (total_score !== undefined) { updates.push('total_score = ?'); params.push(total_score); }
    if (maturity_level !== undefined) { updates.push('maturity_level = ?'); params.push(maturity_level); }
    
    if (updates.length > 0) {
      params.push(req.params.id);
      db.prepare(`UPDATE assessments SET ${updates.join(', ')} WHERE id = ?`).run(...params);
    }
    
    const assessment = db.prepare('SELECT * FROM assessments WHERE id = ?').get(req.params.id);
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Delete assessment
app.delete('/api/assessments/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM responses WHERE assessment_id = ?').run(req.params.id);
    db.prepare('DELETE FROM domain_scores WHERE assessment_id = ?').run(req.params.id);
    db.prepare('DELETE FROM assessments WHERE id = ?').run(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ============ RESPONSE ENDPOINTS ============

// Save/update a response
app.post('/api/assessments/:assessmentId/responses', (req, res) => {
  try {
    const { domain_id, question_id, response_value, response_index, response_text, score } = req.body;
    const assessment_id = req.params.assessmentId;
    
    if (!domain_id || !question_id) {
      return res.status(400).json({ error: 'domain_id and question_id are required' });
    }
    
    // Check if response exists
    const existing = db.prepare(
      'SELECT id FROM responses WHERE assessment_id = ? AND question_id = ?'
    ).get(assessment_id, question_id) as { id: string } | undefined;
    
    if (existing) {
      // Update
      db.prepare(`
        UPDATE responses 
        SET response_value = ?, response_index = ?, response_text = ?, score = ?, updated_at = datetime('now')
        WHERE id = ?
      `).run(response_value, response_index, response_text, score, existing.id);
      
      const response = db.prepare('SELECT * FROM responses WHERE id = ?').get(existing.id);
      res.json(response);
    } else {
      // Insert
      const id = uuidv4();
      db.prepare(`
        INSERT INTO responses (id, assessment_id, domain_id, question_id, response_value, response_index, response_text, score)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, assessment_id, domain_id, question_id, response_value, response_index, response_text, score);
      
      const response = db.prepare('SELECT * FROM responses WHERE id = ?').get(id);
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Batch save responses
app.post('/api/assessments/:assessmentId/responses/batch', (req, res) => {
  try {
    const { responses } = req.body;
    const assessment_id = req.params.assessmentId;
    
    if (!Array.isArray(responses)) {
      return res.status(400).json({ error: 'responses must be an array' });
    }
    
    const insertStmt = db.prepare(`
      INSERT OR REPLACE INTO responses (id, assessment_id, domain_id, question_id, response_value, response_index, response_text, score, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    
    const transaction = db.transaction((items: any[]) => {
      for (const item of items) {
        // Check for existing
        const existing = db.prepare(
          'SELECT id FROM responses WHERE assessment_id = ? AND question_id = ?'
        ).get(assessment_id, item.question_id) as { id: string } | undefined;
        
        const id = existing?.id || uuidv4();
        insertStmt.run(
          id, 
          assessment_id, 
          item.domain_id, 
          item.question_id, 
          item.response_value, 
          item.response_index, 
          item.response_text, 
          item.score
        );
      }
    });
    
    transaction(responses);
    
    const savedResponses = db.prepare('SELECT * FROM responses WHERE assessment_id = ?').all(assessment_id);
    res.json(savedResponses);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get responses for assessment
app.get('/api/assessments/:assessmentId/responses', (req, res) => {
  try {
    const responses = db.prepare(`
      SELECT * FROM responses WHERE assessment_id = ?
    `).all(req.params.assessmentId);
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ============ DOMAIN SCORES ENDPOINTS ============

// Save/update domain scores
app.post('/api/assessments/:assessmentId/domain-scores', (req, res) => {
  try {
    const { domain_scores } = req.body;
    const assessment_id = req.params.assessmentId;
    
    if (!Array.isArray(domain_scores)) {
      return res.status(400).json({ error: 'domain_scores must be an array' });
    }
    
    const transaction = db.transaction((items: any[]) => {
      for (const item of items) {
        const existing = db.prepare(
          'SELECT id FROM domain_scores WHERE assessment_id = ? AND domain_id = ?'
        ).get(assessment_id, item.domain_id) as { id: string } | undefined;
        
        if (existing) {
          db.prepare(`
            UPDATE domain_scores 
            SET raw_score = ?, weighted_score = ?, maturity_level = ?, questions_answered = ?, questions_total = ?
            WHERE id = ?
          `).run(item.raw_score, item.weighted_score, item.maturity_level, item.questions_answered, item.questions_total, existing.id);
        } else {
          const id = uuidv4();
          db.prepare(`
            INSERT INTO domain_scores (id, assessment_id, domain_id, pillar_id, raw_score, weighted_score, maturity_level, questions_answered, questions_total)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(id, assessment_id, item.domain_id, item.pillar_id, item.raw_score, item.weighted_score, item.maturity_level, item.questions_answered, item.questions_total);
        }
      }
    });
    
    transaction(domain_scores);
    
    const scores = db.prepare('SELECT * FROM domain_scores WHERE assessment_id = ?').all(assessment_id);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get domain scores for assessment
app.get('/api/assessments/:assessmentId/domain-scores', (req, res) => {
  try {
    const scores = db.prepare(`
      SELECT * FROM domain_scores WHERE assessment_id = ?
    `).all(req.params.assessmentId);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ============ COMPARISON ENDPOINT ============

// Compare two assessments
app.get('/api/compare/:id1/:id2', (req, res) => {
  try {
    const scores1 = db.prepare('SELECT * FROM domain_scores WHERE assessment_id = ?').all(req.params.id1);
    const scores2 = db.prepare('SELECT * FROM domain_scores WHERE assessment_id = ?').all(req.params.id2);
    
    const assessment1 = db.prepare('SELECT * FROM assessments WHERE id = ?').get(req.params.id1) as Record<string, unknown> | undefined;
    const assessment2 = db.prepare('SELECT * FROM assessments WHERE id = ?').get(req.params.id2) as Record<string, unknown> | undefined;
    
    res.json({
      assessment1: assessment1 ? { ...assessment1, domain_scores: scores1 } : null,
      assessment2: assessment2 ? { ...assessment2, domain_scores: scores2 } : null
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ============ AGENT ENDPOINTS ============

// Generate security evaluation report for an organization
app.post('/api/organizations/:id/analyze', async (req, res) => {
  try {
    const orgId = req.params.id;
    const { runInParallel = false } = req.body;
    
    // Check if organization exists
    const org = db.prepare('SELECT * FROM organizations WHERE id = ?').get(orgId);
    if (!org) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    
    // Check if there are completed assessments
    const completedCount = db.prepare(
      'SELECT COUNT(*) as count FROM assessments WHERE organization_id = ? AND status = ?'
    ).get(orgId, 'completed') as { count: number };
    
    if (completedCount.count === 0) {
      return res.status(400).json({ 
        error: 'No completed assessments found',
        message: 'At least one completed assessment is required to generate a security evaluation report'
      });
    }
    
    // Dynamically import the agent orchestrator
    const { generateOrganizationSecurityReport, formatReportAsMarkdown, formatReportAsJSON } = 
      await import('../src/react_agent/agents/orchestrator.js');
    
    console.log(`Starting agent analysis for organization: ${orgId}`);
    
    // Generate the report
    const report = await generateOrganizationSecurityReport(orgId, {
      runInParallel,
      verbose: true,
    });
    
    // Return both formats
    res.json({
      report,
      markdown: formatReportAsMarkdown(report),
    });
  } catch (error) {
    console.error('Agent analysis error:', error);
    res.status(500).json({ 
      error: (error as Error).message,
      details: 'Make sure Ollama is running with the configured model'
    });
  }
});

// Get agent status/health check
app.get('/api/agent/status', async (req, res) => {
  try {
    // Try to import agent module to verify it's available
    const { createLLM } = await import('../src/react_agent/agents/base-agent.js');
    
    // Check Ollama connectivity
    const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2';
    
    let ollamaStatus = 'unknown';
    let ollamaModels: string[] = [];
    
    try {
      const response = await fetch(`${ollamaUrl}/api/tags`);
      if (response.ok) {
        const data = await response.json() as { models?: Array<{ name: string }> };
        ollamaStatus = 'connected';
        ollamaModels = data.models?.map((m: { name: string }) => m.name) || [];
      } else {
        ollamaStatus = 'error';
      }
    } catch {
      ollamaStatus = 'disconnected';
    }
    
    res.json({
      status: 'ready',
      ollama: {
        status: ollamaStatus,
        url: ollamaUrl,
        configuredModel: ollamaModel,
        availableModels: ollamaModels,
        modelAvailable: ollamaModels.some(m => m.includes(ollamaModel.split(':')[0])),
      },
      agent: {
        available: true,
        pillars: ['security_for_ai', 'ai_for_security', 'security_from_ai'],
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: (error as Error).message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AISMM API server running on http://localhost:${PORT}`);
});

export default app;
