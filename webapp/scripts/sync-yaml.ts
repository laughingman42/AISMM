#!/usr/bin/env npx tsx
/**
 * Sync AISMM YAML definition to webapp public folder
 * Copies aismm_definition/aismm.yaml to webapp/public/aismm.yaml
 */

import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..', '..');
const SOURCE_YAML = join(ROOT_DIR, 'aismm_definition', 'aismm.yaml');
const DEST_DIR = join(__dirname, '..', 'public');
const DEST_YAML = join(DEST_DIR, 'aismm.yaml');

function syncYaml(): void {
  console.log('Syncing AISMM YAML to webapp...');
  
  // Check if source exists
  if (!existsSync(SOURCE_YAML)) {
    console.error(`Error: Source file not found at ${SOURCE_YAML}`);
    process.exit(1);
  }
  
  // Create destination directory if it doesn't exist
  if (!existsSync(DEST_DIR)) {
    try {
      mkdirSync(DEST_DIR, { recursive: true });
      console.log(`Created directory: ${DEST_DIR}`);
    } catch (e) {
      console.error(`Error creating directory ${DEST_DIR}:`, e);
      process.exit(1);
    }
  }
  
  // Copy the file
  try {
    copyFileSync(SOURCE_YAML, DEST_YAML);
    console.log(`Successfully copied aismm.yaml to ${DEST_YAML}`);
  } catch (e) {
    console.error('Error copying file:', e);
    process.exit(1);
  }
}

syncYaml();
