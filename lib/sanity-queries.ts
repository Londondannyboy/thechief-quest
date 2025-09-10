import { client } from './sanity.client'

// ============================================
// LOCATION QUERIES
// ============================================

export async function getLocationBySlug(slug: string) {
  const locationSlug = slug.replace('chief-of-staff-', '')
  
  const query = `*[_type == "chiefOfStaff" && location == $locationSlug && !defined(industry)][0] {
    _id,
    metaTitle,
    metaDescription,
    pageTitle,
    content,
    tldr,
    location,
    region,
    salaryData {
      average,
      range,
      currency,
      jobCount,
      topEmployers,
      topIndustries
    }
  }`
  
  return await client.fetch(query, { locationSlug })
}

export async function getAllLocations() {
  const query = `*[_type == "chiefOfStaff" && defined(location) && !defined(industry)] | order(location asc) {
    _id,
    location,
    region,
    metaTitle,
    "slug": location,
    salaryData {
      average,
      jobCount
    }
  }`
  
  return await client.fetch(query)
}

// ============================================
// INDUSTRY QUERIES
// ============================================

export async function getIndustryBySlug(slug: string) {
  const query = `*[_type == "chiefOfStaff" && industry == $slug && !defined(location)][0] {
    _id,
    metaTitle,
    metaDescription,
    pageTitle,
    content,
    tldr,
    industry,
    salaryData {
      average,
      range,
      currency,
      jobCount,
      topEmployers,
      growthRate
    }
  }`
  
  return await client.fetch(query, { slug })
}

export async function getAllIndustries() {
  const query = `*[_type == "chiefOfStaff" && defined(industry) && !defined(location)] | order(industry asc) {
    _id,
    industry,
    metaTitle,
    "slug": industry,
    salaryData {
      average,
      jobCount,
      growthRate
    }
  }`
  
  return await client.fetch(query)
}

// ============================================
// LOCATION + INDUSTRY COMBO QUERIES
// ============================================

export async function getLocationIndustryCombo(location: string, industry: string) {
  const query = `*[_type == "chiefOfStaff" && location == $location && industry == $industry][0] {
    _id,
    metaTitle,
    metaDescription,
    pageTitle,
    content,
    tldr,
    location,
    industry,
    region,
    salaryData {
      average,
      range,
      currency,
      jobCount,
      topEmployers
    }
  }`
  
  return await client.fetch(query, { location, industry })
}

// ============================================
// ARTICLE/CONTENT QUERIES
// ============================================

export async function getArticleBySlug(slug: string) {
  // Try multiple strategies to find content
  
  // 1. Direct slug match
  let query = `*[_type == "chiefOfStaff" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    pageTitle,
    metaTitle,
    metaDescription,
    slug,
    content,
    tldr,
    publishedAt,
    author->{
      name,
      role
    }
  }`
  
  let content = await client.fetch(query, { slug })
  
  // 2. Try by title pattern match
  if (!content) {
    const searchPattern = slug.toLowerCase().replace(/-/g, '*')
    query = `*[_type == "chiefOfStaff" && (
      lower(metaTitle) match $searchPattern ||
      lower(pageTitle) match $searchPattern ||
      lower(title) match $searchPattern
    )][0] {
      _id,
      _type,
      title,
      pageTitle,
      metaTitle,
      metaDescription,
      slug,
      content,
      tldr,
      publishedAt,
      author->{
        name,
        role
      }
    }`
    
    content = await client.fetch(query, { searchPattern: `*${searchPattern}*` })
  }
  
  return content
}

// ============================================
// AGENCY QUERIES
// ============================================

export async function getAllAgencies() {
  const query = `*[_type == "recruitmentAgency"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    website,
    specializations,
    locations,
    size,
    rating
  }`
  
  return await client.fetch(query)
}

export async function getAgencyBySlug(slug: string) {
  const query = `*[_type == "recruitmentAgency" && slug.current == $slug][0] {
    _id,
    name,
    description,
    website,
    specializations,
    locations,
    size,
    rating,
    contact {
      email,
      phone,
      linkedin
    }
  }`
  
  return await client.fetch(query, { slug })
}

// ============================================
// JOB LISTING QUERIES
// ============================================

export async function getActiveJobs(limit: number = 10) {
  const query = `*[_type == "jobListing" && isActive == true] | order(postedDate desc) [0...$limit] {
    _id,
    title,
    company,
    location,
    industry,
    salaryRange,
    experienceLevel,
    postedDate,
    slug,
    shortDescription
  }`
  
  return await client.fetch(query, { limit })
}

export async function getJobBySlug(slug: string) {
  const query = `*[_type == "jobListing" && slug.current == $slug][0] {
    _id,
    title,
    company,
    location,
    industry,
    salaryRange,
    experienceLevel,
    postedDate,
    description,
    requirements,
    benefits,
    applicationUrl
  }`
  
  return await client.fetch(query, { slug })
}

// ============================================
// FAQ QUERIES
// ============================================

export async function getAllFAQs() {
  const query = `*[_type == "faqContent"] | order(order asc, question asc) {
    _id,
    question,
    answer,
    category,
    order
  }`
  
  return await client.fetch(query)
}

// ============================================
// FEATURED CONTENT QUERIES
// ============================================

export async function getFeaturedContent(sectionKey: string) {
  const query = `*[_type == "featuredContent" && sectionKey.current == $sectionKey && isActive == true][0] {
    _id,
    title,
    featuredItems[]->{
      _id,
      _type,
      title,
      pageTitle,
      metaTitle,
      slug,
      location,
      industry,
      name
    },
    displayType
  }`
  
  return await client.fetch(query, { sectionKey })
}

// ============================================
// STATS & AGGREGATIONS
// ============================================

export async function getSiteStats() {
  const queries = {
    totalJobs: `count(*[_type == "jobListing" && isActive == true])`,
    totalLocations: `count(*[_type == "chiefOfStaff" && defined(location) && !defined(industry)])`,
    totalIndustries: `count(*[_type == "chiefOfStaff" && defined(industry) && !defined(location)])`,
    totalAgencies: `count(*[_type == "recruitmentAgency"])`,
    avgSalaryUK: `*[_type == "chiefOfStaff" && region == "UK"][0].salaryData.average`
  }
  
  const stats = await Promise.all(
    Object.entries(queries).map(async ([key, query]) => ({
      [key]: await client.fetch(query)
    }))
  )
  
  return Object.assign({}, ...stats)
}