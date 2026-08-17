import { subjects, knowledgeMap } from './knowledge.js'
import { questions } from './questions.js'
import { wdQuestions } from './wangdao-questions.js'
import { contrasts } from './contrasts.js'

export { subjects, knowledgeMap, questions, wdQuestions, contrasts }

export const allQuestions = [...questions, ...wdQuestions]

export const yearList = [...new Set(allQuestions.filter(q => q.year).map(q => q.year))].sort((a, b) => a - b)

// 后续做题记录会关联题目ID指向的知识点
// 用于统计每个知识点的正确率
