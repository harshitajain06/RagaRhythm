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
│   │   ├── _layout.jsx         # Navigation structure
│   │   ├── HomeScreen.jsx      # Music categories & playback
│   │   ├── SuggetionScreen.jsx # AI mood-based suggestions
│   │   ├── ProfileScreen.jsx   # User profile
│   │   └── index.jsx           # Auth (Login/Register)
│   ├── LandingPage.jsx         # Landing page
│   └── _layout.tsx             # Root layout
├── assets/                     # Images, fonts, icons
├── components/                 # Reusable components
├── config/
│   └── firebase.js            # Firebase configuration
├── constants/                  # App constants
├── hooks/                      # Custom React hooks
└── README.md                  # This file
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
   - Used for: AI mood analysis

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

- [ ] Add animations and transitions
- [ ] Implement user playlists
- [ ] Add offline mode
- [ ] Include video tutorials about ragas
- [ ] Support for more languages
- [ ] Social features (share recommendations)
- [ ] Advanced analytics
- [ ] Integration with music streaming services

---

**Made with ❤️ for music lovers everywhere**

*Bringing the ancient wisdom of ragas to the modern world*
