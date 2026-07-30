import { subjects, knowledgeMap } from '../data/index.js'
import { navigate, goBack } from '../router.js'

export function renderFlashcard(container) {
  // 收集所有知识点
  const allPoints = Object.values(knowledgeMap)
  // 打乱
  const shuffled = [...allPoints].sort(() => Math.random() - 0.5)
  let currentIdx = 0
  let flipped = false

  function render() {
    if (!shuffled.length) {
      container.innerHTML = `<div class="page"><div class="empty-state">暂无知识点</div></div>`
      return
    }

    const pt = shuffled[currentIdx]

    container.innerHTML = `
      <div class="page flashcard-page">
        <div class="page-header">
          <button class="btn-back" id="btnBack">← 返回</button>
          <h1>📇 速记闪卡</h1>
          <span class="badge">${currentIdx + 1} / ${shuffled.length}</span>
        </div>
        <div class="flashcard-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:${(currentIdx+1)/shuffled.length*100}%"></div></div>
        </div>
        <div class="flashcard-container">
          <div class="flashcard ${flipped ? 'flipped' : ''}" id="flashcard">
            <div class="flashcard-inner">
              <div class="flashcard-front">
                <div class="fc-subject" style="color:${pt.subjectColor}">${pt.subjectName}</div>
                <div class="fc-chapter">${pt.chapterName}</div>
                <div class="fc-name">${pt.name}</div>
                <div class="fc-hint">点击翻转查看详情</div>
              </div>
              <div class="flashcard-back">
                <div class="fc-subject" style="color:${pt.subjectColor}">${pt.subjectName} · ${pt.chapterName}</div>
                <div class="fc-name">${pt.name}</div>
                <div class="fc-summary">
                  <h4>核心要点</h4>
                  <ul>${pt.summary.map(s => `<li>${s}</li>`).join('')}</ul>
                </div>
                <div class="fc-mnemonic">
                  <h4>记忆口诀</h4>
                  <p>${pt.mnemonic}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flashcard-nav">
          <button class="btn btn-outline" id="btnPrev" ${currentIdx === 0 ? 'disabled' : ''}>上一张</button>
          <button class="btn btn-outline" id="btnFlip">翻转</button>
          <button class="btn btn-primary" id="btnNext" ${currentIdx === shuffled.length - 1 ? 'disabled' : ''}>下一张</button>
        </div>
        <p class="flashcard-tip">提示：也可以按键盘 ← → 翻页，空格翻转</p>
      </div>
    `

    const card = container.querySelector('#flashcard')
    container.querySelector('#btnFlip').addEventListener('click', () => {
      flipped = !flipped
      card.classList.toggle('flipped', flipped)
    })
    card.addEventListener('click', () => {
      flipped = !flipped
      card.classList.toggle('flipped', flipped)
    })

    container.querySelector('#btnBack').addEventListener('click', () => goBack('knowledge'))
    container.querySelector('#btnPrev').addEventListener('click', () => {
      if (currentIdx > 0) { currentIdx--; flipped = false; render() }
    })
    container.querySelector('#btnNext').addEventListener('click', () => {
      if (currentIdx < shuffled.length - 1) { currentIdx++; flipped = false; render() }
    })
  }

  function keyHandler(e) {
    if (e.key === 'ArrowLeft' && currentIdx > 0) { currentIdx--; flipped = false; render() }
    if (e.key === 'ArrowRight' && currentIdx < shuffled.length - 1) { currentIdx++; flipped = false; render() }
    if (e.key === ' ' || e.key === 'Space') { e.preventDefault(); flipped = !flipped; const card = container.querySelector('#flashcard'); if (card) card.classList.toggle('flipped', flipped) }
  }
  document.addEventListener('keydown', keyHandler)
  render()

  container._cleanup = () => {
    document.removeEventListener('keydown', keyHandler)
  }
}
