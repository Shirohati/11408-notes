import { getAnswers, setAnswer, getFavorites, toggleFavorite, addWrong } from '../storage.js'
import { knowledgeMap } from '../data/index.js'
import { navigate } from '../router.js'

export function renderQuestionCard(container, question, showResult = true) {
  const selected = getAnswers()[question.id] || ''
  const multi = question.answer.length > 1
  const tmp = container.dataset.tmpSel || ''
  const cur = selected || tmp
  const norm = s => s.split('').sort().join('')
  const isCorrect = multi ? norm(selected) === norm(question.answer) : selected === question.answer
  const isFav = getFavorites()[question.id]
  const kps = question.knowledgePoints.map(id => knowledgeMap[id]).filter(Boolean)

  container.innerHTML = `
    <div class="question-card">
      <div class="q-header">
        <span class="q-source">${question.source || '题库'}${question.year ? ' ' + question.year : ''}</span>
        <div class="q-actions">
          <button class="btn-icon ${isFav ? 'fav-active' : ''}" id="btnFav">${isFav ? '★' : '☆'}</button>
        </div>
      </div>
      <div class="q-text">${question.question}</div>
      <div class="q-options">
        ${question.options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i)
          let cls = 'q-option'
          if (selected && showResult) {
            if (question.answer.includes(letter)) cls += ' correct'
            else if (cur.includes(letter) && !question.answer.includes(letter)) cls += ' wrong'
          }
          if (cur.includes(letter)) cls += ' selected'
          return `<div class="${cls}" data-value="${letter}">${opt}</div>`
        }).join('')}
      </div>
      ${selected && showResult ? `
        <div class="q-result ${isCorrect ? 'correct' : 'wrong'}">
          ${isCorrect ? '✅ 回答正确！' : '❌ 回答错误'}
          <div class="q-explanation">📖 ${question.explanation}</div>
        </div>
      ` : selected && !showResult ? `
        <div class="q-result hint">已选择: ${selected}</div>
      ` : tmp && !multi ? `
        <div class="q-result hint">已选择: ${tmp}</div>
      ` : tmp ? `
        <div class="q-result hint">已选 ${tmp.split('').sort().join('')}（${multi ? '多选，选满自动判定' : ''}）</div>
      ` : multi ? `
        <div class="q-result hint">多选（答案 ${question.answer.length} 项）</div>
      ` : ''}
      ${kps.length ? `
        <div class="q-tags">
          ${kps.map(kp => `<span class="tag" data-kpid="${kp.id}">${kp.name}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `

  container.querySelectorAll('.q-option').forEach(el => {
    el.addEventListener('click', () => {
      if (selected) return
      const val = el.dataset.value
      if (multi) {
        const next = cur.includes(val) ? cur.split('').filter(c => c !== val).join('') : cur + val
        if (norm(next) === norm(question.answer)) {
          setAnswer(question.id, norm(next))
          delete container.dataset.tmpSel
        } else if (next.length >= question.answer.length) {
          setAnswer(question.id, norm(next))
          addWrong(question.id)
          delete container.dataset.tmpSel
        } else {
          container.dataset.tmpSel = next
        }
      } else {
        setAnswer(question.id, val)
        if (val !== question.answer) {
          addWrong(question.id)
        }
      }
      renderQuestionCard(container, question, true)
    })
  })

  const favBtn = container.querySelector('#btnFav')
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      toggleFavorite(question.id)
      renderQuestionCard(container, question, true)
    })
  }

  container.querySelectorAll('.tag').forEach(el => {
    el.addEventListener('click', () => {
      const kpid = el.dataset.kpid
      navigate('knowledgeDetail', { knowledgeId: kpid, from: 'practice' })
    })
  })
}
