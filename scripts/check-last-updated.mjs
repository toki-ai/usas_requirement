import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const updatedFile = 'src/plan/updated.ts'
const base = process.argv[2]

if (base && /^0+$/.test(base)) {
  console.log('No base commit to compare, skipping.')
  process.exit(0)
}

function fail(message) {
  console.error(message)
  console.error('Update src/plan/updated.ts in this change: at is YYYY-MM-DD HH:mm in UTC+7, by is the GitHub username.')
  process.exit(1)
}

const diffRange = base ? `${base} HEAD` : 'HEAD'
const listed = execSync(`git diff --name-only ${diffRange}`, { encoding: 'utf8' })
const untracked = base ? '' : execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' })
const files = `${listed}\n${untracked}`
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)

const otherFiles = files.filter((file) => file !== updatedFile)
if (otherFiles.length === 0) {
  console.log('No code change besides the Last updated line.')
  process.exit(0)
}

if (!files.includes(updatedFile)) {
  console.error('These files changed without src/plan/updated.ts:')
  for (const file of otherFiles) console.error(`- ${file}`)
  fail('A code change must update the Last updated line.')
}

function field(content, name) {
  return content.match(new RegExp(`${name}:\\s*'([^']*)'`))?.[1] ?? ''
}

const current = readFileSync(updatedFile, 'utf8')
const at = field(current, 'at')
const by = field(current, 'by')
if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(at)) fail(`lastUpdated.at is "${at}", expected YYYY-MM-DD HH:mm.`)
if (!/^[A-Za-z0-9-]+$/.test(by)) fail('lastUpdated.by must be a GitHub username.')

let previous = ''
try {
  previous = execSync(`git show ${base ?? 'HEAD'}:${updatedFile}`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  })
} catch {
  previous = ''
}
if (previous && field(previous, 'at') === at) {
  fail('lastUpdated.at is still the old time. Set it to the current date and time.')
}

console.log(`Last updated line is ${at} by ${by}.`)
