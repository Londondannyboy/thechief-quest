// Sanity Document Types

export interface SalaryData {
  average?: string
  range?: string
  currency?: string
  jobCount?: number
  topEmployers?: string[]
  topIndustries?: string[]
  growthRate?: string
}

export interface LocationContent {
  _id: string
  location: string
  slug: string
  region?: string
  metaTitle?: string
  metaDescription?: string
  pageTitle?: string
  content?: string
  tldr?: string
  salaryData?: SalaryData
}

export interface IndustryContent {
  _id: string
  industry: string
  slug: string
  metaTitle?: string
  metaDescription?: string
  pageTitle?: string
  content?: string
  tldr?: string
  salaryData?: SalaryData
}

export interface ArticleContent {
  _id: string
  _type: string
  title?: string
  pageTitle?: string
  metaTitle?: string
  metaDescription?: string
  slug?: {
    current: string
  }
  content?: string | any[]
  tldr?: string
  publishedAt?: string
  author?: {
    name: string
    role?: string
  }
}

export interface RecruitmentAgency {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  website?: string
  specializations?: string[]
  locations?: string[]
  size?: string
  rating?: number
  contact?: {
    email?: string
    phone?: string
    linkedin?: string
  }
}

export interface JobListing {
  _id: string
  title: string
  company: string
  location: string
  industry?: string
  salaryRange?: string
  experienceLevel?: string
  postedDate: string
  slug: {
    current: string
  }
  shortDescription?: string
  description?: string
  requirements?: string[]
  benefits?: string[]
  applicationUrl?: string
  isActive: boolean
}

export interface FAQContent {
  _id: string
  question: string
  answer: string
  category?: string
  order?: number
}