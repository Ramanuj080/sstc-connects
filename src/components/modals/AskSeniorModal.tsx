import React, { useState } from 'react';
import { SeniorMentor } from '../../store/types';
import { useAppContext } from '../../store/AppContext';

interface AskSeniorModalProps {
  senior: SeniorMentor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AskSeniorModal: React.FC<AskSeniorModalProps> = ({ senior, isOpen, onClose }) => {
  const { askSenior } = useAppContext();

  const [topic, setTopic] = useState('Placements');
  const [message, setMessage] = useState('');

  if (!isOpen || !senior) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    askSenior({
      seniorId: senior.id,
      seniorName: senior.name,
      topic,
      message: message.trim(),
    });

    setMessage('');
    onClose();
  };

  const topics = ['Placements & Internships', 'DSA & Coding', 'Core Subjects / GATE', 'Projects & Hackathons', 'Resume Review', 'Exam Strategy'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#221A0F] border border-amber-800/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/80">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300/40 hover:text-amber-200 text-lg transition-colors"
        >
          ✕
        </button>

        {/* Senior Profile Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-amber-900/30">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-900 to-amber-900 border border-amber-600/40 flex items-center justify-center font-serif font-bold text-amber-200 text-base">
            {senior.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700/40">
              {senior.badge}
            </span>
            <h3 className="text-base font-bold text-amber-100 mt-1">
              Ask {senior.name}
            </h3>
            <p className="text-xs text-amber-200/50">
              {senior.year} ({senior.branch})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">
              Guidance Topic
            </label>
            <select
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-600/60"
            >
              {topics.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">
              Your Question or Advice Request *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Hi bhaiya/didi, I am in 3rd sem CSE. How did you manage DSA preparation along with semester exams..."
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60 resize-none leading-relaxed"
            />
          </div>

          <p className="text-[11px] text-amber-200/40 italic">
            💡 Mentors usually respond within 24 hours. Their replies appear in your campus inbox.
          </p>

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
              Send Question →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
