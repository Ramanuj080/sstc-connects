import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { signInWithGoogle } from '../../firebase/auth';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, joinOrUpdateUser } = useAppContext();

  const [name, setName] = useState(currentUser.name || '');
  const [branch, setBranch] = useState(currentUser.branch || 'CSE');
  const [year, setYear] = useState(currentUser.year || '3rd Year');
  const [email, setEmail] = useState(currentUser.email || '');
  const [loading, setLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');

  // Keep form synced with the Firebase user
  useEffect(() => {
    setName(currentUser.name || '');
    setBranch(currentUser.branch || 'CSE');
    setYear(currentUser.year || '3rd Year');
    setEmail(currentUser.email || '');
  }, [currentUser]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
  try {
    setLoading(true);
    setGoogleError('');

    const user = await signInWithGoogle();

    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');

      // Keep the Join SSTC modal open
      // so the user can complete their profile
    }
  } catch (error) {
    console.error('Google login failed:', error);
    setGoogleError('Google login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    joinOrUpdateUser({
      name: name.trim(),
      branch,
      year,
      email:
        email.trim() ||
        `${name.toLowerCase().replace(/\s+/g, '.') || 'student'}@sstc.ac.in`,
    });

    onClose();
  };

  const branches = [
    'CSE',
    'ECE',
    'Mechanical',
    'Civil',
    'AI & ML',
    'Data Science',
    'IT',
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#221A0F] border border-amber-800/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/80">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-300/40 hover:text-amber-200 text-lg transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-red-800 to-amber-900 border border-amber-700/50 flex items-center justify-center text-amber-200 text-xl font-bold font-serif">
            S
          </div>

          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl font-bold text-amber-100"
          >
            Join SSTC Connect
          </h2>

          <p className="text-xs text-amber-200/60 mt-1">
            Access campus notes, discussions, senior mentors, and 250 welcome Campus Points.
          </p>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-medium text-sm flex items-center justify-center gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              {/* Google G */}
              <span className="font-bold text-lg">G</span>
              Continue with Google
            </>
          )}
        </button>

        {googleError && (
          <p className="text-center text-xs text-red-400 mt-2">
            {googleError}
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-amber-800/30" />
          <span className="text-[11px] text-amber-200/40">
            OR COMPLETE PROFILE MANUALLY
          </span>
          <div className="flex-1 h-px bg-amber-800/30" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">
              Full Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Rahul Kumar"
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60"
            />
          </div>

          {/* Branch + Year */}
          <div className="grid grid-cols-2 gap-3">

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
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-amber-300/80 mb-1">
                Year of Study
              </label>

              <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-600/60"
              >
                {years.map(y => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-amber-300/80 mb-1">
              College Email
            </label>

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. student@sstc.ac.in"
              className="w-full bg-[#1A1208] border border-amber-900/40 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-600/60"
            />
          </div>

          {/* Bonus Points */}
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/30 flex items-center gap-3">
            <span className="text-xl">🪙</span>

            <div>
              <p className="text-xs font-semibold text-amber-300">
                250 Campus Points Bonus
              </p>

              <p className="text-[11px] text-amber-200/60">
                Ready to spend immediately on premium exam packs & notes.
              </p>
            </div>
          </div>

          {/* Manual Profile Button */}
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-xl bg-red-900 hover:bg-red-800 text-amber-100 font-medium text-sm border border-red-700/60 shadow-lg shadow-red-950/50 transition-all hover:scale-[1.01]"
          >
            Create Student Profile →
          </button>

        </form>
      </div>
    </div>
  );
};