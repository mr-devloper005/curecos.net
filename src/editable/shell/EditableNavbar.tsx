'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, PlusCircle, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

type NavItem = {
  label: string
  href?: string
  action?: () => void
}

function Dot() {
  return <span className="hidden text-[#A376A2] sm:inline" aria-hidden="true">&middot;</span>
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const accountName = session?.name || session?.email

  const desktopItems: NavItem[] = session
    ? [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Create', href: '/create' },
        { label: 'Logout', action: logout },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Login', href: '/login' },
        { label: 'Signup', href: '/signup' },
      ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/95 text-[var(--editable-nav-text)] shadow-[0_1px_0_rgba(107,63,105,0.12)] backdrop-blur-md">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] curecos-sheen">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="relative z-10 h-8 w-8 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="editable-display block truncate text-2xl font-semibold italic leading-none text-[var(--slot4-accent)]">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {accountName ? (
            <span className="mr-1 hidden max-w-[150px] items-center gap-2 truncate text-sm font-bold text-[var(--slot4-accent)] lg:inline-flex">
              <UserRound className="h-4 w-4" /> {accountName}
            </span>
          ) : null}
          {desktopItems.map((item, index) => {
            const active = item.href ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false
            const content = item.action ? (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.04em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]"
              >
                <LogOut className="h-4 w-4" /> {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href || '/'}
                className={`inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.04em] transition ${
                  active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-accent)]'
                }`}
              >
                {item.label === 'Create' ? <PlusCircle className="h-4 w-4" /> : null}
                {item.label}
              </Link>
            )

            return (
              <span key={item.label} className="inline-flex items-center gap-4">
                {index > 0 ? <Dot /> : null}
                {content}
              </span>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-sm border border-[var(--editable-border)] bg-white p-2 text-[var(--slot4-accent)] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4 md:hidden">
          {accountName ? (
            <p className="mb-3 flex items-center gap-2 rounded-sm bg-[var(--slot4-accent-soft)] px-4 py-3 text-sm font-bold text-[var(--slot4-accent)]">
              <UserRound className="h-4 w-4" /> {accountName}
            </p>
          ) : null}
          <div className="grid gap-1">
            {desktopItems.map((item) => {
              const active = item.href ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false
              return item.action ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    item.action?.()
                    setOpen(false)
                  }}
                  className="rounded-sm px-4 py-3 text-left text-sm font-bold uppercase text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-accent-soft)]"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || '/'}
                  onClick={() => setOpen(false)}
                  className={`rounded-sm px-4 py-3 text-sm font-bold uppercase ${
                    active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-accent-soft)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
