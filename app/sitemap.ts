import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity.client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thechief.quest'
  
  // Fetch all content from Sanity
  const query = `{
    "chiefOfStaff": *[_type == "chiefOfStaff"] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "agencies": *[_type == "recruitmentAgency"] {
      "slug": slug.current,
      "lastModified": _updatedAt
    },
    "faqs": *[_type == "faqContent"] {
      "slug": slug.current,
      "lastModified": _updatedAt
    }
  }`
  
  const data = await client.fetch(query)
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agencies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/salary-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
  
  // Dynamic location and industry pages from Sanity
  const chiefOfStaffPages: MetadataRoute.Sitemap = data.chiefOfStaff.map((item: any) => {
    // Determine if it's a location or industry page based on slug pattern
    const isLocation = item.slug.includes('chief-of-staff-') && !item.slug.includes('private-equity') && !item.slug.includes('hedge-fund') && !item.slug.includes('venture-capital') && !item.slug.includes('startup') && !item.slug.includes('utilities') && !item.slug.includes('telecoms')
    const baseRoute = isLocation ? '/locations' : '/industries'
    const cleanSlug = item.slug.replace('chief-of-staff-', '')
    
    return {
      url: `${baseUrl}${baseRoute}/${cleanSlug}`,
      lastModified: new Date(item.lastModified),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })
  
  // Agency pages
  const agencyPages: MetadataRoute.Sitemap = data.agencies.map((item: any) => ({
    url: `${baseUrl}/agencies/${item.slug}`,
    lastModified: new Date(item.lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  // FAQ pages
  const faqPages: MetadataRoute.Sitemap = data.faqs.map((item: any) => ({
    url: `${baseUrl}/faq/${item.slug}`,
    lastModified: new Date(item.lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...chiefOfStaffPages, ...agencyPages, ...faqPages]
}