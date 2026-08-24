/**
 * The Ledger's newsroom, as data.
 *
 * Everything the site renders comes from this file: twelve articles across four
 * desks, their authors, and the seven-day view series the "Most read" rail draws
 * as sparklines. Article bodies are a discriminated union of blocks rather than
 * an HTML string, so the renderer can put real components — charts, figures,
 * code — inside the prose without ever calling `dangerouslySetInnerHTML`.
 */

export type CategorySlug = 'systems' | 'culture' | 'data' | 'dispatches'

export interface Category {
  slug: CategorySlug
  /** Display name, as it appears in the navbar and on category pages. */
  name: string
  /** The one-line standfirst under the category masthead. */
  description: string
}

export interface Author {
  id: string
  name: string
  role: string
  /** One sentence, used in the byline card under every article headline. */
  bio: string
  avatar: string
}

/** One line series for a chart embedded in an article body. */
export interface ChartSeriesData {
  name: string
  data: { x: string | number; y: number }[]
}

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'quote'; text: string; cite?: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'image'; src: string; alt: string; caption: string }
  | { kind: 'code'; caption?: string; code: string }
  | {
      kind: 'lineChart'
      title: string
      description: string
      caption: string
      xLabel: string
      yLabel: string
      series: ChartSeriesData[]
    }
  | {
      kind: 'barChart'
      title: string
      description: string
      caption: string
      xLabel: string
      yLabel: string
      data: { x: string; y: number }[]
    }

export interface FaqEntry {
  question: string
  answer: string
}

export interface Article {
  slug: string
  title: string
  /** The standfirst: one or two sentences that sell the piece. */
  dek: string
  category: CategorySlug
  authorId: string
  /** ISO-8601. Used for `datePublished`, `<time>` and sitemap `lastModified`. */
  publishedISO: string
  updatedISO?: string
  readMinutes: number
  hero: { src: string; alt: string; credit: string }
  blocks: Block[]
  /** Page views for the last seven days, oldest first. Drives the sparklines. */
  views7d: number[]
  tags: string[]
  /** The lead story on the homepage. Exactly one article carries this. */
  featured?: boolean
  /** Renders a "Quick answers" block and emits FAQPage structured data. */
  faq?: FaqEntry[]
}

export const CATEGORIES: Category[] = [
  {
    slug: 'systems',
    name: 'Systems',
    description:
      'How software is actually built, and what it costs the people who maintain it.',
  },
  {
    slug: 'culture',
    name: 'Culture',
    description:
      'The internet as a place people live in, not a product they use.',
  },
  {
    slug: 'data',
    name: 'Data',
    description:
      'Reporting that starts with a spreadsheet and ends with a story.',
  },
  {
    slug: 'dispatches',
    name: 'Dispatches',
    description:
      'Field notes from the rooms, night shifts and back offices where the work happens.',
  },
]

export const AUTHORS: Author[] = [
  {
    id: 'ananya-rao',
    name: 'Ananya Rao',
    role: 'Data editor',
    bio: 'Ananya Rao runs the data desk at The Ledger and has spent nine years arguing that most charts are too small.',
    avatar: 'https://i.pravatar.cc/160?img=45',
  },
  {
    id: 'rohan-bhatt',
    name: 'Rohan Bhatt',
    role: 'Systems correspondent',
    bio: 'Rohan Bhatt writes about infrastructure and the slow accumulation of decisions that becomes an architecture.',
    avatar: 'https://i.pravatar.cc/160?img=12',
  },
  {
    id: 'meera-krishnan',
    name: 'Meera Krishnan',
    role: 'Design critic',
    bio: 'Meera Krishnan covers design, typography and the aesthetics of software for The Ledger.',
    avatar: 'https://i.pravatar.cc/160?img=32',
  },
  {
    id: 'devika-menon',
    name: 'Devika Menon',
    role: 'Culture writer',
    bio: 'Devika Menon reports on internet culture from Kochi, mostly by listening to people talk about their phones.',
    avatar: 'https://i.pravatar.cc/160?img=26',
  },
  {
    id: 'tomas-oliveira',
    name: 'Tom\u00E1s Oliveira',
    role: 'Contributing editor',
    bio: 'Tom\u00E1s Oliveira is a contributing editor who writes about archives, link rot and the things the web forgets.',
    avatar: 'https://i.pravatar.cc/160?img=15',
  },
  {
    id: 'zainab-qureshi',
    name: 'Zainab Qureshi',
    role: 'Reporter at large',
    bio: 'Zainab Qureshi reports at large for The Ledger, usually from somewhere with bad lighting and a loud fan.',
    avatar: 'https://i.pravatar.cc/160?img=49',
  },
]

export const ARTICLES: Article[] = [
  {
    slug: 'the-numbers-behind-indias-developer-boom',
    title: 'The numbers behind India’s developer boom',
    dek: 'India is on course to host the largest developer population on earth before 2029. The headline is the least interesting part of the chart.',
    category: 'data',
    authorId: 'ananya-rao',
    publishedISO: '2026-08-21T06:30:00.000Z',
    updatedISO: '2026-08-22T09:10:00.000Z',
    readMinutes: 7,
    featured: true,
    tags: ['India', 'developers', 'open source', 'labour'],
    hero: {
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
      alt: 'A city street at night seen from above, lit by traffic and shopfronts',
      credit: 'Unsplash',
    },
    views7d: [4820, 5140, 6030, 9210, 14880, 18240, 21360],
    blocks: [
      {
        kind: 'p',
        text: 'Every year a platform publishes a chart showing India’s developer population climbing, and every year the chart is read as a story about volume — cheaper labour, larger cohorts, more graduates. That reading is comfortable and mostly wrong. The volume was always there. What changed is that it became legible to the rest of the world.',
      },
      {
        kind: 'p',
        text: 'We pulled seven years of monthly public-contribution counts and normalised them against self-reported location. The result is the shape below: two lines that were never going to stay apart, converging rather faster than either party expected.',
      },
      {
        kind: 'lineChart',
        title: 'Monthly active public contributors, India vs United States',
        description:
          'India rises from 2.4 million monthly contributors in 2019 to 8.4 million in 2026, while the United States grows from 5.9 million to 8.9 million over the same period.',
        caption:
          'Monthly active public contributors, in millions. India’s curve compounds; the United States’ is close to arithmetic. The lines meet somewhere in 2028.',
        xLabel: 'Year',
        yLabel: 'Contributors (millions)',
        series: [
          {
            name: 'India',
            data: [
              { x: '2019', y: 2.4 },
              { x: '2020', y: 3.1 },
              { x: '2021', y: 4.0 },
              { x: '2022', y: 5.0 },
              { x: '2023', y: 6.0 },
              { x: '2024', y: 6.9 },
              { x: '2025', y: 7.7 },
              { x: '2026', y: 8.4 },
            ],
          },
          {
            name: 'United States',
            data: [
              { x: '2019', y: 5.9 },
              { x: '2020', y: 6.4 },
              { x: '2021', y: 6.9 },
              { x: '2022', y: 7.3 },
              { x: '2023', y: 7.7 },
              { x: '2024', y: 8.1 },
              { x: '2025', y: 8.5 },
              { x: '2026', y: 8.9 },
            ],
          },
        ],
      },
      { kind: 'h2', text: 'The growth is not where you think' },
      {
        kind: 'p',
        text: 'Bengaluru still contributes the largest absolute share, and it still gets the coverage. But it is no longer where the growth lives. Between 2022 and 2026 the fastest-growing contributor bases were Indore, Coimbatore, Bhubaneswar and Kochi — none of them a traditional outsourcing hub, all of them cities where a competent engineer can now earn a metropolitan salary without paying metropolitan rent.',
      },
      {
        kind: 'p',
        text: 'That is a remote-work story wearing a developer-boom costume. The pandemic-era decoupling of pay from postcode never fully reversed here. It simply stopped being remarkable, and once it stopped being remarkable the second-tier cities stopped exporting their graduates.',
      },
      {
        kind: 'quote',
        text: 'We didn’t win anyone back. We just stopped losing them in the first place.',
        cite: 'A technical recruiter in Coimbatore, who asked not to be named discussing salary bands',
      },
      { kind: 'h2', text: 'What they are actually building with' },
      {
        kind: 'p',
        text: 'The framework picture is less fragmented than the discourse suggests. In a survey of 11,400 India-based professional developers conducted this June, React remains the centre of gravity by a wide margin, and Next.js has consolidated the meta-framework slot almost entirely.',
      },
      {
        kind: 'barChart',
        title: 'Framework use among India-based professional developers, 2026',
        description:
          'React leads at 62 per cent, followed by Next.js at 41, Express at 38, Spring Boot at 27, Django at 24, Laravel at 17 and Rails at 6.',
        caption:
          'Share of 11,400 surveyed professional developers who used each framework in the previous twelve months. Respondents could select more than one.',
        xLabel: 'Framework',
        yLabel: 'Share of respondents (%)',
        data: [
          { x: 'React', y: 62 },
          { x: 'Next.js', y: 41 },
          { x: 'Express', y: 38 },
          { x: 'Spring Boot', y: 27 },
          { x: 'Django', y: 24 },
          { x: 'Laravel', y: 17 },
          { x: 'Rails', y: 6 },
        ],
      },
      {
        kind: 'p',
        text: 'The Laravel number is the one worth sitting with. Seventeen per cent is not a rounding error, and it is concentrated almost entirely in agency work and small-business software — the enormous, unglamorous layer of the industry that trade coverage keeps forgetting exists because it does not raise funding rounds.',
      },
      {
        kind: 'p',
        text: 'None of this makes India the centre of software. Contribution counts measure participation, not influence, and the architectural decisions that shape the ecosystem are still made in a small number of rooms elsewhere. But participation is how influence starts, and the curve has pointed the same direction for seven years. At some point a projection stops being a forecast and becomes a fact about the present.',
      },
    ],
  },
  {
    slug: 'the-quiet-return-of-the-monolith',
    title: 'The quiet return of the monolith',
    dek: 'Nobody announced it. Teams simply started merging services back together and hoping their old conference talks would age gracefully.',
    category: 'systems',
    authorId: 'rohan-bhatt',
    publishedISO: '2026-08-18T05:00:00.000Z',
    readMinutes: 6,
    tags: ['architecture', 'microservices', 'infrastructure'],
    hero: {
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      alt: 'A dense circuit board photographed close up, its traces forming a grid',
      credit: 'Unsplash',
    },
    views7d: [3210, 3380, 3120, 4460, 5980, 6240, 7010],
    blocks: [
      {
        kind: 'p',
        text: 'There was never a moment when the industry agreed that microservices had gone too far. There was no keynote, no manifesto, no widely-shared post that everyone now cites. There was just a slow, faintly embarrassed accumulation of pull requests titled “merge billing-service into core”.',
      },
      {
        kind: 'p',
        text: 'I have spoken to engineers at eleven companies over the past four months who are, quietly, undoing a decomposition they performed between 2018 and 2022. Not one of them describes it as a reversal. They describe it as consolidation, or right-sizing, or — my favourite — reducing the surface area of the on-call rotation.',
      },
      { kind: 'h2', text: 'The bill arrives late' },
      {
        kind: 'p',
        text: 'The case for splitting a system was always independent deployability, and that case was real. The cost was distributed-systems complexity, and that cost was also real — but it arrived on a delay. A team that split a monolith into fourteen services in 2019 felt the benefit in the first quarter and the bill in the third year, when the one person who understood the retry semantics between services four and nine left for another job.',
      },
      {
        kind: 'p',
        text: 'What makes the bill hard to argue about is that it never appears as a single line item. It shows up as a slightly slower incident response, a slightly longer onboarding, a slightly higher chance that a one-line change requires touching three repositories. Each increment is defensible. The sum is not.',
      },
      {
        kind: 'image',
        src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
        alt: 'Cascading columns of pale green characters on a dark screen',
        caption:
          'The observability stack a fourteen-service architecture requires is, itself, a system somebody has to run.',
      },
      {
        kind: 'quote',
        text: 'We had better dashboards than we had reasons to look at them.',
        cite: 'Staff engineer at a logistics company in Pune',
      },
      { kind: 'h2', text: 'The shape people are landing on' },
      {
        kind: 'p',
        text: 'The end state is rarely a return to one process. It is usually three or four services drawn along the lines where the organisation actually splits — the team that owns payments, the team that owns search — rather than along the lines where the domain model looked tidy on a whiteboard.',
      },
      {
        kind: 'code',
        caption: 'The boundary that survives is the one a team can staff.',
        code: [
          '// 2019 — fourteen services, drawn from the domain model',
          '//   users · profiles · preferences · notifications · templates',
          '//   billing · invoices · tax · dunning · ledger',
          '//   search · indexing · suggest · analytics',
          '',
          '// 2026 — four services, drawn from the org chart',
          '//   core       users, profiles, preferences, notifications',
          '//   billing    billing, invoices, tax, dunning, ledger',
          '//   discovery  search, indexing, suggest',
          '//   insights   analytics',
        ].join('\n'),
      },
      {
        kind: 'p',
        text: 'This is Conway’s law being obeyed on purpose instead of by accident, which is the only version of it that has ever worked. The interesting question is not whether monoliths are back. It is why an industry that has known about Conway’s law since 1967 keeps rediscovering it at the price of a three-year migration.',
      },
    ],
  },
  {
    slug: 'what-we-lost-when-we-stopped-writing-css',
    title: 'What we lost when we stopped writing CSS',
    dek: 'A generation of engineers can ship a design system and cannot centre a div. That is not a skills problem. It is a tooling decision that hardened into a worldview.',
    category: 'systems',
    authorId: 'meera-krishnan',
    publishedISO: '2026-08-14T04:15:00.000Z',
    readMinutes: 5,
    tags: ['CSS', 'design systems', 'front end'],
    hero: {
      src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      alt: 'Lines of colourful source code displayed on a dark monitor',
      credit: 'Unsplash',
    },
    views7d: [2980, 3110, 3640, 3520, 4890, 5310, 6120],
    blocks: [
      {
        kind: 'p',
        text: 'I sat with a team of six last month while they debugged a layout that would not stop overflowing on mobile. They were good engineers. They had shipped a component library used by four product teams. It took them fifty minutes, and the answer was a missing `min-width: 0` on a flex child — a thing CSS has required since 2012 and will require forever.',
      },
      {
        kind: 'p',
        text: 'Nobody in that room had ever needed to know it, because for eight years the utility layer had known it for them. This is the trade we made and mostly do not discuss: we bought consistency with comprehension.',
      },
      { kind: 'h2', text: 'Abstractions that teach, and abstractions that hide' },
      {
        kind: 'p',
        text: 'Not all abstraction is corrosive. A good one leaves a trace of the thing underneath, so that when it leaks you have somewhere to stand. `flex-direction` is an abstraction over box layout, and learning it teaches you something true about how boxes work.',
      },
      {
        kind: 'p',
        text: 'A class name that expands to `display: flex; flex-direction: column` teaches you the class name. When the class name stops working, you have learned nothing that helps. The abstraction has no floor.',
      },
      {
        kind: 'quote',
        text: 'You can tell which layer a team understands by watching where they stop bisecting a bug.',
      },
      { kind: 'h2', text: 'The platform caught up while we were looking away' },
      {
        kind: 'p',
        text: 'The genuinely funny part is that most of the reasons for the escape hatch have expired. Nesting is native. Cascade layers solved specificity wars properly, which no utility framework ever did — they only avoided them. Container queries answered the actual question people were asking when they reached for breakpoint props. `:has()` removed an entire category of JavaScript.',
      },
      {
        kind: 'code',
        caption: 'Four features that would have been a build step in 2019.',
        code: [
          '@layer base, components, utilities;',
          '',
          '.card {',
          '  container-type: inline-size;',
          '',
          '  & .title { font-size: 1rem; }',
          '',
          '  &:has(img) { padding-block-start: 0; }',
          '}',
          '',
          '@container (min-width: 30rem) {',
          '  .card .title { font-size: 1.5rem; }',
          '}',
        ].join('\n'),
      },
      {
        kind: 'p',
        text: 'None of this is an argument for deleting your tooling. It is an argument for knowing what your tooling is standing on, because the ground moved and a lot of teams did not look down. The stylesheet is not a legacy format you are being forced to tolerate. It is the most stable, best-documented, most backwards-compatible part of the entire stack, and it is the only part guaranteed to still work in ten years.',
      },
    ],
  },
  {
    slug: 'the-machine-that-forgets',
    title: 'The machine that forgets',
    dek: 'Cache invalidation is called one of the two hard problems as a joke. Six outages later, the joke stops being funny.',
    category: 'systems',
    authorId: 'rohan-bhatt',
    publishedISO: '2026-08-07T07:45:00.000Z',
    readMinutes: 5,
    tags: ['caching', 'reliability', 'incidents'],
    hero: {
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      alt: 'Abstract blue and violet light trails against a dark background',
      credit: 'Unsplash',
    },
    views7d: [1840, 2010, 2260, 2180, 2740, 3050, 3390],
    blocks: [
      {
        kind: 'p',
        text: 'The quote is Phil Karlton’s and everybody knows it: there are only two hard things in computer science, cache invalidation and naming things. It is repeated as a wry aside, usually by someone about to add a cache. It deserves to be read as a warning.',
      },
      {
        kind: 'p',
        text: 'A cache is a second copy of the truth that has agreed, in advance, to be wrong sometimes. Every caching decision is therefore a decision about how wrong you are willing to be, for how long, and about what. Teams that write that sentence down have far fewer incidents than teams that do not, and the difference is not intelligence. It is that the second group never explicitly chose.',
      },
      { kind: 'h2', text: 'Three ways it goes wrong' },
      {
        kind: 'list',
        items: [
          'The stampede. The entry expires, four hundred requests miss simultaneously, and all four hundred go to the database that the cache existed to protect.',
          'The zombie. An entry is invalidated in one region and not another, and for six hours half your users see a price that no longer exists.',
          'The silent success. The cache is doing nothing at all — the hit rate has been two per cent since a key format changed in March — and nobody notices, because a useless cache looks exactly like a working one from the outside.',
        ],
      },
      {
        kind: 'p',
        text: 'The third is the most common and the least discussed. There is no alert for it, because nothing is failing. Latency is fine. Error rates are fine. You are simply paying for a Redis cluster that returns misses.',
      },
      {
        kind: 'quote',
        text: 'Nobody pages you when the cache stops working. It just quietly becomes a very expensive way to add a network hop.',
      },
      { kind: 'h2', text: 'What actually helps' },
      {
        kind: 'p',
        text: 'The interventions that work are unglamorous. Put the hit rate on the same dashboard as the error rate, so a collapse is visible next to the thing it will eventually cause. Version your key format, so a change produces a clean miss rather than a subtle mismatch. And treat time-to-live as a product decision rather than an engineering one — the question “how stale may this be?” has an owner, and it is usually not the person writing the code.',
      },
      {
        kind: 'code',
        caption: 'A key format with a version in it costs four characters and saves an afternoon.',
        code: [
          "const key = `v3:price:${sku}:${currency}`",
          '',
          '// Bumping v3 to v4 invalidates the whole namespace atomically.',
          '// No scan, no delete storm, no partially-migrated key space.',
        ].join('\n'),
      },
      {
        kind: 'p',
        text: 'None of that makes invalidation easy. It makes it visible, which is the most anyone has managed in forty years. The machine will still forget. The goal is only that you find out before your users do.',
      },
    ],
  },
  {
    slug: 'the-group-chat-is-the-last-good-website',
    title: 'The group chat is the last good website',
    dek: 'The open web got optimised into a shopping mall. Everything worth reading migrated into rooms of eleven people.',
    category: 'culture',
    authorId: 'devika-menon',
    publishedISO: '2026-08-19T11:20:00.000Z',
    readMinutes: 5,
    tags: ['social', 'community', 'platforms'],
    hero: {
      src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
      alt: 'A group of people working and talking around a shared table',
      credit: 'Unsplash',
    },
    views7d: [5210, 6480, 7120, 8340, 9860, 11240, 12980],
    blocks: [
      {
        kind: 'p',
        text: 'Ask anyone under forty where they read the most interesting thing they saw last week and the answer is almost never a website. It is a group chat. Someone’s cousin who works in logistics, explaining why a port closure will change the price of onions. A friend of a friend who reads planning applications for fun. Eleven people, no algorithm, no growth target.',
      },
      {
        kind: 'p',
        text: 'This is usually framed as retreat — the “dark forest” theory, everyone fleeing the open web for private clearings. I think that framing gets the causality backwards. People did not leave because the forest got dangerous. They left because the clearings are better, and they were always going to be better, and for twenty years we mistook a distribution problem for a preference.',
      },
      { kind: 'h2', text: 'Why small rooms work' },
      {
        kind: 'p',
        text: 'A group chat has properties that no public platform can replicate without ceasing to be a platform. Its membership is bounded, so reputation is real and cheap to maintain. There is no audience beyond the room, so nobody performs. Nothing is indexed, so nothing you say in 2026 is evidence in 2031. And the thing that determines what you see is a person you know deciding you would find it interesting.',
      },
      {
        kind: 'p',
        text: 'That last one is the whole game. Recommendation systems are extraordinary at predicting what will hold your attention and structurally incapable of predicting what will be good for you to have read. A friend does the second thing effortlessly, because they are not being paid by the minute.',
      },
      {
        kind: 'image',
        src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
        alt: 'A crowd of people at an event, faces lit by warm light',
        caption:
          'The public square was never actually a square. It was a stage with a crowd, and the crowd was being sold.',
      },
      {
        kind: 'quote',
        text: 'The feed asks what will keep you here. A friend asks what you would want to know. Those questions have almost no overlap.',
      },
      { kind: 'h2', text: 'What we give up' },
      {
        kind: 'p',
        text: 'The cost is real and it is not sentimental. A group chat has no archive, no search worth the name, and no way in. The good stuff is unlinkable and undiscoverable, which means it is unavailable to anyone outside the room and will be unavailable to everyone the moment the room goes quiet. We have traded a public commons that got enclosed for a thousand private ones that will simply evaporate.',
      },
      {
        kind: 'p',
        text: 'That is a worse deal than it looks. But it is the deal on offer, and until someone builds a public space that does not need to grow, the eleven people will keep being the best website on the internet.',
      },
    ],
  },
  {
    slug: 'everyone-is-a-publisher-nobody-is-an-editor',
    title: 'Everyone is a publisher. Nobody is an editor.',
    dek: 'Publishing became free and editing did not. Two decades on, we can see exactly what that asymmetry produced.',
    category: 'culture',
    authorId: 'ananya-rao',
    publishedISO: '2026-08-11T08:00:00.000Z',
    readMinutes: 6,
    tags: ['media', 'publishing', 'editing'],
    hero: {
      src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
      alt: 'A stack of folded newspapers photographed from the side',
      credit: 'Unsplash',
    },
    views7d: [3410, 3980, 4260, 5120, 5840, 6390, 7240],
    faq: [
      {
        question: 'Is editing really disappearing, or just moving?',
        answer:
          'Both, unevenly. Line editing has largely survived inside institutions that still employ subeditors. Structural editing — the work of deciding whether a piece should exist in this shape at all — has thinned out almost everywhere, because it is invisible when done well and expensive to staff.',
      },
      {
        question: 'Can a language model do the editor’s job?',
        answer:
          'It can do the copy pass credibly and the structural pass poorly. A model can tell you a sentence is overlong. It cannot tell you the piece is dishonest, because that judgement depends on knowing what the writer left out, and the model only sees what they put in.',
      },
      {
        question: 'What is the cheapest useful substitute?',
        answer:
          'One named reader who is allowed to say the piece should not run. Not a comment thread, not a review queue — a single person with the standing to kill it. Most of the value of an editor is the credible possibility of no.',
      },
    ],
    blocks: [
      {
        kind: 'p',
        text: 'The internet solved distribution so completely that we stopped noticing it had ever been a problem. Anyone can publish to everyone, instantly, at zero marginal cost. This was, and remains, an enormous good. It is also only half of what a publishing house did.',
      },
      {
        kind: 'p',
        text: 'The other half was editing, and editing did not get cheaper. It could not, because it is a person reading carefully and then having an uncomfortable conversation. There is no economy of scale in an uncomfortable conversation.',
      },
      { kind: 'h2', text: 'The three jobs nobody replaced' },
      {
        kind: 'p',
        text: 'An editor did three distinct things, and we tend to collapse them into the first. Copy editing catches the errors. Line editing makes the sentences work. Structural editing decides whether the piece should exist — whether the argument holds, whether the reporting supports it, whether anyone needs this.',
      },
      {
        kind: 'p',
        text: 'Software has been thrown at all three. Spellcheck handles the first, and handles it well. Language models make a decent run at the second. The third has resisted entirely, and it is the one that matters most, because it is the only one that can produce the answer no.',
      },
      {
        kind: 'quote',
        text: 'A platform can tell you your post did badly. It cannot tell you, before you publish, that it is not worth publishing.',
      },
      { kind: 'h2', text: 'What an unedited internet looks like' },
      {
        kind: 'p',
        text: 'It looks like this: enormous volume, competent prose, and a persistent low-grade sense that most of what you read did not need to be written. Not false, exactly. Just unnecessary, and confidently so. The style is fine because the style was the part machines could help with.',
      },
      {
        kind: 'p',
        text: 'The institutions that still employ editors have noticed that this is now a differentiator, which is a strange thing for basic quality control to become. Being obviously edited reads as a signal, the way a hardback does. That is a sad way to arrive at a business model, but it is a business model.',
      },
      {
        kind: 'p',
        text: 'The optimistic reading is that editing was never really institutional. It was always just a second person who cared and was permitted to be blunt. That arrangement does not require a building. It requires a norm, and norms can be rebuilt faster than industries.',
      },
    ],
  },
  {
    slug: 'the-typeface-that-ate-the-internet',
    title: 'The typeface that ate the internet',
    dek: 'One neutral grotesque became the default voice of software. What happens to a medium when everything in it speaks in the same register?',
    category: 'culture',
    authorId: 'meera-krishnan',
    publishedISO: '2026-08-04T09:30:00.000Z',
    readMinutes: 5,
    tags: ['typography', 'design', 'branding'],
    hero: {
      src: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3',
      alt: 'Metal letterpress type arranged in a composing tray',
      credit: 'Unsplash',
    },
    views7d: [2210, 2480, 2940, 3180, 3620, 3910, 4280],
    blocks: [
      {
        kind: 'p',
        text: 'Open ten products you use every week and look only at the letterforms. A single-storey `a` is rare. The `g` is almost certainly single-storey. The terminals are cut horizontally, the apertures are open, the `1` has a small flag and no foot. You are looking at the same face, or at one of a dozen faces built to be mistaken for it.',
      },
      {
        kind: 'p',
        text: 'This is not a conspiracy and it is not laziness. It is what happens when a genuinely excellent solution to a real problem — legibility at small sizes on inconsistent screens, across a wide weight range, in a hundred languages — becomes free and easy to install.',
      },
      { kind: 'h2', text: 'Neutrality is a position' },
      {
        kind: 'p',
        text: 'The pitch for the neutral grotesque was always that it gets out of the way. It has no accent, no period, no opinion; it lets the content speak. Every word of that is true and it is also the problem, because a voice with no accent is still a voice, and when every product adopts it, the absence of character becomes the character.',
      },
      {
        kind: 'p',
        text: 'The result is an internet where a banking app, a poetry journal, a hardware store and a hospital all address you in precisely the same tone. Institutions that ought to feel completely different feel interchangeable, and the interchangeability is doing quiet damage to our ability to tell one kind of thing from another.',
      },
      {
        kind: 'quote',
        text: 'A typeface that gets out of the way is only useful if something is waiting behind it.',
      },
      { kind: 'h2', text: 'The counter-argument, taken seriously' },
      {
        kind: 'p',
        text: 'There is a real case on the other side, and it is about accessibility rather than taste. These faces are relentlessly tested. They hold up at fourteen pixels on a bad panel, they distinguish `I` from `l` from `1`, they ship with the diacritics that a display serif drawn in 1974 simply does not have. Choosing a characterful face often means choosing a worse experience for someone with low vision, and that trade is not free.',
      },
      {
        kind: 'p',
        text: 'The way out is not to abandon the workhorse. It is to stop asking one face to do every job. Set the interface in the neutral grotesque, where legibility is the entire requirement, and set the reading in something with a point of view. The distinction between chrome and content is exactly the distinction typography is best at drawing, and we have spent a decade refusing to draw it.',
      },
    ],
  },
  {
    slug: 'how-long-does-a-link-live',
    title: 'How long does a link live?',
    dek: 'We resolved 41,000 URLs cited in technology writing between 2010 and 2024. A quarter of them are already gone.',
    category: 'data',
    authorId: 'tomas-oliveira',
    publishedISO: '2026-08-16T06:00:00.000Z',
    readMinutes: 6,
    tags: ['archives', 'link rot', 'the web'],
    hero: {
      src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
      alt: 'Rows of old books receding down a library shelf',
      credit: 'Unsplash',
    },
    views7d: [2640, 2910, 3480, 4020, 4760, 5230, 5910],
    faq: [
      {
        question: 'What counts as a dead link in this analysis?',
        answer:
          'Any URL that returned a 4xx or 5xx status, failed to resolve, or redirected to a domain-level landing page rather than the cited document. That last category matters: roughly a third of our “dead” links technically return 200, they just return something else entirely.',
      },
      {
        question: 'Does the Internet Archive solve this?',
        answer:
          'Partly, and less than people assume. It had a usable capture for 61 per cent of the dead URLs in our sample. Coverage is far worse for anything behind a paywall, anything served from a single-page application, and anything that was only ever linked from one place.',
      },
      {
        question: 'What is the single most effective fix?',
        answer:
          'Quote the passage you are citing in your own text. A link is a pointer to someone else’s server and you control none of it; a quotation lives in your document. Everything else — archiving, DOIs, permalinks — helps, but only the quotation survives unconditionally.',
      },
    ],
    blocks: [
      {
        kind: 'p',
        text: 'A citation is a promise that someone else can check your work. We wanted to know how long that promise holds on the web, so we took every external URL cited in a corpus of 3,900 technology articles published between 2010 and 2024 — 41,208 links after deduplication — and tried to fetch all of them in May of this year.',
      },
      {
        kind: 'p',
        text: 'Twenty-six per cent failed outright. Another nine per cent resolved to something that was not the cited document: a homepage, a paywall, a domain parked by a registrar, a “this content is no longer available” shell. So a little over a third of the evidentiary base of fifteen years of technology writing has quietly detached from the writing.',
      },
      {
        kind: 'lineChart',
        title: 'Share of cited links still resolving, by year of publication',
        description:
          'Links published in 2010 resolve 46 per cent of the time; links published in 2024 resolve 92 per cent of the time, with a steady decline as articles age.',
        caption:
          'Percentage of cited URLs still returning the original document in May 2026, by the year the citing article was published. The curve is roughly a half-life of nine years.',
        xLabel: 'Year published',
        yLabel: 'Still resolving (%)',
        series: [
          {
            name: 'Still resolving',
            data: [
              { x: '2010', y: 46 },
              { x: '2012', y: 53 },
              { x: '2014', y: 61 },
              { x: '2016', y: 68 },
              { x: '2018', y: 75 },
              { x: '2020', y: 81 },
              { x: '2022', y: 87 },
              { x: '2024', y: 92 },
            ],
          },
        ],
      },
      { kind: 'h2', text: 'It is not evenly distributed' },
      {
        kind: 'p',
        text: 'Institutional domains hold up. University pages, government records and the large newspapers cleared eighty per cent even in the oldest cohort. What died was everything else: personal sites, company blogs from companies that were acquired, documentation for products that were sunset, and — worst by a distance — anything hosted on a platform that has since shut down.',
      },
      {
        kind: 'barChart',
        title: 'Link survival by host type, 2010 to 2016 cohort',
        description:
          'Government and university domains survive at 84 and 81 per cent. News organisations at 72, personal sites at 44, company blogs at 38 and defunct platforms at 6 per cent.',
        caption:
          'Survival rate for links published between 2010 and 2016, grouped by the kind of host they pointed at.',
        xLabel: 'Host type',
        yLabel: 'Still resolving (%)',
        data: [
          { x: 'Government', y: 84 },
          { x: 'University', y: 81 },
          { x: 'News', y: 72 },
          { x: 'Personal', y: 44 },
          { x: 'Company blog', y: 38 },
          { x: 'Dead platform', y: 6 },
        ],
      },
      {
        kind: 'quote',
        text: 'The web does not forget slowly and evenly. It forgets the independent parts first.',
      },
      {
        kind: 'p',
        text: 'That last bar is the one that should worry anyone who writes for a living. Six per cent. An entire generation of technical writing — thoughtful, specific, often better than the coverage that survived — was published on services that no longer exist, and the citations pointing at it now point at nothing.',
      },
      { kind: 'h2', text: 'What a writer can actually do' },
      {
        kind: 'p',
        text: 'Archive as you cite rather than as you remember to. Prefer a stable identifier where one exists. And quote generously in your own text, because your document is the only server in the chain that you control. A link is a promise about someone else’s infrastructure; a quotation is a promise about yours.',
      },
    ],
  },
  {
    slug: 'the-commute-came-back',
    title: 'The commute came back',
    dek: 'Office attendance in nine Indian cities has climbed for eleven straight quarters. The story underneath is about who could never work from home in the first place.',
    category: 'data',
    authorId: 'zainab-qureshi',
    publishedISO: '2026-08-09T05:40:00.000Z',
    readMinutes: 5,
    tags: ['work', 'cities', 'labour'],
    hero: {
      src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      alt: 'A long exposure of a road at dusk with mountains behind',
      credit: 'Unsplash',
    },
    views7d: [1920, 2140, 2380, 2610, 2950, 3240, 3580],
    blocks: [
      {
        kind: 'p',
        text: 'Card-swipe data from 1,240 office buildings across nine cities shows the same shape in every one: a collapse in 2020, a long flat trough, and then eleven consecutive quarters of increase that has now taken average weekday occupancy to 81 per cent of its 2019 level.',
      },
      {
        kind: 'p',
        text: 'The obvious reading is that remote work was a phase and the mandate won. The data does not support that, and the reason is a composition effect that almost every write-up of these numbers has missed.',
      },
      { kind: 'h2', text: 'Who is in the building' },
      {
        kind: 'p',
        text: 'The occupancy recovery is driven overwhelmingly by roles that were never remote-capable — facilities, security, reception, hospitality, lab and hardware work, and the enormous services layer that exists to support an occupied building. As offices reopened, those jobs came back at 100 per cent, because they were always at 100 per cent when the lights were on.',
      },
      {
        kind: 'p',
        text: 'Filter to desk-based roles only and the picture inverts. Average attendance among people who could plausibly do their job from a laptop is 2.7 days a week and has moved by less than a third of a day since early 2024. The mandate did not win. It negotiated, and it settled around three days.',
      },
      {
        kind: 'quote',
        text: 'Two very different populations are being averaged into one number, and only one of them ever had a choice.',
      },
      {
        kind: 'image',
        src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
        alt: 'People seated in rows in a large hall, seen from behind',
        caption:
          'Occupancy counts everyone who badges in. It does not ask whether they had the option not to.',
      },
      { kind: 'h2', text: 'What three days does to a city' },
      {
        kind: 'p',
        text: 'A three-day week is not a smaller five-day week. It is a different city. Tuesday to Thursday now carries traffic and footfall that exceed 2019 peaks, while Monday and Friday sit twenty points below. Every business calibrated for a flat five-day rhythm — canteens, transit, cleaning contracts, the sandwich shop on the corner — is now running two-thirds capacity on a five-day cost base.',
      },
      {
        kind: 'p',
        text: 'That is the actual policy problem, and it is not going to be solved by anybody’s return-to-office memo. The peaks are the point. A city that fills up three days a week needs infrastructure sized for the peak and priced for the average, and nobody has worked out how to pay for that.',
      },
    ],
  },
  {
    slug: 'night-shift-at-the-data-centre',
    title: 'Night shift at the data centre',
    dek: 'Between midnight and six, the cloud is eleven people, a golf cart and a very specific smell.',
    category: 'dispatches',
    authorId: 'zainab-qureshi',
    publishedISO: '2026-08-20T18:15:00.000Z',
    readMinutes: 6,
    tags: ['infrastructure', 'labour', 'reportage'],
    hero: {
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      alt: 'A dark globe threaded with glowing network connections',
      credit: 'Unsplash',
    },
    views7d: [4120, 4680, 5340, 6180, 7420, 8960, 10240],
    blocks: [
      {
        kind: 'p',
        text: 'The smell is the first thing. Not ozone, which is what people expect, but something closer to hot dust and clean laundry — filtered air that has been pushed past a hundred thousand warm components and has picked up nothing at all except the warmth. It is the smell of a room where nothing is allowed to happen.',
      },
      {
        kind: 'p',
        text: 'It is 1:40 in the morning at a facility ninety minutes outside Mumbai, and Sunil is driving a golf cart down an aisle long enough to need one. He has worked nights here for six years. He can tell which hall he is in by the pitch of the fans.',
      },
      { kind: 'h2', text: 'The work is walking' },
      {
        kind: 'p',
        text: 'Most of what happens on a night shift is walking. There is a route, and the route takes about eighty minutes, and it is walked five times. The point is not that a human sees a failure before a sensor does — the sensors are better at that and everyone knows it. The point is the category of problem no sensor is looking for.',
      },
      {
        kind: 'p',
        text: 'A cable tray with a hairline sag. A door that has stopped sealing. A puddle. “Sensors tell you a thing broke,” Sunil says. “Walking tells you a thing is going to.”',
      },
      {
        kind: 'quote',
        text: 'Everybody thinks this job is emergencies. It is nine hours of nothing and then four minutes.',
        cite: 'Sunil, critical facilities technician',
      },
      { kind: 'h2', text: 'The four minutes' },
      {
        kind: 'p',
        text: 'At 3:12 a battery string in the uninterruptible power supply room reports a cell voltage drift. It is not an outage and will not become one; the string is one of six and the load could sit on four. But the runbook says a drifting cell gets eyes within fifteen minutes, and so three people who were doing nothing are suddenly doing something with complete precision.',
      },
      {
        kind: 'p',
        text: 'Priya reads the values aloud. Sunil photographs the terminal. A third technician, whose name I did not catch, writes the time on a clipboard — an actual clipboard, hanging on an actual nail, in a building that runs a meaningful fraction of a country’s payment traffic. By 3:24 the string is isolated and a replacement is scheduled for the day shift.',
      },
      {
        kind: 'p',
        text: 'Nothing happened. That is the product. Somewhere a few hundred kilometres away, several million people did not experience an interruption to something they have never thought about, and eleven people on a night shift are the reason, and there is no metric anywhere that will ever record it.',
      },
      {
        kind: 'image',
        src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        alt: 'A dim corridor lit by cold blue light',
        caption:
          'The lights in the halls are motion-activated. From a distance you can follow a person by the section that is lit.',
      },
      {
        kind: 'p',
        text: 'At 5:50 the sky outside the loading bay goes the colour of wet paper and the day shift starts arriving. Sunil finishes his last walk, hands over the clipboard, and says the thing every night worker in every industry eventually says to a visiting reporter: it is a quiet job, and you should hope it stays that way.',
      },
    ],
  },
  {
    slug: 'the-last-letterpress-in-fort-kochi',
    title: 'The last letterpress in Fort Kochi',
    dek: 'K. R. Damodaran has been setting type by hand since 1971. His customers are now almost entirely people who design on screens.',
    category: 'dispatches',
    authorId: 'devika-menon',
    publishedISO: '2026-08-13T10:05:00.000Z',
    readMinutes: 5,
    tags: ['printing', 'craft', 'Kerala'],
    hero: {
      src: 'https://images.unsplash.com/photo-1585241645927-c7a8e5840c42',
      alt: 'An old printing press with ink rollers and metal frames',
      credit: 'Unsplash',
    },
    views7d: [1480, 1720, 2140, 2380, 2610, 2890, 3210],
    blocks: [
      {
        kind: 'p',
        text: 'The press is a Heidelberg platen from 1958 and it makes a sound like a door closing politely, over and over, about forty times a minute. Damodaran feeds it with his right hand and takes the sheet with his left, and has done so for fifty-five years, and has all ten fingers, which he mentions before I can ask.',
      },
      {
        kind: 'p',
        text: 'The shop is one room off a lane in Fort Kochi, deep enough that the light gives out halfway. Along the back wall: forty-one type cases, Malayalam and English, in sizes from six point to seventy-two. He knows where every sort is by touch.',
      },
      { kind: 'h2', text: 'The customers changed' },
      {
        kind: 'p',
        text: 'For thirty years the work was invoices, receipt books, wedding cards and the occasional political pamphlet at short notice and no questions. Digital took all of it, in roughly that order, and by 2009 he was open three days a week and considering not being open at all.',
      },
      {
        kind: 'p',
        text: 'Then something turned around, and it turned around from an unexpected direction. His customers now are designers. Studios in Bengaluru and Chennai, a stationery brand in Ahmedabad, a poetry press in Thiruvananthapuram that sends him files he cannot open and has learned to send drawings instead.',
      },
      {
        kind: 'quote',
        text: 'They want the bite. On a screen everything is on top of the paper. Here it is in the paper.',
        cite: 'K. R. Damodaran',
      },
      {
        kind: 'p',
        text: 'The bite is the impression — the slight debossing where metal met sheet under pressure. For most of letterpress history a visible bite was a fault, evidence of an over-inked, over-pressed job. Damodaran was taught to avoid it. He is now paid extra for it, a reversal he finds funny in a way he does not entirely explain.',
      },
      { kind: 'h2', text: 'What happens to the cases' },
      {
        kind: 'p',
        text: 'He is seventy-three. There is no apprentice, and he is straightforward about why: the work does not pay enough to be learned slowly, and it cannot be learned quickly. Two design students came for a fortnight in 2023 and were, he says, very good and very fast and completely uninterested in the six months it would take to become merely competent.',
      },
      {
        kind: 'p',
        text: 'The type will probably go to a museum in Thrissur that has expressed interest and not yet found funding. The Heidelberg is a harder question — it weighs 1,400 kilos and the lane is not wide enough for a truck, which is a problem that has been true since 1958 and was solved once, in the other direction, by eleven men and a set of rollers.',
      },
      {
        kind: 'p',
        text: 'He locks up at six. On the bench, waiting for Monday, is a run of five hundred business cards for a design studio that will photograph them, at an angle, in raking light, so that the bite shows.',
      },
    ],
  },
  {
    slug: 'a-week-without-recommendations',
    title: 'A week without recommendations',
    dek: 'I turned off every algorithmic feed I could find and kept a log. The first two days were awful. The fifth was the interesting one.',
    category: 'dispatches',
    authorId: 'tomas-oliveira',
    publishedISO: '2026-08-06T12:00:00.000Z',
    readMinutes: 5,
    tags: ['attention', 'platforms', 'first person'],
    hero: {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      alt: 'Two people working at laptops across a table from each other',
      credit: 'Unsplash',
    },
    views7d: [2340, 2580, 2810, 3140, 3460, 3720, 4080],
    blocks: [
      {
        kind: 'p',
        text: 'The rules were simple. For seven days: no recommended feed, no autoplay, no “because you watched”, no algorithmic timeline. Chronological where offered, subscriptions where possible, and where neither was available, the service was simply off. I kept a log because I did not trust myself to remember accurately, which turned out to be the correct instinct.',
      },
      { kind: 'h2', text: 'Days one and two: the twitch' },
      {
        kind: 'p',
        text: 'The first thing to go is not entertainment. It is the gap-filler. I counted, on day one, thirty-one occasions where I opened something with no intention of doing anything in it — lift, kettle, the eleven seconds between joining a call and the call starting. Each time there was nothing new, because I had subscribed to eighty things and eighty things do not publish continuously.',
      },
      {
        kind: 'p',
        text: 'Day two was worse and I want to be honest about why. It was not boredom. It was a specific, low irritation at the world for failing to hand me something, which is a strange thing to feel about a lift.',
      },
      { kind: 'h2', text: 'Days three and four: the substitution' },
      {
        kind: 'p',
        text: 'By the middle of the week I had found workarounds, and the workarounds were revealing. I read my email more often. I refreshed a chronological timeline that I knew had not changed. I checked a weather app four times in an afternoon in a city where the weather does not change. The appetite did not go away; it went looking.',
      },
      {
        kind: 'quote',
        text: 'The feed was never the habit. The feed was where the habit was being served.',
      },
      { kind: 'h2', text: 'Day five' },
      {
        kind: 'p',
        text: 'On Friday I finished a book I had been carrying for four months. Not because I had grandly reclaimed my attention — I want to be careful here, because the tidy version of this essay ends with a book and a sunset and I do not think the tidy version is true. I finished it because it was the nearest available thing during a forty-minute wait, and for the first time in months it did not have to compete.',
      },
      {
        kind: 'p',
        text: 'That is the whole finding, and it is smaller than the genre usually allows. Recommendation systems do not defeat your intentions. They win the tiny, uncontested moments — the eleven seconds, the forty minutes — that your intentions were never watching. Remove them and those moments do not become meaningful. They become available.',
      },
      {
        kind: 'p',
        text: 'I turned two of the feeds back on this morning. I have not turned the third one back on, and I notice I keep not doing it, which is probably the most honest result in the log.',
      },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Selectors
 *
 * Plain synchronous functions over the array above. In a real newsroom
 * these become database queries; the call sites in `app/` do not change.
 * ------------------------------------------------------------------ */

/** Newest first. The order every listing on the site uses. */
export const ARTICLES_BY_DATE: Article[] = [...ARTICLES].sort(
  (a, b) => Date.parse(b.publishedISO) - Date.parse(a.publishedISO),
)

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getAuthor(id: string): Author {
  const author = AUTHORS.find((a) => a.id === id)
  if (!author) throw new Error(`Unknown author id: ${id}`)
  return author
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function articlesInCategory(slug: CategorySlug): Article[] {
  return ARTICLES_BY_DATE.filter((a) => a.category === slug)
}

/** The single lead story, with a defensive fallback to the newest article. */
export function getFeatured(): Article {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES_BY_DATE[0]
}

/** Total views over the sparkline window — the ranking key for "Most read". */
export function totalViews(article: Article): number {
  return article.views7d.reduce((sum, n) => sum + n, 0)
}

/** Most read over the last seven days. */
export function mostRead(limit = 5): Article[] {
  return [...ARTICLES]
    .sort((a, b) => totalViews(b) - totalViews(a))
    .slice(0, limit)
}

/**
 * Three pieces to read next: same desk first, then the newest from elsewhere,
 * so a thin category never produces an empty rail.
 */
export function relatedArticles(article: Article, limit = 3): Article[] {
  const sameDesk = ARTICLES_BY_DATE.filter(
    (a) => a.category === article.category && a.slug !== article.slug,
  )
  const rest = ARTICLES_BY_DATE.filter(
    (a) => a.category !== article.category && a.slug !== article.slug,
  )
  return [...sameDesk, ...rest].slice(0, limit)
}

/** Headlines for the breaking-news ticker. */
export function tickerHeadlines(): Article[] {
  return ARTICLES_BY_DATE.slice(0, 6)
}

/** Flat search index for the command palette. */
export function searchIndex() {
  return ARTICLES_BY_DATE.map((article) => ({
    slug: article.slug,
    title: article.title,
    dek: article.dek,
    category: getCategory(article.category)?.name ?? article.category,
    author: getAuthor(article.authorId).name,
    tags: article.tags,
  }))
}
