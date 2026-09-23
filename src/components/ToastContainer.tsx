import React from 'react';
import { useAppContext } from '../store/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const borderColors = {
          success: 'border-emerald-600/60 bg-[#241B12]/95 text-emerald-200',
          error: 'border-rose-600/60 bg-[#241B12]/95 text-rose-200',
          info: 'border-amber-600/60 bg-[#241B12]/95 text-amber-200',
        };

        const icons = {
          success: '✓',
          error: '✕',
          info: 'ℹ',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-300 ${
              borderColors[toast.type]
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                toast.type === 'success'
                  ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                  : toast.type === 'error'
                  ? 'bg-rose-950 border border-rose-500/40 text-rose-300'
                  : 'bg-amber-950 border border-amber-500/40 text-amber-300'
              }`}
            >
              {icons[toast.type]}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-100 leading-tight">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-amber-200/70 mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-amber-200/40 hover:text-amber-100 text-xs shrink-0 px-1 py-0.5"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};
