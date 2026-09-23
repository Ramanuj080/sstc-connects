import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';

interface RequestResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestResourceModal: React.FC<RequestResourceModalProps> = ({ isOpen, onClose }) => {
  const { requestResource, currentUser } = useAppContext();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [branch, setBranch] = useState(currentUser.branch || 'CSE');
  const [sem, setSem] = useState('Sem 5');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    requestResource({
      title: title.trim(),
      subject: subject.trim(),
      branch,
      sem,
      details: details.trim(),
    });

    onClose();
  };

  const branches = ['CSE', 'ECE', 'Mechanical', 'Civil', 'AI & ML', 'Data Science', 'IT'];
  const semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#221A0F] border border-amber-800/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/80">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300/40 hover:text-amber-200 text-lg transition-colors"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-900/40 text-red-300 border border-red-800/40">
            Granthaalaya Request
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl md:text-2xl font-bold text-amber-100 mt-2">
            Request Missing Resource
          </h2>
          <p className="text-xs text-amber-200/60 mt-1">
            Can't find a note, lab manual or PYQ? SSTC seniors & contributors will receive your alert.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">
              Resource Name / Topic *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='e.g. Unit 3 Compiler Design Handwritten Notes'
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-amber-300/80 mb-1">
                Subject Code *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. CS502"
                className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-300/80 mb-1">
                Branch
              </label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-600/60"
              >
                {branches.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">
              Semester
            </label>
            <select
              value={sem}
              onChange={e => setSem(e.target.value)}
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-600/60"
            >
              {semesters.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">
              Specific Requirements (Optional)
            </label>
            <textarea
              rows={2}
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="e.g. Need solved numericals from 2023 end-sem exam paper..."
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2 text-xs text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60 resize-none"
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
              Broadcast Request →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
