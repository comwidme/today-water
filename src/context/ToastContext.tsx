import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type ToastAction = {
  message: string
  onUndo?: () => void
}

type ToastContextValue = {
  toast: ToastAction | null
  showToast: (message: string, options?: { onUndo?: () => void }) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastAction | null>(null)

  const showToast = useCallback(
    (message: string, options?: { onUndo?: () => void }) => {
      setToast({ message, onUndo: options?.onUndo })
    },
    [],
  )

  const hideToast = useCallback(() => {
    setToast(null)
  }, [])

  const value = useMemo(
    () => ({ toast, showToast, hideToast }),
    [toast, showToast, hideToast],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
