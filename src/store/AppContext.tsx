import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Post,
  CommentItem,
  Resource,
  MarketplaceItem,
  SeniorMentor,
  SeniorAdvice,
  ResourceRequest,
  SeniorInquiry,
  ChatMessage,
  ToastMessage,
} from './types';
import {
  INITIAL_USER,
  INITIAL_POSTS,
  INITIAL_COMMENTS,
  INITIAL_RESOURCES,
  INITIAL_MARKETPLACE,
  INITIAL_SENIORS,
  INITIAL_SENIOR_ADVICE,
} from './initialData';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface AppContextType {
  currentUser: User;
  posts: Post[];
  comments: CommentItem[];
  resources: Resource[];
  marketplaceItems: MarketplaceItem[];
  seniors: SeniorMentor[];
  seniorAdvice: SeniorAdvice[];
  purchasedItemIds: (number | string)[];
  resourceRequests: ResourceRequest[];
  seniorInquiries: SeniorInquiry[];
  chatMessages: ChatMessage[];
  toasts: ToastMessage[];

  // Actions
  joinOrUpdateUser: (data: Partial<User>) => void;
  addPost: (postData: {
    title: string;
    content?: string;
    type?: Post['type'];
    subject?: string;
    sem?: string;
    branch?: string;
    tags?: string[];
  }) => void;
  toggleLikePost: (postId: number | string) => void;
  toggleSavePost: (postId: number | string) => void;
  toggleSaveResource: (resourceId: number | string) => void;
  addComment: (postId: number | string, content: string) => void;
  getCommentsForPost: (postId: number | string) => CommentItem[];
  buyMarketplaceItem: (itemId: number | string) => { success: boolean; message: string };
  addMarketplaceItem: (item: {
    title: string;
    desc: string;
    price: number;
    subject?: string;
    type?: string;
    contentSnippet?: string;
  }) => void;
  requestResource: (req: {
    title: string;
    subject: string;
    branch: string;
    sem: string;
    details?: string;
  }) => void;
  askSenior: (inquiry: {
    seniorId: number | string;
    seniorName: string;
    topic: string;
    message: string;
  }) => void;
  downloadResourceFile: (resource: Resource) => void;
  sendChatMessage: (text: string) => void;
  clearChat: () => void;
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  resetAllData: () => void;
}

const STORAGE_KEY = 'sstc_connect_state_v2';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage if available
  const [isLoaded, setIsLoaded] = useState(false);

  const GUEST_USER: User = {
  ...INITIAL_USER,
  id: 'guest',
  name: 'Guest Student',
  email: '',
  avatar: 'GS',
};

const [currentUser, setCurrentUser] = useState<User>(() => {
  try {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : GUEST_USER;
  } catch {
    return GUEST_USER;
  }
});

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_posts`);
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [comments, setComments] = useState<CommentItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_comments`);
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_resources`);
      return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
    } catch {
      return INITIAL_RESOURCES;
    }
  });

  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_marketplace`);
      return saved ? JSON.parse(saved) : INITIAL_MARKETPLACE;
    } catch {
      return INITIAL_MARKETPLACE;
    }
  });

  const [seniors] = useState<SeniorMentor[]>(INITIAL_SENIORS);
  const [seniorAdvice] = useState<SeniorAdvice[]>(INITIAL_SENIOR_ADVICE);

  const [purchasedItemIds, setPurchasedItemIds] = useState<(number | string)[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_purchases`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [resourceRequests, setResourceRequests] = useState<ResourceRequest[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_requests`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [seniorInquiries, setSeniorInquiries] = useState<SeniorInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_inquiries`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_chat`);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'init_1',
              role: 'assistant',
              text: "Hello! I'm SSTC AI — your campus knowledge assistant. Ask me to find notes, PYQs, senior advice, or anything related to your studies at SSTC.",
              timestamp: 'Just now',
            },
          ];
    } catch {
      return [
        {
          id: 'init_1',
          role: 'assistant',
          text: "Hello! I'm SSTC AI — your campus knowledge assistant. Ask me to find notes, PYQs, senior advice, or anything related to your studies at SSTC.",
          timestamp: 'Just now',
        },
      ];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
// Sync logged-in Google user with Firebase
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) return;

    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Load existing Firebase profile
        setCurrentUser(userSnap.data() as User);
      } else {
        // Create profile for first-time Google login
        const name = firebaseUser.displayName || 'SSTC Student';

        const initials = name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        const newUser: User = {
          ...INITIAL_USER,
          id: firebaseUser.uid,
          name: name,
          email: firebaseUser.email || '',
          avatar: initials,
        };

        await setDoc(userRef, newUser);

        setCurrentUser(newUser);
      }
    } catch (error) {
      console.error('Firebase user sync error:', error);
    }
  });

  return () => unsubscribe();
}, []);
  // Persistent storage sync
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
      localStorage.setItem(`${STORAGE_KEY}_posts`, JSON.stringify(posts));
      localStorage.setItem(`${STORAGE_KEY}_comments`, JSON.stringify(comments));
      localStorage.setItem(`${STORAGE_KEY}_resources`, JSON.stringify(resources));
      localStorage.setItem(`${STORAGE_KEY}_marketplace`, JSON.stringify(marketplaceItems));
      localStorage.setItem(`${STORAGE_KEY}_purchases`, JSON.stringify(purchasedItemIds));
      localStorage.setItem(`${STORAGE_KEY}_requests`, JSON.stringify(resourceRequests));
      localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(seniorInquiries));
      localStorage.setItem(`${STORAGE_KEY}_chat`, JSON.stringify(chatMessages));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [
    isLoaded,
    currentUser,
    posts,
    comments,
    resources,
    marketplaceItems,
    purchasedItemIds,
    resourceRequests,
    seniorInquiries,
    chatMessages,
  ]);

  // Toast Helpers
  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // User Actions
  const joinOrUpdateUser = (data: Partial<User>) => {
    setCurrentUser(prev => {
      const initials = (data.name || prev.name)
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      return {
        ...prev,
        ...data,
        avatar: initials || prev.avatar,
      };
    });
    showToast({
      type: 'success',
      title: 'Welcome to SSTC Connect!',
      message: `Profile active for ${data.name || currentUser.name}. 250 Campus Points ready.`,
    });
  };

  // Community Post Actions
  const addPost = (postData: {
    title: string;
    content?: string;
    type?: Post['type'];
    subject?: string;
    sem?: string;
    branch?: string;
    tags?: string[];
  }) => {
    const newPost: Post = {
      id: 'post_' + Date.now(),
      type: postData.type || 'discussion',
      avatar: currentUser.avatar,
      name: currentUser.name,
      branch: postData.branch || currentUser.branch,
      year: currentUser.year.split(' ')[0] || '3rd',
      time: 'Just now',
      title: postData.title,
      content: postData.content,
      subject: postData.subject || null,
      sem: postData.sem || null,
      likes: 0,
      comments: 0,
      saves: 0,
      tags: postData.tags && postData.tags.length > 0 ? postData.tags : [currentUser.branch, 'Campus'],
      badge: currentUser.badges[0] || null,
    };

    setPosts(prev => [newPost, ...prev]);
    // Reward points for posting knowledge
    setCurrentUser(u => ({
      ...u,
      campusPoints: u.campusPoints + 10,
      rep: u.rep + 15,
      contributions: { ...u.contributions, uploads: u.contributions.uploads + 1 },
    }));

    showToast({
      type: 'success',
      title: 'Post Published!',
      message: 'Earned +10 Campus Points and +15 Reputation!',
    });
  };

  const toggleLikePost = (postId: number | string) => {
    const isLiked = currentUser.likedPostIds.includes(postId as any);
    setCurrentUser(u => ({
      ...u,
      likedPostIds: isLiked
        ? u.likedPostIds.filter(id => id !== postId)
        : [...u.likedPostIds, postId as any],
    }));

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const toggleSavePost = (postId: number | string) => {
    const isSaved = currentUser.savedPostIds.includes(postId as any);
    setCurrentUser(u => ({
      ...u,
      savedPostIds: isSaved
        ? u.savedPostIds.filter(id => id !== postId)
        : [...u.savedPostIds, postId as any],
    }));

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            saves: isSaved ? Math.max(0, p.saves - 1) : p.saves + 1,
          };
        }
        return p;
      })
    );

    showToast({
      type: 'info',
      title: isSaved ? 'Removed from Bookmarks' : 'Post Bookmarked!',
      message: isSaved ? 'Post removed from saved list' : 'Saved to your profile bookmarks',
    });
  };

  const toggleSaveResource = (resourceId: number | string) => {
    const isSaved = currentUser.savedResourceIds.includes(resourceId as any);
    setCurrentUser(u => ({
      ...u,
      savedResourceIds: isSaved
        ? u.savedResourceIds.filter(id => id !== resourceId)
        : [...u.savedResourceIds, resourceId as any],
    }));

    showToast({
      type: 'info',
      title: isSaved ? 'Resource Removed' : 'Resource Saved!',
      message: isSaved ? 'Removed from saved collection' : 'Saved to your personal knowledge library',
    });
  };

  // Comments
  const addComment = (postId: number | string, content: string) => {
    if (!content.trim()) return;
    const newComment: CommentItem = {
      id: 'cmt_' + Date.now(),
      postId,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorBranch: currentUser.branch,
      content: content.trim(),
      createdAt: 'Just now',
    };

    setComments(prev => [...prev, newComment]);
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, comments: p.comments + 1 } : p))
    );
    setCurrentUser(u => ({
      ...u,
      rep: u.rep + 5,
      campusPoints: u.campusPoints + 2,
      contributions: { ...u.contributions, answers: u.contributions.answers + 1 },
    }));

    showToast({
      type: 'success',
      title: 'Comment Added',
      message: 'Earned +2 Campus Points and +5 Reputation!',
    });
  };

  const getCommentsForPost = (postId: number | string) => {
    return comments.filter(c => String(c.postId) === String(postId));
  };

  // Marketplace
  const buyMarketplaceItem = (itemId: number | string) => {
    const item = marketplaceItems.find(i => String(i.id) === String(itemId));
    if (!item) return { success: false, message: 'Item not found' };

    if (purchasedItemIds.includes(itemId)) {
      return { success: true, message: 'You already own this item!' };
    }

    if (currentUser.campusPoints < item.price) {
      showToast({
        type: 'error',
        title: 'Insufficient Campus Points',
        message: `You need ${item.price} CP (You have ${currentUser.campusPoints} CP). Share notes to earn more!`,
      });
      return { success: false, message: 'Insufficient points' };
    }

    // Deduct points, record purchase
    setCurrentUser(u => ({
      ...u,
      campusPoints: u.campusPoints - item.price,
    }));
    setPurchasedItemIds(prev => [...prev, itemId]);
    setMarketplaceItems(prev =>
      prev.map(i => (String(i.id) === String(itemId) ? { ...i, sales: i.sales + 1 } : i))
    );

    showToast({
      type: 'success',
      title: 'Study Pack Unlocked!',
      message: `Deducted ${item.price} Campus Points. You now have full access.`,
    });

    return { success: true, message: 'Purchase successful' };
  };

  const addMarketplaceItem = (item: {
    title: string;
    desc: string;
    price: number;
    subject?: string;
    type?: string;
    contentSnippet?: string;
  }) => {
    const newItem: MarketplaceItem = {
      id: 'market_' + Date.now(),
      title: item.title,
      desc: item.desc,
      seller: currentUser.name,
      rating: 5.0,
      sales: 0,
      price: Number(item.price) || 25,
      preview: true,
      badge: 'New',
      subject: item.subject || 'CS301',
      type: item.type || 'Study Pack',
      contentSnippet: item.contentSnippet || 'Verified student notes compilation.',
    };

    setMarketplaceItems(prev => [newItem, ...prev]);
    setCurrentUser(u => ({
      ...u,
      campusPoints: u.campusPoints + 20,
      rep: u.rep + 30,
    }));

    showToast({
      type: 'success',
      title: 'Listed on Marketplace!',
      message: `"${item.title}" is now available to SSTC students. Earned +20 CP!`,
    });
  };

  // Resource Requests
  const requestResource = (req: {
    title: string;
    subject: string;
    branch: string;
    sem: string;
    details?: string;
  }) => {
    const newReq: ResourceRequest = {
      id: 'req_' + Date.now(),
      title: req.title,
      subject: req.subject,
      branch: req.branch,
      sem: req.sem,
      details: req.details,
      requesterName: currentUser.name,
      createdAt: 'Just now',
      status: 'Open',
    };

    setResourceRequests(prev => [newReq, ...prev]);
    showToast({
      type: 'success',
      title: 'Resource Request Broadcasted',
      message: `Your request for "${req.title}" has been shared with SSTC seniors & contributors.`,
    });
  };

  // Senior Inquiries
  const askSenior = (inquiry: {
    seniorId: number | string;
    seniorName: string;
    topic: string;
    message: string;
  }) => {
    const newInquiry: SeniorInquiry = {
      id: 'inq_' + Date.now(),
      seniorId: inquiry.seniorId,
      seniorName: inquiry.seniorName,
      studentName: currentUser.name,
      studentBranch: currentUser.branch,
      topic: inquiry.topic,
      message: inquiry.message,
      createdAt: 'Just now',
    };

    setSeniorInquiries(prev => [newInquiry, ...prev]);
    showToast({
      type: 'success',
      title: 'Inquiry Sent to Senior',
      message: `${inquiry.seniorName} has been notified of your question regarding ${inquiry.topic}.`,
    });
  };

  // Download Simulated File
  const downloadResourceFile = (resource: Resource) => {
    const content =
      resource.contentSample ||
      `# ${resource.title} (${resource.subject})\n\nBranch: ${resource.branch} · Semester: ${resource.sem}\nUploaded by: ${resource.uploader}\nInstitution: Shri Shankaracharya Technical Campus (SSTC), Bhilai\nRating: ${resource.rating} / 5.0\n\n## Table of Contents:\n${(resource.tableOfContents || []).map(t => '- ' + t).join('\n')}\n\n## Description:\n${resource.description || 'Comprehensive verified study material for SSTC students.'}\n\n---\n*Downloaded via SSTC Connect Knowledge Portal*`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${resource.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Increment downloads count in state
    setResources(prev =>
      prev.map(r => (r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r))
    );

    showToast({
      type: 'success',
      title: 'Download Started',
      message: `Downloaded "${resource.title}.md" to your device.`,
    });
  };

  // AI Chat Assistant
  const sendChatMessage = (userQuery: string) => {
    if (!userQuery.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: userQuery,
      timestamp: 'Just now',
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Local knowledge base search
    setTimeout(() => {
      const q = userQuery.toLowerCase();
      let botResponse = '';

      // Match resources
      const matchedResources = resources.filter(
        r =>
          r.title.toLowerCase().includes(q) ||
          r.subject.toLowerCase().includes(q) ||
          r.branch.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
      );

      // Match seniors
      const matchedSeniors = seniors.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.skills.some(sk => q.includes(sk.toLowerCase())) ||
          s.bio.toLowerCase().includes(q)
      );

      // Match advice
      const matchedAdvice = seniorAdvice.filter(
        a =>
          a.tip.toLowerCase().includes(q) ||
          a.tag.toLowerCase().includes(q) ||
          a.senior.toLowerCase().includes(q)
      );

      if (q.includes('who has shared') || q.includes('who shared') || q.includes('contributor')) {
        const contributorsFound = Array.from(new Set(resources.map(r => r.uploader)));
        botResponse = `🌟 Top knowledge contributors at SSTC include:\n` +
          contributorsFound.map(c => `• **${c}** (Uploaded verified notes across subjects)`).join('\n') +
          `\n\nYou can connect with them in the **Community** or check their uploads in the **Library**.`;
      } else if (q.includes('exam') || q.includes('prepare') || q.includes('preparation')) {
        botResponse = `🎯 **Exam Preparation Guide for SSTC Students:**\n\n` +
          `1. **Top Recommended PYQ Resources:**\n` +
          resources.filter(r => r.type.includes('PYQ') || r.title.includes('Maths') || r.title.includes('DBMS')).slice(0, 2).map(r => `   • [${r.title}] (${r.sem} · ⭐ ${r.rating})`).join('\n') +
          `\n\n2. **Senior Advice from ${seniorAdvice[0]?.senior}:**\n` +
          `   "${seniorAdvice[0]?.tip}"\n\n` +
          `💡 *Tip: Check Granthaalaya (Library) to download full PYQs with university solutions!*`;
      } else if (matchedResources.length > 0) {
        botResponse = `📚 Found ${matchedResources.length} matching resources in the SSTC Knowledge Library:\n\n` +
          matchedResources.slice(0, 3).map(r => `• **${r.title}** (${r.subject} · ${r.sem})\n  By ${r.uploader} · ⭐ ${r.rating} · ⬇ ${r.downloads} downloads [${r.premium ? 'Premium 🔒' : 'Free ⬇'}]`).join('\n\n') +
          `\n\nWould you like to preview or download any of these? Go to **Library** to explore all of them!`;
      } else if (matchedSeniors.length > 0) {
        const s = matchedSeniors[0];
        botResponse = `🎓 Connect with senior mentor **${s.name}** (${s.branch} · ${s.year}):\n` +
          `• **Skills:** ${s.skills.join(', ')}\n` +
          `• **Reputation:** ${s.rep} CP · ${s.resources} resources shared\n` +
          `• **Bio:** "${s.bio}"\n\n` +
          `You can click **Ask a Senior** in the Seniors section to send them a direct message!`;
      } else if (matchedAdvice.length > 0) {
        const adv = matchedAdvice[0];
        botResponse = `💡 Here is advice from **${adv.senior}** (${adv.branch}):\n` +
          `"${adv.tip}"\n\n` +
          `Category: #${adv.tag} · ❤️ ${adv.likes} students found this helpful.`;
      } else {
        botResponse = `🔍 I searched SSTC Connect's digital campus for "${userQuery}".\n\n` +
          `• **Library:** Try searching for specific subject codes like *CS401*, *CS301*, *MA201*.\n` +
          `• **Seniors:** We have mentors placed at Amazon, Infosys, and research labs ready to help.\n` +
          `• **Community:** You can post this as a question on the **Community** feed to get instant answers from peers!\n\n` +
          `How else can I assist your studies today?`;
      }

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        role: 'assistant',
        text: botResponse,
        timestamp: 'Just now',
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 450);
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: 'init_' + Date.now(),
        role: 'assistant',
        text: "Chat cleared. I'm ready to help you find notes, PYQs, and advice across SSTC!",
        timestamp: 'Just now',
      },
    ]);
  };

  const resetAllData = () => {
    localStorage.clear();
    setCurrentUser(INITIAL_USER);
    setPosts(INITIAL_POSTS);
    setComments(INITIAL_COMMENTS);
    setResources(INITIAL_RESOURCES);
    setMarketplaceItems(INITIAL_MARKETPLACE);
    setPurchasedItemIds([]);
    setResourceRequests([]);
    setSeniorInquiries([]);
    setChatMessages([
      {
        id: 'init_default',
        role: 'assistant',
        text: "Hello! I'm SSTC AI — your campus knowledge assistant.",
        timestamp: 'Just now',
      },
    ]);
    showToast({ type: 'info', title: 'Data Reset', message: 'Reset to default seed data.' });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        posts,
        comments,
        resources,
        marketplaceItems,
        seniors,
        seniorAdvice,
        purchasedItemIds,
        resourceRequests,
        seniorInquiries,
        chatMessages,
        toasts,
        joinOrUpdateUser,
        addPost,
        toggleLikePost,
        toggleSavePost,
        toggleSaveResource,
        addComment,
        getCommentsForPost,
        buyMarketplaceItem,
        addMarketplaceItem,
        requestResource,
        askSenior,
        downloadResourceFile,
        sendChatMessage,
        clearChat,
        showToast,
        removeToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
