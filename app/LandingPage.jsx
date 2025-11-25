import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isLargeScreen = width > 768;
const isExtraLargeScreen = width > 1024;

export default function LandingPage() {
  const navigation = useNavigation();

  useEffect(() => {
    if (isWeb && typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        html, body {
          overflow: auto !important;
          scrollbar-gutter: stable;
        }
        ::-webkit-scrollbar {
          width: 12px;
          display: block !important;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
          display: block !important;
        }
        ::-webkit-scrollbar-thumb {
          background: #667eea;
          border-radius: 6px;
          display: block !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #764ba2;
        }
        * {
          scrollbar-width: thin !important;
          scrollbar-color: #667eea #1a1a1a !important;
        }
        body::-webkit-scrollbar {
          width: 12px;
        }
        body::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        body::-webkit-scrollbar-thumb {
          background: #667eea;
          border-radius: 6px;
        }
      `;
      document.head.appendChild(style);
      
      // Force scrollbar to be always visible
      document.body.style.overflowY = 'scroll';
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Drawer');
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
      persistentScrollbar={true}
      indicatorStyle="white"
      scrollIndicatorInsets={{ right: 1 }}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleGetStarted}
          activeOpacity={0.7}
        >
          <Text style={styles.skipButtonText}>Skip to App →</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.heroTitle}>RagaRhythm</Text>
        <Text style={styles.heroTagline}>
          Discover the Perfect Raga for Every Moment
        </Text>
        <Text style={styles.heroDescription}>
          AI-powered music recommendations, interactive learning tools, and practice features for mastering Indian classical ragas
        </Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Get Started →</Text>
        </TouchableOpacity>
      </View>

      {/* Problem & Solution Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.emojiIcon}>💭</Text>
          <Text style={styles.sectionTitle}>The Problem</Text>
        </View>
        <View style={styles.problemCard}>
          <Text style={styles.problemText}>
            • Can't find music that matches your current mood?
          </Text>
          <Text style={styles.problemText}>
            • Overwhelmed by endless playlists and don't know where to start?
          </Text>
          <Text style={styles.problemText}>
            • Want to explore Indian classical ragas but don't know which one fits the moment?
          </Text>
          <Text style={styles.problemText}>
            • Missing the therapeutic power of traditional music in the digital age?
          </Text>
          <Text style={styles.problemText}>
            • Want to learn Indian classical music but need structured guidance and practice tools?
          </Text>
        </View>

        <View style={[styles.sectionHeader, styles.solutionHeader]}>
          <Text style={styles.emojiIcon}>✨</Text>
          <Text style={styles.sectionTitle}>Our Solution</Text>
        </View>
        <View style={styles.solutionCard}>
          <Text style={styles.solutionText}>
            RagaRhythm uses GPT-4 AI to understand your feelings and recommend the perfect ragas and songs that resonate with your emotional state. Whether you need calming morning ragas, energetic evening melodies, or mood-lifting global beats, we've got you covered. Master the art with 8 comprehensive theory lessons, practice with real audio metronome featuring 4 traditional taals and 6 guided ragas, and test your skills with GPT-4o-mini powered raga detection that analyzes your recordings in detail.
          </Text>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>What Makes Us Unique</Text>
        
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🧠</Text>
            <Text style={styles.featureTitle}>AI Mood Detection</Text>
            <Text style={styles.featureDescription}>
              Tell us how you feel, and our AI suggests the perfect ragas and songs to match your emotional state
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎵</Text>
            <Text style={styles.featureTitle}>Classical Raga Library</Text>
            <Text style={styles.featureDescription}>
              Explore Hindustani & Carnatic ragas organized by time of day, season, and mood
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={styles.featureTitle}>Global Music Discovery</Text>
            <Text style={styles.featureDescription}>
              Access 150+ curated categories from Bollywood to K-Pop, Sufi to Latin, all in one place
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureTitle}>Daily Surprises</Text>
            <Text style={styles.featureDescription}>
              A new featured music category every day to expand your musical horizons
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🌅</Text>
            <Text style={styles.featureTitle}>Time-based Ragas</Text>
            <Text style={styles.featureDescription}>
              Morning, evening, night & seasonal ragas following traditional Indian classical principles
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureTitle}>Personalized Experience</Text>
            <Text style={styles.featureDescription}>
              Your music history and preferences shape future recommendations
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎤</Text>
            <Text style={styles.featureTitle}>AI Raga Detection</Text>
            <Text style={styles.featureDescription}>
              Record or upload audio to identify ragas with GPT-4o-mini powered analysis including aroha, avaroha, time of day, mood characteristics, and similar ragas suggestions
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎼</Text>
            <Text style={styles.featureTitle}>Interactive Practice Loops</Text>
            <Text style={styles.featureDescription}>
              Practice with real audio metronome (40-200 BPM), 4 traditional taals (Teental, Jhaptaal, Ektaal, Rupak), and 6 guided raga exercises for all skill levels
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📖</Text>
            <Text style={styles.featureTitle}>Comprehensive Theory Lessons</Text>
            <Text style={styles.featureDescription}>
              Master Indian classical music with 8 interactive lessons covering swaras, ragas, 10 thaats, taals, alankars, bandish, gharanas, and both Hindustani & Carnatic traditions
            </Text>
          </View>
        </View>
      </View>

      {/* Learning & Practice Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>Complete Learning Ecosystem</Text>
        
        <View style={styles.learningGrid}>
          <View style={styles.learningCard}>
            <Text style={styles.learningIcon}>📖</Text>
            <Text style={styles.learningTitle}>8 Interactive Theory Lessons</Text>
            <View style={styles.learningBullets}>
              <Text style={styles.learningBullet}>• Introduction to Swaras (the 7 fundamental notes)</Text>
              <Text style={styles.learningBullet}>• Understanding Ragas (aroha, avaroha, vadi, samvadi)</Text>
              <Text style={styles.learningBullet}>• The 10 Thaats (Bilawal, Kalyan, Khamaj, Bhairav, etc.)</Text>
              <Text style={styles.learningBullet}>• Introduction to Taal (rhythm cycles, matra, sam, tali, khali)</Text>
              <Text style={styles.learningBullet}>• Alankars - systematic practice exercises</Text>
              <Text style={styles.learningBullet}>• Bandish structure (Khayal, Dhrupad, Thumri, Tarana)</Text>
              <Text style={styles.learningBullet}>• Gharanas - vocal & instrumental traditions</Text>
              <Text style={styles.learningBullet}>• Carnatic vs Hindustani music comparison</Text>
              <Text style={styles.learningBullet}>• Interactive quizzes & comprehensive progress tracking</Text>
            </View>
          </View>

          <View style={styles.learningCard}>
            <Text style={styles.learningIcon}>🎼</Text>
            <Text style={styles.learningTitle}>Professional Practice Tools</Text>
            <View style={styles.learningBullets}>
              <Text style={styles.learningBullet}>• Real audio metronome with tempo-synced clicks (40-200 BPM)</Text>
              <Text style={styles.learningBullet}>• 4 traditional taals with visual beat indicators (Teental, Jhaptaal, Ektaal, Rupak)</Text>
              <Text style={styles.learningBullet}>• 6 guided raga exercises (Yaman, Bhairav, Bhupali, Darbari Kanada, Malkauns, Bageshri)</Text>
              <Text style={styles.learningBullet}>• Custom loop creation with note sequences</Text>
              <Text style={styles.learningBullet}>• Difficulty levels: Beginner to Advanced</Text>
              <Text style={styles.learningBullet}>• Aroha & Avaroha practice with detailed patterns</Text>
              <Text style={styles.learningBullet}>• YouTube tutorial integration for each raga</Text>
              <Text style={styles.learningBullet}>• Sam emphasis (louder first beat) for cycle clarity</Text>
            </View>
          </View>

          <View style={styles.learningCard}>
            <Text style={styles.learningIcon}>🎤</Text>
            <Text style={styles.learningTitle}>AI Raga Detection</Text>
            <View style={styles.learningBullets}>
              <Text style={styles.learningBullet}>• Record live or upload existing audio files</Text>
              <Text style={styles.learningBullet}>• GPT-4o-mini powered raga identification</Text>
              <Text style={styles.learningBullet}>• Detailed characteristics and pakad analysis</Text>
              <Text style={styles.learningBullet}>• Aroha & Avaroha note extraction</Text>
              <Text style={styles.learningBullet}>• Time of day performance recommendations</Text>
              <Text style={styles.learningBullet}>• Mood & emotional context interpretation</Text>
              <Text style={styles.learningBullet}>• Similar ragas suggestions for exploration</Text>
              <Text style={styles.learningBullet}>• Popular ragas reference guide (6 ragas)</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Who It's For Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>Who Is This For?</Text>
        
        <View style={styles.audienceGrid}>
          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🎼</Text>
            <Text style={styles.audienceTitle}>Classical Music Enthusiasts</Text>
            <Text style={styles.audienceDescription}>
              Deep dive into the world of ragas with proper context and guidance
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🧘</Text>
            <Text style={styles.audienceTitle}>Mindfulness Seekers</Text>
            <Text style={styles.audienceDescription}>
              Find therapeutic music that aligns with your meditation and wellness practices
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🌟</Text>
            <Text style={styles.audienceTitle}>Mood-Based Listeners</Text>
            <Text style={styles.audienceDescription}>
              Let your emotions guide your music choices with AI-powered recommendations
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🎧</Text>
            <Text style={styles.audienceTitle}>Global Music Explorers</Text>
            <Text style={styles.audienceDescription}>
              Discover authentic music from India and around the world in one unified experience
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>📚</Text>
            <Text style={styles.audienceTitle}>Music Students</Text>
            <Text style={styles.audienceDescription}>
              Learn about ragas and their traditional contexts in an accessible format
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🌏</Text>
            <Text style={styles.audienceTitle}>Cultural Connectors</Text>
            <Text style={styles.audienceDescription}>
              Stay connected to your roots or explore new cultural musical traditions
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🎹</Text>
            <Text style={styles.audienceTitle}>Aspiring Performers</Text>
            <Text style={styles.audienceDescription}>
              Practice with professional tools like adjustable metronome, taal cycles, and get AI feedback on your recordings
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>👨‍🏫</Text>
            <Text style={styles.audienceTitle}>Music Teachers & Coaches</Text>
            <Text style={styles.audienceDescription}>
              Use as a teaching aid with theory lessons, practice tools, and raga references for students at all levels
            </Text>
          </View>
        </View>
      </View>

      {/* How It Works Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>How It Works</Text>
        
        <View style={styles.stepsContainer}>
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Express Your Mood</Text>
            <Text style={styles.stepDescription}>
              Simply describe how you're feeling - happy, contemplative, energetic, or anything in between
            </Text>
          </View>

          <View style={styles.stepArrow}>
            <Text style={styles.stepArrowText}>↓</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>AI Analysis</Text>
            <Text style={styles.stepDescription}>
              Our AI understands your emotional state and matches it with appropriate ragas and music styles
            </Text>
          </View>

          <View style={styles.stepArrow}>
            <Text style={styles.stepArrowText}>↓</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Discover & Listen</Text>
            <Text style={styles.stepDescription}>
              Get personalized raga and song recommendations, then listen instantly via YouTube integration
            </Text>
          </View>

          <View style={styles.stepArrow}>
            <Text style={styles.stepArrowText}>↓</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Explore More</Text>
            <Text style={styles.stepDescription}>
              Browse 150+ global music categories or dive deeper into time-based ragas and regional music
            </Text>
          </View>

          <View style={styles.stepArrow}>
            <Text style={styles.stepArrowText}>↓</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <Text style={styles.stepTitle}>Learn & Practice</Text>
            <Text style={styles.stepDescription}>
              Master ragas with theory lessons, practice with interactive metronome, and test your skills with AI raga detection
            </Text>
          </View>
        </View>
      </View>

      {/* Unique Value Propositions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>Why Choose RagaRhythm?</Text>
        
        <View style={styles.valuePropsContainer}>
          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🎯</Text>
            <Text style={styles.valuePropTitle}>Scientifically Grounded</Text>
            <Text style={styles.valuePropText}>
              Based on centuries of Indian classical music theory - ragas for specific times, seasons, and emotional states
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🤖</Text>
            <Text style={styles.valuePropTitle}>Modern AI Technology</Text>
            <Text style={styles.valuePropText}>
              Powered by GPT-4 for intelligent mood analysis, music matching, and GPT-4o-mini for precise raga detection
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🎭</Text>
            <Text style={styles.valuePropTitle}>Emotional Intelligence</Text>
            <Text style={styles.valuePropText}>
              We understand that music is therapy - find songs that truly resonate with your inner state
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🌐</Text>
            <Text style={styles.valuePropTitle}>Best of Both Worlds</Text>
            <Text style={styles.valuePropText}>
              Traditional Indian classical wisdom meets global contemporary music in one seamless experience
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🆓</Text>
            <Text style={styles.valuePropTitle}>Free & Accessible</Text>
            <Text style={styles.valuePropText}>
              No subscriptions, no paywalls - just pure music discovery powered by YouTube
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>📱</Text>
            <Text style={styles.valuePropTitle}>Cross-Platform</Text>
            <Text style={styles.valuePropText}>
              Use on mobile, tablet, or web - your music journey follows you everywhere
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🎓</Text>
            <Text style={styles.valuePropTitle}>Complete Learning System</Text>
            <Text style={styles.valuePropText}>
              From theory lessons to practice tools to AI analysis - everything you need to master ragas in one app
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🎯</Text>
            <Text style={styles.valuePropTitle}>Interactive Practice</Text>
            <Text style={styles.valuePropText}>
              Real audio metronome with tempo-synced clicks, 4 traditional taals with visual beat indicators, customizable tempo (40-200 BPM), and 6 guided raga exercises
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🧪</Text>
            <Text style={styles.valuePropTitle}>AI-Powered Analysis</Text>
            <Text style={styles.valuePropText}>
              Record yourself and get instant raga identification with detailed characteristics, notes, and suggestions
            </Text>
          </View>
        </View>
      </View>

      {/* Call to Action Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Master Indian Classical Music?</Text>
        <Text style={styles.ctaDescription}>
          Join thousands learning ragas through AI-powered tools, interactive lessons, and personalized music discovery
        </Text>
        <TouchableOpacity 
          style={styles.ctaButtonLarge}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonLargeText}>Start Your Musical Journey</Text>
        </TouchableOpacity>
        <Text style={styles.ctaSubtext}>No credit card required • Sign up in 30 seconds</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 RagaRhythm. All rights reserved.</Text>
        <Text style={styles.footerSubtext}>
          Master Indian classical music with AI-powered learning tools and personalized discovery
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  contentContainer: {
    paddingBottom: 20,
    ...(isWeb && {
      maxWidth: isExtraLargeScreen ? 1400 : isLargeScreen ? 1200 : '100%',
      marginHorizontal: 'auto',
      width: '100%',
    }),
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    zIndex: 10,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  logoContainer: {
    marginBottom: 12,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  heroTitle: {
    fontSize: isExtraLargeScreen ? 42 : isLargeScreen ? 38 : 32,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroTagline: {
    fontSize: isLargeScreen ? 20 : 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    opacity: 0.95,
  },
  heroDescription: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    maxWidth: 650,
    paddingHorizontal: 20,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#667eea',
  },

  // Section Styles
  section: {
    paddingHorizontal: isLargeScreen ? 30 : 18,
    paddingVertical: isLargeScreen ? 40 : 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  solutionHeader: {
    marginTop: 24,
  },
  emojiIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: isLargeScreen ? 24 : 22,
    fontWeight: '800',
    color: '#fff',
  },
  sectionTitleCenter: {
    fontSize: isLargeScreen ? 32 : 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: -0.5,
  },

  // Problem & Solution
  problemCard: {
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    marginBottom: 14,
  },
  problemText: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 10,
    lineHeight: 22,
  },
  solutionCard: {
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  solutionText: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 24,
  },

  // Features Grid
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
  featureCard: {
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 14,
    width: isExtraLargeScreen ? '31%' : isLargeScreen ? '48%' : '100%',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    minHeight: 160,
  },
  featureIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 13,
    color: '#bbb',
    lineHeight: 20,
  },

  // Learning Grid
  learningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  learningCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 14,
    width: isExtraLargeScreen ? '31%' : isLargeScreen ? '48%' : '100%',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  learningIcon: {
    fontSize: 40,
    marginBottom: 12,
    textAlign: 'center',
  },
  learningTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#667eea',
    marginBottom: 14,
    textAlign: 'center',
  },
  learningBullets: {
    marginTop: 6,
  },
  learningBullet: {
    fontSize: 12,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 6,
  },

  // Audience Grid
  audienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
  audienceCard: {
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 14,
    width: isExtraLargeScreen ? '31%' : isLargeScreen ? '48%' : '100%',
    alignItems: 'center',
    minHeight: 145,
  },
  audienceIcon: {
    fontSize: 38,
    marginBottom: 10,
  },
  audienceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  audienceDescription: {
    fontSize: 13,
    color: '#e0e0e0',
    lineHeight: 20,
    textAlign: 'center',
  },

  // Steps
  stepsContainer: {
    alignItems: 'center',
  },
  stepCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 14,
    width: '100%',
    maxWidth: 650,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  stepNumber: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 22,
    textAlign: 'center',
  },
  stepArrow: {
    marginVertical: 10,
  },
  stepArrowText: {
    fontSize: 26,
    color: '#667eea',
  },

  // Value Props
  valuePropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
  valuePropCard: {
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 14,
    width: isExtraLargeScreen ? '31%' : isLargeScreen ? '48%' : '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#764ba2',
    minHeight: 160,
  },
  valuePropIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  valuePropTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  valuePropText: {
    fontSize: 13,
    color: '#bbb',
    lineHeight: 20,
    textAlign: 'center',
  },

  // CTA Section
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 30 : 18,
    paddingVertical: isLargeScreen ? 40 : 30,
    backgroundColor: '#1a1a1a',
    marginHorizontal: isLargeScreen ? 30 : 18,
    borderRadius: 16,
    marginBottom: 24,
  },
  ctaTitle: {
    fontSize: isLargeScreen ? 30 : 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  ctaDescription: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 20,
    textAlign: 'center',
    maxWidth: 650,
    lineHeight: 22,
  },
  ctaButtonLarge: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButtonLargeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  ctaSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 12,
    textAlign: 'center',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  footerText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

