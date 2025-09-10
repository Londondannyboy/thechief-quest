# Content Management Guide for TheChief.quest

## How Content Works in Your Setup

### 1. Sanity Studio (Your CMS)
Access at: http://localhost:3000/studio or https://thechief.quest/studio

**What you can do:**
- Browse and edit all content types:
  - Chief of Staff pages (locations, industries, combinations)
  - Job listings
  - FAQ entries
  - Recruitment agencies
- Create new content manually
- Preview content before publishing
- Set SEO metadata (title, description)

### 2. Current Content Flow

```
Sanity CMS → Next.js Pages → Live Website
```

1. **Content Creation:**
   - Via seed scripts (automated, bulk creation)
   - Via Sanity Studio (manual, one-by-one)

2. **Content Editing:**
   - Go to Sanity Studio
   - Find the content you want to edit
   - Make changes and publish
   - Changes appear immediately on the website

3. **Content Organization:**
   - Currently: All content is equal weight
   - Needed: Featured content system

## Current Issues to Fix

### Issue 1: Pages Not Using Sanity Content
- Location pages show hardcoded mock data
- Need to connect to actual Sanity content

### Issue 2: SEO URLs Missing Keywords
- Current: `/locations/london`
- Better: `/locations/chief-of-staff-london`
- Better: `/industries/private-equity-chief-of-staff`

### Issue 3: No Content Curation
- No way to feature specific articles
- No homepage content management
- No content ordering/priority

## How to Manage Content

### To Edit Existing Content:
1. Go to http://localhost:3000/studio
2. Click on "Chief of Staff" in the left menu
3. Find the page you want to edit (e.g., "London")
4. Edit the fields:
   - Meta Title (for SEO)
   - Meta Description (for SEO)
   - Page Title (displayed on page)
   - Content (main body text)
   - Salary Data
5. Click "Publish"

### To Create New Content:
1. Go to Sanity Studio
2. Click the "+" icon next to "Chief of Staff"
3. Fill in all required fields
4. Set the slug (URL-friendly name)
5. Click "Publish"

### To Add Featured Content (Not Yet Implemented):
We need to add:
- A "featured" boolean field to content
- A "priority" number field for ordering
- Homepage sections for featured content

## Content Types in Sanity

1. **Chief of Staff Pages**
   - Location-based (London, Dubai, etc.)
   - Industry-based (Private Equity, Tech, etc.)
   - Combination pages (London + Private Equity)

2. **Job Listings**
   - Individual job posts
   - Company, location, salary, requirements

3. **FAQ Content**
   - Questions and answers
   - Categories for organization

4. **Recruitment Agencies**
   - Agency profiles
   - Specializations and locations

## Next Steps for Better Content Management

1. **Fix Sanity Integration** - Make pages actually use CMS content
2. **Add Featured Content System** - Allow marking content as featured
3. **Create Content Dashboard** - Overview of all content in Sanity
4. **Add Publishing Workflow** - Draft → Review → Published states
5. **Implement Content Scheduling** - Publish content at specific times

## Quick Commands

```bash
# Access Sanity Studio locally
npm run dev
# Then visit: http://localhost:3000/studio

# Access Sanity Studio in production
# Visit: https://thechief.quest/studio

# Generate new content via scripts
npm run seed

# Check what content exists
# Use Sanity Studio's content browser
```

## FAQ

**Q: How do I know if my edits are live?**
A: Changes publish immediately. Refresh the page to see updates.

**Q: Can I bulk edit content?**
A: Not through the Studio UI. Use scripts for bulk operations.

**Q: How do I delete content?**
A: In Sanity Studio, open the content and click the three dots menu → Delete.

**Q: Can I preview before publishing?**
A: Yes, Sanity Studio has a preview pane showing how content will look.

**Q: How do I add images?**
A: In the content editor, use the image field to upload and select images.