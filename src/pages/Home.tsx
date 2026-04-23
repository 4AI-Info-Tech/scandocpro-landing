import {
  Zap, Type, ScanLine, Layers, PenTool, Share2,
  Briefcase, BookOpen, Home as HomeIcon, Check, Shield,
  FileText, Camera, Send, Scale, ArrowRight, Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { GradientText } from '@/components/GradientText';
import { PhoneMockup } from '@/components/PhoneMockup';
import { AppBadge } from '@/components/AppBadge';
import { FeatureCard } from '@/components/FeatureCard';
import { StepCard } from '@/components/StepCard';
import { programmaticHubs } from '@/data/programmaticPages';
import { getHomeSEO } from '@/utils/seo';

const features = [
  { icon: Zap, title: 'AI‑Enhanced Scanning', description: 'Automatically removes shadows, corrects perspective, and sharpens text for HD results.', variant: 'primary' as const },
  { icon: Type, title: 'Instant OCR', description: 'Convert scans into searchable and selectable text. Copy, edit, and reuse content instantly.', variant: 'accent' as const },
  { icon: ScanLine, title: 'Smart Edge Detection', description: 'No manual cropping. Document corners are detected in milliseconds with precision.', variant: 'primary' as const },
  { icon: Layers, title: 'Batch Mode', description: 'Scan 50+ pages in seconds and export as a single, organized PDF document.', variant: 'accent' as const },
  { icon: PenTool, title: 'E‑Sign & Annotate', description: 'Sign contracts, highlight text, and add notes directly inside the app.', variant: 'primary' as const },
  { icon: Share2, title: 'Ecosystem Integration', description: 'Send scans directly to SendFaxPro, or export to Google Drive, Dropbox, and email.', variant: 'accent' as const },
];

const useCases = [
  { icon: Briefcase, title: 'Business & Freelancers', description: 'Contracts, invoices, signatures, and client documents. Stay organized and professional on the go.', color: 'primary' },
  { icon: BookOpen, title: 'Students & Educators', description: 'Lecture notes, assignments, textbooks, and handouts. Digitize your learning materials effortlessly.', color: 'accent' },
  { icon: HomeIcon, title: 'Everyday Use', description: 'Receipts, IDs, certificates, and official forms. Keep your important documents always accessible.', color: 'primary' },
];

const industries = [
  { icon: Briefcase, label: 'Legal Firms' },
  { icon: HomeIcon, label: 'Real Estate' },
  { icon: Send, label: 'Logistics' },
  { icon: BookOpen, label: 'Education' },
];

const popularWorkflows = [
  {
    icon: FileText,
    title: 'Scan Receipts to PDF',
    href: '/documents/receipts/',
    description: 'Capture faded receipts, extract totals with OCR, and bundle reimbursement-ready PDFs.',
  },
  {
    icon: Briefcase,
    title: 'Scan Contracts on Your Phone',
    href: '/documents/contracts/',
    description: 'Keep signatures, exhibits, and page order readable when agreements move fast.',
  },
  {
    icon: HomeIcon,
    title: 'Scan IDs and Forms',
    href: '/documents/ids/',
    description: 'Create cleaner copies of IDs, insurance forms, and supporting paperwork on the go.',
  },
  {
    icon: Send,
    title: 'Scan Invoices for Finance',
    href: '/documents/invoices/',
    description: 'Turn invoices into searchable PDFs with totals, dates, and vendor details intact.',
  },
  {
    icon: Share2,
    title: 'Scan Documents to Google Drive',
    href: '/integrations/google-drive/',
    description: 'Capture receipts, contracts, and invoices, then route clean PDFs into shared Drive folders.',
  },
  {
    icon: Share2,
    title: 'Scan Contracts to SendFaxPro',
    href: '/integrations/sendfaxpro-contracts/',
    description: 'Prepare signed agreements on mobile and hand them off to a formal fax workflow without rescanning.',
  },
  {
    icon: BookOpen,
    title: 'Scanner App for Students',
    href: '/solutions/students/',
    description: 'Digitize lecture notes, handouts, and whiteboards before they disappear.',
  },
  {
    icon: Scale,
    title: 'Compare Scanner Apps',
    href: '/compare/camscanner-alternative/',
    description: 'See where ScanDocPro fits when teams need OCR, cleanup, batching, and send-ready exports.',
  },
];

const hubIcons = {
  documents: FileText,
  solutions: Briefcase,
  integrations: Share2,
  compare: Scale,
  tools: Wrench,
} as const;

export function Home() {
  const seo = getHomeSEO();

  return (
    <>
      <SEO {...seo} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 mb-6">
                <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Document scanner app with OCR from the creators of SendFaxPro</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Scan Receipts, Contracts, and IDs<br />
                <GradientText>Into Searchable PDFs</GradientText>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                ScanDocPro helps teams capture paperwork cleanly with OCR, AI cleanup, batch scanning, and export tools built for receipts, invoices, forms, contracts, and mobile PDF workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <AppBadge store="apple" disabled />
                <AppBadge store="google" disabled />
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400">
                <Shield className="w-5 h-5 text-accent-500 mr-2" />
                Built for document-heavy teams that need readable PDFs, not camera-roll clutter
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative flex justify-center animate-fade-in">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-8 uppercase tracking-wider">
            Powering productivity for professionals worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <div key={industry.label} className="flex flex-col items-center group">
                <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:shadow-md dark:group-hover:shadow-gray-900/50 transition-shadow">
                  <industry.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{industry.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            What is <GradientText>ScanDocPro</GradientText>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6">
            ScanDocPro is a mobile document scanner app for teams that need OCR-ready PDFs from receipts, invoices, IDs, contracts, and forms.
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Unlike basic camera apps, ScanDocPro uses intelligent cleanup to flatten pages, remove shadows, preserve small text, and keep paperwork ready for finance, compliance, and client-facing workflows.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features, <GradientText>Professional Results</GradientText>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to scan, enhance, and share documents with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant={feature.variant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built for <GradientText>Every Workflow</GradientText>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From business to everyday life, ScanDocPro adapts to your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${useCase.color === 'primary' ? 'from-primary-500 to-primary-600' : 'from-accent-500 to-accent-600'} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Hubs */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore <GradientText>Search-Ready Workflows</GradientText>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse ScanDocPro by document type, role, delivery destination, or competitor evaluation so you land on the workflow that matches the job at hand.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 lg:gap-8">
            {programmaticHubs.filter((hub) => hub.family !== 'tools').map((hub) => {
              const Icon = hubIcons[hub.family];

              return (
                <Link
                  key={hub.family}
                  to={hub.url}
                  className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-700"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{hub.h1}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{hub.metaDescription}</p>
                  <div className="space-y-3 mb-6">
                    {hub.heroBullets.slice(0, 2).map((bullet) => (
                      <div key={bullet} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <div className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400">
                    Explore hub
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Workflow Links */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start with the <GradientText>Workflow You Need</GradientText>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These are the scanner app jobs people search for most often. Jump straight to the page that matches your paperwork instead of starting from a generic feature list.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {popularWorkflows.map((workflow) => (
              <Link
                key={workflow.href}
                to={workflow.href}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/70 dark:hover:border-primary-700"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <workflow.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{workflow.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{workflow.description}</p>
                <div className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400">
                  Open workflow
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section id="bundle" className="py-20 lg:py-32 bg-gray-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/20 text-accent-400 text-sm font-medium mb-4">
              4AI Utility Bundle
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Complete Your <span className="text-accent-400">Mobile Office</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Scan with OCR, package clean PDFs, and hand off delivery when a workflow still ends in fax, compliance, or legacy office systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* ScanDocPro Card */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">ScanDocPro</h3>
                <p className="text-gray-400 mb-6">Scan & Enhance</p>
                <ul className="space-y-3">
                  {['AI-powered scanning', 'OCR & enhancement', 'E-sign & annotate'].map((item) => (
                    <li key={item} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-accent-400 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* SendFaxPro Card */}
            <a href="https://sendfax.pro" target="_blank" rel="noopener noreferrer" className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 relative overflow-hidden group cursor-pointer hover:bg-white/10 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-accent-600 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">SendFaxPro</h3>
                <p className="text-gray-400 mb-6">Send & Deliver</p>
                <ul className="space-y-3">
                  {['Send faxes globally', 'Delivery confirmation', 'Secure transmission'].map((item) => (
                    <li key={item} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-accent-400 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              The <strong className="text-white">4AI Utility Bundle</strong> covers your entire document workflow—from camera to confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It <GradientText>Works</GradientText>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Move from raw paper to searchable, shareable PDFs without losing readability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <StepCard
              number={1}
              title="Scan"
              description="Capture receipts, contracts, invoices, or IDs with automatic edge detection tuned for document-heavy mobile work."
            />
            <StepCard
              number={2}
              title="Enhance"
              description="Clean shadows, sharpen text, and run OCR so totals, signatures, dates, and small print stay readable."
            />
            <StepCard
              number={3}
              title="Share"
              description="Export a clean PDF, send through SendFaxPro, or move the file to cloud storage and downstream operations."
            />
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-accent-600 dark:text-accent-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Your Documents Stay <span className="text-accent-600 dark:text-accent-400">Yours</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Privacy isn't a feature—it's our foundation.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              'On-device processing',
              'No data selling',
              'GDPR compliant',
              'Same security as SendFaxPro',
            ].map((item) => (
              <div key={item} className="flex items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <Check className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Turn Paper Into PDFs<br />
            <GradientText>That Still Read Clearly</GradientText>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
            Use ScanDocPro when the job is more than taking a photo: OCR, cleanup, batching, and document workflows that need to stay professional after capture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppBadge store="apple" disabled />
            <AppBadge store="google" disabled />
          </div>
          
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Built for iOS and Android workflows. App availability updates will be announced on the blog.
          </p>
        </div>
      </section>
    </>
  );
}
