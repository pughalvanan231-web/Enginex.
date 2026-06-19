import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { href: '/services', label: 'Web Development' },
    { href: '/services', label: 'Mobile Apps' },
    { href: '/services', label: 'AI Solutions' },
    { href: '/services', label: 'UI/UX Design' },
    { href: '/services', label: 'Cloud Solutions' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ],
  support: [
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'FAQ' },
    { href: '/contact', label: 'Support' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Engine</span>
                <span className="text-[#FF8C38]">X</span>
                <span className="text-white/30 text-xs ml-0.5 font-normal">.solution</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-xs">
              Delivering measurable business results through world-class technology and performance-driven solutions.
            </p>
            <div className="flex gap-3 mt-6">
              {['X', 'Li', 'Gh', 'Dr'].map((social) => (
                <a key={social} href="#" className="w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center text-white/20 hover:text-[#FF8C38] hover:border-[#FF8C38]/30 transition-all duration-500 text-[11px] font-medium">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4 tracking-wide">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-[#FF8C38] transition-colors duration-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4 tracking-wide">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-[#FF8C38] transition-colors duration-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80 mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-white/35">
                <Mail className="w-4 h-4 mt-0.5 text-[#FF8C38] shrink-0" />
                <a href="mailto:pughalvanan231@gmail.com" className="hover:text-[#FF8C38] transition-colors duration-300">pughalvanan231@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/35">
                <Phone className="w-4 h-4 mt-0.5 text-[#FF8C38] shrink-0" />
                <a href="tel:+917867050320" className="hover:text-[#FF8C38] transition-colors duration-300">+91 7867050320</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/35">
                <MapPin className="w-4 h-4 mt-0.5 text-[#FF8C38] shrink-0" />
                <a href="https://maps.google.com/?q=Sulur,Coimbatore,Tamil+Nadu" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF8C38] transition-colors duration-300">2/222c Sulur,<br />Coimbatore, Tamil Nadu</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/20">
            &copy; {new Date().getFullYear()} EngineX.solution. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/20 hover:text-[#FF8C38] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/20 hover:text-[#FF8C38] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
