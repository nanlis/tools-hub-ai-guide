import { useMemo, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
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

const scenarioShortcuts = [
  { label: '做短视频', query: '视频' },
  { label: '写代码', query: '代码' },
  { label: '做 PPT', query: 'PPT' },
  { label: '查资料', query: '搜索' },
  { label: '做配音', query: '配音' },
  { label: '搭 Agent', query: 'Agent' },
]

const priceOptions = ['全部', '免费', '免费增值', '付费'] as const
type PriceOption = (typeof priceOptions)[number]

const gufengGallery = [
  { src: 'gufeng-gallery-01.jpg', title: '雨巷执伞', tone: '冷青夜景' },
  { src: 'gufeng-gallery-02.jpg', title: '案前执笔', tone: '书房光影' },
  { src: 'gufeng-gallery-03.jpg', title: '竹林斗笠', tone: '青绿武侠' },
  { src: 'gufeng-gallery-04.jpg', title: '月下回眸', tone: '湖面冷光' },
  { src: 'gufeng-gallery-05.jpg', title: '廊下听雨', tone: '园林夜色' },
  { src: 'gufeng-gallery-06.jpg', title: '庭院静坐', tone: '浅蓝纱衣' },
  { src: 'gufeng-gallery-07.jpg', title: '石阶青衫', tone: '莫兰迪绿' },
  { src: 'gufeng-gallery-08.jpg', title: '雪夜红衣', tone: '红白对比' },
]

const heroSlides = [
  'gufeng-hero.jpg',
  'gufeng-gallery-01.jpg',
  'gufeng-gallery-03.jpg',
  'gufeng-gallery-05.jpg',
  'gufeng-gallery-07.jpg',
]

const heroVideos = [
  { src: 'seedance-courtyard-swords-clean.mp4', label: '雪院剑阵', tone: 'Seedance 2.0' },
  { src: 'seedance-palace-battle.mp4', label: '仙门大战', tone: '大场面法术' },
  { src: 'ancient-mystery-night.mp4', label: '雨夜古风', tone: '冷蓝电影感' },
  { src: 'storm-spell-rain.mp4', label: '风暴仙侠', tone: '强冲击开屏' },
  { src: 'seedance-portrait-sword.mp4', label: '执剑人像', tone: '竖屏裁切' },
  { src: 'lantern-market-mask.mp4', label: '灯市狐面', tone: '夜市氛围' },
  { src: 'mountain-qin.mp4', label: '云海抚琴', tone: '东方意境' },
]
const heroVideoBase = import.meta.env.DEV
  ? '/tools-hub-ai-guide/hero-videos'
  : 'https://raw.githubusercontent.com/nanlis/tools-hub-ai-guide/master/public/hero-videos'
const gufengBase = '/tools-hub-ai-guide/gufeng'
const profileBase = '/tools-hub-ai-guide/profile'

const homeStats = [
  { value: '281万+', label: '近一年内容曝光' },
  { value: '12.5万+', label: '内容互动' },
  { value: '9015', label: '收藏验证' },
  { value: '1231', label: '新增关注' },
]

const homeEntries = [
  {
    title: 'AI 视觉生产',
    text: '古风人像、品牌封面、短视频镜头和提示词拆解。',
    href: '#visual-lab',
  },
  {
    title: '工具实测',
    text: '只收录跑通过的 AI 工具、模型和交付路径。',
    href: '#tools',
  },
  {
    title: 'Prompt / SOP',
    text: '把普通人能复用的步骤整理成卡片和案例。',
    href: '#cases',
  },
  {
    title: '商业案例拆解',
    text: '从爆款内容、平台变化和成本结构里找机会。',
    href: '#cases',
  },
]

const workflows = [
  {
    title: 'Seedance 2.0 视频工作流',
    tag: 'AI 视频',
    text: '从镜头主题、角色一致性到成片筛选，把短视频生成做成可复用流程。',
    tools: ['Midjourney', 'Kling', 'Runway', 'ElevenLabs'],
    query: '视频',
    category: 'video' as CategoryId,
    tweetUrl: 'https://x.com/Soranlan/status/2020288614467264961',
  },
  {
    title: 'Open Design + Codex',
    tag: '设计交付',
    text: '用高质量参考拆设计，再在真实前端里实现、截图、验证，而不是只停在效果图。',
    tools: ['Claude', 'Cursor', 'Claude Code', 'Perplexity'],
    query: '代码',
    category: 'code' as CategoryId,
    tweetUrl: 'https://x.com/Soranlan/status/2056555870159589631',
  },
  {
    title: '普通人 SOP',
    tag: '可复制方法',
    text: '把账号、工具、素材、发布这些琐碎步骤拆到能照着做的粒度。',
    tools: ['Perplexity', 'NotebookLM', 'Dify', 'n8n'],
    query: '资料',
    category: 'office' as CategoryId,
    tweetUrl: 'https://x.com/Soranlan/status/2052583510754623735',
  },
]

const proofCards = [
  {
    title: 'AI 女孩流水线拆解',
    metric: '33.2万曝光',
    text: '适合放在“机制与风险”栏目，用来展示商业案例拆解能力。',
    tweetUrl: 'https://x.com/Soranlan/status/2058356078157631966',
  },
  {
    title: 'KFC 视觉风格封面',
    metric: '8531互动',
    text: '证明账号最强的不是工具罗列，而是视觉风格判断和提示词落地。',
    tweetUrl: 'https://x.com/Soranlan/status/2060546435301679490',
  },
  {
    title: 'GPT Image 可编辑 PSD',
    metric: '3230互动',
    text: '证明账号能把模型更新翻译成设计师和内容创作者真正用得上的工作流。',
    tweetUrl: 'https://x.com/Soranlan/status/2048591383397605824',
  },
  {
    title: 'OpenViking / OpenClaw',
    metric: '2770互动',
    text: '用开源模型案例拆成本、风险和机会，补足视觉内容之外的行业判断。',
    tweetUrl: 'https://x.com/Soranlan/status/2023607485425218022',
  },
]

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | '全部'>('全部')
  const [price, setPrice] = useState<PriceOption>('全部')
  const [sort, setSort] = useState('推荐')
  const [favorites, setFavorites] = useState<number[]>([1, 19])
  const [activeVideo, setActiveVideo] = useState(0)
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; tone: string } | null>(null)

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
  const topTools = [...tools].sort((a, b) => b.score - a.score).slice(0, 6)
  const newTools = tools.filter((tool) => tool.isNew)

  function toggleFavorite(id: number) {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function showNextVideo() {
    setActiveVideo((current) => (current + 1) % heroVideos.length)
  }

  function moveMagnifier(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    event.currentTarget.style.setProperty('--mx', `${x}%`)
    event.currentTarget.style.setProperty('--my', `${y}%`)
  }

  function zoomStyle(src: string) {
    return { '--zoom-image': `url("${gufengBase}/${src}")` } as CSSProperties
  }

  function applyWorkflow(workflow: (typeof workflows)[number]) {
    setCategory(workflow.category)
    setQuery(workflow.query)
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="app">
      <section className="cinema-hero" aria-label="古风 AI 视觉开屏">
        <video
          className="cinema-video"
          src={`${heroVideoBase}/${heroVideos[activeVideo].src}`}
          autoPlay
          muted
          playsInline
          onEnded={showNextVideo}
          key={heroVideos[activeVideo].src}
        />
        <div className="cinema-shade" />
        <div className="cinema-content">
          <p className="cinema-kicker">Soran · AI Workflow Lab</p>
          <h1>Soran</h1>
          <p>拆普通人也跑得起的 AI 内容工作流。AI 热点、工具实测、生图视频、Prompt/SOP，只展示跑通后的方法。</p>
          <div className="cinema-actions">
            <a href="#top">看工作流</a>
            <a className="secondary-link" href="#cases">看高表现案例</a>
          </div>
        </div>
        <div className="video-switcher" aria-label="切换开屏视频">
          {heroVideos.map((video, index) => (
            <button
              className={activeVideo === index ? 'active' : ''}
              type="button"
              key={video.src}
              onClick={() => setActiveVideo(index)}
            >
              <span>{video.label}</span>
              <em>{video.tone}</em>
            </button>
          ))}
        </div>
        <a className="scroll-cue" href="#top" aria-label="向下查看主页">
          ↓
        </a>
      </section>

      <div className="shell" id="top">
        <section className="home-overview" aria-label="Soran 个人站首页概览">
          <div className="home-copy">
            <p className="eyebrow">Personal Site</p>
            <h2>不是简历站，是 Soran 的 AI 工作流中枢</h2>
            <p>把 X 上验证过的内容、视觉实验、工具实测和 SOP 沉淀成一个可浏览、可复用、可继续扩展的个人网站。</p>
          </div>
          <div className="home-stats">
            {homeStats.map((item) => (
              <div className="home-stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="home-entry-grid">
            {homeEntries.map((item) => (
              <a className="home-entry" href={item.href} key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="profile-section" aria-label="Soran 账号资料">
          <div className="profile-banner">
            <img src={`${profileBase}/soran-banner.jpg`} alt="AI 工具实测账号背景" />
          </div>
          <div className="profile-body">
            <img className="profile-avatar" src={`${profileBase}/soran-avatar.jpg`} alt="Soran 头像" />
            <div className="profile-copy">
              <p className="eyebrow">X Profile</p>
              <h2>
                Soran
                <span>已认证</span>
              </h2>
              <p className="profile-handle">@Soranlan</p>
              <p className="profile-bio">
                拆普通人也跑得起的 AI 内容工作流。AI 热点、工具实测、生图视频、Prompt/SOP，只写跑通后的方法。
              </p>
              <div className="profile-meta">
                <span>科技</span>
                <span>2018 年 12 月加入</span>
                <span>8937 帖子</span>
              </div>
            </div>
            <div className="profile-actions">
              <div>
                <strong>5191</strong>
                <span>关注者</span>
              </div>
              <div>
                <strong>334</strong>
                <span>正在关注</span>
              </div>
              <a href="https://x.com/Soranlan" target="_blank" rel="noreferrer">
                打开 X 主页
              </a>
            </div>
          </div>
        </section>

        <section className="workflow-section" aria-label="精选 AI 创作工作流" id="cases">
          <div className="section-title workflow-title">
            <div>
              <p className="eyebrow">Signature Workflows</p>
              <h2>先做三条能代表 Soran 的路径</h2>
            </div>
            <em>{workflows.length}</em>
          </div>
          <div className="workflow-grid">
            {workflows.map((workflow, index) => (
              <article className="workflow-card" key={workflow.title}>
                <div className="workflow-card-head">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <em>{workflow.tag}</em>
                </div>
                <h3>{workflow.title}</h3>
                <p>{workflow.text}</p>
                <div className="workflow-tools">
                  {workflow.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                <div className="workflow-actions">
                  <a href={workflow.tweetUrl} target="_blank" rel="noreferrer">
                    查看原推文
                  </a>
                  <button type="button" onClick={() => applyWorkflow(workflow)}>
                    筛选工具
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="proof-section" aria-label="账号高表现内容证明">
          <div className="section-title workflow-title">
            <div>
              <p className="eyebrow">Proof From X</p>
              <h2>用内容表现证明方向，而不是堆头衔</h2>
            </div>
            <em>{proofCards.length}</em>
          </div>
          <div className="proof-grid">
            {proofCards.map((item) => (
              <article className="proof-card" key={item.title}>
                <span>{item.metric}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href={item.tweetUrl} target="_blank" rel="noreferrer">
                  查看原推文
                </a>
              </article>
            ))}
          </div>
        </section>

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
        </aside>

        <section className="main-column" id="tools">
          <section className="compact-hero">
            <div>
              <p className="eyebrow">ToolsHub AI · Tested Directory</p>
              <h1>AI 工具实测库</h1>
              <p>按场景整理常用 AI 工具，优先放进跑通过的模型、应用和工作流入口。适合快速找工具，也适合顺着案例复用方法。</p>
            </div>
            <div className="hero-actions">
              <label className="inline-search">
                <span>⌕</span>
                <input
                  aria-label="搜索 AI 工具"
                  placeholder="搜索工具、场景、模型..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
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

          <section className="gufeng-feature" id="visual-lab">
            <div className="gufeng-copy">
              <p className="eyebrow">Soran Visual Library</p>
              <h2>AI 视觉风格样本库</h2>
              <p>古风人像、封面风格、短视频镜头和提示词灵感，做成个人站最有辨识度的视觉资产。</p>
              <div className="gufeng-tags">
                <span>古风人像</span>
                <span>蓝绿色</span>
                <span>毛玻璃质感</span>
              </div>
            </div>
            <div className="gufeng-media">
              <div className="hero-slideshow" aria-label="古风人像动态图片秀">
                {heroSlides.map((slide, index) => (
                  <img
                    src={`/tools-hub-ai-guide/gufeng/${slide}`}
                    alt={index === 0 ? '古风人像主视觉' : ''}
                    aria-hidden={index === 0 ? undefined : true}
                    key={slide}
                  />
                ))}
              </div>
              <div className="glass-float">
                <strong>Morandi Teal</strong>
                <span>精选素材 / 可用于封面、专题和提示词灵感</span>
              </div>
            </div>
          </section>

          <section className="library-section" id="library">
            <div className="section-title">
              <h2>古风人像库</h2>
              <em>{gufengGallery.length}</em>
            </div>
            <div className="library-grid">
              {gufengGallery.map((item) => (
                <article className="library-item" key={item.src}>
                  <button
                    className="image-zoom image-preview-trigger"
                    style={zoomStyle(item.src)}
                    type="button"
                    onMouseMove={moveMagnifier}
                    onClick={() => setPreviewImage(item)}
                  >
                    <img src={`${gufengBase}/${item.src}`} alt={item.title} />
                  </button>
                  <div className="library-meta">
                    <strong>{item.title}</strong>
                    <span>{item.tone}</span>
                  </div>
                </article>
              ))}
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
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </section>

        <aside className="right-rail" id="assistant">
          <section className="rail-card">
            <div className="rail-title">
              <strong>热门工具</strong>
              <span>Top {topTools.length}</span>
            </div>
            <ol className="rank-list">
              {topTools.map((tool, index) => (
                <li key={tool.id}>
                  <button type="button" onClick={() => setQuery(tool.name)}>
                    <span>{index + 1}</span>
                    <strong>{tool.name}</strong>
                    <em>{tool.score}</em>
                  </button>
                </li>
              ))}
            </ol>
          </section>
          <section className="rail-card">
            <div className="rail-title">
              <strong>按场景找</strong>
              <span>Quick</span>
            </div>
            <div className="scenario-list">
              {scenarioShortcuts.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => {
                    setCategory('全部')
                    setQuery(item.query)
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p>这些按钮会直接筛选工具库，不假装后台 AI 问答。</p>
          </section>
          <section className="rail-card">
            <div className="rail-title">
              <strong>最近新增</strong>
              <span>{newTools.length}</span>
            </div>
            <div className="new-list">
              {newTools.map((tool) => (
                <button type="button" key={tool.id} onClick={() => setQuery(tool.name)}>
                  <strong>{tool.name}</strong>
                  <span>{tool.tagline}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="rail-card material-card">
            <div className="rail-title">
              <strong>古风素材</strong>
              <span>Library</span>
            </div>
            <div className="material-grid">
              {[
                ['gufeng-card-1.jpg', '雪景古风人像'],
                ['gufeng-card-2.jpg', '夜景古风人像'],
                ['gufeng-card-3.jpg', '暖调古风人像'],
                ['gufeng-card-4.jpg', '竹林古风人像'],
              ].map(([src, alt]) => (
                <button
                  className="material-zoom image-zoom image-preview-trigger"
                  style={zoomStyle(src)}
                  type="button"
                  onMouseMove={moveMagnifier}
                  onClick={() => setPreviewImage({ src, title: alt, tone: '古风素材' })}
                  key={src}
                >
                  <img src={`${gufengBase}/${src}`} alt={alt} />
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {previewImage ? (
        <div className="preview-backdrop" role="presentation" onMouseDown={() => setPreviewImage(null)}>
          <section className="image-preview" role="dialog" aria-modal="true" aria-label={previewImage.title} onMouseDown={(event) => event.stopPropagation()}>
            <button className="preview-close" type="button" aria-label="关闭预览" onClick={() => setPreviewImage(null)}>
              ×
            </button>
            <img src={`${gufengBase}/${previewImage.src}`} alt={previewImage.title} />
            <div>
              <strong>{previewImage.title}</strong>
              <span>{previewImage.tone}</span>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  )
}

export default App
