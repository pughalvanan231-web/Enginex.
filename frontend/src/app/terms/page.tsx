import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SectionHeading from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Terms of Service | EngineX Solutions',
  description: 'Review the Terms of Service governing the use of EngineX Solutions website, software engineering services, and digital products.',
  alternates: {
    canonical: 'https://www.enginexsolutions.in/terms',
  },
  openGraph: {
    title: 'Terms of Service | EngineX Solutions',
    description: 'Terms of Service governing the use of EngineX Solutions website and services.',
    url: 'https://www.enginexsolutions.in/terms',
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            as="h1"
            label="Legal"
            title="Terms of Service"
            description="Last updated: October 2026. Please read these terms carefully before engaging our services or using this website."
          />

          <div className="card-subtle p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
              <p>
                By accessing or using the website of EngineX Solutions (https://www.enginexsolutions.in), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">2. Professional Services & Statements of Work</h2>
              <p>
                EngineX Solutions provides software engineering, AI development, web and mobile application development, UI/UX design, cloud architecture, and digital transformation services. Specific project deliverables, timelines, milestones, and payment terms are governed by individual client agreements and Statements of Work (SOW) executed between the parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">3. Intellectual Property Rights</h2>
              <p>
                Unless otherwise explicitly agreed in writing, client deliverables created pursuant to a paid Statement of Work belong to the client upon receipt of full payment. All proprietary methodologies, pre-existing frameworks, internal software tooling, and website assets owned by EngineX Solutions remain the exclusive intellectual property of EngineX Solutions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">4. Website Use & Prohibited Activities</h2>
              <p>When using our website, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Attempt to reverse-engineer, decompile, or tamper with any software or code powering the site.</li>
                <li>Engage in automated scraping or data harvesting without prior written authorization.</li>
                <li>Transmit malicious code, viruses, or disruptive network requests.</li>
                <li>Impersonate any person or misrepresent your affiliation with any entity.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, EngineX Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to use this website. All website content is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">6. Contact Information</h2>
              <p>
                For questions regarding these Terms of Service, please reach out to:
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
