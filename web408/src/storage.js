const KEYS = {
  answers: 'wk_answers',
  favorites: 'wk_favorites',
  wrongs: 'wk_wrongs',
  dailyLog: 'wk_daily_log',
  dailyTarget: 'wk_daily_target',
  todayAnswered: 'wk_today_answered',
}

function load(key, fallback) {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

// 答题记录: { questionId: selectedAnswer }
export function getAnswers() {
  return load(KEYS.answers, {})
}
export function setAnswer(qid, answer) {
  const data = getAnswers()
  data[qid] = answer
  save(KEYS.answers, data)
  recordDaily()
  recordTodayAnswered(qid)
}

// 收藏: Set-like object { questionId: true }
export function getFavorites() {
  return load(KEYS.favorites, {})
}
export function toggleFavorite(qid) {
  const data = getFavorites()
  if (data[qid]) delete data[qid]
  else data[qid] = true
  save(KEYS.favorites, data)
  return data[qid] !== undefined
}

// 错题: { questionId: wrongCount }
export function getWrongs() {
  return load(KEYS.wrongs, {})
}
export function addWrong(qid) {
  const data = getWrongs()
  data[qid] = (data[qid] || 0) + 1
  save(KEYS.wrongs, data)
}
export function removeWrong(qid) {
  const data = getWrongs()
  delete data[qid]
  save(KEYS.wrongs, data)
}

// 每日记录
function getTodayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
export function getDailyLog() {
  return load(KEYS.dailyLog, {})
}
function recordDaily() {
  const log = getDailyLog()
  const key = getTodayKey()
  log[key] = (log[key] || 0) + 1
  save(KEYS.dailyLog, log)
}

// 每日答题目标
export function getDailyTarget() {
  return load(KEYS.dailyTarget, 30)
}
export function setDailyTarget(n) {
  save(KEYS.dailyTarget, Math.max(1, Math.min(200, n)))
}

// 今日已答题目的 ID 列表
function getRawTodayAnswered() {
  return load(KEYS.todayAnswered, {})
}
export function getTodayAnsweredIds() {
  const data = getRawTodayAnswered()
  return data[getTodayKey()] || []
}
function recordTodayAnswered(qid) {
  const data = getRawTodayAnswered()
  const key = getTodayKey()
  if (!data[key]) data[key] = []
  if (!data[key].includes(qid)) data[key].push(qid)
  save(KEYS.todayAnswered, data)
}

// 年份筛选
export function getSelectedYears() {
  return load('wk_selected_years', [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020])
}
export function setSelectedYears(years) {
  save('wk_selected_years', years)
}

// 导出/导入所有数据
export function exportData() {
  return {
    answers: getAnswers(),
    favorites: getFavorites(),
    wrongs: getWrongs(),
    dailyLog: getDailyLog(),
    dailyTarget: getDailyTarget(),
    todayAnswered: getRawTodayAnswered(),
    exportTime: new Date().toISOString(),
  }
}

export function importData(json) {
  if (!json || !json.answers) return false
  save(KEYS.answers, json.answers || {})
  save(KEYS.favorites, json.favorites || {})
  save(KEYS.wrongs, json.wrongs || {})
  save(KEYS.dailyLog, json.dailyLog || {})
  if (json.dailyTarget) save(KEYS.dailyTarget, json.dailyTarget)
  if (json.todayAnswered) save(KEYS.todayAnswered, json.todayAnswered)
  return true
}

export function clearAllData() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k))
}
