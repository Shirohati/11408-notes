import { getParams, navigate, goBack } from '../router.js'
import { renderQuestionCard } from '../components/QuestionCard.js'
import { getDailyTarget, getTodayAnsweredIds, getSelectedYears, setSelectedYears } from '../storage.js'
import { questions } from '../data/index.js'

const ALL_YEARS = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]

export function renderPracticeHub(container) {
  const target = getDailyTarget()
  const todayAnswered = getTodayAnsweredIds()
  const dailyDone = todayAnswered.length
  const dailyRate = Math.min(100, Math.round(dailyDone / target * 100))
  const totalAnswered = Object.keys(JSON.parse(localStorage.getItem('wk_answers') || '{}')).length
  const totalQs = questions.length
  const selectedYears = getSelectedYears()

  container.innerHTML = `
    <div class="page">
      <div class="page-header">
        <h1>练习模式</h1>
      </div>

      <div class="year-filter">
        <span class="year-label">年份筛选：</span>
        <div class="year-pills">
          ${ALL_YEARS.map(y => `
            <span class="year-pill ${selectedYears.includes(y) ? 'active' : ''}" data-year="${y}">${y}</span>
          `).join('')}
        </div>
        <div class="year-actions">
          <span class="year-btn" id="yearAll">全选</span>
          <span class="year-btn" id="yearNone">清空</span>
        </div>
      </div>

      <div class="practice-modes">
        <div class="mode-card mode-daily" id="modeDaily">
          <div class="mode-icon">📅</div>
          <div class="mode-body">
            <h3>每日刷题</h3>
            <p class="mode-desc">今日目标 <strong>${target}</strong> 题 · 已完成 <strong>${dailyDone}</strong> 题</p>
            <div class="mode-bar">
              <div class="mode-bar-fill" style="width:${dailyRate}%"></div>
            </div>
            <p class="mode-bar-label">${dailyRate}%</p>
          </div>
          <span class="mode-arrow">›</span>
        </div>

        <div class="mode-card" id="modeRandom">
          <div class="mode-icon">🎲</div>
          <div class="mode-body">
            <h3>随记刷题</h3>
            <p class="mode-desc">从全部题库中随机抽题，无限制自由练习</p>
          </div>
          <span class="mode-arrow">›</span>
        </div>

        <div class="mode-card" id="modeChapter">
          <div class="mode-icon">📖</div>
          <div class="mode-body">
            <h3>章节练习</h3>
            <p class="mode-desc">按科目和章节选择题目，针对性复习</p>
          </div>
          <span class="mode-arrow">›</span>
        </div>
      </div>

      <div class="daily-settings" id="dailySettings">
        <h3>⚙️ 每日目标设置</h3>
        <div class="setting-row">
          <span>每日目标题数</span>
          <div class="setting-control">
            <button class="btn-icon-sm" id="decTarget">−</button>
            <span class="setting-value" id="targetVal">${target}</span>
            <button class="btn-icon-sm" id="incTarget">+</button>
          </div>
        </div>
        <p class="dim">推荐每日 20~50 题，保持连续学习</p>
      </div>

      <div class="section">
        <h2>📊 今日概览</h2>
        <div class="daily-summary">
          <div class="ds-item">
            <span class="ds-num">${dailyDone}</span>
            <span class="ds-label">今日已做</span>
          </div>
          <div class="ds-item">
            <span class="ds-num">${Math.max(0, target - dailyDone)}</span>
            <span class="ds-label">剩余目标</span>
          </div>
          <div class="ds-item">
            <span class="ds-num">${totalAnswered}</span>
            <span class="ds-label">累计答题</span>
          </div>
          <div class="ds-item">
            <span class="ds-num">${totalQs}</span>
            <span class="ds-label">题库总数</span>
          </div>
        </div>
      </div>
    </div>
  `

  function updateYearPills() {
    container.querySelectorAll('.year-pill').forEach(el => {
      const y = parseInt(el.dataset.year)
      el.classList.toggle('active', getSelectedYears().includes(y))
    })
  }

  container.querySelectorAll('.year-pill').forEach(el => {
    el.addEventListener('click', () => {
      const y = parseInt(el.dataset.year)
      const current = getSelectedYears()
      const idx = current.indexOf(y)
      if (idx >= 0) current.splice(idx, 1)
      else current.push(y)
      current.sort((a,b) => a - b)
      setSelectedYears(current)
      updateYearPills()
    })
  })

  container.querySelector('#yearAll').addEventListener('click', () => {
    setSelectedYears([...ALL_YEARS])
    updateYearPills()
  })

  container.querySelector('#yearNone').addEventListener('click', () => {
    setSelectedYears([])
    updateYearPills()
  })

  container.querySelector('#modeDaily').addEventListener('click', () => navigate('practice', { mode: 'daily' }))
  container.querySelector('#modeRandom').addEventListener('click', () => navigate('practice', { mode: 'random' }))
  container.querySelector('#modeChapter').addEventListener('click', () => navigate('subjects'))

  container.querySelector('#decTarget').addEventListener('click', () => {
    const v = Math.max(5, target - 5); setDailyTarget(v)
    refreshTargetUI(v)
  })
  container.querySelector('#incTarget').addEventListener('click', () => {
    const v = Math.min(200, target + 5); setDailyTarget(v)
    refreshTargetUI(v)
  })

  function refreshTargetUI(v) {
    const newRate = Math.min(100, Math.round(dailyDone / v * 100))
    container.querySelector('#targetVal').textContent = v
    container.querySelector('.mode-daily .mode-desc').innerHTML = `今日目标 <strong>${v}</strong> 题 · 已完成 <strong>${dailyDone}</strong> 题`
    container.querySelector('.mode-bar-fill').style.width = newRate + '%'
    container.querySelector('.mode-bar-label').textContent = newRate + '%'
    container.querySelector('.ds-item:nth-child(2) .ds-num').textContent = Math.max(0, v - dailyDone)
  }
}
