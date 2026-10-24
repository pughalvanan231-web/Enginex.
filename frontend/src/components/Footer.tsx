import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { href: '/services/website-development', label: 'Website Development' },
    { href: '/services/digital-marketing', label: 'Digital Marketing' },
    { href: '/services/seo', label: 'Search Engine Optimization (SEO)' },
    { href: '/services/google-ads', label: 'Google Ads Management' },
    { href: '/services/meta-ads', label: 'Meta Ads (FB & Insta)' },
    { href: '/services/social-media-marketing', label: 'Social Media Marketing' },
    { href: '/services/mobile-app-development', label: 'Mobile App Development' },
    { href: '/services/video-production', label: 'Video Production & Editing' },
    { href: '/services/branding', label: 'Branding & Logo Design' },
    { href: '/services/ai-automation', label: 'AI Automation & Software' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Insights & Guides' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact Us' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link href="/">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Engine</span>
                <span className="text-[#FF8C38]">X</span>
                <span className="text-white/30 text-xs ml-0.5 font-normal"> Solutions</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-sm">
              EngineX Solutions is a modern technology, AI, custom software, and performance digital marketing agency headquartered in Sulur, Coimbatore, serving high-growth businesses across India.
            </p>
            <div className="mt-6 flex flex-col gap-1 text-xs text-white/40">
              <span>GST & MSME Compliant • India</span>
              <span>100% Client Code & Ad Account Ownership</span>
            </div>
          </div>

          {/* Dedicated Services Column */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-white/90 mb-4 tracking-wide uppercase text-xs">
              Dedicated Services
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/45 hover:text-[#FF8C38] transition-colors duration-200 block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-white/90 mb-4 tracking-wide uppercase text-xs">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/45 hover:text-[#FF8C38] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-white/90 mb-4 tracking-wide uppercase text-xs">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-white/45">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-[#FF8C38] shrink-0" />
                <a
                  href="mailto:pughalvanan231@gmail.com"
                  className="hover:text-[#FF8C38] transition-colors break-all"
                >
                  pughalvanan231@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-[#FF8C38] shrink-0" />
                <a href="tel:+917867050320" className="hover:text-[#FF8C38] transition-colors">
                  +91 7867050320
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-[#FF8C38] shrink-0" />
                <a
                  href="https://maps.google.com/?q=Sulur,Coimbatore,Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF8C38] transition-colors leading-relaxed"
                >
                  2/222c Sulur, Coimbatore,<br />Tamil Nadu, 641402, India
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 text-center sm:text-left">
            &copy; {new Date().getFullYear()} EngineX Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/30 hover:text-[#FF8C38] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
