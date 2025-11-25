# RagaRhythm 🎵

**Discover the Perfect Raga for Every Moment**

RagaRhythm is an AI-powered music discovery app that blends the ancient wisdom of Indian classical ragas with modern technology to help you find the perfect music for your mood and moment.

## ✨ Features

### 🧠 AI Mood Detection
Tell us how you're feeling, and our GPT-4 powered AI will recommend the perfect ragas and songs that match your emotional state.

### 🎵 Classical Raga Library
Explore Hindustani & Carnatic ragas organized by:
- Time of day (Morning, Evening, Night)
- Seasons (Monsoon ragas)
- Mood and emotional states
- Traditional classical principles

### 🎤 Raga Detection (NEW!)
AI-powered raga identification from audio:
- Record yourself singing or humming
- Upload audio files for analysis
- Get detailed raga characteristics
- Learn about aroha, avaroha, and vadi swaras
- Reference guide for popular ragas

### 🎹 Practice Loops (NEW!)
Personalized practice sessions for musicians:
- 6 popular ragas with detailed note patterns
- Adjustable tempo (40-200 BPM)
- 4 traditional taals (Teental, Jhaptaal, Ektaal, Rupak)
- **Real metronome with audio clicks** 🔊
- **Visual beat indicator** with sam emphasis
- **Real-time beat counter** during practice
- Custom loop creation
- Practice tips and YouTube integration
- Difficulty levels (Beginner to Advanced)

### 📖 Theory Lessons (NEW!)
Comprehensive music education:
- 8 detailed lessons covering fundamentals to advanced topics
- Interactive quizzes for knowledge testing
- Topics: Swaras, Ragas, Thaats, Taals, Gharanas, and more
- Progress tracking
- Category-based filtering
- YouTube tutorial integration

### 🌍 Global Music Discovery
Access 150+ curated music categories from around the world:
- Bollywood & Regional Indian Music
- K-Pop, J-Pop, and Asian Music
- Latin, Reggaeton, and Salsa
- Afrobeats, Amapiano
- Arabic, Turkish, and Middle Eastern
- EDM, Hip-Hop, R&B, Rock, Jazz, and more

### 📅 Daily Featured Music
A new music category is featured every day, helping you discover new artists and genres.

### 🎯 Personalized Experience
Your listening history and preferences shape future recommendations.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator, Android Emulator, or Expo Go app

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RagaRhythm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Add your Firebase configuration to `config/firebase.js`
   - Enable Authentication (Email/Password)
   - Enable Firestore Database

4. **Set up YouTube API**
   - Get a YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com)
   - Add your API key to `app/(tabs)/HomeScreen.jsx`

5. **Start the development server**
   ```bash
   npx expo start
   ```

6. **Run the app**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your phone

## 📱 App Structure

### Landing Page
The app opens with a comprehensive landing page that explains:
- The problem RagaRhythm solves
- Unique features and benefits
- Who the app is for
- How it works
- Why choose RagaRhythm

Users can skip directly to the app or explore the landing page first.

### Main App Sections

#### 🏠 Home
- Daily featured music category
- Browse 150+ music categories
- Search by genre, region, or mood
- Direct YouTube integration for playback

#### 🎼 Suggestions
- Mood-based song recommendations
- AI-powered raga matching
- Describe your feelings in natural language
- Get instant personalized suggestions

#### 🎤 Raga Detection (NEW!)
- Record or upload audio to identify ragas
- AI-powered analysis of melodic patterns
- Get detailed raga characteristics
- Reference guide for popular ragas
- Learn aroha/avaroha and time theory

#### 🎹 Practice Loops (NEW!)
- Personalized practice sessions
- Choose from 6 popular ragas
- Adjustable tempo (40-200 BPM)
- Multiple taal (rhythm cycle) options
- Create custom note sequences
- Integrated metronome and tanpura simulation

#### 📖 Theory Lessons (NEW!)
- 8 comprehensive lessons on Indian classical music
- Topics: Swaras, Ragas, Thaats, Taals, Alankars
- Interactive quizzes to test knowledge
- Progress tracking
- Category filtering by skill level
- YouTube tutorial integration

#### 👤 Profile
- View your listening history
- Manage account settings
- Track your musical journey

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack, Drawer, Bottom Tabs)
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI**: OpenAI GPT-4
- **Music**: YouTube Data API v3
- **State Management**: React Hooks
- **Styling**: StyleSheet (React Native)

## 📂 Project Structure

```
RagaRhythm/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.jsx              # Navigation structure
│   │   ├── HomeScreen.jsx           # Music categories & playback
│   │   ├── SuggetionScreen.jsx      # AI mood-based suggestions
│   │   ├── RagaDetectionScreen.jsx  # NEW: Raga identification
│   │   ├── PracticeLoopsScreen.jsx  # NEW: Practice sessions
│   │   ├── TheoryLessonsScreen.jsx  # NEW: Music theory lessons
│   │   ├── ProfileScreen.jsx        # User profile
│   │   └── index.jsx                # Auth (Login/Register)
│   ├── LandingPage.jsx              # Landing page
│   └── _layout.tsx                  # Root layout
├── assets/                          # Images, fonts, icons
├── components/                      # Reusable components
├── config/
│   └── firebase.js                  # Firebase configuration
├── constants/                       # App constants
├── hooks/                           # Custom React hooks
├── NEW_FEATURES_GUIDE.md           # Detailed guide for new features
└── README.md                       # This file
```

## 🎨 Design Philosophy

### Problem-Solution Approach
RagaRhythm addresses the challenge of finding music that truly resonates with your emotional state by combining:
- Traditional Indian classical music theory
- Modern AI technology
- Global music diversity

### User Experience
- **Intuitive**: Simple, mood-based input
- **Accessible**: Free, no subscriptions or paywalls
- **Educational**: Learn about ragas in context
- **Cross-platform**: Works on mobile, tablet, and web

## 🌟 What Makes RagaRhythm Unique

1. **Scientifically Grounded**: Based on centuries of Indian classical music theory
2. **Modern AI**: GPT-4 powered mood analysis
3. **Emotional Intelligence**: Music as therapy, matching your inner state
4. **Best of Both Worlds**: Traditional wisdom meets contemporary music
5. **Free & Accessible**: No hidden costs or premium features
6. **Cross-Platform**: Use anywhere, anytime

## 🎯 Target Audience

- **Classical Music Enthusiasts**: Deep dive into ragas with proper context
- **Mindfulness Seekers**: Therapeutic music for meditation and wellness
- **Mood-Based Listeners**: Let emotions guide music choices
- **Global Music Explorers**: Discover authentic world music
- **Music Students**: Learn about ragas in an accessible format
- **Cultural Connectors**: Stay connected to roots or explore new traditions

## 🔑 API Keys Required

1. **YouTube Data API v3**
   - Get from: [Google Cloud Console](https://console.cloud.google.com)
   - Add to: `app/(tabs)/HomeScreen.jsx`
   - Used for: Music search and playback

2. **OpenAI API Key**
   - Get from: [OpenAI Platform](https://platform.openai.com)
   - Store in: Firebase Firestore (`configSaketh/openai`)
   - Used for: AI mood analysis and raga detection

3. **Firebase Configuration**
   - Get from: [Firebase Console](https://console.firebase.google.com)
   - Add to: `config/firebase.js`
   - Used for: Authentication and database

## 📖 Usage Guide

### For First-Time Users

1. **Landing Page**: Read about RagaRhythm's features and benefits
2. **Get Started**: Click "Get Started" or "Skip to App"
3. **Sign Up**: Create an account with email/password
4. **Explore**: Browse music categories or get AI recommendations

### Getting AI Recommendations

1. Navigate to **Suggestions** tab
2. Describe your current mood in the text box
3. Click "Get Suggestions"
4. Receive 5 personalized raga recommendations
5. Tap any suggestion to listen on YouTube

### Browsing Music

1. Navigate to **Home** tab
2. View today's featured music category
3. Click "Browse Music Categories" to see all 150+ categories
4. Select any category to explore
5. Tap any song to play on YouTube

### Using Raga Detection

1. Navigate to **Raga Detection** tab
2. Record yourself or upload an audio file
3. Click "Analyze Raga"
4. View detailed analysis including aroha, avaroha, and characteristics
5. Explore the popular ragas reference guide

### Practicing with Loops

1. Navigate to **Practice** tab
2. Adjust tempo using the slider (40-200 BPM)
3. Select a taal (rhythm cycle)
4. Choose a raga or create a custom loop
5. Click "Start Practice" to begin
6. Use YouTube links to learn more about each raga

### Learning Theory

1. Navigate to **Theory** tab
2. Browse lessons by category or view all
3. Tap a lesson to expand and read content
4. Take quizzes to test your understanding
5. Watch YouTube tutorials for deeper learning
6. Track your progress at the bottom

> **📖 For detailed guides on new features, see [NEW_FEATURES_GUIDE.md](./NEW_FEATURES_GUIDE.md)**

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Indian classical music tradition and maestros
- OpenAI for GPT-4 technology
- YouTube for music streaming
- Firebase for backend infrastructure
- Expo and React Native communities

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Contact: [Your contact information]

## 🗺️ Roadmap

### Recently Added ✅
- [x] Raga detection from audio
- [x] Practice loops with tempo and taal control
- [x] **Real metronome with audio playback** 🔊
- [x] **Visual beat indicator and counter**
- [x] Sam (first beat) emphasis in metronome
- [x] Comprehensive theory lessons
- [x] Interactive quizzes
- [x] Progress tracking

### Coming Soon
- [ ] Real tanpura and tabla audio samples
- [ ] Save custom practice loops
- [ ] Advanced pitch detection and analysis
- [ ] Voice-to-notation conversion
- [ ] Add animations and transitions
- [ ] Implement user playlists
- [ ] Add offline mode
- [ ] Include video tutorials about ragas
- [ ] Support for more languages
- [ ] Social features (share recordings, collaborate)
- [ ] Advanced analytics
- [ ] Integration with music streaming services
- [ ] Recording comparison tools
- [ ] Completion certificates for lessons

---

**Made with ❤️ for music lovers everywhere**

*Bringing the ancient wisdom of ragas to the modern world*
