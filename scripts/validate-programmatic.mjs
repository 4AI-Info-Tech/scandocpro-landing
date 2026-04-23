import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supportedFamilies = new Set(['documents', 'solutions', 'compare', 'integrations', 'tools']);
const supportedSchemaTypes = new Set(['FAQPage', 'HowTo', 'WebPage']);
const supportedToolEngines = new Set(['images-to-pdf', 'heic-to-pdf', 'merge-pdf']);

const files = {
  hubs: path.join(__dirname, '..', 'src', 'data', 'programmatic-hubs.json'),
  documents: path.join(__dirname, '..', 'src', 'data', 'programmatic-documents.json'),
  solutions: path.join(__dirname, '..', 'src', 'data', 'programmatic-solutions.json'),
  compare: path.join(__dirname, '..', 'src', 'data', 'programmatic-compare.json'),
  integrations: path.join(__dirname, '..', 'src', 'data', 'programmatic-integrations.json'),
  tools: path.join(__dirname, '..', 'src', 'data', 'programmatic-tools.json')
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateArray(value, min = 1) {
  return Array.isArray(value) && value.length >= min;
}

function main() {
  const errors = [];
  const hubs = readJson(files.hubs);
  const pageGroups = {
    documents: readJson(files.documents),
    solutions: readJson(files.solutions),
    compare: readJson(files.compare),
    integrations: readJson(files.integrations),
    tools: readJson(files.tools)
  };

  const allUrls = new Set(['/', '/blog/', '/privacy/', '/terms/']);
  const keywords = new Map();
  const familySet = new Set();

  hubs.forEach((hub) => {
    assert(supportedFamilies.has(hub.family), `Unsupported hub family: ${hub.family}`, errors);
    assert(!familySet.has(hub.family), `Duplicate hub family: ${hub.family}`, errors);
    familySet.add(hub.family);
    assert(isNonEmptyString(hub.url), `Hub URL missing for ${hub.family}`, errors);
    assert(validateArray(hub.featuredUrls), `Hub featuredUrls missing for ${hub.family}`, errors);
    assert(validateArray(hub.relatedFamilies), `Hub relatedFamilies missing for ${hub.family}`, errors);
    allUrls.add(hub.url);
  });

  Object.entries(pageGroups).forEach(([family, pages]) => {
    const slugSet = new Set();

    pages.forEach((page) => {
      const url = `/${family}/${page.slug}/`;
      const hasDisplayName = isNonEmptyString(page.name) || isNonEmptyString(page.competitorName);

      assert(isNonEmptyString(page.slug), `${family} page missing slug`, errors);
      assert(!slugSet.has(page.slug), `Duplicate slug in ${family}: ${page.slug}`, errors);
      slugSet.add(page.slug);
      assert(hasDisplayName, `${family}/${page.slug} missing name`, errors);
      assert(isNonEmptyString(page.targetKeyword), `${family}/${page.slug} missing targetKeyword`, errors);
      assert(validateArray(page.heroBullets, 3), `${family}/${page.slug} needs 3 heroBullets`, errors);
      assert(validateArray(page.keyProblems, 3), `${family}/${page.slug} needs 3 keyProblems`, errors);
      assert(validateArray(page.recommendedFeatures, 1), `${family}/${page.slug} missing recommendedFeatures`, errors);
      assert(validateArray(page.workflowSteps, 3), `${family}/${page.slug} needs 3 workflowSteps`, errors);
      assert(validateArray(page.uniqueContentBlocks, 3), `${family}/${page.slug} needs 3 uniqueContentBlocks`, errors);
      assert(validateArray(page.faq, 2), `${family}/${page.slug} needs 2 faq items`, errors);
      assert(validateArray(page.relatedUrls, 1), `${family}/${page.slug} missing relatedUrls`, errors);
      assert(supportedSchemaTypes.has(page.schemaType), `${family}/${page.slug} has unsupported schemaType ${page.schemaType}`, errors);

      if (family === 'tools') {
        assert(page.tool && typeof page.tool === 'object', `tools/${page.slug} missing tool metadata`, errors);
        if (page.tool) {
          assert(supportedToolEngines.has(page.tool.engine), `tools/${page.slug} has unsupported tool.engine ${page.tool.engine}`, errors);
          assert(isNonEmptyString(page.tool.toolHeading), `tools/${page.slug} missing tool.toolHeading`, errors);
          assert(isNonEmptyString(page.tool.toolSubheading), `tools/${page.slug} missing tool.toolSubheading`, errors);
          assert(isNonEmptyString(page.tool.inputAccept), `tools/${page.slug} missing tool.inputAccept`, errors);
          assert(isNonEmptyString(page.tool.outputExtension), `tools/${page.slug} missing tool.outputExtension`, errors);
          assert(isNonEmptyString(page.tool.outputMime), `tools/${page.slug} missing tool.outputMime`, errors);
          assert(typeof page.tool.maxFileMb === 'number' && page.tool.maxFileMb > 0, `tools/${page.slug} needs positive tool.maxFileMb`, errors);
        }
      }

      const existingKeyword = keywords.get(page.targetKeyword.toLowerCase());
      assert(!existingKeyword, `Duplicate targetKeyword "${page.targetKeyword}" on ${family}/${page.slug} and ${existingKeyword}`, errors);
      keywords.set(page.targetKeyword.toLowerCase(), `${family}/${page.slug}`);
      allUrls.add(url);
    });
  });

  hubs.forEach((hub) => {
    hub.featuredUrls.forEach((url) => {
      assert(allUrls.has(url), `Hub ${hub.family} has unknown featuredUrl ${url}`, errors);
    });
    hub.relatedFamilies.forEach((family) => {
      assert(supportedFamilies.has(family), `Hub ${hub.family} has invalid related family ${family}`, errors);
    });
  });

  Object.entries(pageGroups).forEach(([family, pages]) => {
    pages.forEach((page) => {
      page.relatedUrls.forEach((url) => {
        assert(allUrls.has(url), `${family}/${page.slug} has unknown relatedUrl ${url}`, errors);
      });
    });
  });

  if (errors.length > 0) {
    console.error('Programmatic content validation failed:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  const pageCount = Object.values(pageGroups).reduce((total, pages) => total + pages.length, 0);
  console.log(`Validated ${hubs.length} hubs and ${pageCount} programmatic pages.`);
}

main();
