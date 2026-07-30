import { navigate, getRoute } from '../router.js'

const tabs = [
  { id: 'home', label: '首页', icon: '📊' },
  { id: 'subjects', label: '刷题', icon: '📝' },
  { id: 'wrongbook', label: '错题', icon: '❌' },
  { id: 'knowledge', label: '知识', icon: '📚' },
  { id: 'more', label: '更多', icon: '⚙️' },
]

export function renderNavBar(container) {
  const current = getRoute()
  const activeMain = getMainRoute(current)
  container.innerHTML = `<div class="nav-bar">${tabs.map(t => `
    <div class="nav-item ${activeMain === t.id ? 'active' : ''}" data-route="${t.id}">
      <span class="nav-icon">${t.icon}</span>
      <span class="nav-label">${t.label}</span>
    </div>
  `).join('')}</div>`

  container.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => {
      const route = el.dataset.route
      const routes = {
        home: 'home',
        subjects: 'practicehub',
        wrongbook: 'wrongbook',
        knowledge: 'knowledge',
        more: 'more',
      }
      navigate(routes[route] || 'home')
    })
  })
}

function getMainRoute(route) {
  const map = { home:'home', practicehub:'subjects', subjects:'subjects', practice:'subjects', wrongbook:'wrongbook', knowledge:'knowledge', knowledgeDetail:'knowledge', flashcard:'knowledge', contrast:'knowledge', favorites:'more', stats:'more', more:'more' }
  return map[route] || 'home'
}

export function updateNavBar() {
  document.querySelectorAll('.nav-item').forEach(el => {
    const route = el.dataset.route
    const current = getRoute()
    el.classList.toggle('active', getMainRoute(current) === route)
  })
}
