import Link from 'next/link'
import {
  ArrowRight, Bookmark, Building2, Clock3, FileText, Image as ImageIcon,
  Megaphone, MessageCircle, Search, Sparkles, UserRound,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'
const fallbackImage = '/placeholder.svg?height=900&width=1200'

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function allPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
}

function imageOf(post?: SitePost | null) {
  return getEditablePostImage(post) || fallbackImage
}

function safeTitle(post?: SitePost | null) {
  return post?.title || 'Untitled post'
}

function hrefFor(post: SitePost, primaryTask: TaskKey, primaryRoute: string) {
  return postHref(primaryTask, post, primaryRoute)
}

function SectionHeading({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-[var(--editable-border)] pb-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{eyebrow}</p>
        <h2 className="editable-display mt-1 text-2xl font-semibold uppercase leading-tight text-[var(--slot4-page-text)]">{title}</h2>
      </div>
      {href ? (
        <Link href={href} className="hidden items-center gap-1 text-sm font-bold text-[var(--slot4-accent)] hover:underline sm:inline-flex">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  )
}

function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-[var(--editable-border)] bg-white shadow-[0_14px_35px_rgba(107,63,105,0.10)]">
      <Link href={href} className="block">
        <div className="relative aspect-[1.18/1] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={imageOf(post)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(37,26,36,0.72))]" />
          <span className="absolute left-4 top-4 rounded-sm bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--slot4-accent)]">
            {getEditableCategory(post)}
          </span>
        </div>
        <div className="p-5 sm:p-7">
          <h2 className="editable-serif text-3xl font-extrabold leading-[1.02] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)] sm:text-4xl">
            {safeTitle(post)}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 190) || 'Open this post to read the full story and details.'}</p>
          <div className="mt-5 flex items-center justify-between border-t border-[var(--editable-border)] pt-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--slot4-muted-text)]">
            <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> Discuss</span>
            <span className="text-[var(--slot4-accent)]">Read story</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-3 border-b border-[var(--editable-border)] py-4">
      <span className="editable-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-sm font-semibold text-white">
        {index + 1}
      </span>
      <span className="min-w-0">
        <span className="line-clamp-2 text-sm font-bold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{safeTitle(post)}</span>
        <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--slot4-muted-text)]">{getEditableCategory(post)}</span>
      </span>
    </Link>
  )
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <article className="group border-b border-dashed border-[#cdb9cc] py-5">
      <Link href={href} className="grid gap-4 sm:grid-cols-[94px_minmax(0,1fr)]">
        <div className="aspect-square overflow-hidden rounded-sm bg-[var(--slot4-media-bg)]">
          <img src={imageOf(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
          <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{safeTitle(post)}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 135)}</p>
        </div>
      </Link>
    </article>
  )
}

function EditorialListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid grid-cols-[42px_minmax(0,1fr)] gap-4 rounded-sm bg-white p-4 shadow-[0_1px_0_rgba(107,63,105,0.18)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(107,63,105,0.13)]">
      <span className="editable-display text-3xl font-semibold text-[#A376A2]">{String(index + 1).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
        <span className="mt-1 block line-clamp-2 text-base font-bold leading-snug group-hover:text-[var(--slot4-accent)]">{safeTitle(post)}</span>
        <span className="mt-2 block line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</span>
      </span>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-sm bg-white shadow-[0_1px_0_rgba(107,63,105,0.18)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(107,63,105,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={imageOf(post)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
        <span className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
      </div>
      <h3 className="editable-serif p-4 text-xl font-extrabold leading-tight text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{safeTitle(post)}</h3>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const featured = pool[0]
  const rail = pool.slice(1, 7)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover ${SITE_CONFIG.name}`

  return (
    <section className="bg-[#fbf7fa]">
      <div className={`${container} py-5 sm:py-6`}>
        <div className="relative overflow-hidden rounded-sm border border-[var(--editable-border)] bg-[#DDC3C3]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.65),transparent_30%),linear-gradient(120deg,#DDC3C3,#A376A2_56%,#6B3F69)]" />
          <div className="absolute -right-8 top-6 h-44 w-44 rounded-full border border-white/35 curecos-float" />
          <div className="relative grid gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/88">{pagesContent.home.hero.badge || 'Fresh reads and listings'}</p>
              <h1 className="editable-display mt-3 max-w-2xl text-4xl font-semibold uppercase leading-[1.02] text-white sm:text-5xl">{heroTitle}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/90">{pagesContent.home.hero.description || 'Explore practical articles, community listings, profiles and useful resources in one calm public directory.'}</p>
              <form action="/search" className="mt-6 flex max-w-xl overflow-hidden rounded-sm bg-white shadow-[0_20px_45px_rgba(37,26,36,0.22)]">
                <input name="q" placeholder="Search useful content..." className="min-w-0 flex-1 px-5 py-4 text-sm outline-none" />
                <button className="flex w-14 items-center justify-center bg-[var(--slot4-accent)] text-white" aria-label="Search">
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
            {featured ? (
              <Link href={hrefFor(featured, primaryTask, primaryRoute)} className="group hidden overflow-hidden rounded-sm bg-white/95 p-3 shadow-[0_18px_40px_rgba(37,26,36,0.22)] lg:block">
                <div className="aspect-[16/10] overflow-hidden rounded-sm bg-white">
                  <img src={imageOf(featured)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">Featured now</p>
                <h2 className="mt-1 line-clamp-2 text-lg font-bold leading-tight text-[var(--slot4-page-text)]">{safeTitle(featured)}</h2>
              </Link>
            ) : null}
          </div>
        </div>

        {rail.length ? (
          <div className="mt-5 overflow-hidden border-y border-[var(--editable-border)] bg-white">
            <div className="flex w-max gap-0 curecos-auto-rail">
              {[...rail, ...rail].map((post, index) => (
                <Link key={`${post.id || post.slug}-${index}`} href={hrefFor(post, primaryTask, primaryRoute)} className="flex w-[280px] items-center gap-3 border-r border-[var(--editable-border)] px-4 py-3">
                  <img src={imageOf(post)} alt="" className="h-14 w-14 rounded-sm object-cover" />
                  <span className="line-clamp-2 text-sm font-bold leading-snug text-[var(--slot4-page-text)]">{safeTitle(post)}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null
  return (
    <section className="bg-[#fbf7fa]">
      <div className={`${container} py-6`}>
        <SectionHeading eyebrow="Browse categories" title="Choose a section" href={primaryRoute} />
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
          {categories.map((task) => {
            const Icon = taskIcon[task.key] || FileText
            return (
              <Link key={task.key} href={task.route} className="group flex items-center gap-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">
                <Icon className="h-5 w-5 text-[#6B3F69] transition group-hover:scale-110" />
                <span>{task.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const featured = pool[0]
  const recent = pool.slice(1, 9)
  const showcase = pool.slice(9, 15)
  if (!pool.length) return null

  return (
    <section className="bg-[#fbf7fa]">
      <div className={`${container} grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_320px]`}>
        <div className="min-w-0">
          <SectionHeading eyebrow="Recent articles" title="Latest from the community" href={primaryRoute} />
          {featured ? <div className="mt-6"><FeaturedCard post={featured} href={hrefFor(featured, primaryTask, primaryRoute)} /></div> : null}
          <div className="mt-4">
            {recent.map((post) => <HorizontalCard key={post.id || post.slug} post={post} href={hrefFor(post, primaryTask, primaryRoute)} />)}
          </div>
        </div>

        <aside className="min-w-0 border-l border-[var(--editable-border)] pl-0 lg:pl-6">
          <SectionHeading eyebrow="Author showcase" title="Notable picks" />
          <div className="mt-3">
            {pool.slice(0, 8).map((post, index) => (
              <CompactCard key={post.id || post.slug} post={post} href={hrefFor(post, primaryTask, primaryRoute)} index={index} />
            ))}
          </div>
        </aside>

        {showcase.length ? (
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Visual shelf" title="Image-first discoveries" href={primaryRoute} />
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {showcase.map((post) => <ImageFirstCard key={post.id || post.slug} post={post} href={hrefFor(post, primaryTask, primaryRoute)} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections = timeSections.length ? timeSections : [{ key: 'fresh', posts: posts.slice(0, 8), href: primaryRoute }]
  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`${container} py-10`}>
        <SectionHeading eyebrow="Top articles" title="More worth opening" href={primaryRoute} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {visible.flatMap((section) => section.posts).slice(0, 8).map((post, index) => (
            <EditorialListCard key={post.id || post.slug} post={post} href={hrefFor(post, primaryTask, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#fbf7fa]">
      <div className={`${container} py-10`}>
        <div className="grid gap-5 rounded-sm border border-[var(--editable-border)] bg-white p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)]"><Sparkles className="mr-1 inline h-4 w-4" /> Share something useful</p>
            <h2 className="editable-display mt-2 text-2xl font-semibold uppercase text-[var(--slot4-page-text)]">Publish an article, listing, or profile</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--slot4-muted-text)]">Add thoughtful content that helps readers discover people, services, ideas and resources.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/create" className="inline-flex items-center gap-2 rounded-sm bg-[var(--slot4-accent)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8D5F8C]">
              Create <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/search" className="inline-flex items-center gap-2 rounded-sm border border-[var(--editable-border)] px-5 py-3 text-sm font-bold text-[var(--slot4-accent)] transition hover:border-[var(--slot4-accent)]">
              <Clock3 className="h-4 w-4" /> Read latest
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
