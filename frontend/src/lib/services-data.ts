export interface ServiceFAQ {
  question: string
  answer: string
}

export interface ServiceItem {
  slug: string
  icon: string
  title: string
  image: string
  shortDescription: string
  detail: string
  targetAudience: string
  deliverables: string[]
  features: string[]
  benefits: { title: string; description: string }[]
  process: { step: string; title: string; description: string }[]
  realisticOutcomes: string[]
  faqs: ServiceFAQ[]
  relatedSlugs: string[]
  metaTitle: string
  metaDescription: string
  serviceType: string
}

export const servicesList: ServiceItem[] = [
  {
    slug: 'digital-marketing',
    icon: 'TrendingUp',
    title: 'Digital Marketing Services',
    image: '/images/services/digital-marketing.jpg',
    shortDescription: 'Integrated multi-channel digital marketing solutions designed to expand market reach, build brand equity, and generate verified sales enquiries across India.',
    detail: 'EngineX Solutions provides full-funnel digital marketing services tailored for growing Indian enterprises, B2B companies, and consumer brands. Rather than treating marketing as isolated tactics, we synchronize organic search, paid acquisition, social engagement, and conversion rate optimization into a unified growth engine. Every initiative is backed by transparent analytics, structured experimentation, and commercial clarity.',
    targetAudience: 'Indian MSMEs, B2B manufacturers, healthcare providers, educational institutions, and emerging e-commerce brands seeking measurable customer acquisition.',
    deliverables: [
      'Comprehensive Digital Audit & Competitor Benchmarking',
      'Multi-Channel Growth Strategy & Quarterly Roadmaps',
      'Integrated SEO & Performance Marketing Campaign Execution',
      'Conversion Rate Optimization (CRO) & Landing Page Audit',
      'Monthly Attribution Reporting & Executive KPI Dashboards',
      'Dedicated Account Management & Bi-Weekly Strategy Reviews',
    ],
    features: [
      'Full-Funnel Customer Acquisition Planning',
      'Multi-Channel Attribution Modeling',
      'Audience Persona & Market Segmentation',
      'High-Intent Conversion Funnel Design',
      'Google Analytics 4 & Tag Manager Engineering',
      'Omnichannel Retargeting & Lead Nurturing',
    ],
    benefits: [
      {
        title: 'Unified Marketing Architecture',
        description: 'Ensure your organic search, paid advertising, and social media channels reinforce one another instead of competing for budget.',
      },
      {
        title: 'Rigorous Commercial Accountability',
        description: 'Track real qualified inquiries, customer acquisition cost (CAC), and pipeline contribution rather than vanity impression counts.',
      },
      {
        title: 'Tailored to the Indian Market',
        description: 'Strategies calibrated for diverse regional demographics, mobile-first search behavior, and localized commercial dynamics across India.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Market Audit',
        description: 'We evaluate your current digital presence, customer acquisition channels, competitor positions, and unit economics.',
      },
      {
        step: '02',
        title: 'Strategic Channel Blueprint',
        description: 'We construct an integrated campaign plan balancing rapid customer acquisition with compounding organic authority.',
      },
      {
        step: '03',
        title: 'Execution & Continuous Testing',
        description: 'Our team rolls out synchronized creative assets, tracking foundations, landing pages, and ongoing audience targeting experiments.',
      },
      {
        step: '04',
        title: 'Analysis & Optimization Sprints',
        description: 'We review performance bi-weekly, reallocating ad spend toward winning segments and refining conversion mechanisms.',
      },
    ],
    realisticOutcomes: [
      'Consistent influx of qualified commercial inquiries over 60 to 90 days of sustained campaign optimization.',
      'Reduced cost per acquisition through iterative conversion rate improvements on landing pages.',
      'Clear cross-channel visibility into where your marketing budget generates bottom-line revenue.',
    ],
    faqs: [
      {
        question: 'How quickly can our business expect tangible results from digital marketing?',
        answer: 'Paid search and targeted advertising can begin generating clicks and inquiries within days of launch. Organic search rankings and compounding content visibility typically require 3 to 6 months of disciplined technical and content execution. We establish transparent milestone roadmaps from month one.',
      },
      {
        question: 'Does EngineX Solutions guarantee specific lead numbers or first-page rankings?',
        answer: 'No reputable agency can guarantee specific Google rankings or exact sales volumes due to external auction dynamics, algorithm shifts, and market competition. What we commit to is proven engineering methodologies, transparent reporting, white-hat tactics, and continuous data-backed optimization.',
      },
      {
        question: 'Which marketing channels are recommended for B2B companies in India?',
        answer: 'For most Indian B2B enterprises, a combination of Google Search Ads for high-intent capture, targeted technical SEO for long-term organic authority, LinkedIn content for brand reputation, and Meta retargeting yields the highest return on investment.',
      },
      {
        question: 'How do you handle reporting and communication?',
        answer: 'Clients receive live Looker Studio or GA4 performance dashboards, structured bi-weekly review calls, and detailed monthly executive reports summarizing ad spend, qualified leads, and strategic adjustments.',
      },
    ],
    relatedSlugs: ['seo', 'google-ads', 'meta-ads', 'social-media-marketing'],
    metaTitle: 'Digital Marketing Services in India | EngineX Solutions',
    metaDescription: 'Full-suite, performance-driven digital marketing services for Indian businesses: multi-channel SEO, Google Ads, social media, and conversion optimization.',
    serviceType: 'Digital Marketing Services',
  },
  {
    slug: 'seo',
    icon: 'Search',
    title: 'Search Engine Optimization (SEO)',
    image: '/images/services/seo.jpg',
    shortDescription: 'Technical, content-led, and authoritative SEO services engineered to capture high-intent organic Google searches and build enduring digital market share.',
    detail: 'EngineX Solutions delivers ethical, white-hat Search Engine Optimization services focused on real commercial intent. Rather than chasing irrelevant vanity traffic, we engineer your technical infrastructure, page performance, topical content authority, and on-page signals so search engines recognize your website as the definitive resource in your industry. Every recommendation adheres strictly to Google Search Essentials and Webmaster Guidelines.',
    targetAudience: 'Businesses aiming to reduce long-term paid acquisition costs, dominate industry keyword searches, and build sustainable organic pipeline in India and abroad.',
    deliverables: [
      'Comprehensive Technical SEO Architecture Audit & Code Remediation',
      'Keyword Mapping & Search Intent Opportunity Matrix',
      'On-Page Optimization (Titles, Headings, Internal Links, Structured Data)',
      'Core Web Vitals & Page Speed Engineering (LCP, INP, CLS)',
      'Topical Authority Content Strategy & In-Depth Editorial Briefs',
      'Google Search Console Setup, Indexation Audits & Error Monitoring',
    ],
    features: [
      'Next.js & Modern Framework SSR Optimization',
      'Schema.org JSON-LD Structured Data Implementation',
      'Crawl Budget & XML Sitemap Governance',
      'Commercial & Informational Search Intent Alignment',
      'Semantic Internal Linking & Topic Cluster Architecture',
      'Transparent Monthly Rank & Organic Traffic Tracking',
    ],
    benefits: [
      {
        title: 'Compounding Organic Value',
        description: 'Unlike paid ads that stop the moment budget is exhausted, organic search equity continues delivering visitors month after month.',
      },
      {
        title: 'Higher Buyer Trust',
        description: 'Commercial decision-makers frequently trust organic search results over sponsored listings when evaluating professional partners.',
      },
      {
        title: 'Technical Precision',
        description: 'We address server headers, JavaScript hydration, crawl efficiency, and Core Web Vitals at code level for maximum crawlability.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Deep Technical & Content Audit',
        description: 'We inspect server configuration, canonical URLs, robots.txt directives, indexation health, and content cannibalization.',
      },
      {
        step: '02',
        title: 'Keyword Intent & Entity Mapping',
        description: 'We identify commercial and long-tail terms matching your actual business capabilities and map them to targeted URLs.',
      },
      {
        step: '03',
        title: 'On-Page & Technical Remediation',
        description: 'Our engineering team implements schema markup, optimizes HTML hierarchies, speeds up page load, and refines content copy.',
      },
      {
        step: '04',
        title: 'Topical Authority Expansion',
        description: 'We publish high-value educational guides, case studies, and industry resources that earn legitimate editorial backlinks.',
      },
    ],
    realisticOutcomes: [
      'Measurable gains in search impressions and keyword rankings across primary commercial terms within 90 to 180 days.',
      'Substantial improvements in Core Web Vitals performance scores and indexation velocity across Googlebot crawls.',
      'Sustained growth in inbound organic inquiries from decision-makers actively searching for your core services.',
    ],
    faqs: [
      {
        question: 'Why does SEO take 3 to 6 months to demonstrate significant results?',
        answer: 'Search engines must recrawl, index, and re-evaluate your updated technical infrastructure, internal link authority, and user engagement signals over time. Organic rankings compound as Google validates the reliability and helpfulness of your domain.',
      },
      {
        question: 'Do you use automated link-building or private blog networks (PBNs)?',
        answer: 'Never. We strictly avoid manipulative link schemes, spam directories, or automated backlink software. All links earned through our work are natural, relevant, and derived from genuine digital PR, industry citations, and high-value original resources.',
      },
      {
        question: 'How do you optimize modern Single-Page Applications and Next.js sites?',
        answer: 'We leverage Next.js Server Components, static site generation (SSG), dynamic sitemaps, semantic HTML5, and automated JSON-LD script tags to ensure Googlebot receives complete, pre-rendered markup without rendering delays.',
      },
      {
        question: 'What happens if Google updates its search ranking algorithms?',
        answer: 'Because our methodology is grounded in building fast, genuinely useful, technically sound websites that serve real human search intent, our clients are well protected against algorithmic spam updates.',
      },
    ],
    relatedSlugs: ['digital-marketing', 'google-ads', 'website-development', 'branding'],
    metaTitle: 'Professional SEO Services India | Organic Growth | EngineX Solutions',
    metaDescription: 'Ethical, technical, and content-led SEO services for Indian businesses. Improve Google rankings, enhance Core Web Vitals, and capture qualified organic search leads.',
    serviceType: 'Search Engine Optimization',
  },
  {
    slug: 'google-ads',
    icon: 'Target',
    title: 'Google Ads Management',
    image: '/images/services/google-ads.jpg',
    shortDescription: 'High-intent Pay-Per-Click (PPC) and Performance Max advertising campaigns engineered to capture ready-to-buy prospects and maximize return on ad spend.',
    detail: 'EngineX Solutions manages performance-driven Google Ads campaigns focused on profitable commercial acquisition. We design high-converting search architectures, tightly themed ad groups, strategic negative keyword filters, and server-side conversion tracking. By focusing on conversion rate economics rather than vanity clicks, we ensure your ad budget is directed exclusively at prospects with active buying intent.',
    targetAudience: 'Companies requiring immediate qualified leads, service firms competing in high-value B2B niches, and e-commerce stores scaling revenue.',
    deliverables: [
      'Account Restructuring & Granular Campaign Architecture',
      'Negative Keyword Scrubber & Search Term Harvest Protocols',
      'Responsive Search Ad (RSA) Copywriting & Asset Extensions',
      'GA4 Enhanced Conversions & Google Tag Manager Setup',
      'Landing Page Alignment & Click-Through Experience Optimization',
      'Weekly Bid Adjustments & Target CPA / Target ROAS Optimization',
    ],
    features: [
      'High-Intent Google Search Network Campaigns',
      'Performance Max (PMax) Asset Group Optimization',
      'Dynamic Remarketing & Customer Match Campaigns',
      'Click Fraud Prevention & Budget Pacing Controls',
      'Single-Keyword & Themed Ad Group Strategies',
      'Clear Conversion & Return On Ad Spend (ROAS) Tracking',
    ],
    benefits: [
      {
        title: 'Immediate Market Reach',
        description: 'Position your business directly at the top of Google search results for users actively searching for your solutions today.',
      },
      {
        title: 'Budget Efficiency & Waste Elimination',
        description: 'Continuous search term filtering and negative keywords protect your budget from irrelevant queries and unqualified clicks.',
      },
      {
        title: 'Verifiable Lead Attribution',
        description: 'Track exact phone calls, contact form submissions, and quotation requests directly back to the triggering keyword.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Commercial Intent & Competitor Research',
        description: 'We analyze competitor ad copy, identify high-intent commercial keywords, and compute realistic cost-per-click expectations.',
      },
      {
        step: '02',
        title: 'Tracking & Conversion Architecture',
        description: 'We configure Google Tag Manager, GA4 enhanced conversions, and server-side tracking to ensure pristine attribution.',
      },
      {
        step: '03',
        title: 'Campaign Build & Copywriting',
        description: 'We construct tightly structured ad groups, write compelling responsive ad copy, and configure full extension suites.',
      },
      {
        step: '04',
        title: 'Algorithmic Bid Tuning & Optimization',
        description: 'We manage Smart Bidding algorithms, test landing page variants, and refine negative keywords weekly.',
      },
    ],
    realisticOutcomes: [
      'Higher proportion of genuine business enquiries within the first 14 to 30 days of campaign launch.',
      'Progressive reduction in Cost Per Qualified Lead (CPQL) over 60 days as negative keyword lists mature.',
      'Full transparency into which keywords and campaigns directly drive closed revenue.',
    ],
    faqs: [
      {
        question: 'What is the minimum ad budget required to run Google Ads effectively?',
        answer: 'While Google does not mandate a minimum, we typically recommend a starting ad spend of ₹25,000 to ₹60,000 per month for local or targeted B2B campaigns in India, allowing the bidding algorithm sufficient data to optimize effectively.',
      },
      {
        question: 'Who pays Google for the advertising spend?',
        answer: 'You pay Google directly via your own billing profile. EngineX Solutions charges a transparent management fee for campaign architecture, copy, bidding, and optimization. You maintain 100% ownership of your ad account and data.',
      },
      {
        question: 'How do you prevent competitors from clicking on our ads?',
        answer: 'We implement strict IP exclusions, geographical fencing, bid adjustments on device types, and automated fraud-filtering rules to minimize invalid click activity.',
      },
      {
        question: 'What is the difference between Google Search and Performance Max?',
        answer: 'Search campaigns strictly target users typing specific queries on Google. Performance Max combines Search, YouTube, Display, Gmail, and Maps using Google AI. We utilize each where it aligns best with your customer acquisition stage.',
      },
    ],
    relatedSlugs: ['digital-marketing', 'meta-ads', 'seo', 'website-development'],
    metaTitle: 'Google Ads Management Services India | PPC Agency | EngineX Solutions',
    metaDescription: 'Targeted Google Ads management for Indian businesses. Drive high-intent B2B leads, minimize cost-per-click waste, and maximize return on ad spend with EngineX.',
    serviceType: 'PPC Advertising Management',
  },
  {
    slug: 'meta-ads',
    icon: 'Share2',
    title: 'Meta Ads Management',
    image: '/images/services/meta-ads.jpg',
    shortDescription: 'Performance-driven Facebook and Instagram advertising campaigns built on creative testing, granular audience segmentation, and Conversions API integration.',
    detail: 'EngineX Solutions develops high-impact Meta advertising campaigns that capture customer interest and drive scalable acquisition on Facebook and Instagram. We combine creative storytelling, engaging video hooks, custom audience modeling, and server-side Conversions API (CAPI) infrastructure. By treating creative assets as the primary targeting lever, we help brands scale reliably while maintaining sustainable customer acquisition economics.',
    targetAudience: 'Direct-to-consumer (D2C) brands, education and training providers, real estate developers, and consumer-facing service businesses across India.',
    deliverables: [
      'Audience Persona Research & Custom/Lookalike Audience Building',
      'Meta Conversions API (CAPI) & Pixel Setup on Next.js',
      'Static, Carousel & Video Ad Creative Production Briefs',
      'Systematic Creative Testing Matrix & Angle Validation',
      'Retargeting Funnel Engineering for Cart & Lead Abandonment',
      'Weekly Ad Fatigue Monitoring & Budget Scaling Protocols',
    ],
    features: [
      'Facebook & Instagram Sponsored Feed & Reel Ads',
      'Meta Conversions API (CAPI) First-Party Data Tracking',
      'Dynamic Product Catalog & Retargeting Campaigns',
      'Lead Generation Instant Forms & WhatsApp Ad Integration',
      'A/B Creative Hook, Headline & Angle Experimentation',
      'Full-Funnel ROAS & Customer Acquisition Cost (CAC) Tracking',
    ],
    benefits: [
      {
        title: 'Massive Consumer Reach',
        description: 'Connect with hundreds of thousands of relevant consumers in specific geographic regions across India through immersive visual feeds.',
      },
      {
        title: 'Resilient Server-Side Tracking',
        description: 'Bypass browser cookie restrictions with Meta Conversions API for accurate conversion tracking and better algorithmic delivery.',
      },
      {
        title: 'Creative-Driven Scaling',
        description: 'Continuous testing of creative angles prevents ad fatigue and unlocks new customer pockets without increasing acquisition costs.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Audience & Offer Architecture',
        description: 'We define core buyer hooks, competitive positioning, and structure irresistible commercial offers.',
      },
      {
        step: '02',
        title: 'Technical Infrastructure & CAPI',
        description: 'We configure Meta Business Manager, verify domains, and implement server-side tracking on your web platform.',
      },
      {
        step: '03',
        title: 'Creative Matrix & Cold Acquisition',
        description: 'We launch modular creative variations (video reels, carousels, testimonials) to identify top-performing angles.',
      },
      {
        step: '04',
        title: 'Scale & Retargeting Optimization',
        description: 'We scale winning ad sets horizontally, deploy custom warm retargeting funnels, and optimize for highest ROAS.',
      },
    ],
    realisticOutcomes: [
      'Predictable flow of consumer inquiries or direct purchases once creative angles are validated.',
      'Accurate conversion attribution even with mobile privacy protections via Conversions API.',
      'Consistent generation of fresh creative assets preventing performance drop-offs.',
    ],
    faqs: [
      {
        question: 'Do Meta Ads work for B2B businesses, or only for B2C?',
        answer: 'While Meta Ads excel for B2C, they are also highly effective for B2B when targeting company founders, directors, and professionals through retargeting, video thought leadership, and lookalikes built from verified customer lists.',
      },
      {
        question: 'Why do our Facebook ads stop performing after a few weeks?',
        answer: 'This is commonly caused by ad fatigue—your target audience has seen the exact same creative multiple times. We mitigate fatigue by testing fresh hooks, visual variations, and new copy angles every two weeks.',
      },
      {
        question: 'What is Meta Conversions API and why is it necessary?',
        answer: 'Browser-based pixels miss up to 30% of conversion data due to ad blockers and privacy controls. Meta Conversions API sends purchase and lead events directly from your web server to Meta, preserving algorithmic optimization.',
      },
      {
        question: 'Can we send ad traffic directly to WhatsApp?',
        answer: 'Yes. For Indian businesses where conversational closing is critical, Click-to-WhatsApp ads integrated with automated greeting flows generate high response rates and immediate interaction.',
      },
    ],
    relatedSlugs: ['google-ads', 'digital-marketing', 'social-media-marketing', 'video-production'],
    metaTitle: 'Meta Ads Management | Facebook & Instagram Agency | EngineX Solutions',
    metaDescription: 'Scalable Facebook and Instagram ads management for Indian businesses. Conversions API setup, high-converting creative testing, and ROAS-focused campaign management.',
    serviceType: 'Social Media Advertising',
  },
  {
    slug: 'social-media-marketing',
    icon: 'Users',
    title: 'Social Media Marketing',
    image: '/images/services/social-media-marketing.jpg',
    shortDescription: 'Organic social media management and content distribution strategies that build authentic brand authority, community engagement, and long-term customer loyalty.',
    detail: 'EngineX Solutions provides strategic social media management across LinkedIn, Instagram, and X (Twitter) for businesses looking to build lasting credibility. We replace aimless daily posting with structured content pillars, educational carousels, insightful founder-led posts, and community interaction. Our focus is turning passive followers into active brand advocates and qualified commercial relationships.',
    targetAudience: 'B2B enterprise firms, tech startups, executive founders, and service organizations aiming to elevate brand stature and organic social authority.',
    deliverables: [
      'Strategic Social Media Content Calendar & Thematic Pillars',
      'Custom Graphic Design, Slide Carousels & Video Thumbnails',
      'Professional Copywriting Tailored to Platform Tone (LinkedIn vs Instagram)',
      'Community Management, Comment Engagement & Direct Message Triage',
      'Founder Personal Branding & Executive Ghostwriting Strategy',
      'Monthly Audience Growth, Reach & Engagement Analytics',
    ],
    features: [
      'Multi-Platform Content Distribution Architecture',
      'LinkedIn Thought Leadership & B2B Lead Nurturing',
      'Visual Storytelling & Interactive Carousel Posts',
      'Hashtag Research & Algorithmic Reach Optimization',
      'Brand Tone of Voice & Visual Guideline Enforcement',
      'Quarterly Content Performance Benchmarking',
    ],
    benefits: [
      {
        title: 'Authentic Industry Stature',
        description: 'Consistent, insightful content establishes your leadership team as knowledgeable authorities in your technical domain.',
      },
      {
        title: 'Shortened Sales Cycles',
        description: 'Prospective buyers who engage with your social content are pre-educated and enter sales conversations with higher trust.',
      },
      {
        title: 'Organic Reach Without Ad Spend',
        description: 'High-value educational content receives organic platform distribution, generating brand awareness at zero media cost.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Brand Voice & Audience Alignment',
        description: 'We define your brand perspective, core subject matter expertise, and customer pain points.',
      },
      {
        step: '02',
        title: 'Content Pillar & Calendar Architecture',
        description: 'We establish monthly thematic schedules blending industry insights, case studies, and practical business advice.',
      },
      {
        step: '03',
        title: 'Production & Creative Asset Design',
        description: 'Our design and copy teams produce tailored graphics, carousels, and copy aligned with your brand guidelines.',
      },
      {
        step: '04',
        title: 'Community Engagement & Refinement',
        description: 'We publish, engage in discussion threads, analyze metrics, and double down on formats with the highest organic reach.',
      },
    ],
    realisticOutcomes: [
      'Gradual, compounding expansion of an authentic, industry-relevant follower base over 3 to 6 months.',
      'Elevated engagement rates and comment discussions from peers, partners, and potential clients.',
      'Enhanced conversion rates across paid ads and sales outreach due to established social proof.',
    ],
    faqs: [
      {
        question: 'Will social media marketing generate direct sales immediately?',
        answer: 'Organic social media is primarily an authority and trust-building channel that warms prospects, validates credibility, and accelerates deals. For immediate transactions, paid advertising (Google/Meta Ads) is paired with organic social for optimal impact.',
      },
      {
        question: 'Which platforms should our business prioritize?',
        answer: 'For B2B companies, LinkedIn is the clear leader for reaching decision-makers. For lifestyle, retail, education, and consumer brands, Instagram provides the visual engagement required.',
      },
      {
        question: 'Do you provide ghostwriting for business founders?',
        answer: 'Yes. We interview founders or extract key technical insights to craft authentic, executive-level LinkedIn posts that reflect your actual perspective and voice.',
      },
      {
        question: 'How many posts per week do you recommend?',
        answer: 'Quality consistently outperforms volume. We generally recommend 3 to 4 deeply researched, well-designed posts per week rather than daily low-effort filler content.',
      },
    ],
    relatedSlugs: ['digital-marketing', 'branding', 'video-production', 'meta-ads'],
    metaTitle: 'Social Media Marketing Services | EngineX Solutions',
    metaDescription: 'Strategic social media marketing and LinkedIn branding for Indian businesses. Build genuine brand authority, engage prospects, and grow organic industry influence.',
    serviceType: 'Social Media Marketing',
  },
  {
    slug: 'website-development',
    icon: 'Globe',
    title: 'Website Development Services',
    image: '/images/services/website-development.jpg',
    shortDescription: 'High-converting, lightning-fast websites and web applications built with Next.js, React, and modern full-stack architectures engineered for sub-second page loads.',
    detail: 'EngineX Solutions designs and engineers enterprise-grade websites and web applications tailored for speed, search visibility, and conversion. Built on modern tech stacks including Next.js, React, TypeScript, and Tailwind CSS, our digital platforms load instantly, display flawlessly on mobile devices, and provide intuitive administrative control. We treat your website not as a digital brochure, but as your primary revenue engine.',
    targetAudience: 'Growing enterprises, technology startups, professional service firms, and industrial businesses that require a world-class, fast digital presence.',
    deliverables: [
      'Custom UI/UX Wireframing & Responsive Figma Design System',
      'Next.js 15 App Router Full-Stack Production Codebase',
      'Semantic HTML5, Accessibility (WCAG 2.1), and Mobile-First Architecture',
      'Automated SEO Metadata, Schema.org Markup & XML Sitemaps',
      'Secure Contact Form Endpoints, Email Notifications & CRM Hooks',
      'Deployment on Edge CDN (Vercel, AWS, Cloudflare) with 99.9% Uptime',
    ],
    features: [
      'Next.js Server-Side Rendering (SSR) & Static Site Generation (SSG)',
      'Sub-Second Page Loads & Core Web Vitals Optimization',
      'Clean Modular TypeScript Codebase with Zero Framework Bloat',
      'Headless CMS & Database Integration (Prisma, PostgreSQL, Sanity)',
      'Interactive Consultation Modals & Lead Capture Workflows',
      'Robust Security Headers, HTTPS Encryption & Spam Protection',
    ],
    benefits: [
      {
        title: 'Blazing Fast Load Times',
        description: 'Server components and edge caching deliver instant page responses, lowering bounce rates and directly boosting Google search rankings.',
      },
      {
        title: 'Built-in Search Optimization',
        description: 'Clean semantic markup, dynamic sitemaps, and automated structured data give your site an immediate organic ranking advantage.',
      },
      {
        title: 'Complete Code Ownership',
        description: 'You own 100% of your source code, design assets, and intellectual property with zero proprietary lock-in or recurring template fees.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Architecture & Information Flow',
        description: 'We analyze your business goals, map user conversion pathways, and determine the optimal technical stack.',
      },
      {
        step: '02',
        title: 'UI/UX Design & Interactive Prototyping',
        description: 'We produce pixel-perfect responsive layouts in Figma for desktop, tablet, and mobile review.',
      },
      {
        step: '03',
        title: 'Production Engineering & QA',
        description: 'We code the application with Next.js and TypeScript, executing cross-browser and mobile device verification.',
      },
      {
        step: '04',
        title: 'Edge Deployment & Speed Auditing',
        description: 'We deploy to global edge infrastructure, verify Core Web Vitals, submit sitemaps, and provide training.',
      },
    ],
    realisticOutcomes: [
      'A reliable, modern web platform that passes Google Core Web Vitals assessments with green scores.',
      'Significant increase in user engagement duration and inquiry form completion rates.',
      'Zero maintenance headaches associated with bloated legacy CMS plugins and security vulnerabilities.',
    ],
    faqs: [
      {
        question: 'Why choose Next.js and custom code over WordPress or website builders?',
        answer: 'WordPress and visual page builders suffer from bloated plugins, slow load times, security vulnerabilities, and fragile maintenance. Next.js offers lightning-fast edge performance, superior SEO rendering, enterprise security, and complete flexibility without plugin fees.',
      },
      {
        question: 'How long does a typical custom website development project take?',
        answer: 'A comprehensive corporate website typically requires 3 to 6 weeks from initial design prototyping to production launch. Larger custom web applications with complex workflows require 6 to 10 weeks.',
      },
      {
        question: 'Can we manage and update page content easily after launch?',
        answer: 'Yes. We integrate user-friendly headless CMS solutions (such as Sanity, Strapi, or custom administrative dashboards) that allow non-technical team members to publish blogs, update services, and manage media effortlessly.',
      },
      {
        question: 'Is website maintenance and technical support included?',
        answer: 'Every project includes post-launch monitoring, warranty support, and performance verification. We also provide ongoing technical maintenance agreements covering feature additions and security reviews.',
      },
    ],
    relatedSlugs: ['mobile-app-development', 'seo', 'branding', 'ai-automation'],
    metaTitle: 'Website Development Services | Next.js & React Apps | EngineX Solutions',
    metaDescription: 'Custom, high-performance website development using Next.js and React. Fast loading, responsive, SEO-ready architecture engineered for Indian businesses by EngineX.',
    serviceType: 'Web Development',
  },
  {
    slug: 'mobile-app-development',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    image: '/images/services/mobile-app-development.jpg',
    shortDescription: 'High-performance native and cross-platform mobile applications for iOS and Android built with React Native and Flutter for intuitive user experiences.',
    detail: 'EngineX Solutions engineers robust, user-centric mobile applications that deliver smooth native performance across iOS and Android devices. Leveraging React Native and Flutter, we accelerate time-to-market while maintaining 60fps responsiveness, platform-specific UI patterns, and resilient offline capabilities. From consumer utilities to B2B enterprise field applications, we handle the entire product lifecycle from scoping to App Store deployment.',
    targetAudience: 'Enterprises seeking internal workflow mobility, startups launching consumer mobile products, and businesses digitizing customer loyalty.',
    deliverables: [
      'Product Architecture & Interactive Mobile Wireframes',
      'React Native / Flutter Cross-Platform Codebase',
      'Secure REST / GraphQL Backend API Integrations',
      'Push Notification Infrastructure (Firebase Cloud Messaging)',
      'Biometric Authentication, Offline Storage & Real-Time Sync',
      'End-to-End Google Play Store & Apple App Store Submission',
    ],
    features: [
      'iOS & Android Cross-Platform Codebase Efficiency',
      'Native Device Hardware Integration (Camera, GPS, Bluetooth)',
      'Smooth 60fps Micro-Interactions & Gesture Handlers',
      'Offline Caching & Automatic Cloud Data Synchronization',
      'Role-Based Authentication & End-to-End Data Encryption',
      'Automated Crash Reporting & Live Telemetry Monitoring',
    ],
    benefits: [
      {
        title: 'Cost-Effective Multi-Platform Reach',
        description: 'Build once and deploy simultaneously to both Apple App Store and Google Play Store, cutting development and maintenance expenses by up to 40%.',
      },
      {
        title: 'Native-Grade Responsiveness',
        description: 'Engineered with native modules and optimized memory management to ensure smooth navigation even on entry-level Android devices.',
      },
      {
        title: 'Seamless Backend Integration',
        description: 'Easily connects with your existing enterprise databases, payment gateways (Razorpay, Stripe), and cloud infrastructure.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Product Scoping & Feature Prioritization',
        description: 'We define the Minimum Viable Product (MVP), technical requirements, user flows, and third-party integrations.',
      },
      {
        step: '02',
        title: 'Mobile UI/UX Design',
        description: 'We design intuitive mobile experiences adhering strictly to Apple Human Interface Guidelines and Google Material Design.',
      },
      {
        step: '03',
        title: 'Agile Engineering & Real-Device QA',
        description: 'We build features iteratively, testing on physical devices across diverse screen resolutions and OS versions.',
      },
      {
        step: '04',
        title: 'Store Submission & Launch Support',
        description: 'We navigate Apple and Google review policies, handle signing certificates, and publish approved apps to the stores.',
      },
    ],
    realisticOutcomes: [
      'Successful approval and live release on Google Play Store and Apple App Store.',
      'Intuitive user adoption with minimal friction and sub-second interaction responses.',
      'Robust mobile infrastructure capable of scaling securely as active user counts grow.',
    ],
    faqs: [
      {
        question: 'Should our business choose React Native or native Swift/Kotlin?',
        answer: 'For 95% of commercial and business applications, React Native or Flutter provides identical user experience to native code at nearly half the development time and cost, with single-codebase maintenance across both iOS and Android.',
      },
      {
        question: 'How do you handle App Store and Play Store review rejections?',
        answer: 'Our engineering team understands App Store Review Guidelines intimately. We manage compliance checks, privacy disclosures, and safety policies to secure approval, and resolve any reviewer inquiries directly.',
      },
      {
        question: 'Can the app function without an active internet connection?',
        answer: 'Yes. We architect mobile applications with offline SQLite / WatermelonDB caching, enabling users to view data and queue actions that synchronize automatically once connectivity is restored.',
      },
      {
        question: 'How are post-launch updates and OS compatibility handled?',
        answer: 'We provide ongoing maintenance plans to ensure your application stays compatible with annual iOS and Android operating system upgrades and third-party API changes.',
      },
    ],
    relatedSlugs: ['website-development', 'ai-automation', 'branding', 'digital-marketing'],
    metaTitle: 'Mobile App Development Services | iOS & Android | EngineX Solutions',
    metaDescription: 'Native-grade iOS and Android mobile app development using React Native and Flutter. High performance, App Store submission, and secure scalable backends by EngineX.',
    serviceType: 'Mobile App Development',
  },
  {
    slug: 'video-production',
    icon: 'Video',
    title: 'Video Production & Editing',
    image: '/images/services/video-production.jpg',
    shortDescription: 'Cinematic corporate videos, customer case studies, product explainers, and high-retention social media reels engineered to drive audience engagement and commercial action.',
    detail: 'EngineX Solutions provides end-to-end video production and high-impact commercial video editing for businesses looking to tell their story compellingly. From scripting corporate brand narratives and filming professional customer testimonials to cutting dynamic social media reels and software product demos, we ensure your visual content retains viewer attention, communicates value clearly, and drives tangible viewer action.',
    targetAudience: 'B2B companies seeking professional corporate videos, startups launching products, and brands expanding social media video reach.',
    deliverables: [
      'Creative Scriptwriting, Storyboarding & Video Concept Development',
      'On-Location or Studio 4K Video Production & Professional Audio Capture',
      'High-Impact Video Editing, Color Grading & Sound Design',
      'Dynamic Motion Graphics, 2D Animation & Kinetic Typography',
      'Multi-Format Exports Optimized for YouTube, LinkedIn, Instagram & Web',
      'Subtitles, Captions & Video Thumbnail Package for Higher CTR',
    ],
    features: [
      'Cinematic 4K Corporate Brand Storytelling',
      'Software & Product Explainer Video Animation',
      'Client Case Study & Video Testimonial Production',
      'High-Retention Short-Form Reels & Shorts Editing',
      'Color Grading & Professional Sound Master Mixes',
      'Optimized Video Encoding for Instant Web Streaming',
    ],
    benefits: [
      {
        title: 'Maximum Audience Retention',
        description: 'Professionally paced edits, crisp sound design, and clear visual hooks keep viewers engaged through your core commercial message.',
      },
      {
        title: 'Elevated Corporate Credibility',
        description: 'Cinematic lighting, high-fidelity audio, and polished motion graphics set your organization apart from low-budget competitors.',
      },
      {
        title: 'Multi-Channel Asset Utilization',
        description: 'A single video shoot provides long-form website heroes, YouTube tutorials, LinkedIn thought pieces, and bite-sized social reels.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Concept & Scripting',
        description: 'We collaborate to clarify the core message, identify audience emotions, and script clear narrative arcs with visual cues.',
      },
      {
        step: '02',
        title: 'Production & Filming',
        description: 'We execute filming with high-definition cinema cameras, professional three-point lighting, and broadcast audio equipment.',
      },
      {
        step: '03',
        title: 'Post-Production & Sound Design',
        description: 'Our editors craft the rough cut, apply color grade, sync licensed soundtracks, and insert kinetic motion graphics.',
      },
      {
        step: '04',
        title: 'Review & Multi-Platform Delivery',
        description: 'We incorporate client feedback through collaborative review links and deliver finalized exports formatted for every platform.',
      },
    ],
    realisticOutcomes: [
      'Significantly higher conversion rates on landing pages embedding professional video introductions.',
      'Stronger organic engagement and shareability on LinkedIn and Instagram feeds.',
      'An enduring digital asset that can be used across sales pitches, presentations, and recruitment.',
    ],
    faqs: [
      {
        question: 'Can you edit footage that our team has already recorded?',
        answer: 'Yes. We offer professional post-production and editing services for client-provided raw footage, smartphone clips, webinar recordings, or screen recordings, elevating them with motion graphics, audio cleanup, and color grading.',
      },
      {
        question: 'How long does a typical corporate video take to produce?',
        answer: 'From initial script sign-off to final delivery, most corporate brand and explainer videos take between 2 to 4 weeks, depending on revision cycles and animation requirements.',
      },
      {
        question: 'Do you provide voiceovers and licensed background music?',
        answer: 'Yes. All video deliverables include fully licensed commercial background music and sound effects, along with professional multilingual voiceover options (English, Tamil, Hindi, and regional accents).',
      },
      {
        question: 'How do videos improve our website SEO performance?',
        answer: 'Engaging video content increases average time-on-page (dwell time), signals high quality to search engine algorithms, and generates video rich snippets in search results when accompanied by VideoObject schema.',
      },
    ],
    relatedSlugs: ['branding', 'social-media-marketing', 'digital-marketing', 'website-development'],
    metaTitle: 'Video Production & Video Editing Services | EngineX Solutions',
    metaDescription: 'Professional corporate video production, commercial video editing, product explainers, and high-retention social reels for Indian businesses by EngineX.',
    serviceType: 'Video Production Services',
  },
  {
    slug: 'branding',
    icon: 'Palette',
    title: 'Branding & Logo Design',
    image: '/images/services/branding.jpg',
    shortDescription: 'Memorable brand identity design, logo creation, typography systems, and creative visual guidelines that inspire trust and differentiate your business in competitive markets.',
    detail: 'EngineX Solutions crafts distinct, cohesive brand identities that resonate with your target market and command authority. Great branding extends far beyond a logo mark—it is the unified visual language, typography, color harmony, and messaging framework that shapes how prospects perceive your business value. We engineer timeless brand assets ready for physical collateral, web platforms, and digital campaigns.',
    targetAudience: 'New business ventures seeking an iconic identity, and established companies pursuing a modern rebrand to reflect expanded capabilities.',
    deliverables: [
      'Brand Discovery & Visual Competitive Positioning Matrix',
      'Primary, Secondary & Iconographic Vector Logo Marks (SVG, AI, PNG)',
      'Comprehensive Brand Style Guide (Typography, Color Palette, Spacing Rules)',
      'Corporate Identity Package (Business Cards, Letterhead, Email Signatures)',
      'Digital Asset Kit (Favicons, Social Media Banners, Slide Deck Templates)',
      'Complete Intellectual Property Transfer & Vector Source Files',
    ],
    features: [
      'Strategic Visual Identity Development',
      'Custom Typography Pairings & Hierarchy Guidelines',
      'Harmonious Color Palette Formulation (Pantone, CMYK, RGB, HEX)',
      'Iconography & Visual Component Design Systems',
      'Print-Ready & Digital-First Asset Engineering',
      'Trademark-Ready Original Logo Conceptualization',
    ],
    benefits: [
      {
        title: 'Instant Commercial Credibility',
        description: 'A polished, cohesive visual identity immediately signals professionalism, making prospects comfortable committing to higher-value engagements.',
      },
      {
        title: 'Seamless Design Consistency',
        description: 'A comprehensive brand style guide ensures every future website update, marketing flyer, or social post stays true to your visual standards.',
      },
      {
        title: 'Memorable Market Differentiation',
        description: 'Stand out distinctly from generic competitors who rely on stock templates and clip-art aesthetics.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Brand Discovery & Visual Direction',
        description: 'We explore your company values, target demographics, competitor landscapes, and curate collaborative mood boards.',
      },
      {
        step: '02',
        title: 'Concept Ideation & Sketching',
        description: 'Our senior designers explore multiple distinct conceptual avenues, presenting diverse creative directions with context.',
      },
      {
        step: '03',
        title: 'Refinement & Typography Pairing',
        description: 'We refine the chosen mark, test scalability from 16px favicons to billboard sizes, and balance typography and color values.',
      },
      {
        step: '04',
        title: 'Brand Book Delivery & Asset Handoff',
        description: 'We assemble the complete corporate brand guidelines document and export organized vector and web-ready asset packages.',
      },
    ],
    realisticOutcomes: [
      'A distinctive, professional brand identity that elevates perception across all client touchpoints.',
      'Clear visual rules eliminating internal confusion when creating presentations or marketing assets.',
      'Unrestricted ownership of all production source files with zero third-party licensing restrictions.',
    ],
    faqs: [
      {
        question: 'What is the difference between a logo design and a complete brand identity?',
        answer: 'A logo is a single graphical symbol representing your name. A full brand identity encompasses your color psychology, typography systems, imagery rules, iconography, stationery layouts, and usage guidelines that create a consistent customer experience.',
      },
      {
        question: 'Who owns the intellectual property of the final design assets?',
        answer: 'Upon project completion and final payment, 100% of the copyright and intellectual property rights are transferred to your business, along with all master vector source files (.AI, .EPS, .SVG, .PDF).',
      },
      {
        question: 'How many logo concepts and revisions are provided?',
        answer: 'We typically present 3 to 4 distinct conceptual directions during the initial review, followed by iterative refinement rounds on the chosen direction until every detail aligns with your vision.',
      },
      {
        question: 'Can you modernize our existing logo without completely changing it?',
        answer: 'Yes. We frequently execute brand refreshes—modernizing typography, cleaning up geometric proportions, and improving digital readability while preserving brand recognition.',
      },
    ],
    relatedSlugs: ['website-development', 'video-production', 'social-media-marketing', 'digital-marketing'],
    metaTitle: 'Branding & Logo Design Services | Corporate Identity | EngineX Solutions',
    metaDescription: 'Distinctive brand identity design, custom logo creation, typography systems, and brand guidelines for Indian businesses. Timeless creative design by EngineX.',
    serviceType: 'Brand Design Services',
  },
  {
    slug: 'ai-automation',
    icon: 'Brain',
    title: 'AI Automation & Custom Software',
    image: '/images/services/ai-automation.jpg',
    shortDescription: 'Custom AI agent integrations, intelligent workflow automation, and bespoke software solutions built to eliminate manual operational waste and accelerate enterprise scale.',
    detail: 'EngineX Solutions develops practical artificial intelligence integrations, automated workflow pipelines, and bespoke enterprise software systems. Rather than hyping theoretical concepts, we focus on high-ROI business applications: private retrieval-augmented generation (RAG) agents grounded in your proprietary documents, automated data extraction, CRM-ERP synchronization, and custom web backends that replace error-prone spreadsheets with secure, deterministic software.',
    targetAudience: 'Growing enterprises, manufacturing units, logistics firms, and service agencies looking to reduce operational friction and manual overhead.',
    deliverables: [
      'Technical Architecture Scoping & Feasibility Evaluation',
      'Private Knowledge Base AI Chatbot / Agent with RAG Architecture',
      'Automated Document Processing & OCR Data Extraction Pipelines',
      'API & Webhook Integrations Across CRM, ERP, and Communication Tools',
      'Custom Full-Stack Internal Web Tools, Portals & Admin Dashboards',
      'Production Deployment, Security Sandboxing & Maintenance SLA',
    ],
    features: [
      'Enterprise LLM Fine-Tuning & Secure Prompt Engineering',
      'Retrieval-Augmented Generation (RAG) Over Internal Documents',
      'End-to-End Business Process Automation (n8n, Python, Cloud Functions)',
      'Custom Relational Database Modeling (PostgreSQL, Prisma, Redis)',
      'Role-Based Access Control (RBAC) & Single Sign-On (SSO)',
      'Automated Audit Logging & Real-Time Exception Alerting',
    ],
    benefits: [
      {
        title: 'Significant Overhead Reduction',
        description: 'Automate repetitive cognitive tasks—such as invoice processing, customer inquiry triage, and data entry—freeing staff for high-value work.',
      },
      {
        title: 'Strict Proprietary Data Privacy',
        description: 'Deploy AI models with enterprise privacy guardrails, ensuring your proprietary company data is never used to train public models.',
      },
      {
        title: 'Tailored to Your Exact Workflows',
        description: 'Eliminate expensive recurring software seat licenses with custom internal tooling built specifically around your operations.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Process Discovery & Automation Audit',
        description: 'We map your repetitive workflows, document bottlenecks, measure hour investments, and identify the highest ROI automation targets.',
      },
      {
        step: '02',
        title: 'Architecture & Security Blueprinting',
        description: 'We design data schemas, choose foundation models or automation scripts, and establish data protection boundaries.',
      },
      {
        step: '03',
        title: 'Iterative Development & Sandboxing',
        description: 'We engineer custom pipelines, build user-friendly interfaces, and test rigorously with historical edge-case data.',
      },
      {
        step: '04',
        title: 'Deployment, Training & Telemetry',
        description: 'We roll out the system with staff training, exception monitoring, and ongoing optimization protocols.',
      },
    ],
    realisticOutcomes: [
      'Elimination of manual copy-paste workflows and substantial reduction in data entry errors.',
      'Rapid internal document retrieval and instant customer support response via verified AI agents.',
      'Enduring operational efficiency that scales smoothly without requiring linear headcount growth.',
    ],
    faqs: [
      {
        question: 'Will our company data remain confidential and secure when using AI?',
        answer: 'Yes. We strictly utilize enterprise-grade API agreements with zero-data-retention guarantees, or deploy private open-weight models on your own dedicated cloud infrastructure (AWS/GCP), ensuring your intellectual property is never shared or used for model training.',
      },
      {
        question: 'How do you prevent AI models from generating incorrect answers (hallucinations)?',
        answer: 'We implement Retrieval-Augmented Generation (RAG) with strict semantic guardrails and verification layers. The AI agent is restricted to quoting only verified internal documents and will cite exact sources or flag uncertainty rather than guessing.',
      },
      {
        question: 'Can you integrate AI automation with our existing CRM or ERP software?',
        answer: 'Yes. We build custom connectors and webhooks for popular platforms including Zoho, Salesforce, Tally, SAP, Google Workspace, and internal SQL databases.',
      },
      {
        question: 'What is the typical timeframe to deploy a custom AI automation workflow?',
        answer: 'A focused automation pipeline or internal document AI assistant typically takes 2 to 4 weeks to deploy in production. Larger custom enterprise software platforms require 6 to 12 weeks.',
      },
    ],
    relatedSlugs: ['website-development', 'mobile-app-development', 'digital-marketing', 'seo'],
    metaTitle: 'AI Automation & Custom Software Development | EngineX Solutions',
    metaDescription: 'Practical AI automation, private LLM agents, and custom enterprise software development for Indian businesses. Eliminate operational friction with EngineX.',
    serviceType: 'Artificial Intelligence & Software Engineering',
  },
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  // Support canonical slugs and legacy aliases seamlessly
  const slugAliases: Record<string, string> = {
    'web-development': 'website-development',
    'automation': 'ai-automation',
    'custom-software': 'ai-automation',
    'ai-ml-solutions': 'ai-automation',
    'ui-ux-design': 'branding',
    'cloud-solutions': 'website-development',
    'digital-transformation': 'digital-marketing',
  }
  const resolvedSlug = slugAliases[slug] || slug
  return servicesList.find((service) => service.slug === resolvedSlug)
}

export function getAllServiceSlugs(): string[] {
  return servicesList.map((service) => service.slug)
}
