# Claude Desktop MCP Setup for TheChief.quest

## How MCP Connection Works

### The Magic of MCP
Once configured, Claude Desktop has a **persistent connection** to your Sanity project. You configure it ONCE, and then:
- ✅ No need to mention Sanity in every command
- ✅ No need to specify project ID repeatedly  
- ✅ Claude "knows" where to publish
- ✅ Can create 1 or 100 articles in one go

## Step-by-Step Setup

### 1. Find Your Config File

**On Mac:**
```bash
open ~/Library/Application\ Support/Claude/
```
Look for `claude_desktop_config.json`

**On Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

### 2. Get Your Sanity Token

1. Go to: https://sanity.io/manage/project/al3tn61d/api
2. Click "Add API token"
3. Name: "Claude Desktop MCP"
4. Permissions: "Editor"
5. Click "Add Token"
6. **COPY THE TOKEN** (starts with `sk...`) - you only see it once!

### 3. Configure Claude Desktop

Edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sanity-thechief": {
      "command": "npx",
      "args": [
        "@sanity/mcp-server-sanity",
        "--project-id", "al3tn61d",
        "--dataset", "production",
        "--token", "YOUR_TOKEN_HERE"
      ]
    }
  }
}
```

Replace `YOUR_TOKEN_HERE` with the token from step 2.

### 4. Restart Claude Desktop

Completely quit and restart Claude Desktop for the config to load.

## How It Works After Setup

### The Connection is Implicit!

Once configured, the MCP connection is **always there**. Claude Desktop:
- Knows your project ID (`al3tn61d`)
- Has authentication (your token)
- Can read/write directly to Sanity

### You Can Say Natural Things Like:

```
"Create 5 Chief of Staff location pages for German cities"
```

Claude will:
1. Generate the content
2. Format it correctly
3. Publish to your Sanity project
4. Confirm what was created

### No Need to Say:
- ❌ "Publish to Sanity project al3tn61d"
- ❌ "Use my Sanity token"
- ❌ "Connect to production dataset"

All that is handled by the MCP configuration!

## Examples of Bulk Creation

### Example 1: Multiple Location Pages
```
You: "Create Chief of Staff location pages for these cities:
- Berlin, Germany
- Munich, Germany  
- Hamburg, Germany
- Vienna, Austria
- Prague, Czech Republic

Each should have unique content, salary data, and SEO optimization."

Claude: [Creates and publishes all 5 directly]
```

### Example 2: Location × Industry Matrix
```
You: "Create all combinations of:
Cities: Paris, Berlin, Madrid
Industries: FinTech, CleanTech, HealthTech

That's 9 pages total. Generate and publish them."

Claude: [Creates all 9 combination pages]
```

### Example 3: Blog Content
```
You: "Create and publish 10 blog posts about Chief of Staff topics:
- Career progression tips
- Salary negotiation 
- Day in the life
- Required skills
etc."

Claude: [Generates all 10 and publishes]
```

## What Claude Desktop Can See/Do

With MCP configured, Claude can:

### ✅ CAN DO:
- List all existing content
- Create new documents
- Update existing documents
- Delete documents
- Query your content
- Bulk operations
- Check what's published

### ❌ CANNOT DO:
- Upload images (use Studio)
- Change schema (use Claude Code)
- Deploy website (use Claude Code)
- Access your files (use Claude Code)

## The Complete Workflow

### 1. Content Creation (Claude Desktop)
```
"Create 50 new location pages for European cities"
```
- Direct to Sanity
- No code needed
- Instant publishing

### 2. Development (Claude Code) 
```
"Add a salary calculator to the website"
```
- File system access
- Code changes
- Git commits

### 3. Refinement (Sanity Studio)
```
https://thechief.quest/studio
```
- Add images
- Tweak content
- Review SEO

## Testing Your Connection

After setup, in Claude Desktop try:

```
"Can you list the Chief of Staff content in my Sanity project?"
```

If configured correctly, Claude will:
- Connect via MCP
- Query your content
- Show you what's there

## Troubleshooting

### If Connection Fails:
1. Check token is correct
2. Ensure project ID is `al3tn61d`
3. Restart Claude Desktop
4. Check token permissions (needs Editor)

### To Verify Setup:
In Claude Desktop, ask:
```
"What MCP tools do you have available?"
```

You should see Sanity tools listed.

## Security Note

Your token in the config file:
- Is stored locally on your computer
- Never leaves your machine
- Only Claude Desktop can use it
- Keep the config file private

## Why This is Powerful

Imagine saying:
```
"Review the top 20 Chief of Staff job listings on Indeed UK,
then create location pages for any cities we don't have yet,
with accurate salary data and employer information."
```

Claude Desktop would:
1. Research the job market
2. Identify missing cities
3. Generate appropriate content
4. Publish everything to Sanity
5. All in one conversation!

This is the power of MCP - Claude becomes your content team!