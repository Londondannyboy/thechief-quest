# Sanity Setup Checklist for TheChief.quest

## ✅ Completed
- [x] Sanity project created
- [x] Project ID added to Vercel
- [x] Dataset configured (production)
- [x] API token added to Vercel
- [x] Vercel deployment successful

## 📋 Required: Configure CORS Origins in Sanity

You MUST add these URLs to Sanity CORS origins for the app to work:

1. **Go to**: https://www.sanity.io/manage
2. **Select your project** (TheChief.quest)
3. **Navigate to**: Settings → API → CORS Origins
4. **Add these origins** (click "Add CORS origin" for each):
   - `http://localhost:3000` (for local development)
   - `https://thechief-quest-git-main-londondannyboys-projects.vercel.app` (your Vercel URL)
   - `https://thechief-quest.vercel.app` (if you have this subdomain)
   - `https://thechief.quest` (when you add custom domain)

5. **For each origin, set**:
   - ✅ Allow credentials
   - ✅ No restricted paths (leave blank)

## 🚀 Your Deployment URLs

- **Production**: https://thechief-quest-git-main-londondannyboys-projects.vercel.app
- **Sanity Studio**: https://thechief-quest-git-main-londondannyboys-projects.vercel.app/studio

## 🔧 Test Your Setup

1. **Visit your site**: https://thechief-quest-git-main-londondannyboys-projects.vercel.app
   - Should show the homepage without errors

2. **Visit Sanity Studio**: https://thechief-quest-git-main-londondannyboys-projects.vercel.app/studio
   - Should load Sanity Studio interface
   - You'll need to log in with your Sanity account

## 📝 Next Steps

1. **Seed initial content** (once CORS is configured):
   ```bash
   npm run seed
   ```

2. **Create content in Sanity Studio**:
   - Authors
   - Chief of Staff content pages
   - FAQ entries
   - Job listings

3. **Custom domain** (optional):
   - Add `thechief.quest` in Vercel domains
   - Update DNS records as instructed by Vercel

## 🐛 Troubleshooting

### "Failed to fetch" errors
- Check CORS origins are configured in Sanity
- Verify environment variables in Vercel

### Studio won't load
- Check NEXT_PUBLIC_SANITY_PROJECT_ID is set
- Verify you're logged into Sanity

### No content showing
- Run `npm run seed` locally to create initial content
- Check Sanity Studio for published content