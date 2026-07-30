/**
 * Fetch and parse 408 exam MCQs from 408.foreverlink.love
 * Usage: node scripts/fetch-exam.js
 */
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const YEARS = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
const BASE_URL = 'https://408.foreverlink.love/raw/'
// Full-width periods used in Chinese typography
const SEP = '[.、．\uFF0E\u3001]'

function getSubject(n) {
  if (n>=1 && n<=10) return 'ds'
  if (n>=11 && n<=22) return 'co'
  if (n>=23 && n<=32) return 'os'
  if (n>=33 && n<=40) return 'cn'
  return 'unknown'
}

function extractAnswers(txt) {
  // Strategy 1: 【答案】X in appearance order (2020)
  const b1 = [...txt.matchAll(/【答案】([A-D])/g)]
  if (b1.length >= 35) return Object.fromEntries(b1.map((a,i) => [i+1, a[1]]))

  // Strategy 2: 解答：X in order (2011, inline after each question)
  const b2 = [...txt.matchAll(/解答[：:]\s*([A-D])/g)]
  if (b2.length >= 35) return Object.fromEntries(b2.map((a,i) => [i+1, a[1]]))

  const refIdx = txt.indexOf('参考答案')
  if (refIdx === -1) return {}
  const afterRef = txt.substring(refIdx)

  // Strategy 3: HTML table with separate cells
  const tbl = afterRef.match(/<table>[\s\S]*?<\/table>/)
  if (tbl) {
    const td = [...tbl[0].matchAll(/<td[^>]*>(\d+)\.?<\/td>\s*<td[^>]*>([A-D])<\/td>/g)]
    if (td.length >= 35) return Object.fromEntries(td.map(a => [parseInt(a[1]), a[2]]))
    const td2 = [...tbl[0].matchAll(new RegExp('<td[^>]*>(\\d+)' + SEP + '?\\s*([A-D])<\\/td>', 'g'))]
    if (td2.length >= 35) return Object.fromEntries(td2.map(a => [parseInt(a[1]), a[2]]))
  }

  // Strategy 4: Simple list: 1. B\\n2. C\\n
  const s1 = [...afterRef.matchAll(new RegExp('(?:^|\\n)\\s*(\\d{1,2})\\s*' + SEP + '\\s*([A-D])(?:\\n|[\\s]{2,}|\\s*(?=\\d))', 'g'))]
  if (s1.length >= 35) return Object.fromEntries(s1.map(a => [parseInt(a[1]), a[2]]))

  // Strategy 5: Space-separated: 1. B 2. C 3. A (end of section allowed)
  const s2 = [...afterRef.matchAll(new RegExp('(?:^|\\s)(\\d{1,2})\\s*' + SEP + '?\\s*([A-D])(?=\\s+(?:\\d|#)|$)', 'g'))]
  if (s2.length >= 35) return Object.fromEntries(s2.map(a => [parseInt(a[1]), a[2]]))

  return {}
}

async function fetchYear(year) {
  const url = `${BASE_URL}${year}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return await res.text()
}

function parseMCQ(markdown, year) {
  const result = []
  const answerMap = extractAnswers(markdown)
  const nAns = Object.keys(answerMap).length

  const startIdx = markdown.indexOf('一、单项选择题')
  if (startIdx === -1) return result
  const endIdx = markdown.indexOf('二、综合应用题')
  const mcSection = endIdx > startIdx ? markdown.substring(startIdx, endIdx) : markdown.substring(startIdx)

  // Split by numbered headers (skip false positives like Roman I. inside text)
  const blocks = []
  const lines = mcSection.split('\n')
  let currentNum = 0, currentLines = [], maxSeen = 0

  for (const line of lines) {
    const h = line.match(new RegExp('^\\s*(\\d{1,2})\\s*' + SEP))
    if (h) {
      const n = parseInt(h[1])
      // Only accept if number is >= previous (questions are sequential 1-40)
      // This filters out false positives like Roman numeral I. in question text
      if (n >= maxSeen && n >= 1 && n <= 40) {
        if (currentNum > 0 && currentNum <= 40) blocks.push({ num: currentNum, text: currentLines.join('\n') })
        currentNum = n
        currentLines = [line]
        maxSeen = n
      } else if (currentNum > 0) {
        currentLines.push(line)
      }
    } else if (currentNum > 0) currentLines.push(line)
  }
  if (currentNum > 0 && currentNum <= 40) blocks.push({ num: currentNum, text: currentLines.join('\n') })

  for (const block of blocks) {
    const t = block.text
    const body = t.replace(new RegExp('^\\s*\\d{1,2}\\s*' + SEP + '\\s*'), '').trim()

    let options = []
    let questionPart = body
    const bodyLines = body.split('\n')
    let optLines = [], qLines = [], inOptions = false

    for (const l of bodyLines) {
      const optMatch = l.match(/^\s*([A-Da-d])\s*[.、)．\uFF0E\u3001\s]/)
      if (optMatch) {
        inOptions = true
        const letter = optMatch[1].toUpperCase()
        const content = l.substring(optMatch[0].length).trim()
        if (!optLines.find(o => o.startsWith(letter))) optLines.push(`${letter}. ${content}`)
      } else if (!inOptions) qLines.push(l)
    }

    if (optLines.length >= 4) {
      options = optLines.slice(0, 4)
      questionPart = qLines.join(' ').trim()
    } else {
      const optParts = [...body.matchAll(/([A-Da-d])\s*[.、)．\uFF0E\u3001\s]\s*/g)]
      if (optParts.length >= 4) {
        questionPart = body.substring(0, optParts[0].index).trim()
        for (let i = 0; i < 4 && i < optParts.length; i++) {
          const start = optParts[i].index + optParts[i][0].length
          const end = i + 1 < optParts.length ? optParts[i + 1].index : body.length
          options.push(`${optParts[i][1].toUpperCase()}. ${body.substring(start, end).trim()}`)
        }
      }
    }

    // Fallback: image-only options (A/B/C/D labels with no content)
    if (options.length === 0) {
      const labels = [...block.text.matchAll(/^\s*([A-Da-d])\s*[.、)．\uFF0E\u3001\s]/gm)]
      if (labels.length >= 3) {
        options = ['A.', 'B.', 'C.', 'D.']
        questionPart = questionPart.replace(/\s+/g, ' ').trim()
      }
    }

    // Fallback: options found but missing some (prepend A if missing)
    if (options.length >= 1 && options.length < 4) {
      const existing = new Set(options.map(o => o[0]))
      const all = []
      for (const label of ['A', 'B', 'C', 'D']) {
        if (existing.has(label)) {
          all.push(options.find(o => o[0] === label))
        } else {
          all.push(`${label}.`)
        }
      }
      options = all
    }

    const answer = answerMap[block.num] || ''
    if (options.length !== 4) console.warn(`  ${year} Q${block.num}: ${options.length}选项`)
    if (!answer) console.warn(`  ${year} Q${block.num}: 无答案`)

    result.push({
      id: `EX_${year}_${String(block.num).padStart(2,'0')}`,
      subject: getSubject(block.num),
      year,
      source: '真题',
      chapter: '',
      knowledgePoints: [],
      question: questionPart.replace(/\s+/g, ' ').trim(),
      options,
      answer,
      explanation: '',
    })
  }

  console.log(`  ${year}: ${nAns}/40 答案, ${result.length} 题`)
  return result
}

async function main() {
  const all = []
  for (const year of YEARS) {
    try {
      const qs = parseMCQ(await fetchYear(year), year)
      all.push(...qs)
    } catch (e) { console.error(`  ${year} FAIL: ${e.message}`) }
  }

  all.sort((a,b) => a.year-b.year || a.id.localeCompare(b.id))

  const bySub = {}, byYear = {}, bad = { noAnswer: 0, not4Opts: 0 }
  for (const q of all) {
    bySub[q.subject] = (bySub[q.subject]||0)+1
    byYear[q.year] = (byYear[q.year]||0)+1
    if (!q.answer) bad.noAnswer++
    if (q.options.length !== 4) bad.not4Opts++
  }
  console.log('\n科目:', JSON.stringify(bySub))
  console.log('年份:', JSON.stringify(byYear))
  console.log(`无答案: ${bad.noAnswer}, 非4选项: ${bad.not4Opts}, 总计: ${all.length}`)

  writeFileSync(join(root, 'src/data/exam-questions-raw.json'), JSON.stringify(all, null, 2), 'utf-8')
  console.log('\n已写入 exam-questions-raw.json')
}

main()
