/**
 * sync-docs.js
 * 自动扫描源码，更新 DEVELOPER.md 中的统计数据。
 * 用法: node scripts/sync-docs.js
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const mdPath = join(root, 'DEVELOPER.md')

// 动态导入数据（Windows 上需要 file:// URL）
function toFileUrl(p) {
  if (process.platform === 'win32') {
    return 'file:///' + p.replace(/\\/g, '/')
  }
  return p
}

async function loadData() {
  const questionsMod = await import(toFileUrl(join(root, 'src/data/questions.js')))
  const knowledgeMod = await import(toFileUrl(join(root, 'src/data/knowledge.js')))
  const contrastsMod = await import(toFileUrl(join(root, 'src/data/contrasts.js')))
  return {
    questions: questionsMod.questions,
    subjects: knowledgeMod.subjects,
    contrasts: contrastsMod.contrasts,
  }
}

// 统计源文件行数
function collectFileStats() {
  const files = { pages: [], components: [], data: [], other: [] }

  function walk(dir, category) {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) continue
      if (entry.name.endsWith('.js') || entry.name.endsWith('.css')) {
        const lines = readFileSync(full, 'utf-8').split('\n').length
        const rel = full.replace(root + '\\', '').replace(/\\/g, '/')
        files[category].push({ name: rel, lines })
      }
    }
  }

  walk(join(root, 'src/pages'), 'pages')
  walk(join(root, 'src/components'), 'components')
  walk(join(root, 'src/data'), 'data')
  // 其他核心文件
  for (const f of ['src/main.js', 'src/router.js', 'src/storage.js', 'src/style.css']) {
    const full = join(root, f)
    if (statSync(full, { throwIfNoEntry: false })) {
      const lines = readFileSync(full, 'utf-8').split('\n').length
      files.other.push({ name: f.replace(/\\/g, '/'), lines })
    }
  }

  return files
}

function generateSyncSection(data) {
  const { questions, subjects, contrasts } = data
  const now = new Date()

  // 各科题目数
  const qStats = {}
  for (const q of questions) {
    qStats[q.subject] = (qStats[q.subject] || 0) + 1
  }

  // 题库表格
  const totalPoints = subjects.reduce((s, sub) => s + sub.chapters.reduce((s2, ch) => s2 + ch.points.length, 0), 0)
  let qTable = ''
  for (const sub of subjects) {
    const count = qStats[sub.id] || 0
    qTable += `| ${sub.name} | ${count} | ${sub.chapters.length} | ${sub.chapters.reduce((s2, ch) => s2 + ch.points.length, 0)} |\n`
  }

  // 知识点表格
  let kTable = ''
  for (const sub of subjects) {
    const ptCount = sub.chapters.reduce((s2, ch) => s2 + ch.points.length, 0)
    kTable += `| ${sub.name} | ${sub.chapters.length} | ${ptCount} |\n`
  }
  const totalChapters = subjects.reduce((s, sub) => s + sub.chapters.length, 0)

  // 知识点最多的章节
  let maxPtChapter = '', maxPt = 0
  for (const sub of subjects) {
    for (const ch of sub.chapters) {
      if (ch.points.length > maxPt) { maxPt = ch.points.length; maxPtChapter = `${sub.name} - ${ch.name}` }
    }
  }

  // 文件统计
  const files = collectFileStats()
  const allCategories = [
    { label: '页面', data: files.pages },
    { label: '组件', data: files.components },
    { label: '数据', data: files.data },
    { label: '核心模块', data: files.other },
  ]
  let totalFileCount = 0, totalFileLines = 0
  let fileTable = ''
  for (const cat of allCategories) {
    const count = cat.data.length
    const lines = cat.data.reduce((s, f) => s + f.lines, 0)
    totalFileCount += count
    totalFileLines += lines
    fileTable += `| ${cat.label} | ${count} | ${lines} |\n`
  }

  const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`

  return `<!-- SYNC START -->
## 当前项目状态（自动同步）

> 最后同步: ${dateStr}
> 执行 \`npm run docs\` 更新

### 题库统计

| 科目 | 题目数 | 章节数 | 知识点数 |
|------|--------|--------|----------|
${qTable}| **总计** | **${questions.length}** | **${totalChapters}** | **${totalPoints}** |

### 知识点统计

| 科目 | 章节数 | 知识点数 |
|------|--------|----------|
${kTable}| **总计** | **${totalChapters}** | **${totalPoints}** |

知识点最多的章节: **${maxPtChapter}**（${maxPt} 个知识点）

### 对比记忆表

**总计**: ${contrasts.length} 组

| 对比表 | 所属科目 |
|--------|----------|
${contrasts.map(c => {
  const sub = subjects.find(s => s.id === c.subjectId)
  return `| ${c.name} | ${sub ? sub.name : '-'} |`
}).join('\n')}

### 文件统计

| 类型 | 数量 | 代码行数 |
|------|------|----------|
${fileTable}| **总计** | **${totalFileCount}** | **${totalFileLines}** |
<!-- SYNC END -->`
}

async function main() {
  try {
    const data = await loadData()
    const syncContent = generateSyncSection(data)

    let md = readFileSync(mdPath, 'utf-8')

    const startMarker = '<!-- SYNC START -->'
    const endMarker = '<!-- SYNC END -->'
    const startIdx = md.indexOf(startMarker)
    const endIdx = md.indexOf(endMarker)

    if (startIdx === -1 || endIdx === -1) {
      console.error('DEVELOPER.md 中缺少同步标记，请确保包含 <!-- SYNC START --> 和 <!-- SYNC END -->')
      process.exit(1)
    }

    const before = md.substring(0, startIdx)
    const after = md.substring(endIdx + endMarker.length)
    md = before + syncContent + after

    writeFileSync(mdPath, md, 'utf-8')
    console.log(`✅ DEVELOPER.md 同步完成！
   - 题库: ${data.questions.length} 道题
   - 知识点: ${totalPointCount(data.subjects)} 个
   - 对比表: ${data.contrasts.length} 组`)
  } catch (err) {
    console.error('❌ 同步失败:', err.message)
    process.exit(1)
  }
}

function totalPointCount(subjects) {
  return subjects.reduce((s, sub) => s + sub.chapters.reduce((s2, ch) => s2 + ch.points.length, 0), 0)
}

main()
