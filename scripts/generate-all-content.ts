import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Complete list of all locations
const locations = [
  // UK Cities
  { id: 'london', name: 'London', country: 'UK', region: 'uk', avgSalary: 150000, currency: 'GBP' },
  { id: 'manchester', name: 'Manchester', country: 'UK', region: 'uk', avgSalary: 95000, currency: 'GBP' },
  { id: 'birmingham', name: 'Birmingham', country: 'UK', region: 'uk', avgSalary: 85000, currency: 'GBP' },
  { id: 'edinburgh', name: 'Edinburgh', country: 'UK', region: 'uk', avgSalary: 90000, currency: 'GBP' },
  { id: 'glasgow', name: 'Glasgow', country: 'UK', region: 'uk', avgSalary: 85000, currency: 'GBP' },
  { id: 'leeds', name: 'Leeds', country: 'UK', region: 'uk', avgSalary: 80000, currency: 'GBP' },
  { id: 'bristol', name: 'Bristol', country: 'UK', region: 'uk', avgSalary: 85000, currency: 'GBP' },
  { id: 'cardiff', name: 'Cardiff', country: 'UK', region: 'uk', avgSalary: 75000, currency: 'GBP' },
  { id: 'liverpool', name: 'Liverpool', country: 'UK', region: 'uk', avgSalary: 75000, currency: 'GBP' },
  { id: 'newcastle', name: 'Newcastle', country: 'UK', region: 'uk', avgSalary: 70000, currency: 'GBP' },
  { id: 'sheffield', name: 'Sheffield', country: 'UK', region: 'uk', avgSalary: 70000, currency: 'GBP' },
  // Europe
  { id: 'zurich', name: 'Zurich', country: 'Switzerland', region: 'europe', avgSalary: 180000, currency: 'CHF' },
  { id: 'geneva', name: 'Geneva', country: 'Switzerland', region: 'europe', avgSalary: 165000, currency: 'CHF' },
  { id: 'luxembourg', name: 'Luxembourg City', country: 'Luxembourg', region: 'europe', avgSalary: 140000, currency: 'EUR' },
  // Middle East
  { id: 'dubai', name: 'Dubai', country: 'UAE', region: 'middle-east', avgSalary: 600000, currency: 'AED' },
  { id: 'abu-dhabi', name: 'Abu Dhabi', country: 'UAE', region: 'middle-east', avgSalary: 650000, currency: 'AED' },
  { id: 'doha', name: 'Doha', country: 'Qatar', region: 'middle-east', avgSalary: 550000, currency: 'QAR' },
  { id: 'riyadh', name: 'Riyadh', country: 'Saudi Arabia', region: 'middle-east', avgSalary: 500000, currency: 'SAR' },
  { id: 'kuwait-city', name: 'Kuwait City', country: 'Kuwait', region: 'middle-east', avgSalary: 45000, currency: 'KWD' },
  { id: 'manama', name: 'Manama', country: 'Bahrain', region: 'middle-east', avgSalary: 50000, currency: 'BHD' },
]

const industries = [
  { id: 'private-equity', name: 'Private Equity', salaryMultiplier: 1.3 },
  { id: 'hedge-fund', name: 'Hedge Fund', salaryMultiplier: 1.25 },
  { id: 'venture-capital', name: 'Venture Capital', salaryMultiplier: 1.1 },
  { id: 'startup', name: 'Startup', salaryMultiplier: 0.9 },
  { id: 'utilities', name: 'Utilities', salaryMultiplier: 0.95 },
  { id: 'telecoms', name: 'Telecoms', salaryMultiplier: 1.0 },
]

const recruitmentAgencies = [
  {
    name: 'Knightsbridge Recruitment',
    description: 'Leading executive search firm specializing in Chief of Staff placements across EMEA.',
    specializations: ['chief-of-staff', 'executive-assistant', 'c-suite'],
    website: 'https://www.knightsbridgerecruitment.com',
    rating: 4.8,
  },
  {
    name: 'Chief of Staff Network',
    description: 'Specialist recruiter focused exclusively on Chief of Staff and strategic leadership roles.',
    specializations: ['chief-of-staff', 'board-advisory'],
    website: 'https://www.chiefofstaffnetwork.com',
    rating: 4.6,
  },
  {
    name: 'Executive Appointments',
    description: 'Boutique search firm for C-suite and Chief of Staff positions in financial services.',
    specializations: ['chief-of-staff', 'c-suite', 'interim'],
    website: 'https://www.executiveappointments.com',
    rating: 4.5,
  },
]

const faqs = [
  {
    question: 'What is the typical career path to Chief of Staff?',
    shortAnswer: 'Most Chiefs of Staff come from consulting (40%), investment banking (25%), or internal operations (20%) backgrounds.',
    category: 'career',
  },
  {
    question: 'How long do Chief of Staff roles typically last?',
    shortAnswer: 'Chief of Staff positions typically last 18-24 months before transitioning to senior executive roles.',
    category: 'career',
  },
  {
    question: 'What is the difference between Chief of Staff and Executive Assistant?',
    shortAnswer: 'Chief of Staff is a strategic role managing initiatives, while Executive Assistant focuses on administrative support.',
    category: 'general',
  },
  {
    question: 'Do I need an MBA to become a Chief of Staff?',
    shortAnswer: 'While 60% of Chiefs of Staff have MBAs, it\'s not required. Relevant experience and skills are equally valued.',
    category: 'career',
  },
  {
    question: 'What industries pay the highest Chief of Staff salaries?',
    shortAnswer: 'Private Equity, Hedge Funds, and Technology typically offer the highest Chief of Staff compensation packages.',
    category: 'salary',
  },
]

async function getOrCreateAuthor() {
  const existing = await client.fetch(`*[_type == "author" && slug.current == "editorial-team"][0]`)
  if (existing) return existing._id
  
  const author = await client.create({
    _type: 'author',
    name: 'TheChief Editorial Team',
    slug: { current: 'editorial-team' },
    bio: 'Expert team providing insights on Chief of Staff careers.',
    credentials: 'Combined 50+ years in executive search'
  })
  return author._id
}

async function generateAllContent() {
  console.log('🚀 Starting comprehensive content generation...')
  
  const authorId = await getOrCreateAuthor()
  let created = 0
  let skipped = 0

  // Generate location pages
  console.log('\n📍 Generating location pages...')
  for (const location of locations) {
    const slug = `chief-of-staff-${location.id}`
    const existing = await client.fetch(`*[_type == "chiefOfStaff" && slug.current == $slug][0]`, { slug })
    
    if (existing) {
      console.log(`⏭️  Skipping ${location.name} (exists)`)
      skipped++
      continue
    }

    await client.create({
      _type: 'chiefOfStaff',
      metaTitle: `Chief of Staff ${location.name} - Jobs & Salaries | TheChief`,
      slug: { current: slug },
      metaDescription: `Chief of Staff jobs in ${location.name}, ${location.country}. Average salary ${location.currency} ${location.avgSalary.toLocaleString()}. Top employers and career insights.`,
      pageTitle: `Chief of Staff Jobs in ${location.name}`,
      tldr: `${location.name} offers Chief of Staff roles with average salary of ${location.currency} ${location.avgSalary.toLocaleString()}`,
      question: `What are Chief of Staff opportunities in ${location.name}?`,
      location: location.id,
      region: location.region,
      salaryData: {
        min: Math.round(location.avgSalary * 0.7),
        max: Math.round(location.avgSalary * 1.4),
        average: location.avgSalary,
        currency: location.currency,
        lastUpdated: new Date().toISOString().split('T')[0],
        dataSource: 'Market research 2024',
      },
      author: { _type: 'reference', _ref: authorId },
      publishedAt: new Date().toISOString(),
      content: [
        {
          _type: 'block',
          style: 'normal',
          _key: 'block1',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: `${location.name} is a key market for Chief of Staff positions in ${location.region === 'uk' ? 'the UK' : location.region === 'europe' ? 'Europe' : 'the Middle East'}. The city offers diverse opportunities across multiple industries with competitive compensation packages.`,
            },
          ],
          markDefs: []
        },
      ],
    })
    console.log(`✅ Created: ${location.name}`)
    created++
  }

  // Generate location × industry combination pages
  console.log('\n🏢 Generating location × industry combinations...')
  for (const location of locations.slice(0, 5)) { // Top 5 locations only for MVP
    for (const industry of industries) {
      const slug = `chief-of-staff-${location.id}-${industry.id}`
      const existing = await client.fetch(`*[_type == "chiefOfStaff" && slug.current == $slug][0]`, { slug })
      
      if (existing) {
        console.log(`⏭️  Skipping ${location.name} × ${industry.name} (exists)`)
        skipped++
        continue
      }

      const adjustedSalary = Math.round(location.avgSalary * industry.salaryMultiplier)
      
      await client.create({
        _type: 'chiefOfStaff',
        metaTitle: `${industry.name} Chief of Staff ${location.name} | TheChief`,
        slug: { current: slug },
        metaDescription: `Chief of Staff roles in ${industry.name} sector in ${location.name}. Salary range ${location.currency} ${adjustedSalary.toLocaleString()}.`,
        pageTitle: `${industry.name} Chief of Staff - ${location.name}`,
        tldr: `${industry.name} Chief of Staff in ${location.name}: ${location.currency} ${adjustedSalary.toLocaleString()} average`,
        question: `What are ${industry.name} Chief of Staff roles in ${location.name}?`,
        location: location.id,
        industry: industry.id,
        region: location.region,
        salaryData: {
          min: Math.round(adjustedSalary * 0.8),
          max: Math.round(adjustedSalary * 1.3),
          average: adjustedSalary,
          currency: location.currency,
          lastUpdated: new Date().toISOString().split('T')[0],
          dataSource: 'Industry analysis 2024',
        },
        author: { _type: 'reference', _ref: authorId },
        publishedAt: new Date().toISOString(),
        content: [
          {
            _type: 'block',
            style: 'normal',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: `The ${industry.name} sector in ${location.name} offers specialized Chief of Staff opportunities with unique challenges and rewards.`,
              },
            ],
            markDefs: []
          },
        ],
      })
      console.log(`✅ Created: ${location.name} × ${industry.name}`)
      created++
    }
  }

  // Generate recruitment agency profiles
  console.log('\n🏢 Generating recruitment agency profiles...')
  for (const agency of recruitmentAgencies) {
    const slug = agency.name.toLowerCase().replace(/\s+/g, '-')
    const existing = await client.fetch(`*[_type == "recruitmentAgency" && slug.current == $slug][0]`, { slug })
    
    if (existing) {
      console.log(`⏭️  Skipping ${agency.name} (exists)`)
      skipped++
      continue
    }

    await client.create({
      _type: 'recruitmentAgency',
      name: agency.name,
      slug: { current: slug },
      description: agency.description,
      specializations: agency.specializations,
      industries: ['private-equity', 'hedge-funds', 'technology'],
      locations: [
        { city: 'London', email: 'london@example.com' },
        { city: 'Dubai', email: 'dubai@example.com' },
      ],
      rating: agency.rating,
      reviewCount: Math.floor(Math.random() * 100) + 20,
      website: agency.website,
      verified: true,
    })
    console.log(`✅ Created agency: ${agency.name}`)
    created++
  }

  // Generate additional FAQs
  console.log('\n❓ Generating FAQ content...')
  for (const faq of faqs) {
    const slug = faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')
    const existing = await client.fetch(`*[_type == "faqContent" && slug.current == $slug][0]`, { slug })
    
    if (existing) {
      console.log(`⏭️  Skipping FAQ: ${faq.question.substring(0, 30)}... (exists)`)
      skipped++
      continue
    }

    await client.create({
      _type: 'faqContent',
      question: faq.question,
      slug: { current: slug },
      shortAnswer: faq.shortAnswer,
      detailedAnswer: [
        {
          _type: 'block',
          style: 'normal',
          _key: 'block1',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: faq.shortAnswer + ' Understanding this is crucial for career planning in the Chief of Staff field.',
            },
          ],
          markDefs: []
        },
      ],
      category: faq.category,
      keywords: ['chief of staff', 'career', 'executive'],
      helpful: 0,
      notHelpful: 0,
    })
    console.log(`✅ Created FAQ: ${faq.question.substring(0, 30)}...`)
    created++
  }

  console.log('\n📊 Content Generation Summary:')
  console.log(`✅ Created: ${created} items`)
  console.log(`⏭️  Skipped: ${skipped} items (already exist)`)
  console.log(`📝 Total content items: ${created + skipped}`)
  console.log('\n🎉 Content generation complete!')
}

generateAllContent().catch(console.error)