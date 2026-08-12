import { questions, wdQuestions, subjects, knowledgeMap } from '../data/index.js'
import { getParams, navigate, goBack } from '../router.js'
import { renderQuestionCard } from '../components/QuestionCard.js'
import { getDailyTarget, getTodayAnsweredIds, getSelectedYears } from '../storage.js'

export function renderPractice(container) {
  const params = getParams()
  const mode = params.mode || 'chapter'
  const chapterId = params.chapter || ''
  const knowledgeId = params.knowledgeId || ''
  const questionId = params.questionId || ''
  const selectedYears = getSelectedYears()
  const allQuestions = [...questions, ...wdQuestions]

  function filterByYears(pool) {
    if (!selectedYears || selectedYears.length === 0 || selectedYears.length === 12) return pool
    return pool.filter(q => q.year && selectedYears.includes(q.year))
  }

  let pool = []

  if (mode === 'daily') {
    const todayIds = getTodayAnsweredIds()
    const target = getDailyTarget()
    const unanswered = allQuestions.filter(q => !todayIds.includes(q.id))
    const source = unanswered.length > 0 ? unanswered : allQuestions
    pool = filterByYears([...source].sort(() => Math.random() - 0.5))
    const limit = Math.max(target, 20)
    if (pool.length > limit) pool = pool.slice(0, limit)
  } else if (mode === 'random') {
    pool = filterByYears([...allQuestions].sort(() => Math.random() - 0.5))
  } else if (questionId) {
    const q = allQuestions.find(q => q.id === questionId)
    pool = q ? [q] : []
  } else if (knowledgeId) {
    pool = filterByYears(allQuestions.filter(q => q.knowledgePoints.includes(knowledgeId)))
  } else if (chapterId) {
    pool = allQuestions.filter(q => q.chapter === chapterId)
  } else {
    pool = filterByYears([...allQuestions])
  }

  if (!pool.length) {
    container.innerHTML = `<div class="page"><div class="empty-state">暂无题目</div></div>`
    return
  }

  let currentIdx = 0
  const total = pool.length

  function getModeLabel() {
    const labels = { daily: '每日刷题', random: '随记刷题', chapter: '章节练习', single: '' }
    return labels[mode] || ''
  }

  function render() {
    const q = pool[currentIdx]
    const sub = subjects.find(s => s.id === q.subject)
    const ch = sub ? sub.chapters.find(c => c.id === q.chapter) : null
    const modeLabel = getModeLabel()
    const yearInfo = q.year ? `${q.year}年` : ''

    container.innerHTML = `
      <div class="page practice-page">
        <div class="practice-header">
          <button class="btn-back" id="btnBack">← 返回</button>
          ${modeLabel ? `<span class="practice-mode-label">${modeLabel}</span>` : ''}
          <div class="practice-progress">
            <div class="progress-text">${currentIdx + 1} / ${total}</div>
            <div class="progress-bar"><div class="progress-fill" style="width:${(currentIdx+1)/total*100}%"></div></div>
          </div>
          <span class="practice-subject" style="color:${sub ? sub.color : '#999'}">${sub ? sub.shortName : ''}</span>
        </div>
        ${ch ? `<div class="practice-chapter">${ch.name}</div>` : ''}
        ${yearInfo ? `<div class="practice-year">${yearInfo}</div>` : ''}
        <div id="questionArea"></div>
        <div class="practice-nav">
          <button class="btn btn-outline" id="btnPrev" ${currentIdx === 0 ? 'disabled' : ''}>上一题</button>
          <button class="btn btn-primary" id="btnNext" ${currentIdx === total - 1 ? 'disabled' : ''}>下一题</button>
        </div>
      </div>
    `

    const qArea = container.querySelector('#questionArea')
    renderQuestionCard(qArea, q, true)

    container.querySelector('#btnBack').addEventListener('click', () => goBack('practicehub'))
    container.querySelector('#btnPrev').addEventListener('click', () => { if (currentIdx > 0) { currentIdx--; render() } })
    container.querySelector('#btnNext').addEventListener('click', () => { if (currentIdx < total - 1) { currentIdx++; render() } })
  }

  function keyHandler(e) {
    if (e.key === 'ArrowLeft' && currentIdx > 0) { currentIdx--; render() }
    if (e.key === 'ArrowRight' && currentIdx < total - 1) { currentIdx++; render() }
  }
  document.addEventListener('keydown', keyHandler)
  render()

  container._cleanup = () => {
    document.removeEventListener('keydown', keyHandler)
  }
}
