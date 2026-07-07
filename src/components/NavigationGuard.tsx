type NavigationGuardProps = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const NavigationGuard = ({
  open,
  onCancel,
  onConfirm,
}: NavigationGuardProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="navigation-guard-title"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 id="navigation-guard-title" className="text-lg font-semibold text-gray-900">
          나가시겠습니까?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          작성 중인 내용이 저장되지 않습니다. 나가시겠습니까?
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
