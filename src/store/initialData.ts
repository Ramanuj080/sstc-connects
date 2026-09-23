import { Post, Resource, SeniorMentor, SeniorAdvice, MarketplaceItem, User, CommentItem } from './types';

export const INITIAL_USER: User = {
  id: 'usr_default',
  name: 'Aman Sharma',
  email: 'aman.sharma@sstc.ac.in',
  branch: 'CSE',
  year: '3rd Year',
  avatar: 'AS',
  campusPoints: 250,
  rep: 420,
  bio: 'CSE 3rd Year student passionate about Systems Programming, DSA & Open Source.',
  skills: ['C++', 'Python', 'React', 'DSA'],
  badges: ['Scholar', 'Active Contributor'],
  contributions: {
    uploads: 6,
    answers: 14,
    advice: 4,
  },
  savedResourceIds: [1, 4],
  savedPostIds: [1],
  likedPostIds: [3],
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    type: 'upload',
    avatar: 'RK',
    name: 'Rahul Kumar',
    branch: 'CSE',
    year: '3rd',
    time: '2h ago',
    title: 'Data Structures — Complete Short Notes',
    content: 'Uploaded hand-curated notes covering Arrays, Linked Lists, Trees, Graphs, and DP with clean diagrams for practical exams.',
    subject: 'CS301',
    sem: 'Sem 5',
    likes: 142,
    comments: 2,
    saves: 67,
    downloads: 310,
    tags: ['DSA', 'CSE', 'Sem5'],
    badge: 'Top Contributor',
  },
  {
    id: 2,
    type: 'question',
    avatar: 'PS',
    name: 'Priya Sharma',
    branch: 'CSE',
    year: '2nd',
    time: '3h ago',
    title: "Can someone explain linked lists before tomorrow's practical?",
    content: 'Specifically having trouble with reverse linked list iterative vs recursive approach. Any quick visual summary would be awesome!',
    subject: 'CS201',
    sem: 'Sem 3',
    likes: 34,
    comments: 3,
    saves: 12,
    tags: ['DSA', 'Question', 'Linked Lists'],
    badge: null,
  },
  {
    id: 3,
    type: 'senior',
    avatar: 'AM',
    name: 'Ankit Mishra',
    branch: 'CSE',
    year: '4th',
    time: '5h ago',
    title: 'How I prepared for my first internship — from zero to Amazon SDE intern',
    content: 'My roadmap: 1. Master Arrays and Trees on LeetCode (200+ solved). 2. Solid grasp of OS and DBMS fundamentals. 3. Two full-stack projects on GitHub with live demos. DM me if you need resume reviews!',
    subject: null,
    sem: null,
    likes: 289,
    comments: 4,
    saves: 198,
    tags: ['Internship', 'Career', 'Senior Advice'],
    badge: 'Senior Mentor',
  },
  {
    id: 4,
    type: 'upload',
    avatar: 'DV',
    name: 'Divya Verma',
    branch: 'ECE',
    year: '3rd',
    time: '6h ago',
    title: 'Engineering Mathematics — Previous Year Questions 2019-2024',
    content: 'Full 5-year CSVTU PYQ compilations for Sem 3 Maths. Unit 2 Fourier Series and Unit 4 Numerical Methods fully solved step-by-step.',
    subject: 'MA201',
    sem: 'Sem 3',
    likes: 96,
    comments: 1,
    saves: 82,
    downloads: 245,
    tags: ['Maths', 'PYQ', 'ECE'],
    badge: 'Scholar',
  },
  {
    id: 5,
    type: 'discussion',
    avatar: 'SA',
    name: 'Sneha Agrawal',
    branch: 'Civil',
    year: '2nd',
    time: '8h ago',
    title: 'Best strategies for scoring 90%+ in semester exams — sharing what worked for me',
    content: '1. Focus on standard university pattern questions. 2. Write neat headings and draw boxed schematics. 3. Solve last 3 years PYQs under timed conditions.',
    subject: null,
    sem: null,
    likes: 178,
    comments: 2,
    saves: 134,
    tags: ['Exam Tips', 'Strategy', 'General'],
    badge: null,
  },
];

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'c1',
    postId: 1,
    authorName: 'Vikram Singh',
    authorAvatar: 'VS',
    authorBranch: 'CSE',
    content: 'These notes saved my midterm exam! The tree traversal diagrams are so clear.',
    createdAt: '1h ago',
  },
  {
    id: 'c2',
    postId: 1,
    authorName: 'Meera Joshi',
    authorAvatar: 'MJ',
    authorBranch: 'ECE',
    content: 'Shared this with our batch group. Thanks Rahul!',
    createdAt: '45m ago',
  },
  {
    id: 'c3',
    postId: 2,
    authorName: 'Ankit Mishra',
    authorAvatar: 'AM',
    authorBranch: 'CSE',
    content: 'Think of reversing a linked list like reversing one arrow at a time using three pointers: prev, curr, next. I have a diagram in my resources.',
    createdAt: '2h ago',
  },
  {
    id: 'c4',
    postId: 2,
    authorName: 'Aman Sharma',
    authorAvatar: 'AS',
    authorBranch: 'CSE',
    content: 'Also check out CS201 Lab Manual in Library, Exercise 4 has the exact code with test cases.',
    createdAt: '1h ago',
  },
  {
    id: 'c5',
    postId: 3,
    authorName: 'Rohan Das',
    authorAvatar: 'RD',
    authorBranch: 'Mech',
    content: 'Inspiring journey bhaiya! Did you do competitive programming or just LeetCode?',
    createdAt: '3h ago',
  },
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 1,
    title: 'DBMS Complete Notes — Unit 1-5',
    subject: 'CS401',
    branch: 'CSE',
    sem: 'Sem 6',
    uploader: 'Arjun Patel',
    year: '2024',
    rating: 4.9,
    downloads: 1240,
    premium: false,
    type: 'Short Notes',
    description: 'Comprehensive unit-wise notes on Relational Algebra, SQL, Normalization (1NF to BCNF), Transaction Processing, and Concurrency Control.',
    tableOfContents: [
      'Unit 1: ER Model, Relational Schema & Relational Algebra',
      'Unit 2: Advanced SQL, Triggers & Views',
      'Unit 3: Functional Dependencies & Normal Forms (1NF, 2NF, 3NF, BCNF)',
      'Unit 4: Transaction Management & ACID Properties',
      'Unit 5: Concurrency Control, Two-Phase Locking & Recovery Protocols',
    ],
    contentSample: `# DBMS Complete Notes — Unit 1-5 (CS401)
Instructor / Contributor: Arjun Patel (CSE Sem 6)
Campus: Shri Shankaracharya Technical Campus, Bhilai

## Overview
These notes are prepared following the university syllabus and question patterns.

### Unit 1 Highlights:
- Entity-Relationship diagram notations and cardinality constraints.
- Translation of ER Schema into relational tables.
- Fundamental Relational Algebra operators: Selection (σ), Projection (π), Cartesian Product (×), Set Difference (-), Union (∪).

### Unit 3 Normalization Summary:
- 1NF: Atomic attribute values only.
- 2NF: 1NF + No partial dependency (non-prime attributes fully dependent on candidate key).
- 3NF: 2NF + No transitive dependency (X -> Y where Y is non-prime and X is not a superkey).
- BCNF: For every functional dependency X -> A, X must be a superkey.

*Verified for University Semester & Practical Exams.*`,
  },
  {
    id: 2,
    title: 'Engineering Maths — Fourier Series Unit 2',
    subject: 'MA201',
    branch: 'All Branches',
    sem: 'Sem 3',
    uploader: 'Meera Joshi',
    year: '2024',
    rating: 4.8,
    downloads: 980,
    premium: false,
    type: 'Handwritten',
    description: 'Neatly handwritten scanned notes explaining Dirichlet conditions, Euler formulas, half-range cosine and sine expansions with 15 solved university problems.',
    tableOfContents: [
      'Topic 1: Periodic Functions & Dirichlet Conditions',
      'Topic 2: Euler Formulas for Interval [-π, π] and [-L, L]',
      'Topic 3: Even and Odd Functions Fourier Expansions',
      'Topic 4: Half Range Sine & Cosine Series',
      'Topic 5: Parseval Identity & Solved University PYQs',
    ],
    contentSample: `# Engineering Mathematics — Fourier Series (MA201)
Contributor: Meera Joshi (Sem 3)
Institution: SSTC Bhilai

## Key Formulas:
Fourier Series of f(x) in (-π, π):
f(x) = a0/2 + Σ [an*cos(nx) + bn*sin(nx)]

Where:
a0 = (1/π) ∫[-π to π] f(x) dx
an = (1/π) ∫[-π to π] f(x)*cos(nx) dx
bn = (1/π) ∫[-π to π] f(x)*sin(nx) dx

For Even Functions: bn = 0 (Cosine series only)
For Odd Functions: a0 = 0, an = 0 (Sine series only)

*Tip: Always test whether f(x) is even or odd before calculating coefficients.*`,
  },
  {
    id: 3,
    title: 'Operating Systems — Complete Exam Pack',
    subject: 'CS302',
    branch: 'CSE',
    sem: 'Sem 5',
    uploader: 'Vikram Singh',
    year: '2024',
    rating: 4.7,
    downloads: 820,
    premium: true,
    price: 40,
    type: 'Study Pack',
    description: 'Targeted exam preparation pack containing process scheduling algorithms, deadlock handling (Banker Algorithm), memory paging, and virtual memory page replacement simulations.',
    tableOfContents: [
      'Module 1: Process Management & CPU Scheduling (FCFS, SJF, Round Robin)',
      'Module 2: Inter-Process Communication & Synchronization (Semaphores, Monitors)',
      'Module 3: Deadlocks — Detection, Prevention & Banker Algorithm',
      'Module 4: Memory Management, Paging & Segmentation',
      'Module 5: Virtual Memory & Page Replacement (FIFO, LRU, Optimal)',
    ],
    contentSample: `# Operating Systems — Complete Exam Pack (CS302)
Author: Vikram Singh (CSE Sem 5)

## Critical Exam Focus Areas:
1. Bankers Algorithm:
   - Need Matrix = Max Matrix - Allocation Matrix.
   - Run safety algorithm using Work and Finish vectors.
2. Page Replacement:
   - FIFO: Simplest, prone to Belady Anomaly.
   - LRU: Replaces page not used for longest period; optimal practical performance.
3. Critical Section Problem:
   - Mutual Exclusion
   - Progress
   - Bounded Waiting`,
  },
  {
    id: 4,
    title: 'Data Structures — Lab Manual',
    subject: 'CS201',
    branch: 'CSE',
    sem: 'Sem 3',
    uploader: 'Rahul Kumar',
    year: '2023',
    rating: 4.6,
    downloads: 730,
    premium: false,
    type: 'Lab Manual',
    description: 'Official verified lab manual with fully compiled C/C++ implementations for stack, queue, binary search trees, and graph BFS/DFS traversals.',
    tableOfContents: [
      'Lab 1: Array Operations & Linear/Binary Search',
      'Lab 2: Singly & Doubly Linked List Implementations',
      'Lab 3: Stack Applications — Infix to Postfix Conversion',
      'Lab 4: Circular Queue & Priority Queue',
      'Lab 5: Binary Search Tree Insertion, Deletion & Traversals',
    ],
    contentSample: `# Data Structures Lab Manual (CS201)
Lab Exercises & Verified Source Code

## Exercise 3: Stack Infix to Postfix
Stack using array:
- top = -1
- push(val): if top == MAX-1 overflow else arr[++top] = val
- pop(): if top == -1 underflow else return arr[top--]

Operator precedence:
^ > * / > + -`,
  },
  {
    id: 5,
    title: 'Computer Networks — PYQ Bundle 2019-2024',
    subject: 'CS403',
    branch: 'CSE',
    sem: 'Sem 6',
    uploader: 'Priya Sharma',
    year: '2024',
    rating: 4.8,
    downloads: 665,
    premium: true,
    price: 35,
    type: 'PYQ Bundle',
    description: 'Six years of university end-semester questions categorized by OSI layers, subnetting calculations, TCP/IP flow control, and routing algorithms.',
    tableOfContents: [
      'Section 1: OSI 7-Layer Model vs TCP/IP Protocol Suite',
      'Section 2: Data Link Layer — CRC, Sliding Window & CSMA/CD',
      'Section 3: Network Layer — CIDR Subnetting & Dijkstra Routing',
      'Section 4: Transport Layer — TCP 3-Way Handshake & Congestion Control',
      'Section 5: Application Layer Protocols — DNS, HTTP, SMTP',
    ],
    contentSample: `# Computer Networks PYQ Bundle (CS403)
Categorized University Exam Solutions (2019-2024)

## Frequently Repeated Questions:
Q1. Explain TCP 3-Way Handshake:
    Client sends SYN (seq = x)
    Server sends SYN-ACK (seq = y, ack = x + 1)
    Client sends ACK (seq = x + 1, ack = y + 1)

Q2. Subnetting formula:
    Number of subnets = 2^s (borrowed bits)
    Hosts per subnet = 2^h - 2`,
  },
  {
    id: 6,
    title: 'Fluid Mechanics — Cheat Sheet',
    subject: 'ME301',
    branch: 'Mechanical',
    sem: 'Sem 5',
    uploader: 'Rohan Das',
    year: '2024',
    rating: 4.5,
    downloads: 540,
    premium: false,
    type: 'Cheat Sheet',
    description: 'Concise 4-page formula sheet summarizing fluid statics, Bernoulli equation, boundary layer theory, and dimensional analysis formulas.',
    tableOfContents: [
      'Sheet 1: Fluid Properties, Viscosity & Manometers',
      'Sheet 2: Fluid Kinematics & Continuity Equation',
      'Sheet 3: Fluid Dynamics — Bernoulli Equation & Venturimeter',
      'Sheet 4: Laminar vs Turbulent Flow & Darcy-Weisbach Equation',
    ],
    contentSample: `# Fluid Mechanics Quick Formula Sheet (ME301)
Mechanical Engineering · Semester 5

## Fundamental Formulas:
1. Dynamic Viscosity: τ = μ (du/dy)
2. Hydrostatic Pressure: P = ρ * g * h
3. Continuity Equation: A1 * V1 = A2 * V2
4. Bernoulli Equation: P/ρg + V²/2g + z = Constant
5. Darcy-Weisbach Head Loss: hf = (4f * L * V²) / (2g * D)`,
  },
];

export const INITIAL_SENIORS: SeniorMentor[] = [
  {
    id: 1,
    avatar: 'AM',
    name: 'Ankit Mishra',
    branch: 'CSE',
    year: '4th Year → Amazon SDE Intern',
    skills: ['DSA', 'React', 'System Design'],
    resources: 34,
    advice: 28,
    rep: 2840,
    badge: 'Senior Mentor',
    bio: 'Placed at Amazon. Happy to guide on DSA, CP, resume shortlisting, and internship prep.',
  },
  {
    id: 2,
    avatar: 'KS',
    name: 'Kavya Srivastava',
    branch: 'CSE',
    year: '4th Year → Infosys SP',
    skills: ['ML', 'Python', 'Deep Learning'],
    resources: 21,
    advice: 45,
    rep: 2210,
    badge: 'Subject Expert',
    bio: 'ML enthusiast. Can help with AI/ML final year projects, research papers, and placements.',
  },
  {
    id: 3,
    avatar: 'RS',
    name: 'Rohit Sahu',
    branch: 'ECE',
    year: '4th Year → VLSI Research',
    skills: ['VLSI', 'Embedded', 'C++'],
    resources: 18,
    advice: 19,
    rep: 1890,
    badge: 'Scholar',
    bio: 'Research scholar at IIT. Ask me about ECE core subjects, Verilog simulations, and GATE prep.',
  },
  {
    id: 4,
    avatar: 'NP',
    name: 'Nisha Pandey',
    branch: 'Civil',
    year: '4th Year → L&T Intern',
    skills: ['AutoCAD', 'STAAD', 'Construction'],
    resources: 27,
    advice: 22,
    rep: 1640,
    badge: 'Contributor',
    bio: 'Got into L&T through campus drive. Guide on Civil placements, site projects, and interviews.',
  },
];

export const INITIAL_SENIOR_ADVICE: SeniorAdvice[] = [
  {
    id: 'sa1',
    senior: 'Ankit Mishra',
    branch: 'CSE',
    tip: "Start DSA from August itself if you want a good placement. LeetCode 200 mediums is the minimum baseline. Don't wait for 7th sem.",
    likes: 178,
    tag: 'Placements',
  },
  {
    id: 'sa2',
    senior: 'Kavya Srivastava',
    branch: 'CSE',
    tip: "For ML projects, don't just do Kaggle competitions. Build something that solves a real campus problem. That's what gets noticed.",
    likes: 134,
    tag: 'Projects',
  },
  {
    id: 'sa3',
    senior: 'Rohit Sahu',
    branch: 'ECE',
    tip: "If you're aiming for GATE, start from 4th semester. Don't underestimate how much the core subjects matter — they come back in 6th and 7th.",
    likes: 98,
    tag: 'Exams',
  },
];

export const INITIAL_MARKETPLACE: MarketplaceItem[] = [
  {
    id: 1,
    title: 'Complete DBMS Exam Pack',
    desc: 'Unit-wise notes, PYQs, and important questions for DBMS. 100+ pages.',
    seller: 'Arjun Patel',
    rating: 4.9,
    sales: 340,
    price: 50,
    preview: true,
    badge: 'Bestseller',
    subject: 'CS401',
    type: 'Exam Pack',
    contentSnippet: 'Complete Unit 1-5 handwritten notes + 25 solved 10-mark questions + 5 year previous year papers with model answers.',
  },
  {
    id: 2,
    title: 'DSA Masterclass Notes',
    desc: 'Hand-curated DSA notes with solved examples. Perfect for placements.',
    seller: 'Rahul Kumar',
    rating: 4.8,
    sales: 280,
    price: 80,
    preview: true,
    badge: 'Top Rated',
    subject: 'CS301',
    type: 'Study Pack',
    contentSnippet: 'Curated handbook of 75 most asked campus interview problems across Dynamic Programming, Graphs, Backtracking, and Binary Trees.',
  },
  {
    id: 3,
    title: 'Engineering Maths — Full Pack',
    desc: 'All 5 units covered with solved PYQs and important derivations.',
    seller: 'Meera Joshi',
    rating: 4.7,
    sales: 195,
    price: 60,
    preview: false,
    badge: null,
    subject: 'MA201',
    type: 'Full Pack',
    contentSnippet: 'Step-by-step solutions for Differential Equations, Fourier Analysis, Laplace Transforms, and Vector Calculus.',
  },
  {
    id: 4,
    title: 'OS Interview Prep Guide',
    desc: 'Comprehensive OS notes tailored for technical interviews.',
    seller: 'Vikram Singh',
    rating: 4.8,
    sales: 162,
    price: 40,
    preview: true,
    badge: 'New',
    subject: 'CS302',
    type: 'Interview Guide',
    contentSnippet: 'Fast-track revision booklet summarizing threads vs processes, critical section, memory segmentation, and Linux CLI commands.',
  },
  {
    id: 5,
    title: 'Computer Networks Exam Blitz',
    desc: 'Targeted 2-day exam prep pack. Covers all key protocols and PYQs.',
    seller: 'Priya Sharma',
    rating: 4.6,
    sales: 148,
    price: 35,
    preview: false,
    badge: null,
    subject: 'CS403',
    type: 'Crash Course',
    contentSnippet: 'High-yield 2-day blitz revision notes for Computer Networks with 30 high-frequency theory questions.',
  },
  {
    id: 6,
    title: 'Fluid Mechanics Smart Notes',
    desc: 'Simplified FM notes with all derivations and formulae. For Mech 5th sem.',
    seller: 'Rohan Das',
    rating: 4.5,
    sales: 94,
    price: 30,
    preview: true,
    badge: null,
    subject: 'ME301',
    type: 'Smart Notes',
    contentSnippet: 'All boundary layer equations, Bernoulli theorem proofs, and Reynolds number problems summarized.',
  },
];

export const INITIAL_CONTRIBUTORS = [
  { avatar: 'RK', name: 'Rahul Kumar', branch: 'CSE', rep: 2840, uploads: 34, answers: 67, badge: 'Top Contributor' },
  { avatar: 'MJ', name: 'Meera Joshi', branch: 'ECE', rep: 2210, uploads: 28, answers: 43, badge: 'Scholar' },
  { avatar: 'AP', name: 'Arjun Patel', branch: 'CSE', rep: 1980, uploads: 22, answers: 55, badge: 'Subject Expert' },
  { avatar: 'KS', name: 'Kavya Srivastava', branch: 'CSE', rep: 1760, uploads: 19, answers: 38, badge: 'Senior Mentor' },
];
