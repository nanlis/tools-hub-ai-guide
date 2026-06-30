import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type CategoryId = 'chat' | 'image' | 'video' | 'audio' | 'code' | 'office' | 'ppt' | 'agent'

type Category = {
  id: CategoryId
  icon: string
  name: string
  count: number
}

type Tool = {
  id: number
  name: string
  category: CategoryId
  tagline: string
  description: string
  price: '免费' | '免费增值' | '付费'
  score: number
  url: string
  tags: string[]
  isNew?: boolean
}

const categories: Category[] = [
  { id: 'chat', icon: '💬', name: 'AI 对话', count: 9 },
  { id: 'image', icon: '🎨', name: 'AI 绘图', count: 8 },
  { id: 'video', icon: '🎬', name: 'AI 视频', count: 7 },
  { id: 'audio', icon: '🎵', name: 'AI 音乐 & 语音', count: 5 },
  { id: 'code', icon: '💻', name: 'AI 编程', count: 7 },
  { id: 'office', icon: '🔎', name: 'AI 搜索 & 办公', count: 6 },
  { id: 'ppt', icon: '✍️', name: 'AI 写作 & PPT', count: 5 },
  { id: 'agent', icon: '🤖', name: 'AI Agent', count: 5 },
]

const tools: Tool[] = [
  {
    id: 1,
    name: 'Claude',
    category: 'chat',
    tagline: '长文档分析和写作助手',
    description: '适合长上下文阅读、总结、写作、代码协作。',
    price: '免费增值',
    score: 4.8,
    url: 'https://claude.ai',
    tags: ['长文', '写作'],
  },
  {
    id: 2,
    name: 'ChatGPT',
    category: 'chat',
    tagline: '通用 AI 助手',
    description: '问答、写作、代码解释、资料整理和工作流自动化。',
    price: '免费增值',
    score: 4.9,
    url: 'https://chatgpt.com',
    tags: ['聊天', '代码'],
  },
  {
    id: 3,
    name: 'DeepSeek',
    category: 'chat',
    tagline: '推理和中文问答',
    description: '适合中文问答、代码解释、数学和复杂推理。',
    price: '免费增值',
    score: 4.7,
    url: 'https://chat.deepseek.com',
    tags: ['推理', '中文'],
  },
  {
    id: 4,
    name: 'Gemini',
    category: 'chat',
    tagline: 'Google 多模态助手',
    description: '适合搜索、文档、图片和 Google 生态任务。',
    price: '免费增值',
    score: 4.6,
    url: 'https://gemini.google.com',
    tags: ['多模态'],
  },
  {
    id: 5,
    name: 'Grok',
    category: 'chat',
    tagline: 'X 平台实时信息助手',
    description: '适合实时热点、社媒内容和趋势判断。',
    price: '付费',
    score: 4.3,
    url: 'https://grok.com',
    tags: ['实时'],
  },
  {
    id: 6,
    name: 'Kimi',
    category: 'chat',
    tagline: '长文本阅读助手',
    description: '适合长文档、PDF、网页和中文资料整理。',
    price: '免费增值',
    score: 4.5,
    url: 'https://kimi.moonshot.cn',
    tags: ['长文'],
  },
  {
    id: 7,
    name: 'Midjourney',
    category: 'image',
    tagline: '高质量视觉生成',
    description: '适合海报、概念图、广告视觉和风格探索。',
    price: '付费',
    score: 4.8,
    url: 'https://www.midjourney.com',
    tags: ['图片', '设计'],
  },
  {
    id: 8,
    name: 'Flux',
    category: 'image',
    tagline: '高质量开源图像模型',
    description: '适合写实图片、产品图和创意视觉生成。',
    price: '免费增值',
    score: 4.6,
    url: 'https://blackforestlabs.ai',
    tags: ['开源'],
  },
  {
    id: 9,
    name: 'Stable Diffusion',
    category: 'image',
    tagline: '可控图像生成',
    description: '适合本地部署、模型微调和复杂图像工作流。',
    price: '免费',
    score: 4.6,
    url: 'https://stability.ai',
    tags: ['本地'],
  },
  {
    id: 10,
    name: 'Adobe Firefly',
    category: 'image',
    tagline: '商用设计图像生成',
    description: '适合品牌设计、广告素材和 Adobe 工作流。',
    price: '免费增值',
    score: 4.4,
    url: 'https://firefly.adobe.com',
    tags: ['商用'],
  },
  {
    id: 11,
    name: 'Canva AI',
    category: 'image',
    tagline: '模板化营销设计',
    description: '适合社媒图、PPT、广告和轻量设计。',
    price: '免费增值',
    score: 4.6,
    url: 'https://www.canva.com/ai',
    tags: ['模板'],
  },
  {
    id: 12,
    name: 'Runway',
    category: 'video',
    tagline: 'AI 视频创作套件',
    description: '文生视频、视频编辑、抠像和扩展画面。',
    price: '免费增值',
    score: 4.7,
    url: 'https://runwayml.com',
    tags: ['视频', '剪辑'],
  },
  {
    id: 13,
    name: 'Kling',
    category: 'video',
    tagline: '高质量视频生成',
    description: '适合短视频、镜头生成和画面延展。',
    price: '免费增值',
    score: 4.5,
    url: 'https://klingai.com',
    tags: ['短视频'],
  },
  {
    id: 14,
    name: 'Pika',
    category: 'video',
    tagline: '创意视频生成',
    description: '适合动画、社媒短片和快速视频原型。',
    price: '免费增值',
    score: 4.4,
    url: 'https://pika.art',
    tags: ['动画'],
  },
  {
    id: 15,
    name: 'HeyGen',
    category: 'video',
    tagline: '数字人与视频翻译',
    description: '适合口播视频、数字人和多语言营销内容。',
    price: '付费',
    score: 4.4,
    url: 'https://www.heygen.com',
    tags: ['数字人'],
    isNew: true,
  },
  {
    id: 16,
    name: 'Suno',
    category: 'audio',
    tagline: 'AI 音乐生成',
    description: '用提示词生成歌曲、配乐和社媒音频。',
    price: '免费增值',
    score: 4.6,
    url: 'https://suno.com',
    tags: ['音乐'],
  },
  {
    id: 17,
    name: 'ElevenLabs',
    category: 'audio',
    tagline: 'AI 语音和配音',
    description: '高质量语音合成、配音和音色克隆。',
    price: '免费增值',
    score: 4.7,
    url: 'https://elevenlabs.io',
    tags: ['配音'],
  },
  {
    id: 18,
    name: 'Udio',
    category: 'audio',
    tagline: '歌曲和音乐生成',
    description: '适合生成完整歌曲、音乐片段和创意 Demo。',
    price: '免费增值',
    score: 4.4,
    url: 'https://www.udio.com',
    tags: ['歌曲'],
    isNew: true,
  },
  {
    id: 19,
    name: 'Cursor',
    category: 'code',
    tagline: 'AI 原生代码编辑器',
    description: '代码库问答、补全、重构和聊天式编程。',
    price: '免费增值',
    score: 4.8,
    url: 'https://cursor.com',
    tags: ['IDE'],
  },
  {
    id: 20,
    name: 'Claude Code',
    category: 'code',
    tagline: '终端编程代理',
    description: '适合在真实代码库里规划、修改和验证。',
    price: '付费',
    score: 4.7,
    url: 'https://www.anthropic.com/claude-code',
    tags: ['Agent'],
  },
  {
    id: 21,
    name: 'GitHub Copilot',
    category: 'code',
    tagline: 'IDE 代码助手',
    description: '补全、解释、测试和 GitHub 工作流集成。',
    price: '付费',
    score: 4.5,
    url: 'https://github.com/features/copilot',
    tags: ['IDE'],
  },
  {
    id: 22,
    name: 'Windsurf',
    category: 'code',
    tagline: 'AI 编程工作区',
    description: '适合多文件编辑、代码理解和前端开发。',
    price: '免费增值',
    score: 4.4,
    url: 'https://windsurf.com',
    tags: ['编辑器'],
  },
  {
    id: 23,
    name: 'Perplexity',
    category: 'office',
    tagline: '带来源的答案搜索',
    description: '适合调研、溯源、竞品研究和新闻追踪。',
    price: '免费增值',
    score: 4.7,
    url: 'https://www.perplexity.ai',
    tags: ['搜索'],
  },
  {
    id: 24,
    name: 'NotebookLM',
    category: 'office',
    tagline: '资料库问答',
    description: '上传资料后做问答、摘要和研究笔记。',
    price: '免费',
    score: 4.5,
    url: 'https://notebooklm.google.com',
    tags: ['资料'],
  },
  {
    id: 25,
    name: 'Notion AI',
    category: 'office',
    tagline: '文档和知识库助手',
    description: '团队文档总结、改写、任务和知识整理。',
    price: '付费',
    score: 4.5,
    url: 'https://www.notion.com/product/ai',
    tags: ['知识库'],
  },
  {
    id: 26,
    name: '飞书 AI',
    category: 'office',
    tagline: '协作文档助手',
    description: '适合会议、文档、项目和团队协作场景。',
    price: '免费增值',
    score: 4.3,
    url: 'https://www.feishu.cn',
    tags: ['协作'],
  },
  {
    id: 27,
    name: 'Jasper',
    category: 'ppt',
    tagline: '营销写作助手',
    description: '适合广告、邮件、博客和品牌内容生成。',
    price: '付费',
    score: 4.3,
    url: 'https://www.jasper.ai',
    tags: ['营销'],
  },
  {
    id: 28,
    name: 'Copy.ai',
    category: 'ppt',
    tagline: '销售和营销文案',
    description: '适合邮件、社媒、落地页和销售话术。',
    price: '免费增值',
    score: 4.2,
    url: 'https://www.copy.ai',
    tags: ['文案'],
  },
  {
    id: 29,
    name: 'Gamma',
    category: 'ppt',
    tagline: 'AI 演示文稿生成',
    description: '输入主题生成演示、页面和提案初稿。',
    price: '免费增值',
    score: 4.5,
    url: 'https://gamma.app',
    tags: ['PPT'],
  },
  {
    id: 30,
    name: 'Coze',
    category: 'agent',
    tagline: '可视化 Agent 搭建',
    description: '适合创建聊天机器人、工作流和插件应用。',
    price: '免费增值',
    score: 4.4,
    url: 'https://www.coze.com',
    tags: ['Agent'],
  },
  {
    id: 31,
    name: 'Dify',
    category: 'agent',
    tagline: 'AI 应用开发平台',
    description: '适合搭建 RAG、工作流和企业内部 AI 应用。',
    price: '免费增值',
    score: 4.5,
    url: 'https://dify.ai',
    tags: ['RAG'],
  },
  {
    id: 32,
    name: 'n8n',
    category: 'agent',
    tagline: '自动化工作流',
    description: '连接工具、模型和 API，搭建自动化流程。',
    price: '免费增值',
    score: 4.4,
    url: 'https://n8n.io',
    tags: ['自动化'],
  },
]

const updates = [
  'NEW 榜单：9 个值得收藏的 AI 工具导航站',
  '教程：写作 / 图像 / 视频 / 编程工具怎么选',
  '新增：HeyGen、Udio、Claude Code、NotebookLM',
  '提醒：先用免费额度验证流程，再决定付费',
]

const priceOptions = ['全部', '免费', '免费增值', '付费'] as const
type PriceOption = (typeof priceOptions)[number]

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | '全部'>('全部')
  const [price, setPrice] = useState<PriceOption>('全部')
  const [sort, setSort] = useState('推荐')
  const [favorites, setFavorites] = useState<number[]>([1, 19])
  const [compare, setCompare] = useState<number[]>([])
  const [assistantQuestion, setAssistantQuestion] = useState('我想做中文短视频账号，应该先看哪些工具？')
  const [showSubmit, setShowSubmit] = useState(false)

  const visibleTools = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return tools
      .filter((tool) => category === '全部' || tool.category === category)
      .filter((tool) => price === '全部' || tool.price === price)
      .filter((tool) => {
        if (!normalized) return true
        return [tool.name, tool.tagline, tool.description, ...tool.tags].join(' ').toLowerCase().includes(normalized)
      })
      .sort((a, b) => {
        if (sort === '评分') return b.score - a.score
        if (sort === '最新') return Number(b.isNew) - Number(a.isNew) || b.id - a.id
        return b.score - a.score
      })
  }, [category, price, query, sort])

  const shownCategories = category === '全部' ? categories : categories.filter((item) => item.id === category)
  const groupedTools = shownCategories
    .map((item) => ({
      ...item,
      tools: visibleTools.filter((tool) => tool.category === item.id),
    }))
    .filter((item) => item.tools.length > 0)
  const comparedTools = tools.filter((tool) => compare.includes(tool.id))
  const suggestedTools = visibleTools.slice(0, 3)

  function toggleFavorite(id: number) {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function toggleCompare(id: number) {
    setCompare((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      return [...current.slice(-2), id]
    })
  }

  function submitTool(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setShowSubmit(false)
  }

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="ToolsHub 首页">
          <span className="brand-mark">AI</span>
          <span>工具集</span>
        </a>
        <label className="top-search">
          <span>⌕</span>
          <input
            aria-label="搜索 AI 工具"
            placeholder="搜索 AI 工具、场景、模型..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <nav className="nav-links" aria-label="快捷导航">
          <a href="#assistant">工具问答</a>
          <a href="#compare">对比</a>
          <button type="button" onClick={() => setShowSubmit(true)}>
            提交
          </button>
        </nav>
      </header>

      <div className="shell" id="top">
        <aside className="left-rail" aria-label="工具分类">
          <button className={category === '全部' ? 'active' : ''} type="button" onClick={() => setCategory('全部')}>
            <span>🏠</span>
            <strong>全部工具</strong>
          </button>
          {categories.map((item) => (
            <button
              className={category === item.id ? 'active' : ''}
              type="button"
              key={item.id}
              onClick={() => setCategory(item.id)}
            >
              <span>{item.icon}</span>
              <strong>{item.name}</strong>
            </button>
          ))}
          <button className="submit-entry" type="button" onClick={() => setShowSubmit(true)}>
            + 提交工具
          </button>
        </aside>

        <section className="main-column">
          <section className="compact-hero">
            <div>
              <p className="eyebrow">AI Tools Directory</p>
              <h1>AI 工具导航</h1>
              <p>精选常用 AI 工具，按对话、绘图、视频、编程、办公和 Agent 分类查找。</p>
            </div>
            <div className="hero-actions">
              <select aria-label="价格筛选" value={price} onChange={(event) => setPrice(event.target.value as PriceOption)}>
                {priceOptions.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select aria-label="排序" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option>推荐</option>
                <option>评分</option>
                <option>最新</option>
              </select>
            </div>
          </section>

          {groupedTools.map((section) => (
            <section className="tool-section" key={section.id}>
              <div className="section-title">
                <h2>
                  <span>{section.icon}</span>
                  {section.name}
                </h2>
                <em>{section.tools.length}</em>
              </div>
              <div className="tool-grid">
                {section.tools.map((tool) => (
                  <article className="tool-card" key={tool.id}>
                    {tool.isNew ? <span className="new-badge">NEW</span> : null}
                    <button
                      className={favorites.includes(tool.id) ? 'info-button saved' : 'info-button'}
                      type="button"
                      aria-label={`收藏 ${tool.name}`}
                      onClick={() => toggleFavorite(tool.id)}
                    >
                      i
                    </button>
                    <div className="tool-head">
                      <span className={`tool-logo tone-${tool.category}`}>{tool.name.slice(0, 1)}</span>
                      <div>
                        <h3>{tool.name}</h3>
                        <p>{tool.tagline}</p>
                      </div>
                    </div>
                    <p className="description">{tool.description}</p>
                    <div className="card-actions">
                      <a href={tool.url} target="_blank" rel="noreferrer">
                        官网
                      </a>
                      <button
                        className={compare.includes(tool.id) ? 'active-compare' : ''}
                        type="button"
                        onClick={() => toggleCompare(tool.id)}
                      >
                        对比
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="compare-section" id="compare">
            <div className="section-title">
              <h2>🧩 工具对比</h2>
              <em>{comparedTools.length}</em>
            </div>
            {comparedTools.length === 0 ? (
              <p className="empty-state">点击卡片里的「对比」，这里会显示工具定位、价格和评分。</p>
            ) : (
              <div className="compare-table">
                {comparedTools.map((tool) => (
                  <div className="compare-item" key={tool.id}>
                    <strong>{tool.name}</strong>
                    <span>{categories.find((item) => item.id === tool.category)?.name}</span>
                    <span>{tool.price}</span>
                    <span>{tool.score} / 5</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>

        <aside className="right-rail" id="assistant">
          <section className="rail-card">
            <div className="rail-title">
              <strong>更新日志</strong>
              <span>2026-06-30</span>
            </div>
            <ul className="updates">
              {updates.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="rail-card">
            <div className="rail-title">
              <strong>AI 工具助手</strong>
              <span>Beta</span>
            </div>
            <textarea
              aria-label="输入需求"
              value={assistantQuestion}
              onChange={(event) => setAssistantQuestion(event.target.value)}
            />
            <div className="suggestions">
              {suggestedTools.map((tool) => (
                <button type="button" key={tool.id} onClick={() => setQuery(tool.name)}>
                  {tool.name}
                </button>
              ))}
            </div>
            <p>建议先看 {suggestedTools.map((tool) => tool.name).join('、') || '当前筛选结果'}，先用免费额度验证流程。</p>
          </section>
          <section className="rail-card">
            <div className="rail-title">
              <strong>实时热点</strong>
              <span>{visibleTools.length}</span>
            </div>
            <div className="topic-list">
              <span>AI 视频生成</span>
              <span>编程 Agent</span>
              <span>知识库问答</span>
              <span>图像工作流</span>
            </div>
          </section>
        </aside>
      </div>

      {showSubmit ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowSubmit(false)}>
          <form className="submit-modal" onSubmit={submitTool} onMouseDown={(event) => event.stopPropagation()}>
            <h2>提交 AI 工具</h2>
            <input required placeholder="工具名称" aria-label="工具名称" />
            <input required placeholder="官网链接" aria-label="官网链接" />
            <textarea required placeholder="一句话说明适合什么场景" aria-label="工具说明" />
            <div className="modal-actions">
              <button type="button" onClick={() => setShowSubmit(false)}>
                取消
              </button>
              <button className="primary-button" type="submit">
                提交
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  )
}

export default App
