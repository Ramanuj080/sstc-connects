# SSTC Connect 🎓

> A unified digital campus platform for students of Shri Shankaracharya Technical Campus (SSTC), Bhilai.

SSTC Connect brings campus communities, academic resources, senior guidance, and student-to-student services together in one place.

---

## ✨ Features

### 👥 Student Community
- Connect with fellow students
- Share posts and participate in campus discussions
- Comment and interact with the student community
- Discover useful campus conversations

### 📚 Digital Resource Library
- Access academic notes and study materials
- Browse resources shared by students
- Preview available resources
- Request resources from the community

### 🎓 Connect With Seniors
- Discover senior students
- Ask questions and seek academic guidance
- Learn from seniors' experience
- Get advice about academics and campus life

### 🛒 Student Marketplace
- Browse items listed by students
- Create marketplace listings
- Discover opportunities to buy and sell within the student community

### 🤖 AI Student Assistant
- Ask questions through the built-in AI assistant
- Get help discovering relevant resources
- Receive guidance related to academics and campus activities

### 🔐 Google Authentication
- Sign in using Google
- Automatically populate basic profile information
- Create and manage a student profile
- Firebase Authentication integration

---

## 🎯 The Problem

Students often depend on multiple disconnected platforms for study materials, senior guidance, campus discussions, academic support, student communities, and buying and selling.

As information becomes scattered across different groups and platforms, finding the right resource or person can become difficult.

**SSTC Connect brings these experiences together into one student-focused digital campus.**

---

## 💡 Our Vision

We envision SSTC Connect as a digital layer for campus life where students can:

**Learn → Connect → Collaborate → Help → Grow**

The platform is designed to make campus resources easier to discover while encouraging students to help and learn from one another.

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend & Cloud
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

### Development
- Git
- GitHub
- npm

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── modals/
│   └── ToastContainer.tsx
├── firebase/
│   ├── auth.ts
│   └── config.ts
├── store/
│   ├── AppContext.tsx
│   ├── initialData.ts
│   └── types.ts
├── App.tsx
├── index.css
└── main.tsx
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/sstc-connect.git
cd sstc-connect
npm install
npm run dev
```

The application will be available at the local URL provided by Vite.

---

## 🔥 Firebase Setup

The project uses Firebase for authentication and cloud services.

Configure:

- Firebase Authentication
- Google Sign-In
- Cloud Firestore
- Firebase Storage

Update the Firebase configuration in:

```text
src/firebase/config.ts
```

For production deployments, keep sensitive third-party API credentials in environment variables rather than committing them to the repository.

---

## 🔐 Environment Variables

If external API keys are added to the project, store them in:

```text
.env.local
```

Example:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Never commit private API keys, passwords, tokens, or other secrets to GitHub.

---

## 🏗️ Architecture

SSTC Connect uses a component-based React architecture with centralized application state.

The application is organized around:

- Reusable React components
- Context-based state management
- Firebase authentication
- Cloud-ready data services
- Modular feature components

---

## 🔮 Future Roadmap

- Real-time student chat
- Advanced AI-powered academic assistance
- Personalized resource recommendations
- Campus event management
- Push notifications
- Faculty announcements and insights
- Advanced search and filtering
- Expanded student marketplace capabilities
- Deeper integration with campus services

---

## 🏆 Hackathon Project

SSTC Connect was developed as a hackathon project with the goal of solving a real campus problem through a practical, student-centric digital platform.

### Team

**Team Beyonders**

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Open a pull request

---

## 📄 License

This project is developed for educational and hackathon purposes.

---

<div align="center">

### SSTC Connect

**One digital campus for learning, collaboration, and student support.**

Built with ❤️ by Team Beyonders

</div>
