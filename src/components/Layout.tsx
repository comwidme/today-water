import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type PageHeaderProps = {
  title: string
  backTo?: string
  onBack?: () => void
  action?: ReactNode
}

export const PageHeader = ({ title, backTo, onBack, action }: PageHeaderProps) => (
  <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white/95 px-4 py-4 backdrop-blur">
    {backTo ? (
      <Link
        to={backTo}
        className="rounded-lg px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
        aria-label="뒤로가기"
      >
        ←
      </Link>
    ) : null}
    {onBack ? (
      <button
        type="button"
        onClick={onBack}
        className="rounded-lg px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
        aria-label="뒤로가기"
      >
        ←
      </button>
    ) : null}
    <h1 className="flex-1 truncate text-lg font-semibold text-gray-900">{title}</h1>
    {action}
  </header>
)

type AppLayoutProps = {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="mx-auto min-h-svh w-full max-w-md bg-gray-50 md:max-w-2xl lg:max-w-4xl">
    {children}
  </div>
)
