type EmptyStateProps = {
  title: string
  description?: string
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center">
    <p className="text-base font-medium text-emerald-900">{title}</p>
    {description ? (
      <p className="mt-2 text-sm text-emerald-700/80">{description}</p>
    ) : null}
  </div>
)
