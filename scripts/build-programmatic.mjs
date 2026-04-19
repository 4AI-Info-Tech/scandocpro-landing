import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEEDS_PATH = path.join(__dirname, '..', 'src', 'data', 'programmatic-integration-seeds.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'programmatic-integrations.json');

const integrationCatalog = {
  'google-drive': {
    name: 'Google Drive',
    sentenceName: 'Google Drive',
    destinationLabel: 'shared Google Drive folders',
    destinationRecommendedFeatures: ['Ecosystem Integration', 'Instant OCR', 'Batch Mode'],
    destinationProblems: [
      'Scans often stay stuck in personal camera rolls instead of team folders',
      'Shared Drive workflows break down when uploaded files are unreadable or poorly named',
      'Teams lose time when a document has to be rescanned before it can be filed'
    ],
    destinationBlocks: [
      {
        heading: 'Keep shared folders usable',
        body: 'Google Drive is where many teams expect the final PDF to live, not the starting point. This page should show how ScanDocPro helps mobile scans arrive as readable documents instead of random photos.'
      },
      {
        heading: 'Make OCR part of the handoff',
        body: 'Drive becomes more useful when invoices, contracts, and forms are searchable after upload. The workflow should connect scanning quality to retrieval speed, not just storage.'
      },
      {
        heading: 'Support multi-document packets',
        body: 'People rarely upload one page at a time. Batch capture plus a clean export path makes Google Drive a better archive for expense packets, agreements, and admin paperwork.'
      }
    ]
  },
  dropbox: {
    name: 'Dropbox',
    sentenceName: 'Dropbox',
    destinationLabel: 'Dropbox folders and shared client workspaces',
    destinationRecommendedFeatures: ['Ecosystem Integration', 'AI-Enhanced Scanning', 'Batch Mode'],
    destinationProblems: [
      'Dropbox folders fill up quickly with inconsistent scan quality from mobile teams',
      'Client-facing files need to look cleaner than casual phone photos',
      'Version confusion grows when paperwork is rescanned instead of captured well the first time'
    ],
    destinationBlocks: [
      {
        heading: 'Deliver cleaner client files',
        body: 'Dropbox workflows often support client delivery, property records, or distributed teams. The page should emphasize sending polished PDFs into shared folders without a second cleanup pass.'
      },
      {
        heading: 'Reduce file-quality drift',
        body: 'Teams using Dropbox usually care about consistency across people and locations. That makes edge cleanup, legibility, and page order part of the destination story.'
      },
      {
        heading: 'Keep archives ready for reuse',
        body: 'A better Dropbox workflow is not just about uploading once. It is about making sure the stored file still works when someone revisits it during review, compliance, or client service.'
      }
    ]
  },
  email: {
    name: 'Email',
    sentenceName: 'email',
    destinationLabel: 'an email-ready PDF attachment',
    destinationRecommendedFeatures: ['Ecosystem Integration', 'Instant OCR', 'AI-Enhanced Scanning'],
    destinationProblems: [
      'Email recipients judge the document immediately, so sloppy scans create friction fast',
      'Large attachments become harder to manage when pages are not bundled cleanly',
      'People often need a send-ready PDF now, not after a desktop cleanup step'
    ],
    destinationBlocks: [
      {
        heading: 'Treat email as delivery, not storage',
        body: 'Email workflows usually happen under time pressure. The page should explain how ScanDocPro turns mobile capture into a clean attachment that can be sent without apology.'
      },
      {
        heading: 'Keep recipients out of the camera roll',
        body: 'People searching for this workflow are trying to avoid sending tilted snapshots. OCR and cleanup matter because inbox recipients expect a readable PDF, not a raw image.'
      },
      {
        heading: 'Bundle related pages before sending',
        body: 'Invoices, certificates, and business cards are often sent with supporting pages. The workflow should emphasize one polished PDF instead of a thread full of scattered attachments.'
      }
    ]
  },
  sendfaxpro: {
    name: 'SendFaxPro',
    sentenceName: 'SendFaxPro',
    destinationLabel: 'a SendFaxPro delivery workflow',
    destinationRecommendedFeatures: ['Ecosystem Integration', 'Batch Mode', 'E-Sign & Annotate'],
    destinationProblems: [
      'Legacy offices still require fax delivery even after the scan is captured',
      'Formal submission workflows fail when packets are incomplete or signatures are hard to read',
      'People waste time moving documents between scanning and delivery tools by hand'
    ],
    destinationBlocks: [
      {
        heading: 'Close the scan-to-fax gap',
        body: 'SendFaxPro pages should show a practical bundle story: capture on mobile with ScanDocPro, then move straight into formal fax delivery when the workflow still depends on it.'
      },
      {
        heading: 'Keep packet quality high',
        body: 'Fax-oriented workflows are unforgiving when the original scan is weak. Batch capture, page order, and readable signatures all need to be part of the promise.'
      },
      {
        heading: 'Support regulated paperwork',
        body: 'Contracts, insurance forms, and other operational documents often still move by fax. The page should connect ScanDocPro quality with downstream delivery confidence.'
      }
    ]
  }
};

const documentCatalog = {
  receipts: {
    name: 'Receipts',
    noun: 'receipts',
    detailFocus: 'vendor names, totals, and dates',
    recommendedFeatures: ['Instant OCR', 'AI-Enhanced Scanning'],
    problems: [
      'Faded print becomes harder to review after upload or delivery',
      'Expense packets are rarely one page, so batching matters',
      'Finance teams need searchable PDFs instead of photo clutter'
    ],
    blockHeading: 'Preserve expense proof',
    blockBody: 'Receipt workflows depend on capturing small print before it fades and then bundling multiple slips into one usable PDF.'
  },
  invoices: {
    name: 'Invoices',
    noun: 'invoices',
    detailFocus: 'invoice numbers, totals, line items, and terms',
    recommendedFeatures: ['Instant OCR', 'Batch Mode'],
    problems: [
      'Payment workflows slow down when invoice totals or identifiers are hard to read',
      'Teams often need to capture several invoices at once',
      'A weak scan creates avoidable follow-up from finance or clients'
    ],
    blockHeading: 'Keep the approval trail moving',
    blockBody: 'Invoice searches usually come from people trying to keep accounts payable or customer billing from stalling on poor scan quality.'
  },
  contracts: {
    name: 'Contracts',
    noun: 'contracts',
    detailFocus: 'signatures, clause text, and page order',
    recommendedFeatures: ['Batch Mode', 'E-Sign & Annotate'],
    problems: [
      'Signed pages lose value when signatures or initials are unclear',
      'Contract packets need reliable page order and one final PDF',
      'Legal and operations teams need a cleaner handoff than ad hoc photos'
    ],
    blockHeading: 'Protect signed detail',
    blockBody: 'Contract scans are judged on legibility, signature clarity, and whether the packet looks trustworthy enough to move forward.'
  },
  'medical-records': {
    name: 'Medical Records',
    noun: 'medical records',
    detailFocus: 'patient information, provider details, and chronological order',
    recommendedFeatures: ['Batch Mode', 'AI-Enhanced Scanning'],
    problems: [
      'Record packets are long and often copied multiple times before they are shared',
      'Unreadable dates, names, or medication details create unnecessary risk',
      'Teams need one organized PDF instead of a stack of images'
    ],
    blockHeading: 'Respect packet integrity',
    blockBody: 'Medical-record workflows are about organization and readability under pressure. The page should emphasize preserving detail across a multi-page packet.'
  },
  certificates: {
    name: 'Certificates',
    noun: 'certificates',
    detailFocus: 'names, seals, borders, and credential details',
    recommendedFeatures: ['AI-Enhanced Scanning', 'Batch Mode'],
    problems: [
      'Certificates look unprofessional when borders or seals are clipped',
      'Credential packets often include more than one proof document',
      'Recipients want a polished attachment they can review quickly'
    ],
    blockHeading: 'Preserve official presentation',
    blockBody: 'Certificate pages work when they speak to presentation quality, not just digitization. Users want a clean PDF that still looks official at first glance.'
  },
  'business-cards': {
    name: 'Business Cards',
    noun: 'business cards',
    detailFocus: 'names, titles, phone numbers, and email addresses',
    recommendedFeatures: ['Instant OCR', 'AI-Enhanced Scanning'],
    problems: [
      'Contact details are easy to lose when cards stay in pockets or desk piles',
      'Small type and glossy cards create legibility issues in weak mobile photos',
      'People often need to forward the captured contact quickly'
    ],
    blockHeading: 'Turn contacts into something usable',
    blockBody: 'Business-card intent is about turning a small paper object into readable contact information that can actually be shared or filed.'
  },
  'insurance-forms': {
    name: 'Insurance Forms',
    noun: 'insurance forms',
    detailFocus: 'policy details, signatures, and supporting fields',
    recommendedFeatures: ['Batch Mode', 'E-Sign & Annotate'],
    problems: [
      'Insurance packets often mix forms, signatures, and supporting pages',
      'Carrier or office workflows still demand formal delivery in some cases',
      'Weak contrast and small fields make rework common'
    ],
    blockHeading: 'Prepare regulated paperwork carefully',
    blockBody: 'Insurance-form pages should highlight clean fields, page order, and a smoother handoff into the office system that still receives the packet.'
  }
};

function readSeeds() {
  return JSON.parse(fs.readFileSync(SEEDS_PATH, 'utf-8'));
}

function buildDestinationPage(seed) {
  const integration = integrationCatalog[seed.integration];
  const title = `Scan Documents to ${integration.name} on Your Phone`;
  const scanningPageLabel = integration.sentenceName === 'email'
    ? 'an email scanning page'
    : `a ${integration.name} scanning page`;

  return {
    slug: seed.slug,
    name: integration.name,
    targetKeyword: seed.targetKeyword,
    pageTitle: title,
    pageMetaDescription: `Capture receipts, contracts, invoices, and forms into clean PDFs, then route them to ${integration.sentenceName} with OCR, cleanup, and mobile-friendly export.`,
    pageH1: title,
    intro: `Use ScanDocPro to capture paperwork cleanly and move it straight into ${integration.sentenceName} so teams, clients, or archives get readable PDFs instead of loose phone photos.`,
    heroBullets: [
      `Turn mobile scans into searchable PDFs before they land in ${integration.destinationLabel}`,
      'Keep page order, cleanup, and readability intact across multi-page packets',
      'Give the next person a file that is ready to review, store, or forward'
    ],
    keyProblems: integration.destinationProblems,
    recommendedFeatures: integration.destinationRecommendedFeatures,
    workflowSteps: [
      'Capture the full document set on mobile instead of saving scattered images',
      'Run cleanup and OCR so important names, totals, signatures, or dates stay searchable',
      `Export one polished PDF into ${integration.destinationLabel}`
    ],
    uniqueContentBlocks: integration.destinationBlocks,
    faq: [
      {
        question: `Can I scan documents to ${integration.sentenceName} from my phone?`,
        answer: `Yes. The workflow is to capture the document cleanly, run OCR and cleanup, then export a readable PDF into ${integration.sentenceName} instead of sending raw camera images.`
      },
      {
        question: `What should ${scanningPageLabel} emphasize?`,
        answer: 'It should emphasize scan quality, searchable text, page order, and a handoff that matches the destination system instead of stopping at generic mobile capture.'
      }
    ],
    relatedUrls: seed.relatedUrls,
    schemaType: 'WebPage'
  };
}

function buildWorkflowPage(seed) {
  const integration = integrationCatalog[seed.integration];
  const document = documentCatalog[seed.document];
  const title = `How to Scan ${document.name} to ${integration.name}`;

  return {
    slug: seed.slug,
    name: `${document.name} to ${integration.name}`,
    targetKeyword: seed.targetKeyword,
    pageTitle: title,
    pageMetaDescription: `Scan ${document.noun} to ${integration.sentenceName} with OCR, cleanup, and mobile PDF export so ${document.detailFocus} stay readable in the next workflow.`,
    pageH1: title,
    intro: `Capture ${document.noun} into searchable PDFs and route them into ${integration.sentenceName} so ${document.detailFocus} stay readable when the file leaves your phone.`,
    heroBullets: [
      `Preserve ${document.detailFocus} before the PDF reaches ${integration.name}`,
      `Use one clean export path instead of juggling photos, rescans, and manual uploads`,
      `Keep ${document.noun} ready for the next reviewer, archive, or delivery step`
    ],
    keyProblems: [
      document.problems[0],
      integration.destinationProblems[0],
      document.problems[2]
    ],
    recommendedFeatures: ['Ecosystem Integration', ...document.recommendedFeatures],
    workflowSteps: [
      `Capture the full ${document.noun} set in one pass so nothing is missed`,
      `Enhance the scan and use OCR so ${document.detailFocus} remain easy to find`,
      `Export the finished PDF into ${integration.destinationLabel} without a second cleanup step`
    ],
    uniqueContentBlocks: [
      {
        heading: document.blockHeading,
        body: document.blockBody
      },
      {
        heading: `Why ${integration.name} fits this handoff`,
        body: `This workflow matters because the scan is not the finish line. ${integration.name} is where the file gets reviewed, stored, or delivered next, so the exported PDF needs to arrive clean and complete.`
      },
      {
        heading: 'Avoid the rescan loop',
        body: `People searching for this page are usually trying to avoid a second pass. A better ${document.name.toLowerCase()} workflow means capturing once, exporting once, and letting ${integration.name} handle the next step.`
      }
    ],
    faq: [
      {
        question: `Can I scan ${document.noun} to ${integration.sentenceName} on my phone?`,
        answer: `Yes. ScanDocPro can capture the pages, clean them up, and export a readable PDF that is easier to move into ${integration.sentenceName} than a stack of raw photos.`
      },
      {
        question: `What matters most when scanning ${document.noun} to ${integration.sentenceName}?`,
        answer: `The important part is preserving ${document.detailFocus}, keeping the packet organized, and making sure the exported PDF is strong enough for the next person or system.`
      }
    ],
    relatedUrls: seed.relatedUrls,
    schemaType: 'HowTo'
  };
}

function main() {
  const seeds = readSeeds();
  const pages = seeds.map((seed) => (
    seed.pageType === 'destination' ? buildDestinationPage(seed) : buildWorkflowPage(seed)
  ));

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(pages, null, 2)}\n`);
  console.log(`Generated ${pages.length} integration programmatic pages.`);
}

main();
