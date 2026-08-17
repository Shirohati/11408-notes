import katex from 'katex'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'

const options = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
  ],
  throwOnError: false,
  errorColor: '#c0392b',
  strict: false,
}

export function renderMath(el) {
  if (!el) return
  try {
    renderMathInElement(el, options)
  } catch (e) {
    /* 渲染失败时保留原文 */
  }
}

export { katex }
