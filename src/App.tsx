import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Category =
  | '全部'
  | '写作'
  | '图像'
  | '视频'
  | '开发'
  | '办公'
  | '营销'
  | '研究'

type Tool = {
  id: number
  name: string
  category: Exclude<Category, '全部'>
  tagline: string
  description: string
  price: '免费' | '免费增值' | '付费'
  score: number
  users: string
  tags: string[]
  url: string
  featured?: boolean
}

const categories: Category[] = ['全部', '写作', '图像', '视频', '开发', '办公', '营销', '研究']

const tools: Tool[] = [
  {
    id: 1,
    name: 'ChatGPT',
    category: '写作',
    tagline: '通用 AI 助手',
    description: '适合问答、写作、代码解释、资料整理和工作流自动化。',
    price: '免费增值',
    score: 4.9,
    users: '2.4B',
    tags: ['聊天', '写作', '代码'],
    url: 'https://chatgpt.com',
    featured: true,
  },
  {
    id: 2,
    name: 'Midjourney',
    category: '图像',
    tagline: '高质量视觉生成',
    description: '面向海报、概念图、广告视觉和风格探索的图像生成工具。',
    price: '付费',
    score: 4.8,
    users: '23M',
    tags: ['图片', '设计', '风格'],
    url: 'https://www.midjourney.com',
    featured: true,
  },
  {
    id: 3,
    name: 'Runway',
    category: '视频',
    tagline: 'AI 视频创作套件',
    description: '提供文生视频、视频编辑、抠像、扩展画面等创意工作流。',
    price: '免费增值',
    score: 4.7,
    users: '8M',
    tags: ['视频', '剪辑', '生成'],
    url: 'https://runwayml.com',
  },
  {
    id: 4,
    name: 'Cursor',
    category: '开发',
    tagline: 'AI 原生代码编辑器',
    description: '把代码库上下文、补全、重构和聊天式编程整合到编辑器里。',
    price: '免费增值',
    score: 4.8,
    users: '5M',
    tags: ['代码', 'IDE', '开发'],
    url: 'https://cursor.com',
    featured: true,
  },
  {
    id: 5,
    name: 'Notion AI',
    category: '办公',
    tagline: '文档和知识库助手',
    description: '在团队文档中总结、改写、生成任务和整理知识库。',
    price: '付费',
    score: 4.5,
    users: '30M',
    tags: ['笔记', '知识库', '团队'],
    url: 'https://www.notion.com/product/ai',
  },
  {
    id: 6,
    name: 'Perplexity',
    category: '研究',
    tagline: '带来源的答案搜索',
    description: '适合快速调研、资料溯源、竞品研究和新闻追踪。',
    price: '免费增值',
    score: 4.7,
    users: '15M',
    tags: ['搜索', '引用', '研究'],
    url: 'https://www.perplexity.ai',
  },
  {
    id: 7,
    name: 'Canva AI',
    category: '营销',
    tagline: '营销设计一站式工具',
    description: '快速制作社媒图、演示文稿、广告素材和品牌视觉资产。',
    price: '免费增值',
    score: 4.6,
    users: '220M',
    tags: ['设计', '营销', '模板'],
    url: 'https://www.canva.com/ai',
  },
  {
    id: 8,
    name: 'Gamma',
    category: '办公',
    tagline: 'AI 演示文稿生成',
    description: '输入主题后生成演示、页面和提案，适合快速出初稿。',
    price: '免费增值',
    score: 4.5,
    users: '50M',
    tags: ['PPT', '提案', '文档'],
    url: 'https://gamma.app',
  },
  {
    id: 9,
    name: 'ElevenLabs',
    category: '视频',
    tagline: 'AI 语音与配音',
    description: '提供高质量语音合成、配音、音色克隆和多语言音频制作。',
    price: '免费增值',
    score: 4.7,
    users: '10M',
    tags: ['语音', '配音', '音频'],
    url: 'https://elevenlabs.io',
  },
  {
    id: 10,
    name: 'Claude',
    category: '写作',
    tagline: '长文档分析助手',
    description: '适合长上下文阅读、写作、分析、代码协作和复杂推理。',
    price: '免费增值',
    score: 4.8,
    users: '20M',
    tags: ['长文', '分析', '写作'],
    url: 'https://claude.ai',
  },
  {
    id: 11,
    name: 'V0',
    category: '开发',
    tagline: '界面生成与原型',
    description: '用自然语言生成 React 界面，适合产品原型和前端起步。',
    price: '免费增值',
    score: 4.4,
    users: '3M',
    tags: ['React', 'UI', '原型'],
    url: 'https://v0.dev',
  },
  {
    id: 12,
    name: 'HubSpot AI',
    category: '营销',
    tagline: '增长与销售助手',
    description: '面向营销内容、CRM 数据、销售邮件和客户运营的 AI 套件。',
    price: '付费',
    score: 4.3,
    users: '12M',
    tags: ['CRM', '销售', '邮件'],
    url: 'https://www.hubspot.com/artificial-intelligence',
  },
]

const priceOptions = ['全部', '免费', '免费增值', '付费'] as const
type PriceOption = (typeof priceOptions)[number]

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Category>('全部')
  const [price, setPrice] = useState<PriceOption>('全部')
  const [sort, setSort] = useState('推荐')
  const [favorites, setFavorites] = useState<number[]>([1, 4])
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
        return [tool.name, tool.tagline, tool.description, tool.category, ...tool.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalized)
      })
      .sort((a, b) => {
        if (sort === '评分') return b.score - a.score
        if (sort === '热度') return Number.parseFloat(b.users) - Number.parseFloat(a.users)
        if (sort === '最新') return b.id - a.id
        return Number(b.featured) - Number(a.featured) || b.score - a.score
      })
  }, [category, price, query, sort])

  const featuredTools = tools.filter((tool) => tool.featured)
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
      <nav className="topbar" aria-label="主导航">
        <a className="brand" href="#top" aria-label="AI Tools Guide 首页">
          <span className="brand-mark">AI</span>
          <span>ToolsHub</span>
        </a>
        <div className="nav-links">
          <a href="#tools">工具库</a>
          <a href="#compare">对比</a>
          <a href="#assistant">问答助手</a>
        </div>
        <button className="primary-button" type="button" onClick={() => setShowSubmit(true)}>
          提交工具
        </button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">AI 工具导航站</p>
          <h1>用更少时间，找到真正适合任务的 AI 工具。</h1>
          <p className="hero-text">
            按场景、价格、热度和评分筛选工具。适合做成中文 AI 工具目录、出海工具站或团队内部工具库。
          </p>
          <div className="search-panel">
            <input
              aria-label="搜索 AI 工具"
              placeholder="搜索：写作、视频、代码、PPT、营销..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" onClick={() => setQuery('')}>
              清空
            </button>
          </div>
          <div className="hero-stats" aria-label="站点统计">
            <span>
              <strong>{tools.length}</strong> 个精选工具
            </span>
            <span>
              <strong>{categories.length - 1}</strong> 个分类
            </span>
            <span>
              <strong>{favorites.length}</strong> 个收藏
            </span>
          </div>
        </div>
        <div className="hero-board" aria-label="热门工具">
          <div className="board-header">
            <span>本周热门</span>
            <strong>Top Picks</strong>
          </div>
          {featuredTools.map((tool, index) => (
            <a className="hot-row" href={tool.url} target="_blank" rel="noreferrer" key={tool.id}>
              <span>{index + 1}</span>
              <div>
                <strong>{tool.name}</strong>
                <p>{tool.tagline}</p>
              </div>
              <em>{tool.score}</em>
            </a>
          ))}
        </div>
      </section>

      <section className="toolbar" aria-label="筛选工具">
        <div className="category-tabs">
          {categories.map((item) => (
            <button
              className={item === category ? 'active' : ''}
              type="button"
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="filters">
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
            <option>热度</option>
            <option>最新</option>
          </select>
        </div>
      </section>

      <section className="content-grid" id="tools">
        <div className="tool-grid">
          {visibleTools.map((tool) => (
            <article className="tool-card" key={tool.id}>
              <div className="tool-topline">
                <span className="tool-logo">{tool.name.slice(0, 1)}</span>
                <div>
                  <h2>{tool.name}</h2>
                  <p>{tool.tagline}</p>
                </div>
                <button
                  className={favorites.includes(tool.id) ? 'icon-button saved' : 'icon-button'}
                  type="button"
                  aria-label={`收藏 ${tool.name}`}
                  onClick={() => toggleFavorite(tool.id)}
                >
                  ★
                </button>
              </div>
              <p className="description">{tool.description}</p>
              <div className="tag-row">
                {tool.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="tool-meta">
                <span>{tool.category}</span>
                <span>{tool.price}</span>
                <span>评分 {tool.score}</span>
              </div>
              <div className="card-actions">
                <a href={tool.url} target="_blank" rel="noreferrer">
                  访问
                </a>
                <button
                  className={compare.includes(tool.id) ? 'active-compare' : ''}
                  type="button"
                  onClick={() => toggleCompare(tool.id)}
                >
                  {compare.includes(tool.id) ? '已加入对比' : '加入对比'}
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="side-panel" id="assistant">
          <div className="panel-block">
            <h2>AI 选型助手</h2>
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
            <p className="assistant-answer">
              建议先看 {suggestedTools.map((tool) => tool.name).join('、') || '当前筛选结果'}。先用免费增值工具验证流程，再决定是否付费。
            </p>
          </div>
          <div className="panel-block">
            <h2>快速入口</h2>
            <a href="#tools">全部工具</a>
            <a href="#compare">工具对比</a>
            <button type="button" onClick={() => setShowSubmit(true)}>
              推荐新工具
            </button>
          </div>
        </aside>
      </section>

      <section className="compare-section" id="compare">
        <div>
          <p className="eyebrow">Compare</p>
          <h2>工具对比</h2>
        </div>
        {comparedTools.length === 0 ? (
          <p className="empty-state">从工具卡片里加入 2 到 3 个工具，就能在这里快速比较定位、价格和评分。</p>
        ) : (
          <div className="compare-table">
            {comparedTools.map((tool) => (
              <div className="compare-item" key={tool.id}>
                <strong>{tool.name}</strong>
                <span>{tool.category}</span>
                <span>{tool.price}</span>
                <span>{tool.score} / 5</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="site-section">
        <div className="section-heading">
          <p className="eyebrow">Use Cases</p>
          <h2>按真实工作场景找工具</h2>
        </div>
        <div className="scenario-grid">
          {[
            ['内容创作', '选题、长文、短视频脚本、封面图和分发文案。'],
            ['产品研发', '界面原型、代码生成、文档总结和需求拆解。'],
            ['增长营销', '广告素材、落地页、邮件、CRM 和数据洞察。'],
            ['研究学习', '资料搜索、论文阅读、引用整理和竞品分析。'],
          ].map(([title, body]) => (
            <article className="scenario-card" key={title}>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section quality-section">
        <div>
          <p className="eyebrow">Standard</p>
          <h2>收录标准</h2>
          <p>
            优先收录有明确使用场景、稳定官网、清晰价格、可公开访问且对个人或小团队有实际价值的 AI 工具。
          </p>
        </div>
        <div className="quality-list">
          <span>官网可访问</span>
          <span>场景明确</span>
          <span>价格透明</span>
          <span>近期仍活跃</span>
        </div>
      </section>

      <section className="site-section faq-section">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>常见问题</h2>
        </div>
        <details open>
          <summary>这个站现在能给别人看吗？</summary>
          <p>可以。当前版本是静态前端站，适合通过 Cloudflare 临时地址、Cloudflare Pages、Vercel 或自有服务器公开访问。</p>
        </details>
        <details>
          <summary>工具数据以后怎么维护？</summary>
          <p>现在数据内置在前端，下一步可以拆成 JSON、CMS、Airtable、Notion 数据库或后台管理系统。</p>
        </details>
        <details>
          <summary>提交工具会直接入库吗？</summary>
          <p>当前是前端演示表单。正式上线时可以接邮箱通知、飞书表格、数据库或审核后台。</p>
        </details>
      </section>

      <footer className="site-footer">
        <div>
          <strong>ToolsHub</strong>
          <p>AI 工具导航、选型和对比入口。</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setShowSubmit(true)}>
          推荐工具
        </button>
      </footer>

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
