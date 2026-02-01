import { SEO } from '@/components/SEO';
import { Shield, Lock, Eye, Server, Globe } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: 'Information We Collect',
    content: `We collect minimal information necessary to provide our services:

• **Account Information**: Email address and authentication details when you create an account.
• **Usage Data**: Anonymous analytics about app features used and performance metrics.
• **Device Information**: Device type, OS version, and app version for troubleshooting.

We do NOT collect or store your scanned documents on our servers unless you explicitly choose cloud backup.`,
  },
  {
    icon: Lock,
    title: 'How We Protect Your Data',
    content: `Your security is our priority:

• **On-Device Processing**: Most document processing happens locally on your device.
• **Encryption**: All data transmissions use industry-standard TLS 1.3 encryption.
• **Secure Storage**: Any cloud backups use AES-256 encryption at rest.
• **Regular Audits**: We conduct regular security audits and penetration testing.

We implement the same security standards used by SendFaxPro, trusted by thousands of businesses.`,
  },
  {
    icon: Eye,
    title: 'Your Privacy Rights',
    content: `You have full control over your data:

• **Access**: Request a copy of all data we hold about you.
• **Deletion**: Delete your account and all associated data at any time.
• **Portability**: Export your data in standard formats.
• **Opt-out**: Disable analytics collection in app settings.

To exercise these rights, contact us at privacy@scandocpro.com`,
  },
  {
    icon: Server,
    title: 'Data Retention',
    content: `We retain data only as long as necessary:

• **Account Data**: Retained while your account is active, deleted within 30 days of account closure.
• **Cloud Backups**: Retained according to your chosen plan settings.
• **Analytics**: Anonymized after 90 days.
• **Crash Logs**: Deleted after 30 days.

You can request immediate deletion of any data at any time.`,
  },
  {
    icon: Globe,
    title: 'International Data Transfers',
    content: `ScanDocPro operates globally with data protection:

• **GDPR Compliance**: Fully compliant with EU data protection regulations.
• **Data Localization**: Choose where your data is stored (EU, US, or Asia-Pacific).
• **Standard Contractual Clauses**: For any necessary international transfers.
• **Privacy Shield**: We adhere to applicable data transfer frameworks.

Our servers are located in ISO 27001 certified data centers.`,
  },
];

export function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how ScanDocPro protects your privacy and handles your data with industry-leading security practices."
        noindex
      />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your documents stay yours. Learn how we protect your privacy.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Last updated: January 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 mb-12">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At ScanDocPro, privacy isn't a feature—it's our foundation. This Privacy Policy explains how we collect, use, and protect your personal information when you use our mobile application and services.
            </p>
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

          {/* Contact */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>Email: privacy@scandocpro.com</li>
              <li>Address: 4AI Info Tech, Ankara, Turkey</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
