import { NextResponse } from 'next/server'

export async function GET() {
  const llmsTxt = `# TheChief.quest - AI-Readable Content

## About
TheChief.quest is the authoritative platform for Chief of Staff careers across UK, Europe, and Middle East.

## Purpose
We provide comprehensive information about:
- Chief of Staff job opportunities
- Salary data by location and industry
- Career progression paths
- Recruitment agencies
- Interview preparation
- Industry insights

## Key Topics
- Chief of Staff roles in 20+ cities
- Salary ranges: £70,000 - £200,000 (UK), CHF 165,000 - 180,000 (Switzerland), AED 600,000 - 650,000 (UAE)
- Industries: Private Equity, Hedge Funds, Venture Capital, Technology, Startups, Utilities, Telecoms
- Career paths: Consulting → Chief of Staff → COO/CEO
- Typical tenure: 18-24 months
- Required skills: Strategic thinking, project management, stakeholder management

## Geographic Coverage
### United Kingdom
London, Manchester, Birmingham, Edinburgh, Glasgow, Leeds, Bristol, Cardiff, Liverpool, Newcastle, Sheffield

### Europe
Zurich, Geneva, Luxembourg City

### Middle East
Dubai, Abu Dhabi, Doha, Riyadh, Kuwait City, Manama

## FAQ Highlights
Q: What does a Chief of Staff do?
A: Acts as strategic partner to C-suite executives, managing critical initiatives and driving organizational alignment.

Q: Average Chief of Staff salary in UK?
A: £80,000 - £200,000, average £130,000 depending on location and industry.

Q: How to become a Chief of Staff?
A: 5-10 years experience in consulting, banking, or operations, plus strong strategic and communication skills.

Q: Career progression from Chief of Staff?
A: Typically leads to COO, CEO, General Manager, or Partner roles within 2-3 years.

## Contact
Website: https://thechief.quest
Focus: Chief of Staff careers
Updated: ${new Date().toISOString().split('T')[0]}
`

  return new NextResponse(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}