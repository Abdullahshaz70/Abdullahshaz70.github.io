/**
 * Shape of the site's content and how it's loaded.
 *
 * ✏️ To change your details, edit `data.json` in the project root, not this
 * file. It is fetched when the page loads (see `loadContent` below). Any
 * text you leave empty ("") or any list you leave empty ([]) is hidden on
 * the page rather than shown as a blank.
 */

export interface Fact {
  label: string
  value: string
}

export interface Link {
  label: string
  href: string
}

export interface Metric {
  value: string
  label: string
}

export interface Project {
  /** Used for stack cross-references; keep it short and stable. */
  id: string
  title: string
  kind: string
  year: string
  role: string
  /** One sentence. Shown in the list and at the top of the detail view. */
  problem: string
  approach: string
  outcome: Metric[]
  stack: string[]
  links: Link[]
}

export interface Platform {
  name: string
  handle: string
  href: string
  rating: string
  peak: string
  standing: string
}

export interface Problem {
  source: string
  title: string
  note: string
  tags: string[]
}

export interface StackItem {
  name: string
  use: string
  /** Shown as written, e.g. "Daily", "Regular", "Learning". "Learning" is set in a muted colour. */
  comfort: string
  /** Project ids from `projects` where this shows up. */
  seenIn: string[]
}

export interface StackGroup {
  area: string
  items: StackItem[]
}

/**
 * Section ids and numbers are structural (the 3D scene has one camera
 * keyframe per section, in this order), so they live in code. Their nav
 * labels come from `nav` in data.json.
 */
export const sections = [
  { id: 'about', number: '01' },
  { id: 'work', number: '02' },
  { id: 'contests', number: '03' },
  { id: 'stack', number: '04' },
  { id: 'contact', number: '05' },
] as const

export type SectionId = (typeof sections)[number]['id']

export interface SiteContent {
  person: { name: string; shortName: string; title: string; email: string; phone: string }
  nav: Record<SectionId, string>
  hero: { positioning: string; scrollCue: string; meta: Fact[] }
  figure: { label: string; caption: string }
  about: { title: string; meta: string; lead: string; body: string[]; facts: Fact[] }
  work: { title: string; meta: string; openLabel: string }
  projects: Project[]
  contests: {
    title: string
    meta: string
    intro: string
    summary: Fact[]
    platforms: Platform[]
    problemsTitle: string
    problems: Problem[]
  }
  stack: {
    title: string
    meta: string
    columns: { name: string; use: string; comfort: string; seenIn: string }
    groups: StackGroup[]
  }
  contact: { title: string; meta: string; lead: string; channels: Link[] }
  colophon: { text: string; copyright: string }
}

// --- Validation -------------------------------------------------------------
// data.json is hand-edited, so read it defensively: wrong types become empty
// values, list items without their key field are dropped, and keys starting
// with "_" (the comments in data.json) are ignored.

type Raw = Record<string, unknown>

const obj = (value: unknown): Raw =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Raw) : {}

const str = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : typeof value === 'number' ? String(value) : ''

function list<T>(value: unknown, read: (item: unknown) => T, keep: (item: T) => boolean): T[] {
  return Array.isArray(value) ? value.map(read).filter(keep) : []
}

const strings = (value: unknown) => list(value, str, Boolean)

const fact = (value: unknown): Fact => ({ label: str(obj(value).label), value: str(obj(value).value) })
const facts = (value: unknown) => list(value, fact, (f) => f.value !== '')

const link = (value: unknown): Link => ({ label: str(obj(value).label), href: str(obj(value).href) })
const links = (value: unknown) => list(value, link, (l) => l.label !== '' && l.href !== '')

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function project(value: unknown): Project {
  const raw = obj(value)
  const title = str(raw.title)
  return {
    id: str(raw.id) || slug(title),
    title,
    kind: str(raw.kind),
    year: str(raw.year),
    role: str(raw.role),
    problem: str(raw.problem),
    approach: str(raw.approach),
    outcome: list(raw.outcome, (m): Metric => ({ value: str(obj(m).value), label: str(obj(m).label) }), (m) => m.value !== ''),
    stack: strings(raw.stack),
    links: links(raw.links),
  }
}

function platform(value: unknown): Platform {
  const raw = obj(value)
  return {
    name: str(raw.name),
    handle: str(raw.handle),
    href: str(raw.href),
    rating: str(raw.rating),
    peak: str(raw.peak),
    standing: str(raw.standing),
  }
}

function problem(value: unknown): Problem {
  const raw = obj(value)
  return { source: str(raw.source), title: str(raw.title), note: str(raw.note), tags: strings(raw.tags) }
}

function stackGroup(value: unknown): StackGroup {
  const raw = obj(value)
  return {
    area: str(raw.area),
    items: list(
      raw.items,
      (item): StackItem => ({
        name: str(obj(item).name),
        use: str(obj(item).use),
        comfort: str(obj(item).comfort),
        seenIn: strings(obj(item).seenIn),
      }),
      (item) => item.name !== '',
    ),
  }
}

/** Turns whatever data.json contains into complete, well-typed content. */
export function parseContent(value: unknown): SiteContent {
  const raw = obj(value)
  const person = obj(raw.person)
  const nav = obj(raw.nav)
  const hero = obj(raw.hero)
  const figure = obj(raw.figure)
  const about = obj(raw.about)
  const work = obj(raw.work)
  const contests = obj(raw.contests)
  const stack = obj(raw.stack)
  const columns = obj(stack.columns)
  const contact = obj(raw.contact)
  const colophon = obj(raw.colophon)

  return {
    person: {
      name: str(person.name),
      shortName: str(person.shortName),
      title: str(person.title),
      email: str(person.email),
      phone: str(person.phone),
    },
    nav: Object.fromEntries(sections.map(({ id }) => [id, str(nav[id])])) as Record<SectionId, string>,
    hero: { positioning: str(hero.positioning), scrollCue: str(hero.scrollCue), meta: facts(hero.meta) },
    figure: { label: str(figure.label), caption: str(figure.caption) },
    about: {
      title: str(about.title),
      meta: str(about.meta),
      lead: str(about.lead),
      body: strings(about.body),
      facts: facts(about.facts),
    },
    work: { title: str(work.title), meta: str(work.meta), openLabel: str(work.openLabel) },
    projects: list(raw.projects, project, (p) => p.title !== ''),
    contests: {
      title: str(contests.title),
      meta: str(contests.meta),
      intro: str(contests.intro),
      summary: facts(contests.summary),
      platforms: list(contests.platforms, platform, (p) => p.name !== ''),
      problemsTitle: str(contests.problemsTitle),
      problems: list(contests.problems, problem, (p) => p.title !== ''),
    },
    stack: {
      title: str(stack.title),
      meta: str(stack.meta),
      columns: {
        name: str(columns.name),
        use: str(columns.use),
        comfort: str(columns.comfort),
        seenIn: str(columns.seenIn),
      },
      groups: list(stack.groups, stackGroup, (g) => g.items.length > 0),
    },
    contact: { title: str(contact.title), meta: str(contact.meta), lead: str(contact.lead), channels: links(contact.channels) },
    colophon: { text: str(colophon.text), copyright: str(colophon.copyright) },
  }
}

// --- Loading ----------------------------------------------------------------

const DATA_URL = `${import.meta.env.BASE_URL}data.json`
const DATA_TIMEOUT_MS = 10_000

/** Reads a response body, reporting the fraction received when the size is known. */
async function readText(response: Response, onProgress: (fraction: number) => void): Promise<string> {
  const total = Number(response.headers.get('Content-Length')) || 0
  if (!response.body || total === 0) return response.text()
  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let received = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    received += value.length
    // A compressed response can decode to more bytes than Content-Length.
    onProgress(Math.min(received / total, 1))
  }
  const bytes = new Uint8Array(received)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.length
  }
  return new TextDecoder().decode(bytes)
}

/**
 * Fetches data.json. If it is missing, unreachable or not valid JSON, the
 * page still opens, with every field empty (and so hidden), and the reason
 * is logged to the console so a typo in data.json is easy to find.
 */
export async function loadContent(onProgress: (fraction: number) => void): Promise<SiteContent> {
  try {
    // no-cache: revalidate on every visit, so edits show up on the next reload.
    const response = await fetch(DATA_URL, { cache: 'no-cache', signal: AbortSignal.timeout(DATA_TIMEOUT_MS) })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return parseContent(JSON.parse(await readText(response, onProgress)))
  } catch (error) {
    console.error('data.json could not be loaded, so the page is showing without your details.', error)
    return parseContent({})
  }
}
