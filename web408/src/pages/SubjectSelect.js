import { subjects, knowledgeMap } from '../data/index.js'
import { navigate, goBack } from '../router.js'

export function renderSubjectSelect(container) {
  container.innerHTML = `
    <div class="page">
      <div class="page-header">
        <button class="btn-back" id="btnBack">← 返回</button>
        <h1>选择科目和章节</h1>
      </div>
      <div class="subject-list">
        ${subjects.map(sub => `
          <div class="subject-card" data-sub="${sub.id}">
            <div class="sc-header" style="border-left: 4px solid ${sub.color}">
              <span class="sc-name">${sub.name}</span>
              <span class="sc-arrow">▶</span>
            </div>
            <div class="sc-chapters" style="display:none">
              ${sub.chapters.map(ch => `
                <div class="chapter-item" data-chapter="${ch.id}">
                  <span class="ch-name">${ch.name}</span>
                  <span class="ch-count">${ch.points.length} 知识点</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `

  container.querySelector('#btnBack').addEventListener('click', () => goBack('practicehub'))

  container.querySelectorAll('.sc-header').forEach(el => {
    el.addEventListener('click', () => {
      const card = el.closest('.subject-card')
      const chapters = card.querySelector('.sc-chapters')
      const arrow = el.querySelector('.sc-arrow')
      const isOpen = chapters.style.display !== 'none'
      chapters.style.display = isOpen ? 'none' : 'block'
      arrow.textContent = isOpen ? '▶' : '▼'
    })
  })

  container.querySelectorAll('.chapter-item').forEach(el => {
    el.addEventListener('click', () => {
      const chId = el.dataset.chapter
      navigate('practice', { chapter: chId, mode: 'chapter' })
    })
  })
}
