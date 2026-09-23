import React, { useState } from 'react';
import { useAppContext } from '../../store/AppContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, joinOrUpdateUser, showToast } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [skillsInput, setSkillsInput] = useState(currentUser.skills.join(', '));

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedSkills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    joinOrUpdateUser({
      bio,
      skills: parsedSkills,
    });
    setIsEditing(false);
    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your campus profile details have been saved.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#221A0F] border border-amber-800/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300/40 hover:text-amber-200 text-lg transition-colors"
        >
          ✕
        </button>

        {/* Profile Card Header (LinkedIn + GitHub + Student ID feel) */}
        <div className="flex items-start gap-4 pb-6 border-b border-amber-900/30">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-900 via-amber-900 to-amber-950 border-2 border-amber-600/50 flex items-center justify-center text-amber-200 text-xl font-bold font-serif shadow-lg">
            {currentUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-amber-100">
                {currentUser.name}
              </h2>
              {currentUser.badges.map(b => (
                <span key={b} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-900/50 text-amber-300 border border-amber-700/40">
                  {b}
                </span>
              ))}
            </div>
            <p className="text-xs text-amber-200/60 mt-0.5">
              {currentUser.branch} · {currentUser.year} · {currentUser.email}
            </p>
            <p className="text-[11px] text-amber-500/80 mt-1 font-mono">
              SSTC Student ID: SSTC-2024-{currentUser.branch}-042
            </p>
          </div>
        </div>

        {/* Campus Stats / Points banner */}
        <div className="grid grid-cols-3 gap-3 my-6">
          <div className="p-3.5 rounded-xl bg-[#2C1E12]/80 border border-amber-900/30 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-300 font-bold text-lg font-serif">
              🪙 {currentUser.campusPoints}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-amber-200/50 mt-1">Campus Points</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#2C1E12]/80 border border-amber-900/30 text-center">
            <div className="text-amber-300 font-bold text-lg font-serif">
              ⭐ {currentUser.rep}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-amber-200/50 mt-1">Reputation</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#2C1E12]/80 border border-amber-900/30 text-center">
            <div className="text-amber-300 font-bold text-lg font-serif">
              📚 {currentUser.contributions.uploads + currentUser.contributions.answers}
            </div>
            <p className="text-[10px] uppercase tracking-wider text-amber-200/50 mt-1">Contributions</p>
          </div>
        </div>

        {/* Contributions breakdown */}
        <div className="p-4 rounded-xl bg-[#1A1208] border border-amber-900/30 mb-6">
          <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">Campus Impact</p>
          <div className="grid grid-cols-3 text-center text-xs text-amber-200/70">
            <div>
              <span className="block font-bold text-amber-100">{currentUser.contributions.uploads}</span>
              <span className="text-[10px] text-amber-200/40">Notes Uploaded</span>
            </div>
            <div>
              <span className="block font-bold text-amber-100">{currentUser.contributions.answers}</span>
              <span className="text-[10px] text-amber-200/40">Questions Solved</span>
            </div>
            <div>
              <span className="block font-bold text-amber-100">{currentUser.contributions.advice}</span>
              <span className="text-[10px] text-amber-200/40">Advice Posts</span>
            </div>
          </div>
        </div>

        {/* Bio & Skills */}
        {!isEditing ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">About</p>
              <p className="text-sm text-amber-200/70 leading-relaxed italic">
                "{currentUser.bio || 'SSTC student passionate about technology and academic collaboration.'}"
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">Skills & Focus</p>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.skills.map(s => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-300/90 border border-amber-800/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-amber-900/30 flex justify-between items-center">
              <span className="text-xs text-amber-200/40">Status: Active Student</span>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-amber-900/30 border border-amber-700/40 text-amber-200 text-xs hover:bg-amber-900/50 transition-colors"
              >
                ✏ Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-amber-300/80 mb-1">Bio / Headline</label>
              <textarea
                rows={2}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-600/60 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-amber-300/80 mb-1">Skills (comma separated)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={e => setSkillsInput(e.target.value)}
                className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-600/60"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-lg border border-amber-900/40 text-amber-200/60 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-red-900 text-amber-100 text-xs border border-red-700/50"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
