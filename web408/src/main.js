import './style.css'
import { onRouteChange, navigate } from './router.js'
import { renderNavBar } from './components/NavBar.js'
import { renderHome } from './pages/Home.js'
import { renderPracticeHub } from './pages/PracticeHub.js'
import { renderSubjectSelect } from './pages/SubjectSelect.js'
import { renderPractice } from './pages/Practice.js'
import { renderWrongBook } from './pages/WrongBook.js'
import { renderKnowledge } from './pages/Knowledge.js'
import { renderContrast } from './pages/Contrast.js'
import { renderFlashcard } from './pages/FlashCard.js'
import { renderFavorites } from './pages/Favorites.js'
import { renderStats } from './pages/Stats.js'
import { renderMore } from './pages/More.js'

const app = document.querySelector('#app')
const nav = document.querySelector('#nav')

// 初始化导航栏
renderNavBar(nav)

const pages = {
  home: renderHome,
  practicehub: renderPracticeHub,
  subjects: renderSubjectSelect,
  practice: renderPractice,
  wrongbook: renderWrongBook,
  knowledge: renderKnowledge,
  knowledgeDetail: renderKnowledge,
  contrast: renderContrast,
  flashcard: renderFlashcard,
  favorites: renderFavorites,
  stats: renderStats,
  more: renderMore,
}

// 路由分发
onRouteChange((route, params) => {
  // 清理上一个页面
  if (app._cleanup) {
    app._cleanup()
    app._cleanup = null
  }
  app.innerHTML = ''

  const renderFn = pages[route]
  if (renderFn) {
    renderFn(app)
  } else {
    renderHome(app)
  }
})

// 首页
navigate('home')
