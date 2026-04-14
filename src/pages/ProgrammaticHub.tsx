import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Layers, Scale, Shield } from 'lucide-react';
import { useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { GradientText } from '@/components/GradientText';
import {
  getProgrammaticEntryByUrl,
  getProgrammaticFamilyLabel,
  getProgrammaticHub,
  getProgrammaticPagesByFamily,
} from '@/data/programmaticPages';
import type { ProgrammaticFamily } from '@/types';
import { getProgrammaticHubSEO } from '@/utils/seo';
import { trackProgrammaticEvent } from '@/utils/analytics';

interface ProgrammaticHubProps {
  family: ProgrammaticFamily;
}

const relatedFamilyIcons = {
  documents: FileText,
  solutions: Layers,
  compare: Scale,
} satisfies Record<ProgrammaticFamily, typeof FileText>;

export function ProgrammaticHub({ family }: ProgrammaticHubProps) {
  const hub = getProgrammaticHub(family);
  const seo = getProgrammaticHubSEO(hub);
  const pages = getProgrammaticPagesByFamily(family);

  useEffect(() => {
    trackProgrammaticEvent('programmatic_page_view', {
      family,
      slug: 'hub',
      target_keyword: hub.targetKeyword,
    });
  }, [family, hub.targetKeyword]);

  return (
    <>
      <SEO {...seo} />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
              ScanDocPro {getProgrammaticFamilyLabel(family)}
            </span>
            <h1 className="mt-6 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              {hub.h1.split(' ').slice(0, -2).join(' ')}{' '}
              <GradientText>{hub.h1.split(' ').slice(-2).join(' ')}</GradientText>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              {hub.intro}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {hub.heroBullets.map((bullet) => (
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
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{hub.sectionTitle}</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">{hub.sectionDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => (
              <Link
                key={page.url}
                to={page.url}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-primary-700"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {page.targetKeyword}
                  </span>
                  <ArrowRight className="h-5 w-5 text-primary-600 transition-transform group-hover:translate-x-1 dark:text-primary-400" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{page.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{page.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-accent-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bundle the next step</h2>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Every page in this hub is designed to convert scanning intent into a real workflow. Use ScanDocPro for capture, cleanup, OCR, and packet building, then move formal delivery into SendFaxPro when needed.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={hub.cta.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackProgrammaticEvent('programmatic_primary_cta_click', {
                      family,
                      slug: 'hub',
                      target_keyword: hub.targetKeyword,
                      cta_type: 'primary',
                      destination_url: hub.cta.primaryHref,
                    });
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  {hub.cta.primaryLabel}
                </a>
                <a
                  href={hub.cta.secondaryHref}
                  onClick={() => {
                    trackProgrammaticEvent('programmatic_secondary_cta_click', {
                      family,
                      slug: 'hub',
                      target_keyword: hub.targetKeyword,
                      cta_type: 'secondary',
                      destination_url: hub.cta.secondaryHref,
                    });
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-primary-400 hover:text-primary-700 dark:border-gray-700 dark:text-gray-200 dark:hover:border-primary-700 dark:hover:text-primary-300"
                >
                  {hub.cta.secondaryLabel}
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-gray-900 p-8 text-white shadow-sm dark:bg-black">
              <h2 className="text-2xl font-bold">Explore the related families</h2>
              <p className="mt-4 text-gray-300">
                Internal linking keeps these pages crawlable and helps visitors move from broad evaluation into the exact document or role workflow they need.
              </p>
              <div className="mt-6 grid gap-4">
                {hub.relatedFamilies.map((relatedFamily) => {
                  const relatedHub = getProgrammaticHub(relatedFamily);
                  const Icon = relatedFamilyIcons[relatedFamily];

                  return (
                    <Link
                      key={relatedFamily}
                      to={relatedHub.url}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-white/10 p-2">
                          <Icon className="h-5 w-5 text-accent-400" />
                        </div>
                        <div>
                          <div className="font-semibold">{relatedHub.h1}</div>
                          <div className="text-sm text-gray-300">{relatedHub.metaDescription}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-accent-400" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Questions this hub should answer</h2>
          <div className="mt-8 space-y-4">
            {hub.faq.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/70"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.question}</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900/60">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured pages in this family</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {hub.featuredUrls.map((url) => {
                const entry = getProgrammaticEntryByUrl(url);
                if (!entry || !('family' in entry) || !('slug' in entry)) {
                  return null;
                }

                return (
                  <Link
                    key={url}
                    to={url}
                    className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-primary-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-700"
                  >
                    <div className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                      {entry.targetKeyword}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{entry.metaDescription}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
