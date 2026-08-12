import { getAnswers, getWrongs, getDailyLog, getDailyTarget, getTodayAnsweredIds } from '../storage.js'
import { subjects, questions, wdQuestions, knowledgeMap } from '../data/index.js'
import { navigate } from '../router.js'
import { renderProgressRing } from '../components/ProgressRing.js'

export function renderHome(container) {
  const answers = getAnswers()
  const wrongs = getWrongs()
  const dailyLog = getDailyLog()
  const allQuestions = [...questions, ...wdQuestions]
  const totalQuestions = allQuestions.length
  const answered = Object.keys(answers).length
  const correctCount = allQuestions.filter(q => answers[q.id] === q.answer).length
  const wrongCount = Object.keys(wrongs).length
  const favCount = Object.keys(JSON.parse(localStorage.getItem('wk_favorites') || '{}')).length
  const overallRate = answered ? Math.round(correctCount / answered * 100) : 0

  // 每日刷题
  const dailyTarget = getDailyTarget()
  const todayAnswered = getTodayAnsweredIds()
  const dailyDone = todayAnswered.length
  const dailyRate = Math.min(100, Math.round(dailyDone / dailyTarget * 100))

  // 每日做题数
  const today = getTodayKey()
  const todayCount = dailyLog[today] || 0

  // 连续学习天数
  let streak = 0
  const d = new Date()
  for (let i = 0; i < 365; i++) {
    const key = formatDate(d)
    if (dailyLog[key] && dailyLog[key] > 0) streak++
    else if (i > 0) break
    d.setDate(d.getDate() - 1)
  }

  // 各科进度
  let subjectStats = subjects.map(sub => {
    const subQs = allQuestions.filter(q => q.subject === sub.id)
    const subAns = subQs.filter(q => answers[q.id])
    const subCorr = subAns.filter(q => answers[q.id] === q.answer).length
    const rate = subAns.length ? Math.round(subCorr / subAns.length * 100) : 0
    return { ...sub, total: subQs.length, done: subAns.length, rate, correct: subCorr }
  })

  // 薄弱知识点 TOP5
  const weakPoints = getWeakPoints(answers, wrongs)

  container.innerHTML = `
    <div class="page home-page">
      <div class="home-header">
        <h1>408 刷题助手</h1>
        <p class="home-subtitle">${getGreeting()}！今天已做 <strong>${todayCount}</strong> 题</p>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-num">${answered}</div>
          <div class="stat-label">已答题</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:#27AE60;">${Math.round(correctCount)}</div>
          <div class="stat-label">正确</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:#E74C3C;">${wrongCount}</div>
          <div class="stat-label">错题</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:#F39C12;">🔥${streak}</div>
          <div class="stat-label">连续天数</div>
        </div>
      </div>

      <div class="section">
        <h2>📈 总体正确率</h2>
        <div class="overall-rate-wrap">
          <div id="overallRing"></div>
          <div class="overall-info">
            <p>答题 <strong>${answered}</strong> / ${totalQuestions} 题</p>
            <p>正确 <strong>${Math.round(correctCount)}</strong> / ${answered} 题</p>
            <p>收藏 <strong>${favCount}</strong> 题</p>
          </div>
        </div>
      </div>

      <div class="section daily-progress-card">
        <div class="dpc-header" id="dpcDaily">
          <div class="dpc-title">
            <span class="dpc-icon">📅</span>
            <span>每日刷题</span>
          </div>
          <span class="dpc-arrow">›</span>
        </div>
        <div class="dpc-body">
          <div class="dpc-stats">
            <span class="dpc-num">${dailyDone}</span>
            <span class="dpc-sep">/</span>
            <span class="dpc-target">${dailyTarget}</span>
          </div>
          <div class="mode-bar">
            <div class="mode-bar-fill" style="width:${dailyRate}%"></div>
          </div>
          <div class="dpc-label">
            ${dailyDone >= dailyTarget ? '🎉 今日目标已完成！' : `今日已完成 ${dailyDone}/${dailyTarget} 题`}
          </div>
        </div>
      </div>

      <div class="section">
        <h2>📚 各科进度</h2>
        <div class="subject-progress-list">
          ${subjectStats.map(s => `
            <div class="subject-progress-item" data-sub="${s.id}">
              <div class="sp-header">
                <span class="sp-name" style="color:${s.color}">${s.name}</span>
                <span class="sp-stat">${s.done}/${s.total}题 ${s.rate}%</span>
              </div>
              <div class="sp-bar">
                <div class="sp-bar-fill" style="width:${s.done/s.total*100}%;background:${s.color}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      ${weakPoints.length ? `
        <div class="section">
          <h2>🔴 薄弱知识点 TOP${Math.min(5, weakPoints.length)}</h2>
          <div class="weak-list">
            ${weakPoints.slice(0, 5).map(w => `
              <div class="weak-item" data-kpid="${w.id}">
                <span class="weak-name">${w.name}</span>
                <span class="weak-badge">错 ${w.wrongCount} 题</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="quick-actions">
        <button class="btn btn-primary" id="btnQuickDaily">📅 每日刷题</button>
        <button class="btn btn-secondary" id="btnQuickPractice">🎲 随记刷题</button>
        <button class="btn btn-outline" id="btnQuickWrong">❌ 错题重做</button>
      </div>
    </div>
  `

  // 进度环
  const ringEl = container.querySelector('#overallRing')
  if (ringEl) renderProgressRing(ringEl, overallRate, '#4A90D9', 100)

  // 各科点击
  container.querySelectorAll('.subject-progress-item').forEach(el => {
    el.addEventListener('click', () => navigate('subjects'))
  })

  container.querySelectorAll('.weak-item').forEach(el => {
    el.addEventListener('click', () => {
      navigate('knowledgeDetail', { knowledgeId: el.dataset.kpid })
    })
  })

  container.querySelector('#dpcDaily').addEventListener('click', () => {
    navigate('practicehub')
  })
  container.querySelector('#btnQuickDaily').addEventListener('click', () => {
    navigate('practice', { mode: 'daily' })
  })
  container.querySelector('#btnQuickPractice').addEventListener('click', () => {
    navigate('practice', { mode: 'random' })
  })
  container.querySelector('#btnQuickWrong').addEventListener('click', () => {
    navigate('wrongbook')
  })
}

function getWeakPoints(answers, wrongs) {
  // 统计每个知识点的错题数
  const kpWrongs = {}
  for (const qid of Object.keys(wrongs)) {
    const q = [...questions, ...wdQuestions].find(q => q.id === qid)
    if (q) {
      q.knowledgePoints.forEach(kpid => {
        kpWrongs[kpid] = (kpWrongs[kpid] || 0) + wrongs[qid]
      })
    }
  }
  return Object.entries(kpWrongs)
    .map(([id, count]) => ({ id, name: (knowledgeMap[id] || {}).name || id, wrongCount: count }))
    .sort((a, b) => b.wrongCount - a.wrongCount)
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 6) return '夜深了，注意休息'
  if (h < 12) return '早上好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
}

function getTodayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
