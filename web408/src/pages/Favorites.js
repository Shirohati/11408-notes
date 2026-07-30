import { getFavorites } from '../storage.js'
import { questions, subjects } from '../data/index.js'
import { navigate } from '../router.js'
import { renderQuestionCard } from '../components/QuestionCard.js'

export function renderFavorites(container) {
  const favs = getFavorites()
  const favIds = Object.keys(favs)
  const favQs = questions.filter(q => favIds.includes(q.id))

  container.innerHTML = `
    <div class="page">
      <div class="page-header">
        <h1>⭐ 收藏夹</h1>
        <span class="badge">${favQs.length} 题</span>
      </div>
      ${favQs.length === 0 ? '<div class="empty-state">还没有收藏题目，刷题时点击 ☆ 即可收藏</div>' : `
        <div class="fav-list">
          ${favQs.map(q => {
            const sub = subjects.find(s => s.id === q.subject)
            return `
              <div class="fav-item" data-qid="${q.id}">
                <span class="fav-subject" style="color:${sub ? sub.color : '#999'}">${sub ? sub.shortName : ''}</span>
                <span class="fav-text">${q.question.substring(0, 60)}${q.question.length > 60 ? '...' : ''}</span>
              </div>
            `
          }).join('')}
        </div>
      `}
    </div>
  `

  container.querySelectorAll('.fav-item').forEach(el => {
    el.addEventListener('click', () => {
      navigate('practice', { mode: 'single', questionId: el.dataset.qid })
    })
  })
}
