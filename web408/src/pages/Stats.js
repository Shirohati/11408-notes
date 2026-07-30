import { getAnswers, getDailyLog, getDailyTarget, getTodayAnsweredIds } from '../storage.js'
import { subjects, questions } from '../data/index.js'

export function renderStats(container) {
  const answers = getAnswers()
  const dailyLog = getDailyLog()
  const dailyTarget = getDailyTarget()
  const todayAnswered = getTodayAnsweredIds()

  // 各科统计
  const subStats = subjects.map(sub => {
    const subQs = questions.filter(q => q.subject === sub.id)
    const subAns = subQs.filter(q => answers[q.id])
    const subCorr = subAns.filter(q => answers[q.id] === q.answer)
    return {
      ...sub,
      total: subQs.length,
      done: subAns.length,
      correct: subCorr.length,
      rate: subAns.length ? Math.round(subCorr.length / subAns.length * 100) : 0,
    }
  })

  // 每日趋势（近15天）
  const days = []
  let daysMetTarget = 0
  const d = new Date()
  for (let i = 14; i >= 0; i--) {
    const day = new Date(d)
    day.setDate(day.getDate() - i)
    const key = formatDate(day)
    const count = dailyLog[key] || 0
    days.push({ key, count, label: `${day.getMonth()+1}/${day.getDate()}` })
    if (count >= dailyTarget) daysMetTarget++
  }
  const maxCount = Math.max(...days.map(d => d.count), dailyTarget, 1)

  // 今日完成率
  const todayRate = Math.min(100, Math.round(todayAnswered.length / dailyTarget * 100))
  // 总学习天数
  const totalDays = Object.keys(dailyLog).length

  container.innerHTML = `
    <div class="page">
      <div class="page-header">
        <h1>📊 学习统计</h1>
      </div>

      <div class="section daily-target-card">
        <div class="dtc-header">
          <span class="dtc-icon">🎯</span>
          <span>今日目标完成情况</span>
        </div>
        <div class="dtc-body">
          <div class="dtc-num">${todayAnswered.length} <span class="dtc-sep">/</span> <span class="dtc-target">${dailyTarget}</span></div>
          <div class="mode-bar">
            <div class="mode-bar-fill ${todayRate >= 100 ? 'complete' : ''}" style="width:${todayRate}%"></div>
          </div>
          <div class="dtc-label">
            ${todayAnswered.length >= dailyTarget ? '🎉 今日目标已完成！' : `还差 ${dailyTarget - todayAnswered.length} 题达到今日目标`}
          </div>
        </div>
      </div>

      <div class="section">
        <h2>各科正确率</h2>
        <div class="stats-chart">
          ${subStats.map(s => {
            const barWidth = s.done ? Math.round(s.rate) : 0
            return `
              <div class="chart-row">
                <span class="chart-label" style="color:${s.color}">${s.shortName}</span>
                <div class="chart-bar-wrap">
                  <div class="chart-bar" style="width:${barWidth}%;background:${s.color}"></div>
                </div>
                <span class="chart-value">${s.done ? `${s.rate}%` : '-'}</span>
                <span class="chart-sub">${s.correct}/${s.done}</span>
              </div>
            `
          }).join('')}
        </div>
      </div>

      <div class="section">
        <h2>每日做题趋势（近15天）</h2>
        <div class="daily-chart">
          <div class="daily-bars">
            ${days.map(day => `
              <div class="daily-bar-col">
                <div class="daily-bar ${day.count >= dailyTarget ? 'met-target' : ''}" style="height:${day.count / maxCount * 100}%">
                  ${day.count > 0 ? `<span class="daily-bar-val">${day.count}</span>` : ''}
                </div>
                <div class="daily-label">${day.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <p class="chart-footnote">近15天中 ${daysMetTarget} 天达成了每日 ${dailyTarget} 题的目标</p>
      </div>

      <div class="section">
        <h2>学习概况</h2>
        <div class="overview-cards">
          <div class="stat-card">
            <div class="stat-num">${questions.length}</div>
            <div class="stat-label">题库总量</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${Object.keys(answers).length}</div>
            <div class="stat-label">已答题数</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${Object.keys(answers).filter(qid => answers[qid] === questions.find(q => q.id === qid)?.answer).length}</div>
            <div class="stat-label">正确题数</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${totalDays}</div>
            <div class="stat-label">学习天数</div>
          </div>
        </div>
      </div>
    </div>
  `
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
