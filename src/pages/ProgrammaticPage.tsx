import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  Layers,
  PenTool,
  ScanLine,
  Shield,
  Share2,
  Type,
  Zap,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { GradientText } from '@/components/GradientText';
import { ToolRunner } from '@/components/ToolRunner';
import {
  getProgrammaticEntryByUrl,
  getProgrammaticFamilyLabel,
  getProgrammaticHub,
  getProgrammaticPage,
} from '@/data/programmaticPages';
import type { ProgrammaticFamily } from '@/types';
import { getProgrammaticPageSEO } from '@/utils/seo';
import { trackProgrammaticEvent } from '@/utils/analytics';

interface ProgrammaticPageProps {
  family: ProgrammaticFamily;
}

const featureIcons = {
  'AI-Enhanced Scanning': Zap,
  'Instant OCR': Type,
  'Smart Edge Detection': ScanLine,
  'Batch Mode': Layers,
  'E-Sign & Annotate': PenTool,
  'Ecosystem Integration': Share2,
} satisfies Record<string, typeof Zap>;

export function ProgrammaticPage({ family }: ProgrammaticPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getProgrammaticPage(family, slug) : null;
  const hub = getProgrammaticHub(family);

  useEffect(() => {
    if (!page) {
      return;
    }

    trackProgrammaticEvent('programmatic_page_view', {
      family,
      slug: page.slug,
      target_keyword: page.targetKeyword,
    });
  }, [family, page]);

  if (!page) {
    return <Navigate to={`/${family}/`} replace />;
  }

  const seo = getProgrammaticPageSEO(page);

  return (
    <>
      <SEO {...seo} />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={hub.url} className="hover:text-primary-600 dark:hover:text-primary-400">
              {getProgrammaticFamilyLabel(family)}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>{page.title}</span>
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                {page.targetKeyword}
              </span>
              <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                {page.h1.split(' ').slice(0, -3).join(' ')}{' '}
                <GradientText>{page.h1.split(' ').slice(-3).join(' ')}</GradientText>
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400">{page.intro}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {page.heroBullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/70"
                  >
                    <CheckCircle2 className="mb-3 h-5 w-5 text-accent-500" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            {page.tool ? (
              <ToolRunner slug={page.slug} tool={page.tool} />
            ) : (
              <div className="rounded-3xl bg-gray-900 p-8 text-white shadow-xl dark:bg-black">
                <h2 className="text-2xl font-bold">Move from scan to delivery</h2>
                <p className="mt-4 text-gray-300">
                  ScanDocPro is built for the first half of the workflow: capture, cleanup, OCR, and packet building. When the document still needs formal delivery, the SendFaxPro bundle keeps the handoff simple.
                </p>
                <div className="mt-8 flex flex-col gap-4">
                  <a
                    href={page.cta.primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackProgrammaticEvent('programmatic_primary_cta_click', {
                        family,
                        slug: page.slug,
                        target_keyword: page.targetKeyword,
                        cta_type: 'primary',
                        destination_url: page.cta.primaryHref,
                      });
                    }}
                    className="inline-flex items-center justify-center rounded-xl bg-accent-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-accent-400"
                  >
                    {page.cta.primaryLabel}
                  </a>
                  <a
                    href={page.cta.secondaryHref}
                    onClick={() => {
                      trackProgrammaticEvent('programmatic_secondary_cta_click', {
                        family,
                        slug: page.slug,
                        target_keyword: page.targetKeyword,
                        cta_type: 'secondary',
                        destination_url: page.cta.secondaryHref,
                      });
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5"
                  >
                    {page.cta.secondaryLabel}
                  </a>
                </div>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-accent-400" />
                    <span className="font-semibold">Privacy-first workflow</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-300">
                    These pages emphasize readable, send-ready documents without relying on generic photo capture or fragile paper records.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/70">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why this workflow gets messy</h2>
              <ul className="mt-6 space-y-4">
                {page.keyProblems.map((problem) => (
                  <li key={problem} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-600 dark:text-gray-400">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended ScanDocPro features</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {page.recommendedFeatures.map((feature) => {
                  const Icon = featureIcons[feature] ?? FileText;

                  return (
                    <div
                      key={feature}
                      className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <Icon className="h-5 w-5 text-accent-500" />
                      <div className="mt-3 font-semibold text-gray-900 dark:text-white">{feature}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How the workflow should run</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Each page exists to answer a real search intent. That means showing a clear path from raw paper to a finished document that can actually move forward.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {page.workflowSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                  {index + 1}
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {page.uniqueContentBlocks.map((block) => (
              <div
                key={block.heading}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/70"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{block.heading}</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.comparison && (
        <section className="border-y border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How to evaluate the fit</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                This comparison is about workflow fit. ScanDocPro is positioned for document-heavy mobile teams, while {page.comparison.competitorName} may still be the better match in lighter or ecosystem-specific situations.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Choose ScanDocPro when</h3>
                <ul className="mt-5 space-y-4">
                  {page.comparison.chooseScanDocProWhen.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">The other app may still fit when</h3>
                <ul className="mt-5 space-y-4">
                  {page.comparison.chooseCompetitorWhen.map((item) => (
                    <li key={item} className="flex gap-3 text-gray-600 dark:text-gray-400">
                      <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">FAQ</h2>
          <div className="mt-8 space-y-4">
            {page.faq.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/70"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.question}</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl bg-gray-900 p-8 text-white dark:bg-black">
              <h2 className="text-3xl font-bold">Keep the workflow moving</h2>
              <p className="mt-4 text-gray-300">
                This page is built to convert a high-intent search into an actionable workflow. Scan with ScanDocPro, package the document cleanly, and move it into SendFaxPro when formal delivery still matters.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={page.cta.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackProgrammaticEvent('programmatic_primary_cta_click', {
                      family,
                      slug: page.slug,
                      target_keyword: page.targetKeyword,
                      cta_type: 'primary-bottom',
                      destination_url: page.cta.primaryHref,
                    });
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-accent-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-accent-400"
                >
                  {page.cta.primaryLabel}
                </a>
                <a
                  href={page.cta.secondaryHref}
                  onClick={() => {
                    trackProgrammaticEvent('programmatic_secondary_cta_click', {
                      family,
                      slug: page.slug,
                      target_keyword: page.targetKeyword,
                      cta_type: 'secondary-bottom',
                      destination_url: page.cta.secondaryHref,
                    });
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5"
                >
                  {page.cta.secondaryLabel}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Related pages</h2>
              <div className="mt-6 grid gap-4">
                {page.relatedUrls.map((url) => {
                  const entry = getProgrammaticEntryByUrl(url);
                  if (!entry) {
                    return null;
                  }

                  const label = 'family' in entry && 'slug' in entry ? entry.title : entry.h1;
                  const description = 'family' in entry && 'slug' in entry ? entry.metaDescription : entry.metaDescription;

                  return (
                    <Link
                      key={url}
                      to={url}
                      onClick={() => {
                        trackProgrammaticEvent('programmatic_related_page_click', {
                          family,
                          slug: page.slug,
                          target_keyword: page.targetKeyword,
                          destination_url: url,
                        });
                      }}
                      className="group rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-primary-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-700"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">{label}</div>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</div>
                        </div>
                        <ArrowRight className="mt-1 h-5 w-5 text-primary-600 transition-transform group-hover:translate-x-1 dark:text-primary-400" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
