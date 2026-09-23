export type UserRole = 'student' | 'senior' | 'alumni';

export interface User {
  id: string;
  name: string;
  email: string;
  branch: string;
  year: string;
  avatar: string;
  campusPoints: number;
  rep: number;
  bio: string;
  skills: string[];
  badges: string[];
  contributions: {
    uploads: number;
    answers: number;
    advice: number;
  };
  savedResourceIds: number[];
  savedPostIds: number[];
  likedPostIds: number[];
}

export type PostType = 'upload' | 'question' | 'senior' | 'discussion';

export interface CommentItem {
  id: string;
  postId: number | string;
  authorName: string;
  authorAvatar: string;
  authorBranch: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: number | string;
  type: PostType;
  avatar: string;
  name: string;
  branch: string;
  year: string;
  time: string;
  title: string;
  content?: string;
  subject?: string | null;
  sem?: string | null;
  likes: number;
  comments: number;
  saves: number;
  downloads?: number;
  tags: string[];
  badge?: string | null;
}

export interface Resource {
  id: number | string;
  title: string;
  subject: string;
  branch: string;
  sem: string;
  uploader: string;
  year: string;
  rating: number;
  downloads: number;
  premium: boolean;
  type: string;
  price?: number;
  description?: string;
  tableOfContents?: string[];
  contentSample?: string;
}

export interface SeniorMentor {
  id: number | string;
  avatar: string;
  name: string;
  branch: string;
  year: string;
  skills: string[];
  resources: number;
  advice: number;
  rep: number;
  badge: string;
  bio: string;
}

export interface SeniorAdvice {
  id: string;
  senior: string;
  branch: string;
  tip: string;
  likes: number;
  tag: string;
}

export interface MarketplaceItem {
  id: number | string;
  title: string;
  desc: string;
  seller: string;
  rating: number;
  sales: number;
  price: number;
  preview: boolean;
  badge: string | null;
  subject?: string;
  type?: string;
  contentSnippet?: string;
}

export interface ResourceRequest {
  id: string;
  title: string;
  subject: string;
  branch: string;
  sem: string;
  details?: string;
  requesterName: string;
  createdAt: string;
  status: 'Open' | 'Fulfilled';
}

export interface SeniorInquiry {
  id: string;
  seniorId: number | string;
  seniorName: string;
  studentName: string;
  studentBranch: string;
  topic: string;
  message: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  resourceLinks?: { id: number | string; title: string; type: string }[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}
