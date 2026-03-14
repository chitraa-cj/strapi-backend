#!/usr/bin/env node
/**
 * Modify Strapi content-type and component schemas via code.
 *
 * Usage:
 *   node scripts/modify-schema.js
 *
 * Edit the transformSchema() function below to add/remove/update attributes,
 * then run the script. Schema files are updated in place.
 *
 * Common attribute shapes:
 *   { type: 'string' }
 *   { type: 'string', required: true }
 *   { type: 'text', maxLength: 500 }
 *   { type: 'integer' }
 *   { type: 'boolean', default: false }
 *   { type: 'uid', targetField: 'title' }
 *   { type: 'enumeration', enum: ['A', 'B'] }
 *   { type: 'media', multiple: false, allowedTypes: ['images'] }
 *   { type: 'relation', relation: 'manyToOne', target: 'api::author.author', inversedBy: 'articles' }
 *   { type: 'component', component: 'shared.seo', repeatable: false }
 *   { type: 'dynamiczone', components: ['shared.rich-text', 'shared.media'] }
 *   { type: 'blocks' }  // Strapi 5 blocks
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SRC = path.join(PROJECT_ROOT, 'src');

// --- Schema discovery ---

function findContentTypeSchemas(dir, base = dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...findContentTypeSchemas(full, base));
    } else if (e.name === 'schema.json') {
      results.push({ path: full, type: 'content-type', rel: path.relative(base, full) });
    }
  }
  return results;
}

function findComponentSchemas(dir, base = dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...findComponentSchemas(full, base));
    } else if (e.name.endsWith('.json') && e.name !== 'schema.json') {
      results.push({ path: full, type: 'component', rel: path.relative(base, full) });
    }
  }
  return results;
}

function loadSchema(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return { data: JSON.parse(raw), raw };
}

function writeSchema(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// --- Transformations (edit here) ---

/**
 * Apply modifications to a content-type or component schema.
 * @param {object} schema - Parsed schema JSON
 * @param {string} type - 'content-type' | 'component'
 * @param {string} relPath - Relative path to schema file (e.g. api/article/content-types/article/schema.json)
 * @returns {object|null} Modified schema, or null to skip writing
 */
function transformSchema(schema, type, relPath) {
  const apiMatch = relPath.match(/api\/([^/]+)\//);
  const contentTypeName = apiMatch ? apiMatch[1] : null;

  // ----- Example: add an attribute to Article -----
  // if (contentTypeName === 'article') {
  //   schema.attributes = schema.attributes || {};
  //   schema.attributes.excerpt = { type: 'text', maxLength: 200 };
  // }

  // ----- Example: add required to a field -----
  // if (contentTypeName === 'category') {
  //   if (schema.attributes?.name) schema.attributes.name.required = true;
  // }

  // ----- Example: add a new relation on Author -----
  // if (contentTypeName === 'author') {
  //   schema.attributes = schema.attributes || {};
  //   schema.attributes.bio = { type: 'text' };
  // }

  // ----- Example: enable draftAndPublish -----
  // if (contentTypeName === 'section') {
  //   schema.options = schema.options || {};
  //   schema.options.draftAndPublish = true;
  // }

  // ----- Example: add enum value to Teeka -----
  // if (contentTypeName === 'teeka' && schema.attributes?.TeekaAuthor?.enum) {
  //   if (!schema.attributes.TeekaAuthor.enum.includes('New Author')) {
  //     schema.attributes.TeekaAuthor.enum.push('New Author');
  //   }
  // }

  // ----- Example: remove an attribute -----
  // if (contentTypeName === 'article' && schema.attributes?.description) {
  //   delete schema.attributes.description;
  // }

  return schema;
}

// --- Run ---

function main() {
  const contentTypes = findContentTypeSchemas(path.join(SRC, 'api'));
  const components = findComponentSchemas(path.join(SRC, 'components'));
  const all = [...contentTypes, ...components];

  let changed = 0;
  for (const { path: filePath, type, rel } of all) {
    const { data } = loadSchema(filePath);
    const transformed = transformSchema(data, type, rel);
    if (transformed !== null && JSON.stringify(transformed) !== JSON.stringify(data)) {
      writeSchema(filePath, transformed);
      changed++;
      console.log('Updated:', rel);
    }
  }

  if (changed === 0) {
    console.log('No schema changes applied. Edit transformSchema() in scripts/modify-schema.js to add your changes.');
  } else {
    console.log(`\n${changed} schema(s) updated. Restart Strapi and run migrations if you added/removed attributes.`);
  }
}

main();
