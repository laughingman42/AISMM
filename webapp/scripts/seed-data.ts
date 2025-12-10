/**
 * Seed Script - Creates dummy organizations and assessments for testing
 * Run with: npx tsx scripts/seed-data.ts
 */

import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface Question {
  id: string;
  text: string;
  question_type: string;
  weight?: number;
  required?: boolean;
  options?: string[];
}

interface Domain {
  id: string;
  name: string;
  pillar: string;
  weight?: number;
  questions?: Question[];
}

interface AISMMData {
  domains: Record<string, Domain>;
}

// Initialize database
const dbPath = path.join(__dirname, '..', 'data', 'aismm.db');
const db = new Database(dbPath);

// Load YAML data
const yamlPath = path.join(__dirname, '..', 'public', 'aismm.yaml');
const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
const modelData = yaml.load(yamlContent) as AISMMData;

// Sample organization data
const sampleOrgs = [
  {
    name: 'Acme Corporation',
    description: 'Large enterprise technology company with extensive AI adoption',
    industry: 'Technology',
    size: 'Enterprise (10,000+)',
  },
  {
    name: 'FinSecure Bank',
    description: 'Regional bank exploring AI for fraud detection and customer service',
    industry: 'Financial Services',
    size: 'Mid-Market (1,000-10,000)',
  },
  {
    name: 'HealthFirst Medical',
    description: 'Healthcare provider using AI for diagnostics and patient care',
    industry: 'Healthcare',
    size: 'Mid-Market (1,000-10,000)',
  },
  {
    name: 'StartupAI Labs',
    description: 'AI-native startup building ML solutions',
    industry: 'Technology',
    size: 'Small (100-1,000)',
  },
];

// Generate random response for a question
function generateResponse(question: Question, domainId: string): {
  domain_id: string;
  question_id: string;
  response_value: string | null;
  response_index: number | null;
  response_text: string | null;
  score: number;
} {
  const baseResponse = {
    domain_id: domainId,
    question_id: question.id,
    response_value: null as string | null,
    response_index: null as number | null,
    response_text: null as string | null,
    score: 0,
  };

  switch (question.question_type) {
    case 'single_choice':
    case 'scale': {
      const options = question.options || [];
      const index = Math.floor(Math.random() * options.length);
      const score = Math.round((index / (options.length - 1)) * 4) + 1;
      return {
        ...baseResponse,
        response_index: index,
        response_value: options[index],
        score,
      };
    }
    case 'multiple_choice': {
      const options = question.options || [];
      const numSelected = Math.floor(Math.random() * options.length) + 1;
      const shuffled = [...options].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, numSelected);
      const score = Math.min(5, Math.ceil((selected.length / options.length) * 5));
      return {
        ...baseResponse,
        response_value: JSON.stringify(selected),
        score,
      };
    }
    case 'boolean': {
      const isYes = Math.random() > 0.4; // 60% chance of Yes
      return {
        ...baseResponse,
        response_value: isYes ? 'Yes' : 'No',
        response_index: isYes ? 1 : 0,
        score: isYes ? 5 : 1,
      };
    }
    case 'numeric': {
      const value = Math.floor(Math.random() * 50);
      const score = value === 0 ? 1 : value < 5 ? 2 : value < 10 ? 3 : value < 20 ? 4 : 5;
      return {
        ...baseResponse,
        response_value: String(value),
        response_text: String(value),
        score,
      };
    }
    case 'text': {
      return {
        ...baseResponse,
        response_text: 'Sample response for testing purposes.',
        score: 3, // Neutral score for text
      };
    }
    default:
      return { ...baseResponse, score: 3 };
  }
}

// Calculate domain score from responses
function calculateDomainScore(responses: Array<{ score: number }>, domain: Domain): {
  raw_score: number;
  weighted_score: number;
  maturity_level: number;
} {
  const scores = responses.map(r => r.score).filter(s => s > 0);
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const weight = domain.weight || 1;
  
  return {
    raw_score: Math.round(avgScore * 100) / 100,
    weighted_score: Math.round(avgScore * weight * 100) / 100,
    maturity_level: Math.round(avgScore),
  };
}

// Main seeding function
function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  // Get domains with questions
  const domainsWithQuestions = Object.values(modelData.domains).filter(
    d => d.questions && d.questions.length > 0
  );

  console.log(`📊 Found ${domainsWithQuestions.length} domains with questions\n`);

  // Create organizations
  const orgIds: string[] = [];
  
  for (const org of sampleOrgs) {
    const orgId = randomUUID();
    orgIds.push(orgId);
    
    db.prepare(`
      INSERT INTO organizations (id, name, description, industry, size, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).run(orgId, org.name, org.description, org.industry, org.size);
    
    console.log(`✅ Created organization: ${org.name}`);
  }

  console.log('');

  // Create assessments for each organization
  const assessmentConfigs = [
    { name: 'Q4 2024 Assessment', monthsAgo: 6, status: 'completed' },
    { name: 'Q1 2025 Assessment', monthsAgo: 3, status: 'completed' },
    { name: 'Q2 2025 Assessment', monthsAgo: 0, status: 'in_progress' },
  ];

  for (const orgId of orgIds) {
    const org = db.prepare('SELECT name FROM organizations WHERE id = ?').get(orgId) as { name: string };
    
    for (const config of assessmentConfigs) {
      // Skip some assessments randomly to create variety
      if (config.status === 'in_progress' && Math.random() > 0.5) continue;
      
      const assessmentId = randomUUID();
      const startedAt = new Date();
      startedAt.setMonth(startedAt.getMonth() - config.monthsAgo);
      
      // Insert assessment
      db.prepare(`
        INSERT INTO assessments (id, organization_id, name, description, status, model_version, started_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        assessmentId,
        orgId,
        config.name,
        `${config.name} for ${org.name}`,
        config.status,
        '1.0.0',
        startedAt.toISOString()
      );

      console.log(`  📋 Created assessment: ${config.name} for ${org.name}`);

      // Generate responses for each domain
      let totalScore = 0;
      let domainCount = 0;

      for (const domain of domainsWithQuestions) {
        if (!domain.questions) continue;

        // For in-progress assessments, only fill some domains
        if (config.status === 'in_progress' && Math.random() > 0.6) continue;

        const domainResponses: Array<{ score: number }> = [];

        for (const question of domain.questions) {
          const response = generateResponse(question, domain.id);
          domainResponses.push({ score: response.score });

          db.prepare(`
            INSERT INTO responses (id, assessment_id, domain_id, question_id, response_value, response_index, response_text, score, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
          `).run(
            randomUUID(),
            assessmentId,
            response.domain_id,
            response.question_id,
            response.response_value,
            response.response_index,
            response.response_text,
            response.score
          );
        }

        // Calculate and save domain score
        const domainScore = calculateDomainScore(domainResponses, domain);
        totalScore += domainScore.weighted_score;
        domainCount++;

        db.prepare(`
          INSERT INTO domain_scores (id, assessment_id, domain_id, pillar_id, raw_score, weighted_score, maturity_level, questions_answered, questions_total, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).run(
          randomUUID(),
          assessmentId,
          domain.id,
          domain.pillar,
          domainScore.raw_score,
          domainScore.weighted_score,
          domainScore.maturity_level,
          domain.questions.length,
          domain.questions.length
        );
      }

      // Update assessment with total score if completed
      if (config.status === 'completed' && domainCount > 0) {
        const avgScore = totalScore / domainCount;
        db.prepare(`
          UPDATE assessments 
          SET total_score = ?, maturity_level = ?, completed_at = datetime('now')
          WHERE id = ?
        `).run(
          Math.round(avgScore * 100) / 100,
          Math.round(avgScore),
          assessmentId
        );
      }
    }
    console.log('');
  }

  // Summary
  const orgCount = db.prepare('SELECT COUNT(*) as count FROM organizations').get() as { count: number };
  const assessmentCount = db.prepare('SELECT COUNT(*) as count FROM assessments').get() as { count: number };
  const responseCount = db.prepare('SELECT COUNT(*) as count FROM responses').get() as { count: number };

  console.log('📊 Seeding Summary:');
  console.log(`   Organizations: ${orgCount.count}`);
  console.log(`   Assessments: ${assessmentCount.count}`);
  console.log(`   Responses: ${responseCount.count}`);
  console.log('\n✨ Database seeding complete!');
}

// Run the seeder
try {
  seedDatabase();
} catch (error) {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
} finally {
  db.close();
}
