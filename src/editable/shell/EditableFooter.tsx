'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
  { label: 'Signup', href: '/signup' },
]

function Dot() {
  return <span className="hidden text-[#DDC3C3] sm:inline" aria-hidden="true">&middot;</span>
}

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="h-[5px] bg-[#8D5F8C]" />
      <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-md border border-white/25 bg-white/10">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="editable-display text-2xl font-semibold italic tracking-[0.01em]">{SITE_CONFIG.name}</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-4">
          {footerLinks.map((item, index) => (
            <span key={item.href} className="inline-flex items-center gap-4">
              {index > 0 ? <Dot /> : null}
              <Link href={item.href} className="text-sm font-bold uppercase tracking-[0.06em] text-white/85 transition hover:text-white">
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/15 px-4 py-5 text-center text-xs font-medium tracking-[0.08em] text-white/75">
        &copy; {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
