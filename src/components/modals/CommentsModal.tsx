import React, { useState } from 'react';
import { Post } from '../../store/types';
import { useAppContext } from '../../store/AppContext';

interface CommentsModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ post, isOpen, onClose }) => {
  const { getCommentsForPost, addComment, currentUser } = useAppContext();
  const [newComment, setNewComment] = useState('');

  if (!isOpen || !post) return null;

  const comments = getCommentsForPost(post.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment(post.id, newComment);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#221A0F] border border-amber-800/40 rounded-2xl p-6 shadow-2xl shadow-black/80 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-amber-900/30">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-900/40 text-red-300 border border-red-800/40">
              {post.type.toUpperCase()}
            </span>
            <h3 className="text-sm font-semibold text-amber-100 mt-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-xs text-amber-200/50 mt-0.5">
              by {post.name} ({post.branch} · {post.year})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-amber-300/40 hover:text-amber-200 text-lg ml-2"
          >
            ✕
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-3 min-h-[160px]">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-amber-200/40 text-xs">
              No comments yet. Be the first SSTC student to reply!
            </div>
          ) : (
            comments.map(c => (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-[#1A1208]/80 border border-amber-900/20 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-red-950 border border-amber-700/30 flex items-center justify-center text-xs font-semibold text-amber-200 shrink-0">
                  {c.authorAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-amber-200">
                      {c.authorName} <span className="text-[10px] text-amber-200/40">({c.authorBranch})</span>
                    </span>
                    <span className="text-[10px] text-amber-200/40">{c.createdAt}</span>
                  </div>
                  <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
                    {c.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Comment Input */}
        <form onSubmit={handleSubmit} className="pt-3 border-t border-amber-900/30 flex gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-900/60 border border-amber-600/30 flex items-center justify-center text-xs font-semibold text-amber-200 shrink-0 self-center">
            {currentUser.avatar}
          </div>
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Write a helpful reply or tip..."
            className="flex-1 bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 rounded-xl bg-red-900 hover:bg-red-800 disabled:opacity-40 text-amber-100 text-xs font-medium border border-red-700/50 transition-colors"
          >
            Reply
          </button>
        </form>
      </div>
    </div>
  );
};
