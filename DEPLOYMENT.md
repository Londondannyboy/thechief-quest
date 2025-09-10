# Deployment Instructions for TheChief.quest

## 📋 Prerequisites
- GitHub account
- Vercel account
- Sanity project created

## 🚀 Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com/new)
2. Create a new repository:
   - Repository name: `thechief-quest`
   - Description: "The authority on Chief of Staff careers across UK, Europe & Middle East"
   - Set to **Public** (or Private if you prefer)
   - Don't initialize with README (we already have one)
   
3. After creating, run these commands in your terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/thechief-quest.git
git branch -M main
git push -u origin main
```

## 🔗 Step 2: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your `thechief-quest` repository
4. Configure the project:
   - Framework Preset: **Next.js**
   - Root Directory: **./** (leave as default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

## 🔐 Step 3: Add Environment Variables in Vercel

In the Vercel project settings, add these environment variables:

### Required Variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

### Optional Variables (add as you get them):
```
OPENAI_API_KEY=your_openai_key
FIRECRAWL_API_KEY=your_firecrawl_key
NEXT_PUBLIC_GA_ID=your_ga_id
SENTRY_DSN=your_sentry_dsn
```

## 🔄 Step 4: Enable Auto-deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## 🌐 Step 5: Configure Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add `thechief.quest`
3. Follow Vercel's instructions to update your DNS settings

## 📝 Step 6: Post-Deployment

Once deployed, you need to:

1. **Add Vercel URL to Sanity CORS Origins**:
   - Go to sanity.io → Your Project → Settings → API → CORS Origins
   - Add your Vercel URLs:
     - `https://your-project.vercel.app`
     - `https://thechief.quest` (if custom domain)
     - `http://localhost:3000` (for local development)

2. **Test the deployment**:
   - Visit your Vercel URL
   - Check `/studio` route for Sanity Studio access
   - Verify environment variables are working

## 🎯 Quick Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added in Vercel
- [ ] Deployment successful
- [ ] Sanity CORS origins updated
- [ ] Site accessible and working

## 🆘 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure all dependencies are in package.json
- Check build logs in Vercel dashboard

### Sanity Connection Issues
- Verify SANITY_PROJECT_ID is correct
- Check API token has correct permissions
- Ensure CORS origins are configured

### 404 Errors
- Clear Vercel cache (Settings → Functions → Purge Cache)
- Redeploy from Vercel dashboard

## 📚 Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Sanity CORS Setup](https://www.sanity.io/docs/cors)