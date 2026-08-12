# 408 刷题助手 - 开发者文档

## 技术栈

| 层面 | 技术 |
|------|------|
| 构建工具 | [Vite](https://vitejs.dev/) 8.x |
| 语言 | Vanilla JavaScript (ES Modules) |
| 样式 | 原生 CSS（清爽浅色主题） |
| 存储 | browser localStorage |
| 部署 | 静态文件，可部署至 GitHub Pages |

## 项目结构

```
web408/
├── index.html              # 入口 HTML
├── package.json            # Vite 配置 & 依赖
├── DEVELOPER.md            # 本文档（开发者指南）
├── scripts/
│   └── sync-docs.js        # 文档同步脚本（更新本文件统计数据）
├── src/
│   ├── main.js             # 应用入口，路由注册
│   ├── router.js           # 前端 SPA 路由
│   ├── storage.js           # localStorage 数据读写（答题/错题/收藏/日志）
│   ├── style.css            # 全局样式（响应式）
│   ├── data/
│   │   ├── index.js         # 统一导出
│   │   ├── knowledge.js     # 知识点目录（四科全量）
│   │   ├── questions.js     # 题库
│   │   └── contrasts.js     # 对比记忆表
│   ├── pages/               # 页面模块（每个文件导出一个 render 函数）
│   │   ├── Home.js          # 首页仪表盘
│   │   ├── SubjectSelect.js # 选科选章
│   │   ├── Practice.js      # 刷题界面
│   │   ├── WrongBook.js     # 错题本
│   │   ├── Knowledge.js     # 知识点树 & 详情
│   │   ├── Contrast.js      # 对比记忆页
│   │   ├── FlashCard.js     # 速记闪卡
│   │   ├── Favorites.js     # 收藏夹
│   │   ├── Stats.js         # 统计看板
│   │   └── More.js          # 设置 & 数据管理
│   └── components/          # 可复用组件
│       ├── NavBar.js        # 底部导航栏
│       ├── QuestionCard.js  # 题目卡片（选项/对错/标签）
│       └── ProgressRing.js  # SVG 进度环
```

## 核心数据格式

### 题目 (questions.js)

```javascript
{
  id: 'DS_001',                          // 唯一标识: 科目_序号
  subject: 'ds',                         // 科目 ID: ds/co/os/cn
  chapter: 'ds_linear_list',            // 章节 ID (需与 knowledge.js 一致)
  knowledgePoints: ['ds_ll_definition'], // 关联知识点 ID 数组
  question: '题目内容',                   // 题目标题
  options: ['A. xxx', 'B. xxx', ...],    // 选项列表
  answer: 'A',                           // 正确答案
  explanation: '解析内容',                // 详细解析
  source: '真题',                         // 来源（真题/王道等，可选）
  year: 2020                             // 年份（可选）
}
```

### 知识点 (knowledge.js)

```javascript
{
  id: 'ds_ll_definition',    // 唯一标识
  name: '线性表的定义和基本操作', // 名称
  summary: ['要点1', '要点2'], // 核心要点列表（用于闪卡）
  mnemonic: '记忆口诀',       // 口诀（用于闪卡）
}
```

知识点按 **科目 → 章节 → 知识点** 三层组织。每科一个对象，包含 `chapters` 数组，每章包含 `points` 数组。

### 知识点扁平映射

`knowledgeMap` 对象在 `knowledge.js` 中自动生成，key 为知识点 ID，value 为展开后的对象（包含 `chapterName`、`subjectName` 等）。所有页面通过 `knowledgeMap[id]` 快速获取知识点信息。

### 对比记忆 (contrasts.js)

```javascript
{
  id: 'ct_seq_vs_link',                 // 唯一标识
  name: '顺序表 vs 链表',               // 对比标题
  subjectId: 'ds',                      // 所属科目
  headers: ['维度', '顺序表', '链表'],   // 表头
  rows: [['存储方式', '连续', '分散'],]  // 数据行
}
```

## 数据流

```
用户点击选项
  → storage.setAnswer(questionId, answer) → localStorage
  → 若错误: storage.addWrong(questionId) → localStorage
  → QuestionCard 重新渲染显示结果

用户收藏
  → storage.toggleFavorite(questionId) → localStorage

统计页面
  → storage.getAnswers() + storage.getDailyLog() → 渲染图表

知识点掌握度
  → 从 storage.getAnswers() + storage.getWrongs() 动态计算
  → 红黄绿三色标记

数据导出/导入
  → storage.exportData() → JSON 文件下载
  → 选择 JSON 文件 → storage.importData() → 覆盖 localStorage
```

## 路由表

| 路由 | 页面 | 参数 |
|------|------|------|
| `home` | 首页 | - |
| `subjects` | 选科选章 | - |
| `practice` | 刷题 | `mode: random/chapter/single`, `chapter: 章节ID`, `questionId: 题目ID` |
| `wrongbook` | 错题本 | - |
| `knowledge` | 知识点树 | - |
| `knowledgeDetail` | 知识点详情 | `knowledgeId: 知识点ID` |
| `contrast` | 对比记忆 | - |
| `flashcard` | 速记闪卡 | - |
| `favorites` | 收藏夹 | - |
| `stats` | 统计 | - |
| `more` | 设置 | - |

## 添加指南

### 添加题目

1. 打开 `src/data/questions.js`
2. 在数组中追加新题目对象，注意：
   - `id` 格式为 `DS_XXX`、`CO_XXX`、`OS_XXX`、`CN_XXX`
   - `subject` 与 `chapter` 必须与 `knowledge.js` 中定义一致
   - `knowledgePoints` 数组中的 ID 必须在 `knowledge.js` 中存在
3. 运行 `npm run dev` 验证新题目正常显示

### 添加知识点

1. 打开 `src/data/knowledge.js`
2. 找到对应科目的对应章节，在 `points` 数组中追加
3. 确保每道引用该知识点的题目都更新了 `knowledgePoints` 字段
4. `summary` 列表建议 2~5 条，每条聚焦一个要点
5. `mnemonic` 建议押韵短句，方便记忆

### 添加对比记忆表

1. 打开 `src/data/contrasts.js`
2. 追加新对象，`subjectId` 关联到对应科目
3. `headers` 第一列通常是比较维度，后续列是对比项

### 新增页面

1. 在 `src/pages/` 下新建文件，导出一个 `render(container)` 函数
2. 在 `src/main.js` 中 import 并注册到 `pages` 对象
3. 如果需要在底部导航栏添加入口，编辑 `src/components/NavBar.js`

## 同步文档

修改代码后，运行以下命令更新本文档的统计数据：

```bash
npm run docs
```

这会自动更新：
- 题目总数和各科分布
- 知识点总数和各科分布
- 对比记忆表数量
- 文件列表和代码行数

<!-- SYNC START -->
## 当前项目状态（自动同步）

> 最后同步: 2026-07-30 22:42
> 执行 `npm run docs` 更新

### 题库统计

| 科目 | 题目数 | 章节数 | 知识点数 |
|------|--------|--------|----------|
| 数据结构 | 29 | 6 | 31 |
| 计算机组成原理 | 24 | 7 | 24 |
| 操作系统 | 22 | 5 | 18 |
| 计算机网络 | 25 | 6 | 19 |
| **总计** | **100** | **24** | **92** |

### 知识点统计

| 科目 | 章节数 | 知识点数 |
|------|--------|----------|
| 数据结构 | 6 | 31 |
| 计算机组成原理 | 7 | 24 |
| 操作系统 | 5 | 18 |
| 计算机网络 | 6 | 19 |
| **总计** | **24** | **92** |

知识点最多的章节: **数据结构 - 图**（8 个知识点）

### 对比记忆表

**总计**: 8 组

| 对比表 | 所属科目 |
|--------|----------|
| 顺序表 vs 链表 | 数据结构 |
| 栈 vs 堆（内存结构） | 计算机组成原理 |
| 分页 vs 分段 | 操作系统 |
| 主要排序算法对比 | 数据结构 |
| TCP vs UDP | 计算机网络 |
| Cache映射方式对比 | 计算机组成原理 |
| 进程调度算法对比 | 操作系统 |
| I/O控制方式对比 | 操作系统 |

### 文件统计

| 类型 | 数量 | 代码行数 |
|------|------|----------|
| 页面 | 11 | 1188 |
| 组件 | 3 | 139 |
| 数据 | 4 | 527 |
| 核心模块 | 4 | 536 |
| **总计** | **22** | **2390** |
<!-- SYNC END -->

## 开发命令

```bash
npm run dev      # 启动开发服务器（热更新）
npm run build    # 构建生产版本 → dist/
npm run preview  # 预览构建结果
npm run docs     # 同步更新本文档统计数据
```

## 部署到 GitHub Pages

```bash
npm run build
# 将 dist/ 目录推送到 GitHub Pages
# 或者使用 gh-pages 包: npx gh-pages -d dist
```
