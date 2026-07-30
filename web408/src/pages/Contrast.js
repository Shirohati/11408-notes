import { contrasts, subjects } from '../data/index.js'
import { navigate, goBack } from '../router.js'

export function renderContrast(container) {
  let filterSub = ''

  function render() {
    let list = contrasts
    if (filterSub) list = list.filter(c => c.subjectId === filterSub)

    container.innerHTML = `
      <div class="page">
        <div class="page-header">
          <button class="btn-back" id="btnBack">← 返回</button>
          <h1>📋 对比记忆</h1>
        </div>
        <div class="filter-bar">
          <button class="btn-filter ${!filterSub ? 'active' : ''}" data-sub="">全部</button>
          ${subjects.map(s => `
            <button class="btn-filter ${filterSub === s.id ? 'active' : ''}" data-sub="${s.id}">${s.shortName}</button>
          `).join('')}
        </div>
        <div class="contrast-list">
          ${list.map(ct => `
            <div class="contrast-card">
              <h3 class="contrast-title">${ct.name}</h3>
              <div class="contrast-table-wrap">
                <table class="contrast-table">
                  <thead>
                    <tr>${ct.headers.map(h => `<th>${h}</th>`).join('')}</tr>
                  </thead>
                  <tbody>
                    ${ct.rows.map(row => `
                      <tr>${row.map((cell, i) => `<td>${i === 0 ? `<strong>${cell}</strong>` : cell}</td>`).join('')}</tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `

    container.querySelector('#btnBack').addEventListener('click', () => goBack('knowledge'))

    container.querySelectorAll('.btn-filter').forEach(el => {
      el.addEventListener('click', () => {
        filterSub = el.dataset.sub
        render()
      })
    })
  }

  render()
}
