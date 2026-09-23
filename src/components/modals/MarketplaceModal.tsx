import React, { useState } from 'react';
import { MarketplaceItem } from '../../store/types';
import { useAppContext } from '../../store/AppContext';

interface MarketplacePreviewModalProps {
  item: MarketplaceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (item: MarketplaceItem) => void;
  isOwned: boolean;
}

export const MarketplacePreviewModal: React.FC<MarketplacePreviewModalProps> = ({
  item,
  isOpen,
  onClose,
  onPurchase,
  isOwned,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#221A0F] border border-amber-800/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/80">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300/40 hover:text-amber-200 text-lg transition-colors"
        >
          ✕
        </button>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            {item.badge && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700/40">
                {item.badge}
              </span>
            )}
            <span className="text-xs text-amber-200/50">{item.subject || 'CS301'} · {item.type || 'Study Pack'}</span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl md:text-2xl font-bold text-amber-100">
            {item.title}
          </h2>
          <p className="text-xs text-amber-200/60 mt-1">
            Curated by <span className="text-amber-400 font-medium">{item.seller}</span>
          </p>
        </div>

        {/* Price & Rating */}
        <div className="p-4 rounded-xl bg-[#1A1208] border border-amber-900/30 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-xl">🪙</span>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-amber-300 text-2xl font-bold">
                {item.price}
              </span>
              <span className="text-xs text-amber-200/50 ml-1.5">Campus Points</span>
            </div>
          </div>
          <div className="text-right text-xs text-amber-200/60">
            <span className="text-amber-400">★ {item.rating}</span>
            <span className="block text-[11px] text-amber-200/40">{item.sales} students enrolled</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1.5">Description</h4>
          <p className="text-xs text-amber-200/80 leading-relaxed bg-[#2C1E12]/50 p-3 rounded-xl border border-amber-900/20">
            {item.desc}
          </p>
        </div>

        {/* Content Snippet */}
        {item.contentSnippet && (
          <div className="mb-6">
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1.5">Sample Contents Included</h4>
            <div className="bg-[#1A1208] p-3 rounded-xl border border-amber-900/30 text-xs text-amber-200/70 leading-relaxed">
              {item.contentSnippet}
            </div>
          </div>
        )}

        {/* Action */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-amber-900/30">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-amber-900/30 text-xs text-amber-200/60 hover:text-amber-200"
          >
            Close
          </button>
          {isOwned ? (
            <button
              disabled
              className="px-6 py-2 rounded-xl bg-emerald-900/50 border border-emerald-600/40 text-emerald-200 text-xs font-semibold"
            >
              ✓ Access Granted (Unlocked)
            </button>
          ) : (
            <button
              onClick={() => {
                onPurchase(item);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-amber-100 text-xs font-semibold border border-red-700/50 shadow-lg shadow-red-950/50 transition-all hover:scale-[1.02]"
            >
              Get Access ({item.price} CP) →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface MarketplaceSellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketplaceSellModal: React.FC<MarketplaceSellModalProps> = ({ isOpen, onClose }) => {
  const { addMarketplaceItem } = useAppContext();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(40);
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('Study Pack');
  const [contentSnippet, setContentSnippet] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    addMarketplaceItem({
      title: title.trim(),
      desc: desc.trim(),
      price: Number(price) || 30,
      subject: subject.trim() || 'General',
      type,
      contentSnippet: contentSnippet.trim() || 'Comprehensive exam compilation & solved questions.',
    });

    onClose();
  };

  const packTypes = ['Study Pack', 'Exam Blitz', 'Masterclass Notes', 'Cheat Sheet', 'PYQ Solution Bundle'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#221A0F] border border-amber-800/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/80">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300/40 hover:text-amber-200 text-lg transition-colors"
        >
          ✕
        </button>

        <div className="mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-900/50 border border-amber-700/40 flex items-center justify-center text-lg mb-2">
            🪙
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl md:text-2xl font-bold text-amber-100">
            Publish on SSTC Marketplace
          </h2>
          <p className="text-xs text-amber-200/60 mt-1">
            Earn Campus Points when fellow students access your notes & study packs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">Study Pack Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Complete Operating Systems Revision Pack"
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2 text-sm text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-amber-300/80 mb-1">Subject Code</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. CS302"
                className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-amber-300/80 mb-1">Resource Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-600/60"
              >
                {packTypes.map(pt => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">Price (in Campus Points) *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm">🪙</span>
              <input
                type="number"
                min={10}
                max={200}
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl pl-9 pr-3 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-600/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">Description *</label>
            <textarea
              rows={2}
              required
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="What makes this study pack indispensable for exam preparation?"
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">What is included?</label>
            <input
              type="text"
              value={contentSnippet}
              onChange={e => setContentSnippet(e.target.value)}
              placeholder="e.g. Unit 1-5 notes + 30 solved numericals"
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-amber-900/40 text-xs text-amber-200/60 hover:text-amber-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-900 hover:bg-red-800 text-amber-100 text-xs font-medium border border-red-700/50 shadow-md shadow-red-950/50"
            >
              List on Marketplace (+20 CP) →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
