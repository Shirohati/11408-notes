import { subjects, knowledgeMap, questions } from '../data/index.js'
import { getAnswers, getWrongs } from '../storage.js'
import { navigate, goBack, getParams } from '../router.js'

export function renderKnowledge(container) {
  const params = getParams()
  const fromDetail = params.knowledgeId

  if (fromDetail) {
    return renderDetail(container, fromDetail)
  }

  const answers = getAnswers()
  const wrongs = getWrongs()

  // 计算每个知识点的掌握度
  function calcMastery(kpId) {
    const related = questions.filter(q => q.knowledgePoints.includes(kpId))
    if (!related.length) return null
    const answered = related.filter(q => answers[q.id])
    if (!answered.length) return null
    const correct = answered.filter(q => answers[q.id] === q.answer).length
    const rate = correct / answered.length
    return rate
  }

  function getMasteryLevel(rate) {
    if (rate === null) return 'unknown'
    if (rate >= 0.8) return 'good'
    if (rate >= 0.5) return 'medium'
    return 'weak'
  }

  function getMasteryColor(level) {
    return { good: '#27AE60', medium: '#F39C12', weak: '#E74C3C', unknown: '#CCC' }[level] || '#CCC'
  }

  container.innerHTML = `
    <div class="page knowledge-page">
      <div class="page-header">
        <h1>📚 知识点总览</h1>
        <div class="header-actions">
          <button class="btn btn-sm btn-outline" id="btnFlashcard">速记</button>
          <button class="btn btn-sm btn-outline" id="btnContrast">对比</button>
        </div>
      </div>
      <div class="knowledge-tree">
        ${subjects.map(sub => `
          <div class="kt-subject" data-sub="${sub.id}">
            <div class="kt-subject-header" style="border-left: 4px solid ${sub.color}">
              <span class="kt-subject-name">${sub.name}</span>
              <span class="kt-arrow">▶</span>
            </div>
            <div class="kt-chapters" style="display:none">
              ${sub.chapters.map(ch => {
                const chWrongs = ch.points.reduce((sum, pt) => sum + calcWrongCount(pt.id), 0)
                return `
                  <div class="kt-chapter">
                    <div class="kt-chapter-header">
                      <span class="kt-chapter-name">${ch.name}</span>
                      <span class="kt-arrow">▶</span>
                    </div>
                    <div class="kt-points" style="display:none">
                      ${ch.points.map(pt => {
                        const rate = calcMastery(pt.id)
                        const level = getMasteryLevel(rate)
                        const color = getMasteryColor(level)
                        const wrongCount = calcWrongCount(pt.id)
                        return `
                          <div class="kt-point" data-kpid="${pt.id}">
                            <span class="kt-point-dot" style="background:${color}"></span>
                            <span class="kt-point-name">${pt.name}</span>
                            <span class="kt-point-stat">${wrongCount ? `错${wrongCount}` : ''}${rate !== null ? ` ${Math.round(rate*100)}%` : ' 未做'}</span>
                          </div>
                        `
                      }).join('')}
                    </div>
                  </div>
                `
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `

  // 展开/折叠 科目
  container.querySelectorAll('.kt-subject-header').forEach(el => {
    el.addEventListener('click', () => {
      const chapters = el.nextElementSibling
      const arrow = el.querySelector('.kt-arrow')
      const isOpen = chapters.style.display !== 'none'
      chapters.style.display = isOpen ? 'none' : 'block'
      arrow.textContent = isOpen ? '▶' : '▼'
    })
  })

  // 展开/折叠 章节
  container.querySelectorAll('.kt-chapter-header').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation()
      const points = el.nextElementSibling
      const arrow = el.querySelector('.kt-arrow')
      const isOpen = points.style.display !== 'none'
      points.style.display = isOpen ? 'none' : 'block'
      arrow.textContent = isOpen ? '▶' : '▼'
    })
  })

  // 点击知识点查看详情
  container.querySelectorAll('.kt-point').forEach(el => {
    el.addEventListener('click', () => {
      navigate('knowledgeDetail', { knowledgeId: el.dataset.kpid })
    })
  })

  container.querySelector('#btnFlashcard').addEventListener('click', () => navigate('flashcard'))
  container.querySelector('#btnContrast').addEventListener('click', () => navigate('contrast'))
}

function calcWrongCount(kpId) {
  const wrongs = getWrongs()
  const related = questions.filter(q => q.knowledgePoints.includes(kpId))
  return related.reduce((sum, q) => sum + (wrongs[q.id] || 0), 0)
}

function renderDetail(container, kpId) {
  const kp = knowledgeMap[kpId]
  if (!kp) {
    container.innerHTML = `<div class="page"><div class="empty-state">知识点不存在</div></div>`
    return
  }

  const related = questions.filter(q => q.knowledgePoints.includes(kpId))
  const answers = getAnswers()
  const wrongs = getWrongs()
  const answered = related.filter(q => answers[q.id])
  const correct = answered.filter(q => answers[q.id] === q.answer)
  const totalWrong = related.reduce((sum, q) => sum + (wrongs[q.id] || 0), 0)
  const rate = answered.length ? Math.round(correct.length / answered.length * 100) : null

  container.innerHTML = `
    <div class="page">
      <div class="page-header">
        <button class="btn-back" id="btnBack">← 返回</button>
        <h1>${kp.name}</h1>
      </div>
      <div class="kp-detail-card">
        <div class="kp-meta">
          <span style="color:${kp.subjectColor}">${kp.subjectName}</span> · ${kp.chapterName}
        </div>
        ${totalWrong > 0 ? `<div class="kp-wrong-badge">关联错题 ${totalWrong} 道</div>` : ''}
        <div class="kp-summary">
          <h3>核心要点</h3>
          <ul>${kp.summary.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div class="kp-mnemonic">
          <h3>记忆口诀</h3>
          <p class="mnemonic-text">${kp.mnemonic}</p>
        </div>
        <div class="kp-stats">
          <h3>掌握情况</h3>
          <p>相关题目 ${related.length} 道 · 已做 ${answered.length} 道 · 正确 ${correct.length} 道</p>
          ${rate !== null ? `
            <div class="rate-bar">
              <div class="rate-fill" style="width:${rate}%;background:${rate >= 80 ? '#27AE60' : rate >= 50 ? '#F39C12' : '#E74C3C'}"></div>
            </div>
            <div class="rate-text" style="color:${rate >= 80 ? '#27AE60' : rate >= 50 ? '#F39C12' : '#E74C3C'}">${rate}% 正确率</div>
          ` : '<p class="dim">还没做过相关题目</p>'}
        </div>
        ${related.length ? `
          <div class="kp-questions">
            <h3>相关题目 (${related.length})</h3>
            <div class="kp-q-list">
              ${related.map(q => {
                const isCorrect = answers[q.id] === q.answer
                const isWrong = answers[q.id] && answers[q.id] !== q.answer
                return `
                  <div class="kp-q-item" data-qid="${q.id}">
                    <span class="kp-q-status ${isCorrect ? 'correct' : isWrong ? 'wrong' : 'unanswered'}">
                      ${isCorrect ? '✓' : isWrong ? '✗' : '○'}
                    </span>
                    <span class="kp-q-text">${q.question.substring(0, 50)}${q.question.length > 50 ? '...' : ''}</span>
                  </div>
                `
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `

  container.querySelector('#btnBack').addEventListener('click', () => goBack('knowledge'))

  container.querySelectorAll('.kp-q-item').forEach(el => {
    el.addEventListener('click', () => {
      const qid = el.dataset.qid
      navigate('practice', { mode: 'single', questionId: qid })
    })
  })
}
