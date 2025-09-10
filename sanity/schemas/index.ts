// Document schemas
import { chiefOfStaffSchema } from './documents/chiefOfStaff'
import { recruitmentAgencySchema } from './documents/recruitmentAgency'
import { jobListingSchema } from './documents/jobListing'
import { faqContentSchema } from './documents/faqContent'
import { authorSchema } from './documents/author'

// Object schemas
import { portableTextSchema } from './objects/portableText'
import { seoScoreSchema } from './objects/seoScore'

export const schemaTypes = [
  // Documents
  chiefOfStaffSchema,
  recruitmentAgencySchema,
  jobListingSchema,
  faqContentSchema,
  authorSchema,
  
  // Objects
  portableTextSchema,
  seoScoreSchema
]