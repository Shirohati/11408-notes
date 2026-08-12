import { getWrongs, removeWrong } from '../storage.js'
import { questions, wdQuestions, subjects } from '../data/index.js'
import { navigate } from '../router.js'
import { renderQuestionCard } from '../components/QuestionCard.js'

export function renderWrongBook(container) {
  const wrongs = getWrongs()
  const wrongIds = Object.keys(wrongs)
  const wrongQs = [...questions, ...wdQuestions].filter(q => wrongIds.includes(q.id))

  // 按科目分组
  const bySubject = {}
  subjects.forEach(sub => { bySubject[sub.id] = { ...sub, questions: [] } })
  wrongQs.forEach(q => {
    if (bySubject[q.subject]) bySubject[q.subject].questions.push(q)
  })

  let filterSub = ''
  function render() {
    let list = wrongQs
    if (filterSub) list = list.filter(q => q.subject === filterSub)

    container.innerHTML = `
      <div class="page">
        <div class="page-header">
          <h1>❌ 错题本</h1>
          <span class="badge">${wrongIds.length} 题</span>
        </div>
        <div class="filter-bar">
          <button class="btn-filter ${!filterSub ? 'active' : ''}" data-sub="">全部</button>
          ${subjects.map(s => `
            <button class="btn-filter ${filterSub === s.id ? 'active' : ''}" data-sub="${s.id}" style="${filterSub === s.id ? `background:${s.color}20;color:${s.color};border-color:${s.color}` : ''}">${s.shortName}</button>
          `).join('')}
        </div>
        ${list.length === 0 ? '<div class="empty-state">🎉 没有错题，继续保持！</div>' : `
          <div class="wrong-list">
            ${list.map(q => {
              const sub = subjects.find(s => s.id === q.subject)
              const wrongCount = wrongs[q.id] || 0
              return `
                <div class="wrong-item" data-qid="${q.id}">
                  <div class="wi-header">
                    <span class="wi-subject" style="color:${sub ? sub.color : '#999'}">${sub ? sub.shortName : ''}</span>
                    <span class="wi-wrong-count">错 ${wrongCount} 次</span>
                    <button class="btn-icon-sm btn-remove-wrong" data-qid="${q.id}">✕</button>
                  </div>
                  <div class="wi-question">${q.question}</div>
                  <div class="wi-answer">正确答案: <strong>${q.answer}</strong>. ${q.explanation.substring(0, 40)}${q.explanation.length > 40 ? '...' : ''}</div>
                </div>
              `
            }).join('')}
          </div>
        `}
      </div>
    `

    // 筛选
    container.querySelectorAll('.btn-filter').forEach(el => {
      el.addEventListener('click', () => {
        filterSub = el.dataset.sub
        render()
      })
    })

    // 移除错题
    container.querySelectorAll('.btn-remove-wrong').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        removeWrong(el.dataset.qid)
        render()
      })
    })

    // 点击题目进入刷题
    container.querySelectorAll('.wrong-item').forEach(el => {
      el.addEventListener('click', () => {
        const qid = el.dataset.qid
        navigate('practice', { mode: 'single', questionId: qid })
      })
    })
  }

  render()
}
