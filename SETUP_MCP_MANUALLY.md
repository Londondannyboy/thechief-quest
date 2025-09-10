# Manual MCP Setup Instructions

## You need to do these steps manually:

### Step 1: Install the MCP Server

Open Terminal and run:
```bash
npm install -g @sanity/mcp-server-sanity
```

If that fails with permissions, try:
```bash
sudo npm install -g @sanity/mcp-server-sanity
```

### Step 2: Find Claude Desktop Config Location

The config file needs to go in ONE of these locations:

**Option A: Check if Claude folder exists**
```bash
ls ~/Library/Application\ Support/Claude/
```

**Option B: If not, try:**
```bash
ls ~/Library/Application\ Support/claude/
```

**Option C: Create it:**
```bash
mkdir -p ~/Library/Application\ Support/Claude
```

### Step 3: Copy Your Config File

Your config file with the token is at:
`/Users/dankeegan/thechief-quest/claude_desktop_config.json`

Copy it to the Claude folder:
```bash
cp /Users/dankeegan/thechief-quest/claude_desktop_config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Step 4: Restart Claude Desktop

1. Completely quit Claude Desktop (Cmd+Q)
2. Reopen Claude Desktop
3. Start a new chat

### Step 5: Test the Connection

In Claude Desktop (NOT Claude Code), type:
```
"Can you check what MCP servers are available?"
```

Or:
```
"Can you list the content in my Sanity project?"
```

If it works, Claude will show you your Sanity content!

## If It Doesn't Work

### Check 1: Is MCP server installed?
```bash
which npx
ls ~/.npm-global/lib/node_modules/@sanity/
```

### Check 2: Is config in right place?
```bash
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Check 3: Token permissions
Make sure your token has "Editor" permissions in Sanity.

## Alternative: Without Global Install

If global install doesn't work, change your config to:

```json
{
  "mcpServers": {
    "sanity-thechief": {
      "command": "/Users/dankeegan/thechief-quest/node_modules/.bin/sanity-mcp",
      "args": [
        "--project-id", "al3tn61d",
        "--dataset", "production",
        "--token", "sk45nCDSXMq3d52MkdOpsPESU35guMMjWj1MiwM47iJrp75AHhmVSqJkgWHylCyolWlOqfx8uV7zIfhuR8TTtKVwjfWh48mhzjqhOxV23LiTEVNQf87qsfr247hGzMQY60jgfEmyDIF6dayoSjLPu9ybUKAHG5MWSUrmaOM56KvfYAcdu8P7"
      ]
    }
  }
}
```

Then install locally:
```bash
cd /Users/dankeegan/thechief-quest
npm install @sanity/mcp-server-sanity
```

## Success Indicators

When it's working, in Claude Desktop you can say things like:
- "Show me all Chief of Staff content"
- "Create a new location page for Rome"
- "Update the London page salary to £160,000"

And Claude will do it directly in Sanity!