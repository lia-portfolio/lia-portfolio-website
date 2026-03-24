import { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

export type ToastType = 'success' | 'error'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl px-5 py-4 shadow-2xl max-w-sm
        ${type === 'success'
          ? 'bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 border border-emerald-200 dark:border-emerald-700'
          : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-200 dark:border-red-700'
        }`}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" />
      ) : (
        <XCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-600 dark:text-red-300" />
      )}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
