import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Search, Globe, TrendingUp, Brain, Target } from 'lucide-react'

export default function NotFound() {
  const topServices = [
    { title: 'Website Development', href: '/services/website-development', icon: Globe },
    { title: 'Digital Marketing Services', href: '/services/digital-marketing', icon: TrendingUp },
    { title: 'Search Engine Optimization (SEO)', href: '/services/seo', icon: Search },
    { title: 'Google Ads Management', href: '/services/google-ads', icon: Target },
    { title: 'AI Automation & Custom Software', href: '/services/ai-automation', icon: Brain },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Header />
      <div className="pt-36 pb-24 container-custom text-center max-w-3xl mx-auto flex-1">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
          The page or resource you are looking for has been relocated, renamed, or is currently unavailable. Explore our core services below or return home.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-14">
          <Link href="/">
            <Button variant="primary" size="lg" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Homepage
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>

        <div className="border-t border-border pt-10 text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center">
            Explore Core Services
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {topServices.map((svc) => {
              const Icon = svc.icon
              return (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="card-subtle p-4 group hover:border-primary/40 transition-all flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors flex-1">
                    {svc.title}
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
