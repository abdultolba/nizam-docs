#!/usr/bin/env tsx

import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DocFile {
  slug: string;
  title: string;
  content: string;
  order?: number;
  category?: string;
}

const GITHUB_REPO = 'abdultolba/nizam';
const GITHUB_BRANCH = 'main'; // or 'master' if that's the default branch
const DOCS_OUTPUT_PATH = './public/docs.json';

// GitHub raw content base URL
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;

async function fetchFileFromGitHub(filePath: string): Promise<string | null> {
  const url = `${GITHUB_RAW_BASE}/${filePath}`;
  
  try {
    console.log(`Fetching: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`File not found: ${filePath}`);
        return null;
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${filePath}:`, error);
    return null;
  }
}

async function processMarkdownContent(content: string, relativePath: string): Promise<DocFile> {
  const { data, content: markdownContent } = matter(content);
  
  // Extract title from front matter or first h1
  let title = data.title || '';
  if (!title) {
    const h1Match = markdownContent.match(/^#\s+(.+)$/m);
    title = h1Match ? h1Match[1] : path.basename(relativePath, '.md');
  }
  
  // Create slug from file path
  const slug = relativePath
    .replace(/\.md$/, '')
    .replace(/\//g, '-')
    .toLowerCase();
  
  return {
    slug,
    title,
    content: markdownContent,
    order: data.order || 999,
    category: data.category || 'General'
  };
}

async function processDocs() {
  console.log('Processing nizam documentation from GitHub...');
  
  const docs: DocFile[] = [];
  
  // Files to process with their categories and order
  const filesToProcess = [
    { file: 'README.md', category: 'Overview', order: 1 },
    { file: 'docs/README.md', category: 'Documentation', order: 2, title: 'Documentation Index' },
    { file: 'docs/COMMANDS.md', category: 'Reference', order: 3 },
    { file: 'docs/DATA_LIFECYCLE.md', category: 'Features', order: 4 },
    { file: 'docs/DOCTOR.md', category: 'Features', order: 5 },
    { file: 'docs/HOST_BINARY_DETECTION.md', category: 'Features', order: 6 },
    { file: 'docs/MONGODB_SUPPORT.md', category: 'Features', order: 7 },
    { file: 'examples/interactive-demo.md', category: 'Examples', order: 8, title: 'Interactive Demo' },
  ];
  
  for (const { file, category, order, title } of filesToProcess) {
    const content = await fetchFileFromGitHub(file);
    
    if (content) {
      try {
        const doc = await processMarkdownContent(content, file);
        doc.category = category;
        doc.order = order;
        if (title) doc.title = title;
        
        docs.push(doc);
        console.log(`✓ Processed: ${file}`);
      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error);
      }
    }
  }
  
  // Sort docs by order
  docs.sort((a, b) => a.order! - b.order!);
  
  // Create output directory if it doesn't exist
  await fs.ensureDir(path.dirname(DOCS_OUTPUT_PATH));
  
  // Write processed docs to JSON file
  await fs.writeFile(DOCS_OUTPUT_PATH, JSON.stringify({ docs, lastUpdated: new Date().toISOString() }, null, 2));
  
  console.log(`\n✓ Successfully processed ${docs.length} documentation files`);
  console.log(`✓ Output written to: ${DOCS_OUTPUT_PATH}`);
  
  // Print summary
  const categoryCounts = docs.reduce((acc, doc) => {
    acc[doc.category!] = (acc[doc.category!] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\nDocumentation summary:');
  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} files`);
  });
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  processDocs().catch(console.error);
}
