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

async function seedContent() {
  console.log('🚀 Starting content seeding...')
  
  try {
    // Create author
    const author = await client.create({
      _type: 'author',
      name: 'TheChief Editorial Team',
      slug: { current: 'editorial-team' },
      bio: 'Expert team providing insights on Chief of Staff careers.',
      credentials: 'Combined 50+ years in executive search'
    })
    console.log('✅ Author created:', author._id)

    // Create a sample Chief of Staff content for London
    const londonContent = await client.create({
      _type: 'chiefOfStaff',
      metaTitle: 'Chief of Staff London - Jobs & Salaries | TheChief',
      slug: { current: 'chief-of-staff-london' },
      metaDescription: 'Find Chief of Staff jobs in London, UK. Average salary £150,000. Top employers and career insights.',
      pageTitle: 'Chief of Staff Jobs in London',
      tldr: 'London offers 200+ Chief of Staff roles with average salary of £150,000',
      question: 'What are Chief of Staff opportunities in London?',
      location: 'london',
      region: 'uk',
      salaryData: {
        min: 100000,
        max: 200000,
        average: 150000,
        currency: 'GBP',
        lastUpdated: new Date().toISOString().split('T')[0],
        dataSource: 'Market research 2024',
      },
      author: { _type: 'reference', _ref: author._id },
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
              text: 'London is the premier destination for Chief of Staff roles in Europe.',
            },
          ],
          markDefs: []
        },
      ],
    })
    console.log('✅ London content created:', londonContent._id)

    // Create a sample FAQ
    const faq = await client.create({
      _type: 'faqContent',
      question: 'What does a Chief of Staff do?',
      slug: { current: 'what-does-chief-of-staff-do' },
      shortAnswer: 'A Chief of Staff acts as a strategic partner to C-suite executives, managing critical initiatives.',
      detailedAnswer: [
        {
          _type: 'block',
          style: 'normal',
          _key: 'faqblock1',
          children: [
            {
              _type: 'span',
              _key: 'faqspan1',
              text: 'A Chief of Staff is a senior executive who works closely with the CEO or other C-suite executives.',
            },
          ],
          markDefs: []
        },
      ],
      category: 'general',
      keywords: ['chief of staff', 'executive', 'career'],
      helpful: 0,
      notHelpful: 0,
    })
    console.log('✅ FAQ created:', faq._id)

    console.log('\n✅ Initial content seeded successfully!')
    console.log('📌 Visit your site to see the content')
    console.log('📌 Access Sanity Studio at: /studio')
    
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', error.response.body)
    }
  }
}

seedContent()