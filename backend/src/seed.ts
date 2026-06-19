import prisma from './utils/prisma'
import bcrypt from 'bcryptjs'

async function seed() {
  const hashedPassword = await bcrypt.hash('admin123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@enginex.solutions' },
    update: {},
    create: {
      email: 'admin@enginex.solutions',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  const services = [
    { title: 'Web Development', description: 'Custom websites and web applications built with modern frameworks and best practices.', icon: 'Globe', features: ['Responsive Design', 'Full-Stack Development', 'CMS Integration', 'E-Commerce Solutions', 'Performance Optimization', 'API Development'] },
    { title: 'Mobile App Development', description: 'Native and cross-platform mobile applications for iOS and Android.', icon: 'Smartphone', features: ['iOS & Android', 'Cross-Platform (React Native/Flutter)', 'UI/UX Design', 'App Store Deployment', 'Push Notifications', 'Real-Time Features'] },
    { title: 'AI Solutions', description: 'Intelligent AI-powered solutions including LLMs, computer vision, and predictive analytics.', icon: 'Brain', features: ['Custom AI Models', 'LLM Integration', 'Computer Vision', 'Predictive Analytics', 'Natural Language Processing', 'AI Chatbots'] },
    { title: 'UI/UX Design', description: 'User-centered design that combines aesthetics with functionality for exceptional experiences.', icon: 'Palette', features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Design Systems', 'Usability Testing'] },
    { title: 'Custom Software Development', description: 'Tailored software solutions built to address your unique business challenges.', icon: 'Code', features: ['Requirements Analysis', 'Architecture Design', 'Agile Development', 'Quality Assurance', 'Deployment', 'Maintenance'] },
    { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and DevOps solutions for modern applications.', icon: 'Cloud', features: ['AWS/Azure/GCP', 'Microservices', 'Containerization', 'CI/CD Pipelines', 'Auto Scaling', 'Monitoring'] },
    { title: 'Automation Systems', description: 'Streamline operations with intelligent automation and workflow optimization.', icon: 'Zap', features: ['Process Automation', 'Workflow Design', 'RPA Solutions', 'Integration APIs', 'Data Pipelines', 'Reporting Dashboards'] },
    { title: 'Digital Transformation', description: 'End-to-end digital transformation services to modernize your business.', icon: 'RefreshCw', features: ['Digital Strategy', 'Legacy Modernization', 'Change Management', 'Tech Stack Optimization', 'Digital Marketing', 'Analytics'] },
  ]

  for (let i = 0; i < services.length; i++) {
    await prisma.service.upsert({
      where: { slug: services[i].title.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        title: services[i].title,
        slug: services[i].title.toLowerCase().replace(/\s+/g, '-'),
        description: services[i].description,
        icon: services[i].icon,
        features: services[i].features,
        order: i + 1,
      },
    })
  }

  const settings = [
    { key: 'company_name', value: 'EngineX.solution' },
    { key: 'company_tagline', value: 'Transforming Ideas into Intelligent Digital Solutions' },
    { key: 'company_email', value: 'hello@enginex.solutions' },
    { key: 'company_phone', value: '+1 (555) 123-4567' },
    { key: 'company_address', value: '123 Innovation Drive, Silicon Valley, CA' },
    { key: 'social_twitter', value: 'https://twitter.com/enginex' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/enginex' },
    { key: 'social_github', value: 'https://github.com/enginex' },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('Seed completed successfully')
  console.log(`Admin login: admin@enginex.solutions / admin123`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
