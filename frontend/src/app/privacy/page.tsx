import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Privacy Policy | EngineX Solutions',
  description: 'Learn how EngineX Solutions collects, uses, and safeguards your personal information when you use our website and software services.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | EngineX Solutions',
    description: 'Learn how EngineX Solutions collects, uses, and safeguards your personal information.',
    url: 'https://www.enginexsolutions.in/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            as="h1"
            label="Legal"
            title="Privacy Policy"
            description="Last updated: October 2026. EngineX Solutions is committed to protecting your privacy and personal data."
          />

          <div className="card-subtle p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
              <p>
                EngineX Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is dedicated to protecting the personal information you share with us. This Privacy Policy explains our practices regarding the collection, use, disclosure, and protection of information obtained through our website (https://www.enginexsolutions.in) and related digital services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
              <p>
                We only collect information necessary to provide and improve our services, communicate with you, and fulfill business inquiries:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-foreground">Contact & Inquiry Information:</strong> Name, business email address, phone number, company name, and project specifications submitted through our consultation forms.
                </li>
                <li>
                  <strong className="text-foreground">Technical & Usage Data:</strong> Anonymized metrics including browser type, operating system, pages visited, and session duration to ensure website stability and performance.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
              <p>We use collected data solely for legitimate business purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To evaluate, scope, and respond to your project inquiries and quote requests.</li>
                <li>To deliver custom software, web development, AI automation, and digital solutions.</li>
                <li>To maintain website security, prevent fraud, and optimize technical performance.</li>
                <li>To comply with applicable legal obligations.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">4. Information Sharing & Third Parties</h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We share data only with trusted service providers who assist us in operating our platform (such as transactional email delivery and secure hosting infrastructure), strictly subject to confidentiality obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">5. Data Security</h2>
              <p>
                We implement industry-standard technical and organizational security measures, including HTTPS encryption, restricted access controls, and regular infrastructure reviews, to prevent unauthorized access, alteration, or disclosure of your information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">6. Contact Information</h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact our team at:
              </p>
              <p className="text-foreground font-medium">
                EngineX Solutions<br />
                Email: <a href="mailto:pughalvanan231@gmail.com" className="text-primary hover:underline">pughalvanan231@gmail.com</a><br />
                Phone: <a href="tel:+917867050320" className="text-primary hover:underline">+91 7867050320</a><br />
                Address: 2/222c Sulur, Coimbatore, Tamil Nadu, India
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
