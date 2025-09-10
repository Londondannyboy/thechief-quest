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

// Location and industry combinations for content generation
const locations = [
  { id: 'london', name: 'London', country: 'UK', region: 'uk' },
  { id: 'manchester', name: 'Manchester', country: 'UK', region: 'uk' },
  { id: 'edinburgh', name: 'Edinburgh', country: 'UK', region: 'uk' },
  { id: 'dubai', name: 'Dubai', country: 'UAE', region: 'middle-east' },
  { id: 'zurich', name: 'Zurich', country: 'Switzerland', region: 'europe' },
  { id: 'geneva', name: 'Geneva', country: 'Switzerland', region: 'europe' },
]

const industries = [
  { id: 'private-equity', name: 'Private Equity' },
  { id: 'hedge-fund', name: 'Hedge Fund' },
  { id: 'venture-capital', name: 'Venture Capital' },
  { id: 'startup', name: 'Startup' },
]

async function createAuthor() {
  const author = {
    _type: 'author',
    name: 'TheChief Editorial Team',
    slug: { current: 'editorial-team' },
    bio: 'Expert team providing insights on Chief of Staff careers across UK, Europe, and Middle East.',
    credentials: 'Combined 50+ years in executive search and Chief of Staff roles',
  }

  try {
    const result = await client.create(author)
    console.log('✅ Author created:', result._id)
    return result._id
  } catch (error) {
    console.log('Author might already exist, fetching...')
    const existing = await client.fetch(`*[_type == "author" && slug.current == "editorial-team"][0]`)
    return existing?._id
  }
}

async function createChiefOfStaffContent(authorId: string) {
  const contentPromises = []

  // Create location-specific content
  for (const location of locations) {
    const content = {
      _type: 'chiefOfStaff',
      metaTitle: `Chief of Staff ${location.name} - Jobs & Salaries | TheChief`,
      slug: { current: `chief-of-staff-${location.id}` },
      metaDescription: `Find Chief of Staff jobs in ${location.name}, ${location.country}. Average salary data, top employers, and career insights for Chief of Staff roles.`,
      pageTitle: `Chief of Staff Jobs in ${location.name}, ${location.country}`,
      tldr: `Chief of Staff roles in ${location.name} offer competitive salaries and strategic career opportunities`,
      question: `What are Chief of Staff opportunities in ${location.name}?`,
      location: location.id,
      region: location.region,
      salaryData: {
        min: location.id === 'london' ? 100000 : 80000,
        max: location.id === 'london' ? 200000 : 150000,
        average: location.id === 'london' ? 150000 : 115000,
        currency: location.region === 'uk' ? 'GBP' : location.region === 'europe' ? 'CHF' : 'AED',
        lastUpdated: new Date().toISOString().split('T')[0],
        dataSource: 'Market research 2024',
      },
      author: { _type: 'reference', _ref: authorId },
      publishedAt: new Date().toISOString(),
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: `The Chief of Staff role in ${location.name} represents one of the most strategic positions in modern business. Working directly with C-suite executives, Chief of Staff professionals in ${location.name} drive critical initiatives and organizational transformation.`,
            },
          ],
        },
      ],
    }

    contentPromises.push(
      client.create(content).then((result) => {
        console.log(`✅ Created content for ${location.name}:`, result._id)
      }).catch((error) => {
        console.error(`❌ Error creating content for ${location.name}:`, error.message)
      })
    )
  }

  // Create industry-specific content
  for (const industry of industries) {
    const content = {
      _type: 'chiefOfStaff',
      metaTitle: `Chief of Staff ${industry.name} - Career Guide | TheChief`,
      slug: { current: `chief-of-staff-${industry.id}` },
      metaDescription: `Chief of Staff roles in ${industry.name}. Salary insights, required skills, and career progression in the ${industry.name} industry.`,
      pageTitle: `Chief of Staff in ${industry.name}`,
      tldr: `${industry.name} Chief of Staff roles offer strategic leadership opportunities`,
      question: `How to become a Chief of Staff in ${industry.name}?`,
      industry: industry.id,
      region: 'uk', // Default to UK
      salaryData: {
        min: 120000,
        max: 250000,
        average: 180000,
        currency: 'GBP',
        lastUpdated: new Date().toISOString().split('T')[0],
        dataSource: 'Industry survey 2024',
      },
      author: { _type: 'reference', _ref: authorId },
      publishedAt: new Date().toISOString(),
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: `The ${industry.name} industry offers exceptional Chief of Staff opportunities for professionals seeking to work at the intersection of strategy and execution.`,
            },
          ],
        },
      ],
    }

    contentPromises.push(
      client.create(content).then((result) => {
        console.log(`✅ Created content for ${industry.name}:`, result._id)
      }).catch((error) => {
        console.error(`❌ Error creating content for ${industry.name}:`, error.message)
      })
    )
  }

  await Promise.all(contentPromises)
}

async function createFAQs(authorId: string) {
  const faqs = [
    {
      question: 'What does a Chief of Staff do?',
      shortAnswer: 'A Chief of Staff acts as a strategic partner to C-suite executives, managing critical initiatives and driving organizational alignment.',
      category: 'general',
    },
    {
      question: 'What is the average Chief of Staff salary in the UK?',
      shortAnswer: 'Chief of Staff salaries in the UK range from £80,000 to £200,000, with an average of £130,000 depending on location and industry.',
      category: 'salary',
    },
    {
      question: 'How do I become a Chief of Staff?',
      shortAnswer: 'Most Chief of Staff roles require 5-10 years experience in consulting, banking, or operations, plus strong strategic and communication skills.',
      category: 'career',
    },
    {
      question: 'What skills do Chief of Staff roles require?',
      shortAnswer: 'Key skills include strategic thinking, project management, stakeholder management, data analysis, and exceptional communication abilities.',
      category: 'skills',
    },
  ]

  for (const faq of faqs) {
    const content = {
      _type: 'faqContent',
      question: faq.question,
      slug: { current: faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '') },
      shortAnswer: faq.shortAnswer,
      detailedAnswer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: faq.shortAnswer + ' This role has become increasingly important in modern organizations as businesses navigate complex challenges and rapid change.',
            },
          ],
        },
      ],
      category: faq.category,
      keywords: ['chief of staff', 'executive', 'career', 'salary'],
      helpful: 0,
      notHelpful: 0,
    }

    try {
      const result = await client.create(content)
      console.log(`✅ Created FAQ: ${faq.question.substring(0, 30)}...`)
    } catch (error) {
      console.error(`❌ Error creating FAQ:`, error)
    }
  }
}

async function seedContent() {
  console.log('🚀 Starting content seeding...')
  
  // Check if we have the required environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your_project_id_here') {
    console.error('❌ Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
    console.log('\n📝 To get your Sanity project ID:')
    console.log('1. Go to https://sanity.io and sign in')
    console.log('2. Create a new project or select existing')
    console.log('3. Go to project settings to find your project ID')
    console.log('4. Update .env.local with your credentials')
    return
  }

  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN === 'your_api_token_here') {
    console.error('❌ Please set SANITY_API_TOKEN in .env.local')
    console.log('\n📝 To create a Sanity API token:')
    console.log('1. Go to your Sanity project dashboard')
    console.log('2. Navigate to Settings → API → Tokens')
    console.log('3. Create a new token with Editor permissions')
    console.log('4. Update .env.local with the token')
    return
  }

  try {
    // Create author first
    const authorId = await createAuthor()
    
    if (!authorId) {
      console.error('❌ Failed to create or find author')
      return
    }

    // Create content
    await createChiefOfStaffContent(authorId)
    await createFAQs(authorId)
    
    console.log('\n✅ Content seeding completed!')
    console.log('📌 Next steps:')
    console.log('1. Run "npm run dev" to start the development server')
    console.log('2. Visit http://localhost:3000/studio to manage content')
    console.log('3. Check the homepage to see your content')
  } catch (error) {
    console.error('❌ Error seeding content:', error)
  }
}

// Run the seeding
seedContent()