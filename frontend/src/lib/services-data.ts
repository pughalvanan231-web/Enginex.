export interface ServiceItem {
  slug: string
  icon: string
  title: string
  shortDescription: string
  detail: string
  features: string[]
  benefits: { title: string; description: string }[]
  process: { step: string; title: string; description: string }[]
  relatedSlugs: string[]
  metaTitle: string
  metaDescription: string
  serviceType: string
}

export const servicesList: ServiceItem[] = [
  {
    slug: 'web-development',
    icon: 'Globe',
    title: 'Web Development Services',
    shortDescription: 'High-converting, lightning-fast websites and web applications built with modern frameworks that drive engagement and revenue.',
    detail: 'We engineer high-performance web applications using cutting-edge technologies like Next.js, React, TypeScript, and Node.js. From conversion-focused landing pages to complex enterprise platforms, we deliver fast, secure, and SEO-optimized digital experiences tailored to your business goals.',
    features: [
      'Responsive & Mobile-First Design',
      'Full-Stack Web Development',
      'CMS & Headless CMS Integration',
      'E-Commerce & Payment Solutions',
      'Core Web Vitals & Speed Optimization',
      'REST & GraphQL API Development',
    ],
    benefits: [
      {
        title: 'Blazing Fast Performance',
        description: 'Built on Next.js with server-side rendering, static generation, and edge caching for sub-second page loads that maximize user engagement.',
      },
      {
        title: 'Conversion & SEO Centric',
        description: 'Clean HTML5 semantic structure, structured data schema markup, and responsive layouts engineered to turn search traffic into qualified leads.',
      },
      {
        title: 'Scalable Architecture',
        description: 'Modular codebases, automated CI/CD pipelines, and robust cloud infrastructure designed to scale effortlessly with your growing user base.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Architecture',
        description: 'We analyze your business requirements, define user personas, map user journeys, and select the optimal modern tech stack.',
      },
      {
        step: '02',
        title: 'UI/UX Design & Prototyping',
        description: 'Our design team creates responsive wireframes, high-fidelity prototypes, and design systems for client review and feedback.',
      },
      {
        step: '03',
        title: 'Agile Engineering & QA',
        description: 'We develop features in iterative sprints with automated testing, rigorous cross-browser verification, and code reviews.',
      },
      {
        step: '04',
        title: 'Launch & Performance Tuning',
        description: 'We deploy to production on Vercel or cloud infrastructure with edge caching, analytics, and ongoing performance monitoring.',
      },
    ],
    relatedSlugs: ['ui-ux-design', 'custom-software', 'cloud-solutions', 'automation'],
    metaTitle: 'Web Development Services | Next.js & Full-Stack Apps | EngineX Solutions',
    metaDescription: 'Custom high-performance websites and web applications built with Next.js, React, and Node.js. Fast, responsive, scalable web solutions by EngineX Solutions.',
    serviceType: 'Web Development',
  },
  {
    slug: 'mobile-app-development',
    icon: 'Smartphone',
    title: 'Mobile App Development Services',
    shortDescription: 'Native and cross-platform apps that deliver exceptional user experiences and measurable business outcomes on iOS and Android.',
    detail: 'Our mobile engineering team crafts intuitive, high-performance applications that delight users across iOS and Android. Combining cross-platform efficiency with native device capabilities, we deliver seamless mobile experiences that drive engagement and retention.',
    features: [
      'iOS & Android App Development',
      'Cross-Platform (React Native & Flutter)',
      'Mobile UI/UX Design & Human Interface Guidelines',
      'App Store & Google Play Deployment',
      'Push Notifications & In-App Messaging',
      'Offline Support & Real-Time Sync',
    ],
    benefits: [
      {
        title: 'Native-Grade Performance',
        description: 'Smooth 60fps animations, optimized memory footprints, and instant responsiveness across all supported device screen sizes.',
      },
      {
        title: 'Single Codebase Efficiency',
        description: 'Save development time and budget with React Native and Flutter without sacrificing platform-specific look, feel, or functionality.',
      },
      {
        title: 'Resilient Cloud Backends',
        description: 'Secure API integrations, cloud-synced databases, biometric authentication, and scalable background synchronization.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Product Scoping & Strategy',
        description: 'Defining app capabilities, user flows, platform requirements, and technical specifications for iOS and Android.',
      },
      {
        step: '02',
        title: 'Mobile UI/UX Design',
        description: 'Crafting intuitive mobile interfaces adhering to Apple Human Interface and Google Material Design guidelines.',
      },
      {
        step: '03',
        title: 'Development & Device Testing',
        description: 'Building features with cross-platform frameworks and rigorous testing on real physical devices and simulators.',
      },
      {
        step: '04',
        title: 'App Store Submission & Growth',
        description: 'Managing end-to-end App Store and Play Store review approvals, crash analytics setup, and ongoing updates.',
      },
    ],
    relatedSlugs: ['web-development', 'ui-ux-design', 'custom-software', 'ai-ml-solutions'],
    metaTitle: 'Mobile App Development Services | iOS & Android | EngineX Solutions',
    metaDescription: 'Native and cross-platform mobile apps for iOS and Android using React Native and Flutter. Fast, scalable mobile solutions by EngineX Solutions.',
    serviceType: 'Mobile App Development',
  },
  {
    slug: 'ai-ml-solutions',
    icon: 'Brain',
    title: 'AI Solutions & Machine Learning',
    shortDescription: 'Intelligent automation, predictive analytics, and custom AI solutions that reduce costs and unlock new revenue streams.',
    detail: 'We help businesses harness the power of artificial intelligence. From fine-tuned LLM agents and intelligent workflows to predictive analytics and computer vision, we build systems that drive real business value, automation, and data-backed decision making.',
    features: [
      'Custom AI & Machine Learning Models',
      'LLM & Generative AI Integration',
      'Computer Vision & Document Processing',
      'Predictive Analytics & Forecasting',
      'Natural Language Processing (NLP)',
      'Intelligent AI Chatbots & Customer Agents',
    ],
    benefits: [
      {
        title: 'Operational Cost Reduction',
        description: 'Automate complex, manual cognitive tasks and eliminate errors across support, data processing, and analysis operations.',
      },
      {
        title: 'Actionable Predictive Insights',
        description: 'Transform raw business data into predictive forecasts that inform smarter strategic and marketing decisions.',
      },
      {
        title: 'Custom Enterprise RAG Systems',
        description: 'Deploy private retrieval-augmented generation agents securely grounded in your proprietary enterprise knowledge base.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'AI Feasibility & Data Audit',
        description: 'Assessing your data infrastructure, privacy constraints, and identifying high-impact AI automation opportunities.',
      },
      {
        step: '02',
        title: 'Architecture & Model Selection',
        description: 'Selecting state-of-the-art open source or proprietary foundation models and designing the data pipeline architecture.',
      },
      {
        step: '03',
        title: 'Fine-Tuning & Integration',
        description: 'Engineering prompt chains, vector embeddings, fine-tuning, and integrating AI endpoints into your existing software stack.',
      },
      {
        step: '04',
        title: 'Production Guardrails & Monitoring',
        description: 'Implementing latency caching, safety guardrails, hallucination checks, and real-time observability.',
      },
    ],
    relatedSlugs: ['automation', 'custom-software', 'cloud-solutions', 'web-development'],
    metaTitle: 'AI Solutions & Machine Learning Services | EngineX Solutions',
    metaDescription: 'Enterprise AI solutions, custom LLM integrations, predictive analytics, and computer vision. Intelligent AI systems by EngineX Solutions.',
    serviceType: 'Artificial Intelligence Consulting',
  },
  {
    slug: 'ui-ux-design',
    icon: 'Palette',
    title: 'UI/UX Design & Digital Branding',
    shortDescription: 'User-centered design that combines aesthetics with functionality to create memorable brand experiences.',
    detail: 'Great design is about more than aesthetics — it is about creating intuitive, engaging journeys that solve real user problems. Our design team follows a research-driven methodology to craft interfaces that inspire trust, captivate users, and drive conversions.',
    features: [
      'User Research & Persona Development',
      'Information Architecture & Wireframing',
      'Interactive Figma Prototyping',
      'Visual Design & Brand Identity',
      'Design Systems & Component Libraries',
      'Usability Testing & Conversion Optimization',
    ],
    benefits: [
      {
        title: 'Higher Conversion Rates',
        description: 'Frictionless user flows engineered to guide visitors smoothly toward conversion and goal completion.',
      },
      {
        title: 'Accelerated Development Velocity',
        description: 'Standardized design tokens and reusable components that allow engineering teams to build features 2x faster.',
      },
      {
        title: 'User-Tested Validation',
        description: 'Data-backed design decisions derived from user feedback, accessibility audits, and heuristic evaluations.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'User Research & Discovery',
        description: 'Investigating customer pain points, competitor landscapes, and establishing brand aesthetic direction.',
      },
      {
        step: '02',
        title: 'Wireframing & Information Architecture',
        description: 'Mapping out user journeys, site maps, and low-fidelity structural layouts focused on clarity and utility.',
      },
      {
        step: '03',
        title: 'High-Fidelity Visual Design',
        description: 'Developing polished visual screens, micro-interactions, responsive states, and complete design systems in Figma.',
      },
      {
        step: '04',
        title: 'Interactive Testing & Handoff',
        description: 'Validating prototypes with real users, finalizing design tokens, and providing structured handoff to engineering.',
      },
    ],
    relatedSlugs: ['web-development', 'mobile-app-development', 'custom-software', 'digital-transformation'],
    metaTitle: 'UI/UX Design & Digital Branding Services | EngineX Solutions',
    metaDescription: 'User-centric UI/UX design, design systems, wireframing, and interactive prototyping. Intuitive, memorable digital products by EngineX Solutions.',
    serviceType: 'UI/UX Design',
  },
  {
    slug: 'custom-software',
    icon: 'Code',
    title: 'Custom Software Development',
    shortDescription: 'Tailored software solutions built for your unique business challenges and growth objectives.',
    detail: 'Off-the-shelf software rarely fits distinct operational workflows. We build custom software solutions engineered specifically for your business challenges, giving you an enduring competitive edge, complete data ownership, and seamless operational flow.',
    features: [
      'Requirements Analysis & Technical Scoping',
      'Enterprise Software Architecture',
      'Agile Full-Stack Software Development',
      'Legacy Software Modernization',
      'Automated Quality Assurance & Security Audits',
      'Long-Term Maintenance & SLA Support',
    ],
    benefits: [
      {
        title: 'Tailored to Your Operations',
        description: 'Software that matches your exact workflows, eliminating recurring subscription bloat and manual spreadsheets.',
      },
      {
        title: 'Complete IP Ownership',
        description: 'You own 100% of the code, data, and intellectual property with zero vendor lock-in or recurring seat fees.',
      },
      {
        title: 'Enterprise-Grade Security',
        description: 'Robust authentication, role-based access control, encrypted databases, and adherence to security best practices.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Technical Requirements Scoping',
        description: 'Deep-dive sessions to document workflows, data structures, integration requirements, and security compliance.',
      },
      {
        step: '02',
        title: 'System & Database Architecture',
        description: 'Designing scalable database models, API schemas, microservices, and fail-safe cloud infrastructure.',
      },
      {
        step: '03',
        title: 'Iterative Agile Development',
        description: 'Building software in two-week sprints with transparent progress demos, continuous testing, and client reviews.',
      },
      {
        step: '04',
        title: 'Testing, Deployment & Handoff',
        description: 'End-to-end integration testing, data migration, user acceptance testing, and seamless production deployment.',
      },
    ],
    relatedSlugs: ['cloud-solutions', 'automation', 'web-development', 'ai-ml-solutions'],
    metaTitle: 'Custom Software Development Services | EngineX Solutions',
    metaDescription: 'Tailored enterprise software solutions, internal tools, and bespoke applications built for your unique workflows by EngineX Solutions.',
    serviceType: 'Software Development',
  },
  {
    slug: 'cloud-solutions',
    icon: 'Cloud',
    title: 'Cloud Infrastructure & DevOps Solutions',
    shortDescription: 'Scalable cloud infrastructure and DevOps for modern, resilient applications.',
    detail: 'We design, migrate, and manage resilient cloud architectures that scale smoothly with your user base. From containerization to automated CI/CD pipelines, we ensure your infrastructure is secure, performant, and cost-optimized across AWS, Azure, and Google Cloud.',
    features: [
      'AWS, Azure & Google Cloud Architecture',
      'Docker & Kubernetes Containerization',
      'Automated CI/CD Deployment Pipelines',
      'Infrastructure as Code (Terraform)',
      'Auto-Scaling & Load Balancing',
      'Cloud Cost Optimization & Telemetry Monitoring',
    ],
    benefits: [
      {
        title: 'High Availability & 99.9% Uptime',
        description: 'Fault-tolerant, multi-region architectures that ensure your critical services remain available under heavy load.',
      },
      {
        title: 'Optimized Cloud Spend',
        description: 'Eliminate waste with automated scaling, rightsized compute resources, and intelligent caching strategies.',
      },
      {
        title: 'Rapid Deployment Velocity',
        description: 'Deploy code updates safely in minutes with automated testing and blue-green or canary release strategies.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Cloud Audit & Planning',
        description: 'Auditing existing infrastructure, identifying security vulnerabilities, bottlenecks, and establishing a cloud migration plan.',
      },
      {
        step: '02',
        title: 'Infrastructure as Code Blueprinting',
        description: 'Defining reproducible infrastructure with Terraform, configuring virtual networks, IAM policies, and VPCs.',
      },
      {
        step: '03',
        title: 'CI/CD & Container Orchestration',
        description: 'Containerizing applications with Docker, provisioning Kubernetes/serverless runners, and automating pipelines.',
      },
      {
        step: '04',
        title: 'Observability & SLA Monitoring',
        description: 'Setting up centralized logging, metric dashboards, automated alerts, and continuous security scanning.',
      },
    ],
    relatedSlugs: ['custom-software', 'web-development', 'automation', 'digital-transformation'],
    metaTitle: 'Cloud Infrastructure & DevOps Solutions | EngineX Solutions',
    metaDescription: 'Scalable cloud infrastructure, AWS/Azure/GCP setup, Kubernetes, CI/CD pipelines, and 24/7 cloud reliability by EngineX Solutions.',
    serviceType: 'Cloud Computing Services',
  },
  {
    slug: 'automation',
    icon: 'Zap',
    title: 'Intelligent Automation Systems',
    shortDescription: 'Streamline operations with intelligent automation and optimized workflows.',
    detail: 'Eliminate repetitive manual processes and boost organizational efficiency with custom automation solutions. We design intelligent workflows and system integrations that save hundreds of hours, reduce human error, and accelerate productivity across your teams.',
    features: [
      'End-to-End Business Process Automation',
      'Custom Workflow Design & Trigger Systems',
      'Robotic Process Automation (RPA)',
      'API & Webhook Integrations',
      'Automated Data Pipelines & ETL',
      'Real-Time Operational Dashboards',
    ],
    benefits: [
      {
        title: 'Hundreds of Hours Saved',
        description: 'Free your team from tedious data entry, document routing, and sync tasks to focus on high-value business initiatives.',
      },
      {
        title: 'Error-Free Operations',
        description: 'Eliminate human copy-paste errors with deterministic, automated validation rules and error-handling pipelines.',
      },
      {
        title: 'Unified Tool Ecosystem',
        description: 'Seamlessly connect your CRM, accounting software, communications, and database into a unified real-time workflow.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Process Discovery & Mapping',
        description: 'Documenting repetitive operations, measuring time investments, and mapping end-to-end integration points.',
      },
      {
        step: '02',
        title: 'Workflow Architecture',
        description: 'Designing trigger events, conditional logic, error-recovery protocols, and secure API credential storage.',
      },
      {
        step: '03',
        title: 'Development & Sandbox Testing',
        description: 'Building custom scripts, webhooks, and automation pipelines with comprehensive sandbox data validation.',
      },
      {
        step: '04',
        title: 'Production Launch & Auditing',
        description: 'Deploying live automations with real-time exception alerting, audit logs, and ongoing throughput optimization.',
      },
    ],
    relatedSlugs: ['ai-ml-solutions', 'custom-software', 'cloud-solutions', 'web-development'],
    metaTitle: 'Workflow & Business Automation Systems | EngineX Solutions',
    metaDescription: 'Eliminate manual tasks with intelligent workflow automation, API integrations, and RPA solutions engineered by EngineX Solutions.',
    serviceType: 'Business Process Automation',
  },
  {
    slug: 'digital-transformation',
    icon: 'RefreshCw',
    title: 'Digital Transformation Strategy',
    shortDescription: 'End-to-end digital transformation to modernize your business and drive efficiency.',
    detail: 'Transform your legacy operations into modern, agile digital powerhouses. We guide enterprises through every phase of their technology transformation journey — from strategic roadmaps to system modernization, cloud enablement, and change management.',
    features: [
      'Digital Maturity Assessment & Strategy',
      'Legacy Modernization & Code Refactoring',
      'Modern Tech Stack Adoption',
      'Cloud & Architecture Migration',
      'Data Strategy & Analytics Enablement',
      'Team Training & Change Management',
    ],
    benefits: [
      {
        title: 'Future-Proof Infrastructure',
        description: 'Retire fragile technical debt and replace outdated legacy systems with clean, modular, and maintainable stacks.',
      },
      {
        title: 'Accelerated Time to Market',
        description: 'Empower your teams to launch new digital features and products in days rather than quarters.',
      },
      {
        title: 'Comprehensive Guidance',
        description: 'Strategic advisory paired with hands-on senior engineering execution from discovery to post-launch governance.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Maturity Audit & Roadmapping',
        description: 'Evaluating current legacy systems, organizational bottlenecks, and producing a prioritized digital roadmap.',
      },
      {
        step: '02',
        title: 'Target Architecture Design',
        description: 'Designing the modern technology target state with clear decoupling, data migration paths, and risk mitigations.',
      },
      {
        step: '03',
        title: 'Phased Migration & Modernization',
        description: 'Executing modernization iteratively without disrupting ongoing day-to-day business operations.',
      },
      {
        step: '04',
        title: 'Enablement & Continuous Evolution',
        description: 'Training internal stakeholders, establishing development best practices, and ongoing technical advisory.',
      },
    ],
    relatedSlugs: ['custom-software', 'cloud-solutions', 'web-development', 'automation'],
    metaTitle: 'Digital Transformation & Tech Modernization | EngineX Solutions',
    metaDescription: 'End-to-end digital transformation consulting, legacy software modernization, and technology stack optimization by EngineX Solutions.',
    serviceType: 'Digital Transformation Consulting',
  },
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesList.find((service) => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return servicesList.map((service) => service.slug)
}
