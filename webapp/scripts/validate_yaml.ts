#!/usr/bin/env npx tsx
/**
 * YAML validation script for AISMM model definitions.
 * Supports both:
 *   - v1.x structure (flat domains dictionary, pillars, scoring_config)
 *   - v2.x structure (aismm wrapper with nested components)
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..', '..');
const YAML_PATH = join(ROOT, 'aismm_definition', 'aismm.yaml');

// Type definitions for YAML structures
interface V1Document {
  version?: string;
  name?: string;
  description?: string;
  scoring_config?: Record<string, unknown>;
  pillars?: Record<string, V1Pillar>;
  domains?: Record<string, V1Domain>;
}

interface V1Pillar {
  id?: string;
  name?: string;
  description?: string;
  weight?: number;
}

interface V1Domain {
  id?: string;
  name?: string;
  description?: string;
  pillar?: string;
  levels?: Record<string, unknown>;
  framework_alignment?: unknown[];
  key_controls?: unknown[];
  questions?: V1Question[];
}

interface V1Question {
  id?: string;
  text?: string;
  question_type?: string;
}

interface V2Document {
  aismm?: {
    components?: V2Component[];
    assessment_questionnaire?: {
      questions?: V2Question[];
    };
  };
}

interface V2Component {
  id?: string;
  id_code?: string;
  domains?: V2Domain[];
}

interface V2Domain {
  id?: string;
  id_code?: string;
  mappings?: Record<string, unknown[]>;
  maturity_levels?: Array<{ level?: number }>;
}

interface V2Question {
  id?: string;
  type?: string;
  title?: string;
  help_text?: string;
  required?: boolean;
}

/**
 * Load YAML file, rejecting files with tab characters.
 */
function loadYaml(path: string): unknown {
  const text = readFileSync(path, 'utf-8');
  
  if (text.includes('\t')) {
    const linesWithTabs = text.split('\n')
      .map((line, i) => line.includes('\t') ? i + 1 : null)
      .filter((n): n is number => n !== null);
    throw new Error(
      `YAML file contains tab characters on line(s): ${linesWithTabs.join(', ')}. ` +
      'YAML must use spaces for indentation. Replace tabs with spaces and re-run validation.'
    );
  }
  
  return parseYaml(text);
}

/**
 * Detect which AISMM structure version is being used.
 */
function detectVersion(doc: unknown): '1.x' | '2.x' | null {
  if (!doc || typeof doc !== 'object') {
    return null;
  }
  
  const record = doc as Record<string, unknown>;
  
  // v2.x has 'aismm' top-level key with 'components' inside
  if ('aismm' in record) {
    return '2.x';
  }
  
  // v1.x has 'domains', 'pillars', 'scoring_config' at top level
  if ('domains' in record && 'pillars' in record) {
    return '1.x';
  }
  
  return null;
}

/**
 * Validate v1.x structure (flat domains, pillars, scoring_config).
 */
function validateV1(doc: V1Document): string[] {
  const errors: string[] = [];
  
  // Check required top-level keys
  const requiredKeys = ['version', 'name', 'description', 'scoring_config', 'pillars', 'domains'];
  for (const key of requiredKeys) {
    if (!(key in doc)) {
      errors.push(`Missing required top-level key: '${key}'`);
    }
  }
  
  // Validate scoring_config
  const sc = doc.scoring_config;
  if (sc && typeof sc !== 'object') {
    errors.push("'scoring_config' should be a mapping");
  } else if (sc) {
    for (const key of ['level_scores', 'maturity_thresholds']) {
      if (!(key in sc)) {
        errors.push(`scoring_config missing '${key}'`);
      }
    }
  }
  
  // Validate pillars
  const pillars = doc.pillars || {};
  if (typeof pillars !== 'object') {
    errors.push("'pillars' should be a mapping");
  } else {
    for (const [pid, pdata] of Object.entries(pillars)) {
      if (!pdata || typeof pdata !== 'object') {
        errors.push(`pillars.${pid} should be a mapping`);
        continue;
      }
      for (const field of ['id', 'name', 'description', 'weight']) {
        if (!(field in pdata)) {
          errors.push(`pillars.${pid} missing '${field}'`);
        }
      }
    }
  }
  
  // Validate domains
  const domains = doc.domains || {};
  if (typeof domains !== 'object') {
    errors.push("'domains' should be a mapping");
  } else {
    for (const [did, ddata] of Object.entries(domains)) {
      const prefix = `domains.${did}`;
      if (!ddata || typeof ddata !== 'object') {
        errors.push(`${prefix} should be a mapping`);
        continue;
      }
      
      // Required domain fields
      for (const field of ['id', 'name', 'description', 'pillar']) {
        if (!(field in ddata)) {
          errors.push(`${prefix} missing '${field}'`);
        }
      }
      
      // Validate pillar reference
      const pillarRef = ddata.pillar;
      if (pillarRef && !(pillarRef in pillars)) {
        errors.push(`${prefix}.pillar '${pillarRef}' not found in pillars definition`);
      }
      
      // Validate levels
      const levels = ddata.levels || {};
      if (typeof levels !== 'object') {
        errors.push(`${prefix}.levels should be a mapping`);
      } else {
        const levelKeys = new Set(Object.keys(levels));
        const expectedLevels = new Set(['level_1', 'level_2', 'level_3', 'level_4', 'level_5']);
        
        const missing = [...expectedLevels].filter(l => !levelKeys.has(l));
        const extra = [...levelKeys].filter(l => !expectedLevels.has(l));
        
        if (missing.length > 0) {
          errors.push(`${prefix}.levels missing: ${missing.join(', ')}`);
        }
        if (extra.length > 0) {
          errors.push(`${prefix}.levels has unexpected keys: ${extra.join(', ')}`);
        }
      }
      
      // Validate framework_alignment (optional)
      const fa = ddata.framework_alignment;
      if (fa && !Array.isArray(fa)) {
        errors.push(`${prefix}.framework_alignment should be a list`);
      }
      
      // Validate key_controls (optional)
      const kc = ddata.key_controls;
      if (kc && !Array.isArray(kc)) {
        errors.push(`${prefix}.key_controls should be a list`);
      }
      
      // Validate questions
      const questions = ddata.questions;
      if (questions && !Array.isArray(questions)) {
        errors.push(`${prefix}.questions should be a list`);
      } else if (questions) {
        questions.forEach((q, qi) => {
          const qprefix = `${prefix}.questions[${qi + 1}]`;
          if (!q || typeof q !== 'object') {
            errors.push(`${qprefix} should be a mapping`);
            return;
          }
          for (const field of ['id', 'text', 'question_type']) {
            if (!(field in q)) {
              errors.push(`${qprefix} missing '${field}'`);
            }
          }
        });
      }
    }
  }
  
  return errors;
}

/**
 * Validate v2.x structure (aismm wrapper with nested components).
 */
function validateV2(doc: V2Document): string[] {
  const errors: string[] = [];
  
  if (!('aismm' in doc)) {
    errors.push("Missing top-level 'aismm' key");
    return errors;
  }
  
  const aismm = doc.aismm;
  if (!aismm || typeof aismm !== 'object') {
    errors.push("'aismm' should be a mapping");
    return errors;
  }
  
  const comps = aismm.components;
  if (comps === undefined) {
    errors.push("Missing 'components' list");
  } else if (!Array.isArray(comps)) {
    errors.push("'components' should be a list");
  } else {
    comps.forEach((comp, ci) => {
      const prefix = `components[${ci + 1}]`;
      if (!comp || typeof comp !== 'object') {
        errors.push(`${prefix} is not a mapping`);
        return;
      }
      if (!('id' in comp)) {
        errors.push(`${prefix} missing 'id'`);
      }
      if (!('id_code' in comp)) {
        errors.push(`${prefix} missing 'id_code'`);
      }
      
      const doms = comp.domains;
      if (doms === undefined) {
        errors.push(`${prefix} missing 'domains' list`);
      } else if (!Array.isArray(doms)) {
        errors.push(`${prefix}.domains should be a list`);
      } else {
        doms.forEach((dom, di) => {
          const dprefix = `${prefix}.domains[${di + 1}]`;
          if (!dom || typeof dom !== 'object') {
            errors.push(`${dprefix} is not a mapping`);
            return;
          }
          if (!('id' in dom)) {
            errors.push(`${dprefix} missing 'id'`);
          }
          if (!('id_code' in dom)) {
            errors.push(`${dprefix} missing 'id_code'`);
          }
          
          if ('mappings' in dom) {
            const mappings = dom.mappings;
            if (!mappings || typeof mappings !== 'object') {
              errors.push(`${dprefix}.mappings should be a mapping`);
            } else {
              for (const [framework, refs] of Object.entries(mappings)) {
                if (!Array.isArray(refs)) {
                  errors.push(`${dprefix}.mappings.${framework} should be a list`);
                }
              }
            }
          }
          
          if (!('maturity_levels' in dom)) {
            errors.push(`${dprefix} missing 'maturity_levels' list`);
          } else {
            const mls = dom.maturity_levels;
            if (!Array.isArray(mls)) {
              errors.push(`${dprefix}.maturity_levels should be a list`);
            } else {
              const levels = mls
                .filter((m): m is { level: number } => typeof m === 'object' && m !== null && 'level' in m)
                .map(m => m.level)
                .sort((a, b) => a - b);
              
              if (JSON.stringify(levels) !== JSON.stringify([1, 2, 3, 4, 5])) {
                errors.push(`${dprefix}.maturity_levels should contain levels 1..5`);
              }
            }
          }
        });
      }
    });
  }
  
  // Check questionnaire structure
  const q = aismm.assessment_questionnaire;
  if (q === undefined) {
    errors.push("Missing 'assessment_questionnaire' section");
  } else {
    const questions = typeof q === 'object' && q !== null ? q.questions : undefined;
    if (questions === undefined) {
      errors.push("'assessment_questionnaire' missing 'questions' list");
    } else if (!Array.isArray(questions)) {
      errors.push("assessment_questionnaire.questions should be a list");
    } else {
      const allowedTypes = ['multiple_choice', 'true_false', 'scoring', 'free_text', 'numeric'];
      
      questions.forEach((qq, qi) => {
        const qpre = `assessment_questionnaire.questions[${qi + 1}]`;
        if (!qq || typeof qq !== 'object') {
          errors.push(`${qpre} is not a mapping`);
          return;
        }
        for (const field of ['id', 'type', 'title', 'help_text', 'required']) {
          if (!(field in qq)) {
            errors.push(`${qpre} missing '${field}'`);
          }
        }
        if (qq.type && !allowedTypes.includes(qq.type)) {
          errors.push(`${qpre} has unsupported type '${qq.type}'`);
        }
      });
    }
  }
  
  return errors;
}

/**
 * Print summary for v1.x structure.
 */
function printSummaryV1(doc: V1Document): void {
  const pillars = doc.pillars || {};
  const domains = doc.domains || {};
  
  const totalQuestions = Object.values(domains)
    .filter((d): d is V1Domain => typeof d === 'object' && d !== null)
    .reduce((sum, d) => sum + (d.questions?.length || 0), 0);
  
  const totalKeyControls = Object.values(domains)
    .filter((d): d is V1Domain => typeof d === 'object' && d !== null)
    .reduce((sum, d) => sum + (d.key_controls?.length || 0), 0);
  
  console.log(`Pillars: ${Object.keys(pillars).length}`);
  console.log(`Domains: ${Object.keys(domains).length}`);
  console.log(`Total questions (embedded): ${totalQuestions}`);
  console.log(`Total key_controls: ${totalKeyControls}`);
  
  // Check for framework mappings
  const domainStr = JSON.stringify(domains);
  const hasMitre = domainStr.includes('mitre_atlas');
  const hasOwasp = domainStr.includes('owasp_genai');
  console.log(`MITRE ATLAS mappings: ${hasMitre ? 'Yes' : 'No'}`);
  console.log(`OWASP GenAI mappings: ${hasOwasp ? 'Yes' : 'No'}`);
}

/**
 * Print summary for v2.x structure.
 */
function printSummaryV2(doc: V2Document): void {
  const aismm = doc.aismm || {};
  const comps = aismm.components || [];
  
  const totalDomains = comps
    .filter((c): c is V2Component => typeof c === 'object' && c !== null)
    .reduce((sum, c) => sum + (c.domains?.length || 0), 0);
  
  const q = aismm.assessment_questionnaire || {};
  const qs = q.questions || [];
  
  console.log(`Components: ${comps.length}`);
  console.log(`Total domains: ${totalDomains}`);
  console.log(`Total assessment questions: ${qs.length}`);
}

/**
 * Main function
 */
function main(): void {
  let doc: unknown;
  
  try {
    doc = loadYaml(YAML_PATH);
  } catch (e) {
    console.error('ERROR: Failed to parse YAML:', (e as Error).message);
    process.exit(2);
  }
  
  const version = detectVersion(doc);
  if (version === null) {
    console.error("ERROR: Unable to detect AISMM version. Expected either 'aismm' key (v2.x) or 'domains'+'pillars' keys (v1.x)");
    process.exit(2);
  }
  
  console.log(`Detected AISMM structure version: ${version}`);
  
  let errors: string[];
  if (version === '1.x') {
    errors = validateV1(doc as V1Document);
  } else {
    errors = validateV2(doc as V2Document);
  }
  
  if (errors.length > 0) {
    console.log(`\nValidation FAILED with ${errors.length} issue(s):`);
    for (const e of errors) {
      console.log(' -', e);
    }
    process.exit(1);
  }
  
  console.log('\n✓ YAML parsed and structure validated successfully.\n');
  
  if (version === '1.x') {
    printSummaryV1(doc as V1Document);
  } else {
    printSummaryV2(doc as V2Document);
  }
}

main();
