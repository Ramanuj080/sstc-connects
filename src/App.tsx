import { useState, useEffect, useRef } from 'react';
import { useAppContext } from './store/AppContext';
import { Post, Resource, SeniorMentor, MarketplaceItem } from './store/types';
import { JoinModal } from './components/modals/JoinModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { CommentsModal } from './components/modals/CommentsModal';
import { ResourcePreviewModal } from './components/modals/ResourcePreviewModal';
import { RequestResourceModal } from './components/modals/RequestResourceModal';
import { MarketplacePreviewModal, MarketplaceSellModal } from './components/modals/MarketplaceModal';
import { AskSeniorModal } from './components/modals/AskSeniorModal';
import { ToastContainer } from './components/ToastContainer';

// ─── Constants ────────────────────────────────────────────────────────────────

const AI_SUGGESTIONS = [
  'Find CSE 2nd semester DBMS notes',
  'Show me PYQs for Engineering Mathematics',
  'Help me prepare for Data Structures exam',
  'What resources are available for Operating Systems?',
  'Who has shared DSA resources?',
  'Suggest a study plan for Semester 5 exams',
];

const CONTRIBUTORS = [
  { avatar: 'RK', name: 'Rahul Kumar', branch: 'CSE', rep: 2840, uploads: 34, answers: 67, badge: 'Top Contributor' },
  { avatar: 'MJ', name: 'Meera Joshi', branch: 'ECE', rep: 2210, uploads: 28, answers: 43, badge: 'Scholar' },
  { avatar: 'AP', name: 'Arjun Patel', branch: 'CSE', rep: 1980, uploads: 22, answers: 55, badge: 'Subject Expert' },
  { avatar: 'KS', name: 'Kavya Srivastava', branch: 'CSE', rep: 1760, uploads: 19, answers: 38, badge: 'Senior Mentor' },
];

const CATEGORIES = ['CSE', 'ECE', 'Mechanical', 'Civil', 'First Year', 'Placements', 'Exams', 'Projects', 'Clubs', 'General'];
const BRANCHES = ['All Branches', 'CSE', 'ECE', 'Mechanical', 'Civil'];
const SEMESTERS = ['All Semesters', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'];
const RESOURCE_TYPES = ['All Types', 'Short Notes', 'Handwritten', 'PYQ Bundle', 'Lab Manual', 'Study Pack', 'Cheat Sheet'];

const TRENDING_TAGS = [
  { tag: '#DBMS', count: 184 },
  { tag: '#DSA', count: 152 },
  { tag: '#EnggMaths', count: 128 },
  { tag: '#Internship2025', count: 96 },
  { tag: '#SemExams', count: 82 },
  { tag: '#PYQ', count: 65 },
];

// ─── Utility Components ──────────────────────────────────────────────────────

function Avatar({ initials, size = 'md', color = 'maroon' }: { initials: string; size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-lg' : 'w-10 h-10 text-sm';
  const bg = color === 'gold' ? 'bg-yellow-800' : 'bg-red-900';
  return (
    <div className={`${sz} ${bg} rounded-full flex items-center justify-center font-semibold text-amber-200 shrink-0 border border-amber-900/30`}>
      {initials}
    </div>
  );
}

function Badge({ label, variant = 'gold' }: { label: string; variant?: 'gold' | 'maroon' | 'sage' | 'blue' }) {
  const cls = {
    gold: 'bg-amber-900/40 text-amber-300 border-amber-700/40',
    maroon: 'bg-red-900/40 text-red-300 border-red-800/40',
    sage: 'bg-green-900/30 text-green-400 border-green-800/30',
    blue: 'bg-blue-900/30 text-blue-300 border-blue-800/30',
  }[variant];
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${cls} uppercase tracking-wide`}>{label}</span>;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <span className="text-amber-400 text-sm">{'★'.repeat(Math.round(rating))}</span>
      <span className="text-amber-200/70 text-xs">{rating.toFixed(1)}</span>
    </span>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      {eyebrow && <p className="text-amber-500 text-xs font-medium uppercase tracking-[0.2em] mb-3">{eyebrow}</p>}
      <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-amber-100 mb-3">{title}</h2>
      {subtitle && <p className="text-amber-200/60 text-base max-w-xl">{subtitle}</p>}
      <div className="mt-4 h-px bg-gradient-to-r from-amber-600/50 via-amber-600/20 to-transparent w-32" />
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function Navbar({
  active,
  setActive,
  onOpenJoin,
  onOpenProfile,
}: {
  active: string;
  setActive: (s: string) => void;
  onOpenJoin: () => void;
  onOpenProfile: () => void;
}) {
  const { currentUser, showToast } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = ['Home', 'Library', 'Community', 'Seniors', 'Marketplace', 'AI Assistant'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#1A1208]/95 backdrop-blur-md border-b border-amber-900/30 shadow-lg shadow-black/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setActive('Home')} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-red-800 to-red-950 border border-amber-700/40 flex items-center justify-center">
            <span className="text-amber-300 text-sm font-bold" style={{ fontFamily: 'serif' }}>S</span>
          </div>
          <div className="leading-tight text-left">
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-amber-100 font-bold text-base">SSTC Connect</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`px-3.5 py-1.5 rounded text-sm transition-colors ${
                active === link
                  ? 'bg-red-900/40 text-amber-200 border border-red-800/40'
                  : 'text-amber-300/70 hover:text-amber-200 hover:bg-amber-900/20'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={() => {
              setActive('Library');
              showToast({ type: 'info', title: 'Granthaalaya Search', message: 'Browse notes, PYQs, and lab manuals.' });
            }}
            title="Search Knowledge Base"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-amber-300/70 hover:text-amber-200 transition-colors rounded hover:bg-amber-900/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>

          {/* Notifications */}
          <button
            onClick={() => {
              showToast({
                type: 'info',
                title: 'Campus Notifications',
                message: `You have 2 new notes in ${currentUser.branch} and 1 senior answer.`,
              });
            }}
            title="Campus Alerts"
            className="relative hidden md:flex items-center gap-1.5 text-sm text-amber-300/70 hover:text-amber-200 transition-colors px-2.5 py-1.5 rounded hover:bg-amber-900/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </button>

          {/* Campus Points Pill */}
          <div
            onClick={() => setActive('Marketplace')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2C1E12] border border-amber-800/30 text-xs text-amber-300 font-medium cursor-pointer hover:border-amber-700/50 transition-colors"
            title="Your Campus Points"
          >
            <span>🪙</span>
            <span>{currentUser.campusPoints} CP</span>
          </div>

          {/* User Profile Avatar Pill */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg bg-[#2C1E12] border border-amber-800/40 hover:border-amber-700/60 transition-colors"
            title="View Student Profile"
          >
            <Avatar initials={currentUser.avatar} size="sm" />
            <span className="hidden lg:inline text-xs text-amber-100 font-medium truncate max-w-[90px]">
              {currentUser.name}
            </span>
          </button>

          {/* Join SSTC button */}
          <button
            onClick={onOpenJoin}
            className="px-3.5 py-1.5 rounded bg-red-900 hover:bg-red-800 text-amber-100 text-xs md:text-sm font-medium border border-red-700/50 transition-colors shadow-sm"
          >
            Join SSTC
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden text-amber-300 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A1208]/98 border-t border-amber-900/30 px-4 py-4 flex flex-col gap-2">
          {navLinks.map(link => (
            <button key={link} onClick={() => { setActive(link); setMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded text-sm ${active === link ? 'bg-red-900/40 text-amber-200' : 'text-amber-300/70'}`}
            >
              {link}
            </button>
          ))}
          <div className="pt-2 border-t border-amber-900/20 flex items-center justify-between text-xs text-amber-300 px-3">
            <span>🪙 {currentUser.campusPoints} Campus Points</span>
            <button onClick={() => { onOpenProfile(); setMenuOpen(false); }} className="underline text-amber-200">
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function FloatingCard({ icon, label, delay, x, y }: { icon: string; label: string; delay: number; x: string; y: string }) {
  return (
    <div
      className="absolute bg-[#2C1E12]/80 backdrop-blur border border-amber-800/30 rounded-xl px-3 py-2 flex items-center gap-2 float-anim shadow-lg"
      style={{ left: x, top: y, animationDelay: `${delay}s`, animationDuration: `${3.5 + delay * 0.4}s` }}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-amber-200 text-xs font-medium whitespace-nowrap">{label}</span>
    </div>
  );
}

function HeroSection({ setActive }: { setActive: (s: string) => void }) {
  const { resources, posts, seniors } = useAppContext();

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center pt-16 overflow-hidden pattern-bg">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A1A0E]/60 via-transparent to-[#1A1208]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-950/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-900/10 blur-3xl pointer-events-none" />

      {/* Floating ecosystem cards — hidden on mobile */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none overflow-hidden">
        <FloatingCard icon="📚" label={`${resources.length * 400}+ Notes`} delay={0} x="8%" y="25%" />
        <FloatingCard icon="💬" label={`${posts.length * 30}+ Discussions`} delay={0.6} x="78%" y="20%" />
        <FloatingCard icon="🎓" label={`${seniors.length * 40}+ Seniors`} delay={1.2} x="82%" y="60%" />
        <FloatingCard icon="📝" label="Ask Questions" delay={0.3} x="6%" y="65%" />
        <FloatingCard icon="🚀" label="Share Projects" delay={0.9} x="75%" y="40%" />
        <FloatingCard icon="🤖" label="SSTC AI" delay={1.5} x="10%" y="45%" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 fade-in-up">
        <p className="text-amber-500 text-xs font-medium uppercase tracking-[0.3em] mb-6">
          Shri Shankaracharya Technical Campus, Bhilai
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-7xl font-bold text-amber-100 leading-tight mb-6">
          Your Campus.<br />
          <em className="text-amber-400 not-italic">Your Knowledge.</em><br />
          Your Community.
        </h1>
        <p className="text-amber-200/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          SSTC Connect brings students, knowledge and campus life together in one digital campus — built by SSTC students, for SSTC students.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setActive('Library')}
            className="px-7 py-3 rounded-lg bg-red-900 hover:bg-red-800 text-amber-100 font-medium border border-red-700/60 transition-all hover:shadow-lg hover:shadow-red-900/30 text-sm"
          >
            Explore SSTC Connect
          </button>
          <button
            onClick={() => setActive('Community')}
            className="px-7 py-3 rounded-lg bg-[#2C1E12] hover:bg-[#3A2818] text-amber-200 font-medium border border-amber-800/40 transition-all text-sm"
          >
            Join the Community
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[['2.4K+', 'Resources'], ['840+', 'Students'], ['180+', 'Seniors']].map(([n, l]) => (
            <div key={l} className="text-center">
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-amber-300">{n}</div>
              <div className="text-amber-200/50 text-xs mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-8 bg-amber-600 animate-pulse" />
        <span className="text-amber-500 text-xs uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}

// ─── Feature Intro ───────────────────────────────────────────────────────────

function FeatureIntro({ setActive }: { setActive: (s: string) => void }) {
  const features = [
    { icon: '📚', title: 'Knowledge Library', desc: 'Notes, PYQs, lab manuals, cheat sheets — all tagged by branch, semester and subject.', action: 'Library' },
    { icon: '💬', title: 'Student Community', desc: 'Ask questions, share insights, discuss campus life in a social-media-style feed.', action: 'Community' },
    { icon: '🎓', title: 'Learn from Seniors', desc: 'Connect with seniors who have walked your path — get real advice on placements, projects, exams.', action: 'Seniors' },
    { icon: '🛒', title: 'Marketplace', desc: 'Buy and sell curated study packs using Campus Points — a knowledge economy for SSTC.', action: 'Marketplace' },
    { icon: '🤖', title: 'SSTC AI', desc: 'An AI assistant tuned to your campus — find resources, get recommendations, plan your studies.', action: 'AI Assistant' },
    { icon: '⭐', title: 'Reputation System', desc: 'Earn Scholar, Contributor and Mentor badges by helping your campus community grow.', action: 'Community' },
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-amber-500 text-xs font-medium uppercase tracking-[0.2em] mb-3">Everything your campus knows</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold text-amber-100">
          One platform. Every need.
        </h2>
        <p className="text-amber-200/50 mt-4 max-w-lg mx-auto">What if SSTC had its own Reddit + Notion + LinkedIn + Google Drive?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map(f => (
          <button
            key={f.title}
            onClick={() => setActive(f.action)}
            className="resource-card text-left p-6 rounded-xl bg-[#2C1E12]/60 border border-amber-900/30 hover:border-amber-700/50 group"
          >
            <span className="text-3xl mb-4 block">{f.icon}</span>
            <h3 className="text-amber-100 font-semibold mb-2 group-hover:text-amber-300 transition-colors">{f.title}</h3>
            <p className="text-amber-200/50 text-sm leading-relaxed">{f.desc}</p>
            <div className="mt-4 text-amber-600 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Explore <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Community Feed ───────────────────────────────────────────────────────────

function PostCard({
  post,
  onOpenComments,
}: {
  post: Post;
  onOpenComments: (p: Post) => void;
}) {
  const { toggleLikePost, toggleSavePost, currentUser, getCommentsForPost } = useAppContext();

  const isLiked = currentUser.likedPostIds.includes(post.id as any);
  const isSaved = currentUser.savedPostIds.includes(post.id as any);
  const commentsCount = getCommentsForPost(post.id).length;

  const typeLabel: Record<string, string> = {
    upload: '📚 Uploaded a resource',
    question: '📝 Asked a question',
    senior: '🎓 Senior advice',
    discussion: '💬 Started a discussion',
  };
  const typeBadge: Record<string, 'sage' | 'blue' | 'gold' | 'maroon'> = {
    upload: 'sage',
    question: 'blue',
    senior: 'gold',
    discussion: 'maroon',
  };

  return (
    <div className="resource-card bg-[#2C1E12]/50 border border-amber-900/25 rounded-xl p-5 hover:border-amber-800/50">
      <div className="flex items-start gap-3 mb-4">
        <Avatar initials={post.avatar} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="text-amber-100 font-medium text-sm">{post.name}</span>
            {post.badge && <Badge label={post.badge} variant={typeBadge[post.type] || 'gold'} />}
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-200/40">
            <span>{post.branch} · {post.year}</span>
            <span>·</span>
            <span>{typeLabel[post.type] || '💬 Post'}</span>
            <span>·</span>
            <span>{post.time}</span>
          </div>
        </div>
      </div>

      <h3 className="text-amber-100 font-medium mb-1 leading-snug">{post.title}</h3>
      {post.content && (
        <p className="text-xs text-amber-200/70 mb-3 leading-relaxed">{post.content}</p>
      )}
      {post.subject && (
        <div className="flex items-center gap-2 mb-3 text-xs text-amber-200/50">
          <span>{post.subject}</span> · <span>{post.sem}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-amber-900/30 text-amber-400/70 border border-amber-800/20">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-amber-200/50">
        <button
          onClick={() => toggleLikePost(post.id)}
          className={`flex items-center gap-1.5 hover:text-amber-300 transition-colors ${isLiked ? 'text-red-400 font-semibold' : ''}`}
        >
          {isLiked ? '❤️' : '🤍'} {post.likes}
        </button>
        <button
          onClick={() => onOpenComments(post)}
          className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
        >
          💬 {commentsCount}
        </button>
        <button
          onClick={() => toggleSavePost(post.id)}
          className={`flex items-center gap-1.5 hover:text-amber-300 transition-colors ${isSaved ? 'text-amber-400 font-semibold' : ''}`}
        >
          {isSaved ? '🔖' : '📌'} {post.saves}
        </button>
        {post.downloads && (
          <span className="flex items-center gap-1 ml-auto text-amber-600">
            ⬇ {post.downloads}
          </span>
        )}
      </div>
    </div>
  );
}

function CommunityPage({ onOpenComments }: { onOpenComments: (p: Post) => void }) {
  const { posts, addPost, currentUser } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [postText, setPostText] = useState('');
  const [postType, setPostType] = useState<Post['type']>('discussion');

  // Fix: filter posts by activeCategory properly!
  const filteredPosts = posts.filter(post => {
    if (activeCategory === 'All') return true;
    const cat = activeCategory.toLowerCase();
    return (
      post.tags.some(t => t.toLowerCase() === cat) ||
      post.branch.toLowerCase() === cat ||
      (activeCategory === 'Exams' && (post.tags.includes('Exam Tips') || post.tags.includes('PYQ') || (post.title && post.title.toLowerCase().includes('exam')))) ||
      (activeCategory === 'Projects' && (post.tags.includes('Projects') || post.tags.includes('Career'))) ||
      (activeCategory === 'First Year' && (post.sem === 'Sem 1' || post.sem === 'Sem 2')) ||
      (activeCategory === 'General' && (!post.subject || post.tags.includes('General')))
    );
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    addPost({
      title: postText.trim(),
      type: postType,
      branch: currentUser.branch,
      tags: [currentUser.branch, activeCategory !== 'All' ? activeCategory : 'Campus'],
    });

    setPostText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionHeader eyebrow="Student Community" title="What's happening at SSTC" subtitle="Questions, notes, discussions — your campus knowledge feed." />

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${activeCategory === cat ? 'bg-red-900/60 text-amber-200 border-red-700/50' : 'text-amber-300/50 border-amber-800/30 hover:text-amber-200 hover:border-amber-700/40'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} onOpenComments={onOpenComments} />
            ))
          ) : (
            <div className="text-center py-16 bg-[#2C1E12]/30 rounded-xl border border-amber-900/20">
              <p className="text-3xl mb-2">💬</p>
              <p className="text-amber-200/60 text-sm">No posts in #{activeCategory} yet.</p>
              <p className="text-amber-200/40 text-xs mt-1">Start the conversation by posting below!</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Post composer */}
          <form onSubmit={handleCreatePost} className="bg-[#2C1E12]/50 border border-amber-900/25 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-amber-200/50 text-xs">Share with your campus</p>
              <span className="text-[10px] text-amber-400/80 font-mono">+10 CP on post</span>
            </div>

            <textarea
              rows={3}
              value={postText}
              onChange={e => setPostText(e.target.value)}
              className="w-full bg-[#1A1208] border border-amber-900/30 rounded-lg px-3 py-2 text-sm text-amber-100 placeholder-amber-200/30 resize-none focus:outline-none focus:border-amber-700/50"
              placeholder="Ask a question, share notes, or start a discussion..."
            />

            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => setPostType('upload')}
                className={`text-lg p-1 rounded hover:scale-110 transition-transform ${postType === 'upload' ? 'bg-amber-900/40 border border-amber-700/40' : ''}`}
                title="Resource Upload"
              >
                📚
              </button>
              <button
                type="button"
                onClick={() => setPostType('question')}
                className={`text-lg p-1 rounded hover:scale-110 transition-transform ${postType === 'question' ? 'bg-amber-900/40 border border-amber-700/40' : ''}`}
                title="Ask Question"
              >
                ❓
              </button>
              <button
                type="button"
                onClick={() => setPostType('discussion')}
                className={`text-lg p-1 rounded hover:scale-110 transition-transform ${postType === 'discussion' ? 'bg-amber-900/40 border border-amber-700/40' : ''}`}
                title="General Discussion"
              >
                💡
              </button>

              <button
                type="submit"
                disabled={!postText.trim()}
                className="ml-auto px-4 py-1.5 rounded bg-red-900/70 hover:bg-red-800 disabled:opacity-40 text-amber-100 text-xs border border-red-700/40 transition-colors"
              >
                Post
              </button>
            </div>
          </form>

          {/* Trending tags */}
          <div className="bg-[#2C1E12]/50 border border-amber-900/25 rounded-xl p-4">
            <p className="text-amber-400 text-xs font-medium uppercase tracking-wide mb-3">Trending</p>
            {TRENDING_TAGS.map(item => (
              <button
                key={item.tag}
                onClick={() => setActiveCategory(item.tag.replace('#', ''))}
                className="w-full flex items-center justify-between py-1.5 border-b border-amber-900/20 last:border-0 hover:bg-amber-900/10 px-1 rounded transition-colors text-left"
              >
                <span className="text-amber-200/70 text-sm">{item.tag}</span>
                <span className="text-amber-500/50 text-xs">{item.count} posts</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Library ─────────────────────────────────────────────────────────────────

function ResourceCard({
  r,
  onOpenPreview,
}: {
  r: Resource;
  onOpenPreview: (res: Resource) => void;
}) {
  const { toggleSaveResource, downloadResourceFile, currentUser } = useAppContext();
  const isSaved = currentUser.savedResourceIds.includes(r.id as any);

  return (
    <div className="resource-card bg-[#2C1E12]/60 border border-amber-900/25 rounded-xl p-4 hover:border-amber-700/40 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge label={r.type} variant="gold" />
            {r.premium && <Badge label="Premium" variant="maroon" />}
          </div>
          <h3 className="text-amber-100 font-medium text-sm leading-snug">{r.title}</h3>
        </div>
        <button
          onClick={() => toggleSaveResource(r.id)}
          className={`text-sm shrink-0 mt-1 ${isSaved ? 'text-amber-400' : 'text-amber-700 hover:text-amber-400'} transition-colors`}
          title={isSaved ? 'Saved to Library' : 'Save to bookmarks'}
        >
          {isSaved ? '🔖' : '📌'}
        </button>
      </div>

      <div className="text-xs text-amber-200/50 flex flex-wrap gap-x-3 gap-y-1">
        <span>{r.subject}</span>
        <span>{r.branch}</span>
        <span>{r.sem}</span>
        <span>by <span className="text-amber-400/80">{r.uploader}</span></span>
        <span>{r.year}</span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <StarRating rating={r.rating} />
          <span className="text-amber-200/40 text-xs">⬇ {r.downloads.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenPreview(r)}
            className="px-3 py-1.5 rounded text-xs font-medium border bg-amber-900/40 text-amber-300 border-amber-700/40 hover:bg-amber-900/60 transition-colors"
          >
            {r.premium ? '🔒 Preview' : '👁 Preview'}
          </button>
          <button
            onClick={() => downloadResourceFile(r)}
            className="px-3 py-1.5 rounded text-xs font-medium border bg-red-900/40 text-red-200 border-red-800/40 hover:bg-red-900/60 transition-colors"
            title="Download Notes File"
          >
            ⬇ Get
          </button>
        </div>
      </div>
    </div>
  );
}

function LibraryPage({
  onOpenPreview,
  onOpenRequest,
}: {
  onOpenPreview: (res: Resource) => void;
  onOpenRequest: () => void;
}) {
  const { resources } = useAppContext();
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('All Branches');
  const [sem, setSem] = useState('All Semesters');
  const [type, setType] = useState('All Types');

  const filtered = resources.filter(r => {
    const q = search.toLowerCase();
    const matchQ = !q || r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q) || (r.description && r.description.toLowerCase().includes(q));
    const matchB = branch === 'All Branches' || r.branch === branch || r.branch === 'All Branches';
    const matchS = sem === 'All Semesters' || r.sem === sem;
    const matchT = type === 'All Types' || r.type === type;
    return matchQ && matchB && matchS && matchT;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionHeader eyebrow="The SSTC Knowledge Library" title="Granthaalaya" subtitle="Notes, PYQs, lab manuals, study guides — discovered by SSTC students, for SSTC students." />

      {/* Search bar */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#2C1E12]/60 border border-amber-900/30 rounded-xl pl-11 pr-4 py-3.5 text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-700/50 text-sm"
          placeholder='Search: "Engineering Mathematics Unit 2 Fourier Series"'
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {([['Branch', BRANCHES, branch, setBranch], ['Semester', SEMESTERS, sem, setSem], ['Type', RESOURCE_TYPES, type, setType]] as any[]).map(([label, opts, val, setter]) => (
          <select
            key={label}
            value={val}
            onChange={e => setter(e.target.value)}
            className="bg-[#2C1E12] border border-amber-900/30 text-amber-200/70 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-amber-700/40 appearance-none cursor-pointer"
          >
            {opts.map((o: string) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        <span className="text-amber-200/40 text-xs self-center ml-auto">{filtered.length} resources found</span>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => <ResourceCard key={r.id} r={r} onOpenPreview={onOpenPreview} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-amber-200/50 mb-2">No resources found</p>
          <p className="text-amber-200/30 text-sm">Can't find what you're looking for? Request it below.</p>
          <button
            onClick={onOpenRequest}
            className="mt-4 px-5 py-2 rounded-lg bg-[#2C1E12] border border-amber-800/30 text-amber-300 text-sm hover:border-amber-700/50 transition-colors"
          >
            Request a Resource
          </button>
        </div>
      )}

      {/* Request missing resources */}
      <div className="mt-12 p-6 rounded-xl bg-[#2C1E12]/40 border border-amber-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-amber-100 font-medium">Can't find what you're looking for?</p>
          <p className="text-amber-200/50 text-sm mt-1">Request a resource and the community will help.</p>
        </div>
        <button
          onClick={onOpenRequest}
          className="px-5 py-2.5 rounded-lg bg-red-900/50 hover:bg-red-900/70 text-amber-100 text-sm border border-red-800/40 transition-colors whitespace-nowrap"
        >
          Request Resource
        </button>
      </div>
    </div>
  );
}

// ─── Seniors ─────────────────────────────────────────────────────────────────

function SeniorCard({
  s,
  onOpenAsk,
}: {
  s: SeniorMentor;
  onOpenAsk: (senior: SeniorMentor) => void;
}) {
  const badgeVariant: Record<string, any> = {
    'Senior Mentor': 'gold', 'Subject Expert': 'blue', 'Scholar': 'sage', 'Contributor': 'maroon',
  };
  return (
    <div className="resource-card bg-[#2C1E12]/60 border border-amber-900/25 rounded-xl p-5 flex flex-col gap-4 hover:border-amber-700/40">
      <div className="flex items-center gap-3">
        <Avatar initials={s.avatar} size="lg" />
        <div>
          <p className="text-amber-100 font-semibold">{s.name}</p>
          <p className="text-amber-200/50 text-xs">{s.branch} · {s.year}</p>
          {s.badge && <div className="mt-1.5"><Badge label={s.badge} variant={badgeVariant[s.badge]} /></div>}
        </div>
        <div className="ml-auto text-right">
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-amber-300 font-bold">{s.rep.toLocaleString()}</p>
          <p className="text-amber-200/40 text-xs">rep</p>
        </div>
      </div>

      <p className="text-amber-200/60 text-sm leading-relaxed">{s.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {s.skills.map(sk => (
          <span key={sk} className="text-xs px-2 py-0.5 rounded bg-amber-900/20 text-amber-400/70 border border-amber-800/20">{sk}</span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-amber-200/40 pt-2 border-t border-amber-900/20">
        <span>📚 {s.resources} resources</span>
        <span>💬 {s.advice} advice posts</span>
        <button
          onClick={() => onOpenAsk(s)}
          className="px-3 py-1.5 rounded bg-red-900/40 text-red-200 text-xs border border-red-800/30 hover:bg-red-900/60 transition-colors"
        >
          Ask a Senior
        </button>
      </div>
    </div>
  );
}

function SeniorsPage({ onOpenAsk }: { onOpenAsk: (senior: SeniorMentor) => void }) {
  const { seniors, seniorAdvice } = useAppContext();
  const [selectedTopic, setSelectedTopic] = useState('All');

  const topics = ['All', 'Subjects', 'Exams', 'Internships', 'Placements', 'Projects', 'Coding', 'Hackathons', 'Clubs', 'Career'];

  const filteredAdvice = seniorAdvice.filter(a => {
    if (selectedTopic === 'All') return true;
    return a.tag.toLowerCase() === selectedTopic.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionHeader eyebrow="Learn from Seniors" title="Advice from those who walked the path" subtitle="Connect with seniors who have already navigated your journey." />

      {/* Topic filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {topics.map(t => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs border transition-colors ${selectedTopic === t ? 'bg-amber-900/60 text-amber-200 border-amber-700/60 font-medium' : 'border-amber-800/30 text-amber-300/60 hover:text-amber-200 hover:border-amber-700/50'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {seniors.map(s => <SeniorCard key={s.id} s={s} onOpenAsk={onOpenAsk} />)}
      </div>

      {/* Senior advice highlights */}
      <div className="mt-12">
        <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold text-amber-200 mb-5">
          Recent Senior Advice {selectedTopic !== 'All' ? `(#${selectedTopic})` : ''}
        </h3>
        <div className="flex flex-col gap-3">
          {filteredAdvice.length > 0 ? (
            filteredAdvice.map(a => (
              <div key={a.id} className="bg-[#2C1E12]/40 border border-amber-900/20 rounded-xl p-4 flex gap-4">
                <div className="w-1 self-stretch rounded-full bg-amber-700/50 shrink-0" />
                <div className="flex-1">
                  <p className="text-amber-200/80 text-sm leading-relaxed italic">"{a.tip}"</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-amber-200/40">
                    <span className="text-amber-400/70 font-medium">{a.senior}</span>
                    <span>{a.branch}</span>
                    <Badge label={a.tag} variant="gold" />
                    <span className="ml-auto">❤️ {a.likes}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-amber-200/40 text-xs">
              No senior advice tagged under #{selectedTopic} yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Marketplace ──────────────────────────────────────────────────────────────

function MarketplacePage({
  onOpenPreview,
  onOpenSell,
}: {
  onOpenPreview: (item: MarketplaceItem) => void;
  onOpenSell: () => void;
}) {
  const { marketplaceItems, currentUser, buyMarketplaceItem, purchasedItemIds, showToast } = useAppContext();
  const badgeMap: Record<string, any> = { Bestseller: 'gold', 'Top Rated': 'maroon', New: 'sage' };

  const handleEarnMore = () => {
    showToast({
      type: 'info',
      title: 'How to Earn Campus Points (CP)',
      message: 'Upload notes (+10 CP), answer community questions (+2 CP), or publish a study pack (+20 CP)!',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionHeader eyebrow="SSTC Marketplace" title="Share Knowledge. Earn Campus Points." subtitle="Buy and sell premium study packs — all priced in Campus Points, our fictional campus currency." />

      {/* Points balance card */}
      <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-red-950/60 to-amber-950/40 border border-amber-800/30 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center text-amber-300 text-lg">🪙</div>
        <div>
          <p className="text-amber-200/50 text-xs">Your Campus Points Balance</p>
          <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-amber-300 text-2xl font-bold">
            {currentUser.campusPoints} CP
          </p>
        </div>
        <button
          onClick={handleEarnMore}
          className="ml-auto px-4 py-2 rounded-lg bg-amber-900/30 border border-amber-700/30 text-amber-300 text-sm hover:bg-amber-900/50 transition-colors"
        >
          Earn More →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketplaceItems.map(item => {
          const isOwned = purchasedItemIds.includes(item.id);

          return (
            <div key={item.id} className="resource-card bg-[#2C1E12]/60 border border-amber-900/25 rounded-xl p-5 flex flex-col gap-3 hover:border-amber-700/40">
              <div className="flex items-start justify-between">
                <div>
                  {item.badge && <div className="mb-2"><Badge label={item.badge} variant={badgeMap[item.badge] || 'gold'} /></div>}
                  <h3 className="text-amber-100 font-medium leading-snug">{item.title}</h3>
                </div>
              </div>
              <p className="text-amber-200/50 text-sm leading-relaxed">{item.desc}</p>

              <div className="flex items-center gap-3 text-xs text-amber-200/40">
                <span>by <span className="text-amber-400/70">{item.seller}</span></span>
                <StarRating rating={item.rating} />
                <span>⬇ {item.sales}</span>
              </div>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-amber-900/20">
                <div className="flex items-center gap-1">
                  <span className="text-amber-300 text-lg">🪙</span>
                  <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-amber-300 font-bold text-lg">{item.price}</span>
                  <span className="text-amber-200/40 text-xs ml-1">CP</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenPreview(item)}
                    className="px-3 py-1.5 rounded text-xs border border-amber-800/30 text-amber-300/60 hover:border-amber-700/50 transition-colors"
                  >
                    Preview
                  </button>
                  {isOwned ? (
                    <button
                      onClick={() => onOpenPreview(item)}
                      className="px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-medium"
                    >
                      ✓ Unlocked
                    </button>
                  ) : (
                    <button
                      onClick={() => buyMarketplaceItem(item.id)}
                      className="px-3 py-1.5 rounded bg-red-900/50 hover:bg-red-800/60 text-amber-100 text-xs border border-red-800/40 transition-colors"
                    >
                      Get Access
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sell CTA */}
      <div className="mt-10 p-6 rounded-xl bg-gradient-to-br from-[#3A1E0E]/60 to-[#2C1E12]/60 border border-amber-800/25 text-center">
        <p className="text-2xl mb-3">💡</p>
        <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-amber-200 mb-2">Share your knowledge, earn Campus Points</h3>
        <p className="text-amber-200/50 text-sm mb-5 max-w-md mx-auto">Upload your notes, create a study pack and earn CP when other students access them.</p>
        <button
          onClick={onOpenSell}
          className="px-6 py-2.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-amber-100 border border-red-700/40 text-sm transition-colors cursor-pointer"
        >
          Start Selling →
        </button>
      </div>
    </div>
  );
}

// ─── AI Assistant ─────────────────────────────────────────────────────────────

function AIAssistantPage() {
  const { chatMessages, sendChatMessage, clearChat, currentUser } = useAppContext();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    sendChatMessage(input.trim());
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <SectionHeader eyebrow="SSTC AI" title="Your AI campus guide" subtitle="Find resources, get recommendations, and plan your studies with AI that knows SSTC." />
        <button
          onClick={clearChat}
          className="text-xs px-3 py-1.5 rounded-lg border border-amber-900/30 text-amber-200/50 hover:text-amber-200 hover:border-amber-700/40 transition-colors shrink-0"
        >
          Clear Chat
        </button>
      </div>

      <div className="bg-[#2C1E12]/50 border border-amber-900/25 rounded-2xl flex flex-col" style={{ height: '62vh' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {chatMessages.map(m => (
            <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-900 to-amber-900 flex items-center justify-center text-sm shrink-0 pulse-gold">🤖</div>
              )}
              {m.role === 'user' && <Avatar initials={currentUser.avatar} size="sm" />}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${m.role === 'assistant' ? 'bg-[#3A2818] text-amber-100 border border-amber-900/30' : 'bg-red-900/50 text-amber-100 border border-red-800/30'}`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
          {AI_SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => sendChatMessage(s)}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-amber-900/20 border border-amber-800/30 text-amber-300/70 hover:text-amber-200 hover:border-amber-700/40 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-amber-900/20 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            className="flex-1 bg-[#1A1208] border border-amber-900/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 placeholder-amber-200/30 focus:outline-none focus:border-amber-700/50"
            placeholder="Ask SSTC AI anything about subjects, notes, or mentors..."
          />
          <button onClick={send} className="px-4 py-2.5 rounded-xl bg-red-900/60 hover:bg-red-800 text-amber-100 border border-red-700/40 text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Home (sections after hero) ───────────────────────────────────────────────

function ContributorsSection() {
  const badgeMap: Record<string, any> = { 'Top Contributor': 'gold', Scholar: 'sage', 'Subject Expert': 'blue', 'Senior Mentor': 'maroon' };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="ornament-divider mb-12"><span className="text-xs uppercase tracking-widest shrink-0">Campus Contributors</span></div>
      <SectionHeader eyebrow="Meet the contributors" title="Knowledge leaders of SSTC" subtitle="Students who power the community — through notes, answers, and mentorship." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CONTRIBUTORS.map((c, i) => (
          <div key={c.name} className="resource-card bg-[#2C1E12]/50 border border-amber-900/20 rounded-xl p-4 text-center flex flex-col items-center gap-3 hover:border-amber-700/40">
            <div className="relative">
              <Avatar initials={c.avatar} size="lg" />
              {i === 0 && <span className="absolute -top-1 -right-1 text-base">👑</span>}
            </div>
            <div>
              <p className="text-amber-100 font-medium text-sm">{c.name}</p>
              <p className="text-amber-200/40 text-xs">{c.branch}</p>
            </div>
            <Badge label={c.badge} variant={badgeMap[c.badge]} />
            <div className="w-full pt-2 border-t border-amber-900/20 grid grid-cols-3 gap-1 text-center">
              {[['📚', c.uploads], ['💬', c.answers], ['⭐', c.rep]].map(([icon, val], j) => (
                <div key={j}>
                  <div className="text-xs text-amber-200/50">{icon}</div>
                  <div className="text-amber-300 text-xs font-medium">{val}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ setActive }: { setActive: (s: string) => void }) {
  return (
    <section className="py-24 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent pointer-events-none" />
      <div className="ornament-divider mb-12 max-w-xl mx-auto"><span className="text-xs uppercase tracking-widest shrink-0">Join SSTC Connect</span></div>
      <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-bold text-amber-100 max-w-2xl mx-auto leading-tight mb-5">
        Your campus already has the knowledge.<br />
        <em className="text-amber-400 not-italic">SSTC Connect brings it together.</em>
      </h2>
      <p className="text-amber-200/50 mb-10 max-w-md mx-auto">Join 840+ students already sharing, learning and growing together on SSTC Connect.</p>
      <button
        onClick={() => setActive('Library')}
        className="px-10 py-3.5 rounded-xl bg-red-900 hover:bg-red-800 text-amber-100 font-medium border border-red-700/60 transition-all hover:shadow-xl hover:shadow-red-900/30 text-base"
      >
        Enter SSTC Connect →
      </button>
      <div className="mt-20 h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />
      <p className="mt-8 text-amber-200/25 text-sm">
        SSTC Connect · Shri Shankaracharya Technical Campus, Bhilai · 2026
      </p>
    </section>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────

function MobileBottomNav({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const tabs = [
    { label: 'Home', icon: '🏠', key: 'Home' },
    { label: 'Library', icon: '📚', key: 'Library' },
    { label: 'Community', icon: '💬', key: 'Community' },
    { label: 'Seniors', icon: '🎓', key: 'Seniors' },
    { label: 'AI', icon: '🤖', key: 'AI Assistant' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#1A1208]/95 backdrop-blur-md border-t border-amber-900/30 z-40 px-2 pb-safe">
      <div className="flex items-center justify-around h-14">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${active === t.key ? 'text-amber-300' : 'text-amber-200/40'}`}
          >
            <span className="text-base">{t.icon}</span>
            <span className="text-[9px]">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { buyMarketplaceItem, purchasedItemIds } = useAppContext();
  const [active, setActive] = useState('Home');

  // Global Modals State
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPostForComments, setSelectedPostForComments] = useState<Post | null>(null);
  const [selectedResourceForPreview, setSelectedResourceForPreview] = useState<Resource | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedMarketplaceItem, setSelectedMarketplaceItem] = useState<MarketplaceItem | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedSeniorForAsk, setSelectedSeniorForAsk] = useState<SeniorMentor | null>(null);

  const renderPage = () => {
    switch (active) {
      case 'Library':
        return (
          <LibraryPage
            onOpenPreview={res => setSelectedResourceForPreview(res)}
            onOpenRequest={() => setIsRequestModalOpen(true)}
          />
        );
      case 'Community':
        return (
          <CommunityPage
            onOpenComments={post => setSelectedPostForComments(post)}
          />
        );
      case 'Seniors':
        return (
          <SeniorsPage
            onOpenAsk={senior => setSelectedSeniorForAsk(senior)}
          />
        );
      case 'Marketplace':
        return (
          <MarketplacePage
            onOpenPreview={item => setSelectedMarketplaceItem(item)}
            onOpenSell={() => setIsSellModalOpen(true)}
          />
        );
      case 'AI Assistant':
        return <AIAssistantPage />;
      default:
        return (
          <>
            <HeroSection setActive={setActive} />
            <FeatureIntro setActive={setActive} />
            <ContributorsSection />
            <CTASection setActive={setActive} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A1208' }}>
      <ToastContainer />

      <Navbar
        active={active}
        setActive={setActive}
        onOpenJoin={() => setIsJoinModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="pt-0 pb-16 md:pb-0">
        {renderPage()}
      </div>

      <MobileBottomNav active={active} setActive={setActive} />

      {/* Global Modals */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      <CommentsModal
        post={selectedPostForComments}
        isOpen={Boolean(selectedPostForComments)}
        onClose={() => setSelectedPostForComments(null)}
      />

      <ResourcePreviewModal
        resource={selectedResourceForPreview}
        isOpen={Boolean(selectedResourceForPreview)}
        onClose={() => setSelectedResourceForPreview(null)}
      />

      <RequestResourceModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      <MarketplacePreviewModal
        item={selectedMarketplaceItem}
        isOpen={Boolean(selectedMarketplaceItem)}
        onClose={() => setSelectedMarketplaceItem(null)}
        onPurchase={item => buyMarketplaceItem(item.id)}
        isOwned={Boolean(selectedMarketplaceItem && purchasedItemIds.includes(selectedMarketplaceItem.id))}
      />

      <MarketplaceSellModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />

      <AskSeniorModal
        senior={selectedSeniorForAsk}
        isOpen={Boolean(selectedSeniorForAsk)}
        onClose={() => setSelectedSeniorForAsk(null)}
      />
    </div>
  );
}
