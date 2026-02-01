import { SEO } from '@/components/SEO';
import { FileText, Scale, AlertCircle, Ban, Gavel } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: `By downloading, installing, or using ScanDocPro, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our application.

These terms constitute a legally binding agreement between you and 4AI Info Tech regarding your use of ScanDocPro.`,
  },
  {
    icon: Scale,
    title: 'Use License',
    content: `We grant you a limited, non-exclusive, non-transferable, revocable license to use ScanDocPro for personal or business purposes, subject to these terms.

You may not:
• Modify, reverse engineer, or create derivative works
• Use the app for any illegal purpose
• Interfere with or disrupt the service
• Attempt to gain unauthorized access to our systems
• Resell, sublicense, or distribute the app

Violation of these restrictions will result in immediate termination of your license.`,
  },
  {
    icon: AlertCircle,
    title: 'Account Responsibilities',
    content: `When creating an account, you must:
• Provide accurate and complete information
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized access
• Accept responsibility for all activities under your account

You must be at least 13 years old to use ScanDocPro. If you are under 18, you must have parental consent.`,
  },
  {
    icon: Ban,
    title: 'Prohibited Content',
    content: `You may not use ScanDocPro to scan, store, or distribute:
• Content that infringes intellectual property rights
• Illegal, harmful, or fraudulent documents
• Content containing malware or viruses
• Material that violates any applicable laws
• Documents containing hate speech or harassment

We reserve the right to suspend accounts violating these rules.`,
  },
  {
    icon: Gavel,
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law:

• ScanDocPro is provided "as is" without warranties
• We are not liable for indirect, incidental, or consequential damages
• Our total liability shall not exceed the amount you paid us in the past 12 months
• We do not guarantee uninterrupted or error-free service
• You use the app at your own risk

This limitation applies regardless of the legal theory asserted.`,
  },
];

export function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms and conditions for using ScanDocPro. Please read carefully before using our services."
        noindex
      />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Please read these terms carefully before using ScanDocPro.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Last updated: January 2026
            </p>
          </div>

          {/* Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-12">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Important Notice
                </h3>
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  By using ScanDocPro, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please uninstall the application and discontinue use immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title} className="prose dark:prose-invert max-w-none">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4">
                    <section.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">
                    {section.title}
                  </h2>
                </div>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pl-14">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Additional Terms */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Additional Terms
            </h2>
            
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Governing Law</h3>
                <p>These terms shall be governed by and construed in accordance with the laws of Turkey, without regard to conflict of law principles.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Changes to Terms</h3>
                <p>We may update these terms from time to time. Continued use after changes constitutes acceptance of the new terms.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Termination</h3>
                <p>We may terminate or suspend your access to ScanDocPro immediately, without prior notice, for any reason.</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              For questions about these Terms, contact us at:{' '}
              <a href="mailto:legal@scandocpro.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                legal@scandocpro.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
