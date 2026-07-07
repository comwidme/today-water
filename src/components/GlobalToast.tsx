import { useToast } from '../context/ToastContext'

export const GlobalToast = () => {
  const { toast, hideToast } = useToast()

  if (!toast) return null

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
        <p className="flex-1">{toast.message}</p>
        {toast.onUndo ? (
          <button
            type="button"
            onClick={() => {
              toast.onUndo?.()
              hideToast()
            }}
            className="shrink-0 font-medium text-emerald-300 hover:text-emerald-200"
          >
            실행 취소
          </button>
        ) : null}
        <button
          type="button"
          onClick={hideToast}
          className="shrink-0 text-gray-400 hover:text-white"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
