import { 
  Zap, Type, ScanLine, Layers, PenTool, Share2,
  Briefcase, BookOpen, Home as HomeIcon, Check, Shield,
  FileText, Camera, Sparkles, Send
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { GradientText } from '@/components/GradientText';
import { PhoneMockup } from '@/components/PhoneMockup';
import { AppBadge } from '@/components/AppBadge';
import { FeatureCard } from '@/components/FeatureCard';
import { StepCard } from '@/components/StepCard';
import { defaultKeywords } from '@/utils/seo';

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

export function Home() {
  return (
    <>
      <SEO
        title="ScanDocPro – AI Document Scanner"
        description="Transform paper into professional PDFs instantly. AI-powered scanning, OCR, and document enhancement—redefined for mobile."
        keywords={defaultKeywords}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 mb-6">
                <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">From the creators of SendFaxPro</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                The Intelligent<br />
                <GradientText>Scanner in Your Pocket</GradientText>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Transform paper into professional PDFs instantly. AI-powered scanning, OCR, and document enhancement—redefined for mobile.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <AppBadge store="apple" disabled />
                <AppBadge store="google" disabled />
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400">
                <Shield className="w-5 h-5 text-accent-500 mr-2" />
                Trusted by 50,000+ professionals worldwide
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
            ScanDocPro is a professional mobile document scanner built for people who demand clarity, speed, and reliability.
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Unlike basic camera apps, ScanDocPro uses intelligent algorithms to flatten pages, remove shadows, and produce office-grade scans—right from your phone.
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
              Scan with precision. Fax with confidence. The complete document workflow solution.
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
              Get professional-quality scans in three simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <StepCard
              number={1}
              title="Scan"
              description="Point your camera at any document. Our AI instantly detects edges and captures the perfect shot."
            />
            <StepCard
              number={2}
              title="Enhance"
              description="Apply AI enhancement, run OCR for text recognition, or add your signature with a tap."
            />
            <StepCard
              number={3}
              title="Share"
              description="Export as PDF, send via SendFaxPro, or share to your favorite cloud storage instantly."
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
            Scan Smarter.<br />
            <GradientText>Work Faster.</GradientText>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
            ScanDocPro is launching soon. Be the first to experience the future of mobile document scanning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppBadge store="apple" disabled />
            <AppBadge store="google" disabled />
          </div>
          
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Available on iOS and Android. No credit card required.
          </p>
        </div>
      </section>
    </>
  );
}
