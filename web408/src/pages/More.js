import { exportData, importData, clearAllData } from '../storage.js'
import { navigate } from '../router.js'

export function renderMore(container) {
  container.innerHTML = `
    <div class="page">
      <div class="page-header">
        <h1>⚙️ 更多</h1>
      </div>

      <div class="more-list">
        <div class="more-item" id="btnFav">
          <span class="more-icon">⭐</span>
          <span class="more-text">收藏夹</span>
          <span class="more-arrow">›</span>
        </div>
        <div class="more-item" id="btnStats">
          <span class="more-icon">📊</span>
          <span class="more-text">学习统计</span>
          <span class="more-arrow">›</span>
        </div>
        <div class="more-item" id="btnExport">
          <span class="more-icon">📤</span>
          <span class="more-text">导出数据</span>
          <span class="more-arrow">›</span>
        </div>
        <div class="more-item" id="btnImport">
          <span class="more-icon">📥</span>
          <span class="more-text">导入数据</span>
          <span class="more-arrow">›</span>
        </div>
        <div class="more-item danger" id="btnClear">
          <span class="more-icon">🗑️</span>
          <span class="more-text">清除全部数据</span>
          <span class="more-arrow">›</span>
        </div>
      </div>

      <div class="more-about">
        <p>408 刷题助手 v1.0</p>
        <p class="dim">数据存储在浏览器本地，导出JSON文件可备份或迁移</p>
      </div>
    </div>
  `

  container.querySelector('#btnFav').addEventListener('click', () => navigate('favorites'))
  container.querySelector('#btnStats').addEventListener('click', () => navigate('stats'))

  container.querySelector('#btnExport').addEventListener('click', () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `408-data-${getDateStr()}.json`
    a.click()
    URL.revokeObjectURL(url)
  })

  container.querySelector('#btnImport').addEventListener('click', () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return
      try {
        const text = await file.text()
        const data = JSON.parse(text)
        if (importData(data)) {
          alert('✅ 数据导入成功！')
          navigate('home')
        } else {
          alert('❌ 数据格式错误')
        }
      } catch {
        alert('❌ 文件解析失败')
      }
    }
    input.click()
  })

  container.querySelector('#btnClear').addEventListener('click', () => {
    if (confirm('确定要清除全部学习数据吗？此操作不可恢复！')) {
      if (confirm('再次确认：清除所有答题记录、错题和收藏？')) {
        clearAllData()
        alert('已清除全部数据')
        navigate('home')
      }
    }
  })
}

function getDateStr() {
  const d = new Date()
  return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`
}
