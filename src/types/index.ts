export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  content: string;
  readTime?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  noindex?: boolean;
  schema?: Array<Record<string, unknown>>;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface UseCase {
  icon: string;
  title: string;
  description: string;
}

export type ProgrammaticFamily = 'documents' | 'solutions' | 'compare' | 'integrations' | 'tools';

export type ProgrammaticSearchIntent = 'workflow' | 'role-based' | 'comparison' | 'integration' | 'conversion-tool';

export type ProgrammaticSchemaType = 'FAQPage' | 'HowTo' | 'WebPage';

export type ProgrammaticToolEngine = 'images-to-pdf' | 'heic-to-pdf' | 'merge-pdf';

export interface ProgrammaticToolMeta {
  engine: ProgrammaticToolEngine;
  toolHeading: string;
  toolSubheading: string;
  inputAccept: string;
  inputLabel: string;
  outputExtension: string;
  outputMime: string;
  maxFileMb: number;
  multiple: boolean;
}

export interface ProgrammaticFAQItem {
  question: string;
  answer: string;
}

export interface ProgrammaticContentBlock {
  heading: string;
  body: string;
}

export interface ProgrammaticCTA {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface ProgrammaticComparisonSource {
  chooseScanDocProWhen: string[];
  chooseCompetitorWhen: string[];
}

export interface ProgrammaticComparisonDetails extends ProgrammaticComparisonSource {
  competitorName: string;
  competitorCategory: string;
}

export interface ProgrammaticPageSource {
  slug: string;
  name: string;
  targetKeyword: string;
  pageTitle?: string;
  pageMetaDescription?: string;
  pageH1?: string;
  intro: string;
  heroBullets: string[];
  keyProblems: string[];
  recommendedFeatures: string[];
  workflowSteps: string[];
  uniqueContentBlocks: ProgrammaticContentBlock[];
  faq: ProgrammaticFAQItem[];
  relatedUrls: string[];
  schemaType: ProgrammaticSchemaType;
  competitorName?: string;
  competitorCategory?: string;
  comparison?: ProgrammaticComparisonSource;
  tool?: ProgrammaticToolMeta;
}

export interface ProgrammaticPage {
  family: ProgrammaticFamily;
  slug: string;
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  targetKeyword: string;
  searchIntent: ProgrammaticSearchIntent;
  heroBullets: string[];
  keyProblems: string[];
  recommendedFeatures: string[];
  workflowSteps: string[];
  uniqueContentBlocks: ProgrammaticContentBlock[];
  faq: ProgrammaticFAQItem[];
  relatedUrls: string[];
  cta: ProgrammaticCTA;
  schemaType: ProgrammaticSchemaType;
  comparison?: ProgrammaticComparisonDetails;
  tool?: ProgrammaticToolMeta;
}

export interface ProgrammaticHubSource {
  family: ProgrammaticFamily;
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  targetKeyword: string;
  heroBullets: string[];
  sectionTitle: string;
  sectionDescription: string;
  faq: ProgrammaticFAQItem[];
  featuredUrls: string[];
  relatedFamilies: ProgrammaticFamily[];
}

export interface ProgrammaticHub extends ProgrammaticHubSource {
  cta: ProgrammaticCTA;
}
