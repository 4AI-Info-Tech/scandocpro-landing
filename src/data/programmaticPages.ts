import hubSource from '@/data/programmatic-hubs.json';
import documentSource from '@/data/programmatic-documents.json';
import solutionSource from '@/data/programmatic-solutions.json';
import compareSource from '@/data/programmatic-compare.json';
import integrationSource from '@/data/programmatic-integrations.json';
import type {
  ProgrammaticComparisonDetails,
  ProgrammaticFamily,
  ProgrammaticHub,
  ProgrammaticHubSource,
  ProgrammaticPage,
  ProgrammaticPageSource,
  ProgrammaticSchemaType,
} from '@/types';

const PRIMARY_CTA = {
  label: 'Send online with SendFaxPro',
  href: 'https://sendfax.pro',
};

function buildSecondaryHref(subject: string): string {
  return `mailto:business@scandoc.pro?subject=${encodeURIComponent(subject)}`;
}

const FAMILY_LABELS: Record<ProgrammaticFamily, string> = {
  documents: 'Documents',
  solutions: 'Solutions',
  compare: 'Compare',
  integrations: 'Integrations',
};

const FAMILY_INTENTS: Record<ProgrammaticFamily, ProgrammaticPage['searchIntent']> = {
  documents: 'workflow',
  solutions: 'role-based',
  compare: 'comparison',
  integrations: 'integration',
};

const hubs = hubSource as ProgrammaticHubSource[];
const documents = documentSource as ProgrammaticPageSource[];
const solutions = solutionSource as ProgrammaticPageSource[];
const comparisons = compareSource as ProgrammaticPageSource[];
const integrations = integrationSource as ProgrammaticPageSource[];

function normalizeComparison(source: ProgrammaticPageSource): ProgrammaticComparisonDetails | undefined {
  if (!source.comparison || !source.competitorName || !source.competitorCategory) {
    return undefined;
  }

  return {
    competitorName: source.competitorName,
    competitorCategory: source.competitorCategory,
    chooseScanDocProWhen: source.comparison.chooseScanDocProWhen,
    chooseCompetitorWhen: source.comparison.chooseCompetitorWhen,
  };
}

function buildPageTitle(family: ProgrammaticFamily, source: ProgrammaticPageSource): string {
  if (source.pageTitle) {
    return source.pageTitle;
  }

  if (family === 'documents') {
    return `How to Scan ${source.name} on Your Phone`;
  }

  if (family === 'solutions') {
    return `Best Scanner App for ${source.name}`;
  }

  if (family === 'integrations') {
    return `Scan Documents to ${source.name}`;
  }

  return `${source.competitorName ?? source.name} Alternative for OCR and Batch Scanning`;
}

function buildMetaDescription(family: ProgrammaticFamily, source: ProgrammaticPageSource): string {
  if (source.pageMetaDescription) {
    return source.pageMetaDescription;
  }

  if (family === 'documents') {
    return `Scan ${source.name.toLowerCase()} into readable PDFs with OCR, AI cleanup, batching, and send-ready delivery workflows from ScanDocPro.`;
  }

  if (family === 'solutions') {
    return `See why ScanDocPro works for ${source.name.toLowerCase()} with OCR, AI cleanup, batch scanning, and send-ready document workflows.`;
  }

  if (family === 'integrations') {
    return `Scan documents into clean PDFs and route them to ${source.name} with OCR, cleanup, batching, and workflow-friendly mobile export.`;
  }

  return `Compare ScanDocPro with ${source.competitorName} for OCR, cleanup, batch scanning, and send-ready document workflows.`;
}

function buildH1(family: ProgrammaticFamily, source: ProgrammaticPageSource): string {
  if (source.pageH1) {
    return source.pageH1;
  }

  if (family === 'documents') {
    return `How to Scan ${source.name} on Your Phone`;
  }

  if (family === 'solutions') {
    return `Best Scanner App for ${source.name}`;
  }

  if (family === 'integrations') {
    return `Scan Documents to ${source.name}`;
  }

  return `${source.competitorName} Alternative for OCR and Batch Scanning`;
}

function normalizePage(family: ProgrammaticFamily, source: ProgrammaticPageSource): ProgrammaticPage {
  const title = buildPageTitle(family, source);

  return {
    family,
    slug: source.slug,
    url: `/${family}/${source.slug}/`,
    title,
    metaDescription: buildMetaDescription(family, source),
    h1: buildH1(family, source),
    intro: source.intro,
    targetKeyword: source.targetKeyword,
    searchIntent: FAMILY_INTENTS[family],
    heroBullets: source.heroBullets,
    keyProblems: source.keyProblems,
    recommendedFeatures: source.recommendedFeatures,
    workflowSteps: source.workflowSteps,
    uniqueContentBlocks: source.uniqueContentBlocks,
    faq: source.faq,
    relatedUrls: source.relatedUrls,
    cta: {
      primaryLabel: PRIMARY_CTA.label,
      primaryHref: PRIMARY_CTA.href,
      secondaryLabel: 'Get ScanDocPro launch updates',
      secondaryHref: buildSecondaryHref(`${title} - launch updates`),
    },
    schemaType: source.schemaType as ProgrammaticSchemaType,
    comparison: normalizeComparison(source),
  };
}

function normalizeHub(source: ProgrammaticHubSource): ProgrammaticHub {
  return {
    ...source,
    cta: {
      primaryLabel: PRIMARY_CTA.label,
      primaryHref: PRIMARY_CTA.href,
      secondaryLabel: 'Get ScanDocPro launch updates',
      secondaryHref: buildSecondaryHref(`${source.title} - launch updates`),
    },
  };
}

export const programmaticHubs = hubs.map(normalizeHub);

export const programmaticPages = [
  ...documents.map((entry) => normalizePage('documents', entry)),
  ...solutions.map((entry) => normalizePage('solutions', entry)),
  ...comparisons.map((entry) => normalizePage('compare', entry)),
  ...integrations.map((entry) => normalizePage('integrations', entry)),
];

const hubMap = new Map(programmaticHubs.map((hub) => [hub.family, hub]));
const pageMap = new Map(programmaticPages.map((page) => [`${page.family}:${page.slug}`, page]));

export function getProgrammaticHub(family: ProgrammaticFamily): ProgrammaticHub {
  const hub = hubMap.get(family);
  if (!hub) {
    throw new Error(`Unknown programmatic hub: ${family}`);
  }

  return hub;
}

export function getProgrammaticPagesByFamily(family: ProgrammaticFamily): ProgrammaticPage[] {
  return programmaticPages.filter((page) => page.family === family);
}

export function getProgrammaticPage(family: ProgrammaticFamily, slug: string): ProgrammaticPage | null {
  return pageMap.get(`${family}:${slug}`) ?? null;
}

export function getProgrammaticEntryByUrl(url: string): ProgrammaticPage | ProgrammaticHub | null {
  const hub = programmaticHubs.find((entry) => entry.url === url);
  if (hub) {
    return hub;
  }

  return programmaticPages.find((entry) => entry.url === url) ?? null;
}

export function getProgrammaticFamilyLabel(family: ProgrammaticFamily): string {
  return FAMILY_LABELS[family];
}
