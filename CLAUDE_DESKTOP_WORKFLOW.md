# Claude Desktop + Sanity MCP Workflow

## Setting Up MCP for Direct Publishing

### 1. Install Sanity MCP Server

First, install the Sanity MCP server globally:

```bash
npm install -g @sanity/mcp-server-sanity
```

### 2. Configure Claude Desktop

Add to your Claude Desktop configuration file:
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "sanity": {
      "command": "npx",
      "args": [
        "@sanity/mcp-server-sanity",
        "--project-id", "al3tn61d",
        "--dataset", "production",
        "--token", "YOUR_SANITY_TOKEN"
      ]
    }
  }
}
```

### 3. Get Your Sanity Token

1. Go to: https://sanity.io/manage/project/al3tn61d/api
2. Create a new token with "Editor" permissions
3. Name it "Claude Desktop MCP"
4. Copy the token (starts with `sk...`)
5. Replace YOUR_SANITY_TOKEN in config above

## Using Claude Desktop for Content Creation

Once configured, you can say things like:

```
"Create 10 new Chief of Staff location pages for European cities 
with full SEO content and publish them directly to Sanity"
```

Claude will:
1. Generate the content
2. Format it properly
3. Push directly to Sanity
4. No code/scripts needed!

## The Perfect Workflow

### Phase 1: Bulk Creation (Claude Desktop with MCP)
```
You: "Generate and publish 20 location pages for these cities: 
Paris, Berlin, Frankfurt, Amsterdam..."

Claude: [Creates and publishes directly to Sanity]
```

### Phase 2: Refinement (Sanity Studio)
- Go to https://thechief.quest/studio
- Add images from Unsplash
- Tweak SEO descriptions
- Fix any AI quirks

### Phase 3: Enhancement (Claude Code)
```
You: "Add a salary calculator to the site"
Claude: [Writes React components and deploys]
```

## Example MCP Commands for Claude Desktop

### Create Location Page
```
"Create a Chief of Staff location page for Paris with:
- Meta title under 70 chars
- Meta description under 200 chars
- 1000 words of content
- Salary data for the region
- Top employers
- Publish to Sanity"
```

### Create Blog Post
```
"Write and publish a blog post about 'How to become a 
Chief of Staff in Private Equity' with proper SEO optimization"
```

### Bulk Operations
```
"Create location×industry combination pages for:
- Paris + Private Equity
- Paris + Technology  
- Paris + Hedge Funds
And publish them all to Sanity"
```

## Adding Images

### Option 1: Manual in Studio
1. Go to https://thechief.quest/studio
2. Edit any content
3. Click image field
4. Upload from Unsplash (built-in)

### Option 2: Programmatic
```javascript
// In your seed scripts
const imageUrl = "https://source.unsplash.com/1600x900/?office,executive"
```

### Option 3: AI Generation (Not Recommended)
- Quality issues with people
- Better for abstract/charts
- Use DALL-E or Midjourney separately

## Benefits of This Workflow

1. **Speed**: Create 100 pages in minutes
2. **Direct**: No code compilation needed
3. **Clean**: Content goes straight to CMS
4. **Flexible**: Edit in Studio afterward
5. **Scalable**: Team can refine without coding

## Current Limitation

You're using Claude Code (this), not Claude Desktop. To switch:
1. Open Claude Desktop app
2. Configure MCP as shown above
3. Start creating content directly

Or continue with current workflow:
- Use Claude Code for development
- Run seed scripts for content
- Edit in Sanity Studio