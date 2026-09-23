import React from 'react';
import { Resource } from '../../store/types';
import { useAppContext } from '../../store/AppContext';

interface ResourcePreviewModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResourcePreviewModal: React.FC<ResourcePreviewModalProps> = ({
  resource,
  isOpen,
  onClose,
}) => {
  const { downloadResourceFile, toggleSaveResource, currentUser } = useAppContext();

  if (!isOpen || !resource) return null;

  const isSaved = currentUser.savedResourceIds.includes(resource.id as any);

  const handleDownload = () => {
    downloadResourceFile(resource);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#221A0F] border border-amber-800/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto flex flex-col gap-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300/40 hover:text-amber-200 text-lg transition-colors"
        >
          ✕
        </button>

        {/* Top Info */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700/40">
              {resource.type}
            </span>
            {resource.premium && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-900/40 text-red-300 border border-red-800/40">
                Premium
              </span>
            )}
            <span className="text-xs text-amber-200/50">
              {resource.subject} · {resource.branch} · {resource.sem} · {resource.year}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl md:text-2xl font-bold text-amber-100">
            {resource.title}
          </h2>
          <p className="text-xs text-amber-200/60 mt-1">
            Contributed by <span className="text-amber-400 font-medium">{resource.uploader}</span> · Verified SSTC Student Notes
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 py-3 px-4 rounded-xl bg-[#1A1208] border border-amber-900/30 text-xs text-amber-200/70">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 text-sm">★</span>
            <span className="font-bold text-amber-100">{resource.rating}</span>
            <span className="text-amber-200/40">/ 5.0</span>
          </div>
          <div>
            <span className="font-bold text-amber-100">{resource.downloads.toLocaleString()}</span> downloads
          </div>
          <div>
            Format: <span className="text-amber-300 font-mono">Markdown / PDF Study Pack</span>
          </div>
        </div>

        {/* Description */}
        {resource.description && (
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1.5">Overview</h4>
            <p className="text-xs md:text-sm text-amber-200/80 leading-relaxed bg-[#2C1E12]/50 p-3.5 rounded-xl border border-amber-900/20">
              {resource.description}
            </p>
          </div>
        )}

        {/* Table of contents */}
        {resource.tableOfContents && resource.tableOfContents.length > 0 && (
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-2">Table of Contents</h4>
            <div className="bg-[#1A1208] p-4 rounded-xl border border-amber-900/30 flex flex-col gap-2">
              {resource.tableOfContents.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-amber-200/80">
                  <span className="text-amber-500 font-mono text-[11px] shrink-0">0{idx + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Content Excerpt */}
        {resource.contentSample && (
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-2">Preview Excerpt</h4>
            <pre className="bg-[#1A1208] p-4 rounded-xl border border-amber-900/30 text-[11px] text-amber-200/80 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
              {resource.contentSample}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 border-t border-amber-900/30 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => toggleSaveResource(resource.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isSaved
                ? 'bg-amber-900/40 text-amber-300 border-amber-600/50'
                : 'border-amber-900/40 text-amber-200/70 hover:text-amber-200 hover:border-amber-700/50'
            }`}
          >
            {isSaved ? '🔖 Saved in Library' : '📌 Save to Profile'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-amber-900/30 text-xs text-amber-200/60 hover:text-amber-200"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-amber-100 text-xs font-medium border border-red-700/50 flex items-center gap-2 shadow-lg shadow-red-950/50 transition-all hover:scale-[1.01]"
            >
              <span>⬇</span>
              <span>Download Study Material</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
