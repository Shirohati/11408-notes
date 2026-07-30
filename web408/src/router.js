// 前端路由，支持历史栈
let currentRoute = 'home'
let params = {}
const historyStack = []
const MAX_HISTORY = 50
const listeners = []

export function getRoute() { return currentRoute }
export function getParams() { return { ...params } }

export function navigate(route, extra = {}) {
  if (historyStack.length === 0 || historyStack[historyStack.length - 1].route !== currentRoute) {
    historyStack.push({ route: currentRoute, params: { ...params } })
  }
  if (historyStack.length > MAX_HISTORY) historyStack.shift()
  currentRoute = route
  params = extra
  listeners.forEach(fn => fn(route, extra))
}

export function goBack(fallbackRoute = 'home') {
  if (historyStack.length > 0) {
    const prev = historyStack.pop()
    currentRoute = prev.route
    params = prev.params
    listeners.forEach(fn => fn(currentRoute, params))
  } else {
    navigate(fallbackRoute)
  }
}

export function canGoBack() {
  return historyStack.length > 0
}

export function clearHistory() {
  historyStack.length = 0
}

export function onRouteChange(fn) {
  listeners.push(fn)
  return () => {
    const idx = listeners.indexOf(fn)
    if (idx >= 0) listeners.splice(idx, 1)
  }
}
